# Shopping Mall Directory Website

## Overview

This project is a modern, responsive shopping mall directory website built with React, TypeScript, and Express.js. The application provides a comprehensive digital experience for visitors to browse stores, view events, read news, and contact the mall management. It features a full-stack architecture with database integration for content management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Design System**: shadcn/ui with Radix UI primitives

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints with proper error handling
- **Database Integration**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Stores**: Mall directory with categories, locations, hours, and contact info
- **Events**: Promotional events and activities with date ranges and types
- **News**: Blog-style content management for announcements
- **Coming Soon Stores**: Preview of upcoming store openings
- **Contact Submissions**: Customer inquiry management
- **Newsletter Subscriptions**: Email marketing list management

### API Endpoints
- Store management (CRUD operations with filtering and search)
- Event management with type and date filtering
- News content with category-based filtering
- Contact form submission handling
- Newsletter subscription management

### UI Components
- Responsive store cards with filtering capabilities
- Event cards with category-based styling
- News articles with rich content display
- Search and filter components for store discovery
- Contact forms with validation
- Newsletter subscription functionality

## Data Flow

1. **Client-Server Communication**: React frontend communicates with Express backend via REST API
2. **Database Operations**: Drizzle ORM handles all database interactions with type safety
3. **State Management**: TanStack Query manages server state, caching, and synchronization
4. **Form Handling**: React Hook Form with Zod validation for type-safe form processing
5. **Real-time Updates**: Query invalidation ensures fresh data after mutations

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL (via Neon serverless)
- **ORM**: Drizzle ORM with automatic migrations
- **UI Framework**: React with TypeScript
- **CSS Framework**: Tailwind CSS
- **Component Library**: shadcn/ui with Radix UI

### Development Tools
- **Build System**: Vite with TypeScript compilation
- **Package Manager**: npm with lockfile for reproducible builds
- **Development Server**: Hot module replacement with error overlay
- **Code Quality**: TypeScript strict mode for type safety

### Third-party Services
- **Email Integration**: Ready for Mailchimp/Klaviyo integration
- **Payment Processing**: Prepared for gift card integration
- **Maps**: Ready for Google Maps integration
- **Analytics**: Structure supports analytics integration

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with TypeScript compilation via tsx
- Automatic database schema synchronization
- Real-time error reporting and debugging

### Production Build
- Frontend: Static assets built and optimized by Vite
- Backend: Bundled Express server with esbuild
- Database: Managed PostgreSQL with connection pooling
- Static serving: Express serves built frontend assets

### Environment Configuration
- Database URL configuration via environment variables
- Separate development and production database instances
- Session configuration with secure cookie settings
- CORS and security middleware for production deployment

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```