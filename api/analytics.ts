import { parseDays, getAnalytics } from "../server/analytics";

export async function GET(request: Request): Promise<Response> {
  try {
    const days = parseDays(new URL(request.url).searchParams.get("days"));
    return Response.json(await getAnalytics(days));
  } catch {
    return Response.json(
      { success: false, message: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
