# ThankYouDeals.com - B2B Homepage

## Overview

ThankYouDeals.com is a B2B platform targeting supermarkets and retail chains, helping them monetize post-purchase interactions through sponsored deals and customer re-engagement. The application features a modern, mobile-optimized homepage with demo request functionality and admin capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors and responsive design
- **Router**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for scroll animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for type-safe data validation
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

### Development Architecture
- **Monorepo Structure**: Single repository with separate client/server/shared folders
- **Hot Reload**: Vite dev server with Express middleware integration
- **TypeScript**: Full-stack type safety with shared schemas
- **Code Quality**: ESM modules throughout the stack

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Authentication and user management
- **Demo Requests Table**: Lead capture with contact information
- **Zod Validation**: Type-safe insert and select schemas

### API Routes (`server/routes.ts`)
- `POST /api/demo-request`: Demo request submission with validation
- `GET /api/demo-requests`: Admin endpoint for viewing submissions

### Storage Layer (`server/storage.ts`)
- **Interface-based Design**: IStorage interface for flexibility
- **In-Memory Implementation**: MemStorage for development/testing
- **Database Ready**: Prepared for Drizzle ORM PostgreSQL integration

### UI Components
- **Shadcn/ui Library**: Complete component system with Radix UI
- **Brand Design System**: Custom color palette and typography
- **Mobile-First**: Responsive design with mobile optimization
- **Accessibility**: ARIA-compliant components with keyboard navigation

## Data Flow

1. **Demo Request Submission**:
   - User fills form on homepage
   - Client validates with Zod schema
   - TanStack Query handles API request
   - Server validates and stores in database
   - Success feedback via toast notifications

2. **Admin Data Access**:
   - Admin endpoint returns all demo requests
   - Data formatted for management interface
   - Real-time updates via React Query

3. **Static Asset Serving**:
   - Vite handles client assets in development
   - Production builds static files for deployment

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Environment variable `DATABASE_URL` required

### UI Libraries
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Modern icon library for React

### Development Tools
- **Replit Platform**: Integrated development environment
- **Auto-deploy**: Automatic deployment on code changes
- **Hot Reload**: Development server with instant updates

## Deployment Strategy

### Replit Deployment
- **Auto-scale Target**: Handles traffic spikes automatically
- **Build Process**: `npm run build` compiles both frontend and backend
- **Start Command**: `npm run start` for production server
- **Port Configuration**: Internal port 5000, external port 80

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles Node.js server
- **Assets**: Combined into `/dist` directory

### Environment Configuration
- **Development**: `npm run dev` starts both servers with hot reload
- **Database**: Drizzle migrations via `npm run db:push`
- **Type Safety**: `npm run check` validates TypeScript

## Changelog

- August 19, 2025: Updated company branding from XZellerate LLC to ThankYouDeals INC, changed email addresses to support@thankyoudeals.com
- June 16, 2025: Initial setup
- June 16, 2025: Updated homepage with actual logo assets, clarified advertiser revenue model, replaced demo form with direct email contact section, added privacy policy link
- June 16, 2025: Transformed homepage into dual B2B platform serving both retailers and advertisers, reordered sections with advertisers first, updated results section for future metrics, integrated KeyFood demo image, generalized contact section for both audiences
- June 17, 2025: Reordered sections to prioritize retailers first, moved "What You Get" and "Measurable Impact" sections above advertiser content, updated "Branded Customer Experience" copy to detail web page development process, replaced Results navigation with How it Works button

## User Preferences

Preferred communication style: Simple, everyday language.