# Lab 2 Test Plan and Results

## 1. Test Strategy
We apply Test-Driven Development (TDD) based on the Acceptance Criteria defined in `specification.md`.
Coverage includes:
- **Unit Tests**: Validation logic, string trimming, ticket number generation.
- **API Tests (Integration)**: Endpoint responses, validation errors, ownership enforcement.
- **UI Component Tests**: React component rendering, state changes, responsive CSS classes.
- **E2E & Visual Regression Tests**: Full user journeys and visual snapshot regression checking across Desktop, Tablet, and Mobile viewports using Playwright.

## 2. Planned Tests and Results

| Test ID | Type | Requirement / AC | What It Tests | Expected Result | Automated Test File | Final |
|---|---|---|---|---|---|---|
| UNIT-01 | Unit | BR-01 | Ticket number generator format | Generated string matches `TKT-YYYYMMDD-XXXX` | `server/tests/lab-02/create-ticket.api.test.ts` | PASS |
| API-01 | API | AC-01 | Create valid ticket | 201 Created; one saved Ticket; number returned | `server/tests/lab-02/create-ticket.api.test.ts` | PASS |
| API-02 | API | AC-03 | Prevent cross-requester ticket access | 403 Forbidden | `server/tests/lab-02/ticket-detail.api.test.ts` | PASS |
| API-03 | API | AC-04 | Reject >5MB attachment | 400 Bad Request; friendly message | `server/tests/lab-02/attachments.api.test.ts` | PASS |
| API-04 | API | AC-05 | Search, filter, sort & paginate My Tickets | Correct subset of owned tickets returned | `server/tests/lab-02/my-tickets.api.test.ts` | PASS |
| API-05 | API | AC-06 | Soft-remove attachment with reason | Attachment marked removed with timestamp & reason | `server/tests/lab-02/attachments.api.test.ts` | PASS |
| UI-01 | UI | AC-02 | No Requester selected on load | Show Development Requester Selection screen | `client/src/test/DevelopmentRequesterSelection.test.tsx` | PASS |
| UI-02 | UI | AC-01 | Submit without Summary | Field error message; API not called | `client/src/test/lab-02/CreateTicketForm.test.tsx` | PASS |
| UI-03 | UI | AC-06 | Soft-remove attachment with reason dialog | File disappears from active list; marked [Removed] | `client/src/test/lab-02/AttachmentSection.test.tsx` | PASS |
| UI-04 | UI | AC-05 | My Tickets list rendering, filters & sorting | Responsive list/table with empty vs no-results | `client/src/test/lab-02/MyTickets.test.tsx` | PASS |
| UI-05 | UI | AC-03 | Ticket detail read-only view with error & retry | Read-only details and retry state on API error | `client/src/test/lab-02/TicketDetail.test.tsx` | PASS |
| E2E-01 | E2E | AC-01, AC-05, AC-06 | Complete responsive submission flow | Full journey from requester select to ticket detail | `e2e/lab-02/requester-ticket-flow.spec.ts` | PASS |
| E2E-02 | E2E | UI Specs | Visual regression & layout snapshot comparison | Snapshots match baseline on Desktop, Tablet, Mobile | `e2e/lab-02/visual-regression.spec.ts` | PASS |

## 3. Acceptance-Criterion Traceability

| AC ID | Description | Mapped Test IDs | Status |
|---|---|---|---|
| AC-01 | Ticket creation with official number | API-01, UI-02, E2E-01 | PASS |
| AC-02 | Requester context selection | UI-01, E2E-01 | PASS |
| AC-03 | Ownership protection (403 Forbidden) | API-02, UI-05 | PASS |
| AC-04 | File attachment limits (5MB, 5 files, mime types) | API-03, E2E-01 | PASS |
| AC-05 | Search, filter, sort, pagination in My Tickets | API-04, UI-04, E2E-01 | PASS |
| AC-06 | Soft-removal with reason & download block | API-05, UI-03, E2E-01 | PASS |

## 4. Responsive and Visual Checklist
- [x] No clipped labels or overlapping messages.
- [x] Multi-column layout on Desktop (≥ 992px).
- [x] Two-column layout on Tablet (768px - 991px).
- [x] Fields stack vertically on Mobile (< 768px).
- [x] Zero horizontal scrolling (`scrollWidth - clientWidth <= 1`).
- [x] Required field asterisks are present and red.
- [x] Button hierarchy (Primary vs Secondary) is distinct.
- [x] Success, Error, and Loading states are clearly visible without relying solely on color.

## 5. Test Commands
```bash
# Backend Supertest tests
cd server && npm test

# Frontend Vitest UI component tests
cd client && npm test

# Playwright E2E and Visual Regression tests
npm run test:e2e
```

## 6. Final Results
- **API Tests (Server)**: 40 / 40 passed (8 test files)
- **UI Component Tests (Client)**: 27 / 27 passed (6 test files)
- **E2E & Visual Regression Tests (Playwright)**: 12 / 12 passed across Desktop, Tablet, and Mobile
- **Visual Evidence & Snapshots**: 
  - Screenshots saved to `artifacts/lab-02/screenshots/`
  - Playwright visual baseline snapshots saved to `e2e/lab-02/visual-regression.spec.ts-snapshots/`

## 7. Known Limitations or Deferred Tests
- Real authentication, login sessions, and JWT tokens are deferred to Lab 3.
