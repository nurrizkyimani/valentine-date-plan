import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubmissionSchema } from "@shared/schema";
import { sendValentineConfirmation } from "./email";

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

      // Get restaurant details for the email
      const restaurant = await storage.getRestaurant(data.restaurantId);
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      // Send confirmation email
      await sendValentineConfirmation(
        data.email,
        data.name,
        data.date,
        data.time,
        restaurant.name
      );

      res.json(submission);
    } catch (error) {
      console.error('Submission error:', error);
      res.status(400).json({ message: "Invalid submission data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}