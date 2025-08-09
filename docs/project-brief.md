Executive Summary
ChosenCRM's navigation architecture combines industry best practices with innovative AI-powered features to create a next-generation mortgage CRM. The platform uses a hybrid navigation approach with a persistent left sidebar for primary navigation and contextual top navigation for sub-features, optimizing for both efficiency and discoverability.
Design System & Theme

## Design System Update

### Performance Black Theme

- Background: Pure white #FFFFFF
- Sidebar: Charcoal #1A1A1A
- Primary: Electric Blue #0066FF
- Success: Emerald #10B981
- Warning: Amber #F59E0B
- Error: Rose #EF4444
- Text: Slate #334155
  This theme provides a serious, data-driven aesthetic similar to Stripe or high-performance trading platforms.
  UI Principles:
  Light, professional backgrounds (no dark themes)
  Premium feel suitable for $500/month enterprise pricing
  Clean, minimal design that appeals to mortgage professionals
  Subtle shadows and depth, avoiding flat design
  Smooth transitions and hover states
  Technology Stack
  Backend (PERN Stack):
  PostgreSQL database
  Express.js API server
  Node.js runtime
  RESTful API architecture
  Frontend:
  Next.js (React framework)
  Tailwind CSS with Coastal Elite theme
  shadcn/ui components
  Responsive design for all devices
  Core Navigation Philosophy
  Design Principles:
  AI-First Architecture: Every page incorporates AI coaching and intelligence features
  Progressive Disclosure: Show essential information first, with drill-down capabilities
  Role-Based Customization: Adaptive interfaces for loan officers, managers, processors, and marketers
  Mobile-Desktop Parity: Consistent experience across all devices
  Workflow Automation: Reduce clicks through intelligent automation
  Primary Navigation Structure
  Left Sidebar Navigation (Persistent)
  Sidebar Design:
  Deep Ocean gradient background (#0c4a6e to #155e75)
  White icons and text for contrast
  Expandable/collapsible design
  User profile widget at bottom

1. Dashboard
   Personal Dashboard (default view)
   Team Dashboard (admin tab - only visible to managers)
   AI-powered insights and daily priorities
   Mortgage news feed with content creation suggestions
   Performance metrics with coaching recommendations
   Pipeline overview with conversion predictions
2. Contacts
   360-degree customer intelligence profiles
   Social intelligence tracking integration
   Lead scoring with AI recommendations
   Relationship mapping and referral tracking
   Individual realtor partner dashboards
3. Pipeline
   Visual loan tracking with drag-and-drop
   AI-powered stage predictions
   Document management integration
   Automated milestone notifications
4. Marketing Hub
   Campaign management (Email & SMS)
   Landing page builder
   Templates library (Email, SMS, Landing Pages)
   Workflow Builder (automation)
   Multi-channel communication center
   Analytics and performance tracking
   Social Media Center# ChosenCRM Product Requirements Document: Navigation Structure & Page Organization
5. Intelligence Center (Unique to ChosenCRM)
   Lender Intelligence Matrix
   Market insights for licensed states
   Competitive analysis
   Social intelligence dashboard
   Predictive analytics and forecasting
6. Coaching Hub (Unique to ChosenCRM)
   Daily, Weekly, and Monthly accountability system
   Personalized AI coaching dashboard
   Performance improvement recommendations
   Best practice library
   Goal tracking with micro-celebrations
   Activity scoreboard and leaderboards
7. Partner Portal
   Realtor/referral partner access
   Separate login for partners
   Commission tracking by partner
   Co-marketing tools
8. Reports
   Real-time analytics dashboards
   Custom report builder
   ROI tracking and attribution
   Compliance reporting
9. Settings
   User and team management
   Licensed states configuration
   Integration configuration
   Workflow automation rules
   System preferences
   Detailed Page Specifications
10. Dashboard Pages
    Personal Dashboard (Default View)
    Components:
    Tab Selector (Personal | Team) - Team tab only visible to admins
    AI Priority Panel (Top): Shows top 5 AI-recommended actions for the day
    Mortgage Intelligence Feed:
    Today's rate movements with visual chart
    Top 3 industry headlines (AI-summarized)
    Local market updates for licensed states
    Content creation suggestions
    One-click actions: Create social post, draft email, generate video script
    Performance Scorecard: Key metrics with AI coaching insights
    Pipeline Snapshot: Visual pipeline with conversion predictions
    Activity Feed: Real-time updates on leads, loans, and team activity
    Quick Actions Bar: One-click access to common tasks
    Team Dashboard (Admin Only)
    Components:
    Team Overview: Aggregate performance metrics
    Individual Performance Grid: Sortable team member stats
    Pipeline Analytics: Team-wide conversion analysis
    Coaching Leaderboard: Gamification rankings
    Activity Heatmap: Team productivity visualization
11. Contacts Section
    Contact Management Hub
    Main View:
    Smart Filter Bar: AI-powered filters with saved views
    Contact Grid/List: Toggle between views with customizable columns
    Bulk Actions Toolbar: Mass updates, campaigns, and assignments
    AI Insights Panel: Shows social signals and opportunity scores
    Individual Contact Profile
    Tabs:
    Overview Tab:

Contact information with social profile integration
AI-generated relationship score and insights
Communication timeline
Quick action buttons
Intelligence Tab (Unique):

Social intelligence tracking data
Life event monitoring
Financial health indicators
Predictive opportunity scoring
Loan History Tab:

Current and past loans
Document vault
Milestone tracking
Automated status updates
Communications Tab:

Unified inbox (email, SMS, social)
Communication preferences
Campaign enrollment
Scheduled touchpoints
Notes & Tasks Tab:

AI-suggested follow-ups
Team collaboration notes
Task management
Meeting scheduler 3. Pipeline Management
Pipeline Dashboard
Views:
Kanban Board: Drag-and-drop loan stages with AI-powered insights
List View: Detailed loan information with sorting/filtering
Calendar View: Timeline of closings and key dates
Map View: Geographic distribution of active loans
Features per View:
AI-powered bottleneck detection
Automated task creation by stage
Document requirement tracking
Team collaboration indicators
Loan Detail Page
Sections:
Loan Summary: Key details with AI risk assessment
Document Center: Integrated document management with AI verification
Milestone Tracker: Visual progress with automated notifications
Communication Log: All borrower and partner communications
AI Insights: Predictive close probability and recommended actions 4. Marketing Hub
Marketing Dashboard
Main Navigation Tabs:
Campaigns: Email and SMS campaign management
Landing Pages: AI-powered page builder
Templates: Centralized template library
Workflow Builder: Visual automation designer
Analytics: Performance tracking across all channels
Campaign Management
Features:
Unified Campaign Creator: Email and SMS in one interface
Audience Segmentation: AI-powered list building
A/B Testing: Built-in split testing
Scheduling: Optimal send time recommendations
Compliance: TCPA and CAN-SPAM adherence
Landing Page Builder
Components:
Template Gallery: Industry-specific templates with conversion data
AI Content Generator: Headlines, copy, and CTA suggestions
Drag-and-Drop Editor: Visual builder with real-time preview
Mobile Optimization: Automatic responsive design
Integration Panel: Form mapping to CRM fields
Analytics Dashboard: Conversion tracking with heatmaps
Templates Library
Categories:
Email Templates:
New lead nurture sequences
Rate alert campaigns
Milestone congratulations
Re-engagement series
SMS Templates:
Quick follow-ups
Appointment reminders
Document requests
Status updates
Landing Page Templates:
First-time buyer guides
Refinance calculators
Pre-approval applications
Market reports
Social Media Center
Features:
Multi-Platform Publishing: Post to Facebook, Instagram, LinkedIn, Twitter/X, TikTok, YouTube
Content Calendar: Visual scheduler with optimal posting times
AI Content Creator: Generate posts, captions, and hashtags
Analytics Dashboard: Engagement metrics and lead attribution
Compliance Queue: Review and approval workflow
Content Library: Reusable posts and templates
Platform Support:
Facebook & Instagram (via Meta Business API)
LinkedIn (via LinkedIn API)
Twitter/X (via Twitter API v2)
TikTok (via TikTok Business API - requires approval)
YouTube (for video uploads)
AI Content Assistant
Capabilities:
Email Generator: Create personalized emails based on context
Social Media Posts: Generate engaging posts with hashtags
SMS Templates: Craft compliant text messages
Blog Content: Create educational articles
Video Scripts: Generate scripts for social media videos
Subject Line Optimizer: AI-powered A/B testing suggestions 5. Intelligence Center (Unique to ChosenCRM)
Lender Intelligence Matrix
Dashboard Components:
Market Conditions Panel: Real-time rates and market trends
Competitor Analysis: Pricing and product comparisons
Opportunity Finder: AI-identified lending opportunities
Risk Assessment: Portfolio risk analysis and recommendations
Social Intelligence Dashboard
Features:
Social Monitoring Feed: Real-time social signals from contacts
Life Event Alerts: Marriage, job changes, new children detection
Engagement Scoring: Social interaction analysis
Referral Network Map: Visual representation of influence networks
Predictive Analytics
Modules:
Lead Conversion Predictor: AI scoring with explanation
Market Forecast: Local market predictions
Client Lifetime Value: Predictive CLV calculations
Churn Risk Analysis: Early warning system 6. AI Coaching Hub (Unique to ChosenCRM)
Accountability Dashboard (Inspired by Accountable CRM, Enhanced)
Three-Tier System:
Daily View:
Morning Push (6 AM): "Your 3 must-do activities today"
Live Activity Scoreboard: Real-time progress tracking
Hourly Nudges: "You usually complete 5 calls by 11 AM"
Micro-Celebrations: Instant rewards for task completion
End-of-Day Summary: Completion percentage with insights
Weekly View:
Vision Board: Drag-and-drop weekly planning
Progress Thermometer: Visual progress to weekly goals
Peer Benchmarking: Anonymous team comparisons
AI Pattern Recognition: "Your best days are Tuesdays and Thursdays"
Content Calendar: AI-suggested topics based on pipeline
Monthly View:
90-Day Cycles: Quarterly performance reviews
Trend Analysis: Performance patterns with AI insights
Goal Adjustment: AI-recommended target modifications
Achievement Unlocks: Gamified milestone rewards
Coaching Report: Comprehensive monthly analysis
AI Coaching Features
Unique Enhancements:
Behavioral Insights: "You convert 40% better after video posts"
Optimal Time Suggestions: "Call Jennifer at 2 PM - highest answer rate"
Energy Management: "Take a break - your conversion drops after 3 PM"
Content Coaching: "Create a video about VA loans - 5 prospects need this"
Accountability Partners: Optional peer accountability matching
Best Practices Library
AI-Curated Content:
Success Pattern Analysis: What top performers do differently
Script Library: AI-analyzed high-converting scripts
Video Templates: Proven video formats with prompts
Email Sequences: Top-performing nurture campaigns
Objection Handlers: AI-trained response suggestions 7. Partner Portal
Realtor Partner Access
Two Entry Points:
Main Sidebar: "Partner Portal" for all partners
Contact Profile: Individual "Partner Dashboard" tab for each realtor
Realtor View Features:
Referral Dashboard:
List of all referred clients with loan status
Commission tracking: "You've earned [LO Name] $45,000 from your 12 referrals"
Conversion metrics: "Your referrals convert at 78%"
Active Loans: Real-time status of referred clients
Communication Hub: Direct messaging with LO
Co-Marketing Tools:
Shared content library
Co-branded materials
Joint campaign creation
Performance Analytics: Referral quality scores
Access Control:
Separate login credentials
Can only see their own referrals
Read-only loan status (no sensitive financial data)
Audit trail of all portal activity 8. Client Portal (Separate from Main CRM)
Borrower Access:
Unique URL: Sent via email/SMS to each borrower
No Main Navigation: Standalone interface
Features:
Secure document upload
Loan status tracker with milestones
Task list (what borrower needs to do)
Secure messaging with LO
Appointment scheduling
Educational resources
Security:
Token-based authentication
Expires after loan closes (configurable)
SSL encryption for all data
No access to other borrowers' data 9. Advanced Features
Credit & Underwriting Center
Features:
Credit Pull Integration: Direct integration with credit bureaus
Instant Credit Reports: Pull tri-merge credit reports
Liability Import: Automatically import debts and obligations
AUS Integration: Connect to Automated Underwriting Systems
Credit Monitoring: Alert when client's credit changes
Pre-approval Engine: Generate instant pre-approval letters
Client for Life System
Automated Campaigns:
Loan Anniversaries: Annual check-ins with refinance analysis
Home Anniversaries: Celebrate purchase milestones
Birthday Campaigns: Personalized greetings and offers
Market Update Campaigns: Monthly value reports
Referral Requests: Strategic timing for referral asks
Holiday Greetings: Seasonal touchpoints
Advanced Alerts & Monitoring
Intelligent Notifications:
Listed Property Alerts: When past client lists their home
Refinance Opportunities: Rate drop alerts for eligible clients
Life Event Detection: Job changes, marriages, new children
Market Shift Alerts: Significant rate or market changes
Compliance Warnings: License expirations, regulation updates
Team Performance Alerts: When metrics drop below thresholds
Mobile Applications
Native Apps (iOS & Android):
Full CRM Access: All features available on mobile
Offline Mode: Work without internet connection
Push Notifications: Real-time alerts
Document Scanner: Capture documents via camera
Voice Notes: Record client conversations
Location Services: Check-in at property showings
Content & Document Center
Comprehensive Library:
Marketing Templates: 1000+ pre-approved templates
Compliance-Approved Content: RESPA/TRID compliant
Document Generation: Auto-fill from CRM data
E-signature Integration: Built-in document signing
Version Control: Track document changes
Co-branded Materials: Partner-ready content
Team & Recruitment Tools
Advanced Team Features:
Organizational Chart View: Visual team hierarchy
Shared Pipelines: Collaborative loan management
Performance Dashboards: Team and individual metrics
Commission Tracking: Automated split calculations
Training Modules: Onboarding content library
Recruitment Marketing:
Career Page Builder: Attract new loan officers
Onboarding Workflows: Automated new hire process
Culture Showcase: Company values and benefits
Performance Metrics: Show team success rates
Mobile Application Structure
Mobile-Specific Navigation
Bottom Tab Bar:
Home - Simplified dashboard
Contacts - Quick search and add
Pipeline - Swipeable loan cards
Tasks - Today's priorities
More - Additional features
Mobile-Optimized Features
Offline Mode: Critical functions available without internet
Voice Commands: AI-powered voice navigation
Quick Capture: Photo documents and business cards
Location Services: Meeting check-ins and property visits
Integration Architecture
Core API Structure (PERN Stack)
Authentication & Authorization:
JWT-based authentication
Express middleware for route protection
PostgreSQL user sessions
Role-based permissions
API Endpoints by Feature
Dashboard APIs:
GET /api/dashboard/metrics - Performance data
GET /api/dashboard/ai-insights - AI coaching recommendations
GET /api/dashboard/pipeline-summary - Pipeline overview
GET /api/dashboard/tasks - Prioritized task list
Contact Management APIs:
GET /api/contacts - List contacts with pagination
POST /api/contacts - Create new contact
PUT /api/contacts/:id - Update contact
DELETE /api/contacts/:id - Delete contact
GET /api/contacts/:id/intelligence - Social intelligence data
GET /api/contacts/:id/score - AI lead scoring
Pipeline APIs:
GET /api/loans - List all loans
POST /api/loans - Create new loan
PUT /api/loans/:id - Update loan details
GET /api/loans/:id/documents - Document management
POST /api/loans/:id/milestones - Update milestones
Marketing Hub APIs:
GET /api/campaigns - List campaigns
POST /api/campaigns - Create campaign
GET /api/landing-pages - List landing pages
POST /api/landing-pages/generate - AI-generate landing page
Intelligence Center APIs:
GET /api/intelligence/news - Mortgage news feed
GET /api/intelligence/news/states - State-specific market updates
GET /api/intelligence/content-suggestions - AI content ideas
GET /api/lenders/matrix - Lender matching data
GET /api/intelligence/social/:contactId - Social monitoring
GET /api/intelligence/predictions - AI predictions
AI Coaching APIs:
GET /api/coaching/daily-plan - Today's must-do activities
GET /api/coaching/hourly-nudge - Contextual reminders
GET /api/coaching/scoreboard - Live activity tracking
GET /api/coaching/weekly-vision - Weekly planning data
GET /api/coaching/patterns - Behavioral insights
POST /api/coaching/celebrate - Log micro-achievements
Partner Portal APIs:
GET /api/partners/:id/referrals - Partner's referral list
GET /api/partners/:id/commission - Commission tracking
GET /api/partners/:id/analytics - Performance metrics
POST /api/partners/:id/message - Partner communication
GET /api/partners/:id/marketing - Co-marketing materials
AI & Content APIs:
POST /api/ai/generate-content - AI content generation
POST /api/ai/optimize-subject - Email subject optimization
GET /api/ai/content-suggestions - Content recommendations
POST /api/ai/analyze-conversation - Call/chat analysis
Social Media APIs:
POST /api/social/publish - Multi-platform posting
GET /api/social/analytics - Engagement metrics
GET /api/social/calendar - Content calendar
POST /api/social/schedule - Schedule posts
Credit & Underwriting APIs:
POST /api/credit/pull - Initiate credit pull
GET /api/credit/report/:id - Retrieve credit report
POST /api/credit/monitor - Set up monitoring
POST /api/aus/submit - Submit to AUS
GET /api/preapproval/generate - Generate letter
Client for Life APIs:
GET /api/campaigns/anniversaries - Anniversary campaigns
POST /api/campaigns/milestone - Trigger milestone campaign
GET /api/alerts/property-listing - Listed property alerts
GET /api/alerts/refinance - Refi opportunity alerts
Mobile App APIs:
POST /api/mobile/sync - Offline data sync
POST /api/mobile/push - Send push notification
POST /api/documents/scan - Process scanned document
POST /api/voice/transcribe - Transcribe voice note
Document Generation APIs:
POST /api/documents/generate - Create from template
GET /api/documents/templates - Template library
POST /api/documents/esign - Initiate e-signature
GET /api/documents/versions - Version history
Database Schema Overview
PostgreSQL Tables:
users - User accounts and profiles
contacts - Customer information
loans - Loan pipeline data
documents - Document metadata
campaigns - Marketing campaigns
landing_pages - Landing page templates
ai_insights - Cached AI recommendations
activity_logs - User activity tracking
integrations - Third-party connections
social_posts - Social media content and analytics
credit_reports - Credit pull history
content_library - Marketing templates
team_hierarchy - Organizational structure
commission_splits - Commission tracking
compliance_logs - Audit trail
mobile_sync - Offline data sync
UI/UX Design Specifications
Visual Design Guidelines
Page Layouts:
Light background (#f7fbfc) for main content areas
White (#ffffff) cards with subtle shadows
Deep Ocean sidebar provides visual anchor
Consistent spacing: 8px grid system
Card-based design with rounded corners (8px)
Typography:
Headers: Dark Ocean (#0c4a6e), semi-bold
Body text: Dark Ocean (#0c4a6e), regular
Secondary text: 70% opacity of primary
Font family: Inter or system fonts
Interactive Elements:
Buttons: Cyan gradient with white text
Hover states: 10% darker shade
Focus states: Cyan outline
Loading states: Subtle animations
Data Visualization:
Charts use cyan/blue color palette
Success metrics in green (#10b981)
Warning indicators in amber (#f59e0b)
Error states in red (#ef4444)
Component Library
Based on shadcn/ui with Coastal Elite customization:
Custom button variants (primary, secondary, ghost)
Card components with consistent shadows
Form inputs with cyan focus states
Data tables with sorting/filtering
Modal dialogs with backdrop blur
Toast notifications with appropriate colors
Success Metrics
Navigation Efficiency KPIs
Average clicks to complete common tasks (target: <3)
Time to find information (target: <10 seconds)
Feature adoption rate (target: >80% within 30 days)
Mobile vs desktop usage parity (target: 40/60 split)
User Satisfaction Metrics
Navigation clarity score (target: >4.5/5)
Feature discoverability rate (target: >90%)
Support ticket reduction (target: 50% decrease)
User retention rate (target: >95%)
Implementation Roadmap
Phase 1: Core Navigation (Months 1-2)
Dashboard and contact management
Basic pipeline functionality
Essential integrations
Phase 2: Intelligence Features (Months 3-4)
AI coaching dashboard
Lender Intelligence Matrix
Social intelligence tracking
Phase 3: Advanced Features (Months 5-6)
Landing page builder
Advanced automation
Complete mobile parity
Phase 4: Optimization (Ongoing)
A/B testing navigation elements
AI model refinement
User feedback implementation
Conclusion
This navigation structure positions ChosenCRM as the most advanced mortgage CRM platform by seamlessly integrating AI coaching, lender intelligence, and social tracking into every aspect of the loan officer workflow. The architecture prioritizes efficiency while maintaining the flexibility to adapt to different user preferences and business models.
