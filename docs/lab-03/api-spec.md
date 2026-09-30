# Sprint 3 REST API Specification

## 1. Authentication & Session APIs

### 1.1 `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "sarah.johnson@toktickit.com",
    "password": "Password123"
  }
  ```
- **Responses:**
  - `200 OK`: Sets HTTP-only authentication cookie / session token.
    ```json
    {
      "user": {
        "id": 2,
        "email": "sarah.johnson@toktickit.com",
        "fullName": "Sarah Johnson",
        "role": "IT_STAFF",
        "mustChangePassword": false
      }
    }
    ```
  - `401 Unauthorized`: For invalid credentials or inactive accounts (`isActive = false`).
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

### 1.2 `POST /api/auth/logout`
- **Access:** Authenticated
- **Behavior:** Clears session cookie/token and invalidates server session.
- **Response:** `200 OK`
  ```json
  { "message": "Logged out successfully" }
  ```

### 1.3 `GET /api/auth/me`
- **Access:** Authenticated
- **Response:** `200 OK`
  ```json
  {
    "user": {
      "id": 2,
      "email": "sarah.johnson@toktickit.com",
      "fullName": "Sarah Johnson",
      "role": "IT_STAFF",
      "mustChangePassword": false
    }
  }
  ```
  - `401 Unauthorized`: If session missing or expired.

### 1.4 `POST /api/auth/change-password`
- **Access:** Authenticated
- **Request Body:**
  ```json
  {
    "currentPassword": "Password123",
    "newPassword": "NewPassword456"
  }
  ```
- **Responses:**
  - `200 OK`: Sets `mustChangePassword = false`, updates hashed password.
    ```json
    { "message": "Password changed successfully" }
    ```
  - `422 Unprocessable Entity`: If new password does not satisfy complexity (>=8 chars, uppercase, lowercase, number).

---

## 2. Ticket Management APIs (Preserved & Extended)

### 2.1 `POST /api/tickets` (Create Ticket)
- **Access:** Authenticated (`REQUESTER`, `IT_STAFF`, `ADMINISTRATOR`)
- **Behavior:** Assigns `requesterId = req.user.id` from session. Initial status is `NEW`.
- **Response:** `201 Created`
  ```json
  {
    "id": 15,
    "ticketNumber": "TKT-2026-000015",
    "summary": "VPN connection drops frequently",
    "description": "Every 30 minutes the connection terminates.",
    "categoryId": 1,
    "requestedPriority": "HIGH",
    "itPriority": "HIGH",
    "status": "NEW",
    "ownerId": null,
    "requesterId": 1
  }
  ```

### 2.2 `GET /api/tickets` (My Tickets)
- **Access:** Authenticated (`REQUESTER`)
- **Behavior:** Returns only tickets where `requesterId = req.user.id`.

### 2.3 `GET /api/tickets/:id` (Ticket Detail)
- **Access:** Authenticated (Owner, IT Staff, Admin)
- **Data Protection Guard:**
  - If requester: Response includes `publicComments` and attachments, but `internalNotes` is **never included** in the response.
  - If IT Staff or Admin: Can fetch Internal Notes via dedicated `/api/tickets/:id/notes` endpoint.
- **Response:** `200 OK`
  ```json
  {
    "id": 15,
    "ticketNumber": "TKT-2026-000015",
    "summary": "VPN connection drops frequently",
    "description": "Every 30 minutes the connection terminates.",
    "status": "IN_PROGRESS",
    "requestedPriority": "HIGH",
    "itPriority": "HIGH",
    "requester": { "id": 1, "fullName": "Alex Thompson", "email": "alex.thompson@toktickit.com" },
    "owner": { "id": 2, "fullName": "Sarah Johnson", "email": "sarah.johnson@toktickit.com" },
    "publicComments": [
      {
        "id": 101,
        "content": "Please verify your client version.",
        "createdAt": "2026-09-17T08:30:00Z",
        "author": { "fullName": "Sarah Johnson", "role": "IT_STAFF" }
      }
    ]
  }
  ```

---

## 3. IT Staff Operational APIs

### 3.1 `GET /api/staff/tickets` (Queue Query)
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Query Parameters:**
  - `search`: string (matches ticket number or summary)
  - `category`: number (Category ID)
  - `status`: string (`NEW`, `OPEN`, `IN_PROGRESS`, etc.)
  - `priority`: string (`LOW`, `MEDIUM`, `HIGH`, `URGENT`)
  - `itPriority`: string (`LOW`, `MEDIUM`, `HIGH`, `URGENT`)
  - `ownerId`: number | `"unassigned"` | `"me"`
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:** `200 OK`
  ```json
  {
    "tickets": [ ... ],
    "pagination": { "total": 35, "page": 1, "limit": 10, "totalPages": 4 }
  }
  ```

### 3.2 `PATCH /api/staff/tickets/:id/claim`
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Behavior:** Sets `ownerId = req.user.id`. If status is `NEW`, transitions to `OPEN`.
- **Response:** `200 OK`

### 3.3 `PATCH /api/staff/tickets/:id/assign`
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:** `{ "ownerId": 3 }`
- **Response:** `200 OK`

### 3.4 `PATCH /api/staff/tickets/:id/priority`
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:** `{ "itPriority": "HIGH" }`
- **Response:** `200 OK`

### 3.5 `PATCH /api/staff/tickets/:id/status`
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:** `{ "status": "IN_PROGRESS" }`
- **Guard:** Reject status transition to `RESOLVED` via this endpoint with `422 Unprocessable Entity` (must use `/resolve` endpoint).
- **Response:** `200 OK`

### 3.6 `PATCH /api/staff/tickets/:id/resolve`
- **Access:** `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "resolutionSummary": "Reconfigured client split-tunneling settings; verified connection stable."
  }
  ```
- **Validation:** `resolutionSummary` must be 3-500 characters.
- **Behavior:** Sets status to `RESOLVED` and records `resolutionSummary`.
- **Response:** `200 OK`

---

## 4. Communication APIs (Comments & Notes)

### 4.1 `POST /api/tickets/:id/comments` (Public Comment)
- **Access:** Ticket Requester, `IT_STAFF`, `ADMINISTRATOR`
- **Request Body:**
  ```json
  {
    "content": "Updated the client to v4.2.1, working now!",
    "indicatesResolved": true
  }
  ```
- **Response:** `201 Created`

### 4.2 `GET /api/tickets/:id/comments`
- **Access:** Ticket Requester, `IT_STAFF`, `ADMINISTRATOR`
- **Response:** `200 OK` array of Public Comments.

### 4.3 `POST /api/tickets/:id/notes` (Internal Note)
- **Access:** `IT_STAFF`, `ADMINISTRATOR` ONLY
- **Security Check:** If called by `REQUESTER`, returns `403 Forbidden`.
- **Request Body:** `{ "content": "Known bug with Cisco VPN client v4.2.0 on Windows 11." }`
- **Response:** `201 Created`

### 4.4 `GET /api/tickets/:id/notes`
- **Access:** `IT_STAFF`, `ADMINISTRATOR` ONLY
- **Security Check:** If called by `REQUESTER`, returns `403 Forbidden`.
- **Response:** `200 OK` array of Internal Notes.

---

## 5. Administrator User Management APIs

### 5.1 `GET /api/admin/users`
- **Access:** `ADMINISTRATOR` ONLY (Others return `403 Forbidden`)
- **Query Params:** `search`, `role`
- **Response:** `200 OK`
  ```json
  {
    "users": [
      {
        "id": 1,
        "fullName": "Alex Thompson",
        "email": "alex.thompson@toktickit.com",
        "role": "REQUESTER",
        "isActive": true,
        "createdAt": "2026-09-01T00:00:00Z"
      }
    ]
  }
  ```

### 5.2 `POST /api/admin/users`
- **Access:** `ADMINISTRATOR` ONLY
- **Request Body:**
  ```json
  {
    "fullName": "Michael Brown",
    "email": "michael.brown@toktickit.com",
    "role": "IT_STAFF",
    "initialPassword": "Password123"
  }
  ```
- **Behavior:** Creates user, sets `mustChangePassword = true`, hashes password.
- **Response:** `201 Created`

### 5.3 `PATCH /api/admin/users/:id`
- **Access:** `ADMINISTRATOR` ONLY
- **Request Body:**
  ```json
  {
    "fullName": "Michael Brown",
    "role": "IT_STAFF",
    "isActive": false
  }
  ```
- **Safety Guards:**
  - Prevent deactivating self (`req.user.id === targetId`): Returns `422 Unprocessable Entity`.
  - Prevent deactivating or demoting the last active administrator: Returns `422 Unprocessable Entity`.
- **Response:** `200 OK`

### 5.4 `POST /api/admin/users/:id/reset-password`
- **Access:** `ADMINISTRATOR` ONLY
- **Request Body:** `{ "newInitialPassword": "TemporaryPass123" }`
- **Behavior:** Updates password and sets `mustChangePassword = true`.
- **Response:** `200 OK`
