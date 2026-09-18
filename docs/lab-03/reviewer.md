# Sprint 3 Peer Review Record: TokTickIT Users, Roles, IT Staff Ticketing, and Admin Screens

## 1. Review Information & Master PR Table
- **Repository:** `titayaaa/toktickit`
- **Author:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Peer Reviewer:** GitHub: `@chanya06` (https://github.com/chanya06)
- **Target Branch:** `lab3-staging` (and subsequently `main`)

| PR # | Feature / Issue Title | GitHub Issue | Feature Branch | Target | Reviewer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **[PR #52](https://github.com/titayaaa/toktickit/pull/52)** | Issue 17: Sprint 3 Engineering Contract & Specification | Issue #42 | `feature/17-spec-and-tests` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #53](https://github.com/titayaaa/toktickit/pull/53)** | Issue 18: Database Migration, Schema Evolution & Seed Data | Issue #43 | `feature/18-db-and-seed` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #54](https://github.com/titayaaa/toktickit/pull/54)** | Issue 19: Authentication & Authorization Backend API | Issue #44 | `feature/19-auth-api` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #55](https://github.com/titayaaa/toktickit/pull/55)** | Issue 20: Login & Mandatory Password Change UI | Issue #45 | `feature/20-login-ui` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #56](https://github.com/titayaaa/toktickit/pull/56)** | Issue 21: IT Staff Ticket Queue API & Query System | Issue #46 | `feature/21-staff-queue-api` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #57](https://github.com/titayaaa/toktickit/pull/57)** | Issue 22: IT Staff Ticket Queue UI & Dashboard | Issue #47 | `feature/22-staff-queue-ui` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #58](https://github.com/titayaaa/toktickit/pull/58)** | Issue 23: Ticket Operations, Ownership & Notes API | Issue #48 | `feature/23-ticket-ops-api` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #59](https://github.com/titayaaa/toktickit/pull/59)** | Issue 24: IT Staff Ticket Operations & Confidential Notes UI | Issue #49 | `feature/24-ticket-ops-ui` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #60](https://github.com/titayaaa/toktickit/pull/60)** | Issue 25: Administrator User Management API & UI | Issue #50 | `feature/25-admin-user-management` | `lab3-staging` | `@chanya06` | ✅ Merged |
| **[PR #61](https://github.com/titayaaa/toktickit/pull/61)** | Issue 26: E2E Testing, Visual Inspection & Final Release | Issue #51 | `feature/26-e2e-and-release` | `lab3-staging` | `@chanya06` | 🟡 In Review |

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

# Part 1: Submitted PR Review Evidence (เพื่อนตรวจเรา — @chanya06 ตรวจ @titayaaa)

### 1. PR #52: Issue 17 - Sprint 3 Engineering Contract & Specification
- **Pull Request:** [PR #52](https://github.com/titayaaa/toktickit/pull/52)
- **Branch:** `feature/17-spec-and-tests`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
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
> ---
> 
> ### 💡 ข้อเสนอแนะเล็กน้อยก่อน Merge (Minor Suggestions)
> 1. **เพิ่มหัวข้อ `Assumptions and Decisions`**: เพื่อให้ตรงตามตารางข้อกำหนดใน Handout (หน้า 13) เสนอให้เพิ่มหัวข้อ `10. Assumptions and Decisions` ใน `specification.md` (เช่น เรื่องการเลือกใช้ bcrypt, การเก็บ Session ด้วย HTTP-only cookie, และการ default ค่า `itPriority = requestedPriority`)
> 2. **Clarification เรื่อง Reopen Ticket**: หากตั๋วถูกเปิดใหม่อีกครั้ง (`RESOLVED` -> `REOPENED` -> `IN_PROGRESS`) อาจระบุเพิ่มเติมใน Spec ว่า `resolutionSummary` จะถูกคงไว้เป็นประวัติ หรือถูกเคลียร์ค่าเป็น `null` จนกว่าจะ Resolve อีกครั้ง
> 3. **อัปเดต PR Link ใน `reviewer.md`**: บรรทัดที่ 9 สามารถอัปเดตจาก `[PR # (Pending Open)]` เป็น `[PR #52](https://github.com/titayaaa/toktickit/pull/52)`

#### Author Responses & Revisions (@titayaaa):
> ขอบคุณสำหรับคำแนะนำน้า เราได้อัปเดตเพิ่ม Section 10 Assumptions and Decisions, ชี้แจงเรื่อง Reopen ticket และอัปเดต PR #52 ลงใน reviewer.md ให้เรียบร้อยแล้ว

#### Final Approval:
- **Status:** ✅ Approved by `@chanya06`
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #52]*

---

### 2. PR #53: Issue 18 - Database Migration, Schema Evolution & Seed Data
- **Pull Request:** [PR #53](https://github.com/titayaaa/toktickit/pull/53)
- **Branch:** `feature/18-db-and-seed`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> มีข้อเสนอแนะ 3 ประเด็นสำคัญที่แนะนำให้ปรับปรุงเพิ่มเติมก่อน Merge:
> 
> 1. **Backfill `userId` และ `itPriority` สำหรับตั๋วเดิม**:
>    ใน `seed.ts` แนะนำให้เพิ่มการอัปเดตตั๋วเดิมจาก Lab 2 โดยผูก `ticket.userId` เข้ากับ `user.id` ตามอีเมลของ Requester และตั้งค่าเริ่มต้นให้ `itPriority = requestedPriority` ตามกฎ BR-07 เพื่อป้องกันไม่ให้ `ticket.requester` เป็น `null`
> 2. **Seed ข้อมูล Ticket, Public Comments และ Internal Notes**:
>    ตาม Handout Section 5.3 กำหนดให้มีตัวอย่าง Realistic Tickets, Public Comments และ Internal Notes ใน Seed Data ด้วย แนะนำให้เพิ่มข้อมูลตัวอย่างเหล่านี้ใน `seed.ts`
> 3. **Commit Prisma Migration File**:
>    อย่าลืมรัน `npx prisma migrate dev --name lab3_users_and_workflow` เพื่อสร้างและ Commit ไฟล์ Migration ลงใน `server/prisma/migrations/` ให้ครบถ้วน

#### Author Responses & Revisions (@titayaaa):
> เราได้เพิ่ม Backfill userId & itPriority, เพิ่มข้อมูลตัวอย่าง Ticket/Public Comments/Internal Notes, และ commit ไฟล์ Prisma Migration ลง server/prisma/migrations/ ให้เรียบร้อยแล้ว รบกวนตรวจอีกครั้งให้หน่อยน้า

#### Final Approval (@chanya06):
> ## 🟢 Peer Review: Approved (PR #53)
> 
> ตรวจทานการแก้ไขและเพิ่มเติมใน PR #53 เรียบร้อยแล้ว:
> 1. **Backfill Complete**: เพิ่มการเชื่อมโยง `userId` ให้ตั๋วเดิมจาก Lab 2 และตั้งค่า `itPriority = requestedPriority` ตามกฎ BR-07 เรียบร้อย
> 2. **Realistic Seed Data**: เพิ่มตัวอย่างตั๋วสถานะ `IN_PROGRESS` และ `RESOLVED` พร้อมตัวอย่าง Public Comments และ Internal Notes ครบตามเกณฑ์ Handout Section 5.3
> 3. **Prisma Migration**: เพิ่มไฟล์ SQL migration ใน `server/prisma/migrations/20260917000000_lab3_users_and_workflow/` เรียบร้อย เป็น Idempotent ปลอดภัย
> 4. **Test Coverage**: เพิ่มการตรวจสอบความถูกต้องของการ Backfill และ Relation ของ Comments/Notes ใน `db-seed.test.ts` อย่างรัดกุม
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #53]*

---

### 3. PR #54: Issue 19 - Authentication & Authorization Backend API
- **Pull Request:** [PR #54](https://github.com/titayaaa/toktickit/pull/54)
- **Branch:** `feature/19-auth-api`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> ## 🟢 Peer Review: Approved (PR #54)
> 
> ตรวจทานโค้ดและชุดทดสอบของ Issue 19 (Authentication & Authorization Backend API) เรียบร้อยแล้ว
> 
> ### 🌟 จุดเด่นที่ทำได้ดี:
> 1. **Security Design**: ป้องกัน Account Enumeration โดยคืนค่า 401 ข้อความเดียวกันสำหรับบัญชีที่ไม่มีอยู่หรือถูกปิดการใช้งาน (`isActive = false`)
> 2. **Password Complexity & Hashing**: ใช้ `bcrypt` 10 rounds และ Regex ตรวจสอบความซับซ้อนตามกฎ BR-04 ครบถ้วน พร้อมเช็คห้ามตั้งรหัสผ่านซ้ำเดิม
> 3. **Flexible Middleware**: รองรับทั้ง HTTP-only Cookie และ Bearer Token Header พร้อมมี Guard บล็อกผู้ใช้ที่ต้องเปลี่ยนรหัสผ่าน (`mustChangePassword = true`) ตามกฎ BR-02
> 4. **Comprehensive Tests**: มี Test Coverage ทั้งกรณี Login, Logout, Change Password, Inactive Users, และ Role-based Access Control ทั้ง 3 บทบาท (12 tests)
> 
> ### 💡 ข้อเสนอแนะเล็กน้อย:
> - อัปเดตลิงก์ PR ใน `docs/lab-03/reviewer.md` จาก Placeholder เป็น `[PR #54](https://github.com/titayaaa/toktickit/pull/54)`

#### Author Responses & Revisions (@titayaaa):
> เราอัปเดตลิงก์ PR #54 ลงใน reviewer.md เรียบร้อยแล้วน้า ฝากเข้ามาเช็กแล้วกดปุ่ม Merge รวมเข้า lab3-staging ให้หน่อย ขอบคุณมาก

#### Final Approval:
> ตรวจสอบข้อมูลใน reviewer.md เรียบร้อย ฉันลืมกด approve แต่ฉันกด Merge ให้แล้ว
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #54]*

---

### 4. PR #55: Issue 20 - Login & Mandatory Password Change UI
- **Pull Request:** [PR #55](https://github.com/titayaaa/toktickit/pull/55)
- **Branch:** `feature/20-login-ui`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> ### Peer Review Comments
> **Peer Review: Approved (PR #55)**
> ตรวจทานโค้ดและทดสอบ UI ของ Issue 20 (Login & Mandatory Password Change UI) เรียบร้อยแล้ว
> - จุดเด่น: สไตล์ Zen Green สอดคล้องตาม Tokens, Checklist ตรวจสอบความซับซ้อนของรหัสผ่านแบบเรียลไทม์ 4 ข้อ, Authentication Gate ดักจับหน้าจอ Login / Change Password / Main App ตาม Session ได้อย่างรัดกุม, มี Unit Test 7 เคสและไม่เกิด Regression ต่อ UI เดิมของ Lab 1 & 2
> - บันทึกผลการตรวจทานเรียบร้อย โค้ดผ่านการตรวจโดยไม่มีข้อทักท้วงเพิ่มเติม
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #55]*

---

### 5. PR #56: Issue 21 - IT Staff Ticket Queue API & Query System
- **Pull Request:** [PR #56](https://github.com/titayaaa/toktickit/pull/56)
- **Branch:** `feature/21-staff-queue-api`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> ## 🟢 Peer Review: Approved (PR #56)
> 
> ตรวจทานโค้ดและชุดทดสอบของ Issue 21 (IT Staff Ticket Queue API & Query System) เรียบร้อยแล้ว
> 
> ### 🌟 จุดเด่นที่ทำได้ดี:
> 1. **Query Capabilities**: รองรับการค้นหา (Search case-insensitive), กรองข้อมูลครอบคลุมทั้ง Category, Status (ทุก Enum), Priority, IT Priority, และ Owner Assignment (`unassigned`, `me`, numeric ID)
> 2. **Weighted Priority Sorting**: ออกแบบการจัดเรียงตามระดับความสำคัญจริง (`URGENT > CRITICAL > HIGH > MEDIUM > LOW`) แทนการเรียงตามตัวอักษร
> 3. **Backward Compatibility**: จัดการ Fallback ข้อมูล Requester ของตั๋วเดิมได้อย่างไร้รอยต่อ พร้อมแนบตัวนับ Comments, Notes, และ Attachments
> 4. **Security & Validation**: มี Guard ตรวจสอบ Role และ Password Rotation อย่างรัดกุม พร้อมส่ง 400 Bad Request เมื่อ Query Parameters ไม่ถูกต้อง
> 5. **Test Coverage**: ชุด Integration Tests 9 เคสใน `staff-queue.api.test.ts` ครอบคลุมทุก Scenario สำคัญ
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #56]*

---

### 6. PR #57: Issue 22 - IT Staff Ticket Queue UI & Dashboard
- **Pull Request:** [PR #57](https://github.com/titayaaa/toktickit/pull/57)
- **Branch:** `feature/22-staff-queue-ui`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> ## 🟢 Peer Review: Approved (PR #57)
> 
> ตรวจทานโค้ดและทดสอบ UI ของ Issue 22 (IT Staff Ticket Queue UI & Dashboard) เรียบร้อยแล้ว
> 
> ### 🌟 จุดเด่นที่ทำได้ดีมาก:
> 1. **Zen Green UI & Responsive Representation**: 
>    - แสดงผล Desktop/Tablet ด้วย High-Density Data Table พร้อม Monospace Ticket Link สีเขียว `#006B3C`
>    - สลับเป็น Touch-friendly Card Stack อัตโนมัติบนจอมือถือ (`< 768px`) โดยไม่เกิดปัญหา Horizontal Overflow
> 2. **Comprehensive Search & Filter Toolbar**: 
>    - ค้นหาได้ทั้ง Ticket Number และ Summary
>    - กรองได้ครบทั้ง Status, IT Priority, Category และปุ่มเลือก Assignment (`All`, `Unassigned`, `Assigned to Me`)
>    - มีป้าย Active Filter Chips และปุ่ม "Clear All Filters" ที่ใช้งานสะดวก
> 3. **Interactive Sorting & Smart Pagination**: 
>    - หัวตารางคลิกเรียงลำดับได้ พร้อมลูกศรบอกทิศทาง `▲`/`▼`
>    - Pagination ปรับ Limit ต่อหน้าได้ และมีระบบคำนวณ Windowing ไม่ทำให้ปุ่มหน้าล้นจอ
> 4. **Role Gate บน App Shell**: 
>    - แท็บ "Ticket Queue" ถูกซ่อนไม่ให้ Requester เห็น และแสดงเฉพาะ IT Staff กับ Admin พร้อมตั้งเป็นหน้าแรกให้อัตโนมัติ
> 5. **Accessibility & Test Coverage**: 
>    - รองรับมาตรฐาน WAI-ARIA (`aria-sort`, `role="search"`, `aria-label`)
>    - Unit Tests 7 เคสใน `StaffTicketQueue.test.tsx` ผ่าน 100%
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #57]*

---

### 7. PR #58: Issue 23 - Ticket Operations, Ownership & Notes API
- **Pull Request:** [PR #58](https://github.com/titayaaa/toktickit/pull/58)
- **Branch:** `feature/23-ticket-ops-api`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> ## 🟢 Peer Review: Approved (PR #58)
> 
> ตรวจทานโค้ดและชุดทดสอบของ Issue 23 (Ticket Operations, Ownership & Notes API) เรียบร้อยแล้ว
> 
> ### 🌟 จุดเด่นที่ทำได้ดีมาก:
> 1. **State Transition Matrix & Resolution Guard (BR-09 & BR-11)**:
>    - ควบคุมการเปลี่ยนสถานะตาม Matrix อย่างเคร่งครัด พร้อมดักไม่ให้เปลี่ยนสถานะของตั๋วที่เป็น Terminal (`CLOSED`, `CANCELLED`)
>    - บล็อกการส่งสถานะ `RESOLVED` ผ่าน endpoint ปกติ โดยบังคับให้ส่งผ่าน `/resolve` พร้อมกรอก `resolutionSummary` 3-500 ตัวอักษร
> 2. **Claim & Assign Validations (FR-14, FR-15 & AC-07)**:
>    - ระบบเคลมตั๋วปรับสถานะ `NEW` -> `OPEN` ให้อัตโนมัติเมื่อกำหนดผู้รับผิดชอบ
>    - ระบบ Reassign ป้องกันไม่ให้มอบหมายงานให้ Requester หรือ Inactive User (คืนค่า 422) และรองรับการปลดผู้ดูแลด้วย `ownerId: null`
> 3. **Internal Notes Confidentiality (BR-13 & AC-05)**:
>    - ป้องกันสิทธิ์ทั้ง POST และ GET บน `/notes` ด้วยการคืนค่า 403 แก่ Requester
>    - ใน `GET /api/tickets/:id` ไม่มีการ Include หรือ Disclose ข้อมูล Internal Notes ใน Payload อย่างเด็ดขาด
> 4. **Requester Resolution Indication (BR-10 & AC-12)**:
>    - รองรับให้ Requester แจ้งว่าปัญหาได้รับการแก้ไขแล้วผ่าน Public Comment โดยไม่เปลี่ยนสถานะตั๋วเองโดยพลการ
> 5. **Comprehensive Test Suite**:
>    - Integration Tests ครอบคลุม 29 เคสใน `ticket-operations.api.test.ts` ทดสอบทุก Scenario และ Constraint สำคัญ ผ่าน 100%
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #58]*

---

### 8. PR #59: Issue 24 - IT Staff Ticket Operations & Confidential Notes UI
- **Pull Request:** [PR #59](https://github.com/titayaaa/toktickit/pull/59)
- **Branch:** `feature/24-ticket-ops-ui`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Comments (@chanya06):
> **Peer Review: Approved (PR #59)**
> ตรวจทานโค้ดที่แก้ไขเพิ่มเติมใน Commit `9d2e307` ของ Issue 24 (IT Staff Ticket Operations & Confidential Notes UI) เรียบร้อยแล้ว
> 1. **State Transition Matrix & PENDING Support:** จัดการ State Transition ครบถ้วน รวมถึง `PENDING` ทั้งขาเข้าและขาออก ไม่เกิดปัญหาตั๋วติด Terminal ค้างอีกต่อไป
> 2. **Complete Priority Options:** เพิ่มตัวเลือก `CRITICAL` ใน IT Priority Select ครบทั้ง 5 ระดับตาม Prisma Schema
> 3. **React Rules of Hooks Compliance:** ย้าย `useAuth()` ออกมาที่ Top-level พร้อมเสริม Fallback ปลอดภัยใน `AuthContext` ถูกต้องตาม Best Practices
> 4. **UI Polishing & Typography:** แปลงข้อความแสดงผลสถานะใน Dropdown เป็น Title Case สวยงาม สะอาดตา ตรงตามมาตรฐาน Zen Green Design System
> 5. **Test Verification:** Unit Tests ทั้ง 8 เคส (OP-01 ถึง OP-08) ครอบคลุมทุกฟังก์ชัน รวมเทสต์ฝั่ง Client ผ่านครบ 49/49 เคส
> โค้ดมีคุณภาพสูงและแก้ไขได้ครบถ้วนสมบูรณ์
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #59]*

---

### 9. PR #60: Issue 25 - Administrator User Management API & UI
- **Pull Request:** [PR #60](https://github.com/titayaaa/toktickit/pull/60)
- **Branch:** `feature/25-admin-user-management`
- **Reviewer:** `@chanya06`
- **Status:** ✅ Approved & Merged into `lab3-staging`

#### Peer Review Changes Requested Comments (@chanya06):
> ### ⚠️ Request Changes on PR #60
> ตรวจทานโค้ด Issue 25 (Administrator User Management API & UI) อย่างละเอียดแล้ว โครงสร้างและ Logic ทำได้ดีมาก แต่พบจุดที่ต้องแก้ไข:
> 
> 1. **[Critical] Business Rule Reference ผิดทั้งหมด:**
>    - โค้ดอ้างอิง BR-07/BR-08/BR-09/BR-10 (Ticket Workflow Rules) แต่ควรเป็น BR-17/BR-18/BR-19 (Administrator Governance Rules) ตาม Spec Section 5.4
>    - ต้องแก้ทั้งใน `admin.ts` comments และ `AdminUserManagement.tsx` UI labels
> 2. **[Bug] ลำดับ Guard Logic ใน PATCH `/api/admin/users/:id`:**
>    - ควรตรวจ Self-Deactivation Guard (BR-18) ก่อน Last Admin Protection (BR-19)
>    - เพื่อให้ Error Message ตรงกับสถานการณ์จริง
> 3. **[Code Smell] Missing Type Check สำหรับ `nameToUse`:**
>    - ถ้าส่ง `fullName` เป็นค่าที่ไม่ใช่ String → `.trim()` จะ throw TypeError → ได้ 500 แทน 400

#### Author Responses & Revisions (@titayaaa on commit `bbf1124`):
> ขอบคุณมากเลยสำหรับคำแนะนำ ละเอียดและช่วยได้มากจริง ๆ
> เราได้นำไปแก้ไขเรียบร้อยแล้วใน commit `bbf1124` ดังนี้
> 1. **Business Rule Reference:** อัปเดตเลขอ้างอิงเป็นหมวด Administrator Governance Rules (BR-17, BR-18, BR-19) ตาม Spec Section 5.4 ครบทั้งใน `admin.ts`, `AdminUserManagement.tsx` (UI labels), เอกสาร `reviewer.md` และ Test Suites ทั้งหมดแล้ว
> 2. **Guard Logic Order:** สลับลำดับการตรวจเช็กใน `PATCH /api/admin/users/:id` โดยนำ Self-Deactivation Guard (BR-18) ขึ้นมาตรวจก่อน Last Admin Protection (BR-19) ทำให้ Error Message แสดงผลตรงกับการกระทำของแอดมินแล้ว
> 3. **Type Checking:** เสริม Type Guard `typeof rawName === 'string'` ทั้งใน POST และ PATCH ป้องกัน `TypeError` จากการเรียก `.trim()` คืนค่า 400 Bad Request ได้อย่างถูกต้อง
> 4. **Test & Build Verification:** รันเทสต์ Server ผ่านครบทั้ง 84 เคส และ Client ผ่านครบทั้ง 56 เคส รวมถึง Build ผ่านเรียบร้อย
> รบกวนช่วยตรวจทานอีกครั้งและ Merge ได้เลย ขอบคุณมากน้า

#### Second Review & Approval (@chanya06):
> ขอบคุณสำหรับการแก้ไขอย่างรวดเร็วและครบถ้วนใน commit bbf1124 ตรวจสอบโค้ดซ้ำเรียบร้อยแล้ว:
> - Business Rule Reference: อัปเดตเลขอ้างอิงเป็นหมวด BR-16 ถึง BR-19 (Administrator Governance Rules) ครบถ้วนถูกต้องทั้งใน Codebase, UI Tooltips, เอกสาร และ Test Suites แล้ว
> - Guard Logic Order: สลับลำดับการตรวจเช็กใน PATCH /api/admin/users/:id ได้อย่างเหมาะสม นำ Self-Deactivation Guard (BR-18) ขึ้นมาก่อน Last Admin Protection (BR-19) ทำให้ Error Message สื่อสารตรงตามการกระทำของแอดมินชัดเจน
> - Defensive Type Checking: เสริม Type Guard typeof rawName === 'string' ทั้งใน POST และ PATCH ได้รัดกุม ป้องกัน Runtime TypeError จากการเรียก .trim() และตอบกลับ 400 Bad Request ได้อย่างถูกต้อง พร้อมมี Test Case ครอบคลุมทั้งสองจุด
> - Test & Build Verification: Server Tests (84 เคส) และ Client Tests (56 เคส) รวมถึง Build ผ่าน 100% เรียบร้อย
> โค้ดมีคุณภาพสูงและพร้อมสำหรับการใช้งานแล้ว
- **Merged by:** `@chanya06`

> *[ใส่รูปภาพหลักฐานการ Review PR #60]*

---

### 10. PR #61: Issue 26 - E2E Testing, Visual Inspection & Final Release
- **Pull Request:** [PR #61](https://github.com/titayaaa/toktickit/pull/61)
- **Branch:** `feature/26-e2e-and-release`
- **Target Branch:** `lab3-staging`
- **Reviewer:** `@chanya06`
- **Status:** 🟡 In Review (รอผลการตรวจทานและ Merge จาก Reviewer)

#### Scope Delivered:
- ชุดทดสอบ End-to-End ครบถ้วนใน `e2e/lab-03/`:
  - `authentication.spec.ts`: ล็อกอิน, บล็อกผู้ใช้ Inactive, บังคับเปลี่ยนรหัสผ่านครั้งแรก และล็อกเอาต์
  - `staff-ticket-flow.spec.ts`: คิวงาน IT Staff, ค้นหา/กรอง, เคลมตั๋ว, สื่อสารสองช่องทาง (Public Comments & Internal Notes) และ Resolve พร้อมสรุป
  - `user-administration.spec.ts`: จัดการรายชื่อผู้ใช้, สร้างบัญชีใหม่, รีเซ็ตรหัสผ่าน, และ Self-Deactivation Guard (BR-18)
  - `visual-evidence.spec.ts`: สเปกตรวจเช็ก Responsive UI และยืนยัน Zero Horizontal Overflow
  - ผ่านครบ 18/18 Configurations (Desktop, Tablet, Mobile)
- บันทึกหลักฐานภาพถ่ายความละเอียดสูง 32 รูปภาพใน `artifacts/lab-03/screenshots/`
- ผลเทสต์ Vitest Server ผ่าน 124/124 และ Client ผ่าน 56/56
- อัปเดตเอกสาร `tests.md`, `reviewer.md`, `ai-use.md`, `ui-spec.md`, และ `README.md` ครบถ้วน

> *[ใส่รูปภาพหลักฐานการ Review PR #61 เมื่อได้รับการ Approve/Merge]*

---

# Part 2: Pull Requests I Reviewed for Partner (เราตรวจเพื่อน — @titayaaa ตรวจ @lmaybelgracel)

**Partner Repository:** `lmaybelgracel/TokTickit` (Author: Maybel Grace - GitHub: [@lmaybelgracel](https://github.com/lmaybelgracel))

## 1. Master Partner Review Table

| Partner PR # | Partner Issue / Feature | Branch | Review Verdict | Final Status |
| :--- | :--- | :--- | :--- | :---: |
| **[PR #36](https://github.com/lmaybelgracel/TokTickit/pull/36)** | Issue 17: Sprint 3 Engineering Contract & Specification | `feature/17-spec-and-tests` | Approved after Section 10 & ticket format sync | ✅ Merged |
| **[PR #46 / #47](https://github.com/lmaybelgracel/TokTickit/pull/47)** | Issue 18: Database Schema Evolution, User Migration & Seed | `feature/18-database-and-seed` | Approved after migration commit & seed backfill | ✅ Merged |
| **[PR #48](https://github.com/lmaybelgracel/TokTickit/pull/48)** | Issue 19: Authentication, Session & Mandatory Password Change | `feature/19-auth-and-passwords` | Approved after removing Dev Selector & password rotation guard | ✅ Merged |
| **[PR #49](https://github.com/lmaybelgracel/TokTickit/pull/49)** | Issue 20: IT Staff Ticket Queue | `feature/20-it-staff-ticket-queue` | Approved after verifying responsive card stack & priority sort | ✅ Merged |
| **[PR #50](https://github.com/lmaybelgracel/TokTickit/pull/50)** | Issue 21: IT Staff Ticket Operations & Detail | `feature/21-it-staff-operations` | Approved after verifying amber internal notes & transition matrix | ✅ Merged |
| **[PR #51](https://github.com/lmaybelgracel/TokTickit/pull/51)** | Issue 22: Administrator User Management | `feature/22-admin-user-management` | Approved after verifying safety guards & complexity checklist | ✅ Merged |
| **[PR #52](https://github.com/lmaybelgracel/TokTickit/pull/52)** | Issue 23: Automated Testing Suite | `feature/23-automated-testing-suite` | Approved on commit `7347855` after fixing endpoint & deduplicating tests | ✅ Merged |
| **[PR #53](https://github.com/lmaybelgracel/TokTickit/pull/53)** | Issue 24: UI Style Checking & Responsive Visual Evidence | `feature/24-ui-style-checking` | Approved on commit `6768c06` after 4 requested fixes | ✅ Merged |

---

## 2. Partner Review Discussion & Resolution Records

### 1. PR #36: Issue 17 - Sprint 3 Engineering Contract & Specification
- **PR Link:** [lmaybelgracel/TokTickit#36](https://github.com/lmaybelgracel/TokTickit/pull/36)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback:**
  > นอกนั้นพวก Flow การทำงาน, แบ่ง Role 3 ระดับ, โทนสี UI Zen Green กับกล่อง Internal Notes สีเหลืองส้มอันนี้ทำมาดีมาก ชัดเจนดีแล้ว ฝากแก้จุดข้างบนนี้นิดนึง เดี๋ยวแก้เสร็จทักมาเลย เรามากด Approve ให้น้า
- **Partner Response (@lmaybelgracel on commits `7718e13` & `488c0b3`):**
  > ขอบคุณสำหรับคำแนะนำที่ละเอียดมาก @titayaaa ได้ทำการปรับปรุงแก้ไขครบทั้ง 6 จุดใน commit 7718e13 เรียบร้อยแล้ว:
  > 1. ป้องกัน Data Leak ของ Internal Notes ใน `GET /api/tickets/:id`
  > 2. แยก Endpoint ป้องกันการ Bypass Resolution Summary ที่ `PATCH /api/staff/tickets/:id/resolve`
  > 3. ชี้แจง Format เลขตั๋ว `TKT-YYYY-XXXXXX` เพื่อรักษา Backward Compatibility 100%
  > 4. เพิ่มระดับ URGENT ใน Priority Enum
  > 5. หมายเหตุ Role Display Text ใน UI Spec
  > 6. เพิ่ม Test Cases `SEC-04` และ `STAFF-05`
- **My Approval Comment:**
  > ขอบคุณที่อธิบายเรื่อง Format เลขตั๋วอย่างละเอียดน้า ตรวจสอบ commit ล่าสุดแล้ว แก้ไขเรื่อง Data Leak, Validation ดัก Resolve, Priority Enum, และเพิ่ม Test Cases ได้ครบถ้วนสมบูรณ์มากเลยค่ะ เอกสารสเปกพร้อมสำหรับเริ่ม Implement แล้ว ขอ Approve ให้เลยค่า
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #36]*

---

### 2. PR #46 / PR #47: Issue 18 - Database Schema Evolution, User Migration & Seed
- **PR Link:** [lmaybelgracel/TokTickit#47](https://github.com/lmaybelgracel/TokTickit/pull/47)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback (Changes Requested):**
  > เราไล่ดูรายละเอียดใน PR #47 ให้แล้วนะ การจัดโครงสร้าง Seed Data กับชุดเทสต์ 13 เคสใน `database-schema-seed.test.ts` ทำออกมาได้ครอบคลุมและละเอียดมากเลย แต่มีจุดสำคัญเรื่อง Database Migration และความเสี่ยงที่ข้อมูลเดิมจะพัง อยากให้ช่วยปรับแก้ก่อน Merge ตามนี้น้า:
  > 1. [สำคัญสุด] ยังไม่มีไฟล์ Prisma Migration ใน PR
  > 2. [ความเสี่ยงข้อมูลพัง] Foreign Key ของ `Ticket.requesterId` ชี้ไปที่ `User.id` โดยยังไม่ได้ migrate ID เดิม
  > 3. ฟิลด์ `department` ใน `model User` เกินสเปกแล็บ (Explicit Exclusions)
  > 4. Path Import ใน `database-schema-seed.test.ts`
- **Partner Response (@lmaybelgracel on commit `3a2e156`):**
  > ขอบคุณสำหรับคำแนะนำที่ช่วยตรวจทานอย่างละเอียด @titayaaa ได้ตรวจสอบและดำเนินการปรับปรุงแก้ไขครบทั้ง 4 จุดใน commit `3a2e156` เรียบร้อยแล้ว:
  > 1. เพิ่มไฟล์ Prisma Migration ครบถ้วน รองรับการรัน `prisma migrate deploy`
  > 2. เพิ่ม SQL Backfill คัดลอก Requester เดิมเข้าตาราง `users` โดยรักษา `id` เดิมไว้ 100%
  > 3. ตัด `department` ออกจาก `User` เพื่อสอดคล้องกับ Explicit Exclusions
  > 4. เพิ่มชุดทดสอบครอบคลุม 49 ข้อใน Server Vitest (100%)
- **My Approval Comment:**
  > ตรวจเช็ค commit `3a2e156` เรียบร้อยแล้ว แก้ไขครบถ้วนทั้ง 4 จุดได้อย่างยอดเยี่ยมมาก
  > 1. เพิ่มไฟล์ Prisma Migration พร้อม SQL Backfill ข้อมูล Requester เดิม ช่วยรักษาตั๋ว Lab 2 ได้อย่างสมบูรณ์แบบ
  > 2. ปรับปรุง Seed Data และตัดฟิลด์ department ออกตรงตามข้อกำหนดของ Lab 3
  > 3. ชุดเทสต์ 17 เคสใน `database-schema-seed.test.ts` ครอบคลุมและผ่านหมด
  > 4. บันทึก reviewer.md เรียบร้อย
  > เดี๋ยว Approve และกด Merge รวมเข้า `lab3-staging`
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #47]*

---

### 3. PR #48: Issue 19 - Authentication, Session & Mandatory Password Change
- **PR Link:** [lmaybelgracel/TokTickit#48](https://github.com/lmaybelgracel/TokTickit/pull/48)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback (Changes Requested):**
  > เราไล่ตรวจโค้ดใน PR #48 ให้แล้วนะ ทำออกมาได้ครบวงจรมาก... แต่มีจุดสำคัญที่อยากให้ช่วยปรับแก้ก่อน Merge ตามนี้น้า:
  > 1. [สำคัญสุด - ขัดกับโจทย์แล็บ] ปุ่ม "Select Development Requester" ในหน้า Login (Handout ระบุชัดเจนว่าต้องลบออก)
  > 2. [Security & Policy] ตรวจสอบการตั้งรหัสผ่านใหม่ซ้ำกับรหัสผ่านเดิม
  > 3. [Contract Consistency] ปรับ HTTP Status Code ตอน Password Complexity ไม่ผ่านเป็น 422
  > 4. [สเปกกับโค้ดจริง] บันทึกอธิบายเรื่อง Token Storage ในเอกสารให้ตรงกับโค้ด
- **Partner Response (@lmaybelgracel on commit `8a85931`):**
  > ขอบคุณสำหรับคำแนะนำที่ช่วยตรวจทานอย่างละเอียด @titayaaa ได้ตรวจสอบและดำเนินการปรับปรุงแก้ไขครบทั้ง 4 จุดใน commit `8a85931` เรียบร้อยแล้ว:
  > 1. นำปุ่มสลับไป Dev Selector ออกจาก `client/src/App.tsx` เรียบร้อยแล้ว
  > 2. เพิ่มการตรวจ `newPassword === currentPassword` ส่ง 422 Unprocessable Entity
  > 3. ปรับสถานะตอบกลับใน `POST /api/auth/change-password` เป็น 422
  > 4. บันทึกคำอธิบายเรื่อง Bearer Token ใน `specification.md` และ `api-spec.md` ครบถ้วน
- **My Approval Comment:**
  > good !!
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #48]*

---

### 4. PR #49: Issue 20 - IT Staff Ticket Queue
- **PR Link:** [lmaybelgracel/TokTickit#49](https://github.com/lmaybelgracel/TokTickit/pull/49)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback & Approval:**
  > เราไล่ตรวจโค้ดใน PR #49 ให้ครบทุกจุดแล้วนะ ทำออกมาได้ดีและละเอียดมาก ทั้งฝั่ง Backend API และหน้าบ้าน UI คุมธีม Zen Green สวยงาม สบายตา ตรงตามสเปกเลยจ้า
  > 
  > ### จุดเด่นที่ดีมาก ๆ:
  > 1. **เรื่องความปลอดภัย (RBAC):** Middleware วางไว้แน่นหนามาก ทั้งเช็ค Token, เช็ค Role (IT_STAFF, ADMINISTRATOR) และดัก `mustChangePassword` ตัดสิทธิ์ Requester ด้วย 403 และ Unauth ด้วย 401
  > 2. **UX การค้นหาและตัวกรอง:** ชอบที่มี Debounced Search (250ms) ช่วยลดโหลดเซิร์ฟเวอร์ และมีปุ่มสลับ Segment (`All`, `Unassigned`, `Assigned to Me`) ใช้งานง่ายมาก แถมดัก `setCurrentPage(1)` ตอนเปลี่ยนฟิลเตอร์ไว้ทุกจุด
  > 3. **Responsive Design:** ทำการแสดงผลแยกได้ดีมาก บนคอมเป็น High-density Table พอเปิดบนมือถือเปลี่ยนเป็น Card Stack อ่านง่ายสุด ๆ
  > 4. **Priority Sorting:** การเรียงลำดับ `itPriority` สัมพันธ์กับ Enum ใน Postgres ได้ถูกต้อง ดึง `URGENT` ขึ้นก่อน `HIGH` ได้ตรงตามจริง
  > 5. **Test ครบถ้วน:** มีเทสทั้งหลังบ้าน 16 ตัว และหน้าบ้าน 7 ตัว ผ่าน 100% เลย
  > 
  > โดยรวมคือโค้ดคุณภาพดีมาก สะอาด เป็นระเบียบ และครบตามโจทย์แล็บ 3 ทุกอย่างเลย เรากด Approve ให้เรียบร้อยแล้วน้า เดี๋ยวเรากด Merge เข้า `lab3-staging` ให้เลย
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #49]*

---

### 5. PR #50: Issue 21 - IT Staff Ticket Operations & Detail
- **PR Link:** [lmaybelgracel/TokTickit#50](https://github.com/lmaybelgracel/TokTickit/pull/50)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback & Approval:**
  > เราไล่ตรวจโค้ดใน PR #50 แบบละเอียดครบทุกส่วนแล้วนะ ทั้งเส้น API หลังบ้าน หน้าจอ UI หน้าบ้าน และชุดทดสอบทั้งหมด ทำออกมาได้สมบูรณ์แบบมาก
  > 
  > ### จุดเด่นที่ทำได้ดีเยี่ยม:
  > 1. **Data Confidentiality & Isolation:** การแยก Public Comments และ Internal Notes ชัดเจนมาก มี Guard บล็อก 403 สำหรับ Requester ที่พยายามเข้าถึงโน้ตลับ และตัดข้อมูล Internal Notes ออกจาก Payload เมื่อ Requester เรียกดูตั๋ว
  > 2. **IT Staff Ticket Operations & State Transition Matrix:** เคลมตั๋วเปลี่ยนสถานะ `NEW` -> `OPEN` อัตโนมัติ, มอบหมายงานตรวจเช็คสิทธิ์ Active Staff, และการ Resolve ตั๋วบังคับใส่ `resolutionSummary` (3-500 ตัวอักษร)
  > 3. **UX/UI & Design System:** สไตล์ Zen Green คมชัด กล่อง Public Comments สีเขียวอ่อน `#EAF6EF` ตัดกับ Internal Notes สีเหลืองอำพัน `#FFF8E1` พร้อมไอคอนกุญแจ 🔒 สวยงาม
  > 4. **Test Coverage & Quality:** เทสต์ Integration ครอบคลุมทั้ง `staff-ticket-detail.api.test.ts` (16 เคส) และ `comments-notes.api.test.ts` (12 เคส) รวม Component Test อีก 8 เคส ผ่าน 100%
  > 
  > โครงสร้างโค้ดสะอาด เป็นระเบียบ แยกสิทธิ์ถูกต้องตามเกณฑ์ และเทสผ่านครบถ้วนทั้งหมด ไม่มีจุดติดขัดเลย เรา **Approve** ให้เรียบร้อย
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #50]*

---

### 6. PR #51: Issue 22 - Administrator User Management
- **PR Link:** [lmaybelgracel/TokTickit#51](https://github.com/lmaybelgracel/TokTickit/pull/51)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback & Approval:**
  > เราลองไล่เช็กโค้ดให้แบบละเอียดทั้งหน้าบ้าน หลังบ้าน แล้วก็ลองรันเทสต์ดูให้หมดแล้วนะ ทำออกมาดีมากก เก็บเงื่อนไขของแล็บนี้ครบเลย!
  > 
  > ### จุดที่ชอบมากๆ:
  > - **เรื่องสิทธิ์และความปลอดภัย:** กันไว้ดีมาก คนที่ไม่ใช่ Admin หรือยังไม่เปลี่ยนรหัสผ่านเข้าไม่ได้เลย
  > - **Business Rules เป๊ะมาก:** ดักเคสกันแอดมินปิดบัญชีตัวเอง (deactivate) หรือลดบทบาทตัวเอง (คืน 400), เช็กแอดมินคนสุดท้ายในระบบ, และเช็กอีเมลซ้ำแบบ case-insensitive คืน 409 ถูกต้อง
  > - **หน้าบ้าน (UI):** มี checklist เช็กความยากของรหัสผ่านแบบเรียลไทม์ 4 ข้อ, หน้าจอ responsive พร้อมป้าย `(You)` และ disable ช่อง role กับ active ไว้ให้อัตโนมัติถ้าเป็นบัญชีตัวเอง
  > - **ผลการเทสต์:** เทสต์หลังบ้าน 26 เคส และหน้าบ้าน 8 เคส ผ่านหมด 100% บิลด์ผ่านฉลุย
  > 
  > ทุกอย่างเรียบร้อยและปลอดภัยดีมากก กด Approve ให้แล้วนะ
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #51]*

---

### 7. PR #52: Issue 23 - Automated Testing Suite
- **PR Link:** [lmaybelgracel/TokTickit#52](https://github.com/lmaybelgracel/TokTickit/pull/52)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback (Changes Requested):**
  > เราลองไล่ตรวจโค้ดแบบเจาะลึกระดับ Line-by-line และลองเทียบ Route กับ Test Logic ให้ใหม่อีกรอบนะ เจอจุดที่ควรปรับปรุงเพื่อความสมบูรณ์แบบของโปรเจกต์:
  > 1. **Endpoint ใน `authorization.api.test.ts` ยิงผิดเส้น:** เรียก `/api/staff/queue` แทนที่จะเป็น `/api/staff/tickets`
  > 2. **มีไฟล์เทสต์ซ้ำซ้อนกัน 2 คู่:** ฝั่ง Server (`admin-users` vs `users-admin`) และฝั่ง Client (`AdminUserManagement` vs `UserManagement`)
  > 3. **Assertion ตกหล่นใน `UserManagement.test.tsx`:** ขาด Submit assertion และ Modal Reset Password test
  > 4. **ขาดกฎ `BR-08` ใน `users-admin.api.test.ts`:** ตกหล่นเคสป้องกัน Admin demote ตนเอง
  > 5. **Behavior ของ `useEffect` ใน `App.tsx`:** เมื่อ refresh หน้าจอ หน้าจะดีดกลับไปเริ่มต้นเสมอ
- **Partner Response (@lmaybelgracel on commit `7347855`):**
  > ขอบคุณสำหรับการตรวจสอบอย่างละเอียด ได้ดำเนินการปรับปรุงแก้ไขครบทั้ง 5 จุดตามคำแนะนำเรียบร้อยแล้ว:
  > 1. ปรับเส้นทางเป็น `/api/staff/tickets` ให้ตรงกับ implementation จริง
  > 2. ลบไฟล์ทดสอบที่ซ้ำซ้อน และรวม Traceability ไว้ที่ `admin-users.api.test.ts` (26 tests) และ `AdminUserManagement.test.tsx` (8 tests)
  > 3. & 4. ครอบคลุม BR-08 และ Modal Reset Password ครบถ้วน
  > 5. บันทึกและดึงสถานะ view ผ่าน `sessionStorage` ทำให้คงหน้าเดิมเมื่อ refresh
  > ผลการทดสอบ: Server 119/119, Client 31/31, E2E 3/3 ผ่าน 100%
- **My Approval Comment:**
  > ตรวจทานโค้ดใน commit `7347855` ให้เรียบร้อยแล้วน้า แก้ไขได้ตรงจุดและเก็บรายละเอียดครบถ้วนดีมากเลย
  > - แก้ Endpoint ใน `authorization.api.test.ts` ได้ถูกต้องตรงกับ Route จริง
  > - เคลียร์ไฟล์เทสต์ที่ซ้ำซ้อนออกแล้ว ชุดเทสต์สะอาดขึ้นเยอะและ Traceability ครบถ้วน
  > - การเก็บ View state ลง `sessionStorage` ใน `App.tsx` ช่วยแก้ปัญหาหน้าหลุดตอน Refresh ได้ดีมาก
  > ผลเทสต์ผ่านครบทุกตัว งานเรียบร้อยสมบูรณ์ กด Approve ให้เรียบร้อยแล้วน้า
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #52]*

---

### 8. PR #53: Issue 24 - UI Style Checking & Responsive Visual Evidence
- **PR Link:** [lmaybelgracel/TokTickit#53](https://github.com/lmaybelgracel/TokTickit/pull/53)
- **Reviewer:** ฑิตญา ผ่องสกุล (`@titayaaa`)
- **My Review Feedback (Changes Requested):**
  > เราไล่เช็กโค้ด Diff ของ PR #53 แบบละเอียดเจาะลึกทุกบรรทัด ทั้งตัวสเปกเทสต์และหลักฐานรูปภาพให้แล้วน้า โดยรวมทำโครงสร้าง E2E และ Viewports ได้ดีมาก แต่พบจุดบกพร่องและจุดที่ตัวเลขไม่ตรงกัน 4 จุด อยากให้ปรับแก้ให้เป๊ะก่อน Merge:
  > 1. **[Logic / Mock Risk] เทสต์ Empty State ใน `visual-evidence.spec.ts`:** Route handler ไม่ได้ตรวจสอบ Query Parameter `search`
  > 2. **[Mismatch] ยอดจำนวนรูปภาพใน PR Description ไม่ตรงกับโค้ดจริง:** ระบุ 24 รูป แต่โค้ดเรียกแคปจริง 28 รูป (Auth: 8, Queue: 6, Detail: 7, User Admin: 7)
  > 3. **[Missing Docs] ยังไม่ได้บันทึก Issue 24 ลงใน `docs/lab-03/reviewer.md`**
  > 4. **[Code Quality] หลีกเลี่ยงการใช้ `waitForTimeout(400)`:** แนะนำให้ใช้ Web-first assertion `await expect(page.getByText(/No tickets found/i)).toBeVisible();` แทน
- **Partner Response (@lmaybelgracel on commit `6768c06`):**
  > ได้ดำเนินการแก้ไขและเก็บตกรายละเอียดครบทั้ง 4 จุดตามข้อเสนอแนะในการ Review เรียบร้อยแล้ว ใน commit `6768c06`:
  > 1. Route Handler ตรวจสอบ `url.searchParams.get("search") === "NonExistentQueryXYZ"` ส่งคืนตั๋วว่าง
  > 2. แก้ไขจำนวนรูปสรุปใน PR Description และ Docs เป็น 28 รูปภาพตรงตามความเป็นจริง
  > 3. เพิ่มรายการ Issue 24 ลงใน Section 1 ของ `docs/lab-03/reviewer.md` ครบถ้วน
  > 4. ยกเลิกการใช้ `page.waitForTimeout(400)` และเปลี่ยนมาใช้ `await expect(page.getByText(/No tickets found/i)).toBeVisible();`
- **My Approval Comment:**
  > ### Peer Review: Approved (PR #53)
  > เราตรวจทานโค้ดและเอกสารที่แก้ไขเพิ่มเติมใน commit `6768c06` ครบถ้วนทุกจุดแล้ว:
  > 1. **Mock Route Search Query:** ใน `visual-evidence.spec.ts` มีการตรวจสอบ `url.searchParams.get("search")` สำหรับเคส `NonExistentQueryXYZ` อย่างถูกต้อง และส่งคืนตั๋วว่างสอดคล้องตามพฤติกรรมจริง
  > 2. **Web-first Assertion:** ลบ `page.waitForTimeout` ออกเรียบร้อย และเปลี่ยนมาใช้ `expect(...).toBeVisible()` เพื่อป้องกัน Flaky test ตามมาตรฐาน Playwright
  > 3. **Traceability & Docs:** บันทึก Issue 24 ลงในตารางและเนื้อหาของ `docs/lab-03/reviewer.md` เรียบร้อย เนื้อหาครบถ้วนชัดเจน
  > 4. **Screenshot Count Alignment:** ตัวเลขสรุปหลักฐานภาพถ่าย 28 รูปภาพในเอกสารตรงกับจุดที่เรียกแคปภาพจริงในสเปกเทสต์ทั้งหมด
  > โค้ดและเอกสารมีคุณภาพสูง สมบูรณ์แบบทุกจุด อนุมัติให้ Merge เข้า `lab3-staging` ได้เลยครับ!
- **Status:** ✅ Approved and Merged into `lab3-staging`

> *[ใส่รูปภาพหลักฐานการ Review Partner PR #53]*

---

### 9. Next Steps / Pending Reviews
- **Partner's Remaining Work:** ติดตามและตรวจทาน PR Release หรือส่วนงานถัดไปของ Partner เมื่อทำการเปิด PR เข้าสู่ `lab3-staging` หรือ `main`
- **Our Repository Remaining Work:** รอผู้ตรวจทาน (`@chanya06`) เข้ามาตรวจและกด Merge PR #61 เข้าสู่ `lab3-staging` จากนั้นดำเนินการเปิด Release PR เข้าสู่กิ่ง `main`
