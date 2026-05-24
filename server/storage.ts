import { users, demoRequests, type User, type InsertUser, type DemoRequest, type InsertDemoRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createDemoRequest(request: InsertDemoRequest & { createdAt: string }): Promise<DemoRequest>;
  getAllDemoRequests(): Promise<DemoRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private demoRequests: Map<number, DemoRequest>;
  private currentUserId: number;
  private currentDemoRequestId: number;

  constructor() {
    this.users = new Map();
    this.demoRequests = new Map();
    this.currentUserId = 1;
    this.currentDemoRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDemoRequest(insertRequest: InsertDemoRequest & { createdAt: string }): Promise<DemoRequest> {
    const id = this.currentDemoRequestId++;
    const demoRequest: DemoRequest = { ...insertRequest, id };
    this.demoRequests.set(id, demoRequest);
    return demoRequest;
  }

  async getAllDemoRequests(): Promise<DemoRequest[]> {
    return Array.from(this.demoRequests.values());
  }
}

export const storage = new MemStorage();
