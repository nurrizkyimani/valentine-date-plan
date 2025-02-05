import { type RestaurantType, type Restaurant, type Submission, type InsertSubmission } from "@shared/schema";

export interface IStorage {
  getRestaurantTypes(): Promise<RestaurantType[]>;
  getRestaurants(typeId: number): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
}

export class MemStorage implements IStorage {
  private restaurantTypes: Map<number, RestaurantType>;
  private restaurants: Map<number, Restaurant>;
  private submissions: Map<number, Submission>;
  private currentSubmissionId: number;

  constructor() {
    this.restaurantTypes = new Map([
      [1, { id: 1, name: "Fine Dining", description: "Elegant atmosphere and exquisite cuisine", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" }],
      [2, { id: 2, name: "Casual Italian", description: "Authentic Italian dishes in a relaxed setting", imageUrl: "https://images.unsplash.com/photo-1497644083578-611b798c60f3" }],
      [3, { id: 3, name: "French Bistro", description: "Classic French cuisine with romantic ambiance", imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b" }],
      [4, { id: 4, name: "Rooftop Bar", description: "Stunning views and sophisticated cocktails", imageUrl: "https://images.unsplash.com/photo-1494346480775-936a9f0d0877" }],
    ]);

    this.restaurants = new Map([
      [1, { id: 1, typeId: 1, name: "Le Bernardin", description: "World-class French cuisine", imageUrl: "https://images.unsplash.com/photo-1517867065801-e20f409696b0", address: "155 W 51st St" }],
      [2, { id: 2, typeId: 1, name: "Daniel", description: "Contemporary French cuisine", imageUrl: "https://images.unsplash.com/photo-1516826989513-502b572b924e", address: "60 E 65th St" }],
      [3, { id: 3, typeId: 2, name: "Carbone", description: "Italian-American cuisine", imageUrl: "https://images.unsplash.com/photo-1518414881329-0f96c8f2a924", address: "181 Thompson St" }],
      [4, { id: 4, typeId: 3, name: "Balthazar", description: "Classic French bistro", imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7", address: "80 Spring St" }],
    ]);

    this.submissions = new Map();
    this.currentSubmissionId = 1;
  }

  async getRestaurantTypes(): Promise<RestaurantType[]> {
    return Array.from(this.restaurantTypes.values());
  }

  async getRestaurants(typeId: number): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(r => r.typeId === typeId);
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const id = this.currentSubmissionId++;
    const newSubmission = { ...submission, id };
    this.submissions.set(id, newSubmission);
    return newSubmission;
  }
}

export const storage = new MemStorage();
