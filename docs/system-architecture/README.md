# ChosenCRM System Architecture - Master Index

This directory contains the complete System Architecture documentation for ChosenCRM, organized into logical sections for easy navigation and reference.

## Document Structure

### Overview & Foundation

1. **[01-executive-summary.md](./01-executive-summary.md)** - Architecture overview and key principles
2. **[02-high-level-architecture.md](./02-high-level-architecture.md)** - System components and PERN MVP approach
3. **[03-microservices-breakdown.md](./03-microservices-breakdown.md)** - Core service definitions

### Specialized Services

4. **[04-ai-coaching-service.md](./04-ai-coaching-service.md)** - AI coaching and gamification architecture

### Infrastructure Components

5. **[05-data-architecture.md](./05-data-architecture.md)** - Database design and data flow
6. **[06-security-architecture.md](./06-security-architecture.md)** - Security layers and compliance
7. **[07-scalability-performance.md](./07-scalability-performance.md)** - Scaling strategies and optimization

### Integration & Operations

8. **[08-integration-architecture.md](./08-integration-architecture.md)** - External and internal integrations
9. **[09-monitoring-observability.md](./09-monitoring-observability.md)** - Monitoring stack and metrics
10. **[10-deployment-architecture.md](./10-deployment-architecture.md)** - CI/CD and deployment strategies

### Business Continuity & Planning

11. **[11-disaster-recovery.md](./11-disaster-recovery.md)** - Backup and recovery procedures
12. **[12-technology-stack.md](./12-technology-stack.md)** - Complete technology listing
13. **[13-implementation-roadmap.md](./13-implementation-roadmap.md)** - Phased development plan

## Quick Reference

### Architecture Highlights

- **Type**: Cloud-native microservices architecture
- **Scale**: 10,000+ concurrent users
- **Performance**: Sub-2-second response times
- **Availability**: 99.9% uptime target
- **Security**: Zero-trust model with end-to-end encryption

### Core Technologies

- **Frontend**: Next.js 15.3.4, React 18, Tailwind CSS
- **Backend**: Node.js/Express, Python/FastAPI
- **Database**: PostgreSQL 15+, Redis 7+
- **Search**: Elasticsearch 8+
- **Infrastructure**: Docker, Kubernetes, AWS/GCP

### Key Services

1. User Management
2. CRM Core
3. Lender Intelligence
4. AI Coaching Engine
5. Communication
6. Application Processing
7. Marketing
8. Analytics

### Design System

- **Theme**: Performance Black
- **Primary Color**: #0066FF (Electric Blue)
- **Background**: #FFFFFF (Pure white)
- **Sidebar**: #1A1A1A (Charcoal)

## Document Information

- **Version**: 1.1
- **Last Updated**: 8/3/2025
- **Theme**: Performance Black
- **Original Document**: [system-architecture.md](../system-architecture.md)
