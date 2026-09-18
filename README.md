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
│   └── lab-02/screenshots/     # Playwright responsive visual screenshots
├── client/                     # React + Vite + Bootstrap frontend
│   ├── src/
│   │   ├── components/         # UI Components (CreateTicket, MyTickets, TicketDetail, etc.)
│   │   ├── contexts/           # RequesterContext
│   │   └── test/               # Vitest UI unit/integration tests
│   └── vite.config.ts
├── server/                     # Express + Prisma backend
│   ├── prisma/                 # Schema and idempotent seed script
│   ├── src/                    # API endpoints and logic
│   └── tests/                  # Supertest API tests (lab-01 & lab-02)
├── e2e/                        # Playwright E2E test suite & visual snapshots
│   └── lab-02/                 # Full requester ticket journey & visual regression
├── docs/                       # Specifications, test plans, AI reflection, and peer reviews
│   ├── lab-01/
│   └── lab-02/
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

## 🧪 Running Tests

### Client UI Tests (Vitest)
```bash
cd client
npm test
```
*Runs all 56 client unit and component tests (100% pass rate).*

### Server API Tests (Supertest / Vitest)
```bash
cd server
npm test
```
*Runs all 124 server API and integration tests (100% pass rate).*

### End-to-End Tests & Visual Inspection (Playwright)
```bash
# Run all Lab 3 End-to-End test suites
npx playwright test e2e/lab-03

# Run standalone visual evidence and style audit
npx playwright test e2e/lab-03/visual-evidence.spec.ts
```
*Executes tests across Desktop, Tablet, and Mobile viewports and saves visual evidence screenshots to `artifacts/lab-03/screenshots/`.*