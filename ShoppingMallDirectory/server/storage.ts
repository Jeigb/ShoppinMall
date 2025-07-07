import { 
  stores, 
  events, 
  news, 
  comingSoonStores, 
  contactSubmissions, 
  newsletterSubscriptions,
  users,
  type Store, 
  type InsertStore,
  type Event,
  type InsertEvent,
  type News,
  type InsertNews,
  type ComingSoonStore,
  type InsertComingSoonStore,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type User,
  type InsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, like, and, gte, lte, or } from "drizzle-orm";

export interface IStorage {
  // User methods (legacy)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Store methods
  getStores(filters?: {
    category?: string;
    subcategory?: string;
    floor?: string;
    search?: string;
    isOpen?: boolean;
  }): Promise<Store[]>;
  getStore(id: number): Promise<Store | undefined>;
  createStore(store: InsertStore): Promise<Store>;
  updateStore(id: number, store: Partial<InsertStore>): Promise<Store>;
  deleteStore(id: number): Promise<void>;

  // Event methods
  getEvents(filters?: {
    type?: string;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;

  // News methods
  getNews(filters?: {
    category?: string;
    isPublished?: boolean;
  }): Promise<News[]>;
  getNewsArticle(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News>;
  deleteNews(id: number): Promise<void>;

  // Coming Soon methods
  getComingSoonStores(): Promise<ComingSoonStore[]>;
  getComingSoonStore(id: number): Promise<ComingSoonStore | undefined>;
  createComingSoonStore(store: InsertComingSoonStore): Promise<ComingSoonStore>;
  updateComingSoonStore(id: number, store: Partial<InsertComingSoonStore>): Promise<ComingSoonStore>;
  deleteComingSoonStore(id: number): Promise<void>;

  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmission(id: number, submission: Partial<ContactSubmission>): Promise<ContactSubmission>;

  // Newsletter methods
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  updateNewsletterSubscription(id: number, subscription: Partial<NewsletterSubscription>): Promise<NewsletterSubscription>;
}

export class DatabaseStorage implements IStorage {
  // User methods (legacy)
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Store methods
  async getStores(filters?: {
    category?: string;
    subcategory?: string;
    floor?: string;
    search?: string;
    isOpen?: boolean;
  }): Promise<Store[]> {
    const conditions = [];
    
    if (filters) {
      if (filters.category) {
        conditions.push(eq(stores.category, filters.category));
      }
      
      if (filters.subcategory) {
        conditions.push(eq(stores.subcategory, filters.subcategory));
      }
      
      if (filters.floor) {
        conditions.push(eq(stores.floor, filters.floor));
      }
      
      if (filters.search) {
        conditions.push(
          or(
            like(stores.name, `%${filters.search}%`),
            like(stores.description, `%${filters.search}%`),
            like(stores.category, `%${filters.search}%`)
          )
        );
      }
      
      if (filters.isOpen !== undefined) {
        conditions.push(eq(stores.isOpen, filters.isOpen));
      }
    }
    
    const query = conditions.length > 0 
      ? db.select().from(stores).where(and(...conditions)).orderBy(stores.name)
      : db.select().from(stores).orderBy(stores.name);
    
    return await query;
  }

  async getStore(id: number): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store || undefined;
  }

  async createStore(store: InsertStore): Promise<Store> {
    const [newStore] = await db
      .insert(stores)
      .values(store)
      .returning();
    return newStore;
  }

  async updateStore(id: number, store: Partial<InsertStore>): Promise<Store> {
    const [updatedStore] = await db
      .update(stores)
      .set(store)
      .where(eq(stores.id, id))
      .returning();
    return updatedStore;
  }

  async deleteStore(id: number): Promise<void> {
    await db.delete(stores).where(eq(stores.id, id));
  }

  // Event methods
  async getEvents(filters?: {
    type?: string;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Event[]> {
    const conditions = [];
    
    if (filters) {
      if (filters.type) {
        conditions.push(eq(events.type, filters.type));
      }
      
      if (filters.isActive !== undefined) {
        conditions.push(eq(events.isActive, filters.isActive));
      }
      
      if (filters.startDate) {
        conditions.push(gte(events.startDate, filters.startDate));
      }
      
      if (filters.endDate) {
        conditions.push(lte(events.endDate, filters.endDate));
      }
    }
    
    const query = conditions.length > 0 
      ? db.select().from(events).where(and(...conditions)).orderBy(desc(events.startDate))
      : db.select().from(events).orderBy(desc(events.startDate));
    
    return await query;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // News methods
  async getNews(filters?: {
    category?: string;
    isPublished?: boolean;
  }): Promise<News[]> {
    const conditions = [];
    
    if (filters) {
      if (filters.category) {
        conditions.push(eq(news.category, filters.category));
      }
      
      if (filters.isPublished !== undefined) {
        conditions.push(eq(news.isPublished, filters.isPublished));
      }
    }
    
    const query = conditions.length > 0 
      ? db.select().from(news).where(and(...conditions)).orderBy(desc(news.publishDate))
      : db.select().from(news).orderBy(desc(news.publishDate));
    
    return await query;
  }

  async getNewsArticle(id: number): Promise<News | undefined> {
    const [article] = await db.select().from(news).where(eq(news.id, id));
    return article || undefined;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [newNews] = await db
      .insert(news)
      .values(newsItem)
      .returning();
    return newNews;
  }

  async updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News> {
    const [updatedNews] = await db
      .update(news)
      .set(newsItem)
      .where(eq(news.id, id))
      .returning();
    return updatedNews;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // Coming Soon methods
  async getComingSoonStores(): Promise<ComingSoonStore[]> {
    return await db.select().from(comingSoonStores).orderBy(comingSoonStores.openingDate);
  }

  async getComingSoonStore(id: number): Promise<ComingSoonStore | undefined> {
    const [store] = await db.select().from(comingSoonStores).where(eq(comingSoonStores.id, id));
    return store || undefined;
  }

  async createComingSoonStore(store: InsertComingSoonStore): Promise<ComingSoonStore> {
    const [newStore] = await db
      .insert(comingSoonStores)
      .values(store)
      .returning();
    return newStore;
  }

  async updateComingSoonStore(id: number, store: Partial<InsertComingSoonStore>): Promise<ComingSoonStore> {
    const [updatedStore] = await db
      .update(comingSoonStores)
      .set(store)
      .where(eq(comingSoonStores.id, id))
      .returning();
    return updatedStore;
  }

  async deleteComingSoonStore(id: number): Promise<void> {
    await db.delete(comingSoonStores).where(eq(comingSoonStores.id, id));
  }

  // Contact methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmission(id: number, submission: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const [updatedSubmission] = await db
      .update(contactSubmissions)
      .set(submission)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updatedSubmission;
  }

  // Newsletter methods
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [newSubscription] = await db
      .insert(newsletterSubscriptions)
      .values(subscription)
      .returning();
    return newSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions).orderBy(desc(newsletterSubscriptions.createdAt));
  }

  async updateNewsletterSubscription(id: number, subscription: Partial<NewsletterSubscription>): Promise<NewsletterSubscription> {
    const [updatedSubscription] = await db
      .update(newsletterSubscriptions)
      .set(subscription)
      .where(eq(newsletterSubscriptions.id, id))
      .returning();
    return updatedSubscription;
  }
}

export const storage = new DatabaseStorage();
