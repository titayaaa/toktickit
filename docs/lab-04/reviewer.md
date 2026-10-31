# Sprint 4 Peer Review Record: TokTickIT Actions Taken, Dashboards, and Final Regression

เอกสารฉบับนี้จัดทำขึ้นเพื่อบันทึกประวัติการ Peer Review แบบละเอียดครบถ้วนทุกตัวอักษร (Verbatim Records) ตามข้อกำหนดวิชา CS251 Lab 4 ทั้ง 2 ทิศทาง:
- **Part 1:** บันทึกการ Review ของ Partner (@jejaebubu) ตรวจสอบและอนุมัติ PR บน Repository ของนักศึกษา (`titayaaa/toktickit`)
- **Part 2:** บันทึกการ Review ของนักศึกษา (@titayaaa) ตรวจสอบและอนุมัติ PR บน Repository ของ Partner (`jejaebubu/toktickit`)

> **หมายเหตุ:** บันทึกการตรวจทานจะได้รับการอัปเดตตามลำดับการพัฒนาจริงทีละ Pull Request (1 PR : 1 Issue) เพื่อป้องกันข้อมูลล่วงหน้า (No Premature Data)

---

## 1. Master PR Table (titayaaa/toktickit)
- **Repository:** [titayaaa/toktickit](https://github.com/titayaaa/toktickit)
- **Author:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Peer Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`

| PR # | Feature / Issue Title | GitHub Issue | Feature Branch | Target | Reviewer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **[PR #75](https://github.com/titayaaa/toktickit/pull/75)** | Issue 27: Sprint 4 Engineering Contract & Specification | Issue #63 | `feature/27-lab4-specs` | `lab4-staging` | `@jejaebubu` | ⏳ Under Review |
| **PR-02** | Issue 28: Database Migration, Schema Evolution & Seed Data | Issue #64 | `feature/28-db-and-seed` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-03** | Issue 29: Actions Taken Backend REST API & Authorization | Issue #65 | `feature/29-actions-taken-api` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-04** | Issue 30: Actions Taken Frontend Component on Ticket Detail | Issue #66 | `feature/30-actions-taken-ui` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-05** | Issue 31: Ticket Workflow Operations & Resolution Gate | Issue #67 | `feature/31-ticket-workflow` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-06** | Issue 32: IT Staff Dashboard API & UI | Issue #68 | `feature/32-staff-dashboard` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-07** | Issue 33: Requester Dashboard API & UI | Issue #69 | `feature/33-requester-dashboard` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-08** | Issue 34: Final Regression & System Hardening | Issue #70 | `feature/34-final-hardening` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-09** | Issue 35: E2E Testing, Visual Inspection & Responsive Audits | Issue #71 | `feature/35-e2e-and-visual` | `lab4-staging` | `@jejaebubu` | 📋 Planned |
| **PR-10** | Issue 36: Release Integration, Staging-to-Main PR & Report | Issue #72 | `feature/36-release-and-report`| `lab4-staging` | `@jejaebubu` | 📋 Planned |

---

## 2. Peer Review Checklist & Criteria

| Section | Review Item | Verified by Reviewer | Comments / Feedback |
| :--- | :--- | :---: | :--- |
| **1. Spec Completeness** | Numbered FRs (1-15) and BRs (1-16) defined with explicit exclusions | ⏳ Pending | ตรวจสอบความครบถ้วนของข้อกำหนดและการแบ่งขอบเขต |
| **2. Actions Taken Model** | Model schema with integer FKs, status enum, and compound indexes | ⏳ Pending | ตรวจสอบ fields: actionDateTime, result, followUpNote, assigneeId (Int) |
| **3. Resolution Gate Rule** | Backend blocks resolution (409 Conflict) if pending actions exist | ⏳ Pending | ตรวจสอบ BR-09 resolution gate enforcement |
| **4. Operational Dashboards**| Metrics calculation for IT Staff and Requester dashboards | ⏳ Pending | ตรวจสอบการคำนวณ query และ drill-down navigation |
| **5. RBAC & Security** | Requester read-only mode, inactive assignee rejection (422) | ⏳ Pending | ตรวจสอบ 403 Forbidden, 404 Data isolation, และ 422 Unprocessable |
| **6. Test Traceability** | Unit, API, UI, and E2E tests mapped 1-to-1 to Acceptance Criteria | ⏳ Pending | ตรวจสอบตาราง traceability matrix ใน tests.md (Planned) |
| **7. Zen Green Polish** | Design tokens, responsive behavior, accessibility guidelines | ⏳ Pending | ตรวจสอบความสอดคล้องกับธีม Zen Green และ WCAG AA |

---

# Part 1: Records of Partner (@jejaebubu) Reviewing Student (@titayaaa)

### PR #75: Issue 27: Sprint 4 Engineering Contract & Specification (docs/lab-04)
- **Reviewer:** `@jejaebubu`
- **Initial Review:** Changes Requested
- **Feedback Summary:**
  1. Fix FK types to `Int` matching `Ticket.id` and `User.id`.
  2. Use real model field names (`summary`, `itPriority`, `ownerId`).
  3. Complete 8-status transition matrix with authorized roles.
  4. Specify concurrency 409 detection via `expectedUpdatedAt`.
  5. Standardize Resolution Gate error code to 409 Conflict.
  6. Optional `result` when Action Taken is PENDING/IN_PROGRESS.
  7. Add missing sections: UI Summary, Assumptions/Decisions, Migration/Backfill/Rollback, Seed data, Idempotency.
  8. Update `tests.md` to `Planned` and add missing test categories.
  9. Clarify reviewer and AI use records as work-in-progress.
  10. Refine accessibility badge text contrast tokens.
- **Author Response:** Addressed all items in commit updating `docs/lab-04/`.
- **Status:** Pending re-review.

---

# Part 2: Records of Student (@titayaaa) Reviewing Partner (@jejaebubu)

### PR #104: docs(lab04): Sprint 4 engineering contract (Issue #1)
- **Reviewer:** `@titayaaa`
- **Status:** ✅ Approved (Verified commit `3310ba9` addressing Action Taken assignee, status enum, resolution gate, and traceability matrix).
