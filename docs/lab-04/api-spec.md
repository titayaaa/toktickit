# Sprint 4 REST API Specification: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Authentication & Common Headers
All endpoints require an active session cookie or Bearer token established during login.
- `Content-Type: application/json`
- `Accept: application/json`

---

## 2. Actions Taken Endpoints

### 2.1 List Actions Taken for a Ticket
Retrieve all Actions Taken records associated with a specific ticket.

- **Method / Path:** `GET /api/tickets/:id/actions-taken`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`, `REQUESTER` (Requester can only access if they own the ticket).
- **Responses:**
  - `200 OK`:
    ```json
    [
      {
        "id": "clt_act_12345",
        "ticketId": "clt_tick_98765",
        "performedById": "usr_staff_01",
        "performedBy": {
          "id": "usr_staff_01",
          "name": "Jane Staff",
          "email": "jane@toktickit.com"
        },
        "assigneeId": "usr_staff_02",
        "assignee": {
          "id": "usr_staff_02",
          "name": "Bob Senior",
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
    ]
    ```
  - `401 Unauthorized`: Not logged in.
  - `403 Forbidden`: Requester accessing another user's ticket.
  - `404 Not Found`: Ticket does not exist.

---

### 2.2 Create Action Taken
Record a new technical action under a ticket.

- **Method / Path:** `POST /api/tickets/:id/actions-taken`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "assigneeId": "usr_staff_02",
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
  - `actionDescription`: Required, string, 5 to 1000 characters.
  - `result`: Required, string, 2 to 1000 characters.
  - `assigneeId`: Required, must correspond to an active user with role `IT_STAFF` or `ADMINISTRATOR`.
  - `isFollowUpRequired`: Boolean. If `true`, `followUpNote` must not be blank.
  - `status`: Optional enum (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`). Defaults to `COMPLETED`.
- **Responses:**
  - `201 Created`: Returns the created `ActionTaken` object with populated `performedBy` and `assignee`.
  - `400 Bad Request`: Validation failure (e.g. `followUpNote` missing when `isFollowUpRequired` is true).
  - `401 Unauthorized`: Session missing or expired.
  - `403 Forbidden`: User has `REQUESTER` role.
  - `404 Not Found`: Ticket ID not found.
  - `422 Unprocessable Entity`: `assigneeId` is inactive or has role `REQUESTER`.

---

### 2.3 Update Action Taken
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
  - `200 OK`: Returns the updated `ActionTaken` object.
  - `400 Bad Request`: Validation failure.
  - `401 Unauthorized`: Not logged in.
  - `403 Forbidden`: Requester role forbidden.
  - `404 Not Found`: Action Taken record or Ticket not found.
  - `409 Conflict`: Concurrent modification detected.
  - `422 Unprocessable Entity`: Invalid assignee assigned.

---

## 3. Ticket Workflow & Resolution Gate Endpoints

### 3.1 Update Ticket Status
Transition ticket lifecycle status with resolution gate enforcement.

- **Method / Path:** `PUT /api/staff/tickets/:id/status` (or `PATCH /api/tickets/:id/status`)
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "status": "RESOLVED",
    "resolutionSummary": "All hardware diagnostic tests passed and RAM module replaced."
  }
  ```
- **Resolution Gate Rule (BR-08):**
  - If target `status` is `RESOLVED`, the system queries all `ActionTaken` records for this ticket.
  - If any record has `status = 'PENDING'` or `status = 'IN_PROGRESS'`, the operation is blocked.
- **Responses:**
  - `200 OK`: Status updated successfully. Returns updated Ticket.
  - `400 Bad Request`: Missing mandatory `resolutionSummary` when resolving.
  - `409 Conflict`: Resolution Gate blocked:
    ```json
    {
      "error": "ResolutionBlockedError",
      "message": "Cannot resolve ticket because there are 2 active Actions Taken (PENDING or IN_PROGRESS). Please complete or cancel all actions before resolving the ticket.",
      "pendingActionsCount": 2
    }
    ```
  - `401 Unauthorized`: Not logged in.
  - `403 Forbidden`: Requester role.
  - `404 Not Found`: Ticket not found.

---

## 4. Operational Dashboard Endpoints

### 4.1 IT Staff Dashboard
Aggregates operational workload and urgent items for IT Staff.

- **Method / Path:** `GET /api/staff/dashboard`
- **Authorized Roles:** `IT_STAFF`, `ADMINISTRATOR`
- **Responses:**
  - `200 OK`:
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
          "id": "clt_tick_01",
          "ticketNumber": "TCK-2026-0001",
          "title": "Server room cooling failure",
          "priority": "URGENT",
          "status": "IN_PROGRESS",
          "assignedTo": { "id": "usr_staff_01", "name": "Jane Staff" },
          "createdAt": "2026-10-30T08:00:00.000Z",
          "updatedAt": "2026-10-30T09:30:00.000Z"
        }
      ],
      "myAssignedActions": [
        {
          "id": "clt_act_01",
          "ticketId": "clt_tick_01",
          "ticketNumber": "TCK-2026-0001",
          "ticketTitle": "Server room cooling failure",
          "actionDescription": "Replace cooling backup valve",
          "status": "IN_PROGRESS",
          "actionDateTime": "2026-10-30T09:00:00.000Z"
        }
      ],
      "recentTickets": [
        {
          "id": "clt_tick_02",
          "ticketNumber": "TCK-2026-0002",
          "title": "Network switch firmware upgrade",
          "status": "OPEN",
          "priority": "HIGH",
          "updatedAt": "2026-10-30T10:00:00.000Z"
        }
      ]
    }
    ```
  - `401 Unauthorized`: Not authenticated.
  - `403 Forbidden`: Requester role.

---

### 4.2 Requester Dashboard
Summarizes tickets owned strictly by the authenticated requester.

- **Method / Path:** `GET /api/requester/dashboard`
- **Authorized Roles:** `REQUESTER`, `IT_STAFF`, `ADMINISTRATOR` (returns caller's personal tickets).
- **Responses:**
  - `200 OK`:
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
          "id": "clt_tick_03",
          "ticketNumber": "TCK-2026-0003",
          "title": "Need serial number for replacement monitor",
          "status": "WAITING_FOR_REQUESTER",
          "priority": "MEDIUM",
          "updatedAt": "2026-10-30T10:10:00.000Z"
        }
      ],
      "recentTickets": [
        {
          "id": "clt_tick_04",
          "ticketNumber": "TCK-2026-0004",
          "title": "VPN connection drops after standby",
          "status": "OPEN",
          "priority": "LOW",
          "updatedAt": "2026-10-30T09:45:00.000Z"
        }
      ]
    }
    ```
  - `401 Unauthorized`: Not logged in.
