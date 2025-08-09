# Data Architecture

## Database Design

### Primary Database (PostgreSQL)

#### Users & Authentication

```
├── users
├── roles
├── permissions
├── user_sessions
└── mfa_tokens
```

#### CRM & Lead Management

```
├── leads
├── contacts
├── activities
├── pipelines
├── deals
└── follow_ups
```

#### Lender Intelligence

```
├── lenders
├── rates
├── scenarios
├── borrower_profiles
└── lender_matches
```

#### AI & Coaching

```
├── goals
├── achievements
├── performance_metrics
├── gamification_data
├── coaching_sessions
├── daily_accountability_scores
├── activity_logs
├── streak_tracking
└── behavioral_patterns
```

#### Applications & Forms

```
├── applications
├── form_data
├── validation_rules
└── export_logs
```

#### Marketing & Portals

```
├── landing_pages
├── templates
├── partner_portals
└── communication_logs
```

### Cache Layer (Redis)

- **Session Storage**: User sessions and authentication tokens
- **Rate Limiting**: API rate limiting and throttling
- **Real-time Data**: Live dashboard data and notifications
- **Lender Cache**: Frequently accessed lender rates and data
- **AI Coaching Cache**: Daily goals, live scoreboards, activity counts

### Search Engine (Elasticsearch)

- **Lead Search**: Advanced lead filtering and search
- **Document Search**: Application and form data search
- **Analytics**: Log analysis and performance monitoring
- **Activity Search**: Historical activity pattern analysis

## Data Flow Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   External  │    │   Internal  │    │   Analytics │
│   Sources   │    │   Services  │    │   Pipeline  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   API       │    │   Event     │    │   Data      │
│   Gateway   │    │   Stream    │    │   Warehouse │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Primary   │    │   Cache     │    │   Search    │
│   Database  │    │   Layer     │    │   Engine    │
└─────────────┘    └─────────────┘    └─────────────┘
```
