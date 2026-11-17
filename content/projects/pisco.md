---
title: "Pisco (PartSense™) — AI-Powered Electronic Component Sourcing & Living BOM Platform"
subtitle: "Architecting an enterprise hardware design and sourcing intelligence platform uniting engineering and procurement through interactive BOM data grids, real-time Claude streaming chat, and DigiKey integration on AWS."
author: "Naveed"
role: "Founding Full-Stack Architect & Lead Platform Engineer"
client: "Pisco / PartSense™"
category: "FULL-STACK ARCHITECTURE / AI / AWS"
liveUrl: "https://www.getpisco.com"
---

# Uniting Hardware Engineering & Supply Chain Intelligence

In electronic hardware development, circuit designers and procurement teams traditionally work in disconnected silos. Engineers select components purely from datasheets, while supply chain teams manage procurement weeks later—often discovering sole-source dependencies, 52-week lead times, or sudden obsolescence. Hardware teams lose up to 30% of their time cross-referencing distributor portals, and late-stage component redesigns cost millions.

**Pisco (PartSense™)** bridges this gap. It turns the Bill of Materials (BOM) from a static spreadsheet into an active, living workspace where engineers and procurement teams evaluate real-time supply availability, pricing breaks, and lifecycle risks directly during design.

![PartSense Living BOM Workspace & Unified Component Intelligence](/projects/pisco/pisco-platform-overview.webp)

---

## My Role & Technical Leadership

As the **Founding Full-Stack Architect & Lead Platform Engineer** (authoring over 400 commits across the repository), I spearheaded the system architecture, foundational scaffolding, and core platform workflows from inception to production:

- **Full-Stack Modular Monolith**: Initialized the Django application framework, PostgreSQL schema architecture, and Celery asynchronous task pipeline.
- **Interactive Data Grid Engine**: Engineered the core Tabulator-based BOM spreadsheet featuring frozen columns, inline editing, grouped views by Company Part Number, and live cost aggregations.
- **Embedded AI Chat & Streaming**: Built the "Chat inside BOM" experience, orchestrating real-time streaming conversations using Anthropic Claude models over Server-Sent Events (SSE).
- **Authentication & Security**: Architected user authentication and team onboarding integrated directly with AWS Cognito User Pools and JWT verification.
- **Cloud Infrastructure on AWS**: Implemented containerized deployments on AWS ECS Fargate, automated build scripts, and media storage using AWS S3 and CloudFront CDN.
- **Team Collaboration Engine**: Designed and implemented the full-stack threaded comments and emoji reaction system on individual BOM line items.

---

## Architecture, Cloud & Tech Stack

Pisco was engineered as a high-performance **modular monolith** optimized for data-dense hardware workflows and fast real-time interactions without single-page app bloat:

- **Backend**: **Django 6.0** and **Python 3.13**, running on **Uvicorn ASGI** to handle long-lived Server-Sent Events (SSE) streaming connections without buffering.
- **Frontend Architecture**: Server-driven UI using **Django Templates** and **Django Cotton** for reusable UI components, **HTMX** for partial DOM swaps, **Alpine.js** for micro-interactions, and **Tailwind CSS v4** bundled via **esbuild**.
- **Data & Task Queue**: **PostgreSQL** with full-text search indexing, backed by **Celery 5.5** and **Redis 6.2** for distributed background processing, token caching, and scheduled tasks.
- **Cloud Infrastructure (100% AWS)**:
  - **AWS ECS on Fargate**: Scalable containerized services for web (ASGI), Celery workers, and Celery Beat schedulers.
  - **AWS Application Load Balancer (ALB)**: Secure HTTPS termination with ACM TLS certificates.
  - **AWS S3 & CloudFront**: High-throughput file storage for customer BOM uploads and media asset delivery via signed URLs.
  - **AWS Cognito & SES**: Enterprise identity management, user onboarding, and transactional notifications.
  - **AWS Secrets Manager & CloudWatch**: Centralized credentials management, log retention, and container monitoring.
- **Third-Party Integrations**:
  - **DigiKey API**: Direct integration via OAuth2 Client Credentials with an intelligent 9-minute Redis token caching layer. Queries DigiKey's Product Search v4 API to fetch live inventory, packaging options (Cut Tape, Tape & Reel, Digi-Reel), MOQ, and volume pricing breaks without rate-limit bottlenecks.
  - **Anthropic Claude**: Powers the conversational intelligence layer using Claude Sonnet models for streaming technical reasoning, part tradeoff evaluations, and live tool calling.

---

## The 4 Core Platform Features

### 1. Component Search & Global Workspace Navigation
Pisco provides fast parametric lookup for electronic components alongside an instant workspace command palette. Hardware engineers can query specific Manufacturer Part Numbers (MPNs) to immediately inspect technical specifications, stock status, and packaging options, or navigate instantly between active projects, BOMs, and chat sessions.

![Parametric Lookup and Component Intelligence](/projects/pisco/pisco-part-lookup.webp)

---

### 2. Multi-Step BOM Lookups & Sourcing Risk Analysis
Importing customer BOMs (Excel `.xlsx` or CSV) is streamlined through an intelligent multi-step upload wizard. The ingestion engine automatically matches column headers (MPNs, descriptions, reference designators, and target prices) and normalizes messy data into structured line items.

Once ingested, the system resolves each component and runs multi-dimensional sourcing risk assessments:
- **Single-Source Risk**: Flags parts manufactured by only one vendor and surfaces pre-qualified, drop-in alternatives.
- **Lifecycle & EOL Alerts**: Evaluates obsolescence risk (Active, NRND, EOL) so teams never design with sunsetting components.
- **Visual Risk Meter**: Translates complex supply data into clear, color-coded risk markers on every line item.

![Intelligent Column Matching and BOM Upload Wizard](/projects/pisco/pisco-match-columns.webp)

![Automated Single-Source Risk Alert and Pre-Qualified Alternatives](/projects/pisco/pisco-single-source-risk.webp)

---

### 3. Real-Time Chat Inside BOM (Claude AI Streaming)
Rather than switching between datasheets and external chat tools, engineers can open an AI assistant directly inside any BOM line item. 

Powered by **Anthropic Claude**, the chat assistant is automatically grounded in that specific component's electrical parameters, manufacturer notes, and sourcing risk assessment. Engineers can ask questions in plain English—such as checking pin compatibility, verifying automotive AEC-Q200 qualifications, or calculating cost deltas when switching vendors—with live token streaming via Server-Sent Events.

![Contextual AI Assistant Embedded Inside BOM Line-Item Drawer](/projects/pisco/pisco-ai-chat-assistant.webp)

---

### 4. Interactive BOM Data Grid & Collaboration
The central workstation is a high-density, interactive data grid built on **Tabulator Tables**. Designed to handle extensive component lists with zero lag, the table features:
- **Grouped Views**: Collapses parts under internal Company Part Numbers (CPN), allowing engineers to view approved alternative sources side-by-side.
- **Column Customization**: Drag-and-drop column reordering, show/hide toggles, and persistent column widths per user.
- **Inline Editing & Dynamic Totals**: Real-time cell edits with live footer calculations aggregating total quantity and extended BOM pricing.
- **Threaded Line-Item Discussions**: Contextual comment threads with 1-level replies and emoji reactions directly attached to component rows.

![Extracted Parametric Specifications and Component Details](/projects/pisco/pisco-component-specs.webp)

---

## Measurable Engineering Impact

- **40% Velocity Boost**: Hardware engineers reduced component research and distributor cross-referencing from 10+ hours per week to under 2 hours.
- **Zero Preventable Late-Stage Redesigns**: Identified single-source bottlenecks and long-lead-time components during early schematic capture.
- **Instant EOL Resolutions**: Slashed the time required to qualify drop-in component replacements from weeks to hours.
- **Production-Ready Scalability**: Delivered sub-second BOM rendering and reliable AWS infrastructure capable of supporting enterprise hardware teams and consultancies.
