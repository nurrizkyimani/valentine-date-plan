import { type RestaurantType, type Restaurant, type Submission, type InsertSubmission } from "@shared/schema";
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

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
    // Load data from YAML file
    const yamlPath = path.resolve(process.cwd(), 'shared/content/restaurants.yaml');
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const data = yaml.load(fileContents) as {
      restaurantTypes: RestaurantType[];
      restaurants: Restaurant[];
    };

    // Initialize maps
    this.restaurantTypes = new Map(
      data.restaurantTypes.map(type => [type.id, type])
    );

    this.restaurants = new Map(
      data.restaurants.map(restaurant => [restaurant.id, restaurant])
    );

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