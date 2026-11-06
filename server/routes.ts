import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertDemoRequestSchema } from "@shared/schema";
import { storage } from "./storage";
import { trackPageView, parseDays, getAnalytics } from "./analytics";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request submission endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const demoRequest = insertDemoRequestSchema.parse(req.body);
      const created = await storage.createDemoRequest({
        ...demoRequest,
        createdAt: new Date().toISOString(),
      });
      
      res.json({ 
        success: true, 
        message: "Demo request submitted successfully",
        id: created.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "Failed to submit demo request" 
        });
      }
    }
  });

  // Get all demo requests (for admin purposes)
  app.get("/api/demo-requests", async (req, res) => {
    try {
      const requests = await storage.getAllDemoRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch demo requests" 
      });
    }
  });

  // Page view tracking (called by the site on every page load)
  app.post("/api/track", async (req, res) => {
    try {
      await trackPageView(req.body, req.get("user-agent"));
      res.status(204).end();
    } catch (error) {
      res.status(error instanceof z.ZodError ? 400 : 500).json({ success: false });
    }
  });

  // Analytics numbers for the admin page
  app.get("/api/analytics", async (req, res) => {
    try {
      res.json(await getAnalytics(parseDays(req.query.days)));
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
