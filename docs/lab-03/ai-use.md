# AI Assistance Record: Lab 3 TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

## 1. LLM Tool Identification
- **Primary AI Agent:** Antigravity AI Coding Assistant (Powered by Google Gemini 2.5 Pro)
- **Course Stack Context:** Node.js, Express, TypeScript, React, Tailwind / Vanilla CSS Zen Green, Prisma ORM, PostgreSQL, Vitest, Playwright.

---

## 2. Selected Key Prompts & Specification Generation

### Prompt 1: Handout Deconstruction & Architecture Planning
> *"Lab 3 TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens. Help deconstruct the requirements into 3 distinct user roles (Requester, IT Staff, Administrator), define explicit scope exclusions, and map out the required engineering deliverables."*
- **Outcome:** Derived the complete FR-01 through FR-26 and explicit exclusions for Sprint 3.

### Prompt 2: Data Model Evolution & Backward Compatibility
> *"Design Prisma schema evolution extending Lab 2 Ticket without dropping existing records. Include User model, Role enum, Priority enum with URGENT, PublicComment, and InternalNote relations with necessary database indexes."*
- **Outcome:** Generated clean Prisma schema with `@relation`, cascade rules on ticket deletion, and indexes on `ticketId`, `ownerId`, and `status`.

### Prompt 3: State Transition Matrix & Claim Workflow
> *"Define the strict state transition rules for TokTickIT tickets across 8 statuses: NEW, OPEN, IN_PROGRESS, WAITING_FOR_REQUESTER, RESOLVED, CLOSED, REOPENED, CANCELLED. Formulate business rules for ticket claiming and mandatory resolution summary."*
- **Outcome:** Formulated BR-06 through BR-11 and AC-07 to AC-08 ensuring resolve requires a 3-500 character summary.

### Prompt 4: Internal Notes Security & Data Leak Prevention
> *"How should the REST API protect Internal Notes from leaking to Requesters? Should GET /api/tickets/:id return notes, or should notes be accessed via a dedicated route?"*
- **Outcome:** Designed SEC-03 and SEC-04 ensuring Requester calls never receive Internal Notes in payload and receive HTTP 403 on dedicated note routes.

### Prompt 5: Administrator Safety Guards Formulation
> *"Specify safety rules for Administrator user management to prevent self-lockout and system-wide admin loss."*
- **Outcome:** Established BR-18 and BR-19 disallowing self-deactivation and preventing modification of the system's last active Administrator account.

### Prompt 6: Zen Green UI & Distinction Styling
> *"Extend the Zen Green design system for IT Staff Ticket Queue and Internal Notes. Ensure Internal Notes are visually distinct from Public Comments to prevent accidental public disclosure."*
- **Outcome:** Designed the Amber `#FFF8E1` container with `#FFA000` border and lock icon for Internal Notes versus soft green `#EAF6EF` for Public Comments.

### Prompt 7: Test Traceability Matrix Construction
> *"Generate a comprehensive test matrix mapping all Acceptance Criteria (AC-01 through AC-12) to unit, API, and E2E test files following the Lab 3 directory structure."*
- **Outcome:** Produced 35 planned test cases in `docs/lab-03/tests.md` with explicit file paths and expected behaviors.

### Prompt 8: Peer Review Verification
> *"Perform a strict code and architecture review on the partner's Lab 3 PR, verifying data leakage risks, schema alignment, password complexity rules, and REST API conventions."*
- **Outcome:** Identified 6 critical improvements regarding Internal Note data leakage, resolution summary validation, and priority enums.

---

## 3. My Reflection on Specification and Coding Agent Use

Working with the AI specification agent on Lab 3 demonstrated the critical importance of **Specification-Driven Development (SpecDD)** before writing implementation code. 

By taking the time to explicitly formulate Business Rules (such as preventing the last Administrator from being deactivated and isolating Internal Notes from Requester payloads), we prevented subtle security flaws and architectural mismatches early. The AI agent excelled at identifying edge cases in state transitions and maintaining strict design token continuity with Lab 2. Moving forward into implementation, having this clear contract ensures that backend APIs, database migrations, and frontend UI components remain aligned and verifiable through automated tests.
