# Petshop "Melhor Amigo" - Pet Services Website

## Overview

This is a modern pet services website built with React, TypeScript, and Express.js. The application serves as a digital storefront for a pet shop called "Melhor Amigo" (Best Friend), offering services like pet grooming, bathing, and premium food sales. The site features a customer-facing interface for browsing services and booking appointments, plus an admin panel for managing bookings and gallery content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo architecture with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Storage**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful endpoints with JSON responses
- **Development**: Hot module replacement via Vite middleware

### Design System
- **UI Components**: shadcn/ui with Radix UI primitives
- **Theme**: Custom pet-themed green color scheme
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: Built-in accessibility features from Radix components

## Key Components

### Client-Side Components
1. **Page Sections**: Hero, About, Products, Gallery, Contact sections
2. **Navigation**: Fixed header with smooth scrolling navigation
3. **Modals**: Booking modal, admin login, admin panel, image viewer
4. **UI Components**: Comprehensive set of reusable components from shadcn/ui

### Server-Side Components
1. **Route Handlers**: Admin authentication, booking management, gallery management, contact forms
2. **Storage Layer**: Abstracted storage interface with in-memory implementation
3. **Middleware**: Request logging, error handling, static file serving

### Shared Components
1. **Database Schema**: Drizzle schema definitions for users, bookings, gallery images, contacts
2. **Validation**: Zod schemas for data validation across client and server

## Data Flow

### User Interactions
1. **Service Browsing**: Users view services and can request information via contact form
2. **Booking Process**: Multi-step booking flow with date/time selection
3. **Gallery Viewing**: Image grid with modal viewer for detailed view
4. **Contact Submission**: Form submission with validation and confirmation

### Admin Workflow
1. **Authentication**: Simple username/password login (admin/infinity)
2. **Booking Management**: View and manage customer bookings
3. **Gallery Management**: Add new images to the gallery
4. **Contact Management**: View customer inquiries and messages

### Data Storage
- Currently uses in-memory storage with pre-populated sample data
- Database schema ready for PostgreSQL with Drizzle ORM
- All CRUD operations abstracted through storage interface

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Hookform Resolvers for Zod integration
- **Validation**: Zod for schema validation and type safety

### UI and Styling
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Components**: Full shadcn/ui component library with Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Utilities**: clsx and class-variance-authority for conditional styling

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless
- **Session**: Connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build**: Vite with React plugin and Replit-specific plugins
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: Hot module replacement and error overlay

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Static Assets**: Client build output served by Express in production

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Express serves static files and API routes
- **Database**: Configured for PostgreSQL via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Development mode with hot reloading
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run check`: TypeScript type checking
- `npm run db:push`: Database schema migration

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (configured for Neon Database)
- Environment variable for DATABASE_URL
- Support for serving static files and API routes

The application is designed to be easily deployable on platforms like Replit, Vercel, or any Node.js hosting service with minimal configuration changes.