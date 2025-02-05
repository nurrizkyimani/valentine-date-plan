import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/restaurant-types", async (_req, res) => {
    const types = await storage.getRestaurantTypes();
    res.json(types);
  });

  app.get("/api/restaurants/:typeId", async (req, res) => {
    const typeId = parseInt(req.params.typeId);
    const restaurants = await storage.getRestaurants(typeId);
    res.json(restaurants);
  });

  app.get("/api/restaurants/detail/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const restaurant = await storage.getRestaurant(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  });

  app.post("/api/submit", async (req, res) => {
    try {
      const data = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(data);
      res.json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
