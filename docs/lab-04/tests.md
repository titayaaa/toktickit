# Sprint 4 Test Plan & Traceability Matrix: TokTickIT Actions Taken, Dashboards, and Final Regression

## 1. Test Strategy and Objectives
Sprint 4 testing ensures that the TokTickIT service desk maintains rigorous software quality across the full-stack architecture:
- **Actions Taken Lifecycle:** Validate creation, updating, assignment, follow-up constraints, and role permissions.
- **Workflow & Resolution Gate:** Guarantee that business rule BR-08 (cannot resolve ticket with pending or in-progress actions) is enforced strictly on backend and communicated clearly on frontend.
- **Role-Appropriate Dashboards:** Verify calculation accuracy, empty states, and interactive drill-downs for both IT Staff and Requester dashboards.
- **Full Regression:** Validate that all prior functionalities from Labs 1 through 3 (Authentication, Mandatory Password Change, Create Ticket, Attachments, Public Comments, Internal Notes, Admin User Management) remain 100% operational with zero regressions.
- **End-to-End & Responsive Audits:** Execute Playwright E2E suites verifying multi-user flows across Desktop, Tablet, and Mobile viewports.

---

## 2. Test Traceability Matrix

| Test ID | Type | Requirement / AC | What It Tests | Expected Result | Automated Test File | Final Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **UNIT-01** | Unit | BR-05, AC-02 | Assignee validation utility rejects inactive users or Requesters | Throws validation error or returns false | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **UNIT-02** | Unit | BR-07, AC-03 | Follow-up note validation requires non-empty note when follow-up is true | Returns validation failure if note is empty | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-01** | API | FR-01, AC-01 | Create Action Taken by IT Staff with valid data | 201 Created with authenticated creator as `performedBy` | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-02** | API | FR-07, AC-05 | Requester attempts to create Action Taken | 403 Forbidden | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-03** | API | FR-06, AC-04 | Requester retrieves Actions Taken for owned ticket | 200 OK with list of actions | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-04** | API | FR-06, AC-04 | Requester attempts to retrieve Actions Taken for unowned ticket | 403 Forbidden | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-05** | API | FR-05, AC-01 | IT Staff updates Action Taken status to `COMPLETED` | 200 OK with updated record | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-06** | API | BR-05, AC-02 | Attempt to assign Action Taken to inactive user | 422 Unprocessable Entity | `server/tests/lab-04/actions-taken.api.test.ts` | Pass |
| **API-07** | API | BR-08, AC-06 | Attempt to resolve Ticket when `PENDING` Action Taken exists | 409 Conflict with clear resolution error | `server/tests/lab-04/ticket-workflow.api.test.ts` | Pass |
| **API-08** | API | BR-08, AC-06 | Attempt to resolve Ticket when `IN_PROGRESS` Action Taken exists | 409 Conflict with clear resolution error | `server/tests/lab-04/ticket-workflow.api.test.ts` | Pass |
| **API-09** | API | BR-08, AC-07 | Resolve Ticket when all Actions Taken are `COMPLETED` or `CANCELLED` | 200 OK and ticket status becomes `RESOLVED` | `server/tests/lab-04/ticket-workflow.api.test.ts` | Pass |
| **API-10** | API | BR-08, BR-14, AC-07 | Resolve Ticket when zero Actions Taken exist | 200 OK and ticket status becomes `RESOLVED` | `server/tests/lab-04/ticket-workflow.api.test.ts` | Pass |
| **API-11** | API | FR-11, BR-11, AC-08 | IT Staff Dashboard metrics retrieval | 200 OK with accurate operational counts | `server/tests/lab-04/staff-dashboard.api.test.ts` | Pass |
| **API-12** | API | FR-12, BR-12, AC-09 | Requester Dashboard metrics retrieval | 200 OK with authenticated user's ticket counts | `server/tests/lab-04/requester-dashboard.api.test.ts` | Pass |
| **API-13** | API | FR-11, AC-08 | Requester attempts to access IT Staff Dashboard endpoint | 403 Forbidden | `server/tests/lab-04/staff-dashboard.api.test.ts` | Pass |
| **UI-01** | Component | FR-01, FR-06, AC-04 | Actions Taken list renders on Ticket Detail in Zen Green style | Displays list of actions or empty state | `client/src/test/lab-04/ActionsTaken.test.tsx` | Pass |
| **UI-02** | Component | FR-01, FR-03, AC-01 | Create Action Taken modal form open and submit | Calls API and refreshes action list | `client/src/test/lab-04/ActionsTaken.test.tsx` | Pass |
| **UI-03** | Component | FR-07, AC-04 | Requester role hides Action Taken create/edit buttons | Action items are read-only | `client/src/test/lab-04/ActionsTaken.test.tsx` | Pass |
| **UI-04** | Component | BR-08, AC-06 | Resolution warning banner displayed if pending actions exist | "Resolve" option disabled or prompts warning | `client/src/test/lab-04/TicketWorkflow.test.tsx` | Pass |
| **UI-05** | Component | FR-11, AC-08, AC-10 | IT Staff Dashboard renders metric cards and urgent tickets | Interactive drill-down filters work | `client/src/test/lab-04/StaffDashboard.test.tsx` | Pass |
| **UI-06** | Component | FR-12, AC-09, AC-10 | Requester Dashboard renders cards and attention list | Interactive navigation to Ticket Detail | `client/src/test/lab-04/RequesterDashboard.test.tsx` | Pass |
| **E2E-01** | E2E | FR-01, FR-04, AC-01 | IT Staff creates and updates Action Taken through full UI | Action appears on timeline with correct badge | `e2e/lab-04/actions-taken-flow.spec.ts` | Pass |
| **E2E-02** | E2E | BR-08, AC-06, AC-07 | End-to-end resolution gate enforcement workflow | Blocks resolution until action completed | `e2e/lab-04/ticket-resolution.spec.ts` | Pass |
| **E2E-03** | E2E | FR-11, FR-12, AC-08, AC-09 | IT Staff & Requester dashboard navigation and drill-down | User clicks metric card and views filtered list | `e2e/lab-04/dashboards.spec.ts` | Pass |
| **REG-01** | Regression | FR-14, AC-12 | Lab 1 & 2 Auth, Ticket Creation, Attachments regression | All previous test suites pass without regression | `server/tests/lab-02/*.test.ts` | Pass |
| **REG-02** | Regression | FR-14, AC-12 | Lab 3 Queue, Notes, Comments, Admin user management | All Lab 3 test suites pass without regression | `server/tests/lab-03/*.test.ts` | Pass |
| **RESP-01** | Responsive | AC-11 | Visual audit of Dashboards on Mobile (375x667) | No clipping, cards stack neatly | `e2e/lab-04/dashboards.spec.ts` | Pass |
| **RESP-02** | Responsive | AC-11 | Visual audit of Actions Taken on Mobile & Tablet | Table transforms to responsive card view | `e2e/lab-04/actions-taken-flow.spec.ts` | Pass |

---

## 3. Test Execution Summary

```bash
# Backend Vitest Test Suite
npm --prefix server test -- tests/lab-04/

# Frontend Vitest Test Suite
npm --prefix client test -- src/test/lab-04/

# Comprehensive Full Regression Suite
npm --prefix server test
npm --prefix client test

# End-to-End Playwright Suite
npx playwright test e2e/lab-04/
```
