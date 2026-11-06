import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, gte, sql } from "drizzle-orm";
import {
  users,
  demoRequests,
  pageViews,
  type User,
  type InsertUser,
  type DemoRequest,
  type InsertDemoRequest,
  type InsertPageView,
  type AnalyticsStats,
} from "../shared/schema.js";

type PageViewRow = { path: string; referrer: string | null; visitorId: string | null; createdAt: string };

function topCounts(values: string[], limit = 10) {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function sinceIso(days: number) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (days - 1));
  return d.toISOString();
}

export function buildStats(rows: PageViewRow[], days: number): AnalyticsStats {
  const perDay = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    perDay.set(d.toISOString().slice(0, 10), 0);
  }
  for (const r of rows) {
    const key = r.createdAt.slice(0, 10);
    if (perDay.has(key)) perDay.set(key, perDay.get(key)! + 1);
  }
  return {
    days,
    totalViews: rows.length,
    uniqueVisitors: new Set(rows.map((r) => r.visitorId).filter(Boolean)).size,
    daily: Array.from(perDay.entries()).map(([date, views]) => ({ date, views })),
    topPages: topCounts(rows.map((r) => r.path)).map(([path, views]) => ({ path, views })),
    topReferrers: topCounts(rows.map((r) => r.referrer).filter((r): r is string => !!r)).map(
      ([referrer, views]) => ({ referrer, views }),
    ),
  };
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(request: InsertDemoRequest & { createdAt: string }): Promise<DemoRequest>;
  getAllDemoRequests(): Promise<DemoRequest[]>;
  recordPageView(view: InsertPageView): Promise<void>;
  getAnalytics(days: number): Promise<AnalyticsStats>;
}

class DrizzleStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor(connectionString: string) {
    const sql = neon(connectionString);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [created] = await this.db.insert(users).values(insertUser).returning();
    return created;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest & { createdAt: string }): Promise<DemoRequest> {
    const [created] = await this.db.insert(demoRequests).values(insertRequest).returning();
    return created;
  }

  async getAllDemoRequests(): Promise<DemoRequest[]> {
    return await this.db.select().from(demoRequests);
  }

  // Creates the page_views table on first use so no manual db:push is needed.
  private tableReady?: Promise<unknown>;
  private ensurePageViewsTable() {
    this.tableReady ??= this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id serial PRIMARY KEY,
        path text NOT NULL,
        referrer text,
        visitor_id text,
        created_at text NOT NULL
      )
    `).catch((err) => {
      this.tableReady = undefined;
      throw err;
    });
    return this.tableReady;
  }

  async recordPageView(view: InsertPageView): Promise<void> {
    await this.ensurePageViewsTable();
    await this.db.insert(pageViews).values(view);
  }

  async getAnalytics(days: number): Promise<AnalyticsStats> {
    await this.ensurePageViewsTable();
    const rows = await this.db.select().from(pageViews).where(gte(pageViews.createdAt, sinceIso(days)));
    return buildStats(rows, days);
  }
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();
  private demoRequests = new Map<number, DemoRequest>();
  private currentUserId = 1;
  private currentDemoRequestId = 1;

  async getUser(id: number) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }
  async createUser(insertUser: InsertUser) {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createDemoRequest(insertRequest: InsertDemoRequest & { createdAt: string }) {
    const id = this.currentDemoRequestId++;
    const demoRequest: DemoRequest = { ...insertRequest, id };
    this.demoRequests.set(id, demoRequest);
    return demoRequest;
  }
  async getAllDemoRequests() { return Array.from(this.demoRequests.values()); }

  private pageViews: PageViewRow[] = [];
  async recordPageView(view: InsertPageView) {
    this.pageViews.push({
      path: view.path,
      referrer: view.referrer ?? null,
      visitorId: view.visitorId ?? null,
      createdAt: view.createdAt,
    });
  }
  async getAnalytics(days: number) {
    const since = sinceIso(days);
    return buildStats(this.pageViews.filter((r) => r.createdAt >= since), days);
  }
}

function buildStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    return new DrizzleStorage(process.env.DATABASE_URL);
  }
  console.warn("[storage] DATABASE_URL not set — using in-memory storage (data will not persist)");
  return new MemStorage();
}

export const storage: IStorage = buildStorage();
