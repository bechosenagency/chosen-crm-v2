# Database Schema Overview

## PostgreSQL Tables

### Core Tables

- **users** - User accounts and profiles
- **contacts** - Customer information
- **loans** - Loan pipeline data
- **documents** - Document metadata
- **campaigns** - Marketing campaigns
- **landing_pages** - Landing page templates

### AI & Intelligence Tables

- **ai_insights** - Cached AI recommendations
- **social_intelligence** - Social monitoring data
- **predictive_scores** - AI scoring results
- **coaching_metrics** - Performance tracking

### Activity & Logging Tables

- **activity_logs** - User activity tracking
- **communication_logs** - All communications
- **audit_trail** - System-wide audit log
- **compliance_logs** - Regulatory compliance

### Integration Tables

- **integrations** - Third-party connections
- **api_keys** - Integration credentials
- **webhook_logs** - Webhook activity
- **sync_status** - Data sync tracking

### Marketing Tables

- **email_campaigns** - Email campaign data
- **sms_campaigns** - SMS campaign data
- **social_posts** - Social media content and analytics
- **content_library** - Marketing templates

### Financial Tables

- **credit_reports** - Credit pull history
- **commission_splits** - Commission tracking
- **transactions** - Financial transactions
- **invoices** - Billing records

### Team & Organization Tables

- **teams** - Team definitions
- **team_hierarchy** - Organizational structure
- **roles** - Role definitions
- **permissions** - Permission sets

### Partner Tables

- **partners** - Realtor/referral partners
- **referrals** - Referral tracking
- **partner_analytics** - Partner performance
- **co_marketing** - Shared marketing assets

### Mobile & Sync Tables

- **mobile_devices** - Registered devices
- **mobile_sync** - Offline data sync
- **push_tokens** - Push notification tokens
- **sync_conflicts** - Conflict resolution

## Key Relationships

- Users → Teams (many-to-many)
- Contacts → Loans (one-to-many)
- Loans → Documents (one-to-many)
- Users → Activity Logs (one-to-many)
- Partners → Referrals → Contacts (one-to-many)
- Campaigns → Communications (one-to-many)
