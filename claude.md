# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ChosenCRM** is a premium mortgage CRM for loan officers with integrated AI coaching, accountability systems, lead workflows, and portals for clients and realtors. Built for the $500/month enterprise tier.

## Commands

### Frontend (Next.js)
```bash
npm run dev       # Start development server on http://localhost:3000
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

### Backend (Node.js/Express)
```bash
cd backend
npm run dev       # Start backend dev server on http://localhost:3001
npm run start     # Start production server
npm run migrate   # Run database migrations
npm run seed      # Seed database with sample data
npm run lint      # Run ESLint
npm run test      # Run tests (when available)
```

## Architecture

### Frontend Architecture
- **Framework**: Next.js 15.4.5 with App Router
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme system
- **State Management**: React hooks and context
- **Component Structure**: Modular components in `/components` organized by feature
- **API Communication**: RESTful fetch to backend on port 3001

### Backend Architecture
- **Server**: Express.js on Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT-based with role-based access control (RBAC)
- **API Structure**: RESTful endpoints under `/api/*`
- **Middleware**: Security (helmet), CORS, rate limiting, error handling
- **Logging**: Winston logger for structured logging

### Theme System
The project uses a dual-theme system defined in `/app/theme.css`:
- **Executive Light Mode** (default): Clean, premium aesthetic
- **Performance Black Theme**: Dark mode option

Colors are managed through CSS custom properties mapped to Tailwind tokens in `tailwind.config.ts`.

### Key API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/coaching/*` - AI coaching features
- `/api/dashboard/*` - Dashboard data endpoints
- `/api/crm/*` - CRM core functionality
- `/api/lenders/*` - Lender management
- `/api/marketing/*` - Marketing features

## Development Workflow

1. **Git as checkpoint system** - Commit after every feature or layout change
2. **Component reuse** - Use existing UI components from `/components/ui`
3. **Theme compliance** - Follow the Executive Suite theme defined in the design system
4. **API-first approach** - Frontend consumes backend API endpoints
5. **Type safety** - TypeScript strict mode is enabled

## AI Features Integration

The platform includes several AI-powered features:
- Daily coaching and accountability tracking
- Natural language notes and reminders
- Predictive lead scoring (future phase)
- Activity pattern recognition
- Performance insights and recommendations

## Important Conventions

- **Path aliases**: Use `@/*` for imports (maps to project root)
- **Component naming**: PascalCase for components, kebab-case for files
- **API responses**: Always return JSON with consistent error structure
- **Environment variables**: Frontend uses `.env.local`, backend uses `.env`
- **CORS**: Backend configured to accept requests from `http://localhost:3000`