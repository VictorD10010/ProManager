# Modern Login Application

## Overview

This is a modern, full-stack web application featuring a professional login page with a clean, minimal design aesthetic. The application uses a split-screen layout approach with authentication functionality, built on a React frontend and Express backend architecture.

The project emphasizes user experience with a focus on trust, clarity, and efficiency in the authentication flow. It includes form validation, error handling, and responsive design that adapts seamlessly from desktop to mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing (chosen over React Router for minimal bundle size)
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library following the "New York" style variant
- **Radix UI** primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **class-variance-authority (CVA)** for managing component variants

**Design Philosophy**
- Minimal design system with Material Design influences
- Split-screen layout: 50/50 on desktop, single-column stack on mobile
- Consistent spacing units (Tailwind 4, 6, 8)
- Typography using Inter or DM Sans font family
- Focus on accessibility and touch-friendly targets (h-12 inputs, h-9 buttons)

**Form Management**
- **React Hook Form** for performant form state management
- **Zod** for schema validation and type inference
- **@hookform/resolvers** to integrate Zod with React Hook Form
- Client-side validation with real-time error feedback

**State Management Approach**
- Server state: TanStack Query with custom query functions
- Form state: React Hook Form
- UI state: React hooks (useState, useContext)
- No global state management library (Redux/Zustand) - keeping it simple

### Backend Architecture

**Server Framework**
- **Express.js** as the web application framework
- **Node.js** with ES modules (type: "module" in package.json)
- **TypeScript** for type safety across the stack
- Separate development (`index-dev.ts`) and production (`index-prod.ts`) entry points

**Development vs Production**
- Development: Vite integration for HMR and middleware mode
- Production: Serves pre-built static assets from dist/public
- Custom logging middleware for request/response tracking

**API Structure**
- RESTful API design with `/api` prefix
- JSON request/response format
- Standard HTTP status codes for responses
- Structured error handling with consistent response shapes

**Authentication Approach**
- Credential-based authentication (email/password)
- Server-side validation of login credentials
- Session-based architecture prepared (connect-pg-simple dependency)
- Password validation (minimum 6 characters)

**Data Storage Layer**
- **Drizzle ORM** for type-safe database queries
- **PostgreSQL** as the target database (Neon serverless driver included)
- Schema-first approach with migrations in `/migrations` directory
- In-memory storage implementation (`MemStorage`) for development/testing
- Interface-based storage pattern (`IStorage`) for easy swapping between implementations

**Database Schema**
- Users table with id (UUID), username (unique), and password fields
- Drizzle-Zod integration for automatic schema validation from database schema
- Demo user included in memory storage (demo@example.com / demo123)

### External Dependencies

**Database & ORM**
- **@neondatabase/serverless** - Serverless PostgreSQL driver for Neon
- **drizzle-orm** - TypeScript ORM with SQL-like query builder
- **drizzle-kit** - CLI for migrations and schema management
- **drizzle-zod** - Automatic Zod schema generation from Drizzle schemas
- **connect-pg-simple** - PostgreSQL session store for Express

**UI Component Libraries**
- **@radix-ui/* packages** - 25+ accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **lucide-react** - Icon library
- **react-icons** - Additional icon set (used for SiGoogle social login icon)
- **embla-carousel-react** - Carousel/slider functionality
- **cmdk** - Command menu component
- **vaul** - Drawer component for mobile

**Styling & Utilities**
- **tailwindcss** - Utility-first CSS framework
- **autoprefixer** - PostCSS plugin for vendor prefixes
- **clsx** & **tailwind-merge** - Conditional className utilities
- **class-variance-authority** - Component variant management

**Development Tools**
- **@replit/vite-plugin-*** - Replit-specific development enhancements (cartographer, dev-banner, runtime-error-modal)
- **tsx** - TypeScript execution for development
- **esbuild** - Bundler for production server code

**Validation & Type Safety**
- **zod** - Runtime type validation
- **@hookform/resolvers** - Form validation integration

**Date Handling**
- **date-fns** - Modern date utility library

**Build & Runtime**
- **vite** - Frontend build tool
- **@vitejs/plugin-react** - React support for Vite
- **express** - Web server framework
- **typescript** - Type system and compiler