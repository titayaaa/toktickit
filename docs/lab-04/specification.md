# Sprint 4 Specification: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Sprint Goal
Complete the core TokTickIT service-desk operational workflow by adding fine-grained **Actions Taken** tracking under Tickets, enforcing the final **Ticket status resolution gate** and lifecycle rules, delivering role-appropriate **operational dashboards** for Requesters and IT Staff, and performing comprehensive hardening and regression verification across all features established in Labs 1 through 3 under the Zen Green design system.

---

## 2. Stakeholder Request Summary
The stakeholder requirements for Sprint 4 are:
- **Actions Taken Tracking:** The service desk needs a reliable way to plan, record, and track discrete technical interventions under each ticket. Each Action Taken must record Action Date/Time, Description, Result, Performed By (automatically recorded from authenticated user), Assignee (active IT Staff/Admin), Follow-up Required flag, Follow-up Note (mandatory when follow-up is needed), Attachment Notes (guidance on relevant files/images), and Status (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
- **Ticket Ownership & Multi-Staff Action:** The primary Ticket Owner coordinates the ticket overall, but different IT Staff members can execute and record specific Actions Taken.
- **Enforced Resolution Gate:** A Ticket cannot be closed or resolved until all scheduled work is complete. The system must block transitioning a Ticket to `RESOLVED` if any associated Actions Taken remain `PENDING` or `IN_PROGRESS`.
- **Role-Appropriate Dashboards:**
  - **IT Staff Dashboard:** An operational control center showing unassigned tickets, tickets assigned to current user, urgent tickets, and pending actions assigned to current staff, with quick drill-down navigation into queues or ticket details.
  - **Requester Dashboard:** A personalized overview summarizing the requester's open tickets, tickets waiting for requester input, recently updated tickets, and resolved tickets without duplicating the full My Tickets table.
- **Application Hardening & Regression:** Ensure 100% backward compatibility for all prior features: authentication, mandatory password reset, ticket submission, attachments, public comments, internal notes, and administrator user governance.

---

## 3. Scope and Exclusions

### 3.1 Included Scope
1. **Actions Taken Data Model:** Database table, foreign keys to Ticket and User, status enum, and Prisma schema migration.
2. **Actions Taken REST APIs:** Create, read, update, and list endpoints with role-based access control.
3. **Actions Taken UI Component:** Integrated into Ticket Detail with card/timeline list, create modal, edit modal, assignee selector, and follow-up alerts.
4. **Ticket Resolution Gate:** Backend enforcement and UI visual guidance blocking resolution when active actions exist.
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
7. Unapproved feature additions outside this engineering contract.

---

## 4. Functional Requirements (FR)

### 4.1 Actions Taken Management
- **FR-01:** The system shall allow IT Staff and Administrators to create an Action Taken record under any accessible Ticket.
- **FR-02:** The system shall automatically record the authenticated user as the `performedBy` actor of the Action Taken.
- **FR-03:** The system shall allow assigning an Action Taken to any active IT Staff or Administrator account (`assigneeId`).
- **FR-04:** The system shall support four lifecycle statuses for Actions Taken: `PENDING`, `IN_PROGRESS`, `COMPLETED`, and `CANCELLED`.
- **FR-05:** The system shall allow IT Staff and Administrators to update Action Taken fields (Description, Result, Status, Assignee, Follow-up notes, Attachment notes).
- **FR-06:** The system shall allow authenticated Requesters to view Actions Taken associated with their owned Tickets in read-only mode.
- **FR-07:** The system shall forbid Requesters from creating, modifying, or deleting Actions Taken (HTTP 403 Forbidden).

### 4.2 Ticket Workflow & Resolution Gate
- **FR-08:** The system shall enforce that a Ticket can only be moved to `RESOLVED` status when all associated Actions Taken have status `COMPLETED` or `CANCELLED`.
- **FR-09:** The system shall return a clear error message and HTTP 400/409 if an IT Staff member attempts to resolve a Ticket with `PENDING` or `IN_PROGRESS` actions.
- **FR-10:** The system shall treat Requester "Problem Appears Resolved" indication as advisory without auto-transitioning the Ticket status.

### 4.3 Dashboards
- **FR-11:** The system shall provide an IT Staff Dashboard displaying authoritative operational metrics: Unassigned Tickets, My Assigned Tickets, Urgent Tickets, and My Pending Actions.
- **FR-12:** The system shall provide a Requester Dashboard displaying authoritative metrics: Total Open Tickets, Tickets Waiting for Requester, Recently Updated Tickets, and Recently Resolved Tickets.
- **FR-13:** The system shall provide interactive drill-down actions from dashboard metric cards and lists directly to corresponding filtered views or Ticket Detail screens.

### 4.4 Regression & Hardening
- **FR-14:** The system shall preserve all existing user authentication, session, password rotation, attachment, public comment, internal note, and admin user management features without error.

---

## 5. Business Rules (BR)

| BR ID | Business Rule Statement | Enforcement Layer |
| :--- | :--- | :--- |
| **BR-01** | An Action Taken record must belong to exactly one Ticket (`ticketId` foreign key required). | Database & API |
| **BR-02** | The Ticket Owner coordinates the Ticket, but an Action Taken may be assigned to and performed by any IT Staff member or Administrator. | Database & API |
| **BR-03** | Only authenticated users with role `IT_STAFF` or `ADMINISTRATOR` have permission to create or edit Actions Taken. | Backend Middleware |
| **BR-04** | Requesters can only view Actions Taken for Tickets they own. They cannot create, edit, or delete Actions Taken. | Backend Middleware & UI |
| **BR-05** | The `assigneeId` of an Action Taken must reference an active (`isActive = true`) user with role `IT_STAFF` or `ADMINISTRATOR`. Assignment to inactive users or Requesters must be rejected with HTTP 422. | API Validation |
| **BR-06** | The `performedById` field is immutable and automatically set to the authenticated user creating the Action Taken. | API Controller |
| **BR-07** | When `isFollowUpRequired` is `true`, `followUpNote` is mandatory and must not be blank. When `isFollowUpRequired` is `false`, `followUpNote` must be null or empty. | API & UI Validation |
| **BR-08** | **Resolution Gate:** A Ticket cannot be updated to `RESOLVED` status if any of its Actions Taken are in `PENDING` or `IN_PROGRESS` status. | API Controller |
| **BR-09** | A Requester's "Problem Appears Resolved" indication is purely advisory and does not alter Ticket status. | API Controller |
| **BR-10** | Permitted Ticket status transitions must strictly adhere to the state transition matrix: `NEW` -> `OPEN` -> `IN_PROGRESS` -> `WAITING_FOR_REQUESTER` / `RESOLVED` -> `CLOSED`. A `RESOLVED` or `CLOSED` ticket may be `REOPENED`. | API Controller |
| **BR-11** | IT Staff Dashboard metrics calculations: <br>- `unassignedTickets`: Tickets where `assignedToId IS NULL` and status not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `myAssignedTickets`: Tickets where `assignedToId == currentUser.id` and status not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `urgentTickets`: Tickets where `priority == 'URGENT'` and status not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `myAssignedActions`: Actions Taken where `assigneeId == currentUser.id` and status in (`PENDING`, `IN_PROGRESS`). | API Controller |
| **BR-12** | Requester Dashboard metrics calculations: <br>- `totalOpen`: Requester's tickets with status not in (`RESOLVED`, `CLOSED`, `CANCELLED`).<br>- `waitingForRequester`: Requester's tickets with status `WAITING_FOR_REQUESTER`.<br>- `recentlyUpdated`: Requester's tickets updated within the last 7 days.<br>- `recentlyResolved`: Requester's tickets with status in (`RESOLVED`, `CLOSED`). | API Controller |
| **BR-13** | Concurrent / Stale Update Protection: Ticket status and Action Taken updates verify state prerequisites and return HTTP 409 Conflict if concurrent modifications invalidate the operation. | API Controller |
| **BR-14** | Legacy Ticket Preservation: Legacy tickets without Actions Taken remain fully valid. An IT Staff member may add Actions Taken or resolve them if no pending actions exist. | Database & API |
| **BR-15** | Visual & Design Consistency: All new dashboard cards, tables, modal dialogs, and Action Taken timeline items must strictly adhere to the Zen Green design tokens. | UI Design System |

---

## 6. Authorization Matrix

| Action / Endpoint | REQUESTER | IT_STAFF | ADMINISTRATOR | Unauthenticated |
| :--- | :---: | :---: | :---: | :---: |
| View Actions Taken (Owned Ticket) | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ 401 |
| View Actions Taken (Other's Ticket)| ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Create Action Taken | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Update Action Taken | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Resolve Ticket (No Pending Actions) | ❌ 403 | ✅ Allowed | ✅ Allowed | ❌ 401 |
| Resolve Ticket (Pending Actions Exist) | ❌ 403 | ❌ 400/409 | ❌ 400/409 | ❌ 401 |
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
  id                  String            @id @default(cuid())
  ticketId            String
  ticket              Ticket            @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  performedById       String
  performedBy         User              @relation("ActionPerformedBy", fields: [performedById], references: [id])
  assigneeId          String
  assignee            User              @relation("ActionAssignedTo", fields: [assigneeId], references: [id])
  actionDateTime      DateTime          @default(now())
  actionDescription   String
  result              String
  isFollowUpRequired  Boolean           @default(false)
  followUpNote        String?
  attachmentNotes     String?
  status              ActionTakenStatus @default(COMPLETED)
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt

  @@index([ticketId])
  @@index([assigneeId])
  @@index([status])
}
```

### 7.3 Model Updates on `User` and `Ticket`
- `Ticket`: Add `actionsTaken ActionTaken[]`
- `User`: Add `actionsPerformed ActionTaken[] @relation("ActionPerformedBy")` and `actionsAssigned ActionTaken[] @relation("ActionAssignedTo")`

### 7.4 Database Design Decisions & Justifications
1. **Explicit `ActionTakenStatus` Enum:** Using an enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`) provides compile-time and database-level integrity for the resolution gate rule, avoiding ambiguity from boolean flags.
2. **Separation of `performedById` and `assigneeId`:** The person who logged the action may differ from the staff member assigned to complete or follow up on the technical task. This reflects realistic enterprise service-desk delegation.
3. **Foreign Key Indexing:** Dedicated indexes on `ticketId`, `assigneeId`, and `status` ensure high-performance dashboard aggregations and ticket detail lookups without full table scans.

---

## 8. API Contract Summary

### 8.1 Actions Taken Endpoints
- `GET /api/tickets/:id/actions-taken`: Retrieve all Actions Taken for a ticket.
- `POST /api/tickets/:id/actions-taken`: Create an Action Taken (IT Staff/Admin).
- `PATCH /api/tickets/:id/actions-taken/:actionId`: Update an Action Taken (IT Staff/Admin).
- `GET /api/tickets/:id/actions-taken/:actionId`: Retrieve single Action Taken.

### 8.2 Ticket Status & Resolution Gate Endpoint
- `PATCH /api/tickets/:id/status` (or `PUT /api/staff/tickets/:id/status`): Update status with check on `ActionTakenStatus`. Returns `409 Conflict` with error details if active actions exist when setting to `RESOLVED`.

### 8.3 Dashboard Endpoints
- `GET /api/staff/dashboard`: IT Staff summary metrics and lists.
- `GET /api/requester/dashboard`: Requester summary metrics and lists.

---

## 9. Acceptance Criteria (AC)

- **AC-01:** Given a permitted IT Staff or Administrator user and valid payload, when creating an Action Taken under a Ticket, then it is saved with the authenticated creator, designated active assignee, and default status.
- **AC-02:** Given an inactive staff user or Requester ID as `assigneeId`, when creating or updating an Action Taken, then the API returns `422 Unprocessable Entity`.
- **AC-03:** Given `isFollowUpRequired = true`, when `followUpNote` is empty, then the system rejects the submission with validation errors.
- **AC-04:** Given an authenticated Requester viewing their own Ticket, when accessing Actions Taken, then all items are visible in read-only mode without create/edit controls.
- **AC-05:** Given an authenticated Requester, when attempting to `POST` or `PATCH` an Action Taken, then the API responds with `403 Forbidden`.
- **AC-06:** Given a Ticket with at least one Action Taken in `PENDING` or `IN_PROGRESS` status, when an IT Staff member attempts to transition the Ticket to `RESOLVED`, then the API rejects the transition with `409 Conflict` stating unresolved actions exist.
- **AC-07:** Given a Ticket where all Actions Taken are `COMPLETED` or `CANCELLED` (or zero actions exist), when transitioning to `RESOLVED`, then the update succeeds and refreshes the Ticket status.
- **AC-08:** Given an authenticated IT Staff user, when loading the IT Staff Dashboard, then accurate metrics for Unassigned, My Assigned, Urgent, and My Pending Actions are displayed matching database state.
- **AC-09:** Given an authenticated Requester, when loading the Requester Dashboard, then only metrics and tickets owned by that authenticated user are displayed.
- **AC-10:** Given any dashboard metric card, when clicking the drill-down action, then the user is navigated to the filtered ticket queue or detail view.
- **AC-11:** Given mobile (< 768px), tablet (768px-1023px), and desktop (>= 1024px) viewports, all dashboard and Actions Taken components adapt responsively without horizontal clipping or broken layouts.
- **AC-12:** Given all features from Labs 1 through 3, all regression tests pass with zero failures.

---

## 10. Product Definition of Done (DoD)

1. [x] Complete specifications (`specification.md`, `tests.md`, `ui-spec.md`, `api-spec.md`, `reviewer.md`, `ai-use.md`) merged into `lab4-staging`.
2. [ ] Prisma schema migrated with `ActionTaken` model, indexes, and relations.
3. [ ] Seed script executes idempotently, populating realistic tickets with zero, one, and multiple actions taken.
4. [ ] Backend REST APIs for Actions Taken and Dashboards implemented and secured by RBAC middleware.
5. [ ] Resolution gate strictly enforced on backend with user-friendly UI guidance.
6. [ ] IT Staff and Requester Dashboards implemented using Zen Green design tokens.
7. [ ] Unit, component, integration, and Playwright E2E tests passing 100%.
8. [ ] Responsive visual audits captured for mobile, tablet, and desktop viewports.
9. [ ] Release PR merged from `lab4-staging` into `main` with peer review sign-offs.
10. [ ] Final 9-Part PDF Report compiled and verified against grading rubrics.
