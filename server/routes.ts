import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertDemoRequestSchema } from "@shared/schema";
import { storage } from "./storage";

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

  const httpServer = createServer(app);
  return httpServer;
}
