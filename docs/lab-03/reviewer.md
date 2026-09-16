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


