# Sprint 3 Test Plan and Traceability Matrix

## 1. Test Architecture & Directory Structure
Following the minimum structure defined in Section 12 and 16 of the Lab 3 Handout:
```
server/tests/lab-03/
├── auth.api.test.ts               # Login, logout, current user, session cookies
├── authorization.api.test.ts      # Role-based middleware, password change block
├── staff-queue.api.test.ts        # Staff queue query, filter, search, sort, pagination
├── staff-ticket-detail.api.test.ts# Claim, assign, IT priority, status transition, resolve
├── comments-notes.api.test.ts     # Public comments, internal notes, requester 403 isolation
└── users-admin.api.test.ts        # Admin user list, create, edit, deactivate, safety guards

client/src/test/lab-03/
├── Login.test.tsx                 # Login form rendering, validation, error banner
├── ChangePassword.test.tsx        # Mandatory password change modal, complexity rules
├── StaffTicketQueue.test.tsx      # Queue table, status/priority badges, filter interactions
├── StaffTicketDetail.test.tsx     # Operational toolbar, comments timeline, internal notes
└── UserManagement.test.tsx        # Admin user roster, create modal, self-deactivate disable

e2e/lab-03/
├── authentication.spec.ts         # End-to-end login, first-login password change, logout
├── staff-ticket-flow.spec.ts      # Login as staff, queue view, claim ticket, resolve
└── user-administration.spec.ts    # Login as admin, create user, deactivate, verify safety
```

---

## 2. Traceability Matrix (Acceptance Criteria -> Automated Tests)

| Test ID | Type | AC Ref | Description | Target Test File | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AUTH-01** | API | AC-01 | Valid credentials authenticate and return session + user details | `server/tests/lab-03/auth.api.test.ts` | Planned |
| **AUTH-02** | API | AC-01 | Invalid password returns 401 Unauthorized | `server/tests/lab-03/auth.api.test.ts` | Planned |
| **AUTH-03** | API | AC-02 | Inactive user (`isActive=false`) returns 401 Unauthorized | `server/tests/lab-03/auth.api.test.ts` | Planned |
| **AUTH-04** | API | AC-01 | Explicit logout clears authentication session | `server/tests/lab-03/auth.api.test.ts` | Planned |
| **AUTH-05** | API | AC-03 | User with `mustChangePassword=true` receives 403 on operational routes | `server/tests/lab-03/authorization.api.test.ts` | Planned |
| **AUTH-06** | API | AC-03 | Successful password rotation clears `mustChangePassword` | `server/tests/lab-03/auth.api.test.ts` | Planned |
| **SEC-01** | API | AC-04 | Requester fetching `/api/tickets` receives only owned tickets | `server/tests/lab-03/authorization.api.test.ts` | Planned |
| **SEC-02** | API | AC-04 | Requester supplying foreign `requesterId` in POST is overridden by session | `server/tests/lab-03/authorization.api.test.ts` | Planned |
| **SEC-03** | API | AC-05 | Requester attempting to access `/api/tickets/:id/notes` receives 403 Forbidden | `server/tests/lab-03/comments-notes.api.test.ts` | Planned |
| **SEC-04** | API | AC-05 | `GET /api/tickets/:id` for Requester does NOT expose `internalNotes` field | `server/tests/lab-03/comments-notes.api.test.ts` | Planned |
| **QUEUE-01**| API | AC-06 | IT Staff can search queue by ticket number and summary | `server/tests/lab-03/staff-queue.api.test.ts` | Planned |
| **QUEUE-02**| API | AC-06 | Queue filters by category, status, priority, and assignment | `server/tests/lab-03/staff-queue.api.test.ts` | Planned |
| **QUEUE-03**| API | AC-06 | Non-staff/Requester querying `/api/staff/tickets` receives 403 Forbidden | `server/tests/lab-03/staff-queue.api.test.ts` | Planned |
| **STAFF-01**| API | AC-07 | IT Staff claims unassigned ticket: sets `ownerId` and status to `OPEN` | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **STAFF-02**| API | AC-07 | IT Staff reassigns ticket to another active IT Staff | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **STAFF-03**| API | AC-07 | IT Staff updates IT Priority to `URGENT` | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **STAFF-04**| API | AC-08 | Transition to `RESOLVED` without `resolutionSummary` returns 422 Unprocessable | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **STAFF-05**| API | AC-08 | Transition to `RESOLVED` with valid summary succeeds and records text | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **STAFF-06**| API | AC-08 | Sending status `RESOLVED` to `/status` endpoint is blocked (returns 422) | `server/tests/lab-03/staff-ticket-detail.api.test.ts` | Planned |
| **COMM-01** | API | AC-04 | Requester and Staff can create append-only Public Comments | `server/tests/lab-03/comments-notes.api.test.ts` | Planned |
| **COMM-02** | API | AC-05 | IT Staff can create and view Internal Notes | `server/tests/lab-03/comments-notes.api.test.ts` | Planned |
| **COMM-03** | API | AC-12 | Requester can post comment indicating problem appears resolved | `server/tests/lab-03/comments-notes.api.test.ts` | Planned |
| **ADM-01**  | API | AC-09 | Administrator retrieves user roster with role and status | `server/tests/lab-03/users-admin.api.test.ts` | Planned |
| **ADM-02**  | API | AC-09 | Administrator creates user with initial password and `mustChangePassword=true` | `server/tests/lab-03/users-admin.api.test.ts` | Planned |
| **ADM-03**  | API | AC-10 | Administrator attempting self-deactivation receives 422 Unprocessable | `server/tests/lab-03/users-admin.api.test.ts` | Planned |
| **ADM-04**  | API | AC-11 | Deactivating or demoting the last active administrator returns 422 | `server/tests/lab-03/users-admin.api.test.ts` | Planned |
| **ADM-05**  | API | AC-09 | Non-Administrator calling `/api/admin/users` receives 403 Forbidden | `server/tests/lab-03/users-admin.api.test.ts` | Planned |
| **UI-01**   | Unit| AC-01 | Login view validates email format and required password | `client/src/test/lab-03/Login.test.tsx` | Planned |
| **UI-02**   | Unit| AC-03 | Password change modal validates complexity checklist in real-time | `client/src/test/lab-03/ChangePassword.test.tsx` | Planned |
| **UI-03**   | Unit| AC-06 | Staff ticket queue renders Zen Green table, status badges, and pagination | `client/src/test/lab-03/StaffTicketQueue.test.tsx` | Planned |
| **UI-04**   | Unit| AC-05 | Ticket detail visually styles Internal Notes in amber `#FFF8E1` with lock | `client/src/test/lab-03/StaffTicketDetail.test.tsx` | Planned |
| **UI-05**   | Unit| AC-10 | Admin user management disables deactivation switch on current admin user | `client/src/test/lab-03/UserManagement.test.tsx` | Planned |
| **E2E-01**  | E2E | AC-01 | End-to-end authentication and role-based navigation flow | `e2e/lab-03/authentication.spec.ts` | Planned |
| **E2E-02**  | E2E | AC-07 | End-to-end staff ticket triage: view queue, claim ticket, post note, resolve | `e2e/lab-03/staff-ticket-flow.spec.ts` | Planned |
| **E2E-03**  | E2E | AC-09 | End-to-end administrator user creation, password reset, and deactivation | `e2e/lab-03/user-administration.spec.ts` | Planned |
