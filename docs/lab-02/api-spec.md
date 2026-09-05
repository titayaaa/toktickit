# REST API Contract

## General Rules
- All endpoints must validate the `requesterId` provided via mock authentication header (e.g. `Authorization: Bearer dev_requester_X`).
- Validations that fail should return `400 Bad Request` with a descriptive payload.
- Requests accessing unauthorized resources should return `403 Forbidden`.
- Not found resources should return `404 Not Found`.
- Successful creations return `201 Created`.

## 1. Reference Data Endpoints

### 1.1 Get Active Categories
`GET /api/categories`
- **Response**: `200 OK`
- **Body**: Array of Category objects `[{ id, name }]`

### 1.2 Get Active Related Systems
`GET /api/related-systems`
- **Response**: `200 OK`
- **Body**: Array of RelatedSystem objects `[{ id, name }]`

### 1.3 Get Active Development Requesters
`GET /api/requesters`
- **Response**: `200 OK`
- **Body**: Array of RequesterUser objects `[{ id, name, email }]`
- **Note**: Must not return inactive requesters.

## 2. Ticket Endpoints

### 2.1 Create Ticket
`POST /api/tickets`
- **Request Body**:
  ```json
  {
    "summary": "Laptop battery drains quickly",
    "description": "It drains in 1 hour even when idle.",
    "categoryId": 2,
    "relatedSystemId": 7,
    "requestedPriority": "MEDIUM"
  }
  ```
- **Validation**: `summary` (1-200 chars), `description` (1-2000 chars), valid FKs for category and related system.
- **Response**: `201 Created`
- **Body**: Created Ticket object including system-generated `ticketNumber` and `id`.

### 2.2 Get My Tickets
`GET /api/tickets?search=keyword&categoryId=2&status=NEW&page=1&limit=10&sortBy=createdAt&sortDir=desc`
- **Query Params**:
  - `search`: string (matches ticketNumber or summary)
  - `categoryId`, `status`, `priority`: filters
  - `page`, `limit`: pagination (default page=1, limit=10)
  - `sortBy`, `sortDir`: sorting
- **Validation**: If query parameters are invalid (e.g., invalid status enum, negative page number), return `400 Bad Request` with error details.
- **Response**: `200 OK`
- **Body**:
  ```json
  {
    "data": [ { "id": 1, "ticketNumber": "TKT-...", "summary": "...", ... } ],
    "meta": { "totalCount": 42, "currentPage": 1, "totalPages": 5 }
  }
  ```
- **Security**: Only returns tickets where `requesterId` matches the authenticated dev requester.

### 2.3 Get Ticket Detail
`GET /api/tickets/:id`
- **Response**: `200 OK`
- **Body**: Full ticket data including nested `Category`, `RelatedSystem`, and active `Attachments`.
- **Security**: Returns `403 Forbidden` if the ticket does not belong to the authenticated requester.

## 3. Attachment Endpoints

### 3.1 Upload Attachment
`POST /api/tickets/:id/attachments`
- **Content-Type**: `multipart/form-data`
- **Validation**: Max 5 active attachments per ticket. Max 5MB per file (return `413 Payload Too Large` if exceeded). Allowed types: JPG, PNG, WEBP, PDF (return `415 Unsupported Media Type` or `400` if invalid).
- **Security**: Must own the ticket.
- **Response**: `201 Created`
- **Body**: Created Attachment metadata.

### 3.2 Soft-Remove Attachment
`DELETE /api/tickets/:id/attachments/:attachmentId`
- **Request Body**:
  ```json
  {
    "reason": "Uploaded the wrong screenshot"
  }
  ```
- **Validation**: Must provide a reason.
- **Security**: Must own the ticket.
- **Response**: `200 OK` (Attachment marked as removed).

### 3.3 Download Attachment
`GET /api/tickets/:id/attachments/:attachmentId/download`
- **Security**: Must own the ticket.
- **Validation**: If attachment is soft-removed, return `404 Not Found` or `403 Forbidden`.
- **Response**: `200 OK` with file stream.
