import { z } from "zod";
import { insertDemoRequestSchema } from "../shared/schema";
import { storage } from "../server/storage";

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const demoRequest = insertDemoRequestSchema.parse(body);
    const created = await storage.createDemoRequest({
      ...demoRequest,
      createdAt: new Date().toISOString(),
    });
    return Response.json({
      success: true,
      message: "Demo request submitted successfully",
      id: created.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { success: false, message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    return Response.json(
      { success: false, message: "Failed to submit demo request" },
      { status: 500 }
    );
  }
}
