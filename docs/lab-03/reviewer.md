# Sprint 3 Peer Review Record: TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

เอกสารฉบับนี้บันทึกประวัติการ Peer Review แบบละเอียดครบถ้วนทุกตัวอักษร (Verbatim Records) ตามข้อกำหนดวิชา CS251 Lab 3 ทั้ง 2 ทิศทาง:
- **Part 1:** บันทึกการ Review ของ Partner (@chanya06) ตรวจสอบและอนุมัติ PR บน Repository ของนักศึกษา (`titayaaa/toktickit`)
- **Part 2:** บันทึกการ Review ของนักศึกษา (@titayaaa) ตรวจสอบและอนุมัติ PR บน Repository ของ Partner (`lmaybelgracel/TokTickit`)

---

## 1. Master PR Table (titayaaa/toktickit)
- **Repository:** [titayaaa/toktickit](https://github.com/titayaaa/toktickit)
- **Author:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Peer Reviewer:** ชัญญา พูลเขตกิจ (GitHub: `@chanya06` / Student ID: 67070501058)
- **Target Branch:** `lab3-staging`

| PR # | Feature / Issue Title | GitHub Issue | Feature Branch | Target | Reviewer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **[PR #52](https://github.com/titayaaa/toktickit/pull/52)** | Issue 17: Sprint 3 Engineering Contract & Specification | Issue #42 | `feature/17-spec-and-tests` | `lab3-staging` | `@chanya06` | ✅ Merged (`d25fb74`) |
| **[PR #53](https://github.com/titayaaa/toktickit/pull/53)** | Issue 18: Database Migration, Schema Evolution & Seed Data | Issue #43 | `feature/18-db-and-seed` | `lab3-staging` | `@chanya06` | ✅ Merged (`a26fc8d`) |
| **[PR #54](https://github.com/titayaaa/toktickit/pull/54)** | Issue 19: Authentication & Authorization Backend API | Issue #44 | `feature/19-auth-api` | `lab3-staging` | `@chanya06` | ✅ Merged (`969f606`) |
| **[PR #55](https://github.com/titayaaa/toktickit/pull/55)** | Issue 20: Login & Mandatory Password Change UI | Issue #45 | `feature/20-login-ui` | `lab3-staging` | `@chanya06` | ✅ Merged (`1e64f30`) |
| **[PR #56](https://github.com/titayaaa/toktickit/pull/56)** | Issue 21: IT Staff Ticket Queue API & Query System | Issue #46 | `feature/21-staff-queue-api` | `lab3-staging` | `@chanya06` | ✅ Merged (`155519d`) |
| **[PR #57](https://github.com/titayaaa/toktickit/pull/57)** | Issue 22: IT Staff Ticket Queue UI & Dashboard | Issue #47 | `feature/22-staff-queue-ui` | `lab3-staging` | `@chanya06` | ✅ Merged (`fe67949`) |
| **[PR #58](https://github.com/titayaaa/toktickit/pull/58)** | Issue 23: Ticket Operations, Ownership & Notes API | Issue #48 | `feature/23-ticket-ops-api` | `lab3-staging` | `@chanya06` | ✅ Merged (`087c25b`) |
| **[PR #59](https://github.com/titayaaa/toktickit/pull/59)** | Issue 24: IT Staff Ticket Operations & Confidential Notes UI | Issue #49 | `feature/24-ticket-ops-ui` | `lab3-staging` | `@chanya06` | ✅ Merged (`9b6abaa`) |
| **[PR #60](https://github.com/titayaaa/toktickit/pull/60)** | Issue 25: Administrator User Management API & UI | Issue #50 | `feature/25-admin-user-management` | `lab3-staging` | `@chanya06` | ✅ Merged (`d6e071c`) |
| **[PR #61](https://github.com/titayaaa/toktickit/pull/61)** | Issue 26: E2E Testing, Visual Inspection & Final Release | Issue #51 | `feature/26-e2e-and-release` | `lab3-staging` | `@chanya06` | ✅ Merged (`8a5bd28`) |

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

# Part 1: Records of Partner (@chanya06) Reviewing Student (@titayaaa)

เอกสารในส่วนนี้บันทึกข้อความทุกตัวอักษรของการ Review, คำขอแก้ไข (Changes Requested), การตอบกลับชี้แจง (Author Response), และการอนุมัติ (Approval) สำหรับทุก Pull Request บนคลัง `titayaaa/toktickit`

---

## 3.1 PR #52: Issue 17: Sprint 3 Engineering Contract & Specification
- **Pull Request Link:** [titayaaa/toktickit#52](https://github.com/titayaaa/toktickit/pull/52)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `d25fb74`)
- **Approval Date:** 2026-09-16

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-16)

## 🟢 Peer Review: Approved (PR #52)

ตรวจทานเอกสาร Sprint 3 Engineering Contract & Specifications ใน `docs/lab-03/` เรียบร้อย เอกสารทำออกมาได้ละเอียด ครบถ้วน และครอบคลุมตามข้อกำหนดใน Lab 3

### 🌟 จุดเด่นที่ทำได้ดีมาก (Key Strengths)
1. **Specification & Scope (`specification.md`)**: กำหนด FR-01..26, BR-01..19 และระบุ Explicit Exclusions ไว้ชัดเจน ช่วยป้องกัน Scope Creep ได้ดี
2. **RBAC & Data Protection (`api-spec.md`)**: ออกแบบระบบจัดการสิทธิ์รัดกุม โดยเฉพาะการแยก **Internal Notes (Amber `#FFF8E1` 🔒)** ออกจาก **Public Comments** และระบุชัดเจนว่า `GET /api/tickets/:id` ของ Requester จะไม่ส่ง `internalNotes` ออกไปเด็ดขาด
3. **Admin Safety Guards**: มีกฎ BR-18 และ BR-19 ป้องกัน Admin ปิดใช้งานบัญชีตนเอง (Self-deactivation) และป้องกันการปลด Admin คนสุดท้ายของระบบ (`422 Unprocessable Entity`)
4. **Test Traceability (`tests.md`)**: วางแผนเคสทดสอบ 35 เคส ครอบคลุม Unit, API Integration และ Playwright E2E โดยเชื่อมโยง 1-to-1 กับ Acceptance Criteria (AC-01..12) ชัดเจน
5. **AI Use & Reflection (`ai-use.md`)**: บันทึก Prompt และการสะท้อนคิดเกี่ยวกับ Spec-Driven Development ได้ตรงตามเกณฑ์

---

### 💡 ข้อเสนอแนะเล็กน้อยก่อน Merge (Minor Suggestions)
1. **เพิ่มหัวข้อ `Assumptions and Decisions`**: เพื่อให้ตรงตามตารางข้อกำหนดใน Handout (หน้า 13) เสนอให้เพิ่มหัวข้อ `10. Assumptions and Decisions` ใน `specification.md` (เช่น เรื่องการเลือกใช้ bcrypt, การเก็บ Session ด้วย HTTP-only cookie, และการ default ค่า `itPriority = requestedPriority`)
2. **Clarification เรื่อง Reopen Ticket**: หากตั๋วถูกเปิดใหม่อีกครั้ง (`RESOLVED` -> `REOPENED` -> `IN_PROGRESS`) อาจระบุเพิ่มเติมใน Spec ว่า `resolutionSummary` จะถูกคงไว้เป็นประวัติ หรือถูกเคลียร์ค่าเป็น `null` จนกว่าจะ Resolve อีกครั้ง
3. **อัปเดต PR Link ใน `reviewer.md`**: บรรทัดที่ 9 สามารถอัปเดตจาก `[PR # (Pending Open)]` เป็น `[PR #52](https://github.com/titayaaa/toktickit/pull/52)`

#### 💬 Comment / Response by @titayaaa (2026-09-16)

> ## 🟢 Peer Review: Approved (PR #52)
> ตรวจทานเอกสาร Sprint 3 Engineering Contract & Specifications ใน `docs/lab-03/` เรียบร้อย เอกสารทำออกมาได้ละเอียด ครบถ้วน และครอบคลุมตามข้อกำหนดใน Lab 3
> 
> ### 🌟 จุดเด่นที่ทำได้ดีมาก (Key Strengths)
> 1. **Specification & Scope (`specification.md`)**: กำหนด FR-01..26, BR-01..19 และระบุ Explicit Exclusions ไว้ชัดเจน ช่วยป้องกัน Scope Creep ได้ดี
> 2. **RBAC & Data Protection (`api-spec.md`)**: ออกแบบระบบจัดการสิทธิ์รัดกุม โดยเฉพาะการแยก **Internal Notes (Amber `#FFF8E1` 🔒)** ออกจาก **Public Comments** และระบุชัดเจนว่า `GET /api/tickets/:id` ของ Requester จะไม่ส่ง `internalNotes` ออกไปเด็ดขาด
> 3. **Admin Safety Guards**: มีกฎ BR-18 และ BR-19 ป้องกัน Admin ปิดใช้งานบัญชีตนเอง (Self-deactivation) และป้องกันการปลด Admin คนสุดท้ายของระบบ (`422 Unprocessable Entity`)
> 4. **Test Traceability (`tests.md`)**: วางแผนเคสทดสอบ 35 เคส ครอบคลุม Unit, API Integration และ Playwright E2E โดยเชื่อมโยง 1-to-1 กับ Acceptance Criteria (AC-01..12) ชัดเจน
> 5. **AI Use & Reflection (`ai-use.md`)**: บันทึก Prompt และการสะท้อนคิดเกี่ยวกับ Spec-Driven Development ได้ตรงตามเกณฑ์
> 
> ### 💡 ข้อเสนอแนะเล็กน้อยก่อน Merge (Minor Suggestions)
> 1. **เพิ่มหัวข้อ `Assumptions and Decisions`**: เพื่อให้ตรงตามตารางข้อกำหนดใน Handout (หน้า 13) เสนอให้เพิ่มหัวข้อ `10. Assumptions and Decisions` ใน `specification.md` (เช่น เรื่องการเลือกใช้ bcrypt, การเก็บ Session ด้วย HTTP-only cookie, และการ default ค่า `itPriority = requestedPriority`)
> 2. **Clarification เรื่อง Reopen Ticket**: หากตั๋วถูกเปิดใหม่อีกครั้ง (`RESOLVED` -> `REOPENED` -> `IN_PROGRESS`) อาจระบุเพิ่มเติมใน Spec ว่า `resolutionSummary` จะถูกคงไว้เป็นประวัติ หรือถูกเคลียร์ค่าเป็น `null` จนกว่าจะ Resolve อีกครั้ง
> 3. **อัปเดต PR Link ใน `reviewer.md`**: บรรทัดที่ 9 สามารถอัปเดตจาก `[PR # (Pending Open)]` เป็น `[PR #52](https://github.com/titayaaa/toktickit/pull/52)`

ขอบคุณสำหรับคำแนะนำน้า เราได้อัปเดตเพิ่ม Section 10 Assumptions and Decisions, ชี้แจงเรื่อง Reopen ticket และอัปเดต PR #52 ลงใน reviewer.md ให้เรียบร้อยแล้ว


---

## 3.2 PR #53: Issue 18: Database Migration, Schema Evolution & Seed Data
- **Pull Request Link:** [titayaaa/toktickit#53](https://github.com/titayaaa/toktickit/pull/53)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `a26fc8d`)
- **Approval Date:** 2026-09-16

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @chanya06 (2026-09-16)

## 🔍 Peer Review: Feedback & Recommendations (PR #53)

โครงสร้าง Prisma Schema และการเตรียม User Seed Data สำหรับ Lab 3 ทำออกมาได้ดีมาก มีการรักษา Backward Compatibility ของ Enum และ Model เดิมของ Lab 2 ไว้อย่างรอบคอบ

มีข้อเสนอแนะ 3 ประเด็นสำคัญที่แนะนำให้ปรับปรุงเพิ่มเติมก่อน Merge:

1. **Backfill `userId` และ `itPriority` สำหรับตั๋วเดิม**: 
   ใน `seed.ts` แนะนำให้เพิ่มการอัปเดตตั๋วเดิมจาก Lab 2 โดยผูก `ticket.userId` เข้ากับ `user.id` ตามอีเมลของ Requester และตั้งค่าเริ่มต้นให้ `itPriority = requestedPriority` ตามกฎ BR-07 เพื่อป้องกันไม่ให้ `ticket.requester` เป็น `null`
2. **Seed ข้อมูล Ticket, Public Comments และ Internal Notes**: 
   ตาม Handout Section 5.3 กำหนดให้มีตัวอย่าง Realistic Tickets, Public Comments และ Internal Notes ใน Seed Data ด้วย แนะนำให้เพิ่มข้อมูลตัวอย่างเหล่านี้ใน `seed.ts`
3. **Commit Prisma Migration File**: 
   อย่าลืมรัน `npx prisma migrate dev --name lab3_users_and_workflow` เพื่อสร้างและ Commit ไฟล์ Migration ลงใน `server/prisma/migrations/` ให้ครบถ้วน

#### ✅ Approved by @chanya06 (2026-09-16)

## 🟢 Peer Review: Approved (PR #53)

ตรวจทานการแก้ไขและเพิ่มเติมใน PR #53 เรียบร้อยแล้ว:

1. **Backfill Complete**: เพิ่มการเชื่อมโยง `userId` ให้ตั๋วเดิมจาก Lab 2 และตั้งค่า `itPriority = requestedPriority` ตามกฎ BR-07 เรียบร้อย
2. **Realistic Seed Data**: เพิ่มตัวอย่างตั๋วสถานะ `IN_PROGRESS` และ `RESOLVED` พร้อมตัวอย่าง Public Comments และ Internal Notes ครบตามเกณฑ์ Handout Section 5.3
3. **Prisma Migration**: เพิ่มไฟล์ SQL migration ใน `server/prisma/migrations/20260917000000_lab3_users_and_workflow/` เรียบร้อย เป็น Idempotent ปลอดภัย
4. **Test Coverage**: เพิ่มการตรวจสอบความถูกต้องของการ Backfill และ Relation ของ Comments/Notes ใน `db-seed.test.ts` อย่างรัดกุม

#### 💬 Comment / Response by @titayaaa (2026-09-16)

> ## 🔍 Peer Review: Feedback & Recommendations (PR #53)
> โครงสร้าง Prisma Schema และการเตรียม User Seed Data สำหรับ Lab 3 ทำออกมาได้ดีมาก มีการรักษา Backward Compatibility ของ Enum และ Model เดิมของ Lab 2 ไว้อย่างรอบคอบ
> 
> มีข้อเสนอแนะ 3 ประเด็นสำคัญที่แนะนำให้ปรับปรุงเพิ่มเติมก่อน Merge:
> 
> 1. **Backfill `userId` และ `itPriority` สำหรับตั๋วเดิม**:
>    ใน `seed.ts` แนะนำให้เพิ่มการอัปเดตตั๋วเดิมจาก Lab 2 โดยผูก `ticket.userId` เข้ากับ `user.id` ตามอีเมลของ Requester และตั้งค่าเริ่มต้นให้ `itPriority = requestedPriority` ตามกฎ BR-07 เพื่อป้องกันไม่ให้ `ticket.requester` เป็น `null`
> 2. **Seed ข้อมูล Ticket, Public Comments และ Internal Notes**:
>    ตาม Handout Section 5.3 กำหนดให้มีตัวอย่าง Realistic Tickets, Public Comments และ Internal Notes ใน Seed Data ด้วย แนะนำให้เพิ่มข้อมูลตัวอย่างเหล่านี้ใน `seed.ts`
> 3. **Commit Prisma Migration File**:
>    อย่าลืมรัน `npx prisma migrate dev --name lab3_users_and_workflow` เพื่อสร้างและ Commit ไฟล์ Migration ลงใน `server/prisma/migrations/` ให้ครบถ้วน

เราได้เพิ่ม Backfill userId & itPriority, เพิ่มข้อมูลตัวอย่าง Ticket/Public Comments/Internal Notes, และ commit ไฟล์ Prisma Migration ลง server/prisma/migrations/ ให้เรียบร้อยแล้ว รบกวนตรวจอีกครั้งให้หน่อยน้า


---

## 3.3 PR #54: Issue 19: Authentication & Authorization Backend API
- **Pull Request Link:** [titayaaa/toktickit#54](https://github.com/titayaaa/toktickit/pull/54)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `969f606`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-17)

## 🟢 Peer Review: Approved (PR #54)

ตรวจทานโค้ดและชุดทดสอบของ Issue 19 (Authentication & Authorization Backend API) เรียบร้อยแล้ว

### 🌟 จุดเด่นที่ทำได้ดี:
1. **Security Design**: ป้องกัน Account Enumeration โดยคืนค่า 401 ข้อความเดียวกันสำหรับบัญชีที่ไม่มีอยู่หรือถูกปิดการใช้งาน (`isActive = false`)
2. **Password Complexity & Hashing**: ใช้ `bcrypt` 10 rounds และ Regex ตรวจสอบความซับซ้อนตามกฎ BR-04 ครบถ้วน พร้อมเช็คห้ามตั้งรหัสผ่านซ้ำเดิม
3. **Flexible Middleware**: รองรับทั้ง HTTP-only Cookie และ Bearer Token Header พร้อมมี Guard บล็อกผู้ใช้ที่ต้องเปลี่ยนรหัสผ่าน (`mustChangePassword = true`) ตามกฎ BR-02
4. **Comprehensive Tests**: มี Test Coverage ทั้งกรณี Login, Logout, Change Password, Inactive Users, และ Role-based Access Control ทั้ง 3 บทบาท (12 tests)

### 💡 ข้อเสนอแนะเล็กน้อย:
- อัปเดตลิงก์ PR ใน `docs/lab-03/reviewer.md` จาก Placeholder เป็น `[PR #54](https://github.com/titayaaa/toktickit/pull/54)`

#### 💬 Comment / Response by @titayaaa (2026-09-17)

> ## 🟢 Peer Review: Approved (PR #54)
> ตรวจทานโค้ดและชุดทดสอบของ Issue 19 (Authentication & Authorization Backend API) เรียบร้อยแล้ว
> 
> ### 🌟 จุดเด่นที่ทำได้ดี:
> 1. **Security Design**: ป้องกัน Account Enumeration โดยคืนค่า 401 ข้อความเดียวกันสำหรับบัญชีที่ไม่มีอยู่หรือถูกปิดการใช้งาน (`isActive = false`)
> 2. **Password Complexity & Hashing**: ใช้ `bcrypt` 10 rounds และ Regex ตรวจสอบความซับซ้อนตามกฎ BR-04 ครบถ้วน พร้อมเช็คห้ามตั้งรหัสผ่านซ้ำเดิม
> 3. **Flexible Middleware**: รองรับทั้ง HTTP-only Cookie และ Bearer Token Header พร้อมมี Guard บล็อกผู้ใช้ที่ต้องเปลี่ยนรหัสผ่าน (`mustChangePassword = true`) ตามกฎ BR-02
> 4. **Comprehensive Tests**: มี Test Coverage ทั้งกรณี Login, Logout, Change Password, Inactive Users, และ Role-based Access Control ทั้ง 3 บทบาท (12 tests)
> 
> ### 💡 ข้อเสนอแนะเล็กน้อย:
> * อัปเดตลิงก์ PR ใน `docs/lab-03/reviewer.md` จาก Placeholder เป็น `[PR #54](https://github.com/titayaaa/toktickit/pull/54)`

เราอัปเดตลิงก์ PR #54 ลงใน reviewer.md เรียบร้อยแล้วน้า ฝากเข้ามาเช็กแล้วกดปุ่ม Merge รวมเข้า lab3-staging ให้หน่อย ขอบคุณมาก

#### 💬 Comment / Response by @chanya06 (2026-09-17)

ตรวจสอบข้อมูลใน reviewer.md เรียบร้อย ฉันลืมกด approve แต่ฉันกด Merge ให้แล้ว


---

## 3.4 PR #55: Issue 20: Login & Mandatory Password Change UI
- **Pull Request Link:** [titayaaa/toktickit#55](https://github.com/titayaaa/toktickit/pull/55)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `1e64f30`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-17)

### Peer Review Comments
**Peer Review: Approved (PR #55)**
ตรวจทานโค้ดและทดสอบ UI ของ Issue 20 (Login & Mandatory Password Change UI) เรียบร้อยแล้ว
-จุดเด่น: สไตล์ Zen Green สอดคล้องตาม Tokens, Checklist ตรวจสอบความซับซ้อนของรหัสผ่านแบบเรียลไทม์ 4 ข้อ, Authentication Gate ดักจับหน้าจอ Login / Change Password / Main App ตาม Session ได้อย่างรัดกุม, มี Unit Test 7 เคสและไม่เกิด Regression ต่อ UI เดิมของ Lab 1 & 2
- บันทึกผลการตรวจทานเรียบร้อย โค้ดผ่านการตรวจโดยไม่มีข้อทักท้วงเพิ่มเติม


---

## 3.5 PR #56: Issue 21: IT Staff Ticket Queue API & Query System
- **Pull Request Link:** [titayaaa/toktickit#56](https://github.com/titayaaa/toktickit/pull/56)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `155519d`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-17)

## 🟢 Peer Review: Approved (PR #56)

ตรวจทานโค้ดและชุดทดสอบของ Issue 21 (IT Staff Ticket Queue API & Query System) เรียบร้อยแล้ว

### 🌟 จุดเด่นที่ทำได้ดี:
1. **Query Capabilities**: รองรับการค้นหา (Search case-insensitive), กรองข้อมูลครอบคลุมทั้ง Category, Status (ทุก Enum), Priority, IT Priority, และ Owner Assignment (`unassigned`, `me`, numeric ID)
2. **Weighted Priority Sorting**: ออกแบบการจัดเรียงตามระดับความสำคัญจริง (`URGENT > CRITICAL > HIGH > MEDIUM > LOW`) แทนการเรียงตามตัวอักษร
3. **Backward Compatibility**: จัดการ Fallback ข้อมูล Requester ของตั๋วเดิมได้อย่างไร้รอยต่อ พร้อมแนบตัวนับ Comments, Notes, และ Attachments
4. **Security & Validation**: มี Guard ตรวจสอบ Role และ Password Rotation อย่างรัดกุม พร้อมส่ง 400 Bad Request เมื่อ Query Parameters ไม่ถูกต้อง
5. **Test Coverage**: ชุด Integration Tests 9 เคสใน `staff-queue.api.test.ts` ครอบคลุมทุก Scenario สำคัญ


---

## 3.6 PR #57: Issue 22: IT Staff Ticket Queue UI & Dashboard
- **Pull Request Link:** [titayaaa/toktickit#57](https://github.com/titayaaa/toktickit/pull/57)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `fe67949`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-17)

## 🟢 Peer Review: Approved (PR #57)

ตรวจทานโค้ดและทดสอบ UI ของ Issue 22 (IT Staff Ticket Queue UI & Dashboard) เรียบร้อยแล้ว

### 🌟 จุดเด่นที่ทำได้ดีมาก:
1. **Zen Green UI & Responsive Representation**: 
   - แสดงผล Desktop/Tablet ด้วย High-Density Data Table พร้อม Monospace Ticket Link สีเขียว `#006B3C`
   - สลับเป็น Touch-friendly Card Stack อัตโนมัติบนจอมือถือ (`< 768px`) โดยไม่เกิดปัญหา Horizontal Overflow
2. **Comprehensive Search & Filter Toolbar**: 
   - ค้นหาได้ทั้ง Ticket Number และ Summary
   - กรองได้ครบทั้ง Status, IT Priority, Category และปุ่มเลือก Assignment (`All`, `Unassigned`, `Assigned to Me`)
   - มีป้าย Active Filter Chips และปุ่ม "Clear All Filters" ที่ใช้งานสะดวก
3. **Interactive Sorting & Smart Pagination**: 
   - หัวตารางคลิกเรียงลำดับได้ พร้อมลูกศรบอกทิศทาง `▲`/`▼`
   - Pagination ปรับ Limit ต่อหน้าได้ และมีระบบคำนวณ Windowing ไม่ทำให้ปุ่มหน้าล้นจอ
4. **Role Gate บน App Shell**: 
   - แท็บ "Ticket Queue" ถูกซ่อนไม่ให้ Requester เห็น และแสดงเฉพาะ IT Staff กับ Admin พร้อมตั้งเป็นหน้าแรกให้อัตโนมัติ
5. **Accessibility & Test Coverage**: 
   - รองรับมาตรฐาน WAI-ARIA (`aria-sort`, `role="search"`, `aria-label`)
   - Unit Tests 7 เคสใน `StaffTicketQueue.test.tsx` ผ่าน 100%


---

## 3.7 PR #58: feat(api): Ticket Operations, Ownership & Notes API (Issue 23)
- **Pull Request Link:** [titayaaa/toktickit#58](https://github.com/titayaaa/toktickit/pull/58)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `087c25b`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-17)

## 🟢 Peer Review: Approved (PR #58)

ตรวจทานโค้ดและชุดทดสอบของ Issue 23 (Ticket Operations, Ownership & Notes API) เรียบร้อยแล้ว

### 🌟 จุดเด่นที่ทำได้ดีมาก:
1. **State Transition Matrix & Resolution Guard (BR-09 & BR-11)**:
   - ควบคุมการเปลี่ยนสถานะตาม Matrix อย่างเคร่งครัด พร้อมดักไม่ให้เปลี่ยนสถานะของตั๋วที่เป็น Terminal (`CLOSED`, `CANCELLED`)
   - บล็อกการส่งสถานะ `RESOLVED` ผ่าน endpoint `/status` โดยบังคับให้ส่งผ่าน `/resolve` พร้อมกรอก `resolutionSummary` 3-500 ตัวอักษร
2. **Claim & Assign Validations (FR-14, FR-15 & AC-07)**:
   - ระบบเคลมตั๋วปรับสถานะ `NEW` -> `OPEN` ให้อัตโนมัติเมื่อกำหนดผู้รับผิดชอบ
   - ระบบ Reassign ป้องกันไม่ให้มอบหมายงานให้ Requester หรือ Inactive User (คืนค่า 422) และรองรับการปลดผู้ดูแลด้วย `ownerId: null`
3. **Internal Notes Confidentiality (BR-13 & AC-05)**:
   - ป้องกันสิทธิ์ทั้ง POST และ GET บน `/notes` ด้วยการคืนค่า 403 แก่ Requester
   - ใน `GET /api/tickets/:id` ไม่มีการ Include หรือ Disclose ข้อมูล Internal Notes ใน Payload อย่างเด็ดขาด
4. **Requester Resolution Indication (BR-10 & AC-12)**:
   - รองรับให้ Requester แจ้งว่าปัญหาได้รับการแก้ไขแล้วผ่าน Public Comment โดยไม่เปลี่ยนสถานะตั๋วเองโดยพลการ
5. **Comprehensive Test Suite**:
   - Integration Tests ครอบคลุม 29 เคสใน `ticket-operations.api.test.ts` ทดสอบทุก Scenario และ Constraint สำคัญ ผ่าน 100%


---

## 3.8 PR #59: feat(ui): IT Staff Ticket Operations & Confidential Notes UI (Issue 24)
- **Pull Request Link:** [titayaaa/toktickit#59](https://github.com/titayaaa/toktickit/pull/59)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `9b6abaa`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @chanya06 (2026-09-17)

### ⚠️ Request Changes on PR #59

จากการตรวจทานโค้ดอย่างละเอียด พบจุดบกพร่องที่ต้องแก้ไขดังนี้:

1. **[Critical] ตกหล่นสถานะ `PENDING` ใน `getAllowedNextStatuses`:**
   - ขาด `case 'PENDING': return ['IN_PROGRESS', 'WAITING_FOR_REQUESTER', 'RESOLVED', 'CANCELLED'];`
   - ขาด `'PENDING'` ในรายการถัดไปของ `OPEN`, `IN_PROGRESS`, `WAITING_FOR_REQUESTER`
   - *ปัญหา:* ตั๋วที่เป็น `PENDING` จะติดเงื่อนไข `Terminal (No Changes)` ทำให้เปลี่ยนสถานะไม่ได้เลย

2. **[Bug] ขาด Priority `CRITICAL` ใน `#it-priority-select`:**
   - เพิ่ม `<option value="CRITICAL">Critical</option>` ให้ครบ 5 ระดับตาม Prisma Schema

3. **[Code Smell] แก้ไขการเรียก React Hook ใน `try/catch`:**
   - ย้าย `useAuth()` ออกจากบล็อก `try/catch` เพื่อไม่ให้ผิดกฎ React Rules of Hooks

4. **[UX Polishing] แสดงชื่อ Status Transition ให้เป็น Title Case:**
   - แปลงชื่อสถานะใน dropdown เช่น `WAITING_FOR_REQUESTER` ให้แสดงเป็น `Waiting for Requester`

#### 💬 Review Feedback by @chanya06 (2026-09-17)

> **Peer Review: Approved (PR #59)**
> ตรวจทานโค้ดที่แก้ไขเพิ่มเติมใน Commit `9d2e307` ของ Issue 24 (IT Staff Ticket Operations & Confidential Notes UI) เรียบร้อยแล้ว
> 1. **State Transition Matrix & PENDING Support:** จัดการ State Transition ครบถ้วน รวมถึง `PENDING` ทั้งขาเข้าและขาออก ไม่เกิดปัญหาตั๋วติด Terminal ค้างอีกต่อไป
> 2. **Complete Priority Options:** เพิ่มตัวเลือก `CRITICAL` ใน IT Priority Select ครบทั้ง 5 ระดับตาม Prisma Schema
> 3. **React Rules of Hooks Compliance:** ย้าย `useAuth()` ออกมาที่ Top-level พร้อมเสริม Fallback ปลอดภัยใน `AuthContext` ถูกต้องตาม Best Practices
> 4. **UI Polishing & Typography:** แปลงข้อความแสดงผลสถานะใน Dropdown เป็น Title Case สวยงาม สะอาดตา ตรงตามมาตรฐาน Zen Green Design System
> 5. **Test Verification:** Unit Tests ทั้ง 8 เคส (OP-01 ถึง OP-08) ครอบคลุมทุกฟังก์ชัน รวมเทสต์ฝั่ง Client ผ่านครบ 49/49 เคส
> โค้ดมีคุณภาพสูงและแก้ไขได้ครบถ้วนสมบูรณ์

#### 💬 Comment / Response by @titayaaa (2026-09-17)

> ### ⚠️ Request Changes on PR #59
> จากการตรวจทานโค้ดอย่างละเอียด พบจุดบกพร่องที่ต้องแก้ไขดังนี้:
> 
> 1. **[Critical] ตกหล่นสถานะ `PENDING` ใน `getAllowedNextStatuses`:**
>    
>    * ขาด `case 'PENDING': return ['IN_PROGRESS', 'WAITING_FOR_REQUESTER', 'RESOLVED', 'CANCELLED'];`
>    * ขาด `'PENDING'` ในรายการถัดไปของ `OPEN`, `IN_PROGRESS`, `WAITING_FOR_REQUESTER`
>    * _ปัญหา:_ ตั๋วที่เป็น `PENDING` จะติดเงื่อนไข `Terminal (No Changes)` ทำให้เปลี่ยนสถานะไม่ได้เลย
> 2. **[Bug] ขาด Priority `CRITICAL` ใน `#it-priority-select`:**
>    
>    * เพิ่ม `<option value="CRITICAL">Critical</option>` ให้ครบ 5 ระดับตาม Prisma Schema
> 3. **[Code Smell] แก้ไขการเรียก React Hook ใน `try/catch`:**
>    
>    * ย้าย `useAuth()` ออกจากบล็อก `try/catch` เพื่อไม่ให้ผิดกฎ React Rules of Hooks
> 4. **[UX Polishing] แสดงชื่อ Status Transition ให้เป็น Title Case:**
>    
>    * แปลงชื่อสถานะใน dropdown เช่น `WAITING_FOR_REQUESTER` ให้แสดงเป็น `Waiting for Requester`

ขอบคุณมากเลยน้าที่ช่วยตรวจให้อย่างละเอียด! เราแก้ครบทั้ง 4 จุดตามที่สะกิดมาให้เรียบร้อยแล้ว (Commit: `9d2e307`):

1. **สถานะ `PENDING`:** เพิ่มเงื่อนไข `case 'PENDING'` และใส่ `'PENDING'` ในรายการสถานะถัดไปของ `OPEN`, `IN_PROGRESS`, และ `WAITING_FOR_REQUESTER` รวมถึงเพิ่มสี badge เรียบร้อย ไม่ติด terminal แล้ว
2. **Priority `CRITICAL`:** เพิ่ม `<option value="CRITICAL">Critical</option>` ใน `#it-priority-select` ครบ 5 ระดับตาม Prisma Schema แล้วน้า
3. **React Rules of Hooks:** ย้าย `useAuth()` ออกมาเรียกที่ Top-level ด้านบนสุด และทำ safe fallback ให้ AuthContext ปลอดภัยตามกฎ Hooks แล้ว
4. **Title Case Status:** แปลงชื่อสถานะใน dropdown เช่น `Waiting for Requester`, `In Progress` เรียบร้อย ง่ายขึ้นเยอะเลย

เพิ่ม Unit Test `OP-08` ตรวจสอบครบทั้ง 4 ข้อ เทสต์ฝั่ง Client ผ่านหมด 49/49 เคส และบิลด์ผ่านฉลุยแล้วจ้า รบกวนดูอีกรอบให้หน่อยน้า ขอบคุณมากๆ เลยย


---

## 3.9 PR #60: feat(admin): Administrator User Management API & UI (Issue 25)
- **Pull Request Link:** [titayaaa/toktickit#60](https://github.com/titayaaa/toktickit/pull/60)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `d6e071c`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @chanya06 (2026-09-17)

### ⚠️ Request Changes on PR #60

ตรวจทานโค้ด Issue 25 (Administrator User Management API & UI) อย่างละเอียดแล้ว โครงสร้างและ Logic ทำได้ดีมาก แต่พบจุดที่ต้องแก้ไข:

1. **[Critical] Business Rule Reference ผิดทั้งหมด:**
   - โค้ดอ้างอิง BR-07/BR-08/BR-09/BR-10 (Ticket Workflow Rules) 
     แต่ควรเป็น BR-17/BR-18/BR-19 (Administrator Governance Rules) ตาม Spec Section 5.4
   - ต้องแก้ทั้งใน `admin.ts` comments และ `AdminUserManagement.tsx` UI labels

2. **[Bug] ลำดับ Guard Logic ใน PATCH `/api/admin/users/:id`:**
   - ควรตรวจ Self-Deactivation Guard (BR-18) ก่อน Last Admin Protection (BR-19)
   - เพื่อให้ Error Message ตรงกับสถานการณ์จริง

3. **[Code Smell] Missing Type Check สำหรับ `nameToUse`:**
   - ถ้าส่ง `fullName` เป็นค่าที่ไม่ใช่ String → `.trim()` จะ throw TypeError → ได้ 500 แทน 400

#### 💬 Review Feedback by @chanya06 (2026-09-17)

ขอบคุณสำหรับการแก้ไขอย่างรวดเร็วและครบถ้วนใน commit bbf1124 ตรวจสอบโค้ดซ้ำเรียบร้อยแล้ว:

Business Rule Reference: อัปเดตเลขอ้างอิงเป็นหมวด BR-16 ถึง BR-19 (Administrator Governance Rules) ครบถ้วนถูกต้องทั้งใน Codebase, UI Tooltips, เอกสาร และ Test Suites แล้ว
Guard Logic Order: สลับลำดับการตรวจเช็กใน PATCH /api/admin/users/:id ได้อย่างเหมาะสม นำ Self-Deactivation Guard (BR-18) ขึ้นมาก่อน Last Admin Protection (BR-19) ทำให้ Error Message สื่อสารตรงตามการกระทำของแอดมินชัดเจน
Defensive Type Checking: เสริม Type Guard typeof rawName === 'string' ทั้งใน POST และ PATCH ได้รัดกุม ป้องกัน Runtime TypeError จากการเรียก .trim() และตอบกลับ 400 Bad Request ได้อย่างถูกต้อง พร้อมมี Test Case ครอบคลุมทั้งสองจุด
Test & Build Verification: Server Tests (84 เคส) และ Client Tests (56 เคส) รวมถึง Build ผ่าน 100% เรียบร้อย
โค้ดมีคุณภาพสูงและพร้อมสำหรับการใช้งานแล้ว

#### 💬 Comment / Response by @titayaaa (2026-09-17)

> ### ⚠️ Request Changes on PR #60
> ตรวจทานโค้ด Issue 25 (Administrator User Management API & UI) อย่างละเอียดแล้ว โครงสร้างและ Logic ทำได้ดีมาก แต่พบจุดที่ต้องแก้ไข:
> 
> 1. **[Critical] Business Rule Reference ผิดทั้งหมด:**
>    
>    * โค้ดอ้างอิง BR-07/BR-08/BR-09/BR-10 (Ticket Workflow Rules)
>      แต่ควรเป็น BR-17/BR-18/BR-19 (Administrator Governance Rules) ตาม Spec Section 5.4
>    * ต้องแก้ทั้งใน `admin.ts` comments และ `AdminUserManagement.tsx` UI labels
> 2. **[Bug] ลำดับ Guard Logic ใน PATCH `/api/admin/users/:id`:**
>    
>    * ควรตรวจ Self-Deactivation Guard (BR-18) ก่อน Last Admin Protection (BR-19)
>    * เพื่อให้ Error Message ตรงกับสถานการณ์จริง
> 3. **[Code Smell] Missing Type Check สำหรับ `nameToUse`:**
>    
>    * ถ้าส่ง `fullName` เป็นค่าที่ไม่ใช่ String → `.trim()` จะ throw TypeError → ได้ 500 แทน 400

ขอบคุณมากเลยสำหรับคำแนะนำ ละเอียดและช่วยได้มากจริง ๆ

เราได้นำไปแก้ไขเรียบร้อยแล้วใน commit `bbf1124` ดังนี้
1. **Business Rule Reference:** อัปเดตเลขอ้างอิงเป็นหมวด Administrator Governance Rules (BR-17, BR-18, BR-19) ตาม Spec Section 5.4 ครบทั้งใน `admin.ts`, `AdminUserManagement.tsx` (UI labels), เอกสาร `reviewer.md` และ Test Suites ทั้งหมดแล้ว
2. **Guard Logic Order:** สลับลำดับการตรวจเช็กใน `PATCH /api/admin/users/:id` โดยนำ Self-Deactivation Guard (BR-18) ขึ้นมาตรวจก่อน Last Admin Protection (BR-19) ทำให้ Error Message แสดงผลตรงกับการกระทำของแอดมินแล้ว
3. **Type Checking:** เสริม Type Guard `typeof rawName === 'string'` ทั้งใน POST และ PATCH ป้องกัน `TypeError` จากการเรียก `.trim()` คืนค่า 400 Bad Request ได้อย่างถูกต้อง
4. **Test & Build Verification:** รันเทสต์ Server ผ่านครบทั้ง 84 เคส และ Client ผ่านครบทั้ง 56 เคส รวมถึง Build ผ่านเรียบร้อย

รบกวนช่วยตรวจทานอีกครั้งและ Merge ได้เลย ขอบคุณมากน้า


---

## 3.10 PR #61: feat(release): E2E testing, responsive visual inspection and release documentation (Issue 26)
- **Pull Request Link:** [titayaaa/toktickit#61](https://github.com/titayaaa/toktickit/pull/61)
- **Reviewer:** ชัญญา พูลเขตกิจ (`@chanya06`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `8a5bd28`)
- **Approval Date:** 2026-09-18

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @chanya06 (2026-09-18)

ตรวจทานโค้ด ชุดทดสอบ และเอกสารใน PR #61 ครบถ้วนเรียบร้อยแล้วครับ ถือเป็นการปิด Sprint 3 ได้อย่างยอดเยี่ยมและสมบูรณ์แบบมาก:

E2E Testing Suite (Playwright): ครอบคลุม User Journeys สำคัญครบทุก Role (authentication, staff-ticket-flow, user-administration, visual-evidence) รันผ่านครบ 18/18 test configurations (100% pass) ทั้ง Desktop, Tablet และ Mobile
Responsive Visual Quality: ตรวจสอบผ่านเกณฑ์ expectNoHorizontalOverflow ไร้ปัญหาหน้าจอล้นในทุก Viewport มีการแก้ปัญหา Bootstrap Row Margin ด้วย mx-0 และ overflow-hidden ได้อย่างตรงจุด
Role-Based Navigation: จัดการ Redirect แท็บเริ่มต้นหลังล็อกอินได้เหมาะสม (Admin -> User Management, IT Staff -> Queue, Requester -> Create Ticket) ช่วยเพิ่ม UX ให้ผู้ใช้งานอย่างมาก
Backward Compatibility: ปรับ Scoped Middleware ใน tickets.ts ได้อย่างรัดกุม ทำให้ API และ Test Suites ย้อนหลังของ Lab 2 ทำงานร่วมกันได้อย่างราบรื่น
Evidence & Documentation: มี Screenshot ครบทั้ง 32 ภาพใน artifacts/lab-03/screenshots/, Traceability Matrix ใน tests.md อัปเดตครบ 35 รายการ และอัปเดตคู่มือใน README.md ชัดเจน
(มีจุดเล็กๆ ไม่กระทบการทำงาน: แผนผัง Repository Structure ใน README.md ยังสามารถเพิ่มโฟลเดอร์ของ lab-03 เข้าไปเพิ่มเติมให้ครบถ้วนได้ครับ)


---

# Part 2: Records of Student (@titayaaa) Reviewing Partner (@lmaybelgracel)

เอกสารในส่วนนี้บันทึกข้อความทุกตัวอักษรที่นักศึกษา (@titayaaa) ตรวจสอบ, ให้ข้อเสนอแนะเชิงลึก (Line-by-line Technical Feedback), ร้องขอให้แก้ไข (Changes Requested), การตอบรับของ Partner, และการอนุมัติ (Approval) สำหรับทุก Pull Request บนคลัง `lmaybelgracel/TokTickit`

---

## 4. Master PR Table (lmaybelgracel/TokTickit)
- **Repository:** [lmaybelgracel/TokTickit](https://github.com/lmaybelgracel/TokTickit)
- **Author:** Maybel Grace (GitHub: `@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Target Branch:** `lab3-staging`

| PR # | Feature / Issue Title | Branch | Target | Reviewer | Verdict | Status |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **[PR #36](https://github.com/lmaybelgracel/TokTickit/pull/36)** | Issue 17: Sprint 3 Engineering Contract & Specification | `feature/17-spec-and-tests` | `lab3-staging` | `@titayaaa` | Approved | ✅ Merged (`2abef9f`) |
| **[PR #46](https://github.com/lmaybelgracel/TokTickit/pull/46)** | Issue 18: Database Schema Evolution (Superseded) | `feature/18-database-and-seed` | `lab3-staging` | `@titayaaa` | Superseded | ✅ Merged (`cd00e92`) |
| **[PR #47](https://github.com/lmaybelgracel/TokTickit/pull/47)** | Issue 18: Database Schema Evolution & Idempotent Seed | `feature/18-database-and-seed` | `lab3-staging` | `@titayaaa` | Approved | ✅ Merged (`b108cd3`) |
| **[PR #48](https://github.com/lmaybelgracel/TokTickit/pull/48)** | Issue 19: Authentication, Session & Password Change | `feature/19-auth-and-passwords` | `lab3-staging` | `@titayaaa` | Changes Requested -> Approved | ✅ Merged (`94e2f3c`) |
| **[PR #49](https://github.com/lmaybelgracel/TokTickit/pull/49)** | Issue 20: IT Staff Ticket Queue | `feature/20-it-staff-ticket-queue` | `lab3-staging` | `@titayaaa` | Approved | ✅ Merged (`f7838f7`) |
| **[PR #50](https://github.com/lmaybelgracel/TokTickit/pull/50)** | Issue 21: IT Staff Ticket Operations & Detail | `feature/21-it-staff-operations` | `lab3-staging` | `@titayaaa` | Approved | ✅ Merged (`f63cc9c`) |
| **[PR #51](https://github.com/lmaybelgracel/TokTickit/pull/51)** | Issue 22: Administrator User Management | `feature/22-admin-user-management` | `lab3-staging` | `@titayaaa` | Approved | ✅ Merged (`a3c72a4`) |
| **[PR #52](https://github.com/lmaybelgracel/TokTickit/pull/52)** | Issue 23: Automated Testing Suite | `feature/23-automated-testing-suite` | `lab3-staging` | `@titayaaa` | Changes Requested -> Approved | ✅ Merged (`15194b5`) |
| **[PR #53](https://github.com/lmaybelgracel/TokTickit/pull/53)** | feat(lab-03): UI style checking & visual evidence | `feature/24-ui-style-checking` | `lab3-staging` | `@titayaaa` | Changes Requested -> Approved | ✅ Merged (`041bd12`) |

---

## 5.1 PR #36: Issue 17: Sprint 3 Engineering Contract & Specification
- **Pull Request Link:** [lmaybelgracel/TokTickit#36](https://github.com/lmaybelgracel/TokTickit/pull/36)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `2abef9f`)
- **Approval Date:** 2026-09-16

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @titayaaa (2026-09-16)

นอกนั้นพวก Flow การทำงาน, แบ่ง Role 3 ระดับ, โทนสี UI Zen Green กับกล่อง Internal Notes สีเหลืองส้มอันนี้ทำมาดีมาก ชัดเจนดีแล้ว ฝากแก้จุดข้างบนนี้นิดนึง เดี๋ยวแก้เสร็จทักมาเลย เรามากด Approve ให้น้า

#### ✅ Approved by @titayaaa (2026-09-16)

ขอบคุณที่อธิบายเรื่อง Format เลขตั๋วอย่างละเอียดน้า ตรวจสอบ commit ล่าสุดแล้ว แก้ไขเรื่อง Data Leak, Validation ดัก Resolve, Priority Enum, และเพิ่ม Test Cases ได้ครบถ้วนสมบูรณ์มากเลยค่ะ เอกสารสเปกพร้อมสำหรับเริ่ม Implement แล้ว ขอ Approve ให้เลยค่า

#### 💬 Comment / Response by @lmaybelgracel (2026-09-16)

ขอบคุณสำหรับคำแนะนำที่ละเอียดมาก @titayaaa ได้ทำการปรับปรุงแก้ไขครบทั้ง 6 จุดใน commit 7718e13 เรียบร้อยแล้ว:

1. **ป้องกัน Data Leak ของ Internal Notes**: ระบุเงื่อนไขใน `docs/lab-03/api-spec.md` (เส้น `GET /api/tickets/:id`) ชัดเจนว่า หากผู้เรียกเป็น Role `REQUESTER` ระบบจะตัดฟิลด์ `internalNotes` ออกจาก Response ทันที ให้เห็นเฉพาะ `publicComments` เท่านั้น ส่วนเจ้าหน้าที่ IT/Admin ให้ดึงผ่าน `GET /api/tickets/:id/notes`
2. **แยก Endpoint ป้องกันการ Bypass Resolution Summary**: ที่เส้น `PATCH /api/staff/tickets/:id/status` ได้เพิ่ม Guard ดักไว้ว่าหากพยายามส่ง `status: "RESOLVED"` ตรงๆ จะตอบกลับ `422 Unprocessable Entity` โดยบังคับให้ต้อง Resolve ผ่านเส้นเฉพาะคือ `PATCH /api/staff/tickets/:id/resolve` พร้อมส่ง `resolutionSummary` (3-500 ตัวอักษร) เสมอ
3. **ฟอร์แมตเลขตั๋ว**: ปรับกลับมาใช้รูปแบบ `TKT-YYYYMMDD-XXXX` (เช่น `TKT-20260913-0001`) ตามมาตรฐานเดิมของ Lab 2
4. **เพิ่มระดับ URGENT ใน Priority Enum**: เพิ่ม `URGENT` เข้าไปใน `enum Priority` และ `itPriority` ทั้งใน `specification.md` และ `api-spec.md` ครบ 4 ระดับ (LOW, MEDIUM, HIGH, URGENT)
5. **หมายเหตุ Role Display Text**: เพิ่ม Enum Mapping Note ใน `docs/lab-03/ui-spec.md` อธิบายความแตกต่างระหว่าง Database Enum (`REQUESTER`, `IT_STAFF`, `ADMINISTRATOR`) และ Display String บนหน้าบ้าน (`Requester`, `IT Staff`, `Administrator`)
6. **เพิ่ม Test Case**: เพิ่มเคส `SEC-04` (Requester ยิงเข้า `GET /api/tickets/:id/notes` ต้องได้ 403 Forbidden) และ `STAFF-05` (Resolve ตั๋วโดยไม่ส่งหรือส่ง resolutionSummary ว่างเปล่า ต้องได้ 422 Unprocessable Entity) ลงใน `docs/lab-03/tests.md`

รบกวนตรวจสอบอีกครั้ง

#### 💬 Comment / Response by @lmaybelgracel (2026-09-16)

ขออนุญาตชี้แจงเพิ่มเติมในส่วนของ **ข้อ 3 (ฟอร์แมตเลขตั๋ว)** ครับ @titayaaa:

หลังจากตรวจสอบโค้ดจริงใน Repository ของเรา (`server/src/app.ts:105`) และชุด Regression Test เดิมของ Lab 2 (`create-ticket.api.test.ts:64`) พบว่าใน Repo ของเราได้ตั้ง Regex ตรวจสอบเลขตั๋วไว้เป็น:
`expect(res.body.ticketNumber).toMatch(/^TKT-\d{4}-\d{6}$/);` ซึ่งคือรูปแบบ **`TKT-YYYY-XXXXXX`** (เช่น `TKT-2026-000142`) อยู่แล้วตั้งแต่แรก
นอกจากนี้ ในภาพ Mockup ของโจทย์ Lab 3 (หน้า 9 และ 10) อาจารย์ก็แสดงตัวอย่างเป็น `TKT-2025-001234` (`TKT-YYYY-XXXXXX`) เช่นเดียวกัน

ดังนั้น หากเราปรับเปลี่ยนเป็น `TKT-YYYYMMDD-XXXX` จะส่งผลให้ชุด Regression Test เดิมของ Lab 2 พังทันทีครับ เราจึงจำเป็นต้องคงรูปแบบ **`TKT-YYYY-XXXXXX`** ตามโค้ดเดิมของ Repository เรา เพื่อรักษาความสมบูรณ์แบบ Backward Compatibility 100% ครับ (อัปเดตใน commit 488c0b3 เรียบร้อยแล้วครับ)


---

## 5.2 PR #46: [Superseded by PR #47] Issue 18: Database Schema Evolution, User Migration & Idempotent Seed Data
- **Pull Request Link:** [lmaybelgracel/TokTickit#46](https://github.com/lmaybelgracel/TokTickit/pull/46)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `cd00e92`)
- **Approval Date:** 2026-09-16

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Comment / Response by @lmaybelgracel (2026-09-16)

กิ่ง lab3-staging ได้ถูก Reset กลับไปก่อนการ Merge เรียบร้อยแล้ว เพื่อให้เพื่อน (@titayaaa) เข้ามาทำการ Review และ Merge ด้วยตนเองตามขั้นตอนที่ถูกต้อง กรุณาดำเนินการที่ **PR #47**: https://github.com/lmaybelgracel/TokTickit/pull/47


---

## 5.3 PR #47: Issue 18: Database Schema Evolution, User Migration & Idempotent Seed Data
- **Pull Request Link:** [lmaybelgracel/TokTickit#47](https://github.com/lmaybelgracel/TokTickit/pull/47)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `b108cd3`)
- **Approval Date:** 2026-09-16

### 💬 Peer Review & Author Response History (Verbatim)

#### 💬 Review Feedback by @titayaaa (2026-09-16)

เราไล่ดูรายละเอียดใน PR #47 ให้แล้วนะ การจัดโครงสร้าง Seed Data กับชุดเทสต์ 13 เคสใน `database-schema-seed.test.ts` ทำออกมาได้ครอบคลุมและละเอียดมากเลย 

แต่มีจุดสำคัญเรื่อง Database Migration และความเสี่ยงที่ข้อมูลเดิมจะพัง อยากให้ช่วยปรับแก้ก่อน Merge ตามนี้น้า:

### 1. [สำคัญสุด] ยังไม่มีไฟล์ Prisma Migration ใน PR
- ใน PR นี้มีการแก้ `schema.prisma` เพิ่ม Model `User`, `PublicComment`, `InternalNote` และ Enums ใหม่
- แต่ใน PR ยังไม่มีไฟล์ Migration ในโฟลเดอร์ `server/prisma/migrations/` เลย (มีแก้แค่ 5 ไฟล์)
- กลัวว่าถ้าเพื่อนในทีม pull ไป หรือตอนเอาไปรันบนเครื่องอื่นด้วย `prisma migrate deploy` ตารางใหม่มันจะไม่ถูกสร้างใน PostgreSQL อะ ฝากสร้างและ commit โฟลเดอร์ `server/prisma/migrations/...` ขึ้นมาใน PR นี้ด้วยน้า

### 2. [ความเสี่ยงข้อมูลพัง] Foreign Key ของ `Ticket.requesterId`
- ใน `schema.prisma` เดิม `requesterId` มันชี้ไปที่ `RequesterUser.id`
- แต่ใน PR นี้แก้ให้ `requesterId` ชี้ตรงไปที่ `User.id` เลย:
  `requester User @relation("RequesterTickets", fields: [requesterId], references: [id])`
- **จุดที่ต้องระวัง:** ถ้าใน Database ของเรามีตั๋วเดิมของ Lab 2 อยู่แล้ว ค่า `requesterId` ของตั๋วเก่ามันเป็น ID ของ `RequesterUser` ถ้าเปลี่ยน Foreign Key ปุ๊บโดยไม่ได้ migrate ID เก่า อาจจะทำให้เกิด Foreign Key Violation หรือข้อมูลตั๋วเดิมพังได้ ฝากเช็กหรือทำ logic backfill/mapping ID ให้ชัวร์ก่อนน้า

### 3. ฟิลด์ `department` ใน `model User` (เกินสเปกแล็บ)
- ใน `model User` มีใส่ `department String?` เข้ามา
- แต่ใน Handout หน้า 3 (Section 4.2) กับหน้า 5 (Section 5.1) อาจารย์เขียนไว้ใน Explicit Exclusions ชัดเจนเลยว่า:
  > *"department, organization, profile-photo... are explicitly excluded from Lab 3"*
  > *"The User model does not need departments"*
- แนะนำให้ตัดฟิลด์ `department` ออก หรือถ้าจะใส่ไว้ ต้องระวังไม่ให้กระทบกับการตรวจเรื่อง Scope Creep ของอาจารย์นะ

### 4. Path Import ใน `database-schema-seed.test.ts`
- ตรงบรรทัดที่ 7 ที่เขียน `from "../../prisma/seed.js"` (ใส่นามสกุล `.js`) เช็กนิดนึงว่ารันผ่านทุก environment มั้ย ถ้าปรับให้สอดคล้องกับ convention ของ Vitest ใน repo จะปลอดภัยขึ้นจ้า

ฝากเช็กจุดที่ 1 (ไฟล์ Migration) กับจุดที่ 2 (Foreign Key ตั๋วเก่า) เป็นพิเศษน้า

#### ✅ Approved by @titayaaa (2026-09-16)

ตรวจเช็ค commit `3a2e156` เรียบร้อยแล้ว แก้ไขครบถ้วนทั้ง 4 จุดได้อย่างยอดเยี่ยมมาก
1. เพิ่มไฟล์ Prisma Migration พร้อม SQL Backfill ข้อมูล Requester เดิม ช่วยรักษาตั๋ว Lab 2 ได้อย่างสมบูรณ์แบบ
2. ปรับปรุง Seed Data และตัดฟิลด์ department ออกตรงตามข้อกำหนดของ Lab 3
3. ชุดเทสต์ 17 เคสใน `database-schema-seed.test.ts` ครอบคลุมและผ่านหมด
4. บันทึก reviewer.md เรียบร้อย

เดี๋ยว Approve และกด Merge รวมเข้า `lab3-staging`

#### 💬 Comment / Response by @lmaybelgracel (2026-09-16)

ขอบคุณสำหรับคำแนะนำที่ช่วยตรวจทานอย่างละเอียด @titayaaa ได้ตรวจสอบและดำเนินการปรับปรุงแก้ไขครบทั้ง 4 จุดใน commit `3a2e156` เรียบร้อยแล้ว:

1. **เพิ่มไฟล์ Prisma Migration (`server/prisma/migrations/20260917000000_lab3_users_and_ticket_evolution/migration.sql`):**
   - สร้างไฟล์ SQL Migration ครบถ้วน รองรับการรัน `prisma migrate deploy` ทั้ง Enums, ตาราง `users`, Foreign Keys, Indexes, ตาราง `public_comments` และ `internal_notes`
2. **การย้ายข้อมูลและป้องกัน Foreign Key ตั๋วเดิมพัง (Backfill Logic):**
   - ใส่คำสั่ง SQL Backfill ใน migration: `INSERT INTO "users" ... SELECT "id", ... FROM "requester_users" ON CONFLICT ("id") DO NOTHING;` เพื่อคัดลอก Requester เดิมเข้าตาราง `users` โดยรักษาค่า `id` เดิมไว้ 100%
   - ใส่ Logic Backfill อัตโนมัติใน `server/prisma/seed.ts` ก่อนเริ่มสร้างตั๋ว เพื่อให้มั่นใจว่าจะไม่มี Foreign Key Violation หรือข้อมูลตั๋วเดิมสูญหาย
3. **ตัดฟิลด์ `department` ออกจาก `model User`:**
   - ตัด `department` ออกจาก `User` ใน `schema.prisma`, `seed.ts` และรัน `prisma generate` ใหม่ เพื่อให้สอดคล้องกับ Explicit Exclusions ของอาจารย์ (Section 4.2 & 5.1) และป้องกันปัญหา Scope Creep
4. **อัปเดตและเพิ่มชุดทดสอบ:**
   - เพิ่มเคสทดสอบตรวจสอบไฟล์ Migration, ตรวจสอบการ Backfill รักษา ID, และตรวจสอบว่า `department` ถูกตัดออกจริง ผ่านการทดสอบทั้งหมด 49 ข้อใน Server Vitest (100%)

บันทึกสรุปการแก้ไขลงใน `docs/lab-03/reviewer.md` เรียบร้อยแล้ว รบกวน @titayaaa ตรวจสอบ commit `3a2e156` และกด Approve / Merge เข้า `lab3-staging` ได้เลย


---

## 5.4 PR #48: Issue 19: Authentication, Session & Mandatory Password Change
- **Pull Request Link:** [lmaybelgracel/TokTickit#48](https://github.com/lmaybelgracel/TokTickit/pull/48)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `94e2f3c`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @titayaaa (2026-09-17)

เราไล่ตรวจโค้ดใน PR #48 ให้แล้วนะ ทำออกมาได้ครบวงจรมาก ทั้ง Backend Auth, JWT Middleware, Context, และหน้า UI สวยงาม คุมธีม Zen Green และ Amber Callout ตรงตามสเปกเลย 

แต่มีจุดสำคัญที่อยากให้ช่วยปรับแก้ก่อน Merge เพื่อให้ตรงตามโจทย์ Lab 3 Handout และความปลอดภัยตามนี้น้า

### 1. [สำคัญสุด - ขัดกับโจทย์แล็บ] ปุ่ม "Select Development Requester" ในหน้า Login
- **ไฟล์:** `client/src/App.tsx` (แถวบรรทัดที่ 55-65)
- **ปัญหา:** ใต้ฟอร์ม Login มีปุ่ม `<button>Select Development Requester</button>` ที่กดแล้วจะพาไปหน้า Requester Selector เก่าของ Lab 2
- **โจทย์อาจารย์:** ใน Handout หน้า 1, 2 และ 8 (Section 8.2) อาจารย์เน้นย้ำชัดเจนว่า:
  > *"The Development Requester selector and Change Requester action must be removed."*
- **วิธีแก้:** ฝากเอาปุ่มกดสลับไป Dev Selector ออกจากหน้า Login น้า ให้การเข้าระบบผ่านฟอร์ม Login 100% ตามข้อกำหนดของอาจารย์เลยจ้า

### 2. [Security & Policy] ตรวจสอบการตั้งรหัสผ่านใหม่ซ้ำกับรหัสผ่านเดิม
- **ไฟล์:** `server/src/routes/auth.routes.ts` (ตรง `POST /api/auth/change-password`)
- **ปัญหา:** ตอนนี้ระบบตรวจแค่ว่ารหัสปัจจุบันถูกมั้ย และรหัสใหม่ยาวพอตามเงื่อนไขมั้ย แต่ยังไม่ได้ตรวจว่า `newPassword` ซ้ำกับ `currentPassword` หรือไม่
- **วิธีแก้:** ตามหลัก Mandatory First-Login Password Rotation ผู้ใช้ต้องเปลี่ยนเป็นรหัสใหม่ที่ไม่ซ้ำกับรหัสชั่วคราวเดิม ฝากเติมเงื่อนไขเช็คว่าถ้า `newPassword` ตรงกับรหัสเดิม ให้ตอบกลับว่ารหัสใหม่ต้องไม่ซ้ำกับรหัสปัจจุบันด้วยน้า

### 3. [Contract Consistency] HTTP Status Code ตอน Password Complexity ไม่ผ่าน
- **ไฟล์:** `server/src/routes/auth.routes.ts` (ตรง `POST /api/auth/change-password`)
- ในโค้ดตอบกลับมาเป็น `400 Bad Request` แต่ใน `docs/lab-03/api-spec.md` (Section 1.4) ที่เราตกลงกันไว้ระบุเป็น `422 Unprocessable Entity` ฝากปรับให้เป็น 422 เพื่อให้ตรงกับ API Spec ที่เขียนไว้

### 4. [สเปกกับโค้ดจริง] เรื่อง Token Storage
- ใน `docs/lab-03/specification.md` เขียนไว้ว่าจะใช้ HTTP-only cookie แต่ใน `AuthContext.tsx` ใช้วิธีเก็บ Bearer token ลง `localStorage` อันนี้โค้ดทำงานได้ดีและสะดวกกับ SPA มาก แค่อย่าลืมโน้ตอธิบายหรือปรับใน docs ให้ตรงกันด้วยน้า

---

ฝากปรับแก้ข้อ 1 (เอาปุ่ม Dev Selector ออก) กับข้อ 2 (กันรหัสใหม่ซ้ำรหัสเดิม) เป็นหลักนะ ถ้าแก้เรียบร้อยแล้วแท็กมาได้เลย เดี๋ยวเรามา Approve และกด Merge ให้

#### ✅ Approved by @titayaaa (2026-09-17)

good !!

#### 💬 Comment / Response by @lmaybelgracel (2026-09-17)

ขอบคุณสำหรับคำแนะนำที่ช่วยตรวจทานอย่างละเอียด @titayaaa ได้ตรวจสอบและดำเนินการปรับปรุงแก้ไขครบทั้ง 4 จุดใน commit `8a85931` เรียบร้อยแล้ว:

1. **นำปุ่ม "Select Development Requester" ออกจากหน้า Login:**
   - นำปุ่มสลับไป Dev Selector ออกจาก `client/src/App.tsx` เรียบร้อยแล้ว เพื่อให้การเข้าระบบดำเนินการผ่านฟอร์ม Login 100% สอดคล้องตามข้อกำหนด Handout (Section 1, 2 และ 8.2) อย่างเคร่งครัด
   - ปรับปรุง `client/tests/lab-01/App.test.tsx` ให้ตรวจสอบหน้าจอ Login และ Authenticated Shell
2. **ป้องกันการตั้งรหัสผ่านใหม่ซ้ำกับรหัสผ่านเดิม (Password Rotation Policy):**
   - เพิ่มการตรวจสอบใน `server/src/routes/auth.routes.ts` ถ้า `newPassword === currentPassword` ให้ปฏิเสธด้วยสถานะ `422 Unprocessable Entity` (`{ "error": "New password cannot be the same as current password" }`)
   - เพิ่มเงื่อนไขและข้อความแจ้งเตือนในหน้าจอ `ChangePassword.tsx` พร้อมปิดการใช้งานปุ่มบันทึกหากรหัสใหม่ตรงกับรหัสเดิม
   - เพิ่มเคสทดสอบทั้งใน `auth.api.test.ts` และ `ChangePassword.test.tsx`
3. **ปรับ HTTP Status Code ตอน Password Complexity ไม่ผ่านเป็น 422:**
   - ปรับสถานะตอบกลับใน `POST /api/auth/change-password` เป็น `422 Unprocessable Entity` ตรงตามที่ระบุไว้ใน `docs/lab-03/api-spec.md` (Section 1.2 & 2.1)
4. **บันทึกความชัดเจนเรื่อง Token Storage ในเอกสาร:**
   - เพิ่มคำอธิบายทั้งใน `docs/lab-03/specification.md` (Section 11) และ `docs/lab-03/api-spec.md` (Section 1.1) ว่าในฝั่ง React SPA ไคลเอนต์จัดเก็บ Bearer JWT ลงใน `localStorage` (`toktickit_auth_token`) และส่งผ่าน Header `Authorization: Bearer <token>` สำหรับทุก Protected Request

บันทึกสรุปการแก้ไขลงใน `docs/lab-03/reviewer.md` เรียบร้อยแล้ว รบกวน @titayaaa ตรวจสอบ commit `8a85931` และกด Approve / Merge เข้า `lab3-staging` ได้เลย


---

## 5.5 PR #49: Issue 20: IT Staff Ticket Queue
- **Pull Request Link:** [lmaybelgracel/TokTickit#49](https://github.com/lmaybelgracel/TokTickit/pull/49)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `f7838f7`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ✅ Approved by @titayaaa (2026-09-17)

เราไล่ตรวจโค้ดใน PR #49 ให้ครบทุกจุดแล้วนะ ทำออกมาได้ดีและละเอียดมาก ทั้งฝั่ง Backend API และหน้าบ้าน UI คุมธีม Zen Green สวยงาม สบายตา ตรงตามสเปกเลยจ้า

### จุดเด่นที่ดีมาก ๆ:
1. **เรื่องความปลอดภัย (RBAC):** Middleware วางไว้แน่นหนามาก ทั้งเช็ค Token, เช็ค Role (IT_STAFF, ADMINISTRATOR) และดัก `mustChangePassword` ตัดสิทธิ์ Requester ด้วย 403 และ Unauth ด้วย 401 ถูกต้องตามสเปกเลย
2. **UX การค้นหาและตัวกรอง:** ชอบที่มี Debounced Search (250ms) ช่วยลดโหลดเซิร์ฟเวอร์ และมีปุ่มสลับ Segment (`All`, `Unassigned`, `Assigned to Me`) ใช้งานง่ายมาก แถมเขียนดัก `setCurrentPage(1)` ตอนเปลี่ยนฟิลเตอร์ไว้ทุกจุด ทำให้ไม่มีปัญหาเรื่องหน้าว่างเลย เก่งมาก ๆ
3. **Responsive Design:** ทำการแสดงผลแยกได้ดีมาก บนคอมเป็นตาราง High-density Table พอเปิดบนมือถือเปลี่ยนเป็น Card Stack อ่านง่ายสุด ๆ
4. **Priority Sorting:** การเรียงลำดับ `itPriority` ทำงานสัมพันธ์กับ Enum ใน Postgres ได้ถูกต้อง ดึง `URGENT` ขึ้นก่อน `HIGH` ได้ตรงตามจริง
5. **Test ครบถ้วน:** มีเทสทั้งหลังบ้าน 16 ตัว และหน้าบ้าน 7 ตัว ผ่าน 100% เลย

### มีข้อแนะนำเล็ก ๆ น้อย ๆ เผื่อไว้ปรับต่อยอดในอนาคตนะ
- **เรื่องการตรวจ Param หลังบ้าน:** ใน `staff.routes.ts` ตอนนี้ถ้ามีคนส่งค่าที่ไม่ตรง Enum (เช่น `?status=XYZ`) ระบบจะมองข้ามแล้วคืนตั๋วทั้งหมด ถ้าในอนาคตอยากให้ Strict ขึ้นตามหลัก REST อาจจะพิจารณาตอบเป็น `400 Bad Request` แจ้งเตือนผู้ใช้ได้จ้า
- **จุดไข่ปลา `...` ในปุ่มเปลี่ยนหน้า:** ถ้าตั๋วมีหลายหน้ามาก ๆ (เช่น 15-20 หน้า) ปุ่มมันจะกระโดดข้ามเลข เช่น `[1] [9] [10] [11] [20]` ถ้ามีสัญลักษณ์ `...` คั่นตรงกลางจะดูเนี๊ยบและชัดเจนขึ้นอีกนิดนึงน้า

โดยรวมคือโค้ดคุณภาพดีมาก สะอาด เป็นระเบียบ และครบตามโจทย์แล็บ 3 ทุกอย่างเลย **เรากด Approve ให้เรียบร้อยแล้วน้า เดี๋ยวเรากด Merge เข้า `lab3-staging` ให้เลย


---

## 5.6 PR #50: Issue 21: IT Staff Ticket Operations & Detail
- **Pull Request Link:** [lmaybelgracel/TokTickit#50](https://github.com/lmaybelgracel/TokTickit/pull/50)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `f63cc9c`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ✅ Approved by @titayaaa (2026-09-17)

ตรวจทานโค้ดและชุดทดสอบของ PR #50 (Issue 21: IT Staff Ticket Operations & Detail) เรียบร้อยแล้วน้า ละเอียด ครบถ้วน และครอบคลุมตามโจทย์ Lab 3 ดีมาก ๆ เลย! ขอสรุปผลการรีวิวแยกเป็นข้อ ๆ ให้ตามนี้นะ

### 🌟 1. จุดเด่นที่ทำได้ดีมาก (Highlights & Strengths)
1. **ระบบ Dual-stream Communication และความปลอดภัยของข้อมูล (BR-13 & AC-05):**
   - แยกเส้นทางระหว่าง Public Comments (`/api/tickets/:id/comments`) กับ Internal Notes (`/api/tickets/:id/notes`) ชัดเจนมาก
   - มี Guard ป้องกันความปลอดภัยอย่างแน่นหนา โดย Requester ที่พยายามเข้าถึงหรือแอบยิงขอ Internal Notes จะถูกบล็อกด้วย `403 Forbidden` ทันที และหน้าตั๋วฝั่ง Requester ไม่มีการส่ง Internal Notes หลุดออกไปเลย
   - ตรวจสอบสิทธิ์ของ Requester ให้คอมเมนต์ได้เฉพาะตั๋วที่ตัวเองเป็นเจ้าของเท่านั้น (`ticket.requesterId === req.user.id`) ป้องกัน Cross-requester comment ได้สมบูรณ์

2. **IT Staff Ticket Operations & State Transition Matrix (BR-19, BR-20):**
   - **Claim Ticket:** จัดการเปลี่ยนสถานะจาก `NEW` ไปเป็น `OPEN` อัตโนมัติเมื่อกด Claim พร้อมผูก `ownerId` เข้ากับเจ้าหน้าที่ได้อย่างถูกต้อง
   - **Assign Ticket:** มี Validation ดักจับชัดเจนว่า User ปลายทางต้องเป็น Active และต้องมี Role เป็น `IT_STAFF` หรือ `ADMINISTRATOR` เท่านั้น
   - **Status Transition Guard:** ปฏิบัติตาม Transition Matrix อย่างเคร่งครัด และบล็อกไม่ให้เปลี่ยนสถานะเป็น `RESOLVED` ผ่าน endpoint ปกติ โดยบังคับส่ง `422 Unprocessable Entity` เพื่อให้ต้องปิดผ่าน `/resolve` เท่านั้น
   - **Resolution Workflow:** การ Resolve ตั๋วบังคับใส่ `resolutionSummary` ความยาว 3–500 ตัวอักษรอย่างรัดกุม

3. **UX/UI & Design System:**
   - หน้ารายละเอียดตั๋วฝั่ง IT (`StaffTicketDetail.tsx`) สวยงาม ตรงตามธีม **Zen Green** (`#006B3C`, `#EAF6EF`)
   - ออกแบบแยกสีกล่องข้อความชัดเจนมาก:
     - **Public Comments:** กล่องสีเขียวอ่อน `#EAF6EF`
     - **Internal Notes:** กล่องสีเหลืองอำพัน `#FFF8E1` พร้อมไอคอนแม่กุญแจ 🔒 และป้ายแจ้งเตือนว่าเป็นข้อความลับเฉพาะ Staff
   - หน้าต่าง Modal ปิดงาน (Resolve) มีตัวนับตัวอักษรแบบ Real-time (3–500 ตัวอักษร) พร้อม Validation แจ้งเตือนผู้ใช้ชัดเจน
   - หน้าตั๋วฝั่ง Requester (`TicketDetail.tsx`) มีปุ่มและ Banner แสดงสถานะ "Problem Appears Resolved" ตาม BR-21 ครบถ้วน

4. **Test Coverage & Quality:**
   - ชุดทดสอบ Integration ฝั่ง Server ครอบคลุมมาก ทั้ง `staff-ticket-detail.api.test.ts` (16 เคส) และ `comments-notes.api.test.ts` (12 เคส) รวมทั้งมี Mock Prisma ดักเคส Error ครบ
   - ฝั่ง Frontend มี Component Test ใน `StaffTicketDetail.test.tsx` (8 เคส) และรัน build ผ่านฉลุย 100%

---

### 💡 2. ข้อสังเกตเล็กน้อย (Optional / Minor Polish)
- ใน `comments.routes.ts` ตอนนี้เช็ก `content.trim() === ""` ได้ดีแล้ว ถ้าอยากให้เป๊ะตาม BR-15 แบบ 100% อาจจะเพิ่มเงื่อนไขตรวจความยาวสูงสุด `content.trim().length > 2000` อีกนิดหน่อยในอนาคตได้จ้า (แต่เท่านี้ก็ครอบคลุมและปลอดภัยมากแล้ว)

---

### 🎯 สรุปผลการตรวจ (Verdict)
โครงสร้างโค้ดสะอาด เป็นระเบียบ แยกสิทธิ์ถูกต้องตามเกณฑ์ และเทสผ่านครบถ้วนทั้งหมด ไม่มีจุดติดขัดเลย เรา **Approve** ให้เรียบร้อย


---

## 5.7 PR #51: Issue 22: Administrator User Management
- **Pull Request Link:** [lmaybelgracel/TokTickit#51](https://github.com/lmaybelgracel/TokTickit/pull/51)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `a3c72a4`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ✅ Approved by @titayaaa (2026-09-17)

เราลองไล่เช็กโค้ดให้แบบละเอียดทั้งหน้าบ้าน หลังบ้าน แล้วก็ลองรันเทสต์ดูให้หมดแล้วนะ ทำออกมาดีมากก เก็บเงื่อนไขของแล็บนี้ครบเลย!

### จุดที่ชอบมากๆ 

- **เรื่องสิทธิ์และความปลอดภัย:** กันไว้ดีมาก คนที่ไม่ใช่ Admin หรือยังไม่เปลี่ยนรหัสผ่านเข้าไม่ได้เลย
- **Business Rules เป๊ะมาก:**
  - ลองเช็กเคสกันแอดมินปิดบัญชีตัวเอง (deactivate) หรือเปลี่ยน role ตัวเองออก ก็ดักไว้ได้ถูกต้อง (ขึ้น 400)
  - มีนับเช็กแอดมินคนสุดท้ายในระบบด้วย กันไม่ให้เผลอไปปิดหรือลดบทบาทแอดมินคนสุดท้าย
  - เช็กอีเมลซ้ำแบบไม่สนตัวพิมพ์เล็ก-ใหญ่ (case-insensitive) ทั้งตอนสร้างใหม่และตอนกดแก้ข้อมูล แล้วคืน 409 ถูกต้องเลย
- **หน้าบ้าน (UI):**
  - มี checklist เช็กความยากของรหัสผ่านแบบเรียลไทม์ ปุ่มจะกดไม่ได้ถ้ายังไม่ครบ 4 ข้อ ช่วยกันกรอกผิดได้ดีเลย
  - หน้าจอ responsive ทั้งในคอมและในมือถือ มีป้าย `(You)` บอกชัดเจนว่าแถวไหนเป็นตัวเอง
  - ใน modal แก้ไขข้อมูล มี disable ช่อง role กับ active ไว้ให้อัตโนมัติถ้าเป็นบัญชีตัวเอง ดีมากเลย user จะได้ไม่งง

### มีแนะนำนิดเดียวน้า (ไม่กระทบโค้ด) 

- ในคำอธิบาย PR มีเขียนติดคำว่า `department` กับเช็ก `symbol` ในรหัสผ่านมาด้วย แต่ในโค้ดจริงทำถูกแล้วนะ (ไม่มี department และรหัสผ่านเช็ก 4 ข้อตามโจทย์เป๊ะ) น่าจะเป็นข้อความที่ติดมาจากดราฟต์แรกเฉย ๆ
- ปุ่ม Reset Password ในตาราง ตอนนี้ยังกดรีเซ็ตให้ตัวเองได้อยู่ (ซึ่งระบบก็ทำงานได้ปกตินะ แค่จะบังคับให้เปลี่ยนรหัสผ่านรอบหน้า) ถ้าในอนาคตอยากให้เนียนขึ้น ค่อยไปปิดปุ่มนี้ตรงแถวที่เป็น `(You)` ก็ได้จ้า

### ผลการเทสต์ 

- เทสต์หลังบ้าน 26 เคส ผ่านหมด 100%
- เทสต์หน้าบ้าน 8 เคส ผ่านหมด 100%
- บิลด์ผ่าน ไม่มี error อะไรเลย

 ทุกอย่างเรียบร้อยและปลอดภัยดีมากก กด Approve ให้แล้วนะ


---

## 5.8 PR #52: Issue 23: Automated Testing Suite
- **Pull Request Link:** [lmaybelgracel/TokTickit#52](https://github.com/lmaybelgracel/TokTickit/pull/52)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `15194b5`)
- **Approval Date:** 2026-09-17

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @titayaaa (2026-09-17)

เราลองไล่ตรวจโค้ดแบบเจาะลึกระดับ Line-by-line และลองเทียบ Route กับ Test Logic ให้ใหม่อีกรอบนะ เจอจุดที่ควรปรับปรุงเพื่อความสมบูรณ์แบบของโปรเจกต์

### ⚠️ จุดบกพร่องและข้อควรแก้ไข (Technical Issues)

1. **Endpoint ใน `authorization.api.test.ts` ยิงผิดเส้น:**
   - ตรงเทสต์ Unauthenticated มีบรรทัด `await request(app).get("/api/staff/queue")`
   - ในโค้ดจริง Endpoint ของคิวงานคือ `/api/staff/tickets` (ไม่มีเส้น `/queue`) ที่เทสต์นี้ผ่านเพราะ middleware `requireAuth` ตัด 401 ก่อนถึง Route Matching ถ้าส่ง token เข้าไปจะติด 404 แนะนำให้แก้ Path ให้ตรงเป็น `/api/staff/tickets` น้า

2. **มีไฟล์เทสต์ซ้ำซ้อนกัน 2 คู่ (Duplicate Files):**
   - ฝั่ง Server: มีทั้ง `admin-users.api.test.ts` (จาก PR #51) และ `users-admin.api.test.ts` (จาก PR #52)
   - ฝั่ง Client: มีทั้ง `AdminUserManagement.test.tsx` (จาก PR #51) และ `UserManagement.test.tsx` (จาก PR #52)
   - ทั้ง 4 ไฟล์นี้เทสต์คอมโพเนนต์และ API เดียวกันเป๊ะ น่าจะเกิดจากการสลับชื่อคำ แนะนำให้เลือกรวมไฟล์หรือลบตัวที่ซ้ำออก จะได้ไม่งงและลดเวลาการรัน CI จ้า

3. **Assertion ตกหล่นใน `UserManagement.test.tsx`:**
   - ใน `UI-ADMIN-02` เทสต์กรอกรหัสผ่านเพื่อเช็กสี Checklist แต่ยังไม่ได้กด Submit เพื่อ `expect(api.createAdminUser).toHaveBeenCalled()`
   - ในไฟล์นี้ยังไม่มีเคสสำหรับทดสอบ Modal Reset Password เลยจ้า

4. **ขาดกฎ `BR-08` ใน `users-admin.api.test.ts`:**
   - มีเทสต์ ADM-01 (BR-10), ADM-02 (BR-07), ADM-03 (BR-09), ADM-04 (Password Reset) แต่ตกหล่นเคส **BR-08 (ห้าม Admin demote ตัวเอง)** ไปน้า

5. **Behavior ของ `useEffect` ใน `App.tsx`:**
   - ตัว `useEffect` ที่สลับ View ตาม Role ทำงานได้ดีตอนล็อกอิน แต่ถ้าผู้ใช้กำลังเปิดหน้าอื่นอยู่ (เช่น กำลังดู Ticket Detail หรือ Create Ticket) แล้วเกิด Refresh หน้าจอ ตัวนี้จะดีดกลับไปหน้าเริ่มต้นของ Role เสมอจ้า

ฝากเพื่อนลองดู 5 จุดนี้หน่อยน้า ถ้าแก้จุด Endpoint ผิดในข้อ 1 กับเก็บตกพวกไฟล์ซ้ำในข้อ 2 ได้ ชุดเทสต์จะคลีนและสมบูรณ์กว่าเดิม

#### ✅ Approved by @titayaaa (2026-09-17)

ตรวจทานโค้ดใน commit `7347855` ให้เรียบร้อยแล้วน้า แก้ไขได้ตรงจุดและเก็บรายละเอียดครบถ้วนดีมากเลย

- แก้ Endpoint ใน `authorization.api.test.ts` ได้ถูกต้องตรงกับ Route จริง
- เคลียร์ไฟล์เทสต์ที่ซ้ำซ้อนออกแล้ว ชุดเทสต์สะอาดขึ้นเยอะและ Traceability ครบถ้วน
- การเก็บ View state ลง `sessionStorage` ใน `App.tsx` ช่วยแก้ปัญหาหน้าหลุดตอน Refresh ได้ดีมาก

ผลเทสต์ผ่านครบทุกตัว งานเรียบร้อยสมบูรณ์ กด Approve ให้เรียบร้อยแล้วน้า

#### 💬 Comment / Response by @lmaybelgracel (2026-09-17)

@titayaaa ขอบคุณสำหรับการตรวจสอบอย่างละเอียด ได้ดำเนินการปรับปรุงแก้ไขครบทั้ง 5 จุดตามคำแนะนำเรียบร้อยแล้ว:

1. **แก้ไข Endpoint ใน `authorization.api.test.ts`:**
   - ปรับเส้นทางจาก `/api/staff/queue` เป็น `/api/staff/tickets` ให้ตรงกับ implementation จริงของระบบ

2. **ลบไฟล์ทดสอบที่ซ้ำซ้อน:**
   - ลบ `server/tests/lab-03/users-admin.api.test.ts` และ `client/src/__tests__/lab-03/UserManagement.test.tsx`
   - รวมการทดสอบทั้งหมดและการตรวจสอบย้อนกลับ (Traceability ADM-01 ถึง ADM-04 และ UI-ADMIN-01 ถึง UI-ADMIN-03) ไว้ที่ `admin-users.api.test.ts` และ `AdminUserManagement.test.tsx` ที่มีความครอบคลุมมากกว่า (รวม 26 backend tests + 8 frontend tests)
   - อัปเดต `docs/lab-03/tests.md` ให้ระบุตำแหน่งไฟล์ทดสอบที่ถูกต้อง

3. & 4. **ความครอบคลุมของ BR-08, Password Reset และ Modal Form Submit:**
   - ได้รับการครอบคลุมอย่างสมบูรณ์ใน `admin-users.api.test.ts` (มีทั้งเคส BR-08 ป้องกันการ demote ตนเอง, เคส BR-07, BR-09, BR-10 และ Reset Password API)
   - ครอบคลุมใน `AdminUserManagement.test.tsx` (มีทั้งการ submit form สร้างผู้ใช้ใหม่, การเปิดและ submit modal reset password)

5. **การจัดการ View และการคงสถานะเมื่อ Refresh หน้าจอใน `App.tsx`:**
   - บันทึกและดึงสถานะ view รวมถึง `selectedTicketId` ผ่าน `sessionStorage` ทำให้เมื่อผู้ใช้อยู่ในหน้า Ticket Detail หรือ Create Ticket แล้วทำการ Refresh หน้าจอ ระบบจะยังคงแสดงหน้านั้นอยู่โดยไม่ถูกรีเซ็ตกลับ
   - เมื่อทำการล็อกอินใหม่ ระบบจะนำผู้ใช้เข้าสู่หน้าเริ่มต้นที่ถูกต้องตาม Role โดยอัตโนมัติ (Administrator เข้าสู่ User Management, IT Staff เข้าสู่ Staff Queue, Requester เข้าสู่ My Tickets)

ผลการทดสอบ:
- Server: 119/119 ผ่าน (7 ไฟล์)
- Client: 31/31 ผ่าน (5 ไฟล์)
- E2E (Playwright): 3/3 ผ่าน


---

## 5.9 PR #53: feat(lab-03): UI style checking and responsive visual evidence (Issue #43)
- **Pull Request Link:** [lmaybelgracel/TokTickit#53](https://github.com/lmaybelgracel/TokTickit/pull/53)
- **Author:** Maybel Grace (`@lmaybelgracel`)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **Status:** ✅ Merged into `lab3-staging` (Commit `041bd12`)
- **Approval Date:** 2026-09-18

### 💬 Peer Review & Author Response History (Verbatim)

#### ⚠️ Changes Requested by @titayaaa (2026-09-18)

เราไล่เช็กโค้ด Diff ของ PR #53 แบบละเอียดเจาะลึกทุกบรรทัด ทั้งตัวสเปกเทสต์และหลักฐานรูปภาพให้แล้วน้า โดยรวมทำโครงสร้าง E2E และ Viewports ได้ดีมาก แต่พบจุดบกพร่องและจุดที่ตัวเลขไม่ตรงกัน 4 จุด อยากให้ปรับแก้ให้เป๊ะก่อน Merge :

### ⚠️ จุดที่ต้องปรับปรุงและแก้ไข (Review Findings)

1. **[Logic / Mock Risk] เทสต์ Empty State ใน `visual-evidence.spec.ts` (บรรทัดที่ 306):**
   - ในหัวข้อ `2.6 Empty State View` มีการเซ็ต `currentTickets = []` และกรอกคำค้นหา `NonExistentQueryXYZ`
   - แต่ใน `page.route("**/api/staff/tickets")` ด้านบนไม่ได้ตรวจสอบ Query Parameter `search` จาก Request URL เลย ทำให้มีความเสี่ยงที่ตัว Mock จะไม่ตอบสนองต่อการค้นหาจริง
   - **แนะนำ:** ปรับให้ Route Handler ตรวจสอบ `if (url.searchParams.get("search")) return json({ tickets: [], pagination: { total: 0, ... } });` เพื่อให้ได้หน้า Empty State ที่ถูกต้องตามพฤติกรรมจริง 100%

2. **[Mismatch] ยอดจำนวนรูปภาพใน PR Description ไม่ตรงกับโค้ดจริง:**
   - ใน PR Description เขียนว่า *"Total 24 visual artifact screenshots generated"*
   - แต่ในไฟล์ `visual-evidence.spec.ts` มีการเรียก `page.screenshot` ทั้งหมด **28 จุด (28 รูปภาพ)**:
     - Authentication: 8 รูป
     - Staff Queue: 6 รูป
     - Staff Ticket Detail: 7 รูป
     - User Management: 7 รูป
   - ฝากแก้ตัวเลขสรุปใน PR Description ให้เป็น **28 รูปภาพ** ให้ตรงกับความเป็นจริงด้วยน้า

3. **[Missing Docs] ยังไม่ได้บันทึก Issue 24 ลงใน `docs/lab-03/reviewer.md`:**
   - ในเอกสาร `reviewer.md` บันทึกไว้ถึง Issue 23 (PR #52) แต่ยังขาดหัวข้อบันทึกของ **Issue 24 (PR #53)**
   - ฝากเพิ่ม Scope Delivered และรายละเอียดของ PR #53 ลงใน Section 1 ของ `reviewer.md` ด้วยนะ

4. **[Code Quality] หลีกเลี่ยงการใช้ `waitForTimeout` (บรรทัดที่ 309):**
   - มีการใช้ `await page.waitForTimeout(400);` เพื่อรอ Debounce
   - แนะนำให้ใช้ Web-first assertion เช่น `await expect(page.getByText(/No tickets found/i)).toBeVisible();` หรือรอ selector ของ Empty State แทนการ Hardcode เวลา เพื่อป้องกัน Flaky test ตอนรันบน CI 

ฝากเก็บตก 4 จุดนี้หน่อยน้า ถ้าแก้เสร็จแล้ว Push ขึ้นมาใหม่ เดี๋ยวเรามาตรวจซ้ำแล้วกด Approve ให้

#### ✅ Approved by @titayaaa (2026-09-18)

### Peer Review: Approved (PR #53)

เราตรวจทานโค้ดและเอกสารที่แก้ไขเพิ่มเติมใน commit `6768c06` ครบถ้วนทุกจุดแล้ว:

1. **Mock Route Search Query:** ใน `visual-evidence.spec.ts` มีการตรวจสอบ `url.searchParams.get("search")` สำหรับเคส `NonExistentQueryXYZ` อย่างถูกต้อง และส่งคืนตั๋วว่างสอดคล้องตามพฤติกรรมจริง
2. **Web-first Assertion:** ลบ `page.waitForTimeout` ออกเรียบร้อย และเปลี่ยนมาใช้ `expect(...).toBeVisible()` เพื่อป้องกัน Flaky test ตามมาตรฐาน Playwright
3. **Traceability & Docs:** บันทึก Issue 24 ลงในตารางและเนื้อหาของ `docs/lab-03/reviewer.md` เรียบร้อย เนื้อหาครบถ้วนชัดเจน
4. **Screenshot Count Alignment:** ตัวเลขสรุปหลักฐานภาพถ่าย 28 รูปภาพในเอกสารตรงกับจุดที่เรียกแคปภาพจริงในสเปกเทสต์ทั้งหมด

โค้ดและเอกสารมีคุณภาพสูง สมบูรณ์แบบทุกจุด approve !!

#### 💬 Comment / Response by @lmaybelgracel (2026-09-18)

ได้ดำเนินการแก้ไขและเก็บตกรายละเอียดครบทั้ง 4 จุดตามข้อเสนอแนะในการ Review เรียบร้อยแล้ว ใน commit 6768c06:

1. [Logic / Mock Risk] ตรวจสอบ Query Parameter ใน visual-evidence.spec.ts:
   - อัปเดต Route Handler **/api/staff/tickets ให้ตรวจสอบ url.searchParams.get(search) เมื่อมีการกรอกคำค้นหา NonExistentQueryXYZ หรือ currentTickets ว่างเปล่า จะส่งคืนผลลัพธ์รายการตั๋วว่าง { tickets: [], pagination: { total: 0, ... } } เพื่อให้สอดคล้องกับพฤติกรรมจริงของ API

2. [Mismatch] ปรับยอดจำนวนรูปภาพใน PR Description และ Docs:
   - แก้ไขจำนวนสรุปในเอกสารให้ตรงกับไฟล์อาร์ติแฟกต์จริงที่ถูกสร้างขึ้นทั้งหมด 28 รูปภาพ (Authentication: 8, Staff Queue: 6, Staff Ticket Detail: 7, User Management: 7)

3. [Missing Docs] บันทึกประวัติการ Review ลงใน docs/lab-03/reviewer.md:
   - เพิ่มรายการ Issue 24 (PR #53) ลงในตาราง Section 1 ของ docs/lab-03/reviewer.md พร้อมรายละเอียดสรุปผลการรีวิว รายการข้อเสนอแนะ และแนวทางการแก้ไขเรียบร้อยแล้ว

4. [Code Quality] เปลี่ยน waitForTimeout เป็น Web-first Assertion:
   - ปรับแก้ใน visual-evidence.spec.ts โดยยกเลิกการใช้ page.waitForTimeout(400) และเปลี่ยนมาใช้ Web-first auto-retrying assertion await expect(page.getByText(/No tickets found/i)).toBeVisible() แทน เพื่อป้องกัน Flaky test

ทำการ Push ขึ้นกิ่ง feature/24-ui-style-checking เรียบร้อย รบกวนตรวจทานรอบใหม่และอนุมัติ PR เพื่อดำเนินการ Merge เข้า lab3-staging ต่อไป

