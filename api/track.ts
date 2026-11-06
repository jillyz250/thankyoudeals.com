import { z } from "zod";
import { trackPageView } from "../server/analytics.js";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    await trackPageView(body, request.headers.get("user-agent") ?? undefined);
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json(
      { success: false },
      { status: error instanceof z.ZodError ? 400 : 500 }
    );
  }
}
