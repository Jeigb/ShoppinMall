import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertStoreSchema, 
  insertEventSchema, 
  insertNewsSchema, 
  insertComingSoonStoreSchema,
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Store routes
  app.get("/api/stores", async (req, res) => {
    try {
      const { category, subcategory, floor, search, isOpen } = req.query;
      const stores = await storage.getStores({
        category: category as string,
        subcategory: subcategory as string,
        floor: floor as string,
        search: search as string,
        isOpen: isOpen === "true" ? true : isOpen === "false" ? false : undefined,
      });
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stores" });
    }
  });

  app.get("/api/stores/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const store = await storage.getStore(id);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store" });
    }
  });

  app.post("/api/stores", async (req, res) => {
    try {
      const storeData = insertStoreSchema.parse(req.body);
      const store = await storage.createStore(storeData);
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ message: "Invalid store data" });
    }
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    try {
      const { type, isActive, startDate, endDate } = req.query;
      const events = await storage.getEvents({
        type: type as string,
        isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const { category, isPublished } = req.query;
      const news = await storage.getNews({
        category: category as string,
        isPublished: isPublished === "true" ? true : isPublished === "false" ? false : undefined,
      });
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getNewsArticle(id);
      if (!article) {
        return res.status(404).json({ message: "News article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news article" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const newsData = insertNewsSchema.parse(req.body);
      const article = await storage.createNews(newsData);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: "Invalid news data" });
    }
  });

  // Coming Soon routes
  app.get("/api/coming-soon", async (req, res) => {
    try {
      const stores = await storage.getComingSoonStores();
      res.json(stores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch coming soon stores" });
    }
  });

  app.post("/api/coming-soon", async (req, res) => {
    try {
      const storeData = insertComingSoonStoreSchema.parse(req.body);
      const store = await storage.createComingSoonStore(storeData);
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ message: "Invalid coming soon store data" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);
      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact submission data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Invalid newsletter subscription data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
