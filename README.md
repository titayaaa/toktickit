# TokTickIT - IT Service Desk Application

TokTickIT is a full-stack IT service desk web application built with **React (TypeScript + Vite)**, **Express (Node.js + TypeScript)**, **Prisma ORM**, and **PostgreSQL**.

---

## 🚀 Lab 2 Features Overview

- **Development Requester Context**: Simulated user selector for development and testing without requiring real authentication (Lab 3 preview).
- **Create Ticket Flow**:
  - Auto-generated official Ticket Number (`TKT-YYYYMMDD-XXXX`).
  - Zen Green Theme design with client-side & server-side validation.
  - Duplicate submission prevention and persistent input preservation on failure.
- **Attachment Management**:
  - Up to 5 attachments per ticket (JPG/JPEG, PNG, WEBP, PDF, max 5MB each).
  - Soft-removal mechanism with mandatory removal reason tracking.
- **My Tickets Dashboard**:
  - Live search across ticket number and summary.
  - Category, status, and priority filtering.
  - Sorting by created date or priority severity (`CRITICAL` > `HIGH` > `MEDIUM` > `LOW`).
  - Server-side pagination with clear distinction between Empty and No-results states.
- **Ticket Detail View**:
  - Read-only detailed view with requester ownership protection (403 Forbidden).
  - Interactive attachment preview, download, and soft-remove capabilities.
- **Automated & Visual Regression Testing**:
  - Unit and integration tests (Supertest + Vitest).
  - Playwright E2E full user journey tests and Baseline Visual Snapshot Comparison across Desktop (1280x800), Tablet (820x1180), and Mobile (393x851) with zero horizontal overflow.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Bootstrap 5, Custom Zen Green CSS System
- **Backend**: Node.js, Express, TypeScript, Multer (file uploads)
- **Database**: PostgreSQL 15, Prisma ORM
- **Testing**: Vitest (UI Component tests), Supertest (API Integration tests), Playwright (E2E & Visual tests)

---

## 📁 Repository Structure

```text
toktickit/
├── artifacts/
│   ├── lab-02/screenshots/     # Lab 2 visual regression screenshots
│   ├── lab-03/screenshots/     # Lab 3 responsive visual inspection evidence
│   └── lab-04/screenshots/     # Lab 4 multi-viewport responsive evidence (24 screenshots)
├── client/                     # React + Vite + Bootstrap frontend
│   ├── src/
│   │   ├── components/         # UI Components (Login, Queue, ActionsTaken, Dashboards, Admin, etc.)
│   │   ├── contexts/           # AuthContext & RequesterContext
│   │   └── test/               # Vitest UI unit/integration tests (lab-02, lab-03 & lab-04)
│   └── vite.config.ts
├── server/                     # Express + Prisma backend
│   ├── prisma/                 # Schema, migrations, and idempotent seed script
│   ├── src/                    # API endpoints and logic (auth, staff, tickets, actions, dashboards, admin)
│   └── tests/                  # Supertest API tests (lab-01, lab-02, lab-03 & lab-04)
├── e2e/                        # Playwright E2E test suites & visual snapshots
│   ├── lab-02/                 # Full requester ticket journey & visual regression
│   ├── lab-03/                 # Auth, Staff Queue, User Admin & Visual audit specs
│   └── lab-04/                 # Actions Taken lifecycle, Resolution Gate, and Dashboard E2E flows
├── docs/                       # Specifications, test plans, AI reflection, and peer reviews
│   ├── lab-01/
│   ├── lab-02/
│   ├── lab-03/
│   └── lab-04/
├── docker-compose.yml          # PostgreSQL container definition
└── playwright.config.ts        # Playwright multi-viewport configuration
```


---

## ⚙️ Setup and Running Instructions

### 1. Database Setup (Docker)

Start the PostgreSQL container:
```bash
docker-compose up -d
```

Configure `server/.env`:
```env
DATABASE_URL="postgresql://root:root@localhost:15432/toktickit?schema=public"
PORT=5000
```

Run database migrations and seed data:
```bash
cd server
npm install
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

### 2. Backend Server

```bash
cd server
npm install
npm run dev
```
*Backend API will run at `http://localhost:5000`.*

### 3. Frontend Client

```bash
cd client
npm install
npm run dev
```
*Frontend application will run at `http://localhost:5173` (or `http://127.0.0.1:5173`).*

---

## 🚀 Lab 3 Features Overview

- **Authentication & RBAC**:
  - Secure bcrypt-hashed password credentials.
  - Three distinct roles: `REQUESTER`, `IT_STAFF`, and `ADMINISTRATOR`.
  - Mandatory first-login password rotation with real-time complexity validation (8+ chars, upper, lower, digit).
  - Account enumeration protection with generic 401 Unauthorized responses.
- **IT Staff Ticket Operations & Queue Dashboard**:
  - High-density Zen Green table view on desktop/tablet and touch-friendly card stack on mobile.
  - Multi-field filters (Status, Category, IT Priority, Assignment segmented toggle: All / Unassigned / Assigned to Me).
  - Unassigned ticket claiming (`NEW` -> `OPEN`), assignment transfer, and IT priority adjustment.
  - Dual-stream communication: Public Comments thread (light green) vs Confidential Internal Notes (amber `#FFF8E1` with lock icon banner, strictly isolated from Requesters).
  - Ticket resolution requiring a mandatory 3-500 character Resolution Summary.
- **Administrator User Management**:
  - User roster management with search and role/status filtering.
  - User creation modal with temporary password complexity checklist.
  - Password reset modal with mandatory rotation enforcement.
  - Critical safety governance guards: Self-deactivation/demotion prevention (BR-18) and Last Active Administrator protection (BR-19).
- **Responsive Visual Quality & E2E Testing**:
  - Full Playwright E2E suites covering authentication, staff ticket lifecycle, and user administration.
  - Zero horizontal overflow across Desktop (1280px), Tablet (768px), and Mobile (375px) viewports.
  - Over 30 responsive visual screenshot artifacts captured in `artifacts/lab-03/screenshots/`.

---

## 🚀 Lab 4 Features Overview

- **Actions Taken Sub-system**:
  - Complete lifecycle tracking with `ActionTaken` model, status enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
  - Strict input validation: mandatory result when marked `COMPLETED` (BR-16), mandatory follow-up notes when follow-up is required (BR-07).
  - Multi-staff collaborative execution on a single ticket with immutable creator audit trail (`performedById`).
  - Read-only data isolation for requesters (FR-07, AC-04) with strict 404 Not Found on unowned tickets.
- **Workflow State Machine & Resolution Gate**:
  - Strict 9-state transition matrix enforcing valid lifecycle steps.
  - **Resolution Gate (BR-09)**: Prevents resolving tickets if any active `PENDING` or `IN_PROGRESS` actions exist, rejecting via HTTP `409 Conflict`.
  - Non-blocking Requester Advisory Flag ("My problem is resolved") indicating user satisfaction without prematurely modifying ticket status.
  - Optimistic concurrency protection (`expectedUpdatedAt`) preventing race conditions during concurrent updates.
- **Operational Dashboards**:
  - **IT Staff Dashboard**: 5 operational metric cards (Open, Urgent/High, Breached/At Risk SLA, Unassigned, Pending Actions), recent ticket activity table, and interactive quick-filter drill-downs into Ticket Queue.
  - **Requester Dashboard**: 4 personal metric cards (My Open, Awaiting Staff Action, Recent Updates, Resolved), attention-needed table, and direct actions to submit new requests.
- **Accessibility & Zen Green Design System**:
  - Mobile, tablet, and desktop responsive layouts with zero horizontal page overflow.
  - WCAG 2.1 AA accessibility compliance: minimum 44×44px touch targets, visible focus outlines, and dynamic ARIA attributes.
  - 24 comprehensive multi-viewport visual evidence screenshots captured in `artifacts/lab-04/screenshots/`.

---

## 🧪 Running Tests

### Client UI Tests (Vitest)
```bash
cd client
npm test
```
*Runs all 81 client unit and component tests (100% pass rate).*

### Server API Tests (Supertest / Vitest)
```bash
cd server
npm test
```
*Runs all 112 server API and integration tests (100% pass rate).*

### End-to-End Tests & Visual Inspection (Playwright)
```bash
# Run all Lab 4 End-to-End test suites
npx playwright test e2e/lab-04

# Run all regression E2E test suites (Lab 2, 3, and 4)
npx playwright test
```
*Executes suites across Desktop (1280×800), Tablet (820×1180), and Mobile (393×851) viewports and saves visual evidence screenshots to `artifacts/lab-04/screenshots/`.*