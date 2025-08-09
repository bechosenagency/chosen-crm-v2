# ChosenCRM PRD Summary

## Overview

ChosenCRM is a next-generation AI-powered mortgage CRM platform designed for loan officers, managers, processors, and marketers. The platform combines industry best practices with innovative AI features to create a comprehensive mortgage workflow solution.

## Technology Stack

- **Backend**: PERN Stack (PostgreSQL, Express.js, React/Next.js, Node.js)
- **Frontend**: Next.js with Tailwind CSS and shadcn/ui components
- **Theme**: Performance Black - serious, data-driven aesthetic

## Design System

- **Primary Background**: #FFFFFF (Pure white)
- **Sidebar**: #1A1A1A (Charcoal)
- **Primary Accent**: #0066FF (Electric Blue)
- **Success**: #10B981 (Emerald)
- **Warning**: #F59E0B (Amber)
- **Error**: #EF4444 (Rose)

## Core Navigation Structure

### 1. Dashboard

- Personal Dashboard with AI-powered insights
- Team Dashboard (admin-only)
- Mortgage news feed with content suggestions
- Performance metrics and pipeline overview

### 2. Contacts

- 360-degree customer intelligence profiles
- Social intelligence tracking
- AI-powered lead scoring
- Relationship mapping

### 3. Pipeline

- Visual loan tracking with drag-and-drop
- AI stage predictions
- Document management
- Automated notifications

### 4. Marketing Hub

- Email & SMS campaigns
- Landing page builder
- Template library
- Workflow automation
- Social Media Center (Facebook, Instagram, LinkedIn, Twitter/X, TikTok, YouTube)

### 5. Intelligence Center (Unique Feature)

- Lender Intelligence Matrix
- Market insights for licensed states
- Competitive analysis
- Predictive analytics

### 6. Coaching Hub (Unique Feature)

- Daily/Weekly/Monthly accountability system
- AI-powered behavioral insights
- Performance recommendations
- Activity scoreboard and leaderboards

### 7. Partner Portal

- Realtor/referral partner access
- Commission tracking
- Co-marketing tools
- Separate login system

### 8. Reports

- Real-time analytics
- Custom report builder
- ROI tracking
- Compliance reporting

### 9. Settings

- User and team management
- Integration configuration
- System preferences

## Key Differentiators

### AI-First Architecture

- Every page incorporates AI coaching and intelligence
- Predictive analytics for loan conversions
- Behavioral insights ("You convert 40% better after video posts")
- Optimal timing suggestions for client outreach

### Social Intelligence

- Life event monitoring (marriages, job changes, new children)
- Social signal tracking from contacts
- Engagement scoring
- Referral network mapping

### Advanced Features

- Credit pull integration with bureau APIs
- Automated Underwriting System (AUS) integration
- Client for Life automated campaigns
- Native mobile apps with offline mode
- Document generation with e-signature

## API Architecture

### Authentication

- JWT-based authentication
- Role-based permissions
- PostgreSQL session management

### Core API Endpoints

- `/api/dashboard/*` - Performance metrics and insights
- `/api/contacts/*` - Contact management and intelligence
- `/api/loans/*` - Pipeline management
- `/api/campaigns/*` - Marketing automation
- `/api/intelligence/*` - AI insights and predictions
- `/api/coaching/*` - Accountability and performance tracking
- `/api/partners/*` - Partner portal functionality
- `/api/social/*` - Social media management
- `/api/credit/*` - Credit and underwriting

## Database Schema

Key PostgreSQL tables:

- users, contacts, loans, documents
- campaigns, landing_pages
- ai_insights, activity_logs
- social_posts, credit_reports
- team_hierarchy, commission_splits

## Implementation Phases

### Phase 1 (Months 1-2)

- Core navigation and dashboard
- Basic contact and pipeline management
- Essential integrations

### Phase 2 (Months 3-4)

- AI coaching dashboard
- Lender Intelligence Matrix
- Social intelligence tracking

### Phase 3 (Months 5-6)

- Landing page builder
- Advanced automation
- Mobile app parity

### Phase 4 (Ongoing)

- A/B testing and optimization
- AI model refinement
- User feedback implementation

## Success Metrics

- Average clicks to complete tasks: <3
- Feature adoption rate: >80% within 30 days
- User retention rate: >95%
- Navigation clarity score: >4.5/5

## Target Market

- Pricing: $500/month enterprise pricing
- Users: Loan officers, managers, processors, marketers
- Focus: Performance-driven mortgage professionals seeking AI-powered efficiency
