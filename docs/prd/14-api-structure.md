# API Structure (PERN Stack)

## Authentication & Authorization

- JWT-based authentication
- Express middleware for route protection
- PostgreSQL user sessions
- Role-based permissions

## API Endpoints by Feature

### Dashboard APIs

```
GET /api/dashboard/metrics - Performance data
GET /api/dashboard/ai-insights - AI coaching recommendations
GET /api/dashboard/pipeline-summary - Pipeline overview
GET /api/dashboard/tasks - Prioritized task list
```

### Contact Management APIs

```
GET /api/contacts - List contacts with pagination
POST /api/contacts - Create new contact
PUT /api/contacts/:id - Update contact
DELETE /api/contacts/:id - Delete contact
GET /api/contacts/:id/intelligence - Social intelligence data
GET /api/contacts/:id/score - AI lead scoring
```

### Pipeline APIs

```
GET /api/loans - List all loans
POST /api/loans - Create new loan
PUT /api/loans/:id - Update loan details
GET /api/loans/:id/documents - Document management
POST /api/loans/:id/milestones - Update milestones
```

### Marketing Hub APIs

```
GET /api/campaigns - List campaigns
POST /api/campaigns - Create campaign
GET /api/landing-pages - List landing pages
POST /api/landing-pages/generate - AI-generate landing page
```

### Intelligence Center APIs

```
GET /api/intelligence/news - Mortgage news feed
GET /api/intelligence/news/states - State-specific market updates
GET /api/intelligence/content-suggestions - AI content ideas
GET /api/lenders/matrix - Lender matching data
GET /api/intelligence/social/:contactId - Social monitoring
GET /api/intelligence/predictions - AI predictions
```

### AI Coaching APIs

```
GET /api/coaching/daily-plan - Today's must-do activities
GET /api/coaching/hourly-nudge - Contextual reminders
GET /api/coaching/scoreboard - Live activity tracking
GET /api/coaching/weekly-vision - Weekly planning data
GET /api/coaching/patterns - Behavioral insights
POST /api/coaching/celebrate - Log micro-achievements
```

### Partner Portal APIs

```
GET /api/partners/:id/referrals - Partner's referral list
GET /api/partners/:id/commission - Commission tracking
GET /api/partners/:id/analytics - Performance metrics
POST /api/partners/:id/message - Partner communication
GET /api/partners/:id/marketing - Co-marketing materials
```

### AI & Content APIs

```
POST /api/ai/generate-content - AI content generation
POST /api/ai/optimize-subject - Email subject optimization
GET /api/ai/content-suggestions - Content recommendations
POST /api/ai/analyze-conversation - Call/chat analysis
```

### Social Media APIs

```
POST /api/social/publish - Multi-platform posting
GET /api/social/analytics - Engagement metrics
GET /api/social/calendar - Content calendar
POST /api/social/schedule - Schedule posts
```

### Credit & Underwriting APIs

```
POST /api/credit/pull - Initiate credit pull
GET /api/credit/report/:id - Retrieve credit report
POST /api/credit/monitor - Set up monitoring
POST /api/aus/submit - Submit to AUS
GET /api/preapproval/generate - Generate letter
```

### Client for Life APIs

```
GET /api/campaigns/anniversaries - Anniversary campaigns
POST /api/campaigns/milestone - Trigger milestone campaign
GET /api/alerts/property-listing - Listed property alerts
GET /api/alerts/refinance - Refi opportunity alerts
```

### Mobile App APIs

```
POST /api/mobile/sync - Offline data sync
POST /api/mobile/push - Send push notification
POST /api/documents/scan - Process scanned document
POST /api/voice/transcribe - Transcribe voice note
```

### Document Generation APIs

```
POST /api/documents/generate - Create from template
GET /api/documents/templates - Template library
POST /api/documents/esign - Initiate e-signature
GET /api/documents/versions - Version history
```
