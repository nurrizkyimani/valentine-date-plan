import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";  
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const restaurantTypes = pgTable("restaurant_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  typeId: integer("type_id").notNull(),
  imageUrl: text("image_url").notNull(),
  address: text("address").notNull(),
  mapsUrl: text("maps_url").notNull(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  restaurantId: integer("restaurant_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).pick({
  name: true,
  email: true,
  restaurantId: true,
  date: true,
  time: true,
});

export type RestaurantType = typeof restaurantTypes.$inferSelect;
export type Restaurant = typeof restaurants.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;