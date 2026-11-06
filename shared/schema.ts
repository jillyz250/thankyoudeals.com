import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  visitorId: text("visitor_id"),
  createdAt: text("created_at").notNull(),
});

export const insertPageViewSchema = z.object({
  path: z.string().min(1).max(300),
  referrer: z.string().max(500).nullish(),
  visitorId: z.string().max(64).nullish(),
});

export type InsertPageView = z.infer<typeof insertPageViewSchema> & { createdAt: string };

export type AnalyticsStats = {
  days: number;
  totalViews: number;
  uniqueVisitors: number;
  daily: { date: string; views: number }[];
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
};

export const insertUserSchema =createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDemoRequestSchema = createInsertSchema(demoRequests).pick({
  name: true,
  email: true,
  company: true,
  phone: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequests.$inferSelect;
