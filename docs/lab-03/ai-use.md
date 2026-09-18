# AI Assistance Record: Lab 3 TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

## 1. LLM Tool Identification
- **Primary AI Agent:** Antigravity AI Coding Assistant (Powered by Google Gemini 2.5 Pro)
- **Course Stack Context:** Node.js, Express, TypeScript, React, Tailwind / Vanilla CSS Zen Green, Prisma ORM, PostgreSQL, Vitest, Playwright.

---

## 2. Selected Key Prompts & Engineering Evolution

### Prompt 1: Handout Deconstruction & Architecture Planning (Issue 17)
> *"Lab 3 TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens. Help deconstruct the requirements into 3 distinct user roles (Requester, IT Staff, Administrator), define explicit scope exclusions, and map out the required engineering deliverables."*
- **Outcome:** Derived the complete FR-01 through FR-26 and explicit exclusions for Sprint 3.

### Prompt 2: Data Model Evolution & Backward Compatibility (Issue 18)
> *"Design Prisma schema evolution extending Lab 2 Ticket without dropping existing records. Include User model, Role enum, Priority enum with URGENT, PublicComment, and InternalNote relations with necessary database indexes."*
- **Outcome:** Generated clean Prisma schema with `@relation`, cascade rules on ticket deletion, and indexes on `ticketId`, `ownerId`, and `status`.

### Prompt 3: Authentication & Password Complexity Enforcement (Issue 19)
> *"Implement server-side authentication using bcrypt (10 rounds) and cookie/Bearer token sessions. How should we implement password complexity validation (min 8 characters, uppercase, lowercase, numeric digit) and enforce mandatory password rotation on first login while preventing account enumeration?"*
- **Outcome:** Designed generic `401 Unauthorized` responses for both invalid password and non-existent/inactive accounts, and built the `mustChangePassword` guard middleware.

### Prompt 4: Login & Password Change Interactive UI (Issue 20)
> *"Create a Zen Green Login screen and a mandatory Change Password view. The change password view must include a live real-time complexity checklist (length, upper, lower, number) that turns green as criteria are satisfied."*
- **Outcome:** Implemented `Login.tsx` and `ChangePassword.tsx` with dynamic validation state, accessible aria attributes, and session redirection.

### Prompt 5: IT Staff Queue Querying & Weighted Priority Sorting (Issue 21)
> *"Write an Express route handler for GET /api/staff/tickets supporting case-insensitive search on ticketNumber and summary, filtering by category, status, and IT priority, and segmented assignment filtering (All / Unassigned / Assigned to Me). Sort tickets by weighted priority (URGENT > CRITICAL > HIGH > MEDIUM > LOW) rather than alphabetical order."*
- **Outcome:** Built optimized Prisma query with raw/weighted sorting, pagination metadata, and isolation guards returning 403 for Requesters.

### Prompt 6: Responsive Queue Dashboard UI (Issue 22)
> *"Build a responsive IT Staff Ticket Queue component supporting High-Density table view on desktop/tablet and touch-friendly card stack layout on mobile (<768px). Include active filter chips, column sorting indicators, and pagination."*
- **Outcome:** Developed `StaffTicketQueue.tsx` adhering to Zen Green tokens and Bootstrap 5 responsive utility classes.

### Prompt 7: Ticket Lifecycle Operations & Confidential Notes API (Issue 23)
> *"Implement endpoints for ticket claiming (sets ownerId, transitions NEW -> OPEN), assignment reassignment, IT priority updates, status transitions enforcing transition matrix, and ticket resolution requiring a mandatory 3-500 character resolutionSummary. How should Internal Notes be strictly isolated from Requesters?"*
- **Outcome:** Formulated BR-06 through BR-15, strictly returning 403 Forbidden to Requesters on notes endpoints and omitting internal notes from ticket payload.

### Prompt 8: Dual-Stream Communication UI & Resolution Modal (Issue 24)
> *"Enhance the ticket detail view with an IT operations toolbar, a dual-stream conversation interface (Public Comments in light green vs Confidential Internal Notes in amber #FFF8E1 with lock badge), and a Resolve Ticket modal with live character counting."*
- **Outcome:** Delivered `StaffTicketDetail` operational components with full state transition support (including PENDING) and compliant React hooks structure.

### Prompt 9: Administrator User Management & Safety Guards (Issue 25)
> *"Implement Admin User Management API and UI for user roster, creation with temporary credentials, and password resets. Enforce safety governance rules: BR-18 (Admin cannot deactivate or demote self) and BR-19 (cannot deactivate or demote last active admin)."*
- **Outcome:** Built `server/src/routes/admin.ts` and `AdminUserManagement.tsx` with built-in disabled switches and backend validation returning 400 Bad Request on safety violations.

### Prompt 10: End-to-End Testing & Standalone Visual Evidence (Issue 26)
> *"Write Playwright E2E suites for authentication, staff ticket triage, and admin user lifecycle across Desktop (1280px), Tablet (768px), and Mobile (375px). Implement standalone visual audit asserting zero horizontal overflow (scrollWidth <= clientWidth) and saving high-res screenshots to artifacts/lab-03/screenshots/."*
- **Outcome:** Authored 4 test specifications in `e2e/lab-03/` passing 18/18 test configurations and generating 32 responsive evidence screenshots.

---

## 3. My Reflection on Specification and Coding Agent Use

### Specification-Driven Development (SpecDD)
Working with the AI specification agent on Lab 3 demonstrated the critical importance of **Specification-Driven Development (SpecDD)** before writing implementation code. By explicitly formulating Business Rules early—such as preventing the last Administrator from being deactivated (BR-19), ensuring tickets cannot be resolved without a 3–500 character summary (BR-09), and strictly isolating Internal Notes from Requester payloads (BR-13)—we eliminated architectural ambiguities and potential security vulnerabilities before touching code.

### Collaborative Problem Solving & Bug Detection
Throughout implementation, the AI assistant served as an effective pair-programmer. Key moments of collaboration included:
1. **Preventing State Deadlocks:** During Issue 24, identifying that tickets in status `PENDING` risked terminal deadlock, and designing valid transition paths back to `IN_PROGRESS` or `RESOLVED`.
2. **Preventing Account Enumeration:** Designing authentication responses that return identical `401 Unauthorized` payloads for wrong passwords, inactive accounts, and non-existent users, adhering to OWASP security guidelines.
3. **Handling Viewport Reflow:** Eliminating horizontal overflow caused by unbroken strings in read-only boxes through CSS `overflow-wrap: break-word; word-break: break-word;`, ensuring true responsive compliance across mobile devices.
4. **Peer Review Rigor:** When auditing peer PRs, AI assistance helped spot subtle edge cases (such as uninspected query parameters in mock route handlers and flaky `waitForTimeout` calls), elevating the quality of peer feedback.

### Human-in-the-Loop Governance
While the AI accelerated boilerplate creation and test writing, human oversight was vital for:
- Validating business logic nuances against course specifications.
- Ensuring backward compatibility with Lab 1 and Lab 2 endpoints and seed data.
- Enforcing Git branch discipline and ensuring all work traversed the proper peer review workflow before merging.
