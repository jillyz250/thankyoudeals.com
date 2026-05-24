import { storage } from "../server/storage";

export async function GET(): Promise<Response> {
  try {
    const requests = await storage.getAllDemoRequests();
    return Response.json(requests);
  } catch {
    return Response.json(
      { success: false, message: "Failed to fetch demo requests" },
      { status: 500 }
    );
  }
}
