# Lab 2 Test Plan and Results

## 1. Test Strategy
We will apply Test-Driven Development (TDD) based on the Acceptance Criteria defined in `specification.md`.
Coverage will include:
- **Unit Tests**: Validation logic, string trimming, ticket number generation.
- **API Tests (Integration)**: Endpoint responses, validation errors, ownership enforcement.
- **UI Component Tests**: React component rendering, state changes, responsive CSS classes.
- **E2E Tests**: Full user flows (Select Requester -> Create Ticket -> View My Tickets) using Playwright.

## 2. Planned Tests

| Test ID | Type | Requirement / AC | What It Tests | Expected Result | Automated Test File | Final |
|---|---|---|---|---|---|---|
| UNIT-01 | Unit | BR-01 | Ticket number generator format | Generated string matches TKT-YYYY-XXXXXX | `server/tests/lab-02/ticket-number.test.ts` | TBD |
| API-01 | API | AC-01 | Create valid ticket | 201; one saved Ticket; number returned | `server/tests/lab-02/create-ticket.api.test.ts` | TBD |
| API-02 | API | AC-03 | Prevent cross-requester access | 403 Forbidden | `server/tests/lab-02/ticket-detail.api.test.ts` | TBD |
| API-03 | API | AC-04 | Reject >5MB attachment | 400 Bad Request; message | `server/tests/lab-02/attachments.api.test.ts` | TBD |
| UI-01 | UI | AC-02 | No Requester selected on My Tickets | Redirect to Selector screen | `client/.../lab-02 tests/MyTickets.test.tsx` | TBD |
| UI-02 | UI | AC-01 | Submit without Summary | Field error message; API not called | `client/.../lab-02 tests/CreateTicket.test.tsx` | TBD |
| UI-03 | UI | AC-06 | Soft-remove attachment with reason | File disappears from active list; marked removed | `client/.../lab-02 tests/AttachmentSection.test.tsx` | TBD |
| UI-04 | UI | AC-07 | Switch Development Requester context | Only tickets owned by new requester are shown | `client/.../lab-02 tests/RequesterContext.test.tsx` | TBD |
| E2E-01 | E2E | AC-01, AC-05 | Complete responsive submission flow | Confirmation shows official number | `e2e/lab-02/requester-ticket-flow.spec.ts` | TBD |
| E2E-02 | E2E | UI Specs | Responsive layout visual test (Playwright screenshot) | Snapshots match expected layout | `e2e/lab-02/visual-regression.spec.ts` | TBD |

## 3. Acceptance-Criterion Traceability

| AC ID | Mapped Test IDs |
|---|---|
| AC-01 | API-01, UI-02, E2E-01 |
| AC-02 | UI-01 |
| AC-03 | API-02 |
| AC-04 | API-03 |
| AC-05 | E2E-01 |
| AC-06 | UI-03 |

## 4. Responsive and Visual Checklist
- [ ] No clipped labels or overlapping messages.
- [ ] Multi-column layout on Desktop (≥ 992px).
- [ ] Fields stack vertically on Mobile (< 768px).
- [ ] Required field asterisks are present and red.
- [ ] Button hierarchy (Primary vs Secondary) is distinct.
- [ ] Success, Error, and Loading states are clearly visible without relying solely on color.

## 5. Test Commands
```bash
# Backend tests
npm run test:api

# Frontend component tests
npm run test:ui

# E2E tests
npm run test:e2e
```

## 6. Final Results
*(To be updated after implementation passes)*

## 7. Known Limitations or Deferred Tests
- Authentication security testing is deferred to Lab 3.
