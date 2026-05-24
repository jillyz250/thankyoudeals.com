import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { users, demoRequests, type User, type InsertUser, type DemoRequest, type InsertDemoRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(request: InsertDemoRequest & { createdAt: string }): Promise<DemoRequest>;
  getAllDemoRequests(): Promise<DemoRequest[]>;
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
}

function buildStorage(): IStorage {
  if (process.env.DATABASE_URL) {
    return new DrizzleStorage(process.env.DATABASE_URL);
  }
  console.warn("[storage] DATABASE_URL not set — using in-memory storage (data will not persist)");
  return new MemStorage();
}

export const storage: IStorage = buildStorage();
