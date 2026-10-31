# Sprint 4 Specification: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Sprint Goal
Complete the core TokTickIT service-desk operational workflow by adding fine-grained **Actions Taken** tracking under Tickets, enforcing the final **Ticket status resolution gate** and lifecycle rules, delivering role-appropriate **operational dashboards** for Requesters and IT Staff, and performing comprehensive hardening and regression verification across all features established in Labs 1 through 3 under the Zen Green design system.

---

## 2. Stakeholder Request Summary
The stakeholder requirements for Sprint 4 are:
- **Actions Taken Tracking:** The service desk needs a reliable way to plan, record, and track discrete technical interventions under each ticket. Each Action Taken must record Action Date/Time, Description, Result (mandatory when completed, optional while pending/in-progress), Performed By (automatically recorded from authenticated user ID), Assignee (active IT Staff/Admin ID), Follow-up Required flag, Follow-up Note (mandatory when follow-up is needed), Attachment Notes (guidance on relevant files/images), and Status (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- **Ticket Ownership & Multi-Staff Action:** The primary Ticket Owner coordinates the ticket overall, but different IT Staff members can execute and record specific Actions Taken.
- **Enforced Resolution Gate:** A Ticket cannot be resolved until all scheduled work is complete. The system must block transitioning a Ticket to `RESOLVED` (HTTP 409 Conflict) if any associated Actions Taken remain in `PENDING` or `IN_PROGRESS` status.
- **Role-Appropriate Dashboards:**
  - **IT Staff Dashboard:** An operational control center showing unassigned tickets, tickets owned by current user, urgent tickets, and pending actions assigned to current staff, with quick drill-down navigation into queues or ticket details.
  - **Requester Dashboard:** A personalized overview summarizing the requester's open tickets, tickets waiting for requester input, recently updated tickets, and resolved tickets without duplicating the full My Tickets table.
- **Application Hardening & Regression:** Ensure 100% backward compatibility for all prior features: authentication, mandatory password reset, ticket submission, attachments, public comments, internal notes, and administrator user governance.

---

## 3. Scope and Exclusions

### 3.1 Included Scope
1. **Actions Taken Data Model:** Database table with integer foreign keys to `Ticket.id` and `User.id`, status enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), and Prisma schema migration.
2. **Actions Taken REST APIs:** Create, read, update, and list endpoints with role-based access control.
3. **Actions Taken UI Component:** Integrated into Ticket Detail with card/timeline list, create modal, edit modal, assignee selector, and follow-up alerts.
4. **Ticket Resolution Gate:** Backend enforcement and UI visual guidance blocking resolution when active actions exist (HTTP 409 Conflict).
5. **IT Staff Dashboard:** Metrics summary cards, urgent tickets list, unassigned tickets list, assigned actions list, and filter drill-down.
6. **Requester Dashboard:** Personalized metric cards, attention-required tickets list, and quick detail navigation.
7. **Idempotent Seed Evolution:** Realistic seed data covering tickets with zero, one, and multiple actions taken, varied statuses, and dashboard metrics.
8. **Regression & Hardening Suite:** Verification that Labs 1-3 functions remain fully intact.
9. **Automated Testing:** Vitest unit/integration tests, component tests, and Playwright E2E suites.
10. **Zen Green UI Polish:** Responsive visual audit across desktop, tablet, and mobile viewports with accessibility compliance.

### 3.2 Explicit Exclusions (Out of Scope for Lab 4)
1. Automatic SLA clocks, breach countdown timers, and escalation engines.
2. External email, SMS, push, or webhook notification services.
3. Spare parts inventory, purchasing, and billing/labor-cost calculations.
4. Electronic signatures and multi-level corporate approval hierarchies.
5. Custom report builders, SQL query runners, and BI data warehouses.
6. Multi-tenant customer organizations.
7. Hard deletion of Actions Taken (audit records are append-only; status may be set to `CANCELLED`).
8. Unapproved feature additions outside this engineering contract.

---

## 4. Functional Requirements (FR)

### 4.1 Actions Taken Management
- **FR-01:** The system shall allow IT Staff and Administrators to create an Action Taken record under any accessible Ticket.
- **FR-02:** The system shall automatically record the authenticated user ID (`Int`) as the `performedById` actor of the Action Taken.
- **FR-03:** The system shall allow assigning an Action Taken to any active IT Staff or Administrator account (`assigneeId: Int`).
- **FR-04:** The system shall support four lifecycle statuses for Actions Taken: `PENDING`, `IN_PROGRESS`, `COMPLETED`, and `CANCELLED`.
- **FR-05:** The system shall allow IT Staff and Administrators to update Action Taken fields (Description, Result, Status, Assignee, Follow-up notes, Attachment notes).
- **FR-06:** The system shall allow authenticated Requesters to view Actions Taken associated with their owned Tickets in read-only mode.
- **FR-07:** The system shall forbid Requesters from creating or modifying Actions Taken (HTTP 403 Forbidden). Hard deletion is not permitted for any role (append-only audit trail).

### 4.2 Ticket Workflow & Resolution Gate
- **FR-08:** The system shall enforce that a Ticket can only be moved to `RESOLVED` status when all associated Actions Taken have status `COMPLETED` or `CANCELLED`.
- **FR-09:** The system shall return a clear error message and HTTP 409 Conflict if an IT Staff member attempts to resolve a Ticket with `PENDING` or `IN_PROGRESS` actions.
- **FR-10:** The system shall treat Requester "Problem Appears Resolved" indication as advisory without auto-transitioning the Ticket status.
- **FR-11:** The system shall enforce the complete status transition matrix across all 8 statuses (`New`, `Open`, `In Progress`, `Waiting for Requester`, `Resolved`, `Closed`, `Reopened`, `Cancelled`).

### 4.3 Dashboards
- **FR-12:** The system shall provide an IT Staff Dashboard displaying authoritative operational metrics: Unassigned Tickets, My Assigned Tickets, Urgent Tickets, and My Pending Actions.
- **FR-13:** The system shall provide a Requester Dashboard displaying authoritative metrics: Total Open Tickets, Tickets Waiting for Requester, Recently Updated Tickets, and Recently Resolved Tickets.
- **FR-14:** The system shall provide interactive drill-down actions from dashboard metric cards and lists directly to corresponding filtered views or Ticket Detail screens.

### 4.4 Regression & Hardening
- **FR-15:** The system shall preserve all existing user authentication, session, password rotation, attachment, public comment, internal note, and admin user management features without error.

---

## 5. Business Rules (BR)

| BR ID | Business Rule Statement | Enforcement Layer |
| :--- | :--- | :--- |
| **BR-01** | An Action Taken record must belong to exactly one Ticket (`ticketId: Int` foreign key required). | Database & API |
| **BR-02** | The Ticket Owner coordinates the Ticket, but an Action Taken may be assigned to and performed by any IT Staff member or Administrator. | Database & API |
| **BR-03** | Only authenticated users with role `IT_STAFF` or `ADMINISTRATOR` have permission to create or edit Actions Taken. | Backend Middleware |
| **BR-04** | Requesters can only view Actions Taken for Tickets they own. They cannot create, edit, or delete Actions Taken. Attempting to view another user's actions returns HTTP 404 (Data Isolation). | Backend Middleware & UI |
| **BR-05** | The `assigneeId` of an Action Taken must reference an active (`isActive = true`) user with role `IT_STAFF` or `ADMINISTRATOR`. Assignment to inactive users or Requesters must be rejected with HTTP 422 Unprocessable Entity. | API Validation |
| **BR-06** | The `performedById` field is immutable and automatically set to the authenticated user ID (`Int`) creating the Action Taken. | API Controller |
| **BR-07** | When `isFollowUpRequired` is `true`, `followUpNote` is mandatory and must not be blank. When `isFollowUpRequired` is `false`, `followUpNote` must be null or empty. | API & UI Validation |
| **BR-08** | **Action Result Rule:** The `result` field is optional when status is `PENDING` or `IN_PROGRESS`, but mandatory (non-empty string, min 2 chars) when status is transitioned to `COMPLETED`. | API Validation |
| **BR-09** | **Resolution Gate:** A Ticket cannot be updated to `RESOLVED` status if any of its Actions Taken are in `PENDING` or `IN_PROGRESS` status. Attempting to resolve returns HTTP 409 Conflict. | API Controller |
| **BR-10** | A Requester's "Problem Appears Resolved" indication is purely advisory and does not alter Ticket status. | API Controller |
| **BR-11** | **Complete Status Transition Matrix:** Adheres strictly to permitted role-based transitions across all 8 statuses (detailed in Section 5.1). | API Controller |
| **BR-12** | IT Staff Dashboard metrics calculations: <br>- `unassignedTickets`: Tickets where `ownerId IS NULL` and `currentStatus` not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `myAssignedTickets`: Tickets where `ownerId == currentUser.id` and `currentStatus` not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `urgentTickets`: Tickets where `itPriority == 'URGENT'` and `currentStatus` not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `myPendingActions`: Actions Taken where `assigneeId == currentUser.id` and `status` in (`PENDING`, `IN_PROGRESS`). | API Controller |
| **BR-13** | Requester Dashboard metrics calculations: <br>- `totalOpen`: Requester's tickets where `userId == currentUser.id` and `currentStatus` not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `waitingForRequester`: Requester's tickets with `currentStatus == 'WAITING_FOR_REQUESTER'`.<br>- `recentlyUpdated`: Requester's tickets updated within the last 7 days.<br>- `recentlyResolved`: Requester's tickets with `currentStatus` in (`RESOLVED`, `CLOSED`). | API Controller |
| **BR-14** | **Concurrency & Stale Update Protection:** When updating a Ticket, Client must provide `expectedUpdatedAt`. If it does not match the server's `ticket.updatedAt`, the API returns HTTP 409 Conflict to prevent accidental overwrites. | API Controller |
| **BR-15** | **Legacy Data Preservation:** Legacy tickets created prior to Lab 4 without Actions Taken remain valid and can have Actions Taken added or resolved normally. | Database & API |
| **BR-16** | **Idempotency & Double-Submit Protection:** Form submissions for Actions Taken disable submit buttons during in-flight requests and support client-side deduplication. | Frontend UI |

---

### 5.1 Ticket Status Transition Matrix

| Current Status | Permitted Next Status | Authorized Roles | Notes |
| :--- | :--- | :--- | :--- |
| **NEW** | `OPEN`, `CANCELLED` | `IT_STAFF`, `ADMINISTRATOR` | Initial triage; owner can be claimed/assigned |
| **OPEN** | `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, `RESOLVED`, `CANCELLED` | `IT_STAFF`, `ADMINISTRATOR` | Work starts; resolution gate applies if moving to `RESOLVED` |
| **IN_PROGRESS** | `WAITING_FOR_REQUESTER`, `RESOLVED`, `CANCELLED` | `IT_STAFF`, `ADMINISTRATOR` | Active technical work; resolution gate applies |
| **WAITING_FOR_REQUESTER** | `IN_PROGRESS`, `RESOLVED`, `CANCELLED` | `IT_STAFF`, `ADMINISTRATOR` | Awaiting user clarification; resolution gate applies |
| **RESOLVED** | `CLOSED`, `REOPENED` | `IT_STAFF`, `ADMINISTRATOR` | Reopen if problem recurs; close after verification |
| **REOPENED** | `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, `RESOLVED`, `CANCELLED` | `IT_STAFF`, `ADMINISTRATOR` | Re-evaluated; resolution gate applies |
| **CLOSED** | None (Final) | - | Terminal state |
| **CANCELLED** | None (Final) | - | Terminal state |

*Note on Requester Role:* Requesters cannot directly transition ticket statuses; they can only send an advisory "Problem Appears Resolved" indication.

---

## 6. Authorization Matrix

| Action / Endpoint | REQUESTER | IT_STAFF | ADMINISTRATOR | Unauthenticated |
| :--- | :---: | :---: | :---: | :---: |
| View Actions Taken (Owned Ticket) | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ 401 |
| View Actions Taken (Other's Ticket)| ❌ 404 (Isolated) | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Create Action Taken | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Update Action Taken | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Delete Action Taken | ❌ 403 | ❌ 403 (Append-only) | ❌ 403 (Append-only) | ❌ 401 |
| Resolve Ticket (No Pending Actions) | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Resolve Ticket (Pending Actions Exist) | ❌ 403 | ❌ 409 Conflict | ❌ 409 Conflict | ❌ 401 |
| Access IT Staff Dashboard | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Access Requester Dashboard | ✅ Allowed (Own) | ✅ Allowed | ✅ Allowed | ❌ 401 |

---

## 7. Data Changes & Schema Evolution

### 7.1 New Prisma Enum: `ActionTakenStatus`
```prisma
enum ActionTakenStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

### 7.2 New Prisma Model: `ActionTaken`
```prisma
model ActionTaken {
  id                  Int               @id @default(autoincrement())
  ticketId            Int
  ticket              Ticket            @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  performedById       Int
  performedBy         User              @relation("ActionPerformedBy", fields: [performedById], references: [id])
  assigneeId          Int
  assignee            User              @relation("ActionAssignedTo", fields: [assigneeId], references: [id])
  actionDateTime      DateTime          @default(now())
  actionDescription   String
  result              String?
  isFollowUpRequired  Boolean           @default(false)
  followUpNote        String?
  attachmentNotes     String?
  status              ActionTakenStatus @default(COMPLETED)
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt

  @@index([ticketId])
  @@index([assigneeId])
  @@index([status])
  @@map("actions_taken")
}
```

### 7.3 Model Updates on `User` and `Ticket`
- `Ticket`: Add `actionsTaken ActionTaken[]`
- `User`: Add `actionsPerformed ActionTaken[] @relation("ActionPerformedBy")` and `actionsAssigned ActionTaken[] @relation("ActionAssignedTo")`

### 7.4 Database Design Decisions & Justifications
1. **Integer Foreign Keys Matching Existing Schema:** Both `User.id` and `Ticket.id` in PostgreSQL are autoincrementing integers (`Int`). Making `ticketId: Int`, `performedById: Int`, and `assigneeId: Int` ensures strict foreign key referential integrity at the database level.
2. **Nullable `result` with Status-Driven Validation:** The `result` column is defined as `String?` at the database level so that actions created in `PENDING` or `IN_PROGRESS` status do not require premature outcome data, while the application layer enforces mandatory `result` prior to marking status as `COMPLETED`.
3. **Compound Foreign Key and Status Indexing:** Dedicated indexes on `ticketId`, `assigneeId`, and `status` optimize dashboard metric aggregations (`WHERE assigneeId = X AND status = 'PENDING'`) and ticket detail lookups without table scans.

### 7.5 Migration, Backfill & Rollback Strategy
- **Migration:** Executed via idempotent SQL migration `20261030000000_lab4_actions_taken/migration.sql` with `CREATE TYPE IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`, and exception-handled foreign key constraints.
- **Backfill:** Existing tickets from Labs 1–3 require no data alteration. Legacy tickets without Actions Taken operate normally (`actionsTaken: []`).
- **Rollback:** In the event of rollback, dropping the `actions_taken` table and `ActionTakenStatus` enum leaves all `Ticket`, `User`, `Attachment`, `PublicComment`, and `InternalNote` records 100% intact.

### 7.6 Seed Data Plan
- `seed.ts` is idempotent (`upsert` operations throughout).
- Generates tickets covering all 8 statuses and priorities.
- Seeds tickets with 0 actions, 1 completed action, and multiple actions assigned to different staff members (`staffAlice` and `staffBob`) with active follow-ups.

---

## 8. UI Specification Summary
- **Design System:** Strictly utilizes the Zen Green design tokens (`--zen-primary`, `--zen-bg`, font Inter, status badges). See detailed documentation in [ui-spec.md](ui-spec.md).
- **IT Staff Dashboard:** 4-card metric row (`Unassigned`, `My Assigned`, `Urgent`, `My Pending Actions`), urgent tickets table, assigned actions list, and click-to-filter drill-down navigation.
- **Requester Dashboard:** 4-card metric row (`Total Open`, `Waiting for Input`, `Recently Updated`, `Resolved`), attention-required banner, and quick detail navigation.
- **Actions Taken on Ticket Detail:**
  - Card/timeline view displaying date, staff actor, assignee, description, result, follow-up amber banner, and attachment note.
  - "+ Add Action Taken" button (IT Staff/Admin only) opening modal dialog with assignee picker (active staff only), dynamic follow-up note field, and status selector.
  - Read-only mode for authenticated Requesters viewing their own tickets.

---

## 9. API Contract Summary
Detailed request/response schemas, status codes, and error bodies are documented in [api-spec.md](api-spec.md):
- `GET /api/tickets/:id/actions-taken`: List all actions for ticket (with `assignee` and `performedBy`).
- `POST /api/tickets/:id/actions-taken`: Create action taken (requires active `assigneeId: Int`; rejects inactive users with HTTP 422).
- `PATCH /api/tickets/:id/actions-taken/:actionId`: Update action taken status, result, follow-up.
- `GET /api/tickets/:id/actions-taken/:actionId`: Retrieve single action taken.
- `PATCH /api/tickets/:id/status` (or `PUT /api/staff/tickets/:id/status`): Update status with Resolution Gate check (returns HTTP 409 Conflict if pending actions exist).
- `GET /api/staff/dashboard`: Operational metrics and recent lists for IT Staff.
- `GET /api/requester/dashboard`: Personal metrics and attention list for authenticated Requester.

---

## 10. Acceptance Criteria (AC)

- **AC-01:** Given a permitted IT Staff or Administrator user and valid payload, when creating an Action Taken under a Ticket, then it is saved with the authenticated creator (`performedById: Int`), designated active assignee (`assigneeId: Int`), and initial status.
- **AC-02:** Given an inactive staff user or Requester ID as `assigneeId`, when creating or updating an Action Taken, then the API returns `422 Unprocessable Entity`.
- **AC-03:** Given `isFollowUpRequired = true`, when `followUpNote` is empty, then the system rejects the submission with validation errors (HTTP 400).
- **AC-04:** Given an authenticated Requester viewing their own Ticket, when accessing Actions Taken, then all items are visible in read-only mode without create/edit controls.
- **AC-05:** Given an authenticated Requester, when attempting to access Actions Taken for another user's Ticket, the API returns `404 Not Found` (Data Isolation).
- **AC-06:** Given an authenticated Requester, when attempting to `POST` or `PATCH` an Action Taken, then the API responds with `403 Forbidden`.
- **AC-07:** Given a Ticket with at least one Action Taken in `PENDING` or `IN_PROGRESS` status, when an IT Staff member attempts to transition the Ticket to `RESOLVED`, then the API rejects the transition with `409 Conflict` stating unresolved actions exist.
- **AC-08:** Given a Ticket where all Actions Taken are `COMPLETED` or `CANCELLED` (or zero actions exist), when transitioning to `RESOLVED`, then the update succeeds with HTTP 200 and refreshes the Ticket status.
- **AC-09:** Given an authenticated IT Staff user, when loading the IT Staff Dashboard, then accurate metrics for Unassigned, My Assigned, Urgent, and My Pending Actions are displayed matching database state.
- **AC-10:** Given an authenticated Requester, when loading the Requester Dashboard, then only metrics and tickets owned by that authenticated user are displayed.
- **AC-11:** Given any dashboard metric card, when clicking the drill-down action, then the user is navigated to the filtered ticket queue or detail view.
- **AC-12:** Given concurrent updates where `expectedUpdatedAt` does not match server `updatedAt`, the system responds with `409 Conflict`.
- **AC-13:** Given mobile (< 768px), tablet (768px-1023px), and desktop (>= 1024px) viewports, all dashboard and Actions Taken components adapt responsively without horizontal clipping or broken layouts.
- **AC-14:** Given all features from Labs 1 through 3, all regression tests pass with zero failures.

---

## 11. Product Definition of Done (DoD)

1. [x] Complete specifications (`specification.md`, `tests.md`, `ui-spec.md`, `api-spec.md`, `reviewer.md`, `ai-use.md`) reviewed and merged into `lab4-staging`.
2. [ ] Prisma schema migrated with `ActionTaken` model, indexes, integer foreign keys, and relations.
3. [ ] Seed script executes idempotently, populating realistic tickets with zero, one, and multiple actions taken.
4. [ ] Backend REST APIs for Actions Taken and Dashboards implemented and secured by RBAC middleware.
5. [ ] Resolution gate strictly enforced on backend (HTTP 409) with user-friendly UI guidance.
6. [ ] IT Staff and Requester Dashboards implemented using Zen Green design tokens.
7. [ ] Unit, component, integration, and Playwright E2E tests passing 100%.
8. [ ] Responsive visual audits captured for mobile, tablet, and desktop viewports.
9. [ ] Release PR merged from `lab4-staging` into `main` with peer review sign-offs.
10. [ ] Final 9-Part PDF Report compiled and verified against grading rubrics.
