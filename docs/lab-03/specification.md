# Sprint 3 Specification: TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

## 1. Sprint Goal
Deliver an enterprise-grade role-based access control (RBAC) and operational IT workflow increment for TokTickIT. This sprint replaces the temporary development requester selector with secure email/password authentication and mandatory first-login password rotation, introduces an operational IT Staff ticket triage and detail workflow with role-restricted internal communication, and delivers a minimalist Administrator user management system while preserving 100% backward compatibility and ownership protections for all completed Lab 2 increments.

---

## 2. Stakeholder Request Summary
The stakeholder requires a production-ready evolution of TokTickIT:
- **Authentication & Security:** Replace the insecure development requester dropdown with real authentication (email + password) and mandatory password changes for accounts created with initial temporary credentials. Every endpoint and UI view must be guarded by server-verified identity and role rather than client-side hiding.
- **Requester Continuity:** Requesters must continue creating and managing their own tickets without regression, but the creator identity is derived from the authenticated session. Requesters can post Public Comments and indicate that an issue appears resolved.
- **IT Staff Workflow:** IT Staff need a centralized Ticket Queue to discover, filter, sort, and paginate tickets; claim or reassign ticket ownership; adjust IT Priority; transition ticket statuses; communicate with Requesters via Public Comments; and record private Internal Notes.
- **Administrator Governance:** Administrators need a minimalist interface to list users, create accounts with one designated role and temporary password, edit user profiles, activate/deactivate accounts, and issue password resets while enforcing critical safety constraints (cannot deactivate self, cannot remove last administrator).
- **Design System:** All new and modified screens must maintain strict visual consistency with the Zen Green design system and responsive standards established in Lab 2.

---

## 3. Scope and Exclusions

### 3.1 Included Scope
1. Authentication APIs (Login, Logout, Current User retrieval `/api/auth/me`).
2. Mandatory first-login password change flow enforcing complexity rules.
3. Role-based authorization middleware enforcing three distinct roles: `REQUESTER`, `IT_STAFF`, and `ADMINISTRATOR`.
4. Removal of development requester selector and full migration of Lab 2 ticket/attachment ownership to authenticated users.
5. Shared IT Staff Ticket Queue with search, multi-field filtering, sorting, and pagination.
6. IT Staff operational ticket workflow: Claim, Reassign, IT Priority adjustment, and Status transition.
7. Public Comments timeline visible to Requester, IT Staff, and Administrator.
8. Role-restricted Internal Notes visible only to IT Staff and Administrator (HTTP 403 for Requesters).
9. Requester "Problem Appears Resolved" indication capability.
10. Minimalist Administrator user management (User Roster, Account Creation, Profile Editing, Activation/Deactivation, Password Reset).
11. Administrator safety rules: Prevention of self-deactivation and protection of the last active Administrator account.
12. Database migration evolving PostgreSQL schema and idempotent seed data.
13. Comprehensive unit, integration, and E2E test suites with full traceability.

### 3.2 Explicit Exclusions (Out of Scope for Lab 3)
1. Email invitations, password-reset emails, multi-factor authentication (MFA), and OAuth/social login.
2. Self-registration and public account sign-up.
3. Actions Taken by IT Staff (deferred to Lab 4).
4. Formal SLA calculation engines, automated escalation rules, and push notifications.
5. Dashboards and executive KPI analytics beyond queue counts.
6. Multi-tenant organizations, departments, and customer hierarchies.
7. Multiple roles assigned to a single user.
8. Hard deletion of user accounts, bulk user actions, user import/export, and account audit history.
9. Extended user profiles (profile avatars, phone numbers, bio).
10. Account lockout workflows and administrator approval queues.
11. Advanced user-table features (mandatory multi-column sorting, simultaneous advanced filters).
12. Production cloud infrastructure or CDN deployments.

---

## 4. Functional Requirements (FR)

### 4.1 Authentication & Session
- **FR-01:** The system shall authenticate users using a unique email address and case-sensitive password.
- **FR-02:** The system shall restrict inactive accounts (`isActive = false`) from authenticating and return a safe error message without leaking account existence.
- **FR-03:** The system shall enforce mandatory password change upon login for any user flagged with `mustChangePassword = true`.
- **FR-04:** The system shall invalidate authenticated sessions upon explicit logout.
- **FR-05:** The system shall expose a `/api/auth/me` endpoint returning the authenticated user's ID, full name, email, role, and password change status.

### 4.2 Authorization & Role-Based Navigation
- **FR-06:** The system shall enforce role-based access control across three mutually exclusive roles: `REQUESTER`, `IT_STAFF`, and `ADMINISTRATOR`.
- **FR-07:** The application navigation shell shall dynamically render links and controls based on the server-verified role of the authenticated user.
- **FR-08:** The system shall reject unauthorized requests to protected endpoints with HTTP 403 Forbidden.

### 4.3 Requester Operations & Continuity
- **FR-09:** The system shall automatically associate newly created tickets with the authenticated Requester's user identity.
- **FR-10:** The system shall restrict Requesters to viewing only tickets they own (`requesterId = req.user.id`).
- **FR-11:** Requesters shall be permitted to post append-only Public Comments on tickets they own.
- **FR-12:** Requesters shall have an action to indicate "Problem Appears Resolved" without directly setting the formal ticket status to Closed.

### 4.4 IT Staff Ticket Queue & Workflow
- **FR-13:** IT Staff and Administrators shall view a centralized Ticket Queue listing tickets with search (ticket number, summary), category, status, priority, and assignment filters.
- **FR-14:** IT Staff shall claim unassigned tickets, automatically assigning ownership to themselves and transitioning status from `NEW` to `OPEN`.
- **FR-15:** IT Staff and Administrators shall reassign ticket ownership to any active IT Staff or Administrator.
- **FR-16:** IT Staff and Administrators shall set and update the ticket's `itPriority` (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
- **FR-17:** IT Staff and Administrators shall transition ticket status according to the approved state transition matrix.
- **FR-18:** IT Staff and Administrators shall create and view private Internal Notes attached to a ticket.
- **FR-19:** IT Staff and Administrators shall post append-only Public Comments visible to the Requester.

### 4.5 Administrator User Management
- **FR-20:** Administrators shall view a paginated/scrollable list of all user accounts showing Name, Email, Role, and Status.
- **FR-21:** Administrators shall search users by name or email and filter by role.
- **FR-22:** Administrators shall create new user accounts with a mandatory initial password and `mustChangePassword = true`.
- **FR-23:** Administrators shall edit user details including full name, email address, role, and active status.
- **FR-24:** Administrators shall issue password resets for user accounts, automatically setting `mustChangePassword = true`.
- **FR-25:** The system shall prevent an Administrator from deactivating their own account.
- **FR-26:** The system shall prevent deactivating or modifying the role of the system's last active Administrator.

---

## 5. Business Rules (BR)

### 5.1 Security & Authentication Rules
- **BR-01 (Active Authentication):** Only active accounts (`isActive = true`) with verified credentials may receive an authenticated session.
- **BR-02 (Mandatory Password Rotation):** Users with `mustChangePassword = true` are blocked from accessing all operational routes except the password change endpoint.
- **BR-03 (Server Ownership Determination):** Requester ownership is strictly determined by the server session context (`req.user.id`). Any client-supplied `requesterId` in request bodies is discarded.
- **BR-04 (Password Complexity):** Passwords must be at least 8 characters in length and contain at least one uppercase letter, one lowercase letter, and one digit. Plaintext passwords must never be stored; bcrypt hashing (cost factor >= 10) is mandatory.
- **BR-05 (Single Role Assignment):** Every user account is strictly assigned exactly one role: `REQUESTER`, `IT_STAFF`, or `ADMINISTRATOR`.

### 5.2 Ticket Workflow & State Rules
- **BR-06 (Permitted Ticket Statuses):** Tickets must strictly belong to one of 8 statuses: `NEW`, `OPEN`, `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, `RESOLVED`, `CLOSED`, `REOPENED`, `CANCELLED`.
- **BR-07 (Initial Ticket State):** Newly created tickets are assigned status `NEW` with unassigned ownership (`ownerId = null`). The `itPriority` is initialized to match the `requestedPriority`.
- **BR-08 (Claim Transition):** Claiming an unassigned ticket sets `ownerId` to the claiming user and automatically transitions status from `NEW` to `OPEN`.
- **BR-09 (Resolution Summary Requirement):** Setting ticket status to `RESOLVED` requires a non-empty `resolutionSummary` between 3 and 500 characters.
- **BR-10 (Requester Resolution Limitation):** Requesters cannot formally resolve or close tickets; they may only submit an indication that the problem appears resolved.
- **BR-11 (Status Transition Integrity):** Status transitions must strictly adhere to the defined transition matrix:
  - `NEW` -> `OPEN`, `CANCELLED`
  - `OPEN` -> `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, `CANCELLED`
  - `IN_PROGRESS` -> `WAITING_FOR_REQUESTER`, `RESOLVED`, `CANCELLED`
  - `WAITING_FOR_REQUESTER` -> `IN_PROGRESS`, `RESOLVED`, `CANCELLED`
  - `RESOLVED` -> `CLOSED`, `REOPENED`
  - `REOPENED` -> `IN_PROGRESS`, `RESOLVED`, `CANCELLED`
  - `CLOSED` -> (Terminal)
  - `CANCELLED` -> (Terminal)

### 5.3 Communication & Privacy Rules
- **BR-12 (Public Comment Visibility):** Public Comments are visible to the ticket's Requester, assigned IT Staff, and Administrators.
- **BR-13 (Internal Note Isolation):** Internal Notes are strictly confidential and visible only to `IT_STAFF` and `ADMINISTRATOR` users. Requester accounts must never receive Internal Note data.
- **BR-14 (Append-Only Communication):** Comments and Internal Notes cannot be updated or deleted once created.
- **BR-15 (Content Validation):** Comments and Notes must be non-empty string content between 1 and 2,000 characters. Whitespace-only submissions are rejected.

### 5.4 Administrator Governance Rules
- **BR-16 (Soft Deactivation):** User accounts cannot be permanently deleted from the database. Revocation of access is performed via `isActive = false`.
- **BR-17 (Unique Email Constraint):** User email addresses must be globally unique across all active and inactive users.
- **BR-18 (Self-Deactivation Guard):** An Administrator cannot deactivate their own user account or revoke their own Administrator role.
- **BR-19 (Last Admin Protection):** The system must disallow deactivation or role modification of an Administrator if they are the sole remaining active Administrator in the system.

---

## 6. UI Specification Summary
- **Color Tokens:** Zen Green design system (`#006B3C` primary, `#0B7A46` hover/focus, `#EAF6EF` pale container, `#F5F7F6` page background, `#1A2E23` dark text).
- **Communication Styling:**
  - Public Comments: Soft green bubble background (`#EAF6EF`) with user avatar badge and clear timestamp.
  - Internal Notes: Distinct amber-yellow container (`#FFF8E1`) with prominent amber border (`#FFA000`), lock icon (`🔒`), and label stating "Internal Note - Visible only to IT Staff and Admins".
- **Responsive Layout:** All views (Login, Password Change, IT Queue, Detail, Admin User Management) provide tailored viewport layouts for Desktop (>1024px), Tablet (768px-1024px), and Mobile (<768px).

---

## 7. Data Changes & Schema Evolution

```prisma
enum Role {
  REQUESTER
  IT_STAFF
  ADMINISTRATOR
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TicketStatus {
  NEW
  OPEN
  IN_PROGRESS
  WAITING_FOR_REQUESTER
  RESOLVED
  CLOSED
  REOPENED
  CANCELLED
}

model User {
  id                 Int               @id @default(autoincrement())
  email              String            @unique
  fullName           String
  passwordHash       String
  role               Role              @default(REQUESTER)
  isActive           Boolean           @default(true)
  mustChangePassword Boolean           @default(false)
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt

  createdTickets     Ticket[]          @relation("TicketRequester")
  assignedTickets    Ticket[]          @relation("TicketOwner")
  publicComments     PublicComment[]
  internalNotes      InternalNote[]

  @@map("users")
}

// Evolution of existing Ticket model
model Ticket {
  // Existing Lab 2 fields preserved:
  id                 Int               @id @default(autoincrement())
  ticketNumber       String            @unique
  summary            String
  description        String
  categoryId         Int
  relatedSystemId    Int?
  requestedPriority  Priority
  status             TicketStatus      @default(NEW)
  requesterId        Int
  createdAt          DateTime          @default(now())
  updatedAt          DateTime          @updatedAt

  // New Lab 3 fields:
  itPriority         Priority?
  ownerId            Int?
  resolutionSummary  String?

  // Relations
  category           Category          @relation(fields: [categoryId], references: [id])
  relatedSystem      RelatedSystem?    @relation(fields: [relatedSystemId], references: [id])
  requester          User              @relation("TicketRequester", fields: [requesterId], references: [id])
  owner              User?             @relation("TicketOwner", fields: [ownerId], references: [id])
  attachments        Attachment[]
  publicComments     PublicComment[]
  internalNotes      InternalNote[]

  @@index([status])
  @@index([ownerId])
  @@index([requesterId])
  @@map("tickets")
}

model PublicComment {
  id        Int      @id @default(autoincrement())
  ticketId  Int
  userId    Int
  content   String
  createdAt DateTime @default(now())

  ticket    Ticket   @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  author    User     @relation(fields: [userId], references: [id])

  @@index([ticketId])
  @@map("public_comments")
}

model InternalNote {
  id        Int      @id @default(autoincrement())
  ticketId  Int
  userId    Int
  content   String
  createdAt DateTime @default(now())

  ticket    Ticket   @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  author    User     @relation(fields: [userId], references: [id])

  @@index([ticketId])
  @@map("internal_notes")
}
```

---

## 8. Acceptance Criteria (AC)

- **AC-01 (Authentication):** Given an active user with valid credentials, when logging in via `POST /api/auth/login`, then the server returns 200 OK with authenticated session and user details (`id`, `email`, `fullName`, `role`, `mustChangePassword`).
- **AC-02 (Inactive User Blocking):** Given an inactive user (`isActive = false`), when attempting to log in, then the server returns 401 Unauthorized with generic message "Invalid email or password".
- **AC-03 (Mandatory Password Rotation):** Given a user with `mustChangePassword = true`, when accessing operational routes, then the server returns 403 Forbidden until a new password meeting complexity rules is saved via `POST /api/auth/change-password`.
- **AC-04 (Requester Data Privacy):** Given an authenticated Requester, when requesting `/api/tickets`, then only tickets where `requesterId = req.user.id` are returned.
- **AC-05 (Internal Note Protection):** Given an authenticated Requester, when attempting to fetch or create an Internal Note (`/api/tickets/:id/notes`), then the server returns 403 Forbidden without disclosing note contents.
- **AC-06 (Ticket Queue Filtering & Search):** Given an authenticated IT Staff user, when querying `GET /api/staff/tickets` with search, category, status, or priority parameters, then the server returns matching tickets with accurate pagination metadata.
- **AC-07 (Ticket Claim Workflow):** Given a ticket with status `NEW` and `ownerId = null`, when an IT Staff user calls `PATCH /api/staff/tickets/:id/claim`, then `ownerId` becomes the current user's ID and status transitions to `OPEN`.
- **AC-08 (Mandatory Resolution Summary):** Given an open or in-progress ticket, when an IT Staff user transitions status to `RESOLVED` without a `resolutionSummary`, then the request is rejected with 422 Unprocessable Entity.
- **AC-09 (Admin User Roster):** Given an authenticated Administrator, when querying `GET /api/admin/users`, then the server returns all users with role and status.
- **AC-10 (Admin Self-Deactivation Guard):** Given an authenticated Administrator, when attempting to set `isActive = false` or change role on their own user ID, then the server returns 422 Unprocessable Entity.
- **AC-11 (Last Active Administrator Guard):** Given a system with exactly one active Administrator, when attempting to deactivate or demote that user, then the server rejects the operation with 422 Unprocessable Entity.
- **AC-12 (Requester Problem Resolved Indication):** Given an authenticated Requester viewing their ticket, when submitting a resolution confirmation, then a Public Comment is logged indicating the requester considers the issue resolved without closing the ticket.

---

## 9. Product Definition of Done (DoD)
1. All 6 specification markdown documents delivered and approved.
2. PostgreSQL database migrated with User, PublicComment, InternalNote models and indexes.
3. Seed data verified with 4+ active Requesters, 1 inactive Requester, 3+ active IT Staff, 1 inactive IT Staff, and 1+ Administrator.
4. Backend API contracts implemented with 100% test coverage for authentication, authorization, IT queue, comments/notes, and admin user management.
5. Frontend UI components implemented with Zen Green styling, full responsive layout (Desktop, Tablet, Mobile), and accessible forms.
6. Vitest test suite and Playwright E2E tests passing without failure.
7. Peer review conducted and merged into `lab3-staging` and subsequently into `main`.
8. 9-Part final PDF report compiled with verifiable evidence.

---

## 10. Assumptions and Decisions
1. **Password Hashing:** `bcrypt` with salt rounds = 10 is chosen for secure one-way hashing of user credentials. Plaintext passwords are never stored or logged.
2. **Session Storage:** Authentication sessions will be maintained via secure HTTP-only cookies storing a signed token or session ID to guard against Cross-Site Scripting (XSS) token theft.
3. **IT Priority Initialization:** When a ticket is created by a Requester, the database initializes `itPriority` to mirror `requestedPriority`. Only `IT_STAFF` or `ADMINISTRATOR` can subsequently modify `itPriority`.
4. **Reopened Ticket Behavior:** When a ticket is reopened (`RESOLVED` -> `REOPENED` -> `IN_PROGRESS`), existing `resolutionSummary` is preserved as historical record until an IT Staff member re-resolves the ticket with a newly updated resolution summary.

