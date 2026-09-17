# Sprint 3 Peer Review Record: TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

## 1. Review Information
- **Repository:** `titayaaa/toktickit`
- **Feature Branch:** `feature/17-spec-and-tests`
- **Target Branch:** `lab3-staging`
- **Author:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Peer Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)
- **Pull Request:** [PR #52](https://github.com/titayaaa/toktickit/pull/52)

---

## 2. Peer Review Checklist & Criteria

| Section | Review Item | Verified by Reviewer | Comments / Feedback |
| :--- | :--- | :---: | :--- |
| **1. Spec Completeness** | Numbered FRs (1-26) and BRs (1-19) defined with explicit exclusions | ✅ Verified | Defined clearly, prevents Scope Creep |
| **2. Security & RBAC** | Explicit authorization rules for 3 distinct roles, Internal Note isolation | ✅ Verified | Separated Internal Notes with amber styling; isolated from Requester GET responses |
| **3. Workflow Consistency** | State transition matrix, ticket claim behavior, mandatory resolution summary | ✅ Verified | Transition matrix complete; resolutionSummary required for RESOLVED |
| **4. Schema & Migration** | User, PublicComment, InternalNote models, Prisma indexes, backward compatibility | ✅ Verified | Schema evolved with indexes and backward compatibility preserved |
| **5. API Contract** | Endpoints defined with query params, payload schemas, and HTTP status codes | ✅ Verified | Comprehensive REST endpoints with safe error responses |
| **6. Test Traceability** | Unit, integration, and E2E test cases mapped 1-to-1 to Acceptance Criteria | ✅ Verified | 35 planned test cases covering all 12 Acceptance Criteria |
| **7. Zen Green Design** | Design tokens, amber Internal Notes styling, responsive requirements | ✅ Verified | Consistent with Lab 2 Zen Green tokens and responsive viewports |

---

## 3. Review Discussion, Feedback & Resolution History

### Peer Review Comments (@chanya06)
> **Peer Review: Approved (PR #52)**
> ตรวจทานเอกสาร Sprint 3 Engineering Contract & Specifications ใน `docs/lab-03/` เรียบร้อย เอกสารทำออกมาได้ละเอียด ครบถ้วน และครอบคลุมตามข้อกำหนดใน Lab 3
> 
> **ข้อเสนอแนะเล็กน้อยก่อน Merge:**
> 1. เพิ่มหัวข้อ Assumptions and Decisions ใน `specification.md` (เช่น bcrypt, session cookie, default itPriority)
> 2. Clarification เรื่อง Reopen Ticket และการคงอยู่ของ resolutionSummary
> 3. อัปเดต PR Link ใน `reviewer.md` เป็น PR #52

### Author Responses & Revisions (@titayaaa)
- อัปเดตเพิ่ม Section 10 Assumptions and Decisions ใน `specification.md` ครบถ้วนตามคำแนะนำ
- ชี้แจงพฤติกรรม Reopened ticket ว่าจะคงค่า resolutionSummary เดิมไว้จนกว่าจะมีการ resolve ใหม่อีกครั้ง
- อัปเดต PR Link เป็น PR #52 และบันทึกผลการตรวจสอบในตาราง Checklist เรียบร้อย

### Final Approval
- **Status:** ✅ Approved by @chanya06
- **Approval Date:** 2026-09-17
- **Merged by:** @chanya06

---

## 4. PR #53 Review Record: Issue 18 Database Migration, Schema Evolution & Seed Data
- **Feature Branch:** `feature/18-db-and-seed`
- **Pull Request:** [PR #53](https://github.com/titayaaa/toktickit/pull/53)
- **Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)

### Peer Review Comments (@chanya06)
> 1. Backfill userId และ itPriority สำหรับตั๋วเดิม
> 2. Seed ข้อมูล Ticket, Public Comments และ Internal Notes ตัวอย่าง
> 3. Commit Prisma Migration File ลง server/prisma/migrations/

### Author Responses & Revisions (@titayaaa)
- เพิ่ม logic backfill userId และ itPriority ใน `seed.ts`
- เพิ่ม realistic tickets, public comments, และ internal notes ตัวอย่างใน `seed.ts`
- สร้างและ commit ไฟล์ migration SQL ลงใน `server/prisma/migrations/20260917000000_lab3_users_and_workflow/migration.sql`
- เพิ่ม automated verification tests ใน `db-seed.test.ts` (6 tests passed 100%)
- **Status:** ✅ Approved and Merged by @chanya06

---

## 5. PR Review Record: Issue 19 Authentication & Authorization Backend API
- **Feature Branch:** `feature/19-auth-api`
- **Pull Request:** [PR #54](https://github.com/titayaaa/toktickit/pull/54)
- **Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)

### Scope Delivered:
- Server-side authentication endpoints (`/api/auth/login`, `/logout`, `/me`, `/change-password`).
- Password complexity verification (min 8 chars, uppercase, lowercase, numeric digit).
- Authentication and Role-based middleware with HTTP-only cookie and Bearer token support.
- Mandatory first-login password rotation enforcement (`mustChangePassword` guard returns 403 on operational routes).
- 12 automated test cases passing across `auth.api.test.ts` and `authorization.api.test.ts`.

### Peer Review Comments (@chanya06)
> **Peer Review: Approved (PR #54)**
> ตรวจทานโค้ดและชุดการทดสอบของ Issue 19 (Authentication & Authorization Backend API) เรียบร้อยแล้ว
> - จุดเด่น: Account Enumeration Defense (401 ปลอดภัย), Password Complexity & Hashing (bcrypt 10 rounds), Flexible Middleware (รองรับทั้ง Cookie และ Bearer Token), Test Coverage 12 tests ผ่าน 100%
> - ข้อเสนอแนะ: อัปเดตลิงก์ PR ใน `reviewer.md` เป็น [PR #54](https://github.com/titayaaa/toktickit/pull/54)

### Author Responses & Revisions (@titayaaa)
- อัปเดตลิงก์ PR ใน `docs/lab-03/reviewer.md` เป็น PR #54 เรียบร้อยแล้ว

### Final Approval
- **Status:** ✅ Approved by @chanya06
- **Approval Date:** 2026-09-17
- **Merged by:** @chanya06

---

## 6. PR Review Record: Issue 20 Login & Mandatory Password Change UI
- **Feature Branch:** `feature/20-login-ui`
- **Pull Request:** [PR #55](https://github.com/titayaaa/toktickit/pull/55)
- **Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)

### Peer Review Comments (@chanya06)
> **Peer Review: Approved (PR #55)**
> ตรวจทานโค้ดและทดสอบ UI ของ Issue 20 (Login & Mandatory Password Change UI) เรียบร้อยแล้ว
> - จุดเด่น: สไตล์ Zen Green สอดคล้องตาม Tokens, Checklist ตรวจสอบความซับซ้อนของรหัสผ่านแบบเรียลไทม์ 4 ข้อ, Authentication Gate ดักจับหน้าจอ Login / Change Password / Main App ตาม Session ได้อย่างรัดกุม, มี Unit Test 7 เคสและไม่เกิด Regression ต่อ UI เดิมของ Lab 1 & 2
> - บันทึกผลการตรวจทานเรียบร้อย โค้ดผ่านการตรวจโดยไม่มีข้อทักท้วงเพิ่มเติม

### Final Approval
- **Status:** ✅ Approved by @chanya06
- **Approval Date:** 2026-09-17
- **Merged by:** @chanya06

---

## 7. PR Review Record: Issue 21 IT Staff Ticket Queue API & Query System
- **Feature Branch:** `feature/21-staff-queue-api`
- **Pull Request:** [PR #56](https://github.com/titayaaa/toktickit/pull/56)
- **Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)

### Peer Review Comments (@chanya06)
> **Peer Review: Approved (PR #56)**
> ตรวจทานโค้ดและชุดทดสอบของ Issue 21 (IT Staff Ticket Queue API & Query System) เรียบร้อยแล้ว
> 1. **Query Capabilities:** รองรับการค้นหา (Search case-insensitive), กรองข้อมูลครอบคลุมทั้ง Category, Status (ทุก Enum), Priority, IT Priority, และ Owner Assignment (`unassigned`, `me`, numeric ID)
> 2. **Weighted Priority Sorting:** ออกแบบการจัดเรียงตามระดับความสำคัญจริง (`URGENT > CRITICAL > HIGH > MEDIUM > LOW`) แทนการเรียงตามตัวอักษร
> 3. **Backward Compatibility:** จัดการ Fallback ข้อมูล Requester ของตั๋วเดิมได้อย่างไร้รอยต่อ พร้อมแนบตัวนับ Comments, Notes, และ Attachments
> 4. **Security & Validation:** มี Guard ตรวจสอบ Role และ Password Rotation อย่างรัดกุม พร้อมส่ง 400 Bad Request เมื่อ Query Parameters ไม่ถูกต้อง
> 5. **Test Coverage:** ชุด Integration Tests 9 เคสใน `staff-queue.api.test.ts` ครอบคลุมทุก Scenario สำคัญ

### Final Approval
- **Status:** ✅ Approved by @chanya06
- **Approval Date:** 2026-09-17
- **Merged by:** @chanya06

---

## 8. PR Review Record: Issue 22 IT Staff Ticket Queue UI & Dashboard
- **Feature Branch:** `feature/22-staff-queue-ui`
- **Pull Request:** [PR Placeholder](#)
- **Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)

### Scope Delivered:
- Responsive Zen Green `StaffTicketQueue.tsx` component supporting High-Density table view on desktop/tablet and touch-friendly card stack layout on mobile (`<768px`).
- Live search bar for Ticket Number and Summary, and multi-field filter bar (Status, Category, IT Priority, and Assignment segmented toggle: All / Unassigned / Assigned to Me).
- Active filter badge chips with one-click "Clear All Filters" and friendly empty state illustration with reset action.
- Interactive column sorting (`ticketNumber`, `createdAt`, `itPriority`, `status`) with ascending/descending visual indicators.
- Pagination footer with configurable page size (10, 25, 50), record range indicator ("Showing 1-10 of 45 tickets"), and page navigation buttons.
- Role-aware navigation in `App.tsx` conditionally exposing the "Ticket Queue" tab only to IT Staff and Administrator roles.
- 7 automated component unit tests in `StaffTicketQueue.test.tsx` verifying render, search, filters, sorting, empty states, pagination, and detail navigation. All 41 client unit tests passing 100%.






