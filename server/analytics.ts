import { insertPageViewSchema } from "../shared/schema.js";
import { storage } from "./storage.js";

const BOT_PATTERN = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit/i;

// Records one page view. Returns false when the view is ignored (bots, admin pages).
export async function trackPageView(body: unknown, userAgent: string | undefined): Promise<boolean> {
  if (userAgent && BOT_PATTERN.test(userAgent)) return false;
  const view = insertPageViewSchema.parse(body);
  if (view.path.startsWith("/admin")) return false;
  await storage.recordPageView({
    path: view.path,
    referrer: view.referrer || null,
    visitorId: view.visitorId || null,
    createdAt: new Date().toISOString(),
  });
  return true;
}

export function parseDays(value: unknown): number {
  const n = Number(value);
  return [7, 30, 90].includes(n) ? n : 30;
}

export function getAnalytics(days: number) {
  return storage.getAnalytics(days);
}
