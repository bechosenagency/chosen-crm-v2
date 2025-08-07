# High-Level Architecture

## System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                      │
├─────────────────────────────────────────────────────────────┤
│  Web App (React/Next.js)  │  Mobile App (React Native)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                       │
├─────────────────────────────────────────────────────────────┤
│  Kong/Envoy Gateway │  Rate Limiting │  Authentication   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Microservices Layer                      │
├─────────────────────────────────────────────────────────────┤
│ User Mgmt │ CRM Core │ Lender Intel │ AI Engine │ Analytics │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                              │
├─────────────────────────────────────────────────────────────┤
│ PostgreSQL │ Redis │ Elasticsearch │ S3 │ Event Streams   │
└─────────────────────────────────────────────────────────────┘
```

## Initial PERN Architecture (MVP Phase)

For initial development and MVP, we'll use a simplified PERN stack:

- **Single Express.js API**: Monolithic backend with modular structure
- **PostgreSQL Database**: Single database with logical separation
- **Redis**: Caching and session management
- **Next.js Frontend**: Single application serving all user types
- **Future Migration Path**: Code organized to enable future microservice extraction
