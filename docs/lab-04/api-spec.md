# Sprint 4 REST API Specification: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Authentication & Security Policy
The server's authentication middleware (`server/src/middleware/auth.ts`) accepts both:
- **Authorization Header (Default for Client SPA):** `Authorization: Bearer <token>`
- **Session Cookie (Browser Sessions):** `connect.sid` or `jwt` HTTP-only cookie

Standard Request Headers:
- `Content-Type: application/json`
- `Accept: application/json`

**Data Isolation & Error Code Policy:**
- In existing endpoints from Labs 1–3 (`/api/tickets/:id`, comments), when a `REQUESTER` attempts to access another user's ticket, the backend currently responds with **`403 Forbidden`**.
- For the new Sprint 4 Actions Taken endpoints (`/api/tickets/:id/actions-taken`), the API returns **`404 Not Found`** for unowned tickets to prevent resource enumeration and protect data privacy. Standardizing all legacy ticket detail endpoints to 404 is scheduled under regression hardening in Issue 34.

---

## 2. Actions Taken Endpoints

### 2.1 List Actions Taken for a Ticket
Retrieve all Actions Taken records associated with a specific ticket with pagination and sorting.

- **Method / Path:** `GET /api/tickets/:id/actions-taken`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`, `REQUESTER` (Requester can only access if they own the ticket; unowned tickets return `404 Not Found`).
- **Query Parameters:**
  - `page`: optional integer, default `1`
  - `limit`: optional integer, default `10`
  - `orderBy`: optional string (`asc` or `desc` by `actionDateTime`, default `desc`)
- **Success Response (`200 OK`)**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "ticketId": 101,
        "performedById": 2,
        "performedBy": {
          "id": 2,
          "fullName": "Jane Staff",
          "email": "jane@toktickit.com"
        },
        "assigneeId": 3,
        "assignee": {
          "id": 3,
          "fullName": "Bob Senior",
          "email": "bob@toktickit.com"
        },
        "actionDateTime": "2026-10-30T10:15:00.000Z",
        "actionDescription": "Replaced RAM module and ran diagnostic test suite.",
        "result": "Memory test passed 100% with no errors.",
        "isFollowUpRequired": true,
        "followUpNote": "Monitor system stability over next 48 hours.",
        "attachmentNotes": "Refer to diagnostics-report.pdf in Ticket attachments.",
        "status": "COMPLETED",
        "createdAt": "2026-10-30T10:20:00.000Z",
        "updatedAt": "2026-10-30T10:20:00.000Z"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Missing or invalid Bearer token / session.
  - `404 Not Found`: Ticket does not exist or belongs to another user (for Requester).

---

### 2.2 Retrieve Single Action Taken
- **Method / Path:** `GET /api/tickets/:id/actions-taken/:actionId`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`, `REQUESTER` (owned tickets only).
- **Responses:**
  - `200 OK`: Returns the single `ActionTaken` object.
  - `401 Unauthorized`: Token missing or invalid.
  - `404 Not Found`: Ticket or Action Taken not found.

---

### 2.3 Create Action Taken
Record a new technical action under a ticket.

- **Method / Path:** `POST /api/tickets/:id/actions-taken`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR` (Requesters return `403 Forbidden`).
- **Request Body:**
  ```json
  {
    "assigneeId": 3,
    "actionDateTime": "2026-10-30T10:15:00.000Z",
    "actionDescription": "Inspected power supply unit and tightened loose connectors.",
    "result": "System successfully powers on without shutdown.",
    "isFollowUpRequired": false,
    "followUpNote": null,
    "attachmentNotes": "Photo of repaired power connector attached.",
    "status": "COMPLETED"
  }
  ```
- **Validation Rules:**
  - `actionDescription`: Required string, 3 to 1000 characters.
  - `assigneeId`: Required integer (`Int`), must reference an active user (`isActive = true`) with role `IT_STAFF` or `ADMINISTRATOR`. If invalid or inactive, return `422 Unprocessable Entity`.
  - `performedById`: Server automatically assigns authenticated `currentUser.id`.
  - `status`: Optional enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), default `PENDING`.
  - `result`: Optional string while status is `PENDING` or `IN_PROGRESS`. Mandatory non-empty string (2–1000 chars) when status is `COMPLETED`.
  - `isFollowUpRequired`: Boolean. If `true`, `followUpNote` must not be blank (min 2 chars).
- **Responses:**
  - `201 Created`: Returns the newly created `ActionTaken` record with populated `performedBy` and `assignee`.
  - `400 Bad Request`: Validation failure (e.g. `followUpNote` missing when `isFollowUpRequired = true` or `result` missing when `status = 'COMPLETED'`).
  - `401 Unauthorized`: Not logged in.
  - `403 Forbidden`: User has role `REQUESTER`.
  - `404 Not Found`: Ticket does not exist.
  - `422 Unprocessable Entity`: `assigneeId` is inactive or has role `REQUESTER`.

---

### 2.4 Update Action Taken
Update an existing Action Taken record.

- **Method / Path:** `PATCH /api/tickets/:id/actions-taken/:actionId`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body (partial fields allowed):**
  ```json
  {
    "status": "COMPLETED",
    "result": "Diagnostic verification fully completed.",
    "isFollowUpRequired": false,
    "followUpNote": null
  }
  ```
- **Responses:**
  - `200 OK`: Returns updated `ActionTaken` object.
  - `400 Bad Request`: Validation failure (e.g. completing action without result).
  - `401 Unauthorized`: Not logged in.
  - `403 Forbidden`: Requester role.
  - `404 Not Found`: Ticket or Action Taken not found.
  - `409 Conflict`: Concurrency conflict detected.
  - `422 Unprocessable Entity`: Assigned user is inactive or invalid.

---

## 3. Ticket Status & Resolution Endpoints

In the TokTickIT architecture (`server/src/routes/staff.ts`), ticket status updates and ticket resolution are separated into two dedicated endpoints to enforce the resolution contract:

### 3.1 Update Ticket Status (Non-Resolution Transitions)
Transition ticket status across non-terminal states per the `VALID_TRANSITIONS` matrix.

- **Method / Path:** `PATCH /api/staff/tickets/:id/status`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "status": "IN_PROGRESS",
    "expectedUpdatedAt": "2026-10-30T09:30:00.000Z"
  }
  ```
- **Rules & Checks:**
  1. **Direct Resolution Prohibition:** Transitioning to `RESOLVED` directly via this endpoint is blocked. The API responds with `422 Unprocessable Entity`:
     ```json
     {
       "error": "Resolving a ticket requires a resolution summary. Please use the /resolve endpoint."
     }
     ```
  2. **State Transition Enforcement:** Transitions must be valid according to `VALID_TRANSITIONS`. Invalid transitions respond with `422 Unprocessable Entity`:
     ```json
     {
       "error": "Invalid status transition from OPEN to RESOLVED"
     }
     ```
  3. **Terminal State Immutability:** If ticket is already `CLOSED` or `CANCELLED`, returns `422 Unprocessable Entity`.
  4. **Concurrency Check (Stale Update - Planned for Issue 31):** If `expectedUpdatedAt` does not match server `ticket.updatedAt`, returns `409 Conflict`:
     ```json
     {
       "error": "ConflictError",
       "message": "Ticket has been modified by another user. Please refresh and review latest changes.",
       "currentUpdatedAt": "2026-10-30T10:00:00.000Z"
     }
     ```
- **Responses:**
  - `200 OK`: Status updated successfully.
  - `400 Bad Request`: Missing or invalid status parameter or invalid ticket ID.
  - `401 Unauthorized`: Missing or invalid token.
  - `403 Forbidden`: Requester role.
  - `404 Not Found`: Ticket not found.
  - `409 Conflict`: Stale update detected via `expectedUpdatedAt` *(Planned for Issue 31)*.
  - `422 Unprocessable Entity`: Target status is `RESOLVED` or invalid transition.

---

### 3.2 Resolve Ticket (Resolution Gate Enforced)
Formal ticket resolution requiring a resolution summary and enforcing that all Actions Taken are complete or cancelled.

- **Method / Path:** `PATCH /api/staff/tickets/:id/resolve`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "resolutionSummary": "All hardware diagnostic tests passed, RAM module replaced, and system verified stable.",
    "expectedUpdatedAt": "2026-10-30T09:30:00.000Z"
  }
  ```
- **Rules & Checks:**
  1. **Resolution Summary Validation:** `resolutionSummary` is mandatory (non-empty string between 3 and 500 characters). If omitted or invalid, returns `422 Unprocessable Entity`:
     ```json
     {
       "error": "Resolution summary must be a non-empty string between 3 and 500 characters"
     }
     ```
  2. **Resolution Gate Check (BR-09 - Planned for Issue 31):** The backend inspects all Actions Taken associated with the ticket. If any action has status `PENDING` or `IN_PROGRESS`, the request is rejected with `409 Conflict`:
     ```json
     {
       "error": "ResolutionGateBlocked",
       "message": "Cannot resolve ticket because there are 2 active Actions Taken (PENDING or IN_PROGRESS). Please complete or cancel all actions before resolving.",
       "pendingActionsCount": 2
     }
     ```
  3. **Transition Check:** Current status must permit transition to `RESOLVED` (i.e. `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, `PENDING`, or `REOPENED`). If not allowed (e.g. from `NEW` or `OPEN`), returns `422 Unprocessable Entity`:
     ```json
     {
       "error": "Cannot transition from OPEN to RESOLVED"
     }
     ```
  4. **Concurrency Check (Planned for Issue 31):** If `expectedUpdatedAt` mismatch, returns `409 Conflict`.
- **Responses:**
  - `200 OK`: Ticket resolved successfully, status updated to `RESOLVED`, `resolutionSummary` recorded.
  - `400 Bad Request`: Invalid ticket ID.
  - `401 Unauthorized`: Token missing or invalid.
  - `403 Forbidden`: Requester role forbidden.
  - `404 Not Found`: Ticket not found.
  - `409 Conflict`: Active Actions Taken exist (Resolution Gate) or stale update *(Planned for Issue 31)*.
  - `422 Unprocessable Entity`: Invalid transition or missing/invalid `resolutionSummary`.

---

## 4. Operational Dashboard Endpoints

### 4.1 IT Staff Dashboard
Aggregates operational workload and urgent items for IT Staff. All timestamps are in UTC ISO-8601.

- **Method / Path:** `GET /api/staff/dashboard`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Calculations:**
  - `unassignedTicketsCount`: `ownerId IS NULL` and `currentStatus NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED')`
  - `myAssignedTicketsCount`: `ownerId == currentUser.id` and `currentStatus NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED')`
  - `urgentTicketsCount`: `itPriority == 'URGENT'` and `currentStatus NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED')`
  - `myPendingActionsCount`: Actions Taken where `assigneeId == currentUser.id` and `status IN ('PENDING', 'IN_PROGRESS')`
- **Success Response (`200 OK`)**:
  ```json
  {
    "metrics": {
      "unassignedTicketsCount": 4,
      "myAssignedTicketsCount": 7,
      "urgentTicketsCount": 2,
      "myPendingActionsCount": 3
    },
    "urgentTickets": [
      {
        "id": 101,
        "ticketNumber": "TCK-2026-0001",
        "summary": "Server room cooling failure",
        "itPriority": "URGENT",
        "currentStatus": "IN_PROGRESS",
        "owner": { "id": 2, "fullName": "Jane Staff" },
        "createdAt": "2026-10-30T08:00:00.000Z",
        "updatedAt": "2026-10-30T09:30:00.000Z"
      }
    ],
    "myAssignedActions": [
      {
        "id": 1,
        "ticketId": 101,
        "ticketNumber": "TCK-2026-0001",
        "ticketSummary": "Server room cooling failure",
        "actionDescription": "Replace cooling backup valve",
        "status": "IN_PROGRESS",
        "actionDateTime": "2026-10-30T09:00:00.000Z"
      }
    ],
    "recentTickets": [
      {
        "id": 102,
        "ticketNumber": "TCK-2026-0002",
        "summary": "Network switch firmware upgrade",
        "currentStatus": "OPEN",
        "itPriority": "HIGH",
        "updatedAt": "2026-10-30T10:00:00.000Z"
      }
    ]
  }
  ```
- **Empty State:** If there are no matching tickets or actions, metrics return `0` and arrays return `[]`.
- **Error Responses:** `401 Unauthorized`, `403 Forbidden` (Requesters).

---

### 4.2 Requester Dashboard
Summarizes tickets owned by the authenticated requester with safe ownership fallback across schema versions (matching `userId`, `requesterUser.email`, or `requester.email` to avoid cross-table ID collisions).

- **Method / Path:** `GET /api/requester/dashboard`
- **Authorized Roles:** `REQUESTER`, `IT_STAFF`, `ADMINISTRATOR`
- **Ownership Predicate:**
  A ticket belongs to the authenticated user if:
  `ticket.userId === currentUser.id OR ticket.requesterUser?.email === currentUser.email OR ticket.requester?.email === currentUser.email`
- **Calculations:**
  - `totalOpenCount`: Owned tickets where `currentStatus NOT IN ('RESOLVED', 'CLOSED', 'CANCELLED')`
  - `waitingForRequesterCount`: Owned tickets where `currentStatus == 'WAITING_FOR_REQUESTER'`
  - `recentlyUpdatedCount`: Owned tickets where `updatedAt >= NOW() - 7 days`
  - `recentlyResolvedCount`: Owned tickets where `currentStatus IN ('RESOLVED', 'CLOSED')`
- **Success Response (`200 OK`)**:
  ```json
  {
    "metrics": {
      "totalOpenCount": 3,
      "waitingForRequesterCount": 1,
      "recentlyUpdatedCount": 2,
      "recentlyResolvedCount": 5
    },
    "actionRequiredTickets": [
      {
        "id": 103,
        "ticketNumber": "TCK-2026-0003",
        "summary": "Need serial number for replacement monitor",
        "currentStatus": "WAITING_FOR_REQUESTER",
        "requestedPriority": "MEDIUM",
        "updatedAt": "2026-10-30T10:10:00.000Z"
      }
    ],
    "recentTickets": [
      {
        "id": 104,
        "ticketNumber": "TCK-2026-0004",
        "summary": "VPN connection drops after standby",
        "currentStatus": "OPEN",
        "requestedPriority": "LOW",
        "updatedAt": "2026-10-30T09:45:00.000Z"
      }
    ]
  }
  ```
- **Empty State:** If requester has no tickets, counts return `0` and lists return `[]` with empty UI guidance.
- **Error Responses:** `401 Unauthorized`.
