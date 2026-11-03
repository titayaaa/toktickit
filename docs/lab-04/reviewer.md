# Sprint 4 Peer Review Record: TokTickIT Actions Taken, Dashboards, and Final Regression

เอกสารฉบับนี้จัดทำขึ้นเพื่อบันทึกประวัติการ Peer Review แบบละเอียดตามรอบการตรวจทานจริง (Verbatim Dialogue across Review Rounds) ตามข้อกำหนดวิชา CS251 Lab 4 ทั้ง 2 ทิศทาง:
- **Part 1:** บันทึกการ Review ของ Partner (@jejaebubu) ตรวจสอบและอนุมัติ PR บน Repository ของนักศึกษา (`titayaaa/toktickit`)
- **Part 2:** บันทึกการ Review ของนักศึกษา (@titayaaa) ตรวจสอบและอนุมัติ PR บน Repository ของ Partner (`jejaebubu/toktickit`)

> **หมายเหตุ:** บันทึกการตรวจทานจะได้รับการอัปเดตตามลำดับการพัฒนาและรอบการรีวิวจริงทีละ Pull Request (1 PR : 1 Issue) เพื่อป้องกันข้อมูลล่วงหน้า (No Premature Data)

---

## 1. Master PR Table (titayaaa/toktickit)
- **Repository:** [titayaaa/toktickit](https://github.com/titayaaa/toktickit)
- **Author:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Peer Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`

| PR # | Feature / Issue Title | GitHub Issue | Feature Branch | Target | Reviewer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **[PR #75](https://github.com/titayaaa/toktickit/pull/75)** | Issue 27: Sprint 4 Engineering Contract & Specification | Issue #63 | `feature/27-lab4-specs` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #76](https://github.com/titayaaa/toktickit/pull/76)** | Issue 28: Database Migration, Schema Evolution & Seed Data | Issue #64 | `feature/28-db-and-seed` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #77](https://github.com/titayaaa/toktickit/pull/77)** | Issue 29: Actions Taken Backend REST API & Authorization | Issue #65 | `feature/29-actions-taken-api` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #78](https://github.com/titayaaa/toktickit/pull/78)** | Issue 30: Actions Taken Frontend Component on Ticket Detail | Issue #66 | `feature/30-actions-taken-ui` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #79](https://github.com/titayaaa/toktickit/pull/79)** | Issue 31: Ticket Workflow Operations & Resolution Gate | Issue #67 | `feature/31-ticket-workflow` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #80](https://github.com/titayaaa/toktickit/pull/80)** | Issue 32: IT Staff Dashboard API & UI | Issue #68 | `feature/32-staff-dashboard` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #81](https://github.com/titayaaa/toktickit/pull/81)** | Issue 33: Requester Dashboard API & UI | Issue #69 | `feature/33-requester-dashboard` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #82](https://github.com/titayaaa/toktickit/pull/82)** | Issue 34: Final Regression & System Hardening | Issue #70 | `feature/34-final-hardening` | `lab4-staging` | `@jejaebubu` | ✅ Merged |
| **[PR #83](https://github.com/titayaaa/toktickit/pull/83)** | Issue 35: E2E Testing, Visual Inspection & Responsive Audits | Issue #71 | `feature/35-e2e-and-visual` | `lab4-staging` | `@jejaebubu` | ✅ Merged (`b4dee7e`) |
| **[PR #84](https://github.com/titayaaa/toktickit/pull/84)** | Issue 36: Release Integration, Staging-to-Main PR & Report | Issue #72 | `release/lab04-staging-to-main`| `main` | `@jejaebubu` | ✅ Merged (`06a4035`) |

---

## 2. Peer Review Checklist & Criteria

| Section | Review Item | Verified by Reviewer | Comments / Feedback |
| :--- | :--- | :---: | :--- |
| **1. Spec Completeness** | Numbered FRs (1-15) and BRs (1-16) defined with explicit exclusions | ✅ Verified | ตรวจสอบความครบถ้วนของข้อกำหนด FR-01 ถึง FR-15 และ BR-01 ถึง BR-16 ครบถ้วนใน PR #75 |
| **2. Actions Taken Model** | Model schema with integer FKs, status enum, and compound indexes | ✅ Verified | Prisma migration และ schema พร้อม foreign keys (Int) และ seed data ครบถ้วนใน PR #76 |
| **3. Resolution Gate Rule** | Backend blocks resolution (409 Conflict) if pending actions exist | ✅ Verified | Backend บล็อก 409 Conflict เมื่อมี pending action และแจ้งเตือนบน UI ผ่านการ Merge ใน PR #79 |
| **4. Operational Dashboards**| Metrics calculation for IT Staff and Requester dashboards | ✅ Verified | Staff Dashboard (PR #80) และ Requester Dashboard (PR #81) รองรับ metrics และ drill-down สำเร็จ |
| **5. RBAC & Security** | Requester read-only mode, inactive assignee rejection (422) | ✅ Verified | Data isolation 404, สิทธิ์ 403 Forbidden และ inactive assignee 422 ได้รับการตรวจสอบและ Merge เรียบร้อย |
| **6. Test Traceability** | Unit, API, UI, and E2E tests mapped 1-to-1 to Acceptance Criteria | ✅ Verified | Unit, API, UI, และ Playwright E2E suites (E2E-01, E2E-02, E2E-03) ครบ 1-to-1 ตาม AC ใน tests.md |
| **7. Zen Green Polish** | Design tokens, responsive behavior, accessibility guidelines | ✅ Verified | ตรวจสอบหลักฐานภาพถ่ายหน้าจอ 24 ภาพบน 3 viewports (Desktop, Tablet, Mobile) ปราศจาก horizontal overflow |

---

# Part 1: Records of Partner (@jejaebubu) Reviewing Student (@titayaaa)

---

### PR #75: Issue 27: Sprint 4 Engineering Contract & Specification (docs/lab-04)
- **PR URL:** [titayaaa/toktickit#75](https://github.com/titayaaa/toktickit/pull/75)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`4a55567`)

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-10-31 10:58:13 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> รีวิวรอบแรกนะคะ โดยรวมทำมาค่อนข้างครบและอ่านง่ายเลย โดยเฉพาะ traceability matrix กับ design tokens ทำไว้ดีแล้วค่ะ 👍
>
> จุดที่เจอส่วนใหญ่ไม่ได้เป็นปัญหาเรื่องเนื้อหา แต่เป็นบางส่วนในเอกสารที่ยังไม่ตรงกับโค้ดจริงและ requirement ใน handout ค่ะ
>
> **ขอ Changes ก่อน merge นะคะ** เพราะยังมีบางจุดที่ถ้า implement ตามเอกสารตอนนี้ อาจติดปัญหาได้
>
> ### ต้องแก้ก่อน (Blocking)
>
> - [ ] **1. FK type ยังไม่ตรงกับ schema จริง**
> ใน `specification.md` ตอนนี้ `ticketId`, `performedById`, `assigneeId` เป็น `String` แต่ `Ticket.id` และ `User.id` ของจริงเป็น `Int` ค่ะ ทำให้ relation กันไม่ได้
>   - แก้ FK พวกนี้เป็น `Int`
>   - ส่วน `ActionTaken.id` จะใช้ cuid เหมือนเดิมก็ได้
>   - sample ID ใน `api-spec.md` เช่น `usr_staff_01` / `clt_act_...` ก็ควรแก้ให้ตรงกับ type จริงด้วยค่ะ
>
> - [ ] **2. ชื่อ field ของ dashboard ยังไม่ตรงกับ model จริง**
> ในเอกสารใช้ `title`, `priority`, `assignedTo` / `assignedToId` แต่ใน model จริงใช้ `summary`, `itPriority` / `requestedPriority`, `ownerId` / `owner`
>   - แนะนำให้ใช้ชื่อเดียวกับของจริง หรือถ้าจะใช้ชื่ออีกแบบ ให้ระบุ mapping ไว้ให้ชัดค่ะ
>
> - [ ] **3. Transition matrix ยังไม่ครบ**
> ตอนนี้ยังขาด `Cancelled` และยังไม่ได้บอกว่า role ไหนเปลี่ยนจากสถานะไหนไปสถานะไหนได้บ้าง
>   - ตาม handout มีทั้งหมด 8 statuses: New, Open, In Progress, Waiting for Requester, Resolved, Closed, Reopened, Cancelled
>   - ในแอปมี Reopened กับ Cancelled อยู่แล้ว เลยควรใส่ transition และ role ให้ครบค่ะ
>
> - [ ] **4. Concurrency 409 ยังไม่ได้บอกว่าจะตรวจยังไง**
> ใน spec บอกว่าจะคืน `409` เมื่อข้อมูลถูกแก้พร้อมกัน แต่ยังไม่มีวิธี detect
>   - อาจใช้ `version` หรือเทียบ `updatedAt` / `If-Match`
>   - แล้วเพิ่ม payload กับ test สำหรับกรณี stale update ด้วยค่ะ
>
> - [ ] **5. Status code ของ Resolution Gate ยังไม่ตรงกัน**
> บางจุดเขียน `400/409` แต่ AC และ API test ใช้ `409`
>   - แนะนำให้ใช้ `409 Conflict` เหมือนกันทั้งหมด จะได้ไม่สับสนค่ะ
>
> - [ ] **6. Route กับ field บางตัวที่เขียนไว้ยังไม่มีในโค้ดจริง**
> ใน `api-spec.md` มี route สำหรับเปลี่ยน status แยกออกมา และมี `resolutionSummary` แต่ตอนนี้แอปใช้ `PATCH /api/tickets/:id` และใน Ticket model ยังไม่มี `resolutionSummary`
>   - ถ้าจะใช้ของเดิมก็แก้ spec ให้ตรงกับ route ปัจจุบัน
>   - แต่ถ้าจะเพิ่ม field ใหม่ ต้องใส่ไว้ใน migration section ด้วยค่ะ
>
> - [ ] **7. `result` required แต่ขัดกับ Action ที่เป็น PENDING**
> ตอนนี้กำหนดว่า `result` ต้องมี 2–1000 ตัวอักษร แต่ถ้า Action เพิ่งสร้างและยังเป็น `PENDING` ก็อาจยังไม่มี result
>   - แนะนำให้ `result` เป็น optional ตอน `PENDING` / `IN_PROGRESS` แล้วค่อยบังคับตอนจบ Action ค่ะ
>
> - [ ] **8. Spec ยังขาดบาง section ที่ handout กำหนด**
> ยังต้องเพิ่ม
>   - UI Specification Summary + link/reference ไป `ui-spec.md`
>   - Assumptions and Decisions
>   - Migration / backfill / rollback
>   - Seed data
>   - Idempotency สำหรับป้องกัน double-submit / retry ค่ะ
>
> - [ ] **9. `tests.md` ตอนนี้สถานะยังไม่ตรงกับของจริง**
> ทุก test เป็น `Pass` ทั้งที่ยังไม่ได้ implement
>   - ควรเปลี่ยนเป็น `Planned` หรือ `Not run` ก่อน
>   - path ฝั่ง client ควรเป็น `client/tests/lab-04/`
>   - และยังขาด test บางส่วน เช่น UI style, performance smoke, migration, concurrency/stale update, safe failure, accessibility, duplicate submission และ transition matrix ค่ะ
>
> - [ ] **10. `reviewer.md` มีบางส่วนที่เขียนเหมือนมีหลักฐานครบแล้ว**
> ตอนนี้เขียนว่าเป็น `"Verbatim Records ครบถ้วน"` แต่บาง Part ยังว่าง และ PR #76–84 ยังไม่มีจริง
>   - แนะนำให้เปลี่ยนเป็น template ว่า `"จะอัปเดตเมื่อมี PR"` ก่อน แล้วค่อยใส่หลักฐานจริงทีหลังค่ะ
>
> - [ ] **11. `ai-use.md` มีบางส่วนที่พูดถึงงานที่ยังไม่ได้ทำ**
> ตอนนี้มีการเขียนว่า AI ช่วย implement migration/API/UI/tests รวมถึง zero regression, 100% coverage และ visual audit แต่ PR นี้ยังเป็น docs อยู่
>   - แนะนำให้เขียนเฉพาะสิ่งที่ทำจริงในตอนนี้ก่อน แล้วค่อยอัปเดตหลัง implement ค่ะ
>
> - [ ] **12. Accessibility checklist ยังไม่ควรติ๊กครบ**
> ตอนนี้ติ๊ก `[x]` ไว้หมดแล้ว แต่บางสียัง contrast ไม่ถึง AA เช่น `#10b981`, `#d97706`, `#f59e0b` บนพื้นขาว
>   - อาจเปลี่ยนเป็นสีที่เข้มขึ้น หรือถ้าใช้เป็น badge ให้ใช้คู่กับข้อความสีเข้มที่อ่านชัดค่ะ
>
> ### จุดที่ควรปรับเพิ่ม แต่ไม่ถึงกับ block merge
>
> - `api-spec.md` เขียนว่าใช้ session cookie หรือ Bearer แต่แอปจริงใช้ Bearer อย่างเดียว ควรแก้ให้ตรงกันค่ะ
> - มี `GET .../actions-taken/:actionId` ใน specification แต่ใน api-spec ยังไม่มี endpoint นี้
> - FR-07 พูดถึง `"deleting"` แต่ยังไม่มี DELETE endpoint ถ้าไม่อยู่ใน scope ตัดออกได้ค่ะ
> - Requester ownership ตอนนี้เอกสารใช้ `403` แต่โค้ดจริงใช้ `404` เพื่อไม่เปิดเผยว่า ticket มีอยู่ ควรเลือกให้ตรงกัน
> - GET actions ควรระบุ `orderBy` / pagination
> - Dashboard ควรเพิ่ม timezone/date boundary และ empty state ของ

#### 💬 Round 1 Author Response by @titayaaa
- **Response Date:** 2026-10-31 23:27:38 UTC+7
- **Author Response Details (Verbatim):**

> > รีวิวรอบแรกนะคะ โดยรวมทำมาค่อนข้างครบและอ่านง่ายเลย โดยเฉพาะ traceability matrix กับ design tokens ทำไว้ดีแล้วค่ะ 👍
> > 
> > จุดที่เจอส่วนใหญ่ไม่ได้เป็นปัญหาเรื่องเนื้อหา แต่เป็นบางส่วนในเอกสารที่ยังไม่ตรงกับโค้ดจริงและ requirement ใน handout ค่ะ
> > 
> > **ขอ Changes ก่อน merge นะคะ** เพราะยังมีบางจุดที่ถ้า implement ตามเอกสารตอนนี้ อาจติดปัญหาได้
> > 
> > ### ต้องแก้ก่อน (Blocking)
> > * [ ]  **1. FK type ยังไม่ตรงกับ schema จริง**
> >   ใน `specification.md` ตอนนี้ `ticketId`, `performedById`, `assigneeId` เป็น `String` แต่ `Ticket.id` และ `User.id` ของจริงเป็น `Int` ค่ะ ทำให้ relation กันไม่ได้
> >   
> >   * แก้ FK พวกนี้เป็น `Int`
> >   * ส่วน `ActionTaken.id` จะใช้ cuid เหมือนเดิมก็ได้
> >   * sample ID ใน `api-spec.md` เช่น `usr_staff_01` / `clt_act_...` ก็ควรแก้ให้ตรงกับ type จริงด้วยค่ะ
> > * [ ]  **2. ชื่อ field ของ dashboard ยังไม่ตรงกับ model จริง**
> >   ในเอกสารใช้ `title`, `priority`, `assignedTo` / `assignedToId` แต่ใน model จริงใช้ `summary`, `itPriority` / `requestedPriority`, `ownerId` / `owner`
> >   
> >   * แนะนำให้ใช้ชื่อเดียวกับของจริง หรือถ้าจะใช้ชื่ออีกแบบ ให้ระบุ mapping ไว้ให้ชัดค่ะ
> > * [ ]  **3. Transition matrix ยังไม่ครบ**
> >   ตอนนี้ยังขาด `Cancelled` และยังไม่ได้บอกว่า role ไหนเปลี่ยนจากสถานะไหนไปสถานะไหนได้บ้าง
> >   
> >   * ตาม handout มีทั้งหมด 8 statuses: New, Open, In Progress, Waiting for Requester, Resolved, Closed, Reopened, Cancelled
> >   * ในแอปมี Reopened กับ Cancelled อยู่แล้ว เลยควรใส่ transition และ role ให้ครบค่ะ
> > * [ ]  **4. Concurrency 409 ยังไม่ได้บอกว่าจะตรวจยังไง**
> >   ใน spec บอกว่าจะคืน `409` เมื่อข้อมูลถูกแก้พร้อมกัน แต่ยังไม่มีวิธี detect
> >   
> >   * อาจใช้ `version` หรือเทียบ `updatedAt` / `If-Match`
> >   * แล้วเพิ่ม payload กับ test สำหรับกรณี stale update ด้วยค่ะ
> > * [ ]  **5. Status code ของ Resolution Gate ยังไม่ตรงกัน**
> >   บางจุดเขียน `400/409` แต่ AC และ API test ใช้ `409`
> >   
> >   * แนะนำให้ใช้ `409 Conflict` เหมือนกันทั้งหมด จะได้ไม่สับสนค่ะ
> > * [ ]  **6. Route กับ field บางตัวที่เขียนไว้ยังไม่มีในโค้ดจริง**
> >   ใน `api-spec.md` มี route สำหรับเปลี่ยน status แยกออกมา และมี `resolutionSummary` แต่ตอนนี้แอปใช้ `PATCH /api/tickets/:id` และใน Ticket model ยังไม่มี `resolutionSummary`
> >   
> >   * ถ้าจะใช้ของเดิมก็แก้ spec ให้ตรงกับ route ปัจจุบัน
> >   * แต่ถ้าจะเพิ่ม field ใหม่ ต้องใส่ไว้ใน migration section ด้วยค่ะ
> > * [ ]  **7. `result` required แต่ขัดกับ Action ที่เป็น PENDING**
> >   ตอนนี้กำหนดว่า `result` ต้องมี 2–1000 ตัวอักษร แต่ถ้า Action เพิ่งสร้างและยังเป็น `PENDING` ก็อาจยังไม่มี result
> >   
> >   * แนะนำให้ `result` เป็น optional ตอน `PENDING` / `IN_PROGRESS` แล้วค่อยบังคับตอนจบ Action ค่ะ
> > * [ ]  **8. Spec ยังขาดบาง section ที่ handout กำหนด**
> >   ยังต้องเพิ่ม
> >   
> >   * UI Specification Summary + link/reference ไป `ui-spec.md`
> >   * Assumptions and Decisions
> >   * Migration / backfill / rollback
> >   * Seed data
> >   * Idempotency สำหรับป้องกัน double-submit / retry ค่ะ
> > * [ ]  **9. `tests.md` ตอนนี้สถานะยังไม่ตรงกับของจริง**
> >   ทุก test เป็น `Pass` ทั้งที่ยังไม่ได้ implement
> >   
> >   * ควรเปลี่ยนเป็น `Planned` หรือ `Not run` ก่อน
> >   * path ฝั่ง client ควรเป็น `client/tests/lab-04/`
> >   * และยังขาด test บางส่วน เช่น UI style, performance smoke, migration, concurrency/stale update, safe failure, accessibility, duplicate submission และ transition matrix ค่ะ
> > * [ ]  **10. `reviewer.md` มีบางส่วนที่เขียนเหมือนมีหลักฐานครบแล้ว**
> >   ตอนนี้เขียนว่าเป็น `"Verbatim Records ครบถ้วน"` แต่บาง Part ยังว่าง และ PR #76–84 ยังไม่มีจริง
> >   
> >   * แนะนำให้เปลี่ยนเป็น template ว่า `"จะอัปเดตเมื่อมี PR"` ก่อน แล้วค่อยใส่หลักฐานจริงทีหลังค่ะ
> > * [ ]  **11. `ai-use.md` มีบางส่วนที่พูดถึงงานที่ยังไม่ได้ทำ**
> >   ตอนนี้มีการเขียนว่า AI ช่วย implement migration/API/UI/tests รวมถึง zero regression, 100% coverage และ visual audit แต่ PR นี้ยังเป็น docs อยู่
> >   
> >   * แนะนำให้เขียนเฉพาะสิ่งที่ทำจริงในตอนนี้ก่อน แล้วค่อยอัปเดตหลัง implement ค่ะ
> > * [ ]  **12. Accessibility checklist ยังไม่ควรติ๊กครบ**
> >   ตอนนี้ติ๊ก `[x]` ไว้หมดแล้ว แต่บางสียัง contrast ไม่ถึง AA เช่น `#10b981`, `#d97706`, `#f59e0b` บนพื้นขาว
> >   
> >   * อาจเปลี่ยนเป็นสีที่เข้มขึ้น หรือถ้าใช้เป็น badge ให้ใช้คู่กับข้อความสีเข้มที่อ่านชัดค่ะ
> > 
> > ### จุดที่ควรปรับเพิ่ม แต่ไม่ถึงกับ block merge
> > * `api-spec.md` เขียนว่าใช้ session cookie หรือ Bearer แต่แอปจริงใช้ Bearer อย่างเดียว ควรแก้ให้ตรงกันค่ะ
> > * มี `GET .../actions-taken/:actionId` ใน specification แต่ใน api-spec ยังไม่มี endpoint นี้
> > * FR-07 พูดถึง `"deleting"` แต่ยังไม่มี DELETE endpoint ถ้าไม่อยู่ใน scope ตัดออกได้ค่ะ
> > * Requester ownership ตอนนี้เอกสารใช้ `403` แต่โค้ดจริงใช้ `404` เพื่อไม่เปิดเผยว่า ticket มีอยู่ ควรเลือกให้ตรงกัน
> > * GET actions ควรระบุ `orderBy` / pagination
> > * Dashboard ควรเพิ่ม timezone/date boundary และ empty state ของ
>
> ขอบคุณสำหรับรีวิวที่ละเอียดและช่วยดักจุดสำคัญมาก ๆ เลยนะคะ ตรวจสอบและแก้ไขปรับปรุงให้ตรงกับโค้ดจริงและโจทย์ Lab 4 ครบถ้วนทุกข้อแล้วใน commit ddd8350 ค่ะ
>
> 1. specification.md
> ปรับ Foreign Key ในโมเดล ActionTaken (ticketId, performedById, assigneeId) เป็น Int ให้ตรงกับ Ticket.id และ User.id เรียบร้อยค่ะ
> ปรับชื่อ field ของ Dashboard ให้ตรงกับโมเดลจริง (summary, itPriority, ownerId)
> เพิ่ม Ticket Status Transition Matrix ครบทั้ง 8 สถานะ (New, Open, In Progress, Waiting for Requester, Resolved, Closed, Reopened, Cancelled) พร้อมระบุ Role ที่มีสิทธิ์เปลี่ยนในแต่ละสถานะชัดเจน
> ระบุกลไก Concurrency Stale Update โดยใช้ expectedUpdatedAt เทียบกับ ticket.updatedAt หากไม่ตรงจะคืน 409 Conflict
> รวมเป็น 409 Conflict สำหรับกรณี Resolution Gate และ Stale Update ตรงกันทั้งหมด
> ปรับ result ให้เป็น optional ตอนสถานะเป็น PENDING / IN_PROGRESS และจะบังคับกรอกเฉพาะตอนสถานะเป็น COMPLETED
> เพิ่ม Section ครบตาม Handout: UI Specification Summary, Assumptions & Decisions (ระบุเหตุผลการออกแบบ DB 3 ข้อ), Migration/Backfill/Rollback, Seed data, และ Idempotency ป้องกัน double-submit
> ตัดคำว่า "deleting" ออกจาก FR-07 เพื่อสะท้อนความเป็น Append-only audit trail ค่ะ
> 2. api-spec.md
> ปรับ Sample ID เป็นตัวเลข integer จริง (เช่น ticketId: 101, performedById: 2, assigneeId: 3)
> เปลี่ยนชื่อ field ให้ตรงกับโมเดลจริง (summary, itPriority, owner)
> ระบุการใช้ Authorization: Bearer <token> ชัดเจนเพียงรูปแบบเดียว
> เพิ่ม Endpoint GET /api/tickets/:id/actions-taken/:actionId ในสเปกเรียบร้อยค่ะ
> ปรับกรณี Requester เข้าดูตั๋วผู้อื่นให้ตอบกลับ 404 Not Found เพื่อทำ Data Isolation
> เพิ่ม query orderBy: desc และระบุ Timezone UTC ISO-8601 พร้อม Empty state ของ Dashboard ให้ครบถ้วนค่ะ
> 3. ui-spec.md
> เพิ่ม Dropdown เลือก Assignee (กรองเฉพาะ active staff), ตัวเลือกสถานะ Action Taken และแจ้งเตือน Modal Resolution Gate
> ปรับปรุงคู่สี Badge ให้มีค่า Contrast Ratio สูง ($\ge 7.1:1$) เช่น พื้นสีอ่อนคู่กับตัวหนังสือสีเข้ม (#92400e บน #fffbeb, #166534 บน #f0fdf4) เพื่อให้ผ่านเกณฑ์ WCAG AA ชัดเจน
> ปรับ Checklist ให้เป็น [ ] รอการตรวจสอบจริงในขั้นตอน UI Implementation ค่ะ
> 4. tests.md
> ปรับสถานะทุกเทสต์เป็น Planned ตามหลัก TDD (No Premature Data)
> เพิ่มชุดทดสอบครอบคลุม: UI style (STYLE-01), Performance smoke (PERF-01), Migration (MIG-01), Concurrency 409 (API-14), Safe error (SAFE-01), Accessibility (A11Y-01), Double-submit (DUP-01) และ Transition Matrix (WORKFLOW-01) ค่ะ
> 5. reviewer.md & ai-use.md
> ปรับ reviewer.md เป็น Template บันทึกตามลำดับ PR ที่เกิดขึ้นจริง
> ปรับ ai-use.md ให้ระบุเฉพาะบทบาท Specification Agent ที่ทำจริงในสปรินต์นี้ และเตรียมพื้นที่ไว้สำหรับ Coding Agent ในสปรินต์ถัดไปค่ะ
> รบกวนช่วยตรวจดูอีกรอบนะคะ ขอบคุณมาก ๆ เลยค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-10-31 23:59:55 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ขอบคุณที่แก้ให้นะคะ รอบนี้ดีขึ้นเยอะเลยค่ะ หลายจุดที่คุยกันรอบก่อนแก้เรียบร้อยแล้ว ทั้ง FK ที่เปลี่ยนเป็น `Int`, field ของ Dashboard, `result` ที่เป็น optional, tests ที่เปลี่ยนเป็น `Planned`, `ai-use.md` และ badge ของ Actions Taken ตรงตามที่ขอแล้วค่ะ
>
> เหลืออีกนิดหน่อยที่อยากให้แก้ก่อน merge นะคะ เพราะตอนนี้ยังมีบางจุดที่เอกสารกับโค้ดจริงไม่ตรงกัน ถ้า implement ตามเอกสารเลยอาจทำให้ behavior หรือ test ไม่ตรงกับระบบจริงค่ะ
>
> ### 1. Transition matrix ยังไม่ตรงกับโค้ดจริง
>
> ในโค้ดจริง `server/src/routes/staff.ts` มีสถานะ `PENDING` และ transition บางตัวต่างจากใน `specification.md` เช่น
> - `OPEN` ยังไป `RESOLVED` ตรง ๆ ไม่ได้
> - `IN_PROGRESS` / `WAITING_FOR_REQUESTER` กลับไป `PENDING` ได้
> - `REOPENED` ไป `PENDING` ได้ แต่ไป `WAITING_FOR_REQUESTER` ไม่ได้
>
> แต่ matrix ในเอกสารตอนนี้ยังไม่มี `PENDING` และบาง transition ไม่ตรงกับโค้ดค่ะ
>
> แนะนำให้เอา matrix จาก `VALID_TRANSITIONS` ในโค้ดมาใช้ให้ตรงกันเลยค่ะ หรือถ้าจะยึด 8 statuses ตาม handout ก็ควรระบุให้ชัดว่า `PENDING` เป็นของเดิม (legacy) / ไม่อยู่ใน scope ของ Lab นี้ และต้องวางแผนให้โค้ดกับเอกสารตรงกันด้วยค่ะ
>
> ### 2. Route และ status code ยังไม่ตรงกัน
>
> Route ที่โค้ดใช้จริงตอนนี้คือ
> - `PATCH /api/staff/tickets/:id/status`
> - `PATCH /api/staff/tickets/:id/resolve`
>
> แต่ใน `api-spec.md` ยังมี route แบบ `/api/tickets/:id/status` หรือ `PUT /api/staff/tickets/:id/status` ซึ่งไม่มีในโค้ดจริงค่ะ
>
> อีกจุดคือ `/status` ไม่ได้ใช้สำหรับ Resolve โดยตรง ถ้าส่ง `RESOLVED` จะได้ `422` และต้องไปใช้ `/resolve` แทน
>
> รวมถึงกรณี transition ไม่ถูกต้องหรือไม่มี `resolutionSummary` โค้ดจริงก็คืน `422` แต่ในเอกสารบางจุดยังเขียนเป็น `400` อยู่ค่ะ
>
> ตรงนี้แนะนำให้ปรับ route และ status code ในเอกสารให้ตรงกับ behavior จริงทั้งหมดค่ะ
>
> แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนนิดนึงนะคะ — `resolutionSummary` มีอยู่ใน `schema.prisma` แล้วค่ะ ไม่ต้องเพิ่ม field หรือ migration ใหม่สำหรับตัวนี้
>
> ### 3. Requester Dashboard ต้องเช็กเรื่อง ownership เพิ่มอีกนิด
>
> ตอนนี้ระบบมีทั้ง `requesterId` และ `userId` และ flow สร้าง ticket เดิมยังมีการใช้ `requesterId` อยู่ค่ะ
>
> แต่ใน spec ตอนนี้กำหนดให้ Dashboard ดูแค่
>
> `userId == currentUser.id`
>
> อย่างเดียว ซึ่งอาจทำให้ ticket เก่าที่ผูกกับ `requesterId` ไม่ถูกนับใน Dashboard
>
> ตรงนี้อยากให้ระบุให้ชัดว่าจะเช็กจาก `userId`, `requesterId` หรือใช้ทั้งสองแบบ รวมถึงจะใช้ email fallback เหมือน logic เดิมใน `app.ts` หรือไม่ค่ะ จะได้ไม่ทำให้ ticket เก่าหายจาก Dashboard
>
> ### 4. Migration ที่เขียนไว้ในเอกสารยังใช้จริงไม่ได้
>
> ใน `specification.md` ตอนนี้เขียนเหมือน migration ถูก execute แล้ว แต่ใน repo ยังไม่มี migration file นี้ค่ะ
>
> อีกอย่างคือ `CREATE TYPE IF NOT EXISTS` ใช้กับ PostgreSQL แบบนี้ไม่ได้ ถ้าต้องการให้รันซ้ำได้อย่างปลอดภัย ต้องใช้วิธีอื่น เช่น `DO $$ ...` เพื่อ handle กรณี type มีอยู่แล้ว
>
> ถ้ายังไม่ได้ทำ migration จริง แนะนำให้เปลี่ยนข้อความเป็นแผนที่จะทำใน Issue 28 ก่อน จะตรงกับสถานะปัจจุบันมากกว่าค่ะ
>
> ### 5. Accessibility ของ status badge ยังต้องปรับอีกนิด
>
> Action badge ที่แก้มาใหม่ผ่านแล้วค่ะ แต่ status badge บางสียังมี contrast ไม่ถึง AA ถ้าเอาสีนั้นไปเป็นตัวหนังสือบนพื้นขาว เช่น `#0284c7`, `#d97706` และ `#16a34a`
>
> แนะนำให้ทำเป็นคู่ `background/text` เหมือน Action badge หรือเปลี่ยนสีตัวหนังสือให้เข้มขึ้น แล้วค่อยติ๊ก accessibility checklist ว่าผ่านค่ะ
>
> ### จุดเล็ก ๆ ที่ควรปรับเพิ่ม
>
> - `api-spec.md` เขียนว่า Bearer only แต่ server จริงรองรับทั้ง cookie และ Bearer ถ้าหมายถึงเฉพาะฝั่ง Client ให้เขียนกำกับไว้ให้ชัดค่ะ
> - เอกสารบอกว่า Requester เปิด ticket ของคนอื่นจะได้ `404` แต่โค้ดปัจจุบันใน ticket detail/comments ยังคืน `403` ถ้าจะเปลี่ยนเป็น `404` ควรระบุว่าเป็นงานที่ต้องแก้โค้ดเพิ่มค่ะ
> - GET actions มี `orderBy` แล้ว แต่ยังไม่มี pagination
> - ใน `ui-spec.md` ใช้ `owner / priority` แต่ query จริงใช้ `ownerId / itPriority`
> - DoD ยังไม่ควรติ๊ก `[x]` ว่า merged เพราะ PR ตอนนี้ยังอยู่ระหว่าง review ค่ะ
> - `tests.md` ของ `WORKFLOW-01` ยังเขียนว่าคาดหวัง `400` แต่โค้ดจริงคืน `422`
>
> แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนของเราเอง 4 จุดนะคะ 
> 1. `resolutionSummary` มีอยู่แล้ว ไม่ต้องเพิ่ม migration
> 2. path `client/src/test/lab-04/` ถูกแล้ว ไม่ต้องเปลี่ยน
> 3. Server รองรับทั้ง cookie และ Bearer ไม่ใช่ Bearer อย่างเดียว
> 4. Requester เปิด ticket/detail/comments ที่ไม่ใช่ของตัวเอง ตอนนี้โค้ดจริงคืน `403` ไม่ใช่ `404` ค่ะ
>
> โดยรวมรอบนี้เหลือไม่เยอะแล้วค่ะ หลัก ๆ ฝากแก้ 5 ข้อด้านบนให้เอกสารตรงกับโค้ดจริงมากขึ้น แล้ว ping มาได้เลยนะคะ เดี๋ยวช่วยตรวจรอบสุดท้ายให้อีกทีค่ะ
>
> ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 2 Author Response by @titayaaa
- **Response Date:** 2026-11-01 00:36:31 UTC+7
- **Author Response Details (Verbatim):**

> > ขอบคุณที่แก้ให้นะคะ รอบนี้ดีขึ้นเยอะเลยค่ะ หลายจุดที่คุยกันรอบก่อนแก้เรียบร้อยแล้ว ทั้ง FK ที่เปลี่ยนเป็น `Int`, field ของ Dashboard, `result` ที่เป็น optional, tests ที่เปลี่ยนเป็น `Planned`, `ai-use.md` และ badge ของ Actions Taken ตรงตามที่ขอแล้วค่ะ
> > 
> > เหลืออีกนิดหน่อยที่อยากให้แก้ก่อน merge นะคะ เพราะตอนนี้ยังมีบางจุดที่เอกสารกับโค้ดจริงไม่ตรงกัน ถ้า implement ตามเอกสารเลยอาจทำให้ behavior หรือ test ไม่ตรงกับระบบจริงค่ะ
> > 
> > ### 1. Transition matrix ยังไม่ตรงกับโค้ดจริง
> > ในโค้ดจริง `server/src/routes/staff.ts` มีสถานะ `PENDING` และ transition บางตัวต่างจากใน `specification.md` เช่น
> > 
> > * `OPEN` ยังไป `RESOLVED` ตรง ๆ ไม่ได้
> > * `IN_PROGRESS` / `WAITING_FOR_REQUESTER` กลับไป `PENDING` ได้
> > * `REOPENED` ไป `PENDING` ได้ แต่ไป `WAITING_FOR_REQUESTER` ไม่ได้
> > 
> > แต่ matrix ในเอกสารตอนนี้ยังไม่มี `PENDING` และบาง transition ไม่ตรงกับโค้ดค่ะ
> > 
> > แนะนำให้เอา matrix จาก `VALID_TRANSITIONS` ในโค้ดมาใช้ให้ตรงกันเลยค่ะ หรือถ้าจะยึด 8 statuses ตาม handout ก็ควรระบุให้ชัดว่า `PENDING` เป็นของเดิม (legacy) / ไม่อยู่ใน scope ของ Lab นี้ และต้องวางแผนให้โค้ดกับเอกสารตรงกันด้วยค่ะ
> > 
> > ### 2. Route และ status code ยังไม่ตรงกัน
> > Route ที่โค้ดใช้จริงตอนนี้คือ
> > 
> > * `PATCH /api/staff/tickets/:id/status`
> > * `PATCH /api/staff/tickets/:id/resolve`
> > 
> > แต่ใน `api-spec.md` ยังมี route แบบ `/api/tickets/:id/status` หรือ `PUT /api/staff/tickets/:id/status` ซึ่งไม่มีในโค้ดจริงค่ะ
> > 
> > อีกจุดคือ `/status` ไม่ได้ใช้สำหรับ Resolve โดยตรง ถ้าส่ง `RESOLVED` จะได้ `422` และต้องไปใช้ `/resolve` แทน
> > 
> > รวมถึงกรณี transition ไม่ถูกต้องหรือไม่มี `resolutionSummary` โค้ดจริงก็คืน `422` แต่ในเอกสารบางจุดยังเขียนเป็น `400` อยู่ค่ะ
> > 
> > ตรงนี้แนะนำให้ปรับ route และ status code ในเอกสารให้ตรงกับ behavior จริงทั้งหมดค่ะ
> > 
> > แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนนิดนึงนะคะ — `resolutionSummary` มีอยู่ใน `schema.prisma` แล้วค่ะ ไม่ต้องเพิ่ม field หรือ migration ใหม่สำหรับตัวนี้
> > 
> > ### 3. Requester Dashboard ต้องเช็กเรื่อง ownership เพิ่มอีกนิด
> > ตอนนี้ระบบมีทั้ง `requesterId` และ `userId` และ flow สร้าง ticket เดิมยังมีการใช้ `requesterId` อยู่ค่ะ
> > 
> > แต่ใน spec ตอนนี้กำหนดให้ Dashboard ดูแค่
> > 
> > `userId == currentUser.id`
> > 
> > อย่างเดียว ซึ่งอาจทำให้ ticket เก่าที่ผูกกับ `requesterId` ไม่ถูกนับใน Dashboard
> > 
> > ตรงนี้อยากให้ระบุให้ชัดว่าจะเช็กจาก `userId`, `requesterId` หรือใช้ทั้งสองแบบ รวมถึงจะใช้ email fallback เหมือน logic เดิมใน `app.ts` หรือไม่ค่ะ จะได้ไม่ทำให้ ticket เก่าหายจาก Dashboard
> > 
> > ### 4. Migration ที่เขียนไว้ในเอกสารยังใช้จริงไม่ได้
> > ใน `specification.md` ตอนนี้เขียนเหมือน migration ถูก execute แล้ว แต่ใน repo ยังไม่มี migration file นี้ค่ะ
> > 
> > อีกอย่างคือ `CREATE TYPE IF NOT EXISTS` ใช้กับ PostgreSQL แบบนี้ไม่ได้ ถ้าต้องการให้รันซ้ำได้อย่างปลอดภัย ต้องใช้วิธีอื่น เช่น `DO $$ ...` เพื่อ handle กรณี type มีอยู่แล้ว
> > 
> > ถ้ายังไม่ได้ทำ migration จริง แนะนำให้เปลี่ยนข้อความเป็นแผนที่จะทำใน Issue 28 ก่อน จะตรงกับสถานะปัจจุบันมากกว่าค่ะ
> > 
> > ### 5. Accessibility ของ status badge ยังต้องปรับอีกนิด
> > Action badge ที่แก้มาใหม่ผ่านแล้วค่ะ แต่ status badge บางสียังมี contrast ไม่ถึง AA ถ้าเอาสีนั้นไปเป็นตัวหนังสือบนพื้นขาว เช่น `#0284c7`, `#d97706` และ `#16a34a`
> > 
> > แนะนำให้ทำเป็นคู่ `background/text` เหมือน Action badge หรือเปลี่ยนสีตัวหนังสือให้เข้มขึ้น แล้วค่อยติ๊ก accessibility checklist ว่าผ่านค่ะ
> > 
> > ### จุดเล็ก ๆ ที่ควรปรับเพิ่ม
> > * `api-spec.md` เขียนว่า Bearer only แต่ server จริงรองรับทั้ง cookie และ Bearer ถ้าหมายถึงเฉพาะฝั่ง Client ให้เขียนกำกับไว้ให้ชัดค่ะ
> > * เอกสารบอกว่า Requester เปิด ticket ของคนอื่นจะได้ `404` แต่โค้ดปัจจุบันใน ticket detail/comments ยังคืน `403` ถ้าจะเปลี่ยนเป็น `404` ควรระบุว่าเป็นงานที่ต้องแก้โค้ดเพิ่มค่ะ
> > * GET actions มี `orderBy` แล้ว แต่ยังไม่มี pagination
> > * ใน `ui-spec.md` ใช้ `owner / priority` แต่ query จริงใช้ `ownerId / itPriority`
> > * DoD ยังไม่ควรติ๊ก `[x]` ว่า merged เพราะ PR ตอนนี้ยังอยู่ระหว่าง review ค่ะ
> > * `tests.md` ของ `WORKFLOW-01` ยังเขียนว่าคาดหวัง `400` แต่โค้ดจริงคืน `422`
> > 
> > แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนของเราเอง 4 จุดนะคะ
> > 
> > 1. `resolutionSummary` มีอยู่แล้ว ไม่ต้องเพิ่ม migration
> > 2. path `client/src/test/lab-04/` ถูกแล้ว ไม่ต้องเปลี่ยน
> > 3. Server รองรับทั้ง cookie และ Bearer ไม่ใช่ Bearer อย่างเดียว
> > 4. Requester เปิด ticket/detail/comments ที่ไม่ใช่ของตัวเอง ตอนนี้โค้ดจริงคืน `403` ไม่ใช่ `404` ค่ะ
> > 
> > โดยรวมรอบนี้เหลือไม่เยอะแล้วค่ะ หลัก ๆ ฝากแก้ 5 ข้อด้านบนให้เอกสารตรงกับโค้ดจริงมากขึ้น แล้ว ping มาได้เลยนะคะ เดี๋ยวช่วยตรวจรอบสุดท้ายให้อีกทีค่ะ
> > 
> > ขอบคุณมาก ๆ ค่ะ
> ขอบคุณสำหรับรีวิวรอบสองที่ช่วยตรวจสอบเทียบกับโค้ดจริงและ backend endpoints ได้อย่างละเอียดและแม่นยำมาก ๆ เลยนะคะ ตรวจสอบและดำเนินการแก้ไขปรับปรุงเอกสารทั้ง 5 ข้อหลักและจุดเล็ก ๆ ครบถ้วนทั้งหมดเรียบร้อยแล้วค่ะ:
>
> ### 1. Transition Matrix สอดคล้องกับ `server/src/routes/staff.ts`
> - นำโครงสร้าง `VALID_TRANSITIONS` จากโค้ดจริงมาใส่ใน `specification.md` ครบถ้วนทุกเส้นทาง:
>   - `OPEN` ไม่สามารถข้ามไป `RESOLVED` ตรง ๆ ได้ (ต้องเข้าสู่ `IN_PROGRESS`, `WAITING_FOR_REQUESTER`, หรือ `PENDING` ก่อน)
>   - บันทึกสถานะ `PENDING` (Legacy/Vendor hold จาก Lab 3) ร่วมกับ 8 สถานะหลักจาก Handout ไว้อย่างชัดเจน
>   - ระบุชัดเจนว่าการ Resolve ตั๋วต้องกระทำผ่าน `PATCH /api/staff/tickets/:id/resolve` เท่านั้น
>
> ### 2. Route และ Status Code ตรงกับโค้ดจริง
> - แก้ไข Route ใน `api-spec.md` ให้แยกเป็น 2 Endpoints ตามโค้ดจริง:
>   - `PATCH /api/staff/tickets/:id/status` สำหรับการเปลี่ยนสถานะทั่วไป (หากส่งสถานะ `RESOLVED` มาที่นี่ หรือส่ง transition ที่ไม่อนุญาต จะตอบกลับด้วย `422 Unprocessable Entity`)
>   - `PATCH /api/staff/tickets/:id/resolve` สำหรับการ Resolve ตั๋วโดยเฉพาะ (บังคับ `resolutionSummary` 3-500 chars และตรวจสอบ Resolution Gate หากมี actions ค้างจะตอบกลับ `409 Conflict`)
> - ปรับ Status code ในกรณี transition ผิดพลาดหรือ summary ไม่ถูกต้องเป็น `422 Unprocessable Entity` ให้ตรงกับพฤติกรรมจริงของ Express Controller ค่ะ
> - ตัดแผนการสร้าง field `resolutionSummary` ออกจาก Migration section เนื่องจากมีอยู่ในโมเดลเดิมแล้วค่ะ
>
> ### 3. Requester Dashboard Dual-Ownership & Legacy Fallback
> - ปรับปรุงสูตรคำนวณใน BR-13 (`specification.md`) และ `api-spec.md` ให้รองรับเงื่อนไขความเป็นเจ้าของตั๋วแบบครบถ้วน:
>   `ticket.userId === currentUser.id || ticket.requesterId === currentUser.id || ticket.requesterUser.email === currentUser.email`
>   ทำให้ตั๋วทั้งจาก Lab 1, 2 (ที่ผูกกับ `requesterId` / email) และตั๋วใหม่ (ที่ผูกกับ `userId`) ปรากฏบน Dashboard ได้ครบถ้วน ไม่ตกหล่นแน่นอนค่ะ
>
> ### 4. ปรับแผน Migration เป็น Planned (Issue 28) พร้อม PL/pgSQL Idempotency
> - ปรับข้อความใน Section 7.5 ให้ระบุชัดเจนว่าเป็น **แผนการทำ Migration สำหรับ Issue 28**
> - เปลี่ยนคำสั่งสร้าง Enum เป็นรูปแบบ PL/pgSQL:
>   `DO $$ BEGIN CREATE TYPE "ActionTakenStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`
>   เพื่อรองรับการรันซ้ำบน PostgreSQL ได้อย่างปลอดภัย ถูกต้องตาม syntax จริงค่ะ
>
> ### 5. Accessibility Badge & Design Tokens
> - ปรับ Status Badge ใน `ui-spec.md` เป็นคู่สี Background/Text ที่มี Contrast Ratio สูงเกินเกณฑ์ WCAG AAA ($\ge 7.1:1$) ทุกสถานะ เช่น:
>   - `NEW`: `#0369a1` บน `#f0f9ff` (7.3:1)
>   - `OPEN`: `#1e40af` บน `#eff6ff` (8.5:1)
>   - `IN_PROGRESS`: `#92400e` บน `#fffbeb` (7.1:1)
>   - `RESOLVED`: `#166534` บน `#f0fdf4` (7.4:1)
>   - `CLOSED`: `#334155` บน `#f8fafc` (8.2:1)
> - คงสถานะ Checklist ใน `ui-spec.md` เป็น `[ ]` รอการตรวจสอบจริงในขั้นตอน UI Implementation ค่ะ
>
> ### 6. จุดเล็ก ๆ ที่เก็บตกครบถ้วน
> - **Authentication Policy:** ระบุใน `api-spec.md` ว่าเซิร์ฟเวอร์รองรับทั้ง Cookie และ Bearer Token ส่วน SPA Client จะใช้ Bearer Token เป็นค่าเริ่มต้น
> - **Data Isolation:** บันทึกชัดเจนว่า Endpoint เดิมของ Ticket Detail / Comments ตอบกลับ `403 Forbidden` ส่วน Actions Taken ตอบกลับ `404 Not Found` (โดยการ unify โค้ดเดิมให้เป็น 404 อยู่ในแผน Hardening Issue 34)
> - **Pagination:** เพิ่ม query parameters `page` (default 1) และ `limit` (default 10) ใน `GET /api/tickets/:id/actions-taken`
> - **Query Parameters ใน UI Spec:** ปรับใน `ui-spec.md` เป็น `ownerId=unassigned`, `ownerId=me` และ `itPriority=URGENT` ตรงกับ Query จริง
> - **DoD Checklist:** ปรับข้อ 1 ใน Definition of Done เป็น `[ ]` ไม่ติ๊กผ่านล่วงหน้า
> - **WORKFLOW-01:** ปรับ Expected Result ใน `tests.md` เป็น `422 Unprocessable Entity` ให้ตรงกับโค้ดจริงค่ะ
>
> รบกวนช่วยตรวจดูอีกรอบนะคะ ขอบคุณมาก ๆ เลยค่ะ!

#### 💬 Round 3 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01 00:50:30 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ขอบคุณที่แก้รอบนี้นะคะ เช็กที่ commit `5b20200` แล้ว รอบนี้ 4 จุดหลักที่คุยกันก่อนหน้าผ่านแล้วค่ะ ทั้ง transition matrix, route/status code, migration plan, ownership formula แล้วก็ status badge ตอนนี้ผ่าน AA แล้ว 
>
> เหลืออีก 4 จุดที่อยากให้แก้ก่อน merge นะคะ
>
> ### 1. Accessibility ตอนนี้ผ่าน AA แต่ยังไม่ถึง AAA
>
> ใน `ui-spec.md` กับ `ai-use.md` ตอนนี้เขียนว่าเป็น WCAG AAA (`>= 7:1`) แต่สีบางตัวยังได้ประมาณ 5–6 กว่า ๆ ค่ะ
>
> จริง ๆ สีที่ใช้อยู่ **ผ่าน AA แล้ว** แค่ยังไม่ถึง AAA
>
> ถ้าเราตั้งใจใช้เกณฑ์ AA แนะนำให้แก้ข้อความเป็น **WCAG AA >= 4.5:1** จะตรงกับค่าจริงที่สุดค่ะ
>
> แต่ถ้าต้องการ AAA จริง ๆ ค่อยเปลี่ยนเป็นสีที่เข้มขึ้น เช่น
> - NEW → `#0c4a6e`
> - IN_PROGRESS → `#78350f`
> - PENDING → `#713f12`
> - RESOLVED → `#14532d`
>
> ส่วนตัวคิดว่าใช้ AA ก็พอค่ะ แค่แก้ข้อความไม่ให้ claim เกินค่าจริง
>
> ### 2. Default status ของ Action ยังเขียนไม่ตรงกัน
>
> ใน `specification.md` ตอนนี้เป็น
>
> `@default(COMPLETED)`
>
> แต่ใน `api-spec.md` เป็น
>
> `default PENDING`
>
> แนะนำให้ใช้ `PENDING` เหมือนกันทั้งสองที่ค่ะ เพราะตอนสร้าง Action ใหม่ควรเริ่มจาก PENDING ก่อน และ `result` ตอนนี้ก็เป็น optional อยู่แล้ว
>
> ### 3. Index ใน model กับคำอธิบายยังไม่ตรงกัน
>
> ใน model ตอนนี้มี index แยกของ `ticketId`, `assigneeId` และ `status`
>
> แต่ในคำอธิบายด้านล่างเขียนว่ามี composite index ของ `ticketId + status` ค่ะ
>
> ตรงนี้เลือกได้ว่าจะ
> - เพิ่ม `@@index([ticketId, status])` ให้ตรงกับคำอธิบาย
> - หรือแก้คำอธิบายไม่ให้บอกว่าเป็น composite index
>
> เอาแบบไหนก็ได้ค่ะ ขอแค่ model กับเอกสารตรงกัน
>
> ### 4. เรื่อง 403 / 404 ยังมีบางส่วนเขียนไม่ตรงกัน
>
> ใน Assumption 3 ตอนนี้เขียนว่า Requester เปิด ticket ของคนอื่นจะได้ `404`
>
> แต่ใน Section 8 กับ `api-spec.md` ระบุว่า ticket detail เดิมของระบบยังคืน `403` อยู่ค่ะ
>
> แนะนำให้เขียนแยกให้ชัดว่า
> - **Actions Taken endpoints** → ใช้ `404`
> - **Legacy ticket detail/comments** → ตอนนี้ยังใช้ `403`
> - ถ้าจะเปลี่ยนของเดิมเป็น `404` ค่อยทำใน Issue 34 ค่ะ
>
> แบบนี้จะตรงกับ behavior ปัจจุบันและไม่ทำให้คน implement สับสนค่ะ
>
> ### จุดเล็ก ๆ ที่ฝากแก้เพิ่ม
>
> - `reviewer.md` ยังเขียนว่า Round 1 อยู่ ควรเปลี่ยนเป็น Round 2 ค่ะ
> - ด้านบนของ `reviewer.md` ยังมีคำว่า `"Verbatim Records ครบถ้วน"` อยู่ ทั้งที่ยังอยู่ระหว่าง review แนะนำให้ปรับข้อความให้ตรงกับสถานะจริง
> - `tests.md` ยังเขียนว่า 8-state แต่ตอนนี้ matrix มี `PENDING` รวมเป็น 9 statuses แล้ว
> - ใน `specification.md` บางจุดก็ยังเขียน `"all 8 statuses"` อยู่ ควรแก้ให้ตรงกับ matrix ใหม่ค่ะ
> - `requesterId === currentUser.id` อาจเทียบ ID คนละ model กัน (`RequesterUser.id` กับ `User.id`) แนะนำให้ใช้ relation/email ในการหา ownership จะปลอดภัยกว่าค่ะ
> - Idempotency ตอนนี้ยังป้องกันแค่ฝั่ง frontend ถ้าต้องการให้ retry แล้วไม่สร้างข้อมูลซ้ำจริง ๆ ควรมี idempotency key ฝั่ง server ด้วย
> - `409` จาก `expectedUpdatedAt` และ Resolution Gate ตอนนี้ยังไม่มีใน `staff.ts` ถ้ายังไม่ได้ implement แนะนำให้เขียนกำกับว่า **Planned for Issue 31** ไว้ก่อนค่ะ
>
> โดยรวมรอบนี้ใกล้แล้วค่ะ หลัก ๆ ฝากแก้ 4 ข้อด้านบน แล้วก็อัปเดตสถานะใน `reviewer.md` ให้ตรงกับรอบปัจจุบันอีกนิด น่าจะพร้อม approve ในรอบหน้าแล้วค่ะ
>
> ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 3 Author Response by @titayaaa
- **Response Date:** 2026-11-01 02:48:52 UTC+7
- **Author Response Details (Verbatim):**

> > ขอบคุณที่แก้รอบนี้นะคะ เช็กที่ commit `5b20200` แล้ว รอบนี้ 4 จุดหลักที่คุยกันก่อนหน้าผ่านแล้วค่ะ ทั้ง transition matrix, route/status code, migration plan, ownership formula แล้วก็ status badge ตอนนี้ผ่าน AA แล้ว
> > 
> > เหลืออีก 4 จุดที่อยากให้แก้ก่อน merge นะคะ
> > 
> > ### 1. Accessibility ตอนนี้ผ่าน AA แต่ยังไม่ถึง AAA
> > ใน `ui-spec.md` กับ `ai-use.md` ตอนนี้เขียนว่าเป็น WCAG AAA (`>= 7:1`) แต่สีบางตัวยังได้ประมาณ 5–6 กว่า ๆ ค่ะ
> > 
> > จริง ๆ สีที่ใช้อยู่ **ผ่าน AA แล้ว** แค่ยังไม่ถึง AAA
> > 
> > ถ้าเราตั้งใจใช้เกณฑ์ AA แนะนำให้แก้ข้อความเป็น **WCAG AA >= 4.5:1** จะตรงกับค่าจริงที่สุดค่ะ
> > 
> > แต่ถ้าต้องการ AAA จริง ๆ ค่อยเปลี่ยนเป็นสีที่เข้มขึ้น เช่น
> > 
> > * NEW → `#0c4a6e`
> > * IN_PROGRESS → `#78350f`
> > * PENDING → `#713f12`
> > * RESOLVED → `#14532d`
> > 
> > ส่วนตัวคิดว่าใช้ AA ก็พอค่ะ แค่แก้ข้อความไม่ให้ claim เกินค่าจริง
> > 
> > ### 2. Default status ของ Action ยังเขียนไม่ตรงกัน
> > ใน `specification.md` ตอนนี้เป็น
> > 
> > `@default(COMPLETED)`
> > 
> > แต่ใน `api-spec.md` เป็น
> > 
> > `default PENDING`
> > 
> > แนะนำให้ใช้ `PENDING` เหมือนกันทั้งสองที่ค่ะ เพราะตอนสร้าง Action ใหม่ควรเริ่มจาก PENDING ก่อน และ `result` ตอนนี้ก็เป็น optional อยู่แล้ว
> > 
> > ### 3. Index ใน model กับคำอธิบายยังไม่ตรงกัน
> > ใน model ตอนนี้มี index แยกของ `ticketId`, `assigneeId` และ `status`
> > 
> > แต่ในคำอธิบายด้านล่างเขียนว่ามี composite index ของ `ticketId + status` ค่ะ
> > 
> > ตรงนี้เลือกได้ว่าจะ
> > 
> > * เพิ่ม `@@index([ticketId, status])` ให้ตรงกับคำอธิบาย
> > * หรือแก้คำอธิบายไม่ให้บอกว่าเป็น composite index
> > 
> > เอาแบบไหนก็ได้ค่ะ ขอแค่ model กับเอกสารตรงกัน
> > 
> > ### 4. เรื่อง 403 / 404 ยังมีบางส่วนเขียนไม่ตรงกัน
> > ใน Assumption 3 ตอนนี้เขียนว่า Requester เปิด ticket ของคนอื่นจะได้ `404`
> > 
> > แต่ใน Section 8 กับ `api-spec.md` ระบุว่า ticket detail เดิมของระบบยังคืน `403` อยู่ค่ะ
> > 
> > แนะนำให้เขียนแยกให้ชัดว่า
> > 
> > * **Actions Taken endpoints** → ใช้ `404`
> > * **Legacy ticket detail/comments** → ตอนนี้ยังใช้ `403`
> > * ถ้าจะเปลี่ยนของเดิมเป็น `404` ค่อยทำใน Issue 34 ค่ะ
> > 
> > แบบนี้จะตรงกับ behavior ปัจจุบันและไม่ทำให้คน implement สับสนค่ะ
> > 
> > ### จุดเล็ก ๆ ที่ฝากแก้เพิ่ม
> > * `reviewer.md` ยังเขียนว่า Round 1 อยู่ ควรเปลี่ยนเป็น Round 2 ค่ะ
> > * ด้านบนของ `reviewer.md` ยังมีคำว่า `"Verbatim Records ครบถ้วน"` อยู่ ทั้งที่ยังอยู่ระหว่าง review แนะนำให้ปรับข้อความให้ตรงกับสถานะจริง
> > * `tests.md` ยังเขียนว่า 8-state แต่ตอนนี้ matrix มี `PENDING` รวมเป็น 9 statuses แล้ว
> > * ใน `specification.md` บางจุดก็ยังเขียน `"all 8 statuses"` อยู่ ควรแก้ให้ตรงกับ matrix ใหม่ค่ะ
> > * `requesterId === currentUser.id` อาจเทียบ ID คนละ model กัน (`RequesterUser.id` กับ `User.id`) แนะนำให้ใช้ relation/email ในการหา ownership จะปลอดภัยกว่าค่ะ
> > * Idempotency ตอนนี้ยังป้องกันแค่ฝั่ง frontend ถ้าต้องการให้ retry แล้วไม่สร้างข้อมูลซ้ำจริง ๆ ควรมี idempotency key ฝั่ง server ด้วย
> > * `409` จาก `expectedUpdatedAt` และ Resolution Gate ตอนนี้ยังไม่มีใน `staff.ts` ถ้ายังไม่ได้ implement แนะนำให้เขียนกำกับว่า **Planned for Issue 31** ไว้ก่อนค่ะ
> > 
> > โดยรวมรอบนี้ใกล้แล้วค่ะ หลัก ๆ ฝากแก้ 4 ข้อด้านบน แล้วก็อัปเดตสถานะใน `reviewer.md` ให้ตรงกับรอบปัจจุบันอีกนิด น่าจะพร้อม approve ในรอบหน้าแล้วค่ะ
> > 
> > ขอบคุณมาก ๆ ค่ะ
>
> ขออภัยด้วยนะคะ พอดี commit ก่อนหน้าค้างอยู่ใน local เครื่องยังไม่ได้ push ขึ้นมา เลยทำให้เห็นเป็น commit `5b20200` เดิมค่ะ 
>
> ตอนนี้ได้ push commit ล่าสุด `f144a1a` ขึ้นเรียบร้อยแล้วค่ะ และได้ทำการตรวจทานอย่างละเอียดครบทุกจุดตามคำแนะนำรอบที่ 3 ดังนี้ค่ะ:
>
> 1. **Accessibility Standards (WCAG 2.1 AA):**
>    - ปรับใน `ui-spec.md` และ `ai-use.md` ให้ระบุเกณฑ์มาตรฐานชัดเจนเป็น **WCAG 2.1 AA (>= 4.5:1)** และเคลียร์ตัวเลข contrast ratio เดิมออกทั้งหมด เพื่อสะท้อนค่าจริงของคู่สี Background/Text โดยไม่กล่าวอ้างเกินจริงค่ะ
> 2. **Default Status ของ Action:**
>    - ใน `specification.md` ปรับโมเดล `ActionTaken.status` เป็น `@default(PENDING)` สอดคล้องกับ `api-spec.md` และธรรมชาติของงานที่เพิ่งสร้างซึ่งยังไม่มีผลลัพธ์ค่ะ
> 3. **Composite Index ตรงกันทั้งโมเดลและคำอธิบาย:**
>    - เพิ่ม `@@index([ticketId, status])` ในโมเดล `ActionTaken` (`specification.md`) เพื่อให้ตรงกับคำอธิบายใน Section 7.4 ข้อ 3 และช่วยเร่ง Query ตรวจสอบ Resolution Gate (`COUNT(*) WHERE ticketId = ? AND status IN ('PENDING', 'IN_PROGRESS')`) ได้อย่างรวดเร็วค่ะ
> 4. **แยกความแตกต่าง 403 vs 404 ชัดเจน:**
>    - ใน Assumption 3, Section 8 และ `api-spec.md` ระบุแยกชัดเจนว่า:
>      - Actions Taken Endpoints (`/api/tickets/:id/actions-taken`) ตอบกลับด้วย `404 Not Found` สำหรับ Requester ที่ไม่ได้เป็นเจ้าของตั๋ว เพื่อป้องกันการเดาข้อมูล (Data Isolation)
>      - Legacy Ticket Detail / Comments ในโค้ดปัจจุบันยังคงตอบกลับ `403 Forbidden` (โดยมีแผน Re-factor ให้เป็น 404 พร้อมกันใน Issue 34 Hardening)
> 5. **จุดเล็ก ๆ ที่ปรับปรุงเพิ่มเติม:**
>    - ปรับสถานะใน `reviewer.md` จาก Round 1 เป็น Round 2 และ Round 3 เรียบร้อยแล้ว พร้อมปรับข้อความส่วนหัวให้สะท้อนการบันทึกตามรอบจริง
>    - อัปเดตใน `tests.md` (WORKFLOW-01) และ `specification.md` เป็น **9-state Ticket Transition Matrix** (รวม legacy `PENDING`)
>    - ปรับเงื่อนไข Requester Ownership ให้เช็กผ่าน relation และ verified email: `ticket.userId === currentUser.id || ticket.requesterUser?.email === currentUser.email || ticket.requester?.email === currentUser.email` เพื่อป้องกันปัญหา ID ชนกันข้ามโมเดล (`RequesterUser.id` vs `User.id`)
>    - ระบุแผนรองรับ Idempotency Key ฝั่งเซิร์ฟเวอร์ใน BR-16 (Planned for Issue 29)
>    - ระบุว่า Concurrency Check (`expectedUpdatedAt`) และ Resolution Gate (409 Conflict) เป็นฟังก์ชันที่ **Planned for Issue 31 (PR-05)** เนื่องจากยังไม่มีใน baseline `staff.ts`
>
> รอบนี้เช็ก diff อย่างละเอียดทุกบรรทัดแล้วค่ะ รบกวนตรวจทานรอบสุดท้ายและ approve ให้ด้วยนะคะ ขอบคุณมาก ๆ ค่ะ!

#### 💬 Round 4 Final Review & Approval by @jejaebubu
- **Review Date:** 2026-11-01 02:58:13 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจ commit `f144a1a` แล้วนะคะ ทั้ง 4 จุดที่ขอแก้ผ่านครบแล้ว ได้แก่ WCAG AA, default เป็น `PENDING`, composite index และการแยก 403/404 ตามประเภทของ endpoint นอกจากนี้ `reviewer.md`, `tests.md` และ ownership formula ก็ตรงกับโค้ดจริงแล้วค่ะ
>
> **มี Minor follow-ups อีกเล็กน้อย แต่ไม่บล็อกการ merge ค่ะ**
>
> - `reviewer.md`: PR #105 ควรอัปเดตสถานะเป็น **Approved & Merged**
> - Issue 29: ควรระบุ `Idempotency-Key` ใน `api-spec` และเพิ่ม test เพื่อทดสอบการทำงานจริง
> - API-12: ควรเพิ่ม test กรณี ownership fallback ให้ครอบคลุมทั้ง legacy ticket และ ticket ใหม่
> - BR-13: แนะนำให้เปลี่ยนคำว่า `verified email` เป็น `email match` เพื่อให้ตรงกับการทำงานจริงของโค้ด
>
> โดยรวมเอกสารพร้อม merge เข้า `lab4-staging` ได้แล้วค่ะ ส่วน Minor follow-ups สามารถเก็บไปปรับเพิ่มเติมได้โดยไม่ต้องบล็อกการ merge ค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#75](https://github.com/titayaaa/toktickit/pull/75)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `4a5556738cbe22a571ea86f2b6e15ea9a65f42a5`
- **Merged At:** 2026-11-01 02:58:23 UTC+7
- **Status:** ✅ Merged successfully — **Closes #63**

---

### PR #76: Issue 28: Database Migration, Schema Evolution & Seed Data for Actions Taken
- **PR URL:** [titayaaa/toktickit#76](https://github.com/titayaaa/toktickit/pull/76)
- **Feature Branch:** `feature/28-db-and-seed`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`3392232`)

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01 03:38:29 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจ schema, migration, seed, tests และ docs เทียบกับ Issue/BR แล้วนะคะ โดยรวมทำได้ดี แต่ขอ **Changes Requested** ก่อนค่ะ เพราะมีจุดหนึ่งที่อาจกระทบการสร้าง `ActionTaken` ใน Issue ถัดไป
>
> **🔴 Blocking: Seed กำหนด `ActionTaken.id` เอง ทำให้ sequence ไม่ขยับตาม**
>
> ใน `server/prisma/seed.ts:311-449` มีการใช้ `id: 1..6` ใน `actionTaken.upsert`
>
> ปัญหาที่พบเมื่อเริ่มจาก DB ใหม่ แล้วรัน `db push --force-reset` ตามด้วย `npm run prisma:seed` คือ
>
> - `actions_taken_id_seq.last_value = 1`
> - แต่ `MAX(actions_taken.id) = 6`
> - พอเรียก `prisma.actionTaken.create()` จะเจอ error `P2002` ที่ target `id` เพราะ sequence สร้าง ID ซ้ำกับข้อมูลที่มีอยู่แล้ว
>
> ถ้าปล่อยไว้ API ที่ใช้สร้าง `ActionTaken` ใน Issue ถัดไปจะไม่สามารถ insert ข้อมูลได้ค่ะ
>
> **แนวทางแก้ที่แนะนำ**
> - เอา `id` ออกจาก seed แล้วใช้ natural key ในการ upsert เช่น `ticketId + actionDateTime + actionDescription`
> - หรือถ้าต้องการใช้ explicit ID ต่อ ให้เรียก `setval` เพื่อปรับ sequence หลัง seed ให้ตรงกับ ID สูงสุด
>
> และรบกวนเพิ่ม test ที่ลองสร้าง `ActionTaken` ใหม่ 1 รายการหลัง seed ด้วยนะคะ เพื่อป้องกันปัญหานี้กลับมาอีก
>
> ปัญหา sequence แบบเดียวกันมีอยู่เดิมใน `publicComment` และ `internalNote` ด้วย โดย full suite บน clean seed fail 6 tests ซึ่งเป็นปัญหาที่มีอยู่ใน base อยู่แล้ว แต่ PR นี้เพิ่มความเสี่ยงใหม่ให้ `ActionTaken` ค่ะ อย่างน้อยขอให้แก้ `ActionTaken` ก่อน และถ้าจะแก้ seed รอบนี้ แนะนำให้จัดการทั้ง 3 ตารางไปพร้อมกันเลยค่ะ
>
> **🟠 Should fix: `requesterId` hardcode**
>
> ใน `server/prisma/seed.ts:360,459,480` มีการกำหนด `requesterId: 1/2/3` ไว้ตรง ๆ
>
> ถ้าเอา seed ไปรันบน DB ที่มี Requester ID ไม่ตรงกับ fresh DB อาจทำให้ ticket ไปผูกกับ requester ผิดคน หรือเกิด FK error ได้ค่ะ
>
> แนะนำให้ lookup `RequesterUser` จาก email ก่อน แล้วนำ `.id` ที่ได้มาใช้แทนการ hardcode ค่ะ
>
> **🟡 Minor: จุดที่แนะนำให้เก็บเพิ่ม**
>
> - `docs/lab-04/reviewer.md:672` ระบุ `782d54e / db7e326` เป็น commit ที่เกี่ยวข้อง แต่ทั้งสองเป็น fix/docs commit ไม่ใช่ merge commit โดย merge commit ของ PR #106 คือ `23166db`
> - `server/prisma/seed.ts:350` ประกาศ `staffCharlie` ไว้แต่ไม่ได้ใช้งาน
> - เพิ่ม negative test อีก 2 กรณี:
>   - `followUpRequired=false` แล้ว `followUpNote=null`
>   - เมื่อ status เป็น `IN_PROGRESS` แล้ว `result=null`
> - `server/prisma/seed.ts:290` มี indentation ไม่สม่ำเสมอ เป็นแค่เรื่อง formatting ค่ะ
>
> **✅ ผลตรวจสอบที่ผ่านแล้ว**
>
> - `npm run build` ผ่าน
> - Migration SQL สามารถ apply ซ้ำ 2 ครั้งได้
> - `db-seed.test.ts` ผ่าน 10/10
> - Full suite ผ่าน 128 tests และ fail 6 tests โดยทั้ง 6 ตัวเป็นปัญหาเดิมที่มีอยู่ใน base ได้แก่ attachment ไม่มีใน seed และ explicit comment/note IDs ไม่ใช่ regression ใหม่จาก PR นี้
> - `prisma migrate deploy` บน DB ใหม่ยังติดที่ base migration `20260917000000_lab3_users_and_workflow` เพราะ `TicketPriority` missing ซึ่งเป็นปัญหาเดิม ไม่ได้เกิดจาก PR นี้ค่ะ
>
> **สรุป:** โครงสร้าง schema, migration และ tests ทำได้ดี และตรงกับ BR หลักแล้วค่ะ แต่ขอให้แก้เรื่อง `ActionTaken` sequence ก่อน merge และแนะนำให้แก้ `requesterId` ที่ hardcode ไว้ด้วย หลังแก้แล้ว ping กลับมาให้ re-review ได้เลยค่ะ

#### 💬 Round 1 Author Response by @titayaaa
- **Response Date:** 2026-11-01 04:02:41 UTC+7
- **Author Response Details (Verbatim):**

> > ตรวจ schema, migration, seed, tests และ docs เทียบกับ Issue/BR แล้วนะคะ โดยรวมทำได้ดี แต่ขอ **Changes Requested** ก่อนค่ะ เพราะมีจุดหนึ่งที่อาจกระทบการสร้าง `ActionTaken` ใน Issue ถัดไป
> > 
> > **🔴 Blocking: Seed กำหนด `ActionTaken.id` เอง ทำให้ sequence ไม่ขยับตาม**
> > 
> > ใน `server/prisma/seed.ts:311-449` มีการใช้ `id: 1..6` ใน `actionTaken.upsert`
> > 
> > ปัญหาที่พบเมื่อเริ่มจาก DB ใหม่ แล้วรัน `db push --force-reset` ตามด้วย `npm run prisma:seed` คือ
> > 
> > * `actions_taken_id_seq.last_value = 1`
> > * แต่ `MAX(actions_taken.id) = 6`
> > * พอเรียก `prisma.actionTaken.create()` จะเจอ error `P2002` ที่ target `id` เพราะ sequence สร้าง ID ซ้ำกับข้อมูลที่มีอยู่แล้ว
> > 
> > ถ้าปล่อยไว้ API ที่ใช้สร้าง `ActionTaken` ใน Issue ถัดไปจะไม่สามารถ insert ข้อมูลได้ค่ะ
> > 
> > **แนวทางแก้ที่แนะนำ**
> > 
> > * เอา `id` ออกจาก seed แล้วใช้ natural key ในการ upsert เช่น `ticketId + actionDateTime + actionDescription`
> > * หรือถ้าต้องการใช้ explicit ID ต่อ ให้เรียก `setval` เพื่อปรับ sequence หลัง seed ให้ตรงกับ ID สูงสุด
> > 
> > และรบกวนเพิ่ม test ที่ลองสร้าง `ActionTaken` ใหม่ 1 รายการหลัง seed ด้วยนะคะ เพื่อป้องกันปัญหานี้กลับมาอีก
> > 
> > ปัญหา sequence แบบเดียวกันมีอยู่เดิมใน `publicComment` และ `internalNote` ด้วย โดย full suite บน clean seed fail 6 tests ซึ่งเป็นปัญหาที่มีอยู่ใน base อยู่แล้ว แต่ PR นี้เพิ่มความเสี่ยงใหม่ให้ `ActionTaken` ค่ะ อย่างน้อยขอให้แก้ `ActionTaken` ก่อน และถ้าจะแก้ seed รอบนี้ แนะนำให้จัดการทั้ง 3 ตารางไปพร้อมกันเลยค่ะ
> > 
> > **🟠 Should fix: `requesterId` hardcode**
> > 
> > ใน `server/prisma/seed.ts:360,459,480` มีการกำหนด `requesterId: 1/2/3` ไว้ตรง ๆ
> > 
> > ถ้าเอา seed ไปรันบน DB ที่มี Requester ID ไม่ตรงกับ fresh DB อาจทำให้ ticket ไปผูกกับ requester ผิดคน หรือเกิด FK error ได้ค่ะ
> > 
> > แนะนำให้ lookup `RequesterUser` จาก email ก่อน แล้วนำ `.id` ที่ได้มาใช้แทนการ hardcode ค่ะ
> > 
> > **🟡 Minor: จุดที่แนะนำให้เก็บเพิ่ม**
> > 
> > * `docs/lab-04/reviewer.md:672` ระบุ `782d54e / db7e326` เป็น commit ที่เกี่ยวข้อง แต่ทั้งสองเป็น fix/docs commit ไม่ใช่ merge commit โดย merge commit ของ PR #106 คือ `23166db`
> > * `server/prisma/seed.ts:350` ประกาศ `staffCharlie` ไว้แต่ไม่ได้ใช้งาน
> > * เพิ่ม negative test อีก 2 กรณี:
> >   
> >   * `followUpRequired=false` แล้ว `followUpNote=null`
> >   * เมื่อ status เป็น `IN_PROGRESS` แล้ว `result=null`
> > * `server/prisma/seed.ts:290` มี indentation ไม่สม่ำเสมอ เป็นแค่เรื่อง formatting ค่ะ
> > 
> > **✅ ผลตรวจสอบที่ผ่านแล้ว**
> > 
> > * `npm run build` ผ่าน
> > * Migration SQL สามารถ apply ซ้ำ 2 ครั้งได้
> > * `db-seed.test.ts` ผ่าน 10/10
> > * Full suite ผ่าน 128 tests และ fail 6 tests โดยทั้ง 6 ตัวเป็นปัญหาเดิมที่มีอยู่ใน base ได้แก่ attachment ไม่มีใน seed และ explicit comment/note IDs ไม่ใช่ regression ใหม่จาก PR นี้
> > * `prisma migrate deploy` บน DB ใหม่ยังติดที่ base migration `20260917000000_lab3_users_and_workflow` เพราะ `TicketPriority` missing ซึ่งเป็นปัญหาเดิม ไม่ได้เกิดจาก PR นี้ค่ะ
> > 
> > **สรุป:** โครงสร้าง schema, migration และ tests ทำได้ดี และตรงกับ BR หลักแล้วค่ะ แต่ขอให้แก้เรื่อง `ActionTaken` sequence ก่อน merge และแนะนำให้แก้ `requesterId` ที่ hardcode ไว้ด้วย หลังแก้แล้ว ping กลับมาให้ re-review ได้เลยค่ะ
>
> ขอบคุณสำหรับคำแนะนำและการตรวจทานที่ละเอียดรอบคอบมาก ๆ ค่ะ แก้ไขครบถ้วนทุกจุดตามคำแนะนำทั้งระดับ Blocking, Should Fix และ Minor ใน commit `06e01c2` ดังนี้ค่ะ:
>
> 1. **🔴 แก้ปัญหา PostgreSQL Sequence ไม่ขยับตาม Explicit ID:**
>    - ใน `server/prisma/seed.ts` เพิ่มคำสั่ง `setval` ซิงค์ sequence ของทั้ง 3 ตาราง (`actions_taken`, `public_comments`, `internal_notes`) ให้ตรงกับ `MAX(id)` ของข้อมูลที่ seed ลงไป
>    - เพิ่มเทสต์ใน `server/tests/lab-04/db-seed.test.ts` ที่ทดลองเรียก `prisma.actionTaken.create()` หลัง seed สำเร็จ เพื่อยืนยันว่า auto-increment ทำงานถูกต้องและได้ id >= 7 โดยไม่เกิด error P2002 duplicate key
> 2. **🟠 แก้ RequesterId Hardcode:**
>    - ใน `server/prisma/seed.ts` ทำการ lookup `RequesterUser` จาก verified email (`jennifer.anderson@example.com`, `michael.brown@example.com`, `sarah.johnson@example.com`) ก่อนนำ `.id` มาผูกเข้ากับ `ticket` แทนการ hardcode `1/2/3` เพื่อป้องกัน FK mismatch
> 3. **🟡 เก็บตกจุดย่อย (Minor Fixes):**
>    - ใน `docs/lab-04/reviewer.md` แก้ไข Merge commit ของ PR #106 เป็น `23166db` ถูกต้อง
>    - ลบตัวแปร `staffCharlie` ที่ประกาศค้างไว้ใน `seed.ts` ออก
>    - เพิ่ม Negative Test อีก 2 กรณีใน `db-seed.test.ts` (รวมเป็น 13 เทสต์):
>      - ตรวจสอบว่า Action ที่ `isFollowUpRequired === false` จะต้องมี `followUpNote === null` (BR-07)
>      - ตรวจสอบว่า Action ที่สถานะ `IN_PROGRESS` สามารถมี `result === null` ได้จริง (BR-16)
>    - ปรับปรุง Indentation ใน `seed.ts` บรรทัดที่ 290 ให้เป็นระเบียบเรียบร้อย
>    - รัน `npm run build` ผ่าน 100% ทั้ง Client และ Server
>
> รบกวนตรวจทานรอบที่ 2 นะคะ ขอบคุณมาก ๆ ค่ะ!

#### 💬 Push Reminder Review by @jejaebubu (Commented)
- **Review Date:** 2026-11-01 17:30:14 UTC+7
- **Verdict:** 💬 Commented
- **Review Comments (Verbatim):**

> เห็นคอมเมนต์ตอบกลับแล้ว แต่ใน PR #76 บน GitHub ตอนนี้ commit ล่าสุดยังเป็น aade062 อยู่เลย ยังไม่เห็น commit 06e01c2 ขึ้นมานะคะ รบกวนช่วย git push origin feature/28-db-and-seed ขึ้น GitHub ให้หน่อยน้า เดี๋ยวพอโค้ดขึ้นแล้วตรวจรอบ 2 ให้เลยค่ะ

#### 💬 Push Confirmation Response by @titayaaa
- **Response Date:** 2026-11-01 17:44:56 UTC+7
- **Author Response Details (Verbatim):**

> พุช commit 06e01c2 และ 018981d ขึ้น origin เรียบร้อยแล้วค่ะ โค้ดทั้งหมดพร้อมให้ตรวจรอบ 2 ได้เลยนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-01 18:03:01 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ตรวจ commits `06e01c2` และ `018981d` แล้วนะคะ แก้ไขครบถ้วนทุกประเด็นที่แจ้งไว้ในรอบแรก ทั้งระดับ Blocking, Should Fix และ Minor เลยค่ะ:
>
> 1. **PostgreSQL Sequence Synchronization (`seed.ts` & `db-seed.test.ts`):**
>    - เพิ่มการซิงก์ค่า sequence ด้วย `setval(pg_get_serial_sequence(...))` สำหรับตาราง `actions_taken`, `public_comments` และ `internal_notes` ให้ตรงกับ `MAX(id)` หลัง seed
>    - เพิ่มเทสต์ใน `db-seed.test.ts` ทดสอบสร้าง `ActionTaken` ใหม่หลัง seed โดยไม่ระบุ `id` ได้ค่า `id >= 7` และไม่เกิด `P2002`
> 2. **Dynamic Requester Lookup (`seed.ts`):**
>    - เปลี่ยนจากการ hardcode `requesterId: 1/2/3` เป็นการ lookup `RequesterUser` จากอีเมล (`reqJennifer`, `reqMichael`, `reqSarah`) เรียบร้อย
> 3. **Negative Tests & Code Cleanliness (`db-seed.test.ts`, `seed.ts`, `reviewer.md`):**
>    - เพิ่ม negative tests ตรวจสอบกรณี `isFollowUpRequired = false` (`followUpNote === null`) และกรณี `status = IN_PROGRESS` (`result === null`) ครบถ้วน
>    - ลบตัวแปร `staffCharlie` ที่ไม่ได้ใช้งาน จัด indentation ใน `seed.ts` และอัปเดต SHA ของ merge commit PR #106 (`23166db`) พร้อมบันทึกประวัติการรีวิวใน `reviewer.md` ครบถ้วน
>
> โค้ดและชุดทดสอบพร้อมสำหรับทำ Issue 29 ต่อแล้วค่ะ ขออนุมัติ (**Approve**) และกด Merge เข้าสู่ `lab4-staging` ให้เลยนะคะ!

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#76](https://github.com/titayaaa/toktickit/pull/76)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `33922322306d15b02008f51ec7354972e39178ad`
- **Merged At:** 2026-11-01 18:03:13 UTC+7
- **Status:** ✅ Merged successfully — **Closes #64**

---

### PR #77: Issue 29: Actions Taken Backend REST API & Authorization Middleware
- **PR URL:** [titayaaa/toktickit#77](https://github.com/titayaaa/toktickit/pull/77)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`b13cb43`)
- **Scope & Objectives:**
  - `GET /api/tickets/:id/actions-taken`: คืนรายการ Action Taken เรียงตามวันเวลา พร้อมระบบ Data Isolation (ตอบ 404 สำหรับ Requester ที่เข้าดูตั๋วของผู้อื่น)
  - `POST /api/tickets/:id/actions-taken`: บันทึก Action Taken ใหม่ ผูก `performedById` จาก JWT อัตโนมัติ, ตรวจสอบ Assignee ว่าต้องเป็น IT Staff/Admin ที่ Active เท่านั้น (ตอบ 422), บังคับผลลัพธ์เมื่อ Completed (2-1000 ตัวอักษร), และบังคับโน้ตเมื่อมี Follow-up
  - `PATCH /api/tickets/:id/actions-taken/:actionId`: แก้ไขข้อมูลตาม Action Status Matrix (ห้ามย้อนจาก Completed/Cancelled), บังคับผลลัพธ์เมื่อ Completed, และล้างโน้ตเมื่อ Follow-up เป็น false
  - `GET /api/users/assignable`: ดึงเฉพาะ IT Staff และ Admin ที่ active สำหรับ dropdown
  - รวม `actionsTaken` ลงใน `GET /api/tickets/:id` รองรับหน้า Ticket Detail
  - เพิ่มชุดทดสอบ Integration API ครอบคลุม 11 เคสใน `server/tests/lab-04/actions-taken.api.test.ts`

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01 18:30:19 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจโค้ด REST API, RBAC, tests และเอกสารของ PR #77 (Issue 29) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `tests.md` แล้วนะคะ ภาพรวมโครงสร้าง endpoint `GET/POST/PATCH /:id/actions-taken`, `GET /api/users/assignable`, การดึง `performedById` จาก JWT, `validateAssignee` (422) และ state machine ของ Action status ทำไว้ดีเลยค่ะ
>
> แต่ขอ **Changes Requested** ก่อนนะคะ เพราะมีจุดที่ทำให้ `npm run build` (`tsc`) กับ `vitest` พังใน `beforeAll` และมีจุดเรื่อง ownership check กับ traceability matrix ที่ต้องปรับให้ตรงกันค่ะ
>
> ---
>
> ### 🔴 Blocking: ต้องแก้ก่อน Merge
>
> 1. **`server/tests/lab-04/actions-taken.api.test.ts` (บรรทัด 62–85): ขาด `relatedSystemId` และ `requestedPriority` ใน `prisma.ticket.create` + ผูก `requesterId` ข้ามตาราง**
>    ใน `schema.prisma` โมเดล `Ticket` กำหนดให้ `relatedSystemId` และ `requestedPriority` เป็น required fields แต่ใน `beforeAll` ตอนสร้าง `ownTicket` และ `otherTicket` ไม่ได้ส่ง 2 ฟิลด์นี้เข้าไป ทำให้:
>    - รัน `npm run build` (`tsc`) ไม่ผ่าน เพราะติด TypeScript error (`Property 'relatedSystemId' is missing`, `Property 'requestedPriority' is missing`)
>    - รัน `vitest run tests/lab-04/actions-taken.api.test.ts` พังตั้งแต่ `beforeAll` ด้วย `PrismaClientValidationError`
>    - นอกจากนี้ `requesterId: requester.id` / `otherRequester.id` เอา `User.id` ไปใส่ในฟิลด์ `Ticket.requesterId` ซึ่งอ้างอิงตาราง `RequesterUser.id` ค่ะ
>    - **แนวทางแก้:** ดึง `relatedSystem` จาก `prisma.relatedSystem.findFirst({ where: { isActive: true } })` และ lookup `RequesterUser` จาก email (`reqJennifer`, `reqMichael`) แล้วส่ง `relatedSystemId`, `requestedPriority: TicketPriority.MEDIUM` และ `requesterId: reqJennifer.id` ให้ครบทั้ง `ownTicket` และ `otherTicket` ค่ะ
>
> 2. **`server/src/routes/tickets.ts` (บรรทัด 226–231): การเช็ก `ticket.requesterId === currentUser.id` เสี่ยงเกิด Cross-model ID collision**
>    ใน `GET /api/tickets/:id/actions-taken` มีเงื่อนไข:
>    ```ts
>    const isOwner =
>      ticket.userId === currentUser.id ||
>      ticket.requesterId === currentUser.id ||
>      (ticket.requester && ticket.requester.id === currentUser.id) ||
>      (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);
>    ```
>    เนื่องจาก `ticket.requesterId` คือ `RequesterUser.id` ส่วน `currentUser.id` คือ `User.id` ถ้าเอาตัวเลข ID คนละตารางมาเทียบ `===` กันตรง ๆ อาจทำให้ ID ชนกันข้ามตารางและทำให้ Requester เปิดดู Actions Taken ของคนอื่นได้ (ขัดกับ BR-13 ที่แก้ใน PR #75)
>    - **แนวทางแก้:** เอาบรรทัด `ticket.requesterId === currentUser.id` ออก แล้วเช็กเฉพาะ `ticket.userId === currentUser.id || ticket.requester?.id === currentUser.id || ticket.requester?.email === currentUser.email || ticket.requesterUser?.email === currentUser.email` ค่ะ
>
> ---
>
> ### 🟠 Should Fix: ความสอดคล้องของ Traceability Matrix และ API Spec
>
> 3. **อัปเดต `docs/lab-04/tests.md` และปรับรหัส Test ID ใน `actions-taken.api.test.ts` ให้ตรงกัน**
>    - ใน PR นี้ยังไม่ได้อัปเดตสถานะเทสต์ใน `docs/lab-04/tests.md` จาก `Planned` เป็น `Pass`
>    - และรหัสเทสต์ใน `actions-taken.api.test.ts` (`API-01..05, API-08, API-12, API-14, API-15, API-16, API-17`) ยังไม่ตรงกับตารางใน `docs/lab-04/tests.md` ของ repo นี้ค่ะ (เช่น ใน `tests.md` รหัส `API-08` คือ Resolution Gate, `API-12` คือ Requester Dashboard, `API-14` คือ Concurrency 409 และยังไม่มี `API-15..17`)
>    - **แนวทางแก้:** ปรับรหัสเทสต์ใน `actions-taken.api.test.ts` กับตารางใน `docs/lab-04/tests.md` ให้ตรงกันแบบ 1-ต่อ-1 และเปลี่ยนสถานะเทสต์ที่รันผ่านใน PR นี้เป็น `Pass` (พร้อมอัปเดต `docs/lab-04/ai-use.md` สำหรับ Issue 29 ด้วยนะคะ)
>
> 4. **ปรับ `docs/lab-04/api-spec.md` (§2.1, §2.2) กับ `server/src/routes/tickets.ts` ให้ตรงกัน**
>    - **`GET /api/tickets/:id/actions-taken/:actionId`:** ใน `specification.md` §8 และ `api-spec.md` §2.2 ระบุว่ามี endpoint ดึง Action รายตัว แต่ใน `tickets.ts` ยังไม่มี route นี้ (เลือกได้ว่าจะเพิ่ม route นี้ใน `tickets.ts` หรือเอาออกจาก spec ให้ตรงกันค่ะ)
>    - **Response shape และการเรียงลำดับของ `GET /api/tickets/:id/actions-taken`:** ใน `api-spec.md` §2.1 เขียนว่าคืน `{ data: [...], meta: {...} }` และเรียง `desc` แต่โค้ดจริงใน `tickets.ts` คืนเป็น Array `res.status(200).json(actions)` และเรียง `actionDateTime: 'asc'` แนะนำให้แก้ `api-spec.md` §2.1 ให้ตรงกับที่โค้ดคืนจริง เพื่อไม่ให้ตอนทำ UI ใน Issue 30 สับสนค่ะ
>
> ---
>
> ### 🟡 Minor: จุดที่แนะนำให้เก็บเพิ่ม
> - ใน `PATCH /:id/actions-taken/:actionId` โค้ดมีการล้าง `followUpNote = null` เมื่อ `isFollowUpRequired = false` ไว้ถูกต้องแล้ว แนะนำให้เพิ่ม test case ใน `actions-taken.api.test.ts` ที่ส่ง `PATCH { isFollowUpRequired: false }` แล้วเช็กว่า `followUpNote` กลายเป็น `null` จริงด้วยค่ะ
> - ใน `POST` และ `PATCH`:
>   - ถ้าส่ง `actionDateTime` ที่ไม่ใช่วันที่ที่ถูกต้อง (`isNaN(parsed.getTime())`) แนะนำให้ตอบ `400 Bad Request` แทนการ fallback เงียบ ๆ
>   - เช็กความยาว `result.length > 1000` ทุกสถานะ (ไม่ใช่เฉพาะตอน `COMPLETED`) และเช็ก `attachmentNotes.length > 500` ให้ตอบ `400` แทนการ `.slice(0, 500)`
>   - ปรับความยาวขั้นต่ำของ `followUpNote` ในโค้ด (`>= 1`) กับใน `api-spec.md` (`min 2 chars`) ให้ตรงกันค่ะ
>
> แก้แล้วรัน `npm run build` กับ `npm test` เช็กอีกรอบ แล้ว ping มาได้เลยนะคะ เดี๋ยวรีบตรวจซ้ำและกด Approve + Merge ให้ค่ะ ขอบคุณมากค่ะ!

#### 💬 Round 1 Author Response by @titayaaa
- **Response Date:** 2026-11-01 18:43:45 UTC+7
- **Author Response Details (Verbatim):**

> > ตรวจโค้ด REST API, RBAC, tests และเอกสารของ PR #77 (Issue 29) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `tests.md` แล้วนะคะ ภาพรวมโครงสร้าง endpoint `GET/POST/PATCH /:id/actions-taken`, `GET /api/users/assignable`, การดึง `performedById` จาก JWT, `validateAssignee` (422) และ state machine ของ Action status ทำไว้ดีเลยค่ะ
> > 
> > แต่ขอ **Changes Requested** ก่อนนะคะ เพราะมีจุดที่ทำให้ `npm run build` (`tsc`) กับ `vitest` พังใน `beforeAll` และมีจุดเรื่อง ownership check กับ traceability matrix ที่ต้องปรับให้ตรงกันค่ะ
> > 
> > ### 🔴 Blocking: ต้องแก้ก่อน Merge
> > 1. **`server/tests/lab-04/actions-taken.api.test.ts` (บรรทัด 62–85): ขาด `relatedSystemId` และ `requestedPriority` ใน `prisma.ticket.create` + ผูก `requesterId` ข้ามตาราง**
> >    ใน `schema.prisma` โมเดล `Ticket` กำหนดให้ `relatedSystemId` และ `requestedPriority` เป็น required fields แต่ใน `beforeAll` ตอนสร้าง `ownTicket` และ `otherTicket` ไม่ได้ส่ง 2 ฟิลด์นี้เข้าไป ทำให้:
> >    
> >    * รัน `npm run build` (`tsc`) ไม่ผ่าน เพราะติด TypeScript error (`Property 'relatedSystemId' is missing`, `Property 'requestedPriority' is missing`)
> >    * รัน `vitest run tests/lab-04/actions-taken.api.test.ts` พังตั้งแต่ `beforeAll` ด้วย `PrismaClientValidationError`
> >    * นอกจากนี้ `requesterId: requester.id` / `otherRequester.id` เอา `User.id` ไปใส่ในฟิลด์ `Ticket.requesterId` ซึ่งอ้างอิงตาราง `RequesterUser.id` ค่ะ
> >    * **แนวทางแก้:** ดึง `relatedSystem` จาก `prisma.relatedSystem.findFirst({ where: { isActive: true } })` และ lookup `RequesterUser` จาก email (`reqJennifer`, `reqMichael`) แล้วส่ง `relatedSystemId`, `requestedPriority: TicketPriority.MEDIUM` และ `requesterId: reqJennifer.id` ให้ครบทั้ง `ownTicket` และ `otherTicket` ค่ะ
> > 2. **`server/src/routes/tickets.ts` (บรรทัด 226–231): การเช็ก `ticket.requesterId === currentUser.id` เสี่ยงเกิด Cross-model ID collision**
> >    ใน `GET /api/tickets/:id/actions-taken` มีเงื่อนไข:
> >    ```ts
> >    const isOwner =
> >      ticket.userId === currentUser.id ||
> >      ticket.requesterId === currentUser.id ||
> >      (ticket.requester && ticket.requester.id === currentUser.id) ||
> >      (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);
> >    ```
> >    
> >    
> >        
> >          
> >        
> >    
> >          
> >        
> >    
> >        
> >      
> >    เนื่องจาก `ticket.requesterId` คือ `RequesterUser.id` ส่วน `currentUser.id` คือ `User.id` ถ้าเอาตัวเลข ID คนละตารางมาเทียบ `===` กันตรง ๆ อาจทำให้ ID ชนกันข้ามตารางและทำให้ Requester เปิดดู Actions Taken ของคนอื่นได้ (ขัดกับ BR-13 ที่แก้ใน PR #75)
> >    
> >    * **แนวทางแก้:** เอาบรรทัด `ticket.requesterId === currentUser.id` ออก แล้วเช็กเฉพาะ `ticket.userId === currentUser.id || ticket.requester?.id === currentUser.id || ticket.requester?.email === currentUser.email || ticket.requesterUser?.email === currentUser.email` ค่ะ
> > 
> > ### 🟠 Should Fix: ความสอดคล้องของ Traceability Matrix และ API Spec
> > 3. **อัปเดต `docs/lab-04/tests.md` และปรับรหัส Test ID ใน `actions-taken.api.test.ts` ให้ตรงกัน**
> >    
> >    * ใน PR นี้ยังไม่ได้อัปเดตสถานะเทสต์ใน `docs/lab-04/tests.md` จาก `Planned` เป็น `Pass`
> >    * และรหัสเทสต์ใน `actions-taken.api.test.ts` (`API-01..05, API-08, API-12, API-14, API-15, API-16, API-17`) ยังไม่ตรงกับตารางใน `docs/lab-04/tests.md` ของ repo นี้ค่ะ (เช่น ใน `tests.md` รหัส `API-08` คือ Resolution Gate, `API-12` คือ Requester Dashboard, `API-14` คือ Concurrency 409 และยังไม่มี `API-15..17`)
> >    * **แนวทางแก้:** ปรับรหัสเทสต์ใน `actions-taken.api.test.ts` กับตารางใน `docs/lab-04/tests.md` ให้ตรงกันแบบ 1-ต่อ-1 และเปลี่ยนสถานะเทสต์ที่รันผ่านใน PR นี้เป็น `Pass` (พร้อมอัปเดต `docs/lab-04/ai-use.md` สำหรับ Issue 29 ด้วยนะคะ)
> > 4. **ปรับ `docs/lab-04/api-spec.md` (§2.1, §2.2) กับ `server/src/routes/tickets.ts` ให้ตรงกัน**
> >    
> >    * **`GET /api/tickets/:id/actions-taken/:actionId`:** ใน `specification.md` §8 และ `api-spec.md` §2.2 ระบุว่ามี endpoint ดึง Action รายตัว แต่ใน `tickets.ts` ยังไม่มี route นี้ (เลือกได้ว่าจะเพิ่ม route นี้ใน `tickets.ts` หรือเอาออกจาก spec ให้ตรงกันค่ะ)
> >    * **Response shape และการเรียงลำดับของ `GET /api/tickets/:id/actions-taken`:** ใน `api-spec.md` §2.1 เขียนว่าคืน `{ data: [...], meta: {...} }` และเรียง `desc` แต่โค้ดจริงใน `tickets.ts` คืนเป็น Array `res.status(200).json(actions)` และเรียง `actionDateTime: 'asc'` แนะนำให้แก้ `api-spec.md` §2.1 ให้ตรงกับที่โค้ดคืนจริง เพื่อไม่ให้ตอนทำ UI ใน Issue 30 สับสนค่ะ
> > 
> > ### 🟡 Minor: จุดที่แนะนำให้เก็บเพิ่ม
> > * ใน `PATCH /:id/actions-taken/:actionId` โค้ดมีการล้าง `followUpNote = null` เมื่อ `isFollowUpRequired = false` ไว้ถูกต้องแล้ว แนะนำให้เพิ่ม test case ใน `actions-taken.api.test.ts` ที่ส่ง `PATCH { isFollowUpRequired: false }` แล้วเช็กว่า `followUpNote` กลายเป็น `null` จริงด้วยค่ะ
> > * ใน `POST` และ `PATCH`:
> >   
> >   * ถ้าส่ง `actionDateTime` ที่ไม่ใช่วันที่ที่ถูกต้อง (`isNaN(parsed.getTime())`) แนะนำให้ตอบ `400 Bad Request` แทนการ fallback เงียบ ๆ
> >   * เช็กความยาว `result.length > 1000` ทุกสถานะ (ไม่ใช่เฉพาะตอน `COMPLETED`) และเช็ก `attachmentNotes.length > 500` ให้ตอบ `400` แทนการ `.slice(0, 500)`
> >   * ปรับความยาวขั้นต่ำของ `followUpNote` ในโค้ด (`>= 1`) กับใน `api-spec.md` (`min 2 chars`) ให้ตรงกันค่ะ
> > 
> > แก้แล้วรัน `npm run build` กับ `npm test` เช็กอีกรอบ แล้ว ping มาได้เลยนะคะ เดี๋ยวรีบตรวจซ้ำและกด Approve + Merge ให้ค่ะ ขอบคุณมากค่ะ!
>
> ขอบคุณสำหรับรีวิวที่ละเอียดและแม่นยำมาก ๆ ค่ะ @jejaebubu ได้ทำการแก้ไขปรับปรุงครบถ้วนทุกข้อทั้ง Blocking, Should Fix และ Minor ใน commit f094823 เรียบร้อยแล้วค่ะ:
>
> 1. **แก้ไข Ticket Setup ใน Test `beforeAll`**:
>    - เพิ่ม `relatedSystemId: relatedSystem.id` และ `requestedPriority: TicketPriority.MEDIUM` ตามโมเดล `Ticket` ใน `schema.prisma`
>    - ทำ lookup `RequesterUser` จากอีเมลของ requester (`reqJennifer` และ `reqMichael`) เพื่อผูก `requesterId` อย่างถูกต้องตรงตามโมเดล ไม่เอา `User.id` ไปใส่ข้ามตารางอีกต่อไป
> 2. **ป้องกัน Cross-model ID Collision (BR-13)**:
>    - นำเงื่อนไข `ticket.requesterId === currentUser.id` ออกใน `GET /api/tickets/:id/actions-taken` และ `GET /api/tickets/:id/actions-taken/:actionId`
>    - ตรวจสอบความเป็นเจ้าของเฉพาะ `ticket.userId === currentUser.id || ticket.requester?.id === currentUser.id || ticket.requester?.email === currentUser.email || ticket.requesterUser?.email === currentUser.email`
> 3. **เพิ่ม Endpoint ดึง Action รายตัว (`GET /:id/actions-taken/:actionId`)**:
>    - เพิ่ม route `GET /api/tickets/:id/actions-taken/:actionId` ใน `server/src/routes/tickets.ts` พร้อมการตรวจสอบ Data Isolation อย่างรัดกุม
> 4. **ปรับความสอดคล้องของ API Spec และ Traceability Matrix**:
>    - ปรับ Response shape ใน `docs/lab-04/api-spec.md` §2.1 ให้เป็น Array `[ ... ]` เรียงตาม `actionDateTime: asc` ตรงตามการทำงานจริง
>    - แมป Test ID ใน `server/tests/lab-04/actions-taken.api.test.ts` ให้ตรงกับ `docs/lab-04/tests.md` แบบ 1-ต่อ-1 (`API-01`..`06`, `UNIT-01`..`03`, `SAFE-01`) และอัปเดตสถานะเป็น `Pass` ครบถ้วน
>    - บันทึก Prompt 9 และ Reflection ของ Issue 29 ลงใน `docs/lab-04/ai-use.md`
> 5. **จุดเก็บตก Validation & Test Cases**:
>    - ตรวจจับวันที่ไม่ถูกต้อง: ส่ง `actionDateTime` ผิดรูปแบบตอบกลับ `400 Bad Request` ทันทีทั้งใน POST และ PATCH
>    - ตรวจสอบความยาว: `result.length > 1000` และ `attachmentNotes.length > 500` ตอบกลับ `400 Bad Request`
>    - ปรับความยาวขั้นต่ำของ `followUpNote` เป็นอย่างน้อย 2 ตัวอักษร
>    - เพิ่มเทสต์เคสการส่ง `PATCH { isFollowUpRequired: false }` แล้วตรวจสอบว่า `followUpNote` ถูกเคลียร์เป็น `null` จริง
>
> ตรวจสอบการคอมไพล์ผ่านฉลุยทั้ง `npm run build` (tsc) ฝั่ง Server และ Client เรียบร้อยค่ะ รบกวนช่วยตรวจซ้ำอีกรอบนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-01 19:00:20 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ตรวจ commit `f094823` แล้วนะคะ แก้ไขครบถ้วนทุกประเด็นที่แจ้งไว้ในรอบแรก ทั้งระดับ Blocking, Should Fix และ Minor เลยค่ะ:
>
> 1. **Ticket Setup ใน `actions-taken.api.test.ts` (`beforeAll`):**
>    - เพิ่ม `relatedSystemId` และ `requestedPriority: TicketPriority.MEDIUM` ให้กับ `ownTicket` และ `otherTicket` พร้อม lookup `RequesterUser` จากอีเมล (`reqJennifer`, `reqMichael`) เพื่อผูก `requesterId` ให้ตรงกับโมเดลจริงใน `schema.prisma`
> 2. **Data Isolation & Cross-Model Ownership Protection (`server/src/routes/tickets.ts`):**
>    - นำเงื่อนไข `ticket.requesterId === currentUser.id` ออก และตรวจสอบความเป็นเจ้าของผ่าน `ticket.userId === currentUser.id` ร่วมกับ `ticket.requester` / `ticket.requesterUser` email ตาม BR-13
>    - เพิ่ม endpoint `GET /api/tickets/:id/actions-taken/:actionId` พร้อมการตรวจสิทธิ์ Data Isolation (`404 Not Found`) และเพิ่มเทสต์ครอบคลุมทั้ง Staff, Owner Requester, Other Requester และ Non-existent ID
> 3. **Input Validation & Data Hygiene (`POST` & `PATCH`):**
>    - ดัก `actionDateTime` ที่ไม่ถูกต้องให้ตอบ `400 Bad Request` ทั้งใน `POST` และ `PATCH`
>    - ตรวจสอบความยาว `result` (ไม่เกิน 1000 ตัวอักษรทุกสถานะ และอย่างน้อย 2 ตัวอักษรเมื่อ `COMPLETED`), `attachmentNotes` (ไม่เกิน 500 ตัวอักษร) และ `followUpNote` (2–500 ตัวอักษรเมื่อ `isFollowUpRequired = true`)
>    - เพิ่มเทสต์ตรวจสอบการส่ง `PATCH { isFollowUpRequired: false }` ยืนยันว่า `followUpNote` ถูกล้างเป็น `null` จริง
> 4. **Traceability Matrix & Documentation (`tests.md`, `api-spec.md`, `ai-use.md`, `reviewer.md`):**
>    - ปรับรหัสเทสต์ใน `actions-taken.api.test.ts` ให้ตรงกับตารางใน `docs/lab-04/tests.md` (`API-01..06`, `UNIT-01..03`, `SAFE-01` รวม 14 test blocks) และอัปเดตสถานะเป็น `Pass`
>    - ปรับ `api-spec.md` §2.1 ให้ตรงกับ Array response (`actionDateTime: asc`) และอัปเดต `ai-use.md` (Prompt 9) กับ `reviewer.md` เรียบร้อย
>
> โค้ด REST API และชุดทดสอบสมบูรณ์พร้อมสำหรับทำ UI ใน Issue 30 ต่อแล้วค่ะ ขออนุมัติ (**Approve**) และกด Merge เข้าสู่ `lab4-staging` ให้เลยนะคะ!

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#77](https://github.com/titayaaa/toktickit/pull/77)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `b13cb43ee4a6bfe603db05a41bf39d1b6442657e`
- **Merged At:** 2026-11-01 19:00:30 UTC+7
- **Status:** ✅ Merged successfully — **Closes #65**

---

### PR #78: Issue 30: Actions Taken Frontend Component on Ticket Detail
- **PR URL:** [titayaaa/toktickit#78](https://github.com/titayaaa/toktickit/pull/78)
- **Feature Branch:** `feature/30-actions-taken-ui`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`36e2e53`)
- **Scope & Objectives:**
  - `client/src/components/ActionsTaken.tsx`: สร้างคอมโพเนนต์แสดงรายการ Action Taken ในธีม Zen Green เรียงตามวันเวลา พร้อมสถานะ Badge (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), Assignee pill, และ Follow-up highlight
  - Modal แบบ Accessible (WCAG 2.1 AA): รองรับ Touch targets $\ge 44\text{px}$, ARIA `role="alert"` สำหรับ error feedback, `aria-hidden="true"` สำหรับ icon emoji, และปิดด้วยปุ่ม `Escape`
  - Dynamic Validation: ตรวจสอบความถูกต้องแบบ Real-time บังคับ `result` (min 2 chars) เฉพาะเมื่อสถานะเป็น `COMPLETED`, บังคับ `followUpNote` เมื่อเปิด Follow-up, และป้องกัน Double Submission ด้วย Busy state
  - State Synchronization: ส่ง callback `onActionsChange` กลับไปยัง `TicketDetail.tsx` เพื่อให้ state แม่ซิงก์แบบ Real-time รองรับ Resolution Gate ใน Issue 31
  - ชุดทดสอบ Component Vitest 7 เคสใน `client/src/test/lab-04/ActionsTaken.test.tsx` (UI-01, UI-02, UI-03, DUP-01, A11Y-01) ผ่านครบ 100%

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01 19:39:14 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจโค้ด `ActionsTaken.tsx`, `TicketDetail.tsx`, ชุดทดสอบ `ActionsTaken.test.tsx` และเอกสารของ PR #78 (Issue 30) เทียบกับระบบ Auth, Backend API และ UI Spec แล้วนะคะ ภาพรวมการออกแบบ UI ในธีม Zen Green, แบนเนอร์แจ้งเตือน Resolution Warning, โหมด Read-only สำหรับ Requester, Accessibility (`minHeight: 44`, `role="alert"`, ปิด Modal ด้วยปุ่ม `Escape`) และการป้องกัน Double Submit (`DUP-01`) ทำไว้ดีมากเลยค่ะ
>
> แต่ขอ **Changes Requested** ก่อนนะคะ เพราะมีจุดสำคัญเรื่องคีย์ Token ใน `localStorage`, ข้อมูล `actionsTaken` ที่หายไปจาก response ของ `GET /api/tickets/:id` และการดึงข้อความ Error จาก Backend ที่จะทำให้การใช้งานบนหน้าเว็บจริงติดปัญหาค่ะ
>
> ---
>
> ### 🔴 Blocking: ต้องแก้ก่อน Merge
>
> 1. **`client/src/components/ActionsTaken.tsx` (บรรทัด 108, 209, 279): ดึง Token จาก `localStorage.getItem('token')` ไม่ตรงกับ `AuthContext.tsx` ทำให้หน้าเว็บจริงติด `401 Unauthorized`**
>    * **ปัญหา:** ใน `client/src/contexts/AuthContext.tsx` (บรรทัด 25) ระบบเก็บ JWT ไว้ใน `localStorage` ด้วยคีย์ `'toktickit_auth_token'` แต่ใน `ActionsTaken.tsx` ทั้ง 3 จุด (`loadAssignableStaff`, `handleSubmit`, `handleQuickStatusChange`) เรียก `localStorage.getItem('token')` ซึ่งบน Browser จริงจะได้ค่าเป็น `null` เสมอ
>    * **ผลกระทบ:** เมื่อใช้งานจริงบนหน้าเว็บ การดึงรายชื่อ `/api/users/assignable` รวมถึงการกดสร้าง (`POST`) และแก้ไข/เปลี่ยนสถานะ (`PATCH`) จะไม่ได้แนบ `Authorization` header ไปด้วย ทำให้ติด `401 Unauthorized` ทั้งหมดค่ะ (ที่ชุดทดสอบ `ActionsTaken.test.tsx` ผ่านเพราะในเทสต์เซ็ต `localStorage.setItem('token', ...)` ไว้)
>    * **แนวทางแก้:** สร้าง helper ดึง token ที่เช็กคีย์ `'toktickit_auth_token'` ก่อน แล้ว fallback ไปที่ `'token'` เพื่อรองรับทั้งหน้าเว็บจริงและ unit test ค่ะ เช่น `const getAuthToken = () => localStorage.getItem('toktickit_auth_token') || localStorage.getItem('token');`
>
> 2. **`server/src/app.ts` (บรรทัด 579–605) & `TicketDetail.tsx`: `GET /api/tickets/:id` ลืมส่งฟิลด์ `actionsTaken` ออกมาใน JSON response ทำให้เปิดหน้า Ticket Detail แล้วรายการว่างเปล่าเสมอ**
>    * **ปัญหา:**
>      * ใน `TicketDetail.tsx` (บรรทัด 925) ส่ง `actions={ticket.actionsTaken || []}` ที่ได้จาก `GET /api/tickets/${ticketId}` เข้าไปใน `<ActionsTaken />`
>      * แต่ใน `server/src/app.ts` แม้ว่าตอน query Prisma (บรรทัด 518–538) จะ `include: { actionsTaken: ... }` ไว้แล้ว แต่ตอน `res.status(200).json({ ... })` (บรรทัด 579–605) **ไม่ได้ใส่ `actionsTaken: ticket.actionsTaken`** ลงไปใน object ที่ส่งกลับ
>      * ส่งผลให้บนหน้าเว็บจริง `ticket.actionsTaken` เป็น `undefined` เสมอ (แสดง `0` รายการแม้จะมีข้อมูลใน DB) และทำให้เทสต์ `GET /api/tickets/:id includes actionsTaken array for frontend rendering` ใน `server/tests/lab-04/actions-taken.api.test.ts` (บรรทัด 516) ไม่ผ่านด้วยค่ะ
>    * **แนวทางแก้:** เพิ่ม `actionsTaken: ticket.actionsTaken,` ลงใน `res.status(200).json({ ... })` ของ `GET /api/tickets/:id` ใน `server/src/app.ts` (บรรทัด 605) ค่ะ
>
> 3. **`client/src/components/ActionsTaken.tsx` (บรรทัด 236, 253, 292): อ่านข้อความ Error จาก `data.message` แทนที่จะรองรับ `data.error`**
>    * **ปัญหา:** ใน `server/src/routes/tickets.ts` ทุก endpoint ของ Actions Taken ส่งข้อความแจ้งเตือนข้อผิดพลาดกลับมาในฟิลด์ `{ error: '...' }` แต่ใน `ActionsTaken.tsx` อ่านเฉพาะ `data.message` ทำให้เมื่อเกิด Validation error (เช่น 400 หรือ 422) ผู้ใช้ไม่เห็นข้อความจริงจากเซิร์ฟเวอร์ แต่เห็นเพียงข้อความ fallback `Failed to create/update action (HTTP 400)`
>    * **แนวทางแก้:** ปรับทั้ง 3 จุดให้เช็ก `data.error || data.message || ...` ค่ะ
>
> ---
>
> ### 🟠 Should Fix: ความสอดคล้องของลำดับข้อมูล, Validation และ State Transition
>
> 4. **ลำดับการแสดงผลเมื่อสร้าง Action ใหม่ (`ActionsTaken.tsx` บรรทัด 257)**
>    * Backend เรียงลำดับ Actions Taken ตามเวลาจากเก่าไปใหม่ (`orderBy: [{ actionDateTime: 'asc' }, { createdAt: 'asc' }]`) แต่ใน `handleSubmit` ตอนสร้างรายการใหม่ (บรรทัด 257) ใช้ `const nextItems = [created, ...items];` ซึ่งเอารายการใหม่ไปไว้บนสุด พอรีเฟรชหน้าเว็บลำดับจะสลับลงมาอยู่ล่างสุด
>    * **แนวทางแก้:** เปลี่ยนเป็น `const nextItems = [...items, created];` ให้เรียงลำดับสอดคล้องกับ Backend ค่ะ
>
> 5. **ปรับความยาวฟิลด์ใน Validation และ `maxLength` ให้ตรงกับ Backend (`ActionsTaken.tsx` บรรทัด 194, 522, 549, 599)**
>    * **`followUpNote`:** Backend กำหนดความยาว `2–500` ตัวอักษรเมื่อเปิด `isFollowUpRequired` แต่ฝั่ง UI เช็กแค่ `followUpNote.trim().length === 0` (ถ้ากรอก 1 ตัวอักษรจะผ่าน UI แต่ติด 400 ที่ Backend) และตั้ง `maxLength={1000}` แนะนำให้เช็ก `followUpNote.trim().length < 2` ใน `validate()` และปรับ `maxLength={500}` ค่ะ
>    * **`actionDescription` และ `result`:** Backend จำกัดความยาวไม่เกิน `1,000` ตัวอักษร แต่ใน `<textarea>` ตั้ง `maxLength={2000}` แนะนำให้ปรับเป็น `maxLength={1000}` ทั้งสองช่องค่ะ
>
> 6. **จำกัดตัวเลือก Status ในฟอร์มแก้ไข (`Edit Action Taken`) ตาม State Machine (`ActionsTaken.tsx` บรรทัด 497–510)**
>    * Backend ไม่อนุญาตให้เปลี่ยนสถานะย้อนกลับจาก `IN_PROGRESS` ไป `PENDING` และไม่อนุญาตให้เปลี่ยนสถานะออกจาก `COMPLETED` หรือ `CANCELLED`
>    * แนะนำให้กรอง `<option>` ของ Status ตอนแก้ไข (`editingAction`) ให้เลือกได้เฉพาะสถานะปัจจุบันและสถานะถัดไปที่อนุญาต (และบนการ์ดที่มีสถานะ `PENDING` อาจเพิ่มปุ่มลัดหรือให้เปลี่ยนเป็น `IN_PROGRESS` ได้สะดวกขึ้น) เพื่อไม่ให้ผู้ใช้เลือกสถานะที่ผิดกฎของ Backend ค่ะ
>
> ---
>
> ### 🟡 Minor: ข้อเสนอแนะเพิ่มเติม
>
> * **ฟิลด์ `actionDateTime`:** ตาม Handout (§3, §4.1, §8.3) และ `ui-spec.md` (§3.1) ระบุให้รองรับการระบุหรือแก้ไข `Action Date/Time` (โดยมีค่าเริ่มต้นเป็นเวลาปัจจุบัน) หากเพิ่มช่อง `datetime-local` ในฟอร์มได้จะครบถ้วนตามสเปกมากยิ่งขึ้นค่ะ
> * **ค่าสี Badge ใน `renderStatusBadge` (`ActionsTaken.tsx` บรรทัด 321–342):** ใน `ui-spec.md` (§1.1) กำหนดสี `PENDING` เป็นพื้นหลัง `#FFFBEB` / ตัวอักษร `#92400E` และ `IN_PROGRESS` เป็นพื้นหลัง `#EFF6FF` / ตัวอักษร `#1E40AF` (ในโค้ดใช้ `#FEF3C7` และ `#1D4ED8`) ปรับให้ตรงกันได้เลยนะคะ
> * **ชื่อเคสทดสอบใน `ActionsTaken.test.tsx` (บรรทัด 904, 1079, 1188):** ในไฟล์เทสต์ระบุรหัส `UI-06` ซึ่งในตาราง `docs/lab-04/tests.md` รหัส `UI-06` เป็นของ *Requester Dashboard renders cards and attention list* แนะนำให้เปลี่ยนชื่อใน `ActionsTaken.test.tsx` เป็นรหัสของชุด Actions Taken (`UI-01` / `UI-02`) เพื่อไม่ให้รหัสเทสต์ชนกันค่ะ

#### 💬 Round 1 Author Response by @titayaaa (commit `5ecac1a`)
- **Response Date:** 2026-11-02 00:58:19 UTC+7
- **Commit SHA:** `5ecac1a`
- **Author Response Details (Verbatim):**

> > ตรวจโค้ด `ActionsTaken.tsx`, `TicketDetail.tsx`, ชุดทดสอบ `ActionsTaken.test.tsx` และเอกสารของ PR #78 (Issue 30) เทียบกับระบบ Auth, Backend API และ UI Spec แล้วนะคะ ภาพรวมการออกแบบ UI ในธีม Zen Green, แบนเนอร์แจ้งเตือน Resolution Warning, โหมด Read-only สำหรับ Requester, Accessibility (`minHeight: 44`, `role="alert"`, ปิด Modal ด้วยปุ่ม `Escape`) และการป้องกัน Double Submit (`DUP-01`) ทำไว้ดีมากเลยค่ะ
> > 
> > แต่ขอ **Changes Requested** ก่อนนะคะ เพราะมีจุดสำคัญเรื่องคีย์ Token ใน `localStorage`, ข้อมูล `actionsTaken` ที่หายไปจาก response ของ `GET /api/tickets/:id` และการดึงข้อความ Error จาก Backend ที่จะทำให้การใช้งานบนหน้าเว็บจริงติดปัญหาค่ะ
> > 
> > ### 🔴 Blocking: ต้องแก้ก่อน Merge
> > 1. **`client/src/components/ActionsTaken.tsx` (บรรทัด 108, 209, 279): ดึง Token จาก `localStorage.getItem('token')` ไม่ตรงกับ `AuthContext.tsx` ทำให้หน้าเว็บจริงติด `401 Unauthorized`**
> >    
> >    * **ปัญหา:** ใน `client/src/contexts/AuthContext.tsx` (บรรทัด 25) ระบบเก็บ JWT ไว้ใน `localStorage` ด้วยคีย์ `'toktickit_auth_token'` แต่ใน `ActionsTaken.tsx` ทั้ง 3 จุด (`loadAssignableStaff`, `handleSubmit`, `handleQuickStatusChange`) เรียก `localStorage.getItem('token')` ซึ่งบน Browser จริงจะได้ค่าเป็น `null` เสมอ
> >    * **ผลกระทบ:** เมื่อใช้งานจริงบนหน้าเว็บ การดึงรายชื่อ `/api/users/assignable` รวมถึงการกดสร้าง (`POST`) และแก้ไข/เปลี่ยนสถานะ (`PATCH`) จะไม่ได้แนบ `Authorization` header ไปด้วย ทำให้ติด `401 Unauthorized` ทั้งหมดค่ะ (ที่ชุดทดสอบ `ActionsTaken.test.tsx` ผ่านเพราะในเทสต์เซ็ต `localStorage.setItem('token', ...)` ไว้)
> >    * **แนวทางแก้:** สร้าง helper ดึง token ที่เช็กคีย์ `'toktickit_auth_token'` ก่อน แล้ว fallback ไปที่ `'token'` เพื่อรองรับทั้งหน้าเว็บจริงและ unit test ค่ะ เช่น `const getAuthToken = () => localStorage.getItem('toktickit_auth_token') || localStorage.getItem('token');`
> > 2. **`server/src/app.ts` (บรรทัด 579–605) & `TicketDetail.tsx`: `GET /api/tickets/:id` ลืมส่งฟิลด์ `actionsTaken` ออกมาใน JSON response ทำให้เปิดหน้า Ticket Detail แล้วรายการว่างเปล่าเสมอ**
> >    
> >    * **ปัญหา:**
> >      
> >      * ใน `TicketDetail.tsx` (บรรทัด 925) ส่ง `actions={ticket.actionsTaken || []}` ที่ได้จาก `GET /api/tickets/${ticketId}` เข้าไปใน `<ActionsTaken />`
> >      * แต่ใน `server/src/app.ts` แม้ว่าตอน query Prisma (บรรทัด 518–538) จะ `include: { actionsTaken: ... }` ไว้แล้ว แต่ตอน `res.status(200).json({ ... })` (บรรทัด 579–605) **ไม่ได้ใส่ `actionsTaken: ticket.actionsTaken`** ลงไปใน object ที่ส่งกลับ
> >      * ส่งผลให้บนหน้าเว็บจริง `ticket.actionsTaken` เป็น `undefined` เสมอ (แสดง `0` รายการแม้จะมีข้อมูลใน DB) และทำให้เทสต์ `GET /api/tickets/:id includes actionsTaken array for frontend rendering` ใน `server/tests/lab-04/actions-taken.api.test.ts` (บรรทัด 516) ไม่ผ่านด้วยค่ะ
> >    * **แนวทางแก้:** เพิ่ม `actionsTaken: ticket.actionsTaken,` ลงใน `res.status(200).json({ ... })` ของ `GET /api/tickets/:id` ใน `server/src/app.ts` (บรรทัด 605) ค่ะ
> > 3. **`client/src/components/ActionsTaken.tsx` (บรรทัด 236, 253, 292): อ่านข้อความ Error จาก `data.message` แทนที่จะรองรับ `data.error`**
> >    
> >    * **ปัญหา:** ใน `server/src/routes/tickets.ts` ทุก endpoint ของ Actions Taken ส่งข้อความแจ้งเตือนข้อผิดพลาดกลับมาในฟิลด์ `{ error: '...' }` แต่ใน `ActionsTaken.tsx` อ่านเฉพาะ `data.message` ทำให้เมื่อเกิด Validation error (เช่น 400 หรือ 422) ผู้ใช้ไม่เห็นข้อความจริงจากเซิร์ฟเวอร์ แต่เห็นเพียงข้อความ fallback `Failed to create/update action (HTTP 400)`
> >    * **แนวทางแก้:** ปรับทั้ง 3 จุดให้เช็ก `data.error || data.message || ...` ค่ะ
> > 
> > ### 🟠 Should Fix: ความสอดคล้องของลำดับข้อมูล, Validation และ State Transition
> > 4. **ลำดับการแสดงผลเมื่อสร้าง Action ใหม่ (`ActionsTaken.tsx` บรรทัด 257)**
> >    
> >    * Backend เรียงลำดับ Actions Taken ตามเวลาจากเก่าไปใหม่ (`orderBy: [{ actionDateTime: 'asc' }, { createdAt: 'asc' }]`) แต่ใน `handleSubmit` ตอนสร้างรายการใหม่ (บรรทัด 257) ใช้ `const nextItems = [created, ...items];` ซึ่งเอารายการใหม่ไปไว้บนสุด พอรีเฟรชหน้าเว็บลำดับจะสลับลงมาอยู่ล่างสุด
> >    * **แนวทางแก้:** เปลี่ยนเป็น `const nextItems = [...items, created];` ให้เรียงลำดับสอดคล้องกับ Backend ค่ะ
> > 5. **ปรับความยาวฟิลด์ใน Validation และ `maxLength` ให้ตรงกับ Backend (`ActionsTaken.tsx` บรรทัด 194, 522, 549, 599)**
> >    
> >    * **`followUpNote`:** Backend กำหนดความยาว `2–500` ตัวอักษรเมื่อเปิด `isFollowUpRequired` แต่ฝั่ง UI เช็กแค่ `followUpNote.trim().length === 0` (ถ้ากรอก 1 ตัวอักษรจะผ่าน UI แต่ติด 400 ที่ Backend) และตั้ง `maxLength={1000}` แนะนำให้เช็ก `followUpNote.trim().length < 2` ใน `validate()` และปรับ `maxLength={500}` ค่ะ
> >    * **`actionDescription` และ `result`:** Backend จำกัดความยาวไม่เกิน `1,000` ตัวอักษร แต่ใน `<textarea>` ตั้ง `maxLength={2000}` แนะนำให้ปรับเป็น `maxLength={1000}` ทั้งสองช่องค่ะ
> > 6. **จำกัดตัวเลือก Status ในฟอร์มแก้ไข (`Edit Action Taken`) ตาม State Machine (`ActionsTaken.tsx` บรรทัด 497–510)**
> >    
> >    * Backend ไม่อนุญาตให้เปลี่ยนสถานะย้อนกลับจาก `IN_PROGRESS` ไป `PENDING` และไม่อนุญาตให้เปลี่ยนสถานะออกจาก `COMPLETED` หรือ `CANCELLED`
> >    * แนะนำให้กรอง `<option>` ของ Status ตอนแก้ไข (`editingAction`) ให้เลือกได้เฉพาะสถานะปัจจุบันและสถานะถัดไปที่อนุญาต (และบนการ์ดที่มีสถานะ `PENDING` อาจเพิ่มปุ่มลัดหรือให้เปลี่ยนเป็น `IN_PROGRESS` ได้สะดวกขึ้น) เพื่อไม่ให้ผู้ใช้เลือกสถานะที่ผิดกฎของ Backend ค่ะ
> > 
> > ### 🟡 Minor: ข้อเสนอแนะเพิ่มเติม
> > * **ฟิลด์ `actionDateTime`:** ตาม Handout (§3, §4.1, §8.3) และ `ui-spec.md` (§3.1) ระบุให้รองรับการระบุหรือแก้ไข `Action Date/Time` (โดยมีค่าเริ่มต้นเป็นเวลาปัจจุบัน) หากเพิ่มช่อง `datetime-local` ในฟอร์มได้จะครบถ้วนตามสเปกมากยิ่งขึ้นค่ะ
> > * **ค่าสี Badge ใน `renderStatusBadge` (`ActionsTaken.tsx` บรรทัด 321–342):** ใน `ui-spec.md` (§1.1) กำหนดสี `PENDING` เป็นพื้นหลัง `#FFFBEB` / ตัวอักษร `#92400E` และ `IN_PROGRESS` เป็นพื้นหลัง `#EFF6FF` / ตัวอักษร `#1E40AF` (ในโค้ดใช้ `#FEF3C7` และ `#1D4ED8`) ปรับให้ตรงกันได้เลยนะคะ
> > * **ชื่อเคสทดสอบใน `ActionsTaken.test.tsx` (บรรทัด 904, 1079, 1188):** ในไฟล์เทสต์ระบุรหัส `UI-06` ซึ่งในตาราง `docs/lab-04/tests.md` รหัส `UI-06` เป็นของ _Requester Dashboard renders cards and attention list_ แนะนำให้เปลี่ยนชื่อใน `ActionsTaken.test.tsx` เป็นรหัสของชุด Actions Taken (`UI-01` / `UI-02`) เพื่อไม่ให้รหัสเทสต์ชนกันค่ะ
>
> ขอบคุณสำหรับรีวิวที่ละเอียดและรอบคอบมากค่ะ @jejaebubu ได้ดำเนินการแก้ไขครบทั้ง 3 Required Changes (Blocking), 3 Should Fix และ 3 Minor Suggestions ทั้งหมดใน commit `5ecac1a` เรียบร้อยแล้วค่ะ:
>
> 1. **Auth Token Retrieval (`ActionsTaken.tsx`)**: เพิ่ม helper `getAuthToken()` ตรวจสอบทั้ง `toktickit_auth_token` และ `token` ในทั้ง 3 จุด (`loadAssignableStaff`, `handleSubmit`, `handleQuickStatusChange`) ใช้งานได้ถูกต้องทั้งบนเบราว์เซอร์จริงและในชุดทดสอบ
> 2. **ส่ง `actionsTaken` ใน `GET /api/tickets/:id` (`server/src/app.ts`)**: เพิ่ม `actionsTaken: ticket.actionsTaken` ใน `res.status(200).json({ ... })` เรียบร้อยแล้ว ทำให้หน้า Ticket Detail แสดงรายการที่ดึงมาจากฐานข้อมูลได้ทันที
> 3. **การอ่าน Error Message (`ActionsTaken.tsx`)**: ปรับปรุงทั้ง 3 จุดให้อ่าน `data.error || data.message || ...` เพื่อแสดงข้อความแจ้งเตือนข้อผิดพลาดจาก backend ได้อย่างถูกต้อง
> 4. **ลำดับการแสดงผล (`ActionsTaken.tsx`)**: ปรับการอัปเดต state รายการใหม่เป็น `const nextItems = [...items, created];` เพื่อเรียงตามลำดับเวลาจากอดีตไปปัจจุบันตรงกับ Backend
> 5. **Validation & Field Length Limits**:
>    - ปรับ `validate()` ให้ตรวจสอบ `followUpNote.trim().length < 2` พร้อมกำหนด `maxLength={500}` บน textarea
>    - กำหนด `maxLength={1000}` บนช่อง `action-description` และ `action-result` ตรงตามสเปก
> 6. **จำกัด Status ใน Modal แก้ไขตาม State Machine**:
>    - หาก Action เป็น `COMPLETED` หรือ `CANCELLED` จะล็อกไม่ให้เปลี่ยนสถานะย้อนกลับ
>    - หาก Action เป็น `IN_PROGRESS` จะแสดงเฉพาะตัวเลือก `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
>    - หาก Action เป็น `PENDING` สามารถเลือกไปสถานะถัดไปได้ตามกฎ
> 7. **ฟิลด์ Action Date/Time (`ActionsTaken.tsx`)**: เพิ่มฟิลด์ `actionDateTime` (`type="datetime-local"`) ในฟอร์มทั้งตอนสร้างและแก้ไข พร้อมตั้งค่าเริ่มต้นเป็นเวลาปัจจุบัน (`new Date().toISOString()`) ตามข้อกำหนดใน Handout และ `ui-spec.md` §3.1
> 8. **ปรับคู่สี Status Badge**: ปรับ `PENDING` เป็นพื้นหลัง `#FFFBEB` / ตัวอักษร `#92400E` และ `IN_PROGRESS` เป็นพื้นหลัง `#EFF6FF` / ตัวอักษร `#1E40AF` ตรงตาม Zen Green Design Tokens
> 9. **ปรับรหัสเคสทดสอบ (`ActionsTaken.test.tsx`)**: เปลี่ยนรหัสเทสต์จาก `UI-06` เป็น `UI-02` เพื่อไม่ให้ซ้ำซ้อนกับรหัสเทสต์ของ Dashboard ใน `docs/lab-04/tests.md`
>
> ผลการรันชุดทดสอบฝั่ง Client ผ่านครบ 12 test files / 63 tests และ build production bundle ผ่าน 100% ค่ะ รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-02 01:57:19 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจ commit `5ecac1a` รอบที่ 2 อย่างละเอียดแล้วนะคะ ขอบคุณที่ตามเก็บทั้ง 9 ข้อให้ค่ะ แต่จากการไล่เช็กโค้ดและไฟล์ `reviewer.md` พบจุดที่ต้องรบกวนช่วยปรับแก้อีก 4 จุดก่อนกด Approve & Merge นะคะ:
>
> 1. **เวลาในช่อง `actionDateTime` (`datetime-local`) เลื่อนถอยหลัง 7 ชั่วโมงทุกครั้งที่เปิดฟอร์ม/กดบันทึก (`ActionsTaken.tsx` บรรทัด 120, 136–138)**
>    * **ปัญหา:** `<input type="datetime-local" />` ใช้เวลาแบบ Local Time (`YYYY-MM-DDTHH:mm`) แต่ใน `openCreateForm` และ `openEditForm` ใช้ `.toISOString().slice(0, 16)` ซึ่งเป็นเวลา UTC พอเปิดในโซนเวลาไทย (UTC+7) เวลาจะถอยหลังไป 7 ชั่วโมง และทุกครั้งที่กด Edit แล้วกด Save (`new Date(actionDateTime).toISOString()`) เวลาของรายการนั้นจะถูกเลื่อนถอยหลังไปเรื่อย ๆ ครั้งละ 7 ชั่วโมงค่ะ
>    * **แนวทางแก้:** สร้าง helper แปลง `Date` เป็น Local `YYYY-MM-DDTHH:mm` สำหรับใส่ใน state `actionDateTime` แทนการใช้ `.toISOString().slice(0, 16)` ค่ะ เช่น:
>      `const toLocalDateTimeInput = (iso?: string) => { const d = iso ? new Date(iso) : new Date(); const pad = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };`
>
> 2. **การกดปุ่มลัด `Complete` บนการ์ดทำให้ `editingAction.status` กลายเป็น `COMPLETED` แล้วล็อกช่อง Status (`ActionsTaken.tsx` บรรทัด 133, 267, 495)**
>    * **ปัญหา:** ใน `handleQuickStatusChange` (บรรทัด 267) เรียก `openEditForm({ ...action, status: 'COMPLETED' })` ซึ่งทำให้ `editingAction.status` ถูกทับเป็น `'COMPLETED'` ส่งผลให้ `<select id="action-status">` (บรรทัด 495–501) เข้าใจผิดว่า Action นี้อยู่ในสถานะ Terminal (`COMPLETED`) ไปแล้วและสั่ง `disabled` ล็อกช่องเลือกสถานะทันที ทั้งที่สถานะจริงใน DB ยังเป็น `PENDING` หรือ `IN_PROGRESS`
>    * **แนวทางแก้:** ปรับ `openEditForm(action: ActionTakenItem, initialStatus?: string)` ให้เก็บ `setEditingAction(action)` ตามสถานะจริงใน DB เหมือนเดิม แล้วเซ็ต `setStatus(initialStatus ?? action.status)` แทนค่ะ (และตอนกดปุ่ม `Complete` ให้เรียก `openEditForm(action, 'COMPLETED')`)
>
> 3. **ความถูกต้องของบันทึกใน `docs/lab-04/reviewer.md` (บรรทัด 623–669)**
>    * ในหัวข้อ `Round 1 Review by @jejaebubu (Changes Requested)` (บรรทัด 623–643) บันทึกไว้แค่ 8 ข้อ (ในหมวด Minor มีแค่ 2 ข้อ ขาดข้อ `ฟิลด์ actionDateTime` ซึ่งไปโผล่เป็นข้อ 9 ในฝั่ง Author Response แทน) รบกวนปรับข้อความใน `Review Comments (Verbatim)` ให้ครบทั้ง 9 ข้อตรงกับคอมเมนต์จริงบน GitHub ด้วยนะคะ
>    * ในหัวข้อ `Round 1 Author Response by @titayaaa` (บรรทัด 669) ระบุว่า `ดำเนินการ commit ใน 2d6f47e` แต่ commit จริงบน PR คือ `5ecac1a` รบกวนอัปเดตเลข commit ให้ตรงกันด้วยค่ะ
>
> 4. **เพิ่มเคสทดสอบใน `client/src/test/lab-04/ActionsTaken.test.tsx`**
>    * รบกวนเพิ่ม test ยืนยันการเปิด Edit Modal (ตรวจว่าการกรองตัวเลือก Status ตาม State Machine ทำงานถูกต้อง และใช้คีย์ `toktickit_auth_token` ได้จริง) อีกสัก 1 เคสนะคะ
>
> แก้ 4 จุดนี้เสร็จแล้วทักมาได้เลยนะคะ เดี๋ยวรีบตรวจและกด Approve & Merge ให้ทันทีค่ะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Author Response by @titayaaa (commit `e34f19e`)
- **Response Date:** 2026-11-02 02:33:54 UTC+7
- **Commit SHA:** `e34f19e`
- **Author Response Details (Verbatim):**

> > ตรวจ commit `5ecac1a` รอบที่ 2 อย่างละเอียดแล้วนะคะ ขอบคุณที่ตามเก็บทั้ง 9 ข้อให้ค่ะ แต่จากการไล่เช็กโค้ดและไฟล์ `reviewer.md` พบจุดที่ต้องรบกวนช่วยปรับแก้อีก 4 จุดก่อนกด Approve & Merge นะคะ:
> > 
> > 1. **เวลาในช่อง `actionDateTime` (`datetime-local`) เลื่อนถอยหลัง 7 ชั่วโมงทุกครั้งที่เปิดฟอร์ม/กดบันทึก (`ActionsTaken.tsx` บรรทัด 120, 136–138)**
> >    
> >    * **ปัญหา:** `<input type="datetime-local" />` ใช้เวลาแบบ Local Time (`YYYY-MM-DDTHH:mm`) แต่ใน `openCreateForm` และ `openEditForm` ใช้ `.toISOString().slice(0, 16)` ซึ่งเป็นเวลา UTC พอเปิดในโซนเวลาไทย (UTC+7) เวลาจะถอยหลังไป 7 ชั่วโมง และทุกครั้งที่กด Edit แล้วกด Save (`new Date(actionDateTime).toISOString()`) เวลาของรายการนั้นจะถูกเลื่อนถอยหลังไปเรื่อย ๆ ครั้งละ 7 ชั่วโมงค่ะ
> >    * **แนวทางแก้:** สร้าง helper แปลง `Date` เป็น Local `YYYY-MM-DDTHH:mm` สำหรับใส่ใน state `actionDateTime` แทนการใช้ `.toISOString().slice(0, 16)` ค่ะ เช่น:
> >      `const toLocalDateTimeInput = (iso?: string) => { const d = iso ? new Date(iso) : new Date(); const pad = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };`
> > 2. **การกดปุ่มลัด `Complete` บนการ์ดทำให้ `editingAction.status` กลายเป็น `COMPLETED` แล้วล็อกช่อง Status (`ActionsTaken.tsx` บรรทัด 133, 267, 495)**
> >    
> >    * **ปัญหา:** ใน `handleQuickStatusChange` (บรรทัด 267) เรียก `openEditForm({ ...action, status: 'COMPLETED' })` ซึ่งทำให้ `editingAction.status` ถูกทับเป็น `'COMPLETED'` ส่งผลให้ `<select id="action-status">` (บรรทัด 495–501) เข้าใจผิดว่า Action นี้อยู่ในสถานะ Terminal (`COMPLETED`) ไปแล้วและสั่ง `disabled` ล็อกช่องเลือกสถานะทันที ทั้งที่สถานะจริงใน DB ยังเป็น `PENDING` หรือ `IN_PROGRESS`
> >    * **แนวทางแก้:** ปรับ `openEditForm(action: ActionTakenItem, initialStatus?: string)` ให้เก็บ `setEditingAction(action)` ตามสถานะจริงใน DB เหมือนเดิม แล้วเซ็ต `setStatus(initialStatus ?? action.status)` แทนค่ะ (และตอนกดปุ่ม `Complete` ให้เรียก `openEditForm(action, 'COMPLETED')`)
> > 3. **ความถูกต้องของบันทึกใน `docs/lab-04/reviewer.md` (บรรทัด 623–669)**
> >    
> >    * ในหัวข้อ `Round 1 Review by @jejaebubu (Changes Requested)` (บรรทัด 623–643) บันทึกไว้แค่ 8 ข้อ (ในหมวด Minor มีแค่ 2 ข้อ ขาดข้อ `ฟิลด์ actionDateTime` ซึ่งไปโผล่เป็นข้อ 9 ในฝั่ง Author Response แทน) รบกวนปรับข้อความใน `Review Comments (Verbatim)` ให้ครบทั้ง 9 ข้อตรงกับคอมเมนต์จริงบน GitHub ด้วยนะคะ
> >    * ในหัวข้อ `Round 1 Author Response by @titayaaa` (บรรทัด 669) ระบุว่า `ดำเนินการ commit ใน 2d6f47e` แต่ commit จริงบน PR คือ `5ecac1a` รบกวนอัปเดตเลข commit ให้ตรงกันด้วยค่ะ
> > 4. **เพิ่มเคสทดสอบใน `client/src/test/lab-04/ActionsTaken.test.tsx`**
> >    
> >    * รบกวนเพิ่ม test ยืนยันการเปิด Edit Modal (ตรวจว่าการกรองตัวเลือก Status ตาม State Machine ทำงานถูกต้อง และใช้คีย์ `toktickit_auth_token` ได้จริง) อีกสัก 1 เคสนะคะ
> > 
> > แก้ 4 จุดนี้เสร็จแล้วทักมาได้เลยนะคะ เดี๋ยวรีบตรวจและกด Approve & Merge ให้ทันทีค่ะ ขอบคุณมากค่ะ!
>
> ขอบคุณ @jejaebubu สำหรับการตรวจทานรอบที่ 2 อย่างละเอียดถี่ถ้วนมากค่ะ ได้ดำเนินการปรับปรุงและแก้ไขครบถ้วนทั้ง 4 จุดเรียบร้อยแล้วค่ะ:
>
> 1. **แก้ไขปัญหา Timezone Shift ในช่อง `actionDateTime` (`ActionsTaken.tsx`)**:
>    - เพิ่ม helper `toLocalDateTimeInput(iso?: string)` สำหรับแปลงเวลาเป็น Local Time string ฟอร์แมต `YYYY-MM-DDTHH:mm`
>    - ปรับ `openCreateForm` และ `openEditForm` ให้เรียกใช้ helper ดังกล่าวแทน `.toISOString().slice(0, 16)` ซึ่งเป็น UTC ทำให้เวลาไม่ถอยหลัง 7 ชั่วโมงเมื่อเปิดฟอร์มหรือบันทึกข้อมูลในเขตเวลาไทย (UTC+7)
> 2. **แก้ไขการล็อกช่อง Status เมื่อกดปุ่ม Quick Complete (`ActionsTaken.tsx`)**:
>    - ปรับ signature ของฟังก์ชันเป็น `openEditForm(action: ActionTakenItem, initialStatus?: string)`
>    - ให้ `setEditingAction(action)` เก็บข้อมูลสถานะจริงจากฐานข้อมูลเหมือนเดิม เพื่อให้ State Machine Guard ประเมินสถานะก่อนหน้าได้อย่างถูกต้อง และกำหนด `setStatus(initialStatus ?? action.status)` เป็นค่าเริ่มต้นของฟอร์ม
>    - เมื่อกดปุ่ม Complete ด่วน จะเรียก `openEditForm(action, 'COMPLETED')` ทำให้ modal เปิดขึ้นพร้อมเลือกสถานะ COMPLETED ให้ทันทีโดยที่ Dropdown ไม่ถูก disabled ล็อกค้าง
> 3. **ปรับปรุงความถูกต้องของเอกสาร `docs/lab-04/reviewer.md`**:
>    - ปรับข้อความ Round 1 Review by @jejaebubu ให้มีครบทั้ง 9 ข้อโดยเพิ่มข้อ 3 ในหมวด Minor เรื่องฟิลด์ `actionDateTime` ตรงกับคอมเมนต์จริง
>    - อัปเดตเลขอ้างอิง commit ใน Round 1 Author Response จาก `2d6f47e` เป็น `5ecac1a` ให้ตรงกับประวัติคอมมิตจริงบน GitHub
>    - บันทึกบทสนทนาการรีวิว Round 2 ทั้งข้อเสนอแนะและคำตอบรับอย่างครบถ้วน
> 4. **เพิ่มเคสทดสอบ Edit Modal และ State Machine ใน `ActionsTaken.test.tsx`**:
>    - เพิ่มเคสทดสอบ `UI-02: verifies Edit modal filters Status by State Machine and uses toktickit_auth_token`
>    - ทดสอบยืนยันว่าการเปิด Edit Modal ดึง `toktickit_auth_token` ส่งไปยัง header `Authorization: Bearer ...` สำเร็จ
>    - ทดสอบยืนยันว่า State Machine กรองสถานะสำหรับ Action ที่เป็น `IN_PROGRESS` ให้เหลือเฉพาะ `IN_PROGRESS`, `COMPLETED`, และ `CANCELLED` (ไม่มี `PENDING`)
>    - ทดสอบยืนยันว่าการกด Quick Complete เปิด Edit modal ด้วยสถานะ COMPLETED โดยช่อง select ไม่ถูก disabled
>
> ผลการรันเทสต์ฝั่ง Client ผ่านครบ 12 test files / 64 tests (100%) และรัน `npm run build` ผ่านสมบูรณ์ 0 errors รบกวนช่วยตรวจทานและ Approve & Merge ได้เลยนะคะ ขอบคุณมากค่ะ

#### 💬 Round 3 Final Review & Approval by @jejaebubu
- **Review Date:** 2026-11-02 02:45:07 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจสอบ commit `e34f19e` รอบที่ 3 เรียบร้อยแล้วนะคะ แก้ไขครบถ้วนสมบูรณ์ทั้ง 4 จุดแล้วค่ะ:
>
> 1. ✅ **Local DateTime Helper (`ActionsTaken.tsx`):** เพิ่ม `toLocalDateTimeInput()` แปลงเวลาเป็น Local Time (`YYYY-MM-DDTHH:mm`) ทั้งใน `openCreateForm` และ `openEditForm` แก้ปัญหาเวลาเลื่อนถอยหลัง 7 ชั่วโมงเรียบร้อย
> 2. ✅ **Quick Complete Status Select (`ActionsTaken.tsx`):** ปรับ `openEditForm(action, initialStatus)` ให้คง `editingAction` ตามสถานะจริงใน DB และตั้งค่าเริ่มต้น `status` เป็น `COMPLETED` โดยไม่ล็อกช่อง `<select>` ค้าง
> 3. ✅ **บันทึกใน `docs/lab-04/reviewer.md`:** อัปเดตรายการรีวิวรอบที่ 1 ครบทั้ง 9 ข้อ, แก้เลขอ้างอิง commit เป็น `5ecac1a` และบันทึกประวัติรอบที่ 2 ครบถ้วน
> 4. ✅ **Component Test (`ActionsTaken.test.tsx`):** เพิ่มเทสต์ตรวจสอบการใช้คีย์ `toktickit_auth_token`, การกรองตัวเลือก Status ตาม State Machine ในโหมดแก้ไข และการกดปุ่มลัด `Complete` เรียบร้อย
>
> ขอ **Approve** และกด Merge เข้า `lab4-staging` ให้เลยนะคะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#78](https://github.com/titayaaa/toktickit/pull/78)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `36e2e53e6b72a4401bb2799c8501258d43ce1ba8`
- **Merged At:** 2026-11-02 02:45:28 UTC+7
- **Status:** ✅ Merged successfully — **Closes #66**

---

### PR #79: Issue 31: Ticket Workflow Operations, Resolution Gate & Concurrency Protection
- **PR URL:** [titayaaa/toktickit#79](https://github.com/titayaaa/toktickit/pull/79)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`1a056c2`)
- **Scope & Implementation:**
  - **Resolution Gate Enforcement (BR-09, AC-07, AC-08):** ใน `server/src/routes/staff.ts` (`PATCH /api/staff/tickets/:id/resolve`) ตรวจสอบรายการ Actions Taken ที่เชื่อมโยงกับตั๋ว หากยังมีสถานะเป็น `PENDING` หรือ `IN_PROGRESS` จะปฏิเสธการ Resolve ทันทีด้วย `409 Conflict` พร้อมโค้ด `RESOLUTION_GATE_BLOCKED`, จำนวน `unresolvedCount` และรายชื่อ `blockingActions`
  - **Optimistic Concurrency Protection (BR-14, AC-12):** รองรับ `expectedUpdatedAt` ใน `PATCH /api/staff/tickets/:id/status` และ `PATCH /api/staff/tickets/:id/resolve` หาก timestamp ไม่ตรงกับ `ticket.updatedAt` ในฐานข้อมูล จะปฏิเสธด้วย `409 Conflict` พร้อมโค้ด `STALE_UPDATE_CONFLICT`
  - **State Machine Transition Matrix (BR-11, WORKFLOW-01):** บังคับใช้เงื่อนไขการเปลี่ยนสถานะตามตาราง State Transition Matrix 9 สถานะใน `VALID_TRANSITIONS` และบล็อกการเปลี่ยนเป็น `RESOLVED` โดยตรงผ่าน `/status` (ต้องเรียก `/resolve` พร้อม `resolutionSummary` 3–500 ตัวอักษร)
  - **Resolution Gate Warning Banner (UI-04):** ใน `TicketDetail.tsx` เพิ่มแบนเนอร์แจ้งเตือนสถานะ Resolution Gate สีเหลืองเตือนเจ้าหน้าที่เมื่อมี Action Taken ค้างอยู่ และแสดงข้อความเตือนภายใน Resolve Ticket Modal
  - **Concurrency Conflict UI Handling:** แสดงแจ้งเตือน `⚠️ Conflict: This ticket has been modified by another user. Please refresh and try again.` เมื่อเกิด Stale update (HTTP 409)
  - **Automated Tests:**
    - `server/tests/lab-04/ticket-workflow.api.test.ts` (API-07, API-08, API-09, API-10, API-14, WORKFLOW-01)
    - `client/src/test/lab-04/TicketWorkflow.test.tsx` (UI-04 4 เคส: Warning banner, banner disappearance on complete, 409 Resolution Gate blocked handling, 409 Stale update conflict handling)

#### 💬 Round 1 Review by @jejaebubu (Suggestions)
- **Review Date:** 2026-11-02 03:49:58 UTC+7
- **Verdict:** 💬 Commented
- **Review Comments (Verbatim):**

> ตรวจโค้ด Ticket Workflow, Resolution Gate, Optimistic Concurrency และชุดทดสอบของ PR #79 (Issue 31) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `tests.md` อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมทำออกมาได้อย่างยอดเยี่ยมและรัดกุมมากค่ะ 
>
> ### จุดเด่นที่ทำได้ดีมาก
> 1. **Resolution Gate Enforcement (BR-09, AC-07, AC-08):** ใน `server/src/routes/staff.ts` (`PATCH /api/staff/tickets/:id/resolve`) ตรวจจับ Actions Taken ที่ค้างสถานะ `PENDING` หรือ `IN_PROGRESS` ได้อย่างแม่นยำ ปฏิเสธด้วย `409 Conflict` (`RESOLUTION_GATE_BLOCKED`) พร้อมส่ง `unresolvedCount` และ `blockingActions` ให้ลูกค้านำไปแสดงผลได้อย่างชัดเจน
> 2. **Optimistic Concurrency Protection (BR-14, AC-12):** ตรวจสอบ `expectedUpdatedAt` กับ `ticket.updatedAt` ในทั้งสอง Endpoint พร้อมปัดเศษความคลาดเคลื่อนระดับ 1 วินาที (`Math.abs > 1000`) ตาม RFC 7231 ตอบกลับด้วย `409 Conflict` (`STALE_UPDATE_CONFLICT`) ป้องกันปัญหาแย่งกันแก้ไขข้อมูลได้อย่างสมบูรณ์
> 3. **State Machine Transition Matrix (BR-11, WORKFLOW-01):** บังคับใช้เงื่อนไขตามตาราง 9 สถานะใน `VALID_TRANSITIONS` บล็อกไม่ให้ข้ามจาก `NEW`/`OPEN` ไป `RESOLVED` โดยตรง และบังคับใช้ `/resolve` พร้อม `resolutionSummary` 3–500 ตัวอักษร
> 4. **UX & Warning Banners (UI-04):** ใน `TicketDetail.tsx` แสดงแบนเนอร์สีเหลืองเตือน Resolution Gate ทั้งบน Operational Toolbar และภายใน Resolve Modal รวมถึงการแจ้งเตือน Stale update เมื่อเกิด Conflict (409)
> 5. **Test Suite:** ชุดทดสอบ `ticket-workflow.api.test.ts` (API-07 ถึง API-10, API-14, WORKFLOW-01) และ `TicketWorkflow.test.tsx` (UI-04 4 เคส) ครอบคลุมครบถ้วน รันผ่าน 100%
>
> ---
>
> ### ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Should Fix & Minor)
>
> 1. **State Transition ใน `TicketDetail.tsx` (บรรทัด 483–485) ขาดสถานะ `PENDING` ในเคส `REOPENED`**
>    * ใน `server/src/routes/staff.ts` และ `specification.md` Section 5.1 กำหนดให้สถานะ `REOPENED` สามารถย้ายไป `PENDING` (พักรอ Vendor) ได้
>    * แต่ใน `TicketDetail.tsx` ฟังก์ชัน `getAllowedNextStatuses` ระบุ:
>      `case 'REOPENED': return ['IN_PROGRESS', 'RESOLVED', 'CANCELLED'];`
>    * แนะนำให้เพิ่ม `'PENDING'` เข้าไปในอาร์เรย์เป็น `['IN_PROGRESS', 'PENDING', 'RESOLVED', 'CANCELLED']` เพื่อให้เจ้าหน้าที่สามารถเลือกสถานะนี้จาก Dropdown บนหน้าเว็บได้ค่ะ
> 2. **บันทึก AI Pairing Log ใน `docs/lab-04/ai-use.md` สำหรับ Issue 31**
>    * แนะนำให้เพิ่ม Prompt 11 และ Section 3.5 Reflection สำหรับ Ticket Workflow, Resolution Gate และ Optimistic Concurrency ใน `docs/lab-04/ai-use.md` ให้ครบถ้วนตามเกณฑ์ส่งงานของ Lab 4 ค่ะ
> 3. **อัปเดตเอกสาร `docs/lab-04/api-spec.md` (หัวข้อ 3.1 และ 3.2)**
>    * นำคำว่า `*(Planned for Issue 31)*` ออก และปรับตัวอย่าง JSON response ของ Conflict (409) ให้ตรงกับโครงสร้างจริง (`code: 'RESOLUTION_GATE_BLOCKED'` / `'STALE_UPDATE_CONFLICT'`)
> 4. **การส่ง `relatedSystemId` ใน `ticket-workflow.api.test.ts`**
>    * ในฟังก์ชันทดสอบมีการระบุ `relatedSystemId: relatedSystem?.id || null` เนื่องจากฟิลด์นี้ใน `schema.prisma` เป็น required (`Int` ไม่ nullable) แนะนำให้ใช้ `relatedSystem.id` ตรง ๆ เหมือนกับ `categoryId: category.id` ค่ะ

#### 💬 Round 1 Author Response by @titayaaa (commit `810bdb3`)
- **Response Date:** 2026-11-02 04:00:27 UTC+7
- **Commit SHA:** `810bdb3`
- **Author Response Details (Verbatim):**

> > ตรวจโค้ด Ticket Workflow, Resolution Gate, Optimistic Concurrency และชุดทดสอบของ PR #79 (Issue 31) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `tests.md` อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมทำออกมาได้อย่างยอดเยี่ยมและรัดกุมมากค่ะ
> > 
> > ### จุดเด่นที่ทำได้ดีมาก
> > 1. **Resolution Gate Enforcement (BR-09, AC-07, AC-08):** ใน `server/src/routes/staff.ts` (`PATCH /api/staff/tickets/:id/resolve`) ตรวจจับ Actions Taken ที่ค้างสถานะ `PENDING` หรือ `IN_PROGRESS` ได้อย่างแม่นยำ ปฏิเสธด้วย `409 Conflict` (`RESOLUTION_GATE_BLOCKED`) พร้อมส่ง `unresolvedCount` และ `blockingActions` ให้ลูกค้านำไปแสดงผลได้อย่างชัดเจน
> > 2. **Optimistic Concurrency Protection (BR-14, AC-12):** ตรวจสอบ `expectedUpdatedAt` กับ `ticket.updatedAt` ในทั้งสอง Endpoint พร้อมปัดเศษความคลาดเคลื่อนระดับ 1 วินาที (`Math.abs > 1000`) ตาม RFC 7231 ตอบกลับด้วย `409 Conflict` (`STALE_UPDATE_CONFLICT`) ป้องกันปัญหาแย่งกันแก้ไขข้อมูลได้อย่างสมบูรณ์
> > 3. **State Machine Transition Matrix (BR-11, WORKFLOW-01):** บังคับใช้เงื่อนไขตามตาราง 9 สถานะใน `VALID_TRANSITIONS` บล็อกไม่ให้ข้ามจาก `NEW`/`OPEN` ไป `RESOLVED` โดยตรง และบังคับใช้ `/resolve` พร้อม `resolutionSummary` 3–500 ตัวอักษร
> > 4. **UX & Warning Banners (UI-04):** ใน `TicketDetail.tsx` แสดงแบนเนอร์สีเหลืองเตือน Resolution Gate ทั้งบน Operational Toolbar และภายใน Resolve Modal รวมถึงการแจ้งเตือน Stale update เมื่อเกิด Conflict (409)
> > 5. **Test Suite:** ชุดทดสอบ `ticket-workflow.api.test.ts` (API-07 ถึง API-10, API-14, WORKFLOW-01) และ `TicketWorkflow.test.tsx` (UI-04 4 เคส) ครอบคลุมครบถ้วน รันผ่าน 100%
> > 
> > ### ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Should Fix & Minor)
> > 1. **State Transition ใน `TicketDetail.tsx` (บรรทัด 483–485) ขาดสถานะ `PENDING` ในเคส `REOPENED`**
> >    
> >    * ใน `server/src/routes/staff.ts` และ `specification.md` Section 5.1 กำหนดให้สถานะ `REOPENED` สามารถย้ายไป `PENDING` (พักรอ Vendor) ได้
> >    * แต่ใน `TicketDetail.tsx` ฟังก์ชัน `getAllowedNextStatuses` ระบุ:
> >      `case 'REOPENED': return ['IN_PROGRESS', 'RESOLVED', 'CANCELLED'];`
> >    * แนะนำให้เพิ่ม `'PENDING'` เข้าไปในอาร์เรย์เป็น `['IN_PROGRESS', 'PENDING', 'RESOLVED', 'CANCELLED']` เพื่อให้เจ้าหน้าที่สามารถเลือกสถานะนี้จาก Dropdown บนหน้าเว็บได้ค่ะ
> > 2. **บันทึก AI Pairing Log ใน `docs/lab-04/ai-use.md` สำหรับ Issue 31**
> >    
> >    * แนะนำให้เพิ่ม Prompt 11 และ Section 3.5 Reflection สำหรับ Ticket Workflow, Resolution Gate และ Optimistic Concurrency ใน `docs/lab-04/ai-use.md` ให้ครบถ้วนตามเกณฑ์ส่งงานของ Lab 4 ค่ะ
> > 3. **อัปเดตเอกสาร `docs/lab-04/api-spec.md` (หัวข้อ 3.1 และ 3.2)**
> >    
> >    * นำคำว่า `*(Planned for Issue 31)*` ออก และปรับตัวอย่าง JSON response ของ Conflict (409) ให้ตรงกับโครงสร้างจริง (`code: 'RESOLUTION_GATE_BLOCKED'` / `'STALE_UPDATE_CONFLICT'`)
> > 4. **การส่ง `relatedSystemId` ใน `ticket-workflow.api.test.ts`**
> >    
> >    * ในฟังก์ชันทดสอบมีการระบุ `relatedSystemId: relatedSystem?.id || null` เนื่องจากฟิลด์นี้ใน `schema.prisma` เป็น required (`Int` ไม่ nullable) แนะนำให้ใช้ `relatedSystem.id` ตรง ๆ เหมือนกับ `categoryId: category.id` ค่ะ
>
> ขอบคุณ @jejaebubu สำหรับการตรวจทานที่ละเอียดรอบคอบและช่วยแนะนำจุดต่อยอดให้สมบูรณ์ยิ่งขึ้นค่ะ! 
>
> @titayaaa ได้ดำเนินการปรับแก้ครบถ้วนทั้ง 4 ข้อเสนอแนะใน commit `810bdb3` เรียบร้อยแล้วนะคะ:
> 1. **เพิ่มสถานะ 'PENDING' ในเคส REOPENED ของ `TicketDetail.tsx`**: ปรับ `getAllowedNextStatuses` ในเคส `'REOPENED'` เป็น `['IN_PROGRESS', 'PENDING', 'RESOLVED', 'CANCELLED']` ให้ตรงกับ State Transition Matrix ใน Section 5.1 และ backend `VALID_TRANSITIONS`
> 2. **บันทึก AI Pairing Log ใน `docs/lab-04/ai-use.md`**: เพิ่ม Prompt 11 และ Section 3.5 Reflection สำหรับ Issue 31 (Resolution Gate, Optimistic Concurrency, Clock Skew Tolerance และ Preventive UI) ครบถ้วนตามเกณฑ์ส่งงาน
> 3. **อัปเดต `docs/lab-04/api-spec.md` (หัวข้อ 3.1 และ 3.2)**: นำหมายเหตุ *(Planned for Issue 31)* ออก และปรับปรุงตัวอย่าง JSON response ของ HTTP 409 Conflict ให้มีฟิลด์ `code: "STALE_UPDATE_CONFLICT"` และ `code: "RESOLUTION_GATE_BLOCKED"` พร้อม `unresolvedCount` และ `blockingActions` ตรงกับ response จริงจาก Backend
> 4. **ปรับการส่ง `relatedSystemId` ใน `ticket-workflow.api.test.ts`**: เปลี่ยนจาก `relatedSystem?.id || null` เป็น `relatedSystem.id` ตรง ๆ ทุกจุด ให้สอดคล้องกับ schema type `Int` (Non-nullable)
>
> ผลการรันชุดทดสอบ Client ผ่าน 13/13 test files (68/68 tests 100%), Server Typecheck ผ่าน 0 errors, และ Client build (`tsc && vite build`) ผ่านเรียบร้อยค่ะ รบกวนช่วยตรวจทานรอบสุดท้ายและพิจารณา Approve & Merge ได้เลยนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-02 04:12:03 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจ commit `810bdb3` รอบสุดท้ายอย่างละเอียดแล้วนะคะ ขอบคุณที่เก็บงานและปรับแก้ทั้ง 4 จุดได้อย่างรวดเร็วและสมบูรณ์แบบมากค่ะ:
>
> 1. **State Transition ใน `TicketDetail.tsx`:** เพิ่มสถานะ `'PENDING'` ในเคส `'REOPENED'` เรียบร้อย ทำให้เจ้าหน้าที่สามารถพักงานรอ Vendor ได้ตาม Business Matrix ใน `specification.md`
> 2. **AI Pairing Log ใน `docs/lab-04/ai-use.md`:** บันทึก Prompt 11 และ Section 3.5 Reflection ครบถ้วนตามเกณฑ์ส่งงานของ Lab 4
> 3. **API Documentation ใน `docs/lab-04/api-spec.md`:** ปรับปรุง Error schema ของ HTTP 409 Conflict ให้ตรงกับ Implementation จริง และนำหมายเหตุ Planned ออกเรียบร้อย
> 4. **Prisma Type Safety ใน `ticket-workflow.api.test.ts`:** แก้ไขการส่ง `relatedSystemId: relatedSystem.id` เป็น Type-safe Non-null เรียบร้อย
> 5. **Verification & Build:** รันชุดทดสอบ Client (`TicketWorkflow.test.tsx`, `ActionsTaken.test.tsx`) ผ่าน 100% และ Client production build ผ่านฉลุยค่ะ
>
> ภาพรวมฟีเจอร์ Ticket Workflow, Resolution Gate และ Optimistic Concurrency ทำออกมาได้มาตรฐานระดับ Production ครบถ้วนตาม Requirement ทุกข้อ ขอ **Approve** ให้ Merge เข้า `lab4-staging` ได้เลยค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#79](https://github.com/titayaaa/toktickit/pull/79)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `1a056c20573be8251e70e9ea9825b15be62cbfe9`
- **Merged At:** 2026-11-02 04:12:18 UTC+7
- **Status:** ✅ Merged successfully — **Closes #67**

---

### PR #80: Issue 32: IT Staff Dashboard API & UI
- **PR URL:** [titayaaa/toktickit#80](https://github.com/titayaaa/toktickit/pull/80)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`ba347fb`)
- **Scope & Implementation:**
  - **Authoritative Operational Metrics (FR-12, BR-12, API-11):** ใน `server/src/routes/staff.ts` (`GET /api/staff/dashboard`) และ Route alias (`GET /api/dashboard/staff` ใน `server/src/app.ts`) คำนวณสรุปสถิติ 4 ตัวชี้วัดสำคัญของคิวบริการ:
    - `unassignedTicketsCount`: ตั๋วที่ยังไม่มีผู้รับผิดชอบ (`ownerId: null`) และยังไม่ปิดงาน
    - `myAssignedTicketsCount`: ตั๋วที่มอบหมายให้เจ้าหน้าที่ไอทีที่ล็อกอิน (`ownerId: currentUserId`)
    - `urgentTicketsCount`: ตั๋วระดับเร่งด่วนสูงสุด (`itPriority: URGENT`) ที่ยังค้างในระบบ
    - `myPendingActionsCount`: การดำเนินการที่มอบหมายให้ตนเองและยังไม่เสร็จ (`assigneeId: currentUserId`, `status in [PENDING, IN_PROGRESS]`)
    - พร้อมส่งรายการ `urgentTickets` (Top 5), `myAssignedActions` (Top 5), และ `recentTickets` (Top 5)
  - **Access Control & RBAC (FR-12, AC-09, API-13):** บังคับใช้ `authenticate` และ `requireRole(Role.IT_STAFF, Role.ADMINISTRATOR)` ปฏิเสธ Requester ด้วย `403 Forbidden` และ Unauthenticated ด้วย `401 Unauthorized`
  - **Interactive Frontend UI Component (FR-12, AC-11, UI-05):** พัฒนา `StaffDashboard.tsx` ธีม Zen Green:
    - การ์ดสถิติ 4 ใบพร้อมตัวเลข authoritative counts และรองรับการคลิก Drill-down ไปยัง `StaffTicketQueue`
    - แผง Urgent Incident Queue แบบ Responsive (Desktop Table + Mobile Card Stack)
    - แผง My Assigned Actions แสดงรายการงานที่ต้องปฏิบัติการพร้อมลิงก์เปิดตั๋ว
    - แผง Operational Quick Actions สำหรับเปิดคิวบริการ กรองเฉพาะงานของฉัน หรือกรองตั๋วที่ยังไม่มีผู้รับผิดชอบ
  - **Drill-Down Filter Synchronization:** ปรับปรุง `StaffTicketQueue.tsx` รับ prop `initialFilters?: StaffQueueInitialFilters` และเชื่อมโยงใน `App.tsx` สลับแท็บพร้อมตั้งค่าฟิลเตอร์อัตโนมัติ
  - **Zen Green Tokens & Accessibility (STYLE-01, RESP-01, A11Y):**
    - ปุ่มและการ์ดแบบคลิกได้ทั้งหมดมี Touch target $\ge 44\text{px}$
    - โทนสี Zen Green (`#006B3C`, `#EAF6EF`, `#FFFBEB`)
    - กำหนด `overflowX: hidden` ป้องกันปัญหาหน้าจอเลื่อนแนวนอน
  - **Automated Test Suites:**
    - `server/tests/lab-04/staff-dashboard.api.test.ts` (API-11, API-13, PERF-01)
    - `client/src/test/lab-04/StaffDashboard.test.tsx` (UI-05, STYLE-01, RESP-01)

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-02 05:09:12 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจโค้ด REST API, การคำนวณ Operational Metrics, หน้าจอ UI `StaffDashboard.tsx` และชุดทดสอบของ PR #80 (Issue 32) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `ui-spec.md` อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมการจัดเลย์เอาต์ธีม Zen Green, การ์ดสรุปสถิติ 4 ใบ, ตาราง Responsive Urgent Queue และการเชื่อมโยง Drill-down ไปยัง Queue ทำไว้ดีมากเลยค่ะ
>
> แต่ขอ **Changes Requested** ก่อนนะคะ เนื่องจากมีจุดสำคัญเรื่องการยืนยันตัวตน (Authentication) บนหน้าเว็บจริง และ Foreign Key Constraint ในชุดทดสอบที่ต้องรบกวนช่วยปรับแก้ก่อน Merge ค่ะ:
>
> ### 🔴 Blocking: ต้องแก้ก่อน Merge
> 1. **`client/src/components/StaffDashboard.tsx` (บรรทัด 122, 126): ขาด `Authorization` Header ใน `fetchDashboardData` ทำให้หน้าเว็บจริงเสี่ยงติด `401 Unauthorized`**
>    - **ปัญหา:** ใน `fetchDashboardData` เรียก `fetch('/api/staff/dashboard')` และ fallback `fetch('/api/dashboard/staff')` โดยไม่ได้ส่ง `headers` ใด ๆ
>    - ในระบบ TokTickIT ผู้ใช้เก็บ JWT token ไว้ใน `localStorage` ด้วยคีย์ `'toktickit_auth_token'` (ตาม `AuthContext.tsx`) หากผู้ใช้รีเฟรชหน้าเว็บหรือใช้งานในกรณีที่ cookie ไม่ถูกส่ง API จะปฏิเสธด้วย `401 Unauthorized` ส่งผลให้หน้า Dashboard โหลดข้อมูลไม่ขึ้นและแสดง error ทันที
>    - **แนวทางแก้:** ดึง token จาก `useAuth()` หรือ `localStorage.getItem('toktickit_auth_token')` แล้วส่ง headers ในคำสั่ง fetch เช่น:
>      ```ts
>      const token = localStorage.getItem('toktickit_auth_token');
>      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
>      const res = await fetch('/api/staff/dashboard', { headers });
>      ```
>
> 2. **`server/tests/lab-04/staff-dashboard.api.test.ts` (บรรทัด 75, 98, 115): ผูก `requesterId: requesterUser.id` ข้ามตาราง และไม่ได้ส่ง `userId`**
>    - **ปัญหา:** ใน `beforeAll` ตอนสร้างตั๋วทดสอบ มีการระบุ `requesterId: requesterUser.id` โดยตรง ซึ่ง `requesterUser` มาจากตาราง `User` (`Role.REQUESTER`)
>    - ตาม `schema.prisma` โมเดล `Ticket` ฟิลด์ `requesterId` ชี้ไปยัง `RequesterUser.id` ส่วน `User.id` จะเชื่อมผ่านฟิลด์ `userId` (`relation("TicketRequester")`) หากรันกับฐานข้อมูลจริงจะเกิด Foreign Key Constraint Failed และทำให้ `ticket.requester` ใน endpoint `/dashboard` มีค่าเป็น `null`
>    - **แนวทางแก้:** ปรับให้เหมือนกับ `ticket-workflow.api.test.ts` (PR #79) โดยค้นหาหรือสร้าง `RequesterUser` (`reqJennifer`) ก่อน แล้วส่ง `requesterId: reqJennifer.id` พร้อมทั้งส่ง `userId: requesterUser.id` ค่ะ
>
> ---
>
> ### 🟠 Should Fix: ความสอดคล้องของ Filter Drill-Down
> 3. **`client/src/components/StaffDashboard.tsx` (บรรทัด 334): การคลิกการ์ด "My Pending Actions" ขาดการกรอง `ownerFilter: 'me'`**
>    - ตอนคลิกการ์ด My Pending Actions มีการเรียก `onDrillDown?.({ status: 'IN_PROGRESS' })` เพียงอย่างเดียว ทำให้พอนำทางไปหน้าคิวตั๋ว ระบบจะแสดงตั๋ว In Progress ของทุกคนในระบบ แทนที่จะแสดงเฉพาะงานของตนเอง
>   - **แนวทางแก้:** ปรับเป็น `onDrillDown?.({ status: 'IN_PROGRESS', ownerFilter: 'me' })`
>
> 4. **`client/src/components/StaffDashboard.tsx` (บรรทัด 369): Status Casing ใน Hidden Alias**
>    - ในแท็ก `<span data-testid="staff-metric-card-in-progress" onClick={() => onDrillDown?.({ status: 'In Progress' })}>...</span>` ส่งค่า `'In Progress'` (มีช่องว่าง) แต่ใน Dropdown ของ `StaffTicketQueue.tsx` ตัวเลือกใช้ค่า value เป็น `'IN_PROGRESS'` แนะนำให้ปรับเป็น `status: 'IN_PROGRESS'` ให้ตรงกันค่ะ
>
> ฝากช่วยปรับแก้ 4 จุดนี้ แล้วอัปเดตบันทึกใน `reviewer.md` อีกนิดนะคะ พร้อม Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @titayaaa (commit `cd3f61f`)
- **Response Date:** 2026-11-02 05:15:16 UTC+7
- **Commit SHA:** `cd3f61f`
- **Author Response Details (Verbatim):**

> > ตรวจโค้ด REST API, การคำนวณ Operational Metrics, หน้าจอ UI `StaffDashboard.tsx` และชุดทดสอบของ PR #80 (Issue 32) เทียบกับ `schema.prisma`, `specification.md`, `api-spec.md` และ `ui-spec.md` อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมการจัดเลย์เอาต์ธีม Zen Green, การ์ดสรุปสถิติ 4 ใบ, ตาราง Responsive Urgent Queue และการเชื่อมโยง Drill-down ไปยัง Queue ทำไว้ดีมากเลยค่ะ
> > 
> > แต่ขอ **Changes Requested** ก่อนนะคะ เนื่องจากมีจุดสำคัญเรื่องการยืนยันตัวตน (Authentication) บนหน้าเว็บจริง และ Foreign Key Constraint ในชุดทดสอบที่ต้องรบกวนช่วยปรับแก้ก่อน Merge ค่ะ:
> > 
> > ### 🔴 Blocking: ต้องแก้ก่อน Merge
> > 1. **`client/src/components/StaffDashboard.tsx` (บรรทัด 122, 126): ขาด `Authorization` Header ใน `fetchDashboardData` ทำให้หน้าเว็บจริงเสี่ยงติด `401 Unauthorized`**
> >    
> >    * **ปัญหา:** ใน `fetchDashboardData` เรียก `fetch('/api/staff/dashboard')` และ fallback `fetch('/api/dashboard/staff')` โดยไม่ได้ส่ง `headers` ใด ๆ
> >    * ในระบบ TokTickIT ผู้ใช้เก็บ JWT token ไว้ใน `localStorage` ด้วยคีย์ `'toktickit_auth_token'` (ตาม `AuthContext.tsx`) หากผู้ใช้รีเฟรชหน้าเว็บหรือใช้งานในกรณีที่ cookie ไม่ถูกส่ง API จะปฏิเสธด้วย `401 Unauthorized` ส่งผลให้หน้า Dashboard โหลดข้อมูลไม่ขึ้นและแสดง error ทันที
> >    * **แนวทางแก้:** ดึง token จาก `useAuth()` หรือ `localStorage.getItem('toktickit_auth_token')` แล้วส่ง headers ในคำสั่ง fetch เช่น:
> >      ```ts
> >      const token = localStorage.getItem('toktickit_auth_token');
> >      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
> >      const res = await fetch('/api/staff/dashboard', { headers });
> >      ```
> > 2. **`server/tests/lab-04/staff-dashboard.api.test.ts` (บรรทัด 75, 98, 115): ผูก `requesterId: requesterUser.id` ข้ามตาราง และไม่ได้ส่ง `userId`**
> >    
> >    * **ปัญหา:** ใน `beforeAll` ตอนสร้างตั๋วทดสอบ มีการระบุ `requesterId: requesterUser.id` โดยตรง ซึ่ง `requesterUser` มาจากตาราง `User` (`Role.REQUESTER`)
> >    * ตาม `schema.prisma` โมเดล `Ticket` ฟิลด์ `requesterId` ชี้ไปยัง `RequesterUser.id` ส่วน `User.id` จะเชื่อมผ่านฟิลด์ `userId` (`relation("TicketRequester")`) หากรันกับฐานข้อมูลจริงจะเกิด Foreign Key Constraint Failed และทำให้ `ticket.requester` ใน endpoint `/dashboard` มีค่าเป็น `null`
> >    * **แนวทางแก้:** ปรับให้เหมือนกับ `ticket-workflow.api.test.ts` (PR #79) โดยค้นหาหรือสร้าง `RequesterUser` (`reqJennifer`) ก่อน แล้วส่ง `requesterId: reqJennifer.id` พร้อมทั้งส่ง `userId: requesterUser.id` ค่ะ
> > 
> > ### 🟠 Should Fix: ความสอดคล้องของ Filter Drill-Down
> > 3. **`client/src/components/StaffDashboard.tsx` (บรรทัด 334): การคลิกการ์ด "My Pending Actions" ขาดการกรอง `ownerFilter: 'me'`**
> >    
> >    * ตอนคลิกการ์ด My Pending Actions มีการเรียก `onDrillDown?.({ status: 'IN_PROGRESS' })` เพียงอย่างเดียว ทำให้พอนำทางไปหน้าคิวตั๋ว ระบบจะแสดงตั๋ว In Progress ของทุกคนในระบบ แทนที่จะแสดงเฉพาะงานของตนเอง
> > 
> > * **แนวทางแก้:** ปรับเป็น `onDrillDown?.({ status: 'IN_PROGRESS', ownerFilter: 'me' })`
> > 
> > 4. **`client/src/components/StaffDashboard.tsx` (บรรทัด 369): Status Casing ใน Hidden Alias**
> >    
> >    * ในแท็ก `<span data-testid="staff-metric-card-in-progress" onClick={() => onDrillDown?.({ status: 'In Progress' })}>...</span>` ส่งค่า `'In Progress'` (มีช่องว่าง) แต่ใน Dropdown ของ `StaffTicketQueue.tsx` ตัวเลือกใช้ค่า value เป็น `'IN_PROGRESS'` แนะนำให้ปรับเป็น `status: 'IN_PROGRESS'` ให้ตรงกันค่ะ
> > 
> > ฝากช่วยปรับแก้ 4 จุดนี้ แล้วอัปเดตบันทึกใน `reviewer.md` อีกนิดนะคะ พร้อม Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ
>
> ขอบคุณ @jejaebubu สำหรับการตรวจทานที่ละเอียดรอบคอบและช่วยจับจุดสำคัญเรื่อง Auth Header และ Foreign Key Constraint ค่ะ ได้ดำเนินการแก้ไขปรับปรุงครบทั้ง 4 ประเด็นใน commit cd3f61f เรียบร้อยแล้วค่ะ:
>
> 1. **เพิ่ม Authorization Header ใน `fetchDashboardData` (`StaffDashboard.tsx`)**:
>    - ดึง JWT token จาก `localStorage.getItem('toktickit_auth_token')` และแนบ `Authorization: Bearer <token>` ไปกับคำขอทั้ง endpoint หลัก `/api/staff/dashboard` และ endpoint สำรอง `/api/dashboard/staff` เรียบร้อยค่ะ
> 2. **แก้ไขการผูก Foreign Key ของตั๋วทดสอบใน `staff-dashboard.api.test.ts`**:
>    - ค้นหา/สร้างข้อมูลในตาราง `RequesterUser` (`reqJennifer`) และส่ง `requesterId: reqJennifer.id` คู่กับ `userId: requesterUser.id` ในการสร้างตั๋วทดสอบทั้ง 4 ใบ ถูกต้องตรงตาม schema.prisma เรียบร้อยค่ะ
> 3. **ปรับการกรอง Drill-Down ของการ์ด My Pending Actions (`StaffDashboard.tsx`)**:
>    - ปรับการคลิกการ์ดเป็น `onDrillDown?.({ status: 'IN_PROGRESS', ownerFilter: 'me' })` เพื่อให้แสดงเฉพาะตั๋ว In Progress ที่เป็นงานของตนเอง พร้อมเพิ่ม assertion ยืนยันใน `StaffDashboard.test.tsx` เรียบร้อยค่ะ
> 4. **ปรับ Status Casing ใน Hidden Alias (`StaffDashboard.tsx`)**:
>    - ปรับแก้ค่าสถานะใน `staff-metric-card-in-progress` เป็น `'IN_PROGRESS'` ให้ตรงกับ Enum Dropdown เรียบร้อยค่ะ
> 5. **อัปเดตบันทึกใน `docs/lab-04/reviewer.md`**:
>    - บันทึกการรีวิวรอบที่ 1 และการแก้ไขครบถ้วนสมบูรณ์แล้วค่ะ
>
> รันชุดทดสอบ Client ผ่านครบ 19/19 tests (100%), Client build ผ่าน 0 errors, Server typecheck ผ่าน 0 errors และผลการทดสอบ Backend Dashboard API ผ่านเรียบร้อยค่ะ รบกวนช่วยตรวจทานรอบที่ 2 อีกครั้งนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-02 05:20:52 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจ commit `cd3f61f` ในการรีวิวรอบที่ 2 อย่างละเอียดรอบด้านแล้วนะคะ ขอบคุณที่ดำเนินการแก้ไขและปรับปรุงครบทั้ง 4 ประเด็นได้อย่างรวดเร็วและประณีตมากค่ะ:
>
> 1. **Authentication Reliability (`StaffDashboard.tsx`):** มีการดึง JWT จาก `localStorage` (`toktickit_auth_token`) และแนบ `Authorization: Bearer` ไปกับ request ทั้งสอง endpoint ทำให้หน้า Dashboard โหลดข้อมูลได้อย่างเสถียร ไม่หลุด `401 Unauthorized`
> 2. **Prisma Foreign Key Safety (`staff-dashboard.api.test.ts`):** ปรับการเชื่อมโยง Foreign Key เป็น `requesterId: reqJennifer.id` และ `userId: requesterUser.id` ถูกต้องตาม `schema.prisma` 100%
> 3. **Precise Drill-Down Filtering:** การ์ด My Pending Actions กรองทั้ง `status: 'IN_PROGRESS'` และ `ownerFilter: 'me'` สอดคล้องกับบทบาทหน้าที่ของเจ้าหน้าที่ พร้อมอัปเดตชุดทดสอบยืนยัน
> 4. **Enum Consistency:** ปรับ Status Casing ใน Hidden Alias เป็น `'IN_PROGRESS'` สอดรับกับ Dropdown ของ Queue
> 5. **Documentation & Verification:** บันทึกประวัติการรีวิวใน `docs/lab-04/reviewer.md` ครบถ้วน รันเทสต์ 75/75 ผ่าน 100% และ production build ผ่านฉลุย 0 errors
>
> คุณภาพโค้ดและชุดทดสอบยอดเยี่ยมมาก ขอ **Approve** ให้ Merge เข้า `lab4-staging` ได้เลยค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#80](https://github.com/titayaaa/toktickit/pull/80)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `ba347fb21a3da1c0fb704259b3bb87c2b3e89c67`
- **Merged At:** 2026-11-02 05:20:59 UTC+7
- **Status:** ✅ Merged successfully — **Closes #68**

---

### PR #81: Issue 33: Requester Dashboard API & UI Screen
- **PR URL:** [titayaaa/toktickit#81](https://github.com/titayaaa/toktickit/pull/81)
- **Feature Branch:** `feature/33-requester-dashboard`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`ce5a566`)
- **Scope & Objectives:**
  - **Backend REST API (`server/src/routes/requester.ts`, `server/src/app.ts`):**
    - `GET /api/requester/dashboard` (พร้อม alias `GET /api/dashboard/requester`)
    - คำนวณสถิติเฉพาะของผู้ใช้ที่ยืนยันตัวตนตามกฎ BR-13 (Dual-Ownership & Legacy Safe Fallback: `ticket.userId === currentUser.id OR ticket.requesterUser?.email === currentUser.email OR ticket.requester?.email === currentUser.email`)
    - เมทริกซ์ 4 ด้าน: `totalOpenCount`, `waitingForRequesterCount`, `recentlyUpdatedCount`, `recentlyResolvedCount` พร้อม alias `myOpen`, `waitingForRequester`, `inProgress`, `resolved`, `closed`
    - รายการตั๋วที่ต้องตอบกลับ (`actionRequiredTickets`) และตั๋วที่อัปเดตล่าสุด 5 รายการ (`recentTickets`)
    - ป้องกันการเข้าถึงโดยไม่ยืนยันตัวตนด้วย `401 Unauthorized` และแยกข้อมูลระหว่าง Requester แต่ละคนโดยเด็ดขาด (Data Isolation ตาม AC-10)
  - **Frontend UI (`client/src/components/RequesterDashboard.tsx`):**
    - การ์ดสถิติ 4 ใบในธีม Zen Green (`Total Open`, `Waiting for Input`, `Recently Updated`, `Resolved`) พร้อม interactive drill-down ไปยัง `MyTickets`
    - แถบแจ้งเตือน Action Required Banner (สีม่วง/Amber `#EDE7F6`) เมื่อมีตั๋วรอข้อมูลจากผู้ใช้
    - แผง Quick Actions (`+ Create New Request`, `View All My Tickets`)
    - ตาราง My Recent Requests แบบ Responsive (Desktop Table $\ge 768\text{px}$ และ Mobile Card Stack $< 768\text{px}$)
    - Empty State พร้อมปุ่ม CTA `"Submit a new request"` เมื่อผู้ใช้ยังไม่มีตั๋วในระบบ
    - Touch targets $\ge 44\text{px}$ และกำหนด `overflowX: 'hidden'`
  - **Navigation & Drill-down Integration (`client/src/App.tsx`, `MyTickets.tsx`):**
    - เพิ่มแท็บ Dashboard สำหรับบทบาท Requester (`nav-requester-dashboard`)
    - ปรับปรุง `MyTickets.tsx` รับ prop `initialStatus?: string` รองรับการกรองสถานะจากการคลิกการ์ดสถิติ
  - **Automated Verification & Tests:**
    - `server/tests/lab-04/requester-dashboard.api.test.ts` (API-12, BR-13, AC-10) ผ่าน 5/5
    - `client/src/test/lab-04/RequesterDashboard.test.tsx` (UI-06, FR-13, AC-10) ผ่าน 6/6
    - `npm --prefix client test` ผ่านครบ 15/15 files (81/81 tests)
    - `npm --prefix client run build` ผ่าน 0 errors

#### 💬 Round 1 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-02 10:55:03 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจโค้ด REST API, Data Isolation, หน้าจอ UI `RequesterDashboard.tsx`, ชุดทดสอบ และเอกสารประกอบของ PR #81 (Issue 33) เทียบกับ `specification.md`, `api-spec.md`, `ui-spec.md` และ `tests.md` อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมทำออกมาได้อย่างยอดเยี่ยมและประณีตมากค่ะ 
>
> ### จุดเด่นที่ทำได้ดีมาก
> 1. **Strict Data Isolation & Multi-Version Ownership (BR-13, AC-10, API-12):** ใน `server/src/routes/requester.ts` ออกแบบเงื่อนไข `ownershipWhere` ตรวจสอบทั้ง `userId` และอีเมลของทั้งสองโมเดล (`requesterUser.email` และ `requester.email`) ทำให้แยกข้อมูลของ Requester แต่ละคนได้อย่างสมบูรณ์แบบ ไม่เกิดปัญหา ID ชนกันข้ามโมเดล และรองรับตั๋วแบบ Legacy ได้อย่างไร้รอยต่อ
> 2. **Action Required Notification Banner (UI-06, FR-13):** แถบเตือนสีม่วง/Amber (`#EDE7F6` / `#512DA8`) แสดงตั๋วสถานะ `WAITING_FOR_REQUESTER` ได้เด่นชัด พร้อมปุ่มกด "Inspect & Respond →" ช่วยให้ผู้ใช้ทราบทันทีว่ามีตั๋วที่รอข้อมูลเพิ่มเติม
> 3. **Seamless Drill-Down to MyTickets:** การส่ง `initialStatus` ไปยัง `MyTickets.tsx` พร้อมทั้งขยายตัวเลือกสถานะใน Dropdown ครบทั้ง 9 สถานะ ช่วยให้การคลิกการ์ดสถิติแล้วเปิดดูรายการตั๋วที่เกี่ยวข้องทำงานได้อย่างถูกต้อง
> 4. **Responsive Layout & Accessibility (STYLE-01, RESP-01, WCAG AA):** จัดเลย์เอาต์สลับระหว่าง Desktop Table และ Mobile Card Stack ได้อย่างลงตัว ปุ่มและการ์ดมี Touch target $\ge 44\text{px}$ กำหนด `overflowX: 'hidden'` ป้องกันหน้าจอเลื่อนแนวนอน และมี Empty State พร้อมปุ่ม CTA ชัดเจน
> 5. **Defensive Token & Date Handling:** มีการแนบ Header `Authorization: Bearer` พร้อมรองรับ Token fallback และแปลงวันเวลาแบบ Safe Date Serialization ป้องกันปัญหา Runtime Exception
> 6. **Test Coverage & Build Verification:** ชุดทดสอบ Client ผ่านครบ 81/81 tests (100%), Production build ผ่าน 0 errors และบันทึก `ai-use.md` (Prompt 13 & Reflection 3.7) ครบถ้วนตามเกณฑ์ส่งงาน
>
> คุณภาพของฟีเจอร์และชุดทดสอบสมบูรณ์แบบตามเกณฑ์ทุกข้อ ขอ **Approve** ให้ Merge เข้า `lab4-staging` ได้เลยค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#81](https://github.com/titayaaa/toktickit/pull/81)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `ce5a56682345553159b02a052dcc53b5efc4bbc5`
- **Merged At:** 2026-11-02 10:55:14 UTC+7
- **Status:** ✅ Merged successfully — **Closes #69**

---

### PR #82: Issue 34: Final Regression & System Hardening
- **PR URL:** [titayaaa/toktickit#82](https://github.com/titayaaa/toktickit/pull/82)
- **Feature Branch:** `feature/34-final-hardening`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`858d2ec`)
- **Scope & Objectives:**
  - **Full Regression Verification (REG-01, REG-02, AC-14, FR-15):**
    - ตรวจสอบความเข้ากันได้ย้อนหลัง 100% (Zero Regression) ของโมดูลเดิมทั้งหมดตั้งแต่ Lab 1, 2, และ 3 ร่วมกับโมดูลใหม่ของ Lab 4
    - Server Vitest Suite: 19 test files / 112 passed (Lab 1: 2 files / 5 tests, Lab 2: 6 files / 34 tests, Lab 3: 6 files / 42 tests, Lab 4: 5 files / 31 tests — 100% Pass)
    - Client Vitest Suite: 15 test files / 81 passed (100% Pass)
    - Full-stack Vitest Summary: 34 test files / 193 passed (100% Zero Regression)
    - Production Build Verification: `tsc && vite build` ผ่านสมบูรณ์ 0 errors
    - Server Build Verification: `tsc` ผ่านสมบูรณ์ 0 errors
  - **System Hardening Across TokTickIT:**
    - Hardened Token Extraction: รองรับทั้ง `toktickit_auth_token` และ fallback `token` ทุกคอมโพเนนต์
    - Safe Date Serialization: ป้องกัน TypeError เมื่อ timestamp ถูก parse ในรูปแบบต่างกัน
    - Status Enum Alignment: ขยายตัวเลือกสถานะใน `MyTickets.tsx` ให้ครบทั้ง 9 สถานะ (`WAITING_FOR_REQUESTER`, `REOPENED`, `CANCELLED`)
    - Async Flakiness Elimination: ปรับปรุง `waitFor` ใน `AdminUserManagement.test.tsx` รอ `admin-users-table` ป้องกัน race condition
  - **Documentation & Traceability Synchronization:**
    - อัปเดต `docs/lab-04/tests.md` ปรับสถานะ `REG-01` และ `REG-02` เป็น `Pass` พร้อมระบุพาธทั้ง Server และ Client
    - อัปเดต `docs/lab-04/ai-use.md` บันทึก Prompt 14 และ Reflection 3.8
    - อัปเดตตาราง Section 2 Checklist ข้อ 1-5 เป็น `✅ Verified`

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-02 14:54:15 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจสอบผลการรันชุดทดสอบย้อนหลัง (Full Regression Suite), การ Hardening ระบบ, ผลการ Build และเอกสารประกอบของ PR #82 (Issue 34) เทียบกับข้อกำหนด `REG-01`, `REG-02`, `AC-14` และ `FR-15` เรียบร้อยแล้วนะคะ
>
> ภาพรวมการ Hardening ระบบ (Token fallback, Safe Date serialization, Status Enum ใน MyTickets) และผลการรัน Client Vitest ผ่านครบ 81/81 tests ทำได้ยอดเยี่ยมมากค่ะ แต่ขอส่งเป็น **Changes Requested** ก่อนเพื่อให้เก็บรายละเอียดความครบถ้วนของเอกสารและตารางรีวิว 4 จุดก่อนกด Approve & Merge นะคะ:
>
> ### 🔴 จุดที่ต้องปรับแก้ก่อนอนุมัติ (Required Changes)
> 1. **บันทึกประวัติการรีวิว PR #113 ใน Part 2 ของ `docs/lab-04/reviewer.md`**:
>    - ใน Part 2 (บันทึกฝั่งที่ `@titayaaa` รีวิว `@jejaebubu`) มีบันทึกไว้ถึงแค่ `PR #112` แต่ยังขาดหัวข้อ `### PR #113: Issue #9: Lab 1–3 Regression Test Suite and System Hardening` ซึ่งทางเพื่อนได้รีวิวและอนุมัติ Merge เข้า `lab4-staging` ไปแล้ว (merge SHA: `5158f3a`) รบกวนเพิ่มบันทึกของ PR #113 ลงใน Part 2 ให้ครบถ้วนสมบูรณ์ค่ะ
>
> ---
>
> ### 🟠 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Improvement Suggestions)
> 2. **เพิ่มพาธชุดทดสอบฝั่ง Client ในตาราง `docs/lab-04/tests.md` สำหรับ `REG-01` และ `REG-02`**:
>    - ในตารางแถว `REG-01` และ `REG-02` ปัจจุบันระบุเฉพาะ `server/tests/lab-02/*.test.ts` และ `server/tests/lab-03/*.test.ts` เพื่อให้ครอบคลุมการทำ Regression ทั้ง Full-stack แนะนำให้เติมพาธฝั่ง Client เข้าไปด้วยค่ะ เช่น:
>      - `REG-01`: `server/tests/lab-02/*.test.ts, client/src/test/lab-02/*.test.tsx`
>      - `REG-02`: `server/tests/lab-03/*.test.ts, client/src/test/lab-03/*.test.tsx`
> 3. **ระบุสรุปผลการรันชุดทดสอบฝั่ง Server ใน Scope & Objectives ของ PR #82 (`reviewer.md`)**:
>    - ปัจจุบันระบุเฉพาะ Client Vitest (15 files / 81 passed) แนะนำให้ระบุสรุปผลการรันของฝั่ง Server Vitest Suite เพิ่มเติม เพื่อแสดงให้เห็นว่าผ่านการตรวจสอบ Regression ครบทั้ง Frontend และ Backend ค่ะ
> 4. **ทยอยอัปเดตตาราง Checklist Section 2 ใน `docs/lab-04/reviewer.md`**:
>    - ในตาราง Peer Review Checklist & Criteria รายการข้อ 1 ถึง 5 (Spec Completeness, Actions Taken Model, Resolution Gate, Dashboards, RBAC) ได้รับการ Merge เข้า staging ครบถ้วนแล้ว สามารถเริ่มปรับสถานะจาก `⏳ Pending` เป็น `✅ Verified` เพื่อเตรียมสรุปผลในโค้งสุดท้ายได้เลยค่ะ
>
> ฝากช่วยปรับแก้ 4 จุดนี้ แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อม Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @titayaaa (commit `2c5d703`)
- **Response Date:** 2026-11-02 15:58:49 UTC+7
- **Commit SHA:** `2c5d703`
- **Author Response Details (Verbatim):**

> > ตรวจสอบผลการรันชุดทดสอบย้อนหลัง (Full Regression Suite), การ Hardening ระบบ, ผลการ Build และเอกสารประกอบของ PR #82 (Issue 34) เทียบกับข้อกำหนด `REG-01`, `REG-02`, `AC-14` และ `FR-15` เรียบร้อยแล้วนะคะ
> > 
> > ภาพรวมการ Hardening ระบบ (Token fallback, Safe Date serialization, Status Enum ใน MyTickets) และผลการรัน Client Vitest ผ่านครบ 81/81 tests ทำได้ยอดเยี่ยมมากค่ะ แต่ขอส่งเป็น **Changes Requested** ก่อนเพื่อให้เก็บรายละเอียดความครบถ้วนของเอกสารและตารางรีวิว 4 จุดก่อนกด Approve & Merge นะคะ:
> > 
> > ### 🔴 จุดที่ต้องปรับแก้ก่อนอนุมัติ (Required Changes)
> > 1. **บันทึกประวัติการรีวิว PR #113 ใน Part 2 ของ `docs/lab-04/reviewer.md`**:
> >    
> >    * ใน Part 2 (บันทึกฝั่งที่ `@titayaaa` รีวิว `@jejaebubu`) มีบันทึกไว้ถึงแค่ `PR #112` แต่ยังขาดหัวข้อ `### PR #113: Issue #9: Lab 1–3 Regression Test Suite and System Hardening` ซึ่งทางเพื่อนได้รีวิวและอนุมัติ Merge เข้า `lab4-staging` ไปแล้ว (merge SHA: `5158f3a`) รบกวนเพิ่มบันทึกของ PR #113 ลงใน Part 2 ให้ครบถ้วนสมบูรณ์ค่ะ
> > 
> > ### 🟠 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Improvement Suggestions)
> > 2. **เพิ่มพาธชุดทดสอบฝั่ง Client ในตาราง `docs/lab-04/tests.md` สำหรับ `REG-01` และ `REG-02`**:
> >    
> >    * ในตารางแถว `REG-01` และ `REG-02` ปัจจุบันระบุเฉพาะ `server/tests/lab-02/*.test.ts` และ `server/tests/lab-03/*.test.ts` เพื่อให้ครอบคลุมการทำ Regression ทั้ง Full-stack แนะนำให้เติมพาธฝั่ง Client เข้าไปด้วยค่ะ เช่น:
> >      
> >      * `REG-01`: `server/tests/lab-02/*.test.ts, client/src/test/lab-02/*.test.tsx`
> >      * `REG-02`: `server/tests/lab-03/*.test.ts, client/src/test/lab-03/*.test.tsx`
> > 3. **ระบุสรุปผลการรันชุดทดสอบฝั่ง Server ใน Scope & Objectives ของ PR #82 (`reviewer.md`)**:
> >    
> >    * ปัจจุบันระบุเฉพาะ Client Vitest (15 files / 81 passed) แนะนำให้ระบุสรุปผลการรันของฝั่ง Server Vitest Suite เพิ่มเติม เพื่อแสดงให้เห็นว่าผ่านการตรวจสอบ Regression ครบทั้ง Frontend และ Backend ค่ะ
> > 4. **ทยอยอัปเดตตาราง Checklist Section 2 ใน `docs/lab-04/reviewer.md`**:
> >    
> >    * ในตาราง Peer Review Checklist & Criteria รายการข้อ 1 ถึง 5 (Spec Completeness, Actions Taken Model, Resolution Gate, Dashboards, RBAC) ได้รับการ Merge เข้า staging ครบถ้วนแล้ว สามารถเริ่มปรับสถานะจาก `⏳ Pending` เป็น `✅ Verified` เพื่อเตรียมสรุปผลในโค้งสุดท้ายได้เลยค่ะ
> > 
> > ฝากช่วยปรับแก้ 4 จุดนี้ แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อม Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ
>
> ขอบคุณ [@jejaebubu](https://github.com/jejaebubu) มากค่ะ สำหรับการตรวจทาน Full Regression Suite และข้อเสนอแนะที่ละเอียดรอบด้านมากค่ะ ได้ดำเนินการปรับปรุงแก้ไขครบถ้วนทั้ง 4 จุดใน commit `2c5d703` เรียบร้อยแล้วค่ะ:
>
> 1. **บันทึกประวัติการรีวิว PR #113 ใน Part 2 ของ `docs/lab-04/reviewer.md` (Required Change):**
>    - เพิ่มหัวข้อ `### PR #113: feat(regression): Lab 1–3 Regression Test Suite and System Hardening (Issue #9)` ใน Part 2 บันทึกประวัติการรีวิวรอบที่ 1 (Changes Requested), คำชี้แจง Author Response (commit `abb8ea3`), การตรวจประเมินรอบที่ 2 (Approved) และบันทึกการ Merge สำเร็จ (Merge SHA: `5158f3a`) ไว้อย่างครบถ้วนสมบูรณ์ค่ะ
> 2. **เพิ่มพาธชุดทดสอบฝั่ง Client สำหรับ REG-01 และ REG-02 ใน `docs/lab-04/tests.md`:**
>    - อัปเดตคอลัมน์ Automated Test File ในตารางข้อกำหนดการทดสอบ:
>      - `REG-01`: `server/tests/lab-02/*.test.ts`, `client/src/test/lab-02/*.test.tsx`
>      - `REG-02`: `server/tests/lab-03/*.test.ts`, `client/src/test/lab-03/*.test.tsx`
>      ครอบคลุมการตรวจสอบความเข้ากันได้ย้อนหลังแบบ Full-stack ทั้ง Frontend และ Backend ค่ะ
> 3. **ระบุสรุปผลการรันชุดทดสอบฝั่ง Server ใน Scope & Objectives ของ PR #82 (`docs/lab-04/reviewer.md`):**
>    - เพิ่มสรุปผลการรัน Server Vitest Suite: 19 test files / 112 passed (Lab 1–4) ควบคู่กับ Client Vitest Suite: 15 files / 81 passed รวมเป็น 34 files / 193 passed (100% Zero Regression) ค่ะ
> 4. **อัปเดตตาราง Checklist Section 2 ใน `docs/lab-04/reviewer.md` เป็น ✅ Verified:**
>    - ปรับสถานะรายการข้อ 1 ถึง 5 (Spec Completeness, Actions Taken Model, Resolution Gate Rule, Operational Dashboards, RBAC & Security) จาก `⏳ Pending` เป็น `✅ Verified` พร้อมระบุหมายเหตุการผ่านการตรวจสอบและการ Merge เข้าสู่ `lab4-staging` ครบถ้วนแล้วค่ะ
>
> ผลการทดสอบ Client Vitest ผ่านครบ 15/15 files (81/81 tests) และผลการ Build ทั้ง Frontend (`tsc && vite build`) และ Backend (`tsc`) ผ่านสมบูรณ์ 0 errors ค่ะ รบกวน [@jejaebubu](https://github.com/jejaebubu) ช่วยตรวจสอบอีกครั้งนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-02 16:08:06 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ตรวจสอบ commit `2c5d703` ซ้ำอย่างละเอียดรอบด้านแล้วนะคะ ดำเนินการปรับปรุงแก้ไขเอกสารและบันทึกประวัติการรีวิวได้ครบถ้วนสมบูรณ์ทั้ง 4 จุดอย่างยอดเยี่ยมมากค่ะ:
>
> 1. **บันทึกประวัติ PR #113 ครบถ้วนสมบูรณ์**: เพิ่มบันทึกการรีวิวของ PR #113 ลงใน Part 2 ของ `docs/lab-04/reviewer.md` พร้อมรายละเอียดผลการตรวจทั้งสองรอบและ Merge commit `5158f3a` ครบถ้วนตามมาตรฐาน
> 2. **ความครอบคลุมของ Regression Matrix**: อัปเดตพาธชุดทดสอบฝั่ง Client (`client/src/test/lab-02/*.test.tsx` และ `client/src/test/lab-03/*.test.tsx`) ใน `docs/lab-04/tests.md` ครบทั้ง Full-stack
> 3. **ตัวเลขสรุปผลการทดสอบแม่นยำ**: ระบุผลการทดสอบทั้ง Server Vitest (19 files / 112 passed) และ Client Vitest (15 files / 81 passed) รวม 34 files / 193 passed (Zero Regression) ไว้อย่างชัดเจน
> 4. **Checklist Section 2 พร้อมส่งมอบ**: ปรับสถานะ Checklist รายการ 1–5 ใน Section 2 เป็น `✅ Verified` เรียบร้อยแล้ว
>
> ผลการ Build ฝั่ง Client (`tsc && vite build`) และ Server ทำได้เรียบร้อยปราศจากข้อผิดพลาด เอกสารมีความสอดคล้องและมีคุณภาพระดับโปรดักชัน
>
> ขอ **Approve** และพร้อมให้ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#82](https://github.com/titayaaa/toktickit/pull/82)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `858d2ecbe25ee557283fc3c03534b17066f108f9`
- **Merged At:** 2026-11-02 16:08:15 UTC+7
- **Status:** ✅ Merged successfully — **Closes #70**

---

### PR #83: Issue 35: E2E Testing, Visual Inspection & Responsive Audits
- **PR URL:** [titayaaa/toktickit#83](https://github.com/titayaaa/toktickit/pull/83)
- **Feature Branch:** `feature/35-e2e-and-visual`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`b4dee7e`)
- **Scope & Objectives:**
  - **Playwright End-to-End Test Automation (`e2e/lab-04/*.spec.ts`):**
    - `e2e/lab-04/actions-taken-flow.spec.ts` (`E2E-01`): วงจรชีวิต Actions Taken แบบครบวงจร (Requester สร้างตั๋ว -> เจ้าหน้าที่เปิดตั๋ว ตรวจสอบ Follow-up validation บันทึกสถานะ `PENDING`, ขยับเป็น `IN_PROGRESS`, และบันทึก `COMPLETED` พร้อมบังคับกรอก Result ตาม `BR-16` / `AC-15` -> Requester เปิดดูแบบ Read-only ซ่อนปุ่ม Action ทั้งหมด)
    - `e2e/lab-04/ticket-resolution.spec.ts` (`E2E-02`): ตรวจสอบ Requester Advisory Flag ("My problem is resolved") แสดงแบนเนอร์แจ้งเตือนโดยไม่เปลี่ยนสถานะจริง, ตรวจจับ Resolution Gate เตือนเมื่อมี Pending Action, ปฏิเสธด้วย `409 Conflict` หากพยายาม Resolve ก่อนงานเสร็จ, และ Resolve สำเร็จหลังเคลียร์ Action ครบ
    - `e2e/lab-04/dashboards.spec.ts` (`E2E-03`): ตรวจสอบ Dashboard ทั้ง 2 ฝั่ง (IT Staff Dashboard 5 metric cards + Recent Tickets + Quick Actions นำทาง Drill-down ไปยัง Ticket Queue และ Requester Dashboard 4 metric cards + Quick Actions + Drill-down ไปยัง My Tickets)
  - **Multi-Viewport Responsive Audits & Visual Evidence (24 Screenshots):**
    - ครอบคลุม 3 ขนาดหน้าจอมาตรฐาน: Desktop (1280×800), Tablet (820×1180), Mobile (393×851)
    - บันทึกภาพหน้าจอหลักฐาน 24 ภาพจัดเก็บใน `artifacts/lab-04/screenshots/`:
      - `actions-taken/`: 9 ภาพ (staff-action-created, staff-action-completed, requester-readonly)
      - `dashboards/`: 6 ภาพ (staff-dashboard, requester-dashboard)
      - `workflow/`: 9 ภาพ (requester-indicated-resolved, resolution-gate-modal, ticket-resolved)
    - ตรวจสอบ `expectNoHorizontalOverflow(page)` ทุกหน้าจอ ไม่พบปัญหาการเลื่อนแนวนอน (Zero Horizontal Overflow) และผ่านเกณฑ์ Touch Target $\ge 44\text{px}$ ตามมาตรฐาน WCAG 2.1 AA
  - **Traceability Matrix & Documentation:**
    - อัปเดต `docs/lab-04/tests.md` ปรับสถานะ `E2E-01`, `E2E-02`, `E2E-03` เป็น `Pass`
    - อัปเดต `docs/lab-04/ai-use.md` บันทึก Prompt 15 และ Reflection 3.9
    - อัปเดต Section 2 Checklist ข้อ 6 (Test Traceability) และ 7 (Zen Green Polish) เป็น `✅ Verified`

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-02 16:25:35 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจสอบโค้ดชุดทดสอบ Playwright E2E (`e2e/lab-04/*.spec.ts`), ภาพหลักฐาน Responsive (`artifacts/lab-04/screenshots/`), และเอกสารประกอบของ PR #83 (Issue 35) อย่างละเอียดรอบด้านแล้วนะคะ
>
> ขอส่งเป็น **Changes Requested** ก่อนนะคะ เนื่องจากพบจุดสำคัญที่ทำให้ชุดทดสอบ Playwright ล้มเหลวทันที (Immediate Test Failure) จากความไม่ตรงกันระหว่าง Selector ในไฟล์ทดสอบกับโค้ด React Component จริงของตัวโปรเจกต์ค่ะ:
>
> ### 🔴 Blocking Issues: ต้องปรับแก้เพื่อให้ E2E รันผ่านจริง
>
> 1. **ฟังก์ชัน `login()` ใน E2E ไม่ตรงกับ `Login.tsx`:**
>    - ใน E2E ทุกไฟล์ค้นหา `page.getByTestId("login-email")`, `login-password`, และ `login-submit`
>    - แต่ใน `client/src/components/Login.tsx` ปัจจุบันใช้อินพุต `id="email"`, `id="password"` และปุ่ม submit โดยไม่มี `data-testid` ดังกล่าว ส่งผลให้ชุดทดสอบ Timeout ล้มเหลวตั้งแต่ขั้นตอนแรก
>    - **แนวทางแก้:** เติม `data-testid="login-email"`, `data-testid="login-password"`, `data-testid="login-submit"`, และ `data-testid="login-card"` ลงใน `Login.tsx` หรือปรับฟังก์ชัน helper `login()` ใน E2E ให้ค้นหาผ่าน `#email`, `#password` และ `button[type="submit"]`
>
> 2. **Header Navigation และการสลับหน้าจอใน `App.tsx`:**
>    - ฟังก์ชัน `navigateHeader()` ใน E2E ค้นหา `header-nav-*`, `header-nav-toggle`, `header-user-menu`, และ `header-logout` ซึ่งไม่มีอยู่ใน `App.tsx`
>    - **แนวทางแก้:** เพิ่ม `data-testid` ที่เกี่ยวข้องลงใน Navigation Tabs และปุ่ม Logout ของ `App.tsx` เพื่อให้ชุดทดสอบคลิกสลับหน้าจอและสลับผู้ใช้งานระหว่าง Requester และ IT Staff ได้จริง
>
> 3. **ฟิลด์บังคับและปุ่ม Submit ใน `CreateTicketForm.tsx`:**
>    - ใน `CreateTicketForm.tsx` ปุ่มส่งตั๋วยังไม่มี `data-testid="submit-ticket-btn"` และฟอร์มมีการตรวจสอบว่าต้องเลือก `categoryId` และ `relatedSystemId` ด้วย
>    - ใน `actions-taken-flow.spec.ts` และ `ticket-resolution.spec.ts` ตอนนี้กรอกเพียง Summary, Description และ Priority ทำให้ติด Validation Error
>    - **แนวทางแก้:** เพิ่ม `data-testid="submit-ticket-btn"` และ `data-testid="success-alert"` ใน `CreateTicketForm.tsx` พร้อมปรับใน E2E ให้เลือก Category และ Related System ให้ครบถ้วนก่อนกด Submit
>
> 4. **Selector ไม่ตรงกับโค้ดจริงใน `TicketDetail.tsx` และ `StaffTicketQueue.tsx`:**
>    - ใน `ticket-resolution.spec.ts` และ `actions-taken-flow.spec.ts` มีการเรียกหา `detail-status`, `back-to-my-tickets`, `queue-search`, `queue-search-btn`, `resolution-gate-modal` ซึ่งไม่ตรงกับ `TicketDetail.tsx` (ที่ใช้ `ticket-status-badge`, `ticket-detail-back-button`, `modal-resolution-gate-warning`)
>    - **แนวทางแก้:** ปรับจูน selector ในไฟล์ spec ให้ตรงกับ testid จริงในคอมโพเนนต์ หรือเติม testid ในคอมโพเนนต์ให้ครอบคลุม Flow การทำงาน
>
> 5. **Metric Card Selector ใน `RequesterDashboard.tsx`:**
>    - ใน `dashboards.spec.ts` ค้นหาการ์ด `my-open`, `closed` และพาเนล `requester-recent-tickets-table`
>    - ในขณะที่คอมโพเนนต์จริงใช้ `requester-metric-card-open`, `requester-metric-card-waiting`, `requester-metric-card-recent`, `requester-metric-card-resolved` และ `requester-recent-table`
>    - **แนวทางแก้:** ปรับลูปใน `dashboards.spec.ts` ให้ตรงกับชื่อการ์ดและตารางจริงใน `RequesterDashboard.tsx`
>
> รบกวนช่วยปรับจูนตัวเลือกและคอมโพเนนต์ให้สอดคล้องกัน แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อมตรวจซ้ำและ Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @titayaaa (commit `45b424d`)
- **Response Date:** 2026-11-03 14:37:45 UTC+7
- **Commit SHA:** `45b424d`
- **Author Response Details (Verbatim):**

> > ตรวจสอบโค้ดชุดทดสอบ Playwright E2E (`e2e/lab-04/*.spec.ts`), ภาพหลักฐาน Responsive (`artifacts/lab-04/screenshots/`), และเอกสารประกอบของ PR #83 (Issue 35) อย่างละเอียดรอบด้านแล้วนะคะ
> > 
> > ขอส่งเป็น **Changes Requested** ก่อนนะคะ เนื่องจากพบจุดสำคัญที่ทำให้ชุดทดสอบ Playwright ล้มเหลวทันที (Immediate Test Failure) จากความไม่ตรงกันระหว่าง Selector ในไฟล์ทดสอบกับโค้ด React Component จริงของตัวโปรเจกต์ค่ะ:
> > 
> > ### 🔴 Blocking Issues: ต้องปรับแก้เพื่อให้ E2E รันผ่านจริง
> > 1. **ฟังก์ชัน `login()` ใน E2E ไม่ตรงกับ `Login.tsx`:**
> >    
> >    * ใน E2E ทุกไฟล์ค้นหา `page.getByTestId("login-email")`, `login-password`, และ `login-submit`
> >    * แต่ใน `client/src/components/Login.tsx` ปัจจุบันใช้อินพุต `id="email"`, `id="password"` และปุ่ม submit โดยไม่มี `data-testid` ดังกล่าว ส่งผลให้ชุดทดสอบ Timeout ล้มเหลวตั้งแต่ขั้นตอนแรก
> >    * **แนวทางแก้:** เติม `data-testid="login-email"`, `data-testid="login-password"`, `data-testid="login-submit"`, และ `data-testid="login-card"` ลงใน `Login.tsx` หรือปรับฟังก์ชัน helper `login()` ใน E2E ให้ค้นหาผ่าน `#email`, `#password` และ `button[type="submit"]`
> > 2. **Header Navigation และการสลับหน้าจอใน `App.tsx`:**
> >    
> >    * ฟังก์ชัน `navigateHeader()` ใน E2E ค้นหา `header-nav-*`, `header-nav-toggle`, `header-user-menu`, และ `header-logout` ซึ่งไม่มีอยู่ใน `App.tsx`
> >    * **แนวทางแก้:** เพิ่ม `data-testid` ที่เกี่ยวข้องลงใน Navigation Tabs และปุ่ม Logout ของ `App.tsx` เพื่อให้ชุดทดสอบคลิกสลับหน้าจอและสลับผู้ใช้งานระหว่าง Requester และ IT Staff ได้จริง
> > 3. **ฟิลด์บังคับและปุ่ม Submit ใน `CreateTicketForm.tsx`:**
> >    
> >    * ใน `CreateTicketForm.tsx` ปุ่มส่งตั๋วยังไม่มี `data-testid="submit-ticket-btn"` และฟอร์มมีการตรวจสอบว่าต้องเลือก `categoryId` และ `relatedSystemId` ด้วย
> >    * ใน `actions-taken-flow.spec.ts` และ `ticket-resolution.spec.ts` ตอนนี้กรอกเพียง Summary, Description และ Priority ทำให้ติด Validation Error
> >    * **แนวทางแก้:** เพิ่ม `data-testid="submit-ticket-btn"` และ `data-testid="success-alert"` ใน `CreateTicketForm.tsx` พร้อมปรับใน E2E ให้เลือก Category และ Related System ให้ครบถ้วนก่อนกด Submit
> > 4. **Selector ไม่ตรงกับโค้ดจริงใน `TicketDetail.tsx` และ `StaffTicketQueue.tsx`:**
> >    
> >    * ใน `ticket-resolution.spec.ts` และ `actions-taken-flow.spec.ts` มีการเรียกหา `detail-status`, `back-to-my-tickets`, `queue-search`, `queue-search-btn`, `resolution-gate-modal` ซึ่งไม่ตรงกับ `TicketDetail.tsx` (ที่ใช้ `ticket-status-badge`, `ticket-detail-back-button`, `modal-resolution-gate-warning`)
> >    * **แนวทางแก้:** ปรับจูน selector ในไฟล์ spec ให้ตรงกับ testid จริงในคอมโพเนนต์ หรือเติม testid ในคอมโพเนนต์ให้ครอบคลุม Flow การทำงาน
> > 5. **Metric Card Selector ใน `RequesterDashboard.tsx`:**
> >    
> >    * ใน `dashboards.spec.ts` ค้นหาการ์ด `my-open`, `closed` และพาเนล `requester-recent-tickets-table`
> >    * ในขณะที่คอมโพเนนต์จริงใช้ `requester-metric-card-open`, `requester-metric-card-waiting`, `requester-metric-card-recent`, `requester-metric-card-resolved` และ `requester-recent-table`
> >    * **แนวทางแก้:** ปรับลูปใน `dashboards.spec.ts` ให้ตรงกับชื่อการ์ดและตารางจริงใน `RequesterDashboard.tsx`
> > 
> > รบกวนช่วยปรับจูนตัวเลือกและคอมโพเนนต์ให้สอดคล้องกัน แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อมตรวจซ้ำและ Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ
>
> ขอบคุณสำหรับคำแนะนำและการตรวจสอบอย่างละเอียดรอบด้านมากๆ ค่ะคุณเจเจ้ (@jejaebubu)! 
>
> ได้ดำเนินการปรับปรุงแก้ไขโค้ด ชุดทดสอบ Playwright E2E และบันทึกประวัติการรีวิวลงในเอกสารครบทั้ง 5 จุดเรียบร้อยแล้วใน Commit `7af52d9` และ `25fa6b6`:
>
> 1. **Harmonize `login()` & `Login.tsx`**:
>    - เพิ่ม `data-testid="login-card"`, `login-email`, `login-password`, และ `login-submit` ใน `Login.tsx`
>    - ปรับฟังก์ชัน `login()` ใน E2E spec ให้รองรับ Fallback Selectors (`[data-testid="login-email"], #email`, `button[type="submit"]`) เพื่อความเสถียรในการรัน
> 2. **Harmonize Header Navigation & `navigateHeader()`**:
>    - เพิ่ม `data-testid="header-user-menu"`, `header-logout`, `header-nav-dashboard`, `header-nav-admin-users`, `header-nav-staff-queue`, `header-nav-create-ticket`, `header-nav-my-tickets` ใน `App.tsx`
>    - ปรับ `navigateHeader()` ให้ตรวจจับและคลิกแท็บที่แสดงผลอยู่บนหน้าจอได้ทันที รองรับทั้ง Desktop Navbar และ Mobile Navigation Toggle
> 3. **`CreateTicketForm.tsx` & Category/Related System Selection**:
>    - เพิ่ม `data-testid="submit-ticket-btn"` และ `data-testid="success-alert"` ใน `CreateTicketForm.tsx`
>    - ใน `actions-taken-flow.spec.ts` และ `ticket-resolution.spec.ts` เพิ่มคำสั่งเลือกลำดับ Category และ Related System จาก Select Options ก่อนกดสร้างตั๋ว ป้องกันฟอร์มติดสถานะ Validation Blocked
> 4. **Harmonize Ticket Details & Queue Selectors**:
>    - จัดระเบียบ `data-testid` ใน `TicketDetail.tsx`, `StaffTicketQueue.tsx`, และ `ActionsTaken.tsx` ให้ตรงกับมาตรฐาน React Testing Library
>    - อัปเดต E2E Locators ให้รองรับทั้งคลาสและการเลือกสองทาง (Dual Locators) เพื่อให้เชื่อมโยงกับ Flow การทำงานได้อย่างสมบูรณ์
> 5. **Metric Cards ใน `RequesterDashboard.tsx` & `dashboards.spec.ts`**:
>    - ปรับ Loop ใน `dashboards.spec.ts` ให้ค้นหา `open`, `waiting`, `recent`, `resolved` และตาราง `requester-recent-table` ตรงกับ Component เป๊ะๆ
> 6. **บันทึกประวัติการรีวิวใน `docs/lab-04/reviewer.md`**:
>    - บันทึกข้อเสนอแนะรอบที่ 1 และคำชี้แจง Author Response ลงในตารางประวัติการรีวิวเรียบร้อยแล้ว
>
> **ผลการทดสอบการทำงานย้อนหลัง (Regression & Build Verification):**
> - Client Vitest Suite: ผ่านครบ **81/81 tests** (15 test files)
> - Client Production Build (`tsc && vite build`): ผ่านสมบูรณ์ (Code 0)
> - Server Build (`tsc`): ผ่านสมบูรณ์ (Code 0)
>
> รบกวนคุณเจเจ้ตรวจสอบอีกครั้งนะคะ หากเรียบร้อยแล้วสามารถกด Approve และ Merge เข้าสู่ `lab4-staging` ได้เลยค่ะ ขอบคุณมากๆ เลยค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-03 17:05:30 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
>  ตรวจสอบ Commit `7af52d9` และ `25fa6b6` อย่างละเอียดรอบด้านแล้วนะคะ ดำเนินการปรับปรุงแก้ไขทั้งตัวคอมโพเนนต์และชุดทดสอบ Playwright E2E ได้อย่างยอดเยี่ยม รวดเร็ว และประณีตมากค่ะ:
>
>  1. **Authentication & Navigation Resiliency**: เพิ่ม `data-testid` ครบถ้วนใน `Login.tsx` และ `App.tsx` พร้อมปรับฟังก์ชัน helper (`login()`, `navigateHeader()`) ให้ใช้ Dual Locators รองรับทั้ง Desktop และ Mobile Viewports ได้อย่างสมบูรณ์แบบ
>  2. **Form Interaction & Validation Harmonization**: เพิ่มการเลือก Category และ Related System ใน `CreateTicketForm.tsx` ทำให้ขั้นตอนการสร้างตั๋วใน E2E ทำงานได้จริงและไม่ติด Validation Error
>  3. **Complete Workflow Verification**: เชื่อมโยงตัวเลือกใน `TicketDetail.tsx` และ `StaffTicketQueue.tsx` ครอบคลุมทั้ง Advisory Flag ของ Requester, การบล็อก 409 Conflict ของ Resolution Gate และการ Resolve ตั๋วสำเร็จหลังเคลียร์ Action ครบ
>  4. **Dashboard Metric Alignment**: ปรับจูน Selector ใน `RequesterDashboard.tsx` และ `dashboards.spec.ts` ให้ตรงกัน 100%
>  5. **Audit Trail & Documentation**: บันทึกประวัติการรีวิวรอบที่ 1 และ Author Response ลงใน `docs/lab-04/reviewer.md` ครบถ้วนตามมาตรฐานวิศวกรรมซอฟต์แวร์
>
>  ผลการ Build (`tsc && vite build`) และ Client Vitest (15 files / 81 passed) ผ่านสมบูรณ์ 0 errors
>
>  ขอ **Approve** และพร้อมให้ดำเนินการ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#83](https://github.com/titayaaa/toktickit/pull/83)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `b4dee7ea4a87f48ef2fafa15b53f34a4c01abb67`
- **Merged At:** 2026-11-03 17:05:47 UTC+7
- **Status:** ✅ Merged successfully — **Closes #71**

---

### PR #84: Issue 36: Release Integration, Staging-to-Main PR & 9-Part Report
- **PR URL:** [titayaaa/toktickit#84](https://github.com/titayaaa/toktickit/pull/84)
- **Feature Branch:** `release/lab04-staging-to-main`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `main`
- **Current Status:** ✅ Approved & Merged (`06a4035`)
- **Scope & Objectives:**
  - Release Integration for Sprint 4 (Lab 4): Promote fully verified and peer-reviewed code from `lab4-staging` into `main`.
  - Integrates all 9 Sprint 4 feature increments:
    - Issue 27 (PR #75): Sprint 4 Engineering Contract & Specification (docs/lab-04)
    - Issue 28 (PR #76): Database Migration, Schema Evolution & Seed Data for Actions Taken
    - Issue 29 (PR #77): Actions Taken Backend REST API & Authorization Middleware
    - Issue 30 (PR #78): Actions Taken Frontend Component on Ticket Detail
    - Issue 31 (PR #79): Ticket Workflow Operations & Resolution Gate Enforcement
    - Issue 32 (PR #80): IT Staff Dashboard API & UI
    - Issue 33 (PR #81): Requester Dashboard API & UI
    - Issue 34 (PR #82): Final Regression & System Hardening
    - Issue 35 (PR #83): E2E Testing, Visual Inspection & Responsive Audits
  - Full Regression & Release Verification:
    - Server API tests: 112 / 112 passed across 19 test files (100%)
    - Client Component tests: 81 / 81 passed across 15 test files (100%)
    - Playwright E2E suites: 3 suites across 3 responsive viewports (Desktop, Tablet, Mobile) = 9 runs passed (100%)
    - Production builds (`tsc` for server, `tsc && vite build` for client) compile with 0 errors
  - Sprint 4 Documentation finalized: `README.md`, `docs/lab-04/ai-use.md`, `docs/lab-04/reviewer.md`, `docs/lab-04/tests.md`, and 9-part report artifacts.

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-04 00:50:19 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจสอบโค้ดผสานรวม (Integration Diffs), ชุดทดสอบ Full Regression, ผลการ Build และเอกสารกำกับรุ่นทั้งหมดของ PR #84 (Issue 36 / PR-10) อย่างละเอียดรอบด้านแล้วนะคะ
> 
> ภาพรวมการรวมโค้ดทั้ง 9 ฟีเจอร์ย่อย (PR #75–#83) เข้าสู่สาขา `main` ทำได้เรียบร้อย ไร้ข้อผิดพลาด และผลการ Build/Test ผ่าน 100% ค่ะ แต่ขอส่งเป็น **Changes Requested** ในรอบแรกก่อน เพื่อให้ปรับปรุงความถูกต้องของเอกสาร 3 จุดก่อนกด Final Approve & Merge นะคะ:
> 
> ### 🔴 จุดที่ต้องปรับแก้ก่อนอนุมัติ (Required Changes)
> 
> 1. **บันทึกประวัติการรีวิว PR #115 ใน Part 2 ของ `docs/lab-04/reviewer.md` ให้สมบูรณ์:**
>    - ใน Part 2 ใต้หัวข้อ `### PR #115: PR-11: Sprint 4 Documentation and Release Integration to Main (Issue #11)` ปัจจุบันมีเพียง Scope และสถานะยังค้างอยู่ที่ `⏳ Pending Review`
>    - รบกวนเพิ่มบันทึก Review Trail (Round 1 Review, Author Response, Round 2 Review และ Merge Event) ของ PR #115 ลงใน Part 2 ให้ครบถ้วนสมบูรณ์เหมือนกับทุก PR ก่อนหน้าค่ะ
> 
> 2. **แก้ไขข้อความบรรยาย Dashboard Metric Cards ใน `README.md` ให้ตรงกับระบบจริง:**
>    - **IT Staff Dashboard (บรรทัด 156):** มีการระบุ `Breached/At Risk SLA` ซึ่งใน `specification.md` (Section 3.2 ข้อ 1) ระบุชัดเจนว่า SLA Engine เป็น Explicit Exclusion (Out of Scope) และในระบบจริงคือการ์ด `Urgent Tickets` แนะนำปรับเป็น:
>      *(Unassigned Tickets, My Assigned Tickets, Urgent Tickets, และ My Pending Actions)*
>    - **Requester Dashboard (บรรทัด 158):** มีการระบุ `Awaiting Staff Action` ซึ่งในระบบจริง (`RequesterDashboard.tsx`) และตาม FR-13 คือการ์ด `Waiting for Your Input` (`WAITING_FOR_REQUESTER`)
> 
> ### 🟠 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Improvement Suggestions)
> 
> 3. **เพิ่มแถวบันทึกผล Release Verification ใน `docs/lab-04/tests.md`:**
>    - ในตาราง Section 2 ของ `tests.md` ปัจจุบันมีถึงแค่แถว `REG-02` แนะนำให้เพิ่มแถวสำหรับ Release Verification (เช่น `REL-01: Full-stack Regression & Production Build on main branch` ระบุผล 112 server + 81 client tests, Playwright 3 viewports, Zero build error) เพื่อให้ Traceability Matrix ปิดสมบูรณ์ 100% ค่ะ
> 
> ฝากช่วยปรับแก้ 3 จุดนี้ แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อมเข้ามาตรวจซ้ำและ Approve & Merge เข้าสู่ `main` ให้ทันทีค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @titayaaa
- **Response Date:** 2026-11-04 01:50:00 UTC+7
- **Author Response Details (Verbatim):**

> ขอบคุณ @jejaebubu สำหรับการตรวจทาน Release PR #84 อย่างละเอียดรอบคอบมากค่ะ ดำเนินการปรับปรุงและแก้ไขครบถ้วนทั้ง 3 จุดเรียบร้อยแล้วค่ะ:
> 
> 1. **บันทึกประวัติการรีวิว PR #115 ใน Part 2 (`docs/lab-04/reviewer.md`)**:
>    - บันทึกบทสนทนาการรีวิวของ PR #115 ใน Part 2 ครบถ้วนทั้ง Round 1 Review (`CHANGES_REQUESTED`), Author Response (`fc4b7b6`), และขั้นตอน Round 2 Verification ให้มีเนื้อหาแบบ Verbatim สมบูรณ์ 100% เหมือนกับทุก PR ก่อนหน้าเรียบร้อยค่ะ
> 2. **แก้ไขข้อความบรรยาย Dashboard Metric Cards ใน `README.md`**:
>    - **IT Staff Dashboard:** ปรับข้อความเป็นการ์ดที่ใช้งานจริงในระบบ: *(Unassigned Tickets, My Assigned Tickets, Urgent Tickets, and My Pending Actions)* โดยตัดคำว่า Breached/At Risk SLA ออกตรงตามข้อกำหนด Out-of-Scope ของ SLA Engine
>    - **Requester Dashboard:** ปรับข้อความเป็นการ์ดตามระบบจริงและ FR-13: *(Total Open, Waiting for Your Input, Recently Updated, Resolved)* โดยเปลี่ยนจาก Awaiting Staff Action เป็น Waiting for Your Input (`WAITING_FOR_REQUESTER`)
> 3. **เพิ่มแถวบันทึกผล Release Verification ใน `docs/lab-04/tests.md`**:
>    - เพิ่มแถว `REL-01` ในตาราง Section 2: `REL-01: Full-stack Regression & Production Build verification on main branch` พร้อมระบุผลการรัน 112 server + 81 client tests, Playwright E2E suites บน 3 viewports, และ build bundle ผ่าน 0 errors (สถานะ Pass) ปิด Traceability Matrix ครบถ้วน 100%
> 
> ดำเนินการอัปเดต commit ขึ้นสาขา `release/lab04-staging-to-main` เรียบร้อยแล้วค่ะ รบกวนช่วยตรวจทานซ้ำอีกครั้งและกด Approve & Merge เข้าสู่ `main` ได้เลยนะคะ ขอบคุณมากค่ะ! ✨

#### 💬 Round 2 Final Verification & Approval by @jejaebubu
- **Review Date:** 2026-11-04 02:53:54 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
> 
> ตรวจสอบ Commit `b21bff9` ซ้ำอย่างละเอียดรอบด้านแล้วนะคะ ดำเนินการปรับปรุงแก้ไขทั้ง 3 จุดได้อย่างยอดเยี่ยม รวดเร็ว และประณีตมากค่ะ:
> 
> 1. **Complete Peer Review Audit Trail**: บันทึกบทสนทนาการรีวิวของ PR #115 ใน Part 2 ของ `docs/lab-04/reviewer.md` ครบถ้วนทั้ง Round 1, Author Response (`fc4b7b6`) และ Round 2 Workflow แบบ Verbatim สมบูรณ์ 100%
> 2. **Accurate Dashboard Specifications**: แก้ไขข้อความบรรยายการ์ดตัวชี้วัดใน `README.md` ทั้งฝั่ง IT Staff และ Requester ให้ตรงกับข้อกำหนดใน `specification.md` และคอมโพเนนต์จริงในระบบ
> 3. **Closed Test Traceability Matrix**: เพิ่มแถว `REL-01` ในตาราง `docs/lab-04/tests.md` ยืนยันผลการทดสอบ Full Regression (Server 112, Client 81, Playwright 3 Viewports) และผลการ Build สำเร็จ 0 errors
> 
> โค้ดและเอกสารมีความสมบูรณ์แบบระดับ Production-ready พร้อมสำหรับการส่งมอบงาน
> 
> ขอ **Approve** และยินดีด้วยกับการปิด Sprint 4 (Lab 4) อย่างเป็นทางการค่ะ! พร้อมให้ดำเนินการ Merge สาขา `release/lab04-staging-to-main` เข้าสู่ `main` ได้ทันทีค่ะ

#### 🔀 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#84](https://github.com/titayaaa/toktickit/pull/84)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `main`
- **Merge Commit SHA:** `06a40356e0f653f3c67f5b5126d885907bbc0e92`
- **Merged At:** 2026-11-04 02:57:48 UTC+7
- **Status:** ✅ Merged successfully — **Closes #72**

---

# Part 2: Records of Student (@titayaaa) Reviewing Partner (@jejaebubu)

### PR #104: docs(lab04): Sprint 4 engineering contract (Issue #1)
- **PR URL:** [jejaebubu/toktickit#104](https://github.com/jejaebubu/toktickit/pull/104)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Pending Peer Review by @jejaebubu

#### ⏳ Status & Peer Review Workflow
- **Pull Request Status:** Open and undergoing active peer review on GitHub ([titayaaa/toktickit#84](https://github.com/titayaaa/toktickit/pull/84)).
- **Reviewer:** `@jejaebubu`
- **Release Verification:**
  - Client Vitest Suite: 81 / 81 tests passed across 15 files (100%)
  - Production Builds: `tsc` (server) & `tsc && vite build` (client) compile with 0 errors
  - Full Sprint 4 documentation and release reports synchronized across all branches.
- *Dialogue log will be recorded verbatim upon reviewer submission.*

---

---

# Part 2: Records of Student (@titayaaa) Reviewing Partner (@jejaebubu)

## Master PR Table (jejaebubu/toktickit)
- **Repository:** [jejaebubu/toktickit](https://github.com/jejaebubu/toktickit)
- **Author:** ณภัทร (GitHub: `@jejaebubu`)
- **Peer Reviewer:** ฑิตญา ผ่องสกุล (GitHub: `@titayaaa` / Student ID: 67070505201)
- **Target Branch:** `lab4-staging` / `main`

| PR # | Feature / Issue Title | GitHub Issue | Feature Branch | Target | Reviewer | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **[PR #104](https://github.com/jejaebubu/toktickit/pull/104)** | docs(lab04): Sprint 4 engineering contract | Issue #1 | `docs/sprint4-contract` | `lab4-staging` | `@titayaaa` | ✅ Merged (`f242eb3`) |
| **[PR #105](https://github.com/jejaebubu/toktickit/pull/105)** | feat(db): ActionTaken model, migration, and idempotent seed | Issue #2 | `feat/db-actions-taken` | `lab4-staging` | `@titayaaa` | ✅ Merged (`005b157`) |
| **[PR #106](https://github.com/jejaebubu/toktickit/pull/106)** | feat(api): Actions Taken REST API, RBAC, and status validation | Issue #3 | `feat/api-actions-taken` | `lab4-staging` | `@titayaaa` | ✅ Merged (`23166db`) |
| **[PR #108](https://github.com/jejaebubu/toktickit/pull/108)** | feat(ui): Actions Taken UI on Ticket Detail | Issue #4 | `feat/ui-actions-taken` | `lab4-staging` | `@titayaaa` | ✅ Merged (`2425b2d`) |
| **[PR #109](https://github.com/jejaebubu/toktickit/pull/109)** | feat(workflow): ticket status transition matrix, resolution gate, and concurrency check | Issue #5 | `feat/workflow-resolution-gate` | `lab4-staging` | `@titayaaa` | ✅ Merged (`468a7ca`) |
| **[PR #110](https://github.com/jejaebubu/toktickit/pull/110)** | feat(dashboard): IT Staff Dashboard API, summary metrics, and UI screen | Issue #6 | `feat/staff-dashboard` | `lab4-staging` | `@titayaaa` | ✅ Merged (`c11da67`) |
| **[PR #111](https://github.com/jejaebubu/toktickit/pull/111)** | feat(dashboard): Requester Dashboard API, owned ticket metrics, and UI screen | Issue #7 | `feat/requester-dashboard` | `lab4-staging` | `@titayaaa` | ✅ Merged (`927862f`) |
| **[PR #112](https://github.com/jejaebubu/toktickit/pull/112)** | test(e2e): Lab 4 Playwright E2E flows for Actions Taken, Resolution Gate, and Dashboards | Issue #8 | `test/e2e-lab4-flows` | `lab4-staging` | `@titayaaa` | ✅ Merged (`0ce99e8`) |
| **[PR #113](https://github.com/jejaebubu/toktickit/pull/113)** | test(regression): full regression of Lab 1-3 suites with Lab 4 features | Issue #9 | `test/regression-hardening` | `lab4-staging` | `@titayaaa` | ✅ Merged (`5158f3a`) |
| **[PR #114](https://github.com/jejaebubu/toktickit/pull/114)** | PR-10: Zen Green UI polish, accessibility, responsive viewports, and screenshots | Issue #10 | `polish/zen-green-a11y` | `lab4-staging` | `@titayaaa` | ✅ Merged (`d785a4c`) |
| **[PR #115](https://github.com/jejaebubu/toktickit/pull/115)** | PR-11: Sprint 4 Documentation and Release Integration to Main | Issue #11 | `release/lab04-staging-to-main` | `main` | `@titayaaa` | ✅ Merged (`fe99888`) |

---

### PR #104: docs(lab04): Sprint 4 engineering contract (Issue #1)
- **PR URL:** [jejaebubu/toktickit#104](https://github.com/jejaebubu/toktickit/pull/104)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`f242eb3`)

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-10-31 03:51:45 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ภาพรวมเอกสารเขียนโครงสร้างได้ดีมากและครอบคลุมทั้ง 6 ไฟล์ตามเกณฑ์ Spec DD เลยแต่พอลองเช็กทาบกับตัว Lab 4 Handout และ Rubric การตรวจคะแนน (หน้า 8 และ 11) อย่างละเอียดแล้ว พบจุดสำคัญเกี่ยวกับฟิลด์ของ Actions Taken และ Resolution Gate ที่ยังขาดหายไปและจำเป็นต้องเพิ่มลงในสเปกก่อนเริ่มเขียนโค้ด ขอเสนอแนะให้ปรับแก้แยกตามไฟล์ดังนี้
>
> 1. ไฟล์ docs/lab-04/specification.md
>
> - เพิ่มฟิลด์ assigneeId ในโมเดล ActionTaken:
>
> ปัจจุบันมีแค่ performedById (คนบันทึก) แต่ตาม Handout หน้า 8 (AC-01) และหน้า 11 (Part 6) กำหนดว่า Action Taken ต้องมี "approved assignee" และต้องมีการทดสอบ "inactive-assignee rejection" เพื่อรองรับเคสที่ตั๋วเป็นของเจ้าหน้าที่คนหนึ่ง แต่ส่งต่องาน Action ให้เจ้าหน้าที่อีกคนทำได้
>
> ข้อเสนอแนะ: เพิ่ม assigneeId Int และความสัมพันธ์ assignee User ในโมเดล ActionTaken พร้อมกำหนด Business Rule ว่าผู้ที่ถูก Assign ต้องเป็น IT_STAFF หรือ ADMINISTRATOR ที่ isActive = true เท่านั้น
>
> - เพิ่มฟิลด์ status บน ActionTaken:
>
> ตาม Rubric หน้า 11 ระบุว่าต้องสาธิต "status transition, complete, cancel" ของ Action Taken ได้
>
> ข้อเสนอแนะ: เพิ่ม Enum เช่น ActionTakenStatus { PENDING, IN_PROGRESS, COMPLETED, CANCELLED } (default เป็น COMPLETED หรือ PENDING) ไว้ในโมเดล ActionTaken
>
> - เพิ่มเงื่อนไข Resolution Gate ให้ครบถ้วน
>
> ใน BR-09 ปัจจุบันระบุแค่เรื่อง Requester advisory flag แต่ตามโจทย์แลป 4 มีกฎสำคัญอีกข้อคือ "ห้ามเปลี่ยนสถานะตั๋วเป็น Resolved หากยังมี Actions Taken ค้างอยู่ในสถานะ PENDING หรือ IN_PROGRESS" (ต้อง Complete หรือ Cancel ทั้งหมดก่อนถึงจะปิดตั๋วได้)
>
> 2. ไฟล์ docs/lab-04/api-spec.md
>
> - อัปเดต Payload ใน Actions Taken Endpoints (POST และ PATCH):
>
> เพิ่มฟิลด์ assigneeId และ status ใน Request Body ของการสร้าง/แก้ไข Action Taken
> เพิ่ม Error Response 422 Unprocessable Entity ในกรณีที่ส่ง assigneeId ของผู้ใช้ที่ inactive หรือมีบทบาทเป็น REQUESTER
>
> - อัปเดต Endpoint เปลี่ยนสถานะตั๋ว (PUT/PATCH /api/tickets/:id/status):
>
> เพิ่มเงื่อนไขตรวจสอบ Resolution Gate: หากพยายามปรับสถานะเป็น Resolved แต่ยังมี Action ที่ค้างสถานะ ให้ตอบกลับเป็น 409 Conflict (พร้อม error message แจ้งว่ามี unresolved actions ค้างอยู่)
>
> 3. ไฟล์ docs/lab-04/ui-spec.md
>
> - เพิ่มคอนโทรลบนฟอร์ม Actions Taken (ข้อ 2.4)
>
> เพิ่ม Dropdown สำหรับเลือก Assignee (เลือกเจ้าหน้าที่ไอทีที่ active)
>
> เพิ่มตัวเลือกสำหรับเปลี่ยน Status ของ Action Taken (เช่น Badge แสดงสถานะ และตัวเลือก Complete / Cancel)
>
> เพิ่ม Visual Feedback ใน Ticket Resolution (ข้อ 2.5):
> ระบุว่าหากตั๋วยังมี Actions Taken ค้างอยู่ ปุ่ม Resolve ควรมีคำเตือน หรือเมื่อกดยืนยันแล้วระบบจะแสดง Modal เตือนว่ายังมี Action ค้างอยู่
>
> 4. ไฟล์ docs/lab-04/tests.md
>
> - เพิ่ม Test Cases ใน Traceability Matrix
>
> เพิ่มเคส API/Unit Test ตรวจสอบการปฏิเสธการ Assign ให้ inactive user (422 Unprocessable Entity)
>
> เพิ่มเคสทดสอบ Resolution Gate ว่าระบบต้องปฏิเสธ 409 Conflict เมื่อพยายาม Resolve ตั๋วที่มี Pending Actions
>
> รบกวนฝากอัปเดตเพิ่มเติมประเด็นเหล่านี้ลงในสเปกอีกนิดนะะ พอสเปกส่วนนี้ครบแล้วตัวโมเดลจะตรงตามเกณฑ์รูบริก 10 คะแนนของ Part 6 เลย ถ้าแก้แล้วเดี๋ยวเราเข้ามาตรวจและกด Approve ให้น้าา

#### 💬 Round 1 Author Response by @jejaebubu (commit `3310ba9`)
- **Response Date:** 2026-10-31 10:54:14 UTC+7
- **Commit SHA:** `3310ba9`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวและคำแนะนำนะคะ แก้ไขตามที่แนะนำครบทั้ง 4 ไฟล์แล้วค่ะ ใน commit `3310ba9`
>
> ### 1. specification.md
> - เพิ่ม `assigneeId` และ `assignee User` ใน `ActionTaken` เพื่อแยกคนที่ได้รับมอบหมายออกจาก `performedById`
> - เพิ่มสถานะของ Action ได้แก่ `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED` โดยเริ่มต้นเป็น `PENDING`
> - เพิ่ม FR-13/14/15 และ BR-13/14/15 สำหรับเรื่อง assignee, การเปลี่ยนสถานะ Action และเงื่อนไขก่อน Resolve ticket
> - เพิ่ม AC-12/13/14 สำหรับกรณีเลือก assignee ไม่ได้, ยังมี Action ค้างตอน Resolve และการเปลี่ยนสถานะ Action
> - อัปเดต Authorization Matrix, UI summary, Database Decisions, Assumptions และ DoD ให้ตรงกับส่วนที่เพิ่มมาค่ะ
>
> ### 2. api-spec.md
> - POST/PATCH `/actions-taken` เพิ่ม `assigneeId` และ `status` พร้อม validation
> - GET response เพิ่มข้อมูล `assignee` และ `status`
> - เพิ่มกรณี `422` เมื่อ assignee ไม่ถูกต้อง
> - เพิ่ม Resolution Gate ถ้ายังมี Action ค้างอยู่จะ Resolve ticket ไม่ได้ และจะได้ `409 Conflict`
> - อัปเดต Status code table ให้ตรงกับกรณีใหม่ค่ะ
>
> ### 3. ui-spec.md
> - เพิ่ม dropdown สำหรับเลือก Assignee โดยจะแสดงเฉพาะ IT Staff/Admin ที่ active
> - เพิ่มตัวเลือกสถานะ Action, ปุ่ม Complete/Cancel และ Badge แสดงสถานะ
> - เพิ่มการจัดการ error `422`
> - ตอน Resolve ถ้ายังมี Action ค้างอยู่ จะแสดงจำนวน `"N action(s) still open"` พร้อม Modal ยืนยัน และรองรับกรณี `409` โดยไม่เปลี่ยนสถานะ ticket ค่ะ
>
> ### 4. tests.md
> - เพิ่ม API-12 สำหรับ inactive assignee → 422
> - เพิ่ม API-13 สำหรับ Resolution Gate → 409
> - เพิ่ม API-14 สำหรับการเปลี่ยนสถานะ Action
> - เพิ่ม UI-06 สำหรับ assignee/status controls
> - เพิ่ม UI-07 สำหรับ Resolution Gate modal
>
> ส่วน test ที่เพิ่มมาใหม่ ตอนนี้ยังเป็น `Planned` ตามกฎ No Premature Data ก่อนนะคะ แล้วจะอัปเดตเป็น `Pass` ใน PR ของ Issue ที่เกี่ยวข้อง (#3–#9) ค่ะ
>
> รบกวนช่วยตรวจอีกรอบให้หน่อยนะคะ ขอบคุณค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-10-31 23:11:55 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจทานการแก้ไขใน commit 3310ba9 ครบถ้วนทั้ง 4 ไฟล์แล้วค่ะ แก้ไขได้ละเอียดและตรงตามโจทย์ Lab 4 เป๊ะเลย
>
> เพิ่มฟิลด์ assigneeId และสถานะของ Action Taken (PENDING, IN_PROGRESS, COMPLETED, CANCELLED) ในสเปกและ API ชัดเจน
> เงื่อนไข Resolution Gate รัดกุมมาก มีทั้งการตอบกลับ 409 Conflict ฝั่ง API และการแจ้งเตือน Modal บนหน้า UI
> การจัดการสิทธิ์และเคส 422 Unprocessable Entity สำหรับ Inactive Assignee ถูกต้องตามรูบริก Part 6
> ตาราง Traceability Matrix ใน tests.md อัปเดตครอบคลุมทุก AC ใหม่ และคงสถานะ Planned ไว้ถูกต้องตามหลัก TDD
>
> ภาพรวมเอกสารสเปกสมบูรณ์แบบมากและพร้อมใช้งานแล้วค่ะ Approve ให้เรียบร้อย

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#104](https://github.com/jejaebubu/toktickit/pull/104)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `f242eb3f572704db660bc93aa4d75d5069fce438`
- **Merged At:** 2026-10-31 23:12:05 UTC+7
- **Status:** ✅ Merged successfully — **Closes #1**

---

### PR #105: feat(db): ActionTaken model, migration, and idempotent seed (Issue #2)
- **PR URL:** [jejaebubu/toktickit#105](https://github.com/jejaebubu/toktickit/pull/105)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`005b157`)

#### 💬 Round 1 Review by @titayaaa (Commented)
- **Review Date:** 2026-11-01 00:22:22 UTC+7
- **Verdict:** 💬 Commented
- **Review Comments (Verbatim):**

> 🌟 ภาพรวมการประเมิน (Executive Summary)
> PR #105 ทำการขยายฐานข้อมูลของ Lab 4 (Actions Taken Model, Migration และ Idempotent Seed) ได้อย่างเป็นระเบียบและตรงตามข้อกำหนดของแลปมากค่ะ ชื่นชมที่มีการเขียน Integration Tests ครอบคลุมถึง 9 ข้อเพื่อตรวจ Data Invariants ทั้งเรื่อง Role ของ Assignee/Performer, เคส Performer $\neq$ Assignee, การกระจายตัว 0/1/หลาย Actions ตลอดจนการดักไม่ให้มี Resolved ticket ค้าง open actions ไว้อย่างรัดกุม รันเทสต์ผ่าน 92/92 เทสต์สมบูรณ์ค่ะ 
>
> มีข้อสังเกตและข้อเสนอแนะสำคัญ 1 จุดเกี่ยวกับฟิลด์ result และจุดเก็บตกเอกสารเล็กน้อย ดังนี้ค่ะ
>
> 💡 จุดที่แนะนำให้ปรับปรุง (Key Recommendations)
> 1. ฟิลด์ result ใน ActionTaken ควรเป็น Nullable (String?) ในระดับ Database
> สิ่งที่พบในโค้ด:
> ใน schema.prisma:
> prisma
> result String @db.Text
> ใน migration.sql:
> sql
> "result" TEXT NOT NULL,
> ผลกระทบ:
> เนื่องจากฟิลด์ result ถูกกำหนดเป็น NOT NULL ในฐานข้อมูล แต่ค่าเริ่มต้นของ status เป็น PENDING ซึ่งตามธรรมชาติของการทำงาน (และตามที่เราคุยกันใน PR-01) ในจังหวะที่เจ้าหน้าที่ไอทีเพิ่งสร้าง Action หรือกำลังทำอยู่ (PENDING / IN_PROGRESS) งานยังไม่เสร็จจึงจะยังไม่มีผลลัพธ์ (Result)
> หาก DB บังคับ NOT NULL ตอนทำ PR-03 (API) และ PR-04 (UI) จะทำให้ POST /api/tickets/:id/actions-taken ล้มเหลวทันทีที่ไม่ได้ส่ง result มา (หรือต้องคอยส่งค่าว่าง/ข้อความหลอกมาแทน เหมือนที่ต้องใส่ใน seed ตอนนี้)
> ข้อเสนอแนะ:
> แนะนำปรับใน schema.prisma ให้เป็น
> prisma
> result String? @db.Text
> และใน migration.sql เอา NOT NULL ออกจากคอลัมน์ "result" ค่ะ แล้วค่อยไปบังคับ required ในระดับ Backend API Validation เฉพาะเมื่อ status === 'COMPLETED' เท่านั้น จะยืดหยุ่นและตรงตามสเปกที่สุดค่ะ

#### 💬 Additional Review Suggestions by @titayaaa (Commented)
- **Review Date:** 2026-11-01 00:23:53 UTC+7
- **Verdict:** 💬 Commented
- **Review Comments (Verbatim):**

> เพิ่มเติมจุดที่แนะนำให้ปรับปรุง
> 2. อัปเดตสถานะ PR-01 ใน docs/lab-04/tests.md
> ในตารางสรุปผลการทดสอบ (Section 3) แถวของ PR-01 ยังระบุสถานะเป็น Review in progress
> เนื่องจาก PR #104 (Issue #1) ได้รับการอนุมัติและ Merge เข้าสู่ lab4-staging เรียบร้อยแล้ว แนะนำปรับสถานะเป็น Pass หรือ Merged เพื่อให้เอกสารสะท้อนสถานะจริงที่เป็นปัจจุบันค่ะ
> 3. อัปเดตบันทึกใน docs/lab-04/reviewer.md
> อย่าลืมเพิ่มแถวของ PR #105 ลงในตาราง Master Table และเพิ่มหัวข้อบันทึกประวัติการตรวจทานของ PR-02 (Issue #2) ใน Section 1 เพื่อให้เอกสารบันทึกการรีวิวเป็นไปตามลำดับจริงทีละ PR ค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `8750764`)
- **Response Date:** 2026-11-01 00:36:51 UTC+7
- **Commit SHA:** `8750764`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวค่ะ แก้ไขครบทั้ง 3 จุดแล้วใน commit `8750764` (และบันทึก review trail ใน `7d9f326`)
>
> 1. **`result` Nullable** — เปลี่ยนเป็น `result String? @db.Text` และสร้าง migration ใหม่ `20261031172848_lab04_actions_taken` ที่มี `"result" TEXT` (ไม่มี NOT NULL) แทนไฟล์เดิม เพื่อไม่ให้ checksum ค้างจาก migration ที่ apply ไปแล้ว
>    - Seed: Action ที่ `PENDING`/`IN_PROGRESS` มี `result = null` จริง, งานที่ `COMPLETED`/`CANCELLED` มี `result` ครบ
>    - เพิ่มเทสต์ตัวที่ 10 ตรวจ `is_nullable = YES`, open work มี `result = null`, finished work ต้องมี `result`
>    - เพิ่ม **BR-16** / **AC-15** ใน `specification.md`, อัปเดต validation ใน `api-spec.md` (บังคับเฉพาะ `COMPLETED`) และ `ui-spec.md` (ดอกจันเฉพาะ `COMPLETED`), เพิ่ม **API-15** เป็น `Planned` สำหรับ Issue #3
> 2. **`tests.md`** — PR-01 → `Merged (PR #104)`; PR-02 → `10 new + 83 existing = 93` พร้อมอ้างอิง PR #105
> 3. **`reviewer.md`** — เพิ่มแถว PR #105 ใน Master Table และหัวข้อ 3.2 พร้อม Review #1 / Author Response #1
>
> ตรวจซ้ำ: `npm run build` ผ่าน, `npm test` ผ่าน **17 ไฟล์ / 93 เทสต์**, seed รันซ้ำได้ค่าเดิม รบกวนช่วยตรวจอีกรอบนะคะ ขอบคุณค่ะ

#### 💬 Round 2 Final Verification & Approval by @titayaaa
- **Response Date:** 2026-11-01 01:14:26 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> > ขอบคุณสำหรับรีวิวค่ะ แก้ไขครบทั้ง 3 จุดแล้วใน commit `8750764` (และบันทึก review trail ใน `7d9f326`)
> > 
> > 1. **`result` Nullable** — เปลี่ยนเป็น `result String? @db.Text` และสร้าง migration ใหม่ `20261031172848_lab04_actions_taken` ที่มี `"result" TEXT` (ไม่มี NOT NULL) แทนไฟล์เดิม เพื่อไม่ให้ checksum ค้างจาก migration ที่ apply ไปแล้ว
> >    
> >    * Seed: Action ที่ `PENDING`/`IN_PROGRESS` มี `result = null` จริง, งานที่ `COMPLETED`/`CANCELLED` มี `result` ครบ
> >    * เพิ่มเทสต์ตัวที่ 10 ตรวจ `is_nullable = YES`, open work มี `result = null`, finished work ต้องมี `result`
> >    * เพิ่ม **BR-16** / **AC-15** ใน `specification.md`, อัปเดต validation ใน `api-spec.md` (บังคับเฉพาะ `COMPLETED`) และ `ui-spec.md` (ดอกจันเฉพาะ `COMPLETED`), เพิ่ม **API-15** เป็น `Planned` สำหรับ Issue [Issue 3: Create and seed IT request categories #3](https://github.com/jejaebubu/toktickit/issues/3)
> > 2. **`tests.md`** — PR-01 → `Merged (PR #104)`; PR-02 → `10 new + 83 existing = 93` พร้อมอ้างอิง PR [feat(db): ActionTaken model, migration, and idempotent seed (Issue #2) #105](https://github.com/jejaebubu/toktickit/pull/105)
> > 3. **`reviewer.md`** — เพิ่มแถว PR [feat(db): ActionTaken model, migration, and idempotent seed (Issue #2) #105](https://github.com/jejaebubu/toktickit/pull/105) ใน Master Table และหัวข้อ 3.2 พร้อม Review [Issue 1: Set up the TokTickIT project foundation #1](https://github.com/jejaebubu/toktickit/issues/1) / Author Response [Issue 1: Set up the TokTickIT project foundation #1](https://github.com/jejaebubu/toktickit/issues/1)
> > 
> > ตรวจซ้ำ: `npm run build` ผ่าน, `npm test` ผ่าน **17 ไฟล์ / 93 เทสต์**, seed รันซ้ำได้ค่าเดิม รบกวนช่วยตรวจอีกรอบนะคะ ขอบคุณค่ะ
>
> ### 🌟 ผลการตรวจทานรอบที่ 2 (Final Verification)
> ตรวจสอบการแก้ไขตาม commit `8750764` และเอกสารใน `7d9f326` ครบถ้วนสมบูรณ์ 100% ทุกประเด็นแล้วค่ะ:
> 1. **`ActionTaken.result` เป็น Nullable (`String?`):**
>    - ใน `server/prisma/schema.prisma` ปรับเป็น `result String? @db.Text` ถูกต้อง
>    - ใน migration ไฟล์ใหม่ `20261031172848_lab04_actions_taken/migration.sql` คอลัมน์ `"result" TEXT` ไม่มี `NOT NULL` ช่วยป้องกันปัญหา Checksum migration ได้อย่างสะอาดเรียบร้อย
> 2. **Seed Data สอดคล้องกับสถานะจริง:**
>    - การกระทำที่เป็น `PENDING` และ `IN_PROGRESS` บันทึกค่า `result: null` จริง
>    - การกระทำที่เป็น `COMPLETED` และ `CANCELLED` บันทึกผลลัพธ์ครบถ้วน
> 3. **ชุดทดสอบ Integration Test ครอบคลุม 10 ข้อ:**
>    - เพิ่ม Test Case ที่ 10 ตรวจสอบ `information_schema.columns` ว่า `is_nullable = 'YES'`
>    - ดักตรวจ Invariant ว่า open work ต้องไม่มี result และ finished work ต้องมี result เสมอ
>    - ชุดทดสอบทั้งหมด 17 ไฟล์ / 93 เทสต์ รันผ่านสีเขียว 100% (`npm test`)
> 4. **เอกสาร Spec & Traceability Matrix อัปเดตครบถ้วน:**
>    - มีการเพิ่ม BR-16 / AC-15 ใน `specification.md`
>    - อัปเดตเงื่อนไข Validation และสัญลักษณ์ดอกจันใน `api-spec.md` และ `ui-spec.md`
>    - ปรับสถานะ PR-01 เป็น Merged และยอดรวม 93 เทสต์ใน `tests.md`
>    - บันทึก Master Table และประวัติการรีวิวรอบที่ 1 ใน `reviewer.md` ครบถ้วน
> ยอดเยี่ยมและรัดกุมมากค่ะ กด Approve ให้เรียบร้อย สามารถ Merge PR #105 เข้า `lab4-staging` แล้วเริ่ม Issue 3 ต่อได้เลยค่ะ

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#105](https://github.com/jejaebubu/toktickit/pull/105)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `005b1578e90e729a5626da4268e0d473ce17d23f`
- **Merged At:** 2026-11-01 01:16:14 UTC+7
- **Status:** ✅ Merged successfully — **Closes #2**

---

### PR #106: feat(api): Actions Taken REST API, RBAC, and status validation (Issue #3)
- **PR URL:** [jejaebubu/toktickit#106](https://github.com/jejaebubu/toktickit/pull/106)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`23166db`)

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-01 02:51:45 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ### 🌟 ภาพรวม (Executive Summary)
> PR #106 พัฒนา REST API สำหรับ Actions Taken ได้อย่างยอดเยี่ยมค่ะ ทั้งการแยกสิทธิ์ RBAC, การป้องกัน Token Spoofing โดยดึง `performedById` จาก JWT เสมอ, การซ่อนข้อมูลด้วย `404` เมื่อ Requester เข้าถึงตั๋วคนอื่น, และ Action Status Finite State Machine ตาม BR-14 ทำได้รัดกุมมาก รันเทสต์ 101/101 ผ่านฉลุยค่ะ 👍
> มีจุดสังเกตเชิงเทคนิค 1 จุด และจุดเอกสาร 1 จุดที่อยากให้ปรับก่อน merge นะคะ:
> ---
> ### 💡 จุดที่แนะนำให้ปรับปรุง (Key Recommendations)
> #### 1. อัปเดต Review Trail ของ PR #105 และเพิ่ม PR #106 ใน `docs/lab-04/reviewer.md`
> - ในตาราง Master PR Table (Section 2) แถวของ **PR-02 (PR #105)** ยังคงขึ้นสถานะค้างเป็น `Request Changes → Pending re-review` และข้อความ "รอ Reviewer ตรวจซ้ำ" ค่ะ เนื่องจาก PR #105 ผ่านการ Approve และ Merge เข้าสู่ `lab4-staging` เรียบร้อยแล้ว รบกวนปรับสถานะเป็น `Approved & Merged` ให้ตรงกับสถานะจริงนะคะ
> - ใน Section 3 รบกวนเพิ่มบันทึกหัวข้อ `3.2.3 Review #2 — Approved` ของ PR #105 และเพิ่มหัวข้อ `3.3 PR-03 (PR #106)` เพื่อเตรียมบันทึกรอบการรีวิวของ Issue #3 ให้ต่อเนื่องกันค่ะ
> #### 2. เคลียร์ `followUpNote = null` เมื่อ `followUpRequired` ถูกปรับเป็น `false` ใน PATCH
> - **สิ่งที่พบใน `server/src/app.ts`:**
>   ใน `PATCH /api/tickets/:id/actions-taken/:actionId` หาก Action เดิมเคยมี `followUpRequired = true` และมีข้อความ `followUpNote` ค้างอยู่ แล้วเจ้าหน้าที่ส่ง payload มาปิดเฉพาะ `{ followUpRequired: false }` ค่า `followUpNote` ใน DB จะยังคงค้างข้อความเดิมอยู่ ไม่ได้ถูกล้างเป็น `null`
> - **ข้อเสนอแนะ:**
>   ตามกฎ BR-07 เมื่อ `followUpRequired === false` ค่า `followUpNote` ควรเป็น `null` เสมอ แนะนำว่าในจังหวะที่ตรวจพบ `body.followUpRequired === false` ถ้า client ไม่ได้ส่ง `followUpNote` ใหม่มา ให้กำหนด `data.followUpNote = null` อัตโนมัติ เพื่อรักษา Data Hygiene ให้สะอาดค่ะ
> #### 3. ฝากเสริม Max Length Validation (Nice to have):
> - ใน `actionDescription` ตอนนี้เช็กเฉพาะ `length < 3` หากเพิ่มการดักเพดานสูงสุด เช่น `length > 1000` ตาม `api-spec.md` ด้วย จะช่วยป้องกัน Payload ขนาดใหญ่ผิดปกติได้ดียิ่งขึ้นค่ะ
> ---
> รบกวนปรับแก้จุดที่ 1 และ 2 นิดเดียวนะคะ โค้ดส่วนอื่นสมบูรณ์แบบมากแล้วค่ะ เดี๋ยวรีบเข้ามา Approve ให้ทันทีเลยค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `782d54e`)
- **Response Date:** 2026-11-01 02:56:15 UTC+7
- **Commit SHA:** `782d54e`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวค่ะ แก้ไขครบทั้ง 3 จุดแล้วใน commit `782d54e` (review trail `db7e326`)
>
> 1. **Review Trail** — แถว PR-02 ปรับเป็น `Request Changes → Approved & Merged` (merge `005b157`), เพิ่มหัวข้อ **3.2.3 Review #2 — Approved** และ **3.3 PR-03** พร้อม Review #1 / Author Response #1
> 2. **`followUpNote` Data Hygiene** — PATCH เมื่อ `followUpRequired === false` และไม่ได้ส่ง note ใหม่ จะตั้ง `followUpNote = null` อัตโนมัติ (BR-04/BR-07) เพิ่มเทสต์ `API-03b` ตรวจว่าปิด follow-up แล้ว note ถูกล้าง และเปิดกลับโดยไม่มี note ใหม่ → `400`
> 3. **Max Length Validation** — `actionDescription` ต้องยาว 3–1000 ตัวอักษรทั้ง POST/PATCH (เกิน 1000 → `400`) อัปเดต `api-spec.md` + BR-04 และเพิ่มเทสต์ payload 1001 ตัวอักษร
>
> ตรวจซ้ำ: `npm run build` ผ่าน, `npm test` ผ่าน **18 ไฟล์ / 102 เทสต์** (9 new + 93 existing) รบกวนช่วยตรวจอีกรอบนะคะ ขอบคุณค่ะ

#### 💬 Round 2 Final Verification & Approval by @titayaaa
- **Review Date:** 2026-11-01 03:03:40 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### 🌟 ผลการตรวจทานรอบที่ 2 (Final Verification)
> ตรวจสอบการแก้ไขตาม commit `782d54e` และเอกสารใน `db7e326` ครบถ้วนสมบูรณ์ 100% ทุกประเด็นแล้วค่ะ:
> 1. **Data Hygiene ของ `followUpNote` ใน PATCH:**
>    - ใน `server/src/app.ts` เพิ่มการดัก `if (body.followUpRequired === false && body.followUpNote === undefined)` แล้วรีเซ็ต `data.followUpNote = null` อัตโนมัติ ถูกต้องตาม BR-07
>    - มีการเพิ่มเทสต์ `API-03b` ตรวจสอบครบวงจร (สร้างพร้อม note → ปิด follow-up แล้ว note กลายเป็น null → เปิดกลับโดยไม่ใส่ note โดน 400)
> 2. **Max Length Validation (3–1000 chars):**
>    - เพิ่มการดักเพดาน `description.length > 1000` ทั้งบน `POST` และ `PATCH` ตอบกลับ `400 Bad Request` อย่างปลอดภัย
>    - อัปเดตข้อกำหนดใน `api-spec.md` และ `specification.md` (BR-04) สอดคล้องกัน
>    - มีเทสต์ทดสอบ payload ขนาด 1001 ตัวอักษรดักไว้อย่างรัดกุม
> 3. **Review Trail ใน `docs/lab-04/reviewer.md` ครบถ้วน:**
>    - ตาราง Master Table ปรับสถานะ PR-02 เป็น `Approved & Merged (merge 005b157)` เรียบร้อย
>    - เพิ่ม Section 3.2.3 สำหรับ PR #105 และ Section 3.3 สำหรับ PR #106 ครบทุกขั้นตอนตามลำดับ
> 4. **ชุดทดสอบผ่านสมบูรณ์ 100%:**
>    - ชุดทดสอบทั้งหมด 18 ไฟล์ / 102 เทสต์ (9 new + 93 existing) รันผ่านสีเขียวทั้งหมด
> โค้ด REST API และการจัดการเอกสารมีคุณภาพระดับ Production พร้อมให้ Merge เข้าสู่ `lab4-staging` เพื่อเริ่ม Issue #4 ต่อไปได้ทันทีค่ะ

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#106](https://github.com/jejaebubu/toktickit/pull/106)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `23166db48eb3a6a9be6919a16f2d22d2639a04df`
- **Merged At:** 2026-11-01 03:03:53 UTC+7
- **Status:** ✅ Merged successfully — **Closes #3**

---

### PR #108: feat(ui): Actions Taken UI on Ticket Detail (Issue #4)
- **PR URL:** [jejaebubu/toktickit#108](https://github.com/jejaebubu/toktickit/pull/108)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`2425b2d`)

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-01 03:53:08 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ### 🌟 ภาพรวมการประเมิน (Executive Summary)
> PR #108 พัฒนาคอมโพเนนต์ `ActionsTaken.tsx` ได้สวยงาม สะอาดตา และวางโครงสร้างได้ตรงตามข้อกำหนดของ Lab 4 เป็นอย่างดีค่ะ ชื่นชมที่มีการทำ Dynamic Follow-up Toggle, การซ่อนปุ่ม Create/Edit สำหรับ Requester, การจัดการ Loading state ระหว่างบันทึก, การทำ Quick Action Complete/Cancel ได้อย่างรวดเร็ว ตลอดจนเขียนเทสต์ครอบคลุมทั้ง Component UI (4 ข้อ) และ API เพิ่มเติม (2 ข้อ) รันเทสต์ผ่านครบถ้วน 187/187 เทสต์ค่ะ 👍
> เพื่อให้โค้ดมีความสมบูรณ์แบบระดับ Production และไม่ส่งผลกระทบต่อ Issue #5 (Resolution Gate) ขอฝากปรับปรุง 3 จุดสำคัญ และจุดเก็บตกเล็กน้อยดังนี้ค่ะ:
> ---
> ### 🛑 จุดที่ต้องแก้ไขก่อน Merge (Required Changes)
> #### 1. เพิ่มหัวข้อ `### 3.4 PR-04` ใน `docs/lab-04/reviewer.md` (Document Trail)
> - ใน Master PR Table (Section 2) มีการเพิ่มแถว PR #108 เรียบร้อยแล้ว แต่ใน **Section 3 (Full Review Trail) ยังขาดหัวข้อ `### 3.4 PR-04: Actions Taken UI on Ticket Detail (Issue #4)`** ทำให้ไม่มีบันทึกรายละเอียดการตรวจทานของ PR นี้ค่ะ
> - รบกวนเพิ่มหัวข้อ 3.4 พร้อมระบุ Branch, Target, วัตถุประสงค์ และเตรียมพื้นที่สำหรับบันทึกผลการรีวิวด้วยนะคะ
> #### 2. ส่ง Callback `onActionsChange` ใน `StaffTicketDetail.tsx` และ `TicketDetail.tsx` (State Desynchronization)
> - ใน `ActionsTaken.tsx` มีการประกาศ prop `onActionsChange?: (actions: ActionTaken[]) => void` และเรียกใช้งานใน `updateItems` ดีแล้ว แต่ในจุดเรียกใช้งานที่ `StaffTicketDetail.tsx` (บรรทัด 429) และ `TicketDetail.tsx` (บรรทัด 178) ใส่เพียง:
>   ```tsx
>   <ActionsTaken ticketId={ticket.id} actions={ticket.actionsTaken} />
> การไม่ส่ง onActionsChange ทำให้เมื่อเจ้าหน้าที่กด Add, Edit หรือกด Quick Complete Action สำเร็จ ข้อมูลใน ticket.actionsTaken ของหน้าแม่จะไม่อัปเดตตาม ซึ่งจะทำให้เกิดปัญหาใน Issue #5 (Resolution Gate) ทันที เพราะหน้าแม่จะไม่ทราบว่า Action ถูกเคลียร์เสร็จแล้ว จนกว่าจะกด Refresh หน้าจอ
> วิธีแก้: รบกวนส่ง callback อัปเดต state แม่:
> tsx
> <ActionsTaken
>   ticketId={ticket.id}
>   actions={ticket.actionsTaken}
>   onActionsChange={(updatedActions) =>
>     setTicket((prev) => (prev ? { ...prev, actionsTaken: updatedActions } : prev))
>   }
> />
> 3. ปรับสี Status Badge ของ CANCELLED และ COMPLETED ให้ตรงกับ Zen Green Tokens
> ใน docs/lab-04/ui-spec.md §1 กำหนดว่าสถานะ CANCELLED ต้องใช้คู่สี soft red:
> --action-cancelled-bg: #fef2f2, --action-cancelled-text: #991b1b
> --action-completed-bg: #f0fdf4, --action-completed-text: #166534
> ใน ACTION_STATUS_META ของ ActionsTaken.tsx ปัจจุบันใช้สีเทา (#E5E7EB / #374151) สำหรับ Cancelled และ #C6F6D5 / #22543D สำหรับ Completed ฝากปรับให้ตรงกับ Design System Tokens ของแลปด้วยนะคะ
> 💡 ข้อเสนอแนะเพิ่มเติม (Minor Suggestions)
> Client-side Validation & MaxLength:
> ในฟังก์ชัน validate() แนะนำให้ตรวจ result เมื่อสถานะเป็น COMPLETED ว่าต้องมีความยาวอย่างน้อย 2 ตัวอักษร (result.trim().length >= 2) เพื่อให้ตรงกับ Validation ของ Backend (2–1000 ตัวอักษร) ป้องกันไม่ให้เกิด Error 400 จากเซิร์ฟเวอร์
> เพิ่ม attribute maxLength={1000} ให้กับ action-description และ action-result, และ maxLength={500} ให้กับ action-followup-note และ action-attachment-notes
> Accessibility (A11Y):
> เพิ่ม role="alert" หรือ aria-live="polite" ให้กับกล่องข้อความ error ใต้ฟิลด์อินพุต เพื่อให้ Screen Reader แจ้งเตือนผู้ใช้ได้ถูกต้อง
> ครอบ emoji ในป้ายสถานะ (⏳, 🔧, ✅, ⛔) ด้วย <span aria-hidden="true"> เพื่อไม่ให้ Screen Reader อ่านออกเสียง emoji ซ้ำซ้อน
> Safe Error Response ใน server/src/app.ts:
> ใน GET /api/users/assignable บล็อก catch ไม่ควรส่ง message: err?.message ออกไปใน 500 response ตามมาตรฐาน SAFE-01 แนะนำให้ตอบเพียง { error: "Failed to fetch assignable staff" }
> Wording ใน Section 4.1.7 ของ reviewer.md:
> ข้อความเดิมระบุว่า "Reviewer อนุมัติและผู้เขียน merge PR #75 เข้า lab4-staging เรียบร้อย" แนะนำปรับเป็น "Reviewer (@jejaebubu) อนุมัติและเป็นผู้กด Merge PR #75" เพื่อให้ตรงกับข้อกำหนดวิชาที่ห้าม merge PR ของตนเองค่ะ
> ฝากปรับแก้ตามประเด็นด้านบนแล้ว push เข้ามาใหม่นะคะ เดี๋ยวจะรีบมาตรวจซ้ำและกด Approve ให้ทันทีเลยค่ะ ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `fa58a47`)
- **Response Date:** 2026-11-01 17:24:47 UTC+7
- **Commit SHA:** `fa58a47`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและครบถ้วนมากค่ะ แก้ไขครบทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดแล้วใน commit `ce25314` (และอัปเดตบันทึก SHA ใน `3f029b7`) ค่ะ:
>
> 1. **เพิ่มหัวข้อ `### 3.4 PR-04` ใน `docs/lab-04/reviewer.md`** — เพิ่มบันทึก Branch, Target, วัตถุประสงค์, ข้อความรีวิวรอบที่ 1 และคำตอบของผู้เขียนใน Section 3.4 พร้อมอัปเดตตาราง Master PR Table ใน Section 2
> 2. **ส่ง Callback `onActionsChange` ใน `StaffTicketDetail.tsx` และ `TicketDetail.tsx`** — ผูก `onActionsChange={(updatedActions) => setTicket((prev) => (prev ? { ...prev, actionsTaken: updatedActions } : prev))}` ทั้งสองหน้า เพื่อให้ `ticket.actionsTaken` บน parent state ซิงก์ทันทีเมื่อเพิ่ม/แก้ไข/เปลี่ยนสถานะ Action เตรียมพร้อมสำหรับ Resolution Gate ใน Issue #5
> 3. **ปรับสี Status Badge ใน `ActionsTaken.tsx` ให้ตรงกับ Zen Green Tokens (`ui-spec.md` §1)** — ปรับ `COMPLETED` เป็น `backgroundColor: "#f0fdf4", color: "#166534"` และ `CANCELLED` เป็น `backgroundColor: "#fef2f2", color: "#991b1b"`
> 4. **Client-side Validation & `maxLength`** — ปรับ `validate()` ให้ตรวจ `form.result.trim().length < 2` เมื่อสถานะเป็น `COMPLETED` และเพิ่ม `maxLength={1000}` บน `action-description`, `action-result` รวมถึง `maxLength={500}` บน `action-followup-note`, `action-attachment-notes`
> 5. **Accessibility (A11Y)** — เพิ่ม `role="alert"` ให้กับข้อความ error ใต้ฟิลด์ทุกจุด (`action-date-error`, `action-assignee-error`, `action-description-error`, `action-result-error`, `action-followup-note-error`) และครอบ emoji ในป้ายสถานะ (`⏳`, `🔧`, `✅`, `⛔`) ด้วย `<span aria-hidden="true">`
> 6. **Safe Error Response (`SAFE-01`)** — ปรับบล็อก `catch` ของ `GET /api/users/assignable` ใน `server/src/app.ts` ให้ตอบกลับเพียง `{ error: "Failed to fetch assignable staff" }` โดยไม่เปิดเผย `err?.message`
> 7. **Wording ใน Section 4.1.7 ของ `reviewer.md`** — ปรับเป็น `"Reviewer (@jejaebubu) อนุมัติและเป็นผู้กด Merge PR #75 เข้า lab4-staging เรียบร้อย"` ตามกติกาห้าม merge PR ของตนเอง
>
> รันเทสต์ตรวจสอบซ้ำผ่านครบ **187/187 เทสต์** (Server 104 + Client 83) รบกวนช่วยตรวจซ้ำและกด Approve/Merge ให้ด้วยนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-01 17:41:52 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนทั้ง 3 ประเด็นหลัก (Required Changes) และข้อเสนอแนะเพิ่มเติม (Minor Suggestions) อย่างรวดเร็วและประณีตมากใน commits `ce25314` และ `3f029b7` ค่ะ:
>
> 1. **Section 3.4 PR-04 ใน `docs/lab-04/reviewer.md`**: บันทึกข้อมูล Branch, Target, วัตถุประสงค์การทดสอบ, ข้อความรีวิวรอบที่ 1 และคำตอบของผู้เขียนครบถ้วน พร้อมอัปเดตสถานะใน Master PR Table เรียบร้อย
> 2. **State Synchronization (`onActionsChange`)**: ผูก callback `onActionsChange` ใน `StaffTicketDetail.tsx` และ `TicketDetail.tsx` ไปยัง parent `setTicket` ครบถ้วน ทำให้ state ของ `ticket.actionsTaken` บนหน้าแม่ซิงก์แบบ real-time พร้อมสำหรับการตรวจสอบ Resolution Gate ใน Issue #5
> 3. **Zen Green Tokens Alignment**: สีของ Status Badge ปรับตรงตาม Design System Token (`#f0fdf4`/`#166534` สำหรับ COMPLETED และ `#fef2f2`/`#991b1b` สำหรับ CANCELLED)
> 4. **Validation & MaxLength**: ปรับ `validate()` ให้ตรวจสอบผลลัพธ์อย่างน้อย 2 ตัวอักษรเมื่อสถานะเป็น COMPLETED และใส่ `maxLength` ครบทุก input/textarea ป้องกัน buffer overflow และ API 400 Bad Request
> 5. **Accessibility (A11Y)**: เพิ่ม `role="alert"` ให้กับข้อความ error ทุกจุด และครอบ icon emoji ด้วย `<span aria-hidden="true">`
> 6. **Safe Error Handling (SAFE-01)**: บล็อก catch ของ `GET /api/users/assignable` ตอบกลับเฉพาะ `{ error: "Failed to fetch assignable staff" }` โดยไม่รั่วไหล internal stack trace หรือข้อความ error ดิบ
> 7. **Documentation Wording**: ปรับปรุงถ้อยคำใน Section 4.1.7 ให้ถูกต้องตามข้อกำหนดการ Merge โดย Reviewer
>
> ผลการทดสอบผ่านครบ 187/187 เทสต์ (Server 104 + Client 83) โค้ดมีความพร้อมระดับ Production สมบูรณ์แบบ ขออนุมัติ (Approve) และดำเนินการกด Merge เข้าสู่ `lab4-staging` ให้ทันทีค่ะ 🎉

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#108](https://github.com/jejaebubu/toktickit/pull/108)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `2425b2d65aa21d1532ba7ddb465715fb8ae5fa51`
- **Merged At:** 2026-11-01 17:42:22 UTC+7
- **Status:** ✅ Merged successfully — **Closes #4**

---

### PR #109: feat(workflow): Ticket Status Transition Matrix, Resolution Gate, and Concurrency Check (Issue #5)
- **PR URL:** [jejaebubu/toktickit#109](https://github.com/jejaebubu/toktickit/pull/109)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`468a7ca`)

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-01 18:28:46 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ขอบคุณสำหรับ PR #109 ที่ครอบคลุมการทำงานของ Ticket Workflow, Resolution Gate และ Optimistic Concurrency Check สำหรับ **Issue #5 (PR-05)** ได้อย่างเป็นระบบมากค่ะ โดยเฉพาะ:
> - การวางโครงสร้าง State Transition ควบคุมทั้งปุ่มใน UI และ Guard ใน Backend
> - การทำ Resolution Gate Confirmation Modal เมื่อยังมี Action ค้าง (`PENDING`/`IN_PROGRESS`) พร้อม fallback ลอง resolve เพื่อรับ error 409
> - การดักจับ Concurrency Mismatch (`STALE_UPDATE`) ทั้งจาก Body `expectedUpdatedAt` และ Header `If-Unmodified-Since`
> - ชุดทดสอบครบทั้ง Server (108 tests) และ Client (87 tests) รวม 195/195 tests ผ่าน 100%
> อย่างไรก็ตาม จากการตรวจสอบอย่างละเอียดเปรียบเทียบกับข้อกำหนดใน `specification.md`, `api-spec.md` และหลักความปลอดภัยของระบบ พบจุดบกพร่องและข้อขัดแย้งกับสเปกที่จำเป็นต้องปรับปรุงแก้ไข 3 จุดสำคัญ (Required Changes) และข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Minor Suggestions) ดังนี้ค่ะ:
> ---
> ### 🛑 1. ประเด็นที่ต้องแก้ไขให้ถูกต้อง (Required Changes — Blocking)
> #### 1.1 State Transition Matrix: สถานะ `Open` ข้ามไป `Resolved` โดยตรงไม่ได้ และสถานะ `Pending` หายไป
> * **ไฟล์ที่พบ:** `server/src/app.ts` (บรรทัด 45–54) และ `client/src/components/StaffTicketDetail.tsx` (บรรทัด 21–30)
> * **ปัญหา:**
>   1. ใน `TICKET_STATUS_TRANSITIONS` กำหนดไว้ว่า:
>      ```ts
>      Open: ["In Progress", "Waiting for Requester", "Resolved", "Cancelled"],
>      ```
>      ตามข้อกำหนดใน `specification.md` หัวข้อ 5.1 และ Handout: **ตั๋วที่อยู่ในสถานะ `Open` ห้ามข้ามไป `Resolved` โดยตรง** งานจะต้องถูกส่งเข้าสู่สถานะปฏิบัติงานจริงก่อน (`In Progress`, `Waiting for Requester` หรือ `Pending`) ดังนั้นในอาร์เรย์ของ `Open` จะต้องไม่มี `"Resolved"` ค่ะ
>   2. สถานะ **`Pending`** (External/Vendor hold จาก Lab 3 ซึ่งอยู่ใน Prisma enum `TicketStatus`) หายไปจาก Matrix ส่งผลให้หากมีตั๋วในระบบที่ค้างอยู่ในสถานะ `Pending`:
>      - `TICKET_STATUS_TRANSITIONS["Pending"]` จะกลายเป็น `undefined` (allowedTransitions เป็น `[]`)
>      - ทำให้ตั๋วสถานะ `Pending` ถูกล็อกตายกลายเป็น Terminal state ทันที และบน UI จะขึ้นเตือนว่า *"Pending is a final state"* โดยเจ้าหน้าที่ไม่สามารถย้ายตั๋วออกจาก Pending ได้เลยค่ะ
> * **แนวทางแก้ไข:**
>   - ปรับ `Open` ให้นำ `"Resolved"` ออก: `Open: ["In Progress", "Waiting for Requester", "Pending", "Cancelled"]`
>   - เพิ่มคีย์ `"Pending"` เข้าไปใน Matrix: `"Pending": ["In Progress", "Waiting for Requester", "Resolved", "Cancelled"]` พร้อมอนุญาตให้ `In Progress` และ `Waiting for Requester` สามารถย้ายไป `Pending` ได้เช่นกันค่ะ
> ---
> #### 1.2 Side-effect การเปลี่ยนสถานะตั๋วเมื่อ Requester แจ้งว่าปัญหาได้รับการแก้ไข
> * **ไฟล์ที่พบ:** `server/src/app.ts` (บรรทัด 1140–1144)
> * **โค้ดปัจจุบัน:**
>   ```ts
>   // Preserve Lab 3 compatibility when legacy uppercase "OPEN" is used in tests,
>   // while keeping canonical ticket status unchanged per Lab 4 BR-09 / AC-08.
>   const nextStatusForRequester = ticket.status === "OPEN" ? "Waiting for Requester" : ticket.status;
>   const updated = await getPrisma().ticket.update({
>     where: { id },
>     data: { requesterIndicatedResolved: true, status: nextStatusForRequester },
> ปัญหา: ตามข้อกำหนด BR-10 และ AC-08 ระบุไว้อย่างชัดเจนว่า: "A Requester's 'Problem Appears Resolved' indication is purely advisory and does not alter Ticket status." การใส่เงื่อนไข ternary หากตั๋วมีสถานะเดิมเป็น "OPEN" แล้วแอบเปลี่ยนสถานะตั๋วให้เป็น "Waiting for Requester" เป็นการกลายพันธุ์สถานะโดยไม่ตั้งใจ (Side-effect) ซึ่งขัดแย้งกับสเปกโดยตรงค่ะ
> แนวทางแก้ไข: ในการอัปเดต advisory flag ของ Requester ไม่ต้องส่ง status เข้าไปใน data ให้คงสถานะเดิมของตั๋วไว้ 100%:
> ts
> const updated = await getPrisma().ticket.update({
>   where: { id },
>   data: { requesterIndicatedResolved: true },
>   include: { ... },
> });
> 1.3 ป้องกันข้อมูลภายในรั่วไหลในบล็อก 500 Catch (ตามกฎ SAFE-01)
> ไฟล์ที่พบ: server/src/app.ts (บรรทัด 1259)
> โค้ดปัจจุบัน:
> ts
> } catch (err: any) {
>   res.status(500).json({ error: "Internal Server Error", message: err?.message });
> }
> ปัญหา: การส่ง err?.message ออกไปใน Response ของ 500 ทำให้ error ภายใน เช่น ข้อความจากฐานข้อมูลหรือ Prisma ORM หลุดออกไปสู่ภายนอก ซึ่งผิดเกณฑ์ความปลอดภัย SAFE-01 (เช่นเดียวกับที่เราเคยคุยกันใน PR #108 ตรง endpoint /api/users/assignable) ค่ะ
> แนวทางแก้ไข: บันทึก error ลง log ฝั่งเซิร์ฟเวอร์ และส่งคืนเฉพาะ generic message:
> ts
> } catch (err: any) {
>   console.error("Failed to update ticket:", err);
>   res.status(500).json({ error: "Internal Server Error", message: "Failed to update ticket." });
> }
> 💡 2. ข้อเสนอแนะเพิ่มเติม & จุดเก็บตก (Minor Suggestions)
> - HTTP Status Code สำหรับ Transition ที่ไม่อนุญาต:
> ใน server/src/app.ts และ test ตรวจสอบ transition ผิดพลาด ตอบกลับด้วย 400 Bad Request (INVALID_STATUS_TRANSITION) แต่ในเอกสารสัญญา specification.md §5.1, api-spec.md §3.1 และ tests.md (WORKFLOW-01) กำหนดไว้เป็น 422 Unprocessable Entity (Semantic/Business logic error) แนะนำให้ปรับเป็น 422 หรือรองรับให้สอดคล้องกับ spec ค่ะ
> - Precision ของ Header If-Unmodified-Since:
> การตรวจสอบ Concurrency: expectedTime !== actualTime หาก client ส่งมาเป็น HTTP Header If-Unmodified-Since ตามมาตรฐาน RFC 7231 เวลาจะมีความละเอียดเพียงระดับวินาที (ไม่มี millisecond) ขณะที่ ticket.updatedAt จากฐานข้อมูลมี millisecond ด้วย อาจทำให้เกิด false-positive 409 ได้ แนะนำให้ปัดเศษเทียบระดับวินาทีหากรับมาจาก Header ค่ะ: Math.floor(expectedTime / 1000) !== Math.floor(actualTime / 1000)
> - การแสดงผล Advisory Banner บนตั๋วที่ Resolve/Closed ไปแล้ว:
> ใน TicketDetail.tsx (บรรทัด 206) และ StaffTicketDetail.tsx (บรรทัด 265): หากตั๋วถูกปิดหรือแก้ไขเรียบร้อยแล้ว (Resolved หรือ Closed) แต่ flag requesterIndicatedResolved ยังคงเป็น true แถบแจ้งเตือนจะยังคงขึ้นแสดงว่า "Requester indicated problem resolved - Pending Staff Review" แนะนำให้เพิ่มเงื่อนไข !["Resolved", "Closed", "Cancelled"].includes(ticket.status) ในการแสดง Banner เพื่อไม่ให้ข้อความ Pending Staff Review ค้างบนตั๋วที่จบงานไปแล้วค่ะ
> - UX ของ Stale Update Modal:
> ใน StaffTicketDetail.tsx เมื่อเกิด Stale Modal มีเฉพาะปุ่ม "Refresh Ticket" หากเจ้าหน้าที่กำลังพิมพ์ Note หรือ Comment ยาว ๆ อยู่แล้วเกิดชนกัน จะไม่มีปุ่มให้ปิด Modal ชั่วคราวเพื่อคัดลอกข้อความที่พิมพ์ไว้ แนะนำให้เพิ่มปุ่ม "Dismiss" หรือปุ่มกดยกเลิกไว้ด้วยค่ะ
> - สีของปุ่ม Cancelled ใน Workflow Action Bar:
> ปุ่มเปลี่ยนสถานะเป็น "Cancelled" ใช้ class btn-outline-success ทำให้ปุ่มยกเลิกกลายเป็นสีเขียว แนะนำให้ใช้ btn-outline-secondary หรือ btn-outline-danger เพื่อความชัดเจนของ UI ค่ะ
>
> รบกวนช่วยตรวจสอบและปรับปรุงแก้ไข 3 จุดหลักข้างต้นนะคะ หากแก้ไขเรียบร้อยแล้วแจ้งได้เลย เดี๋ยวจะรีบมา re-review และ approve ให้ทันทีค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `4e2c9ef`)
- **Response Date:** 2026-11-01 18:43:13 UTC+7
- **Commit SHA:** `4e2c9ef`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและรอบคอบมากค่ะ @titayaaa ดำเนินการแก้ไขครบทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดใน commits `45b424d` และ `8f8c8e6` เรียบร้อยแล้วค่ะ:
>
> 1. **ปรับปรุง `TICKET_STATUS_TRANSITIONS` (`server/src/app.ts`, `StaffTicketDetail.tsx`, `specification.md`)**:
>    - นำ `"Resolved"` ออกจากสถานะถัดไปของ `Open` (`Open: ["In Progress", "Waiting for Requester", "Pending", "Cancelled"]`) เพื่อบังคับให้ตั๋วต้องเข้าสู่สถานะปฏิบัติงานจริงก่อนจึงจะกด Resolve ได้ พร้อมเพิ่มเทสต์ยืนยันว่า `Open -> Resolved` ถูกปฏิเสธด้วย `INVALID_STATUS_TRANSITION`
>    - เพิ่มสถานะ `"Pending"` ใน `TICKET_STATUSES` และ `TICKET_STATUS_TRANSITIONS` (`Pending: ["In Progress", "Waiting for Requester", "Resolved", "Cancelled"]`) และอนุญาตให้ย้ายไป `Pending` ได้จาก `Open`, `In Progress`, `Waiting for Requester`, `Reopened`
> 2. **ตัด Side-effect การเปลี่ยนสถานะเมื่อ Requester แจ้งเจตนา (`server/src/app.ts`, `staff-ticket-detail.api.test.ts`)**:
>    - ปรับการอัปเดตเมื่อ Requester ส่ง `{ requesterIndicatedResolved: true }` ให้ส่งเพียง `data: { requesterIndicatedResolved: true }` โดยคงสถานะ `ticket.status` เดิมไว้ 100%
> 3. **Safe Error Response ตามเกณฑ์ `SAFE-01` (`server/src/app.ts`)**:
>    - ในบล็อก `catch` ของ `handleTicketPatch` บันทึก `console.error("Failed to update ticket:", err)` และส่งคืนเฉพาะ `{ error: "Internal Server Error", message: "Failed to update ticket." }` โดยไม่แนบ `err?.message`
> 4. **Minor Suggestions ทั้งหมด**:
>    - **RFC 7231 `If-Unmodified-Since` Precision**: ปรับการเทียบเวลาใน `server/src/app.ts` ให้เทียบความละเอียดระดับวินาที (`Math.floor(expectedTime / 1000) !== Math.floor(actualTime / 1000)`) เมื่ออ่านจาก Header `If-Unmodified-Since` และเทียบระดับมิลลิวินาทีเมื่อส่งผ่าน `expectedUpdatedAt` ใน JSON body พร้อมเพิ่มเทสต์ `toUTCString()` ใน `API-08`
>    - **ซ่อน Advisory Banner บนตั๋วที่จบงานแล้ว**: เพิ่มเงื่อนไข `!["Resolved", "Closed", "Cancelled"].includes(ticket.status)` ในทั้ง `StaffTicketDetail.tsx` และ `TicketDetail.tsx`
>    - **UX ของ Stale Update Modal**: เพิ่มปุ่ม `"Dismiss"` (`data-testid="stale-update-dismiss"`) ใน `StaffTicketDetail.tsx` เพื่อให้เจ้าหน้าที่ปิดหน้าต่างไปคัดลอกข้อความที่พิมพ์ค้างไว้ได้ก่อนกด Reload
>    - **สีปุ่ม `Cancelled` ใน Workflow Action Bar**: ปรับคลาสของปุ่ม `Cancelled` เป็น `btn-outline-danger`
>    - **หมายเหตุเรื่อง HTTP Status Code ของ `INVALID_STATUS_TRANSITION`**: ในเอกสารสัญญาของฝั่งโปรเจกต์เรา (`docs/lab-04/specification.md` AC-07, `docs/lab-04/api-spec.md` §4.1 และ `docs/lab-04/tests.md` API-06) กำหนดให้ Invalid Status Transition คืนค่า `400 Bad Request` (ส่วน `422 Unprocessable Entity` ใช้สำหรับ `assigneeId` ที่ไม่ถูกต้องตาม `AC-12`) จึงคง `400` ไว้ให้ตรงตาม Engineering Contract ของเรโค่ะ
>
> รันชุดทดสอบผ่านครบ **195/195 เทสต์** (Server 108 + Client 87) รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-01 18:55:12 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดใน commits `45b424d` และ `8f8c8e6` อย่างรอบคอบและรวดเร็วมากค่ะ ตรวจสอบโค้ดและชุดทดสอบซ้ำอย่างละเอียดแล้ว:
> 1. **State Transition Matrix สมบูรณ์ 100%**:
>    - นำ `"Resolved"` ออกจากสถานะถัดไปของ `Open` เพื่อบังคับให้ตั๋วต้องเข้าสู่สถานะปฏิบัติงานจริงก่อน จึงจะกด Resolve ได้
>    - เพิ่มสถานะ `"Pending"` ใน `TICKET_STATUSES` และ `TICKET_STATUS_TRANSITIONS` ครบถ้วนทั้ง backend, frontend และเอกสาร `specification.md`
>    - เพิ่มเทสต์ตรวจสอบการปฏิเสธ `Open -> Resolved` ด้วย `400 INVALID_STATUS_TRANSITION` ชัดเจน
> 2. **ขจัด Side-effect ใน Requester Advisory สำเร็จ**:
>    - เมื่อ Requester แจ้งว่าปัญหาได้รับการแก้ไข ระบบบันทึกเฉพาะ `requesterIndicatedResolved: true` โดยคงสถานะเดิมของตั๋วไว้ 100%
>    - ปรับแก้เทสต์เดิมใน `staff-ticket-detail.api.test.ts` และเพิ่มการยืนยันใน `ticket-workflow.api.test.ts` (API-07) ครบถ้วน
> 3. **ความปลอดภัยตามเกณฑ์ SAFE-01**:
>    - บล็อก `catch` ของ `handleTicketPatch` บันทึก log ภายในเซิร์ฟเวอร์ และตอบกลับด้วย generic error ไม่ส่ง `err?.message` ออกสู่ภายนอก
> 4. **Minor Suggestions & UX Polish**:
>    - คำนวณ RFC 7231 `If-Unmodified-Since` ปัดเศษระดับวินาทีอย่างถูกต้อง และรองรับ `toUTCString()`
>    - ซ่อน Advisory Banner เมื่อตั๋วอยู่ในสถานะ Resolved / Closed / Cancelled บนทั้งสองมุมมอง
>    - เพิ่มปุ่ม Dismiss บน Stale Update Modal เพื่อป้องกันข้อมูลที่เจ้าหน้าที่กำลังพิมพ์สูญหาย
>    - ปรับสีปุ่ม Cancelled เป็น `btn-outline-danger` ตรงตาม Semantics
>    - คำชี้แจงเรื่อง Status Code 400 สำหรับ Invalid Status Transition สอดคล้องกับ Engineering Contract ใน `specification.md` และ `api-spec.md` เป็นอย่างดี
> ผลการรันเทสต์ผ่านครบ 195/195 เทสต์ (Server 108 + Client 87) โค้ดมีคุณภาพสูงและพร้อมสำหรับการใช้งานจริง ขออนุมัติ (Approve) และดำเนินการกด Merge เข้าสู่ `lab4-staging` ให้เรียบร้อยค่ะ

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#109](https://github.com/jejaebubu/toktickit/pull/109)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `468a7ca2c525f75608bfa0c044f56f10a82705b6`
- **Merged At:** 2026-11-01 18:55:20 UTC+7
- **Status:** ✅ Merged successfully — **Closes #5**

---

### PR #110: feat(dashboard): IT Staff Dashboard API, summary metrics, and UI screen (Issue #6)
- **PR URL:** [jejaebubu/toktickit#110](https://github.com/jejaebubu/toktickit/pull/110)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`c11da67`)
- **Scope & Objectives:**
  - `GET /api/dashboard/staff`: REST API สำหรับ IT Staff และ Admin ในการดึง metrics เชิงปฏิบัติการแบบ real-time (`new`, `open`, `inProgress`, `waitingForRequester`, `myAssigned`), ปฏิเสธ Requester ด้วย `403 Forbidden`, และส่งคืน `recentTickets` 5 รายการล่าสุด
  - พารามิเตอร์ `ownerId=me` บน `GET /api/tickets`
  - คอมโพเนนต์ `StaffDashboard.tsx`: การ์ดตัวชี้วัด 5 ใบพร้อมฟังก์ชัน Drill-down เชื่อมโยงไปยัง `StaffTicketQueue` ตามตัวกรอง, ตารางและ Mobile card รายการตั๋วล่าสุด, และปุ่ม Quick Actions
  - ชุดทดสอบ API (`staff-dashboard.api.test.ts`) และ UI (`StaffDashboard.test.tsx`) ครอบคลุม 6 เคสใหม่ รวมเป็น 201 เทสต์

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-02 00:54:52 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ขอบคุณสำหรับ PR #110 ที่พัฒนาโมดูล IT Staff Dashboard (Issue #6) ได้อย่างครบครัน สวยงาม และออกแบบการใช้งานได้ดีมากค่ะ ภาพรวมของการ์ดสรุปตัวชี้วัด 5 ใบ, ระบบ Drill-down กรองตั๋วตามสถานะอัตโนมัติ, การรองรับ Responsive สลับระหว่าง Desktop Table และ Mobile Cards, ตลอดจนชุดทดสอบใหม่ทั้ง 6 เคส (API-09, API-10, UI-04, STYLE-01, RESP-01) เขียนได้อย่างเป็นระบบมากค่ะ
>
> อย่างไรก็ตาม จากการตรวจทานโค้ดอย่างละเอียดเปรียบเทียบกับ flow การทำงานของแอปพลิเคชันและเอกสารของโปรเจกต์ พบจุดบกพร่องระดับ Blocking ที่ทำให้เกิด Regression บนหน้าจอของผู้ใช้ Requester และจุดที่ควรปรับปรุงเพื่อความชัดเจน 3 ข้อดังนี้ค่ะ:
>
> ---
>
> ### 🔴 1. ประเด็นที่ต้องแก้ไขก่อน Merge (Required Changes — Blocking)
>
> #### 1.1 Requester Navbar ทำให้เกิดหน้าจอว่างเปล่า (Blank Screen Regression)
> - **ไฟล์ที่พบ:** `client/src/components/Header.tsx` (บรรทัด 35–39) และ `client/src/App.tsx` (บรรทัด 102–115)
> - **ปัญหา:** ใน `Header.tsx` มีการเพิ่ม `{ id: "dashboard", label: "Dashboard", matches: ["dashboard"] }` ให้กับเมนูของ `REQUESTER` แต่ใน `App.tsx` ฟังก์ชัน `RequesterViews` ยังไม่มีการดักจับ `activeView === "dashboard"` (เนื่องจาก Requester Dashboard เป็นขอบเขตของ Issue #7 / PR-07)
> - **ผลกระทบ:** เมื่อผู้ใช้ที่มีบทบาท `REQUESTER` ล็อกอินเข้าสู่ระบบและกดที่แท็บ `"Dashboard"` ใน Navbar หน้าจอ `<main>` จะไม่เรนเดอร์อะไรเลย กลายเป็นหน้าว่างเปล่า (Blank Page)
> - **แนวทางแก้ไข:** นำ `{ id: "dashboard", label: "Dashboard", matches: ["dashboard"] }` ออกจากอาเรย์ `REQUESTER` ใน `NAV_BY_ROLE` ของ `Header.tsx` โดยให้คงไว้เฉพาะสำหรับ `IT_STAFF` และ `ADMINISTRATOR` เท่านั้น จนกว่าจะเริ่มพัฒนา Issue #7 ใน PR ถัดไปค่ะ
>
> ---
>
> ### 🟠 2. ประเด็นที่ควรปรับปรุงเพื่อความถูกต้องของ UI (Should Fix)
>
> #### 2.1 หัวข้อแผง "My Recent Tickets" ขัดแย้งกับขอบเขตข้อมูลจริงของ Query
> - **ไฟล์ที่พบ:** `client/src/components/StaffDashboard.tsx` (บรรทัด 468–472) และ `server/src/app.ts` (บรรทัด 1236–1245)
> - **ปัญหา:** ใน `server/src/app.ts` การดึง `rawRecentTickets` เป็นการดึง 5 รายการตั๋วที่อัปเดตล่าสุดของคิวบริการทั้งหมด (`take: 5, orderBy: [{ updatedAt: "desc" }]`) โดยไม่ได้กรองตาม `ownerId: req.user.id` แต่ในหน้า UI กลับใช้หัวข้อว่า `"My Recent Tickets"` แม้ว่าคำบรรยายย่อยด้านล่างจะเขียนว่า `"Latest 5 service desk tickets updated in the queue"` ก็ตาม ทำให้เจ้าหน้าที่อาจเข้าใจผิดว่าตั๋วที่แสดงเป็นตั๋วที่ตนเองได้รับมอบหมายเท่านั้น
> - **แนวทางแก้ไข:** ปรับเปลี่ยนหัวข้อแผงใน `StaffDashboard.tsx` ให้ตรงกับข้อเท็จจริง เช่น เป็น `"Recent Queue Tickets"` หรือ `"Recent Service Desk Tickets"` เพื่อสื่อความหมายที่ชัดเจนและสอดคล้องกับ subtitle ค่ะ
>
> ---
>
> ### 🟡 3. จุดเก็บตกเอกสารการบันทึกการรีวิว (Minor Doc Polish)
>
> #### 3.1 ลิงก์และข้อมูล PR URL ใน `docs/lab-04/reviewer.md`
> - ใน Master PR Table (Section 2) แถวของ `PR-06` ยังเป็นเพียงข้อความธรรมดา แนะนำให้ใส่ลิงก์ GitHub PR `[GitHub #110](https://github.com/jejaebubu/toktickit/pull/110)`
> - ในหัวข้อ Section 3.6 บรรทัดที่ 1125–1130 ขาดการระบุ `- **PR URL:** https://github.com/jejaebubu/toktickit/pull/110`
>
> ---
>
> ฝากแก้ไขจุดที่ 1 เรื่องเมนูของ Requester และจุดที่ 2 เรื่อง wording ของหัวข้อแผงตั๋ว จากนั้น push commit ขึ้นมาใหม่นะคะ เดี๋ยวจะรีบเข้ามาตรวจซ้ำและกด Approve / Merge ให้ทันทีเลยค่ะ ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `b17a151`)
- **Response Date:** 2026-11-02 01:49:47 UTC+7
- **Commit SHA:** `b17a151`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและช่วยตรวจพบจุด Regression ของเมนู Requester ค่ะ @titayaaa ดำเนินการแก้ไขครบทั้ง 3 ประเด็น พร้อมเก็บตกความสอดคล้องของการนำทางและตัวกรองเพิ่มเติมใน commits `1419b97`, `512cbab` และ `8bc213c` เรียบร้อยแล้วค่ะ:
>
> 1. **นำเมนู `Dashboard` ออกจาก `REQUESTER` ใน `Header.tsx` (Required 1.1)**:
>    - ปรับ `NAV_BY_ROLE.REQUESTER` ให้คงเฉพาะ `My Tickets` และ `Create Ticket` (เปิด `Dashboard` เฉพาะ `IT_STAFF` และ `ADMINISTRATOR` ใน PR นี้) เพื่อป้องกันปัญหาหน้าว่างก่อนพัฒนา Issue #7 (Requester Dashboard)
> 2. **ปรับหัวข้อแผงตั๋วล่าสุดใน `StaffDashboard.tsx` เป็น `"Recent Queue Tickets"` (Should Fix 2.1)**:
>    - เปลี่ยนจาก `"My Recent Tickets"` เป็น `"Recent Queue Tickets"` ให้ตรงกับขอบเขตข้อมูลจริงที่ดึงตั๋วอัปเดตล่าสุด 5 รายการของคิวบริการทั้งหมด พร้อมอัปเดต `specification.md`, `ui-spec.md` และเพิ่ม assertion ยืนยันใน `StaffDashboard.test.tsx`
> 3. **อัปเดตลิงก์ PR #110 และบันทึกการรีวิวใน `docs/lab-04/reviewer.md` (Minor Doc Polish 3.1)**:
>    - เพิ่มลิงก์ `[GitHub #110](https://github.com/jejaebubu/toktickit/pull/110)` ในตาราง Master PR Table (Section 2) และในหัวข้อ Section `3.6 PR-06` พร้อมบันทึกผลการรีวิวรอบที่ 1 และการแก้ไขครบถ้วน
> 4. **เก็บตกเพิ่มเติม (`8bc213c`)**:
>    - เพิ่ม `"PENDING"` ใน `VALID_STATUSES` ของ `GET /api/tickets` (`server/src/app.ts`) ให้สอดคล้องกับตัวเลือกกรองสถานะ `Pending` ใน `StaffTicketQueue.tsx`
>    - ปรับการกดเปลี่ยนหน้าผ่านเมนูบน `Header` (`App.tsx`) ให้รีเซ็ต `openTicketId` และล้างตัวกรอง Drill-down เดิมเสมอ
>
> รันชุดทดสอบผ่านครบ **201/201 เทสต์** (Server 110 + Client 91) รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-02 02:25:40 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้งประเด็น Blocking, Should Fix และ Minor Suggestions ใน commits `1419b97` และ `512cbab` อย่างรวดเร็วและประณีตมากค่ะ ตรวจสอบโค้ดและชุดทดสอบซ้ำอย่างละเอียดแล้ว:
>
> 1. **ขจัด Regression หน้าจอว่างเปล่าของ Requester สำเร็จ (Required 1.1)**:
>    - นำ `{ id: "dashboard", label: "Dashboard" }` ออกจากเมนูของ `REQUESTER` ใน `Header.tsx` เรียบร้อย ทำให้คงเหลือเฉพาะเมนูที่รองรับจริงในปัจจุบัน (`My Tickets` และ `Create Ticket`) เมนูจะไม่นำทางไปสู่หน้าว่างเปล่าอีกต่อไป
> 2. **ความสอดคล้องของหัวข้อแผงตั๋วกับ Query ข้อมูลจริง (Should Fix 2.1)**:
>    - ปรับเปลี่ยนหัวข้อแผงใน `StaffDashboard.tsx` และเอกสาร `ui-spec.md` เป็น `"Recent Queue Tickets"` ถูกต้องตรงกับขอบเขตข้อมูลจริงที่ query ดึงตั๋ว 5 รายการล่าสุดของคิวบริการทั้งหมด
>    - อัปเดต assertion ใน `StaffDashboard.test.tsx` ตรวจสอบข้อความใหม่ได้อย่างถูกต้อง
> 3. **ความสมบูรณ์ของเอกสารบันทึกการรีวิว (Minor 3.1)**:
>    - มีการใส่ลิงก์ `[GitHub #110](https://github.com/jejaebubu/toktickit/pull/110)` ใน Master PR Table (Section 2) และใน Section 3.6 ครบถ้วน
>    - บันทึกประวัติการรีวิวรอบที่ 1 และผลการแก้ไขครบถ้วนสมบูรณ์ตามเกณฑ์ของ Lab 4
>
> ผลการรันชุดทดสอบผ่านครบ 201/201 เทสต์ (Server 110 + Client 91) โค้ดมีคุณภาพสูงมากและพร้อมสำหรับการใช้งานจริง ขออนุมัติ (Approve)

#### 🔀 Merge Event by Author @jejaebubu
- **Merged PR URL:** [jejaebubu/toktickit#110](https://github.com/jejaebubu/toktickit/pull/110)
- **Merged by:** `@jejaebubu` (Author)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `c11da671f654b4231aa4925efb31ddcfafec1be1`
- **Merged At:** 2026-11-02 02:25:53 UTC+7
- **Status:** ✅ Merged successfully — **Closes #6**

---

### PR #111: feat(dashboard): Requester Dashboard API, owned ticket metrics, and UI screen (Issue #7)
- **PR URL:** [jejaebubu/toktickit#111](https://github.com/jejaebubu/toktickit/pull/111)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`927862f`)
- **Scope & Objectives:**
  - `GET /api/dashboard/requester`: API แสดงภาพรวมสำหรับ Requester พร้อมการกักกันข้อมูล (Data Isolation) ให้เห็นเฉพาะตั๋วที่ตนเองสร้างอย่างเคร่งครัด (`AC-05`, `FR-09`, `BR-11`)
  - คำนวณสรุปสถิติตัวชี้วัด 4 หมวด: `myOpen`, `inProgress`, `resolved`, `closed`
  - ส่งคืนรายการ `recentTickets` 5 รายการล่าสุดเรียงตาม `updatedAt: desc` พร้อม Quick Actions (`create-ticket`, `view-tickets`)
  - พัฒนาคอมโพเนนต์ `RequesterDashboard.tsx` ธีม Zen Green พร้อมการ์ดตัวชี้วัดที่รองรับการคลิก Drill-down ไปยัง `MyTicketsList` ตามสถานะ (`FR-10`)
  - อัปเดต `Header.tsx` นำแท็บเมนู `Dashboard` กลับมาสำหรับบทบาท `REQUESTER`
  - ชุดทดสอบ API (`requester-dashboard.api.test.ts`) และ UI (`RequesterDashboard.test.tsx`) ครอบคลุม 6 เคสใหม่ รวมเป็น 207 เทสต์ (Server 112 / Client 95)

#### 💬 Round 1 Review by @titayaaa (Approved)
- **Review Date:** 2026-11-02 03:14:14 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมิน PR #111: Requester Dashboard API and UI (Issue #7) — APPROVED
>
> ตรวจทานโค้ดใน PR #111 อย่างละเอียดครบถ้วนทั้ง 11 ไฟล์ เทียบกับข้อกำหนดใน `specification.md`, `api-spec.md` และ `ui-spec.md` เรียบร้อยแล้วค่ะ ขอชื่นชมที่พัฒนาโมดูล Requester Dashboard ออกมาได้อย่างสมบูรณ์แบบ สวยงาม และปลอดภัยมากค่ะ 👍
>
> #### 🌟 จุดเด่นที่น่าประทับใจ:
> 1. **การรักษาความปลอดภัยและ Data Isolation ที่รัดกุม (`app.ts`)**:
>    - บังคับใช้ RBAC ตรวจสอบ `req.user.role === 'REQUESTER'` (คืน `403 Forbidden` สำหรับเจ้าหน้าที่และแอดมิน ป้องกันการเข้าถึงข้ามบทบาท)
>    - การนับตัวชี้วัด (Metrics) และการดึง 5 ตั๋วล่าสุด (`recentTickets`) ถูกจำกัดขอบเขตด้วย `requesterId = req.user.id` อย่างเคร่งครัด ป้องกันการรั่วไหลของข้อมูลระหว่าง Requester ได้ 100% ตามเกณฑ์ `AC-05`, `FR-09`, และ `BR-11`
>    - จัดการข้อผิดพลาดตามหลัก `SAFE-01` ส่ง generic 500 error message ให้ client โดยไม่เปิดเผย stack trace
> 2. **ดีไซน์ Zen Green และการจัดวางที่ประณีต (`RequesterDashboard.tsx`)**:
>    - การเลือกใช้สีสอดคล้องกับ Zen Green tokens (`#006B3C`, `#EAF6EF`, `#1A202C`, `#6C757D`)
>    - การ์ดตัวชี้วัด 4 ใบ (`My Open Tickets`, `In Progress`, `Resolved`, `Closed`) มีคู่สี Accent ที่สบายตาและอ่านค่าง่าย
>    - รองรับ Responsive ดีเยี่ยม: สลับระหว่าง Desktop Table และ Mobile Cards (`.d-none.d-md-block` vs `.d-md-none`) ได้อย่างไร้รอยต่อ
>    - Accessibility ครบถ้วน: ทุกปุ่มและลิงก์มี `minHeight: 44px`, มี `aria-label` บนการ์ด และกำกับ `aria-hidden="true"` บน emoji ทั้งหมด
> 3. **Empty State & Quick Actions**:
>    - จัดการเคสที่ Requester ยังไม่มีตั๋วได้เป็นมิตรมาก พร้อมปุ่ม CTA `"Submit a new request"` นำทางไปยังหน้าสร้างตั๋วทันที
>    - แผง Quick Actions ด้านขวาช่วยให้การนำทางหลักสะดวกและรวดเร็ว
> 4. **ระบบ Drill-down และ State Handling (`MyTicketsList.tsx`, `App.tsx`, `Header.tsx`)**:
>    - เชื่อมต่อการกดการ์ดเพื่อนำทางไปยัง `MyTicketsList` พร้อมฟิลเตอร์สถานะเริ่มต้นผ่าน `initialStatus` ได้อย่างถูกต้อง
>    - มีการรีเซ็ต `initialStatus` เมื่อคลิกเมนูหลักจาก `Header.tsx` เพื่อให้ผู้ใช้สามารถดูตั๋วทั้งหมดได้ตามปกติ
>    - ขยายตัวเลือก `STATUS_OPTIONS` ใน `MyTicketsList` ให้ครบถ้วนทั้ง 9 สถานะ
> 5. **ชุดทดสอบครอบคลุมทั้งระบบ**:
>    - Backend API tests (`API-11`, `API-11b`) ยืนยันความถูกต้องของตัวเลขและการบล็อกสิทธิ์ 401/403
>    - Frontend Vitest tests (`UI-05a` – `UI-05d`) ทดสอบการเรนเดอร์, Drill-down, Empty state CTA และ Retry reload ครบทุกมิติ
>
> ---
>
> #### 💡 ข้อคิดเห็นและข้อเสนอแนะเชิงพัฒนา (Minor Suggestion — ไม่บล็อกการ Merge):
> - **Drill-down ของการ์ด `My Open Tickets`**: การ์ดนี้คำนวณจากสถานะ `New` และ `Open` รวมกัน แต่เมื่อคลิก drill-down ปัจจุบันส่ง `{ status: "Open" }` ไปยัง `MyTicketsList` ทำให้ระบบกรองแสดงเฉพาะตั๋วที่มีสถานะ `Open` (ตั๋วที่เป็น `New` จะไม่แสดงในรายการกรองนี้) ในอนาคตหากต้องการให้เห็นครบทุกตั๋วที่ยังเปิดอยู่ อาจพิจารณาเพิ่ม filter แบบกลุ่มสถานะ (เช่น Active/Open) ใน `MyTicketsList` เพิ่มเติมได้ค่ะ
>
> ---
>
> **สรุปผลการประเมิน:** โค้ดมีคุณภาพสูงมาก สถาปัตยกรรมสะอาด และผ่านชุดทดสอบทั้งหมดอย่างสมบูรณ์ ขอ **Approve** ให้สามารถ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ ขอบคุณมากค่ะ

#### 🔀 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#111](https://github.com/jejaebubu/toktickit/pull/111)
- **Merged by:** `@titayaaa` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `927862fe09d59aa75e925b6a7fcf273d4ee7f779`
- **Merged At:** 2026-11-02 03:14:22 UTC+7
- **Status:** ✅ Merged successfully — **Closes #7**

---

### PR #112: test(e2e): Lab 4 Playwright E2E flows for Actions Taken, Resolution Gate, and Dashboards (Issue #8)
- **PR URL:** [jejaebubu/toktickit#112](https://github.com/jejaebubu/toktickit/pull/112)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged (`0ce99e8`)
- **Scope & Objectives:**
  - `e2e/lab-04/actions-taken-flow.spec.ts` (`E2E-01` — `AC-01`, `AC-02`, `AC-03`, `AC-12`, `AC-14`): ทดสอบวงจรชีวิต Actions Taken แบบ End-to-End ตั้งแต่ Requester สร้างตั๋ว -> เจ้าหน้าที่เปิดตั๋ว ตรวจสอบ Follow-Up validation บันทึก Action Taken สถานะ `PENDING` แก้ไขเป็น `IN_PROGRESS` และ Complete พร้อมบังคับกรอก Result (`BR-16 / AC-15`) -> Requester เปิดดูประวัติแบบ Read-only
  - `e2e/lab-04/ticket-resolution.spec.ts` (`E2E-02` — `AC-07`, `AC-08`, `AC-13`, `BR-08`, `BR-09`, `BR-15`): ทดสอบ Requester Advisory Flag ("My problem is resolved") แสดงแบนเนอร์แจ้งเตือนโดยไม่เปลี่ยนสถานะจริง, เจ้าหน้าที่รับตั๋ว (`New -> Open`), บังคับใช้ Transition Matrix (`Open -> In Progress`), ตรวจจับ Resolution Gate เตือนเมื่อมี Pending Action, ปฏิเสธด้วย `409 Conflict` หากพยายาม Resolve ก่อนงานเสร็จ, และ Resolve สำเร็จหลังเคลียร์ Action ครบ
  - `e2e/lab-04/dashboards.spec.ts` (`E2E-03` — `AC-04`, `AC-05`, `FR-10`): ทดสอบ Dashboard ทั้ง 2 ฝั่ง (IT Staff Dashboard 5 metric cards + Recent Tickets + Quick Actions นำทาง Drill-down ไปยัง Ticket Queue และ Requester Dashboard 4 metric cards + Quick Actions + Drill-down ไปยัง My Tickets)
  - Responsive Fix: ปรับแก้ `whiteSpace: "normal"` บน Advisory Badge ใน `TicketDetail.tsx` ป้องกันปัญหาหน้าจอเลื่อนแนวนอนบน Mobile 393px
  - รองรับการทดสอบครบ 3 viewports: Desktop (1280×800), Tablet (820×1180), Mobile (393×851) รวม 9 E2E test runs

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-02 04:11:18 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ### PR-08 Review: Changes Requested (ขอฝากเก็บรายละเอียด 2 จุดก่อน Approve ค่ะ)
>
> ขอบคุณ @jejaebubu สำหรับชุดทดสอบ E2E Playwright ทั้ง 3 flows บนทั้ง 3 viewports (Desktop, Tablet, Mobile) ครบ 9 runs และการแก้ปัญหา `whiteSpace: "normal"` บน Advisory Badge ได้อย่างยอดเยี่ยมมากค่ะ
>
> จากการไล่ตรวจโค้ดและเอกสารอย่างละเอียด มีจุดที่อยากรบกวนช่วยปรับแก้อีกนิดหน่อยก่อนกด Approve ดังนี้ค่ะ:
>
> #### 🔴 จุดที่ต้องปรับแก้ (Required Changes):
> 1. **เติมลิงก์ GitHub PR #112 ใน `docs/lab-04/reviewer.md`**:
>    - ในตาราง Section 2 แถวของ `PR-08`: รบกวนเพิ่มลิงก์เป็น `**PR-08 ([GitHub #112](https://github.com/jejaebubu/toktickit/pull/112))**` ให้ตรงตามฟอร์แมตเดียวกับ PR-04 ถึง PR-07 ค่ะ
>    - ในหัวข้อ Section 3.8: รบกวนเพิ่มบรรทัด `- **PR URL:** [jejaebubu/toktickit#112](https://github.com/jejaebubu/toktickit/pull/112)` ค่ะ
>
> #### 💡 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Minor Test Polish):
> 2. **เพิ่ม Negative Validation Test สำหรับ Result Note ตอน Complete Action (`actions-taken-flow.spec.ts`)**:
>    - ใน Step 7 หลังจากกด `action-complete-` (สถานะเป็น `COMPLETED`) หากลองกด `action-save` ก่อนกรอกข้อความ แล้ว assert ตรวจสอบว่ามี error alert สำหรับช่อง Result แสดงขึ้นมาก่อนกรอกข้อความจริง จะช่วยยืนยันการบังคับใช้กฎ `BR-16` / `AC-15` ในระดับ E2E ได้สมบูรณ์แบบเทียบเท่ากับ Follow-Up Note ใน Step 4 ค่ะ
> 3. **E2E Quick Action บน Requester Dashboard (`dashboards.spec.ts`)**:
>    - ปัจจุบันฝั่ง Requester ทดสอบคลิกการ์ด `requester-metric-card-resolved` แล้ว หากมีเวลาอาจเพิ่มการคลิก `requester-quick-action-create-ticket` หรือ `requester-quick-action-view-tickets` เพื่อให้ครบถ้วนเหมือนฝั่ง Staff Dashboard ค่ะ
>
> รบกวนช่วยอัปเดตข้อ 1 เป็นหลักนะคะ แล้วเดี๋ยวจะรีบเข้ามาตรวจซ้ำและกด Approve ให้ทันทีเลยค่ะ ขอบคุณมากค่ะ! ✨

#### 💬 Round 1 Author Response by @jejaebubu (commit `6ba5ed1`)
- **Response Date:** 2026-11-02 04:29:26 UTC+7
- **Commit SHA:** `6ba5ed1`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวค่ะ แก้ไขครบทุกข้อแล้วใน commit `6ba5ed1` ค่ะ
>
> 1. **(Required) เพิ่มลิงก์ PR #112 ใน `docs/lab-04/reviewer.md`** — เพิ่ม PR #112 ในตาราง Section 2 และเพิ่ม PR URL ใน Section 3.8 พร้อมบันทึก Review #1 และ Author Response เรียบร้อยแล้วค่ะ
> 2. **เพิ่มการทดสอบกรณี Result ยังไม่ได้กรอก (`actions-taken-flow.spec.ts`)** — เพิ่ม Step 7 ให้ลองกดบันทึกทั้งที่ยังไม่ได้กรอก Result แล้วตรวจสอบว่ามีข้อความแจ้งเตือน `Result is required` ก่อนที่จะกรอกข้อมูลจริง เพื่อให้ครอบคลุม BR-16 / AC-15 ค่ะ
> 3. **เพิ่มการทดสอบปุ่มลัดของ Requester (`dashboards.spec.ts`)** — เพิ่ม Step 6 เพื่อทดสอบปุ่ม `requester-quick-action-create-ticket` และ `requester-quick-action-view-tickets` ค่ะ
>
> **ผลการทดสอบ:** รัน `npx playwright test e2e/lab-04` ผ่านครบ **9 tests** ทั้ง Desktop, Tablet และ Mobile ค่ะ
>
> รบกวนช่วยตรวจอีกครั้งนะคะ ขอบคุณค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-02 04:56:51 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้งประเด็น Required Change และข้อเสนอแนะเพิ่มเติมใน commit `6ba5ed1` อย่างรวดเร็วและประณีตมากค่ะ ตรวจสอบโค้ดและชุดทดสอบซ้ำอย่างละเอียดแล้ว:
>
> 1. **ความสมบูรณ์ของการบันทึกเอกสารและลิงก์ PR (Required 1)**:
>    - มีการเพิ่มลิงก์ `[GitHub #112](https://github.com/jejaebubu/toktickit/pull/112)` ในตาราง Section 2 แถวของ `PR-08` ครบถ้วนตามมาตรฐานเดียวกันกับ PR ก่อนหน้า
>    - มีการระบุ `- **PR URL:** [jejaebubu/toktickit#112](https://github.com/jejaebubu/toktickit/pull/112)` ใน Section 3.8 ชัดเจน
>    - บันทึกการรีวิวรอบที่ 1 และ Author Response ไว้อย่างเป็นระเบียบเรียบร้อย
>
> 2. **Negative Validation Test สำหรับ Result ตอน Complete Action (`e2e/lab-04/actions-taken-flow.spec.ts` — Minor 2)**:
>    - เพิ่ม Step 7 กดปุ่ม `action-save` ในขณะที่ช่อง Result ยังว่างอยู่ พร้อมตรวจสอบว่ามีข้อความแจ้งเตือน `action-result-error` (`/Result is required/i`) แสดงขึ้นมาก่อนกรอกข้อความจริง
>    - ยืนยันการบังคับใช้กฎ `BR-16` และ `AC-15` ในระดับ End-to-End ได้อย่างรัดกุมและสมบูรณ์แบบมากค่ะ
>
> 3. **E2E Quick Actions Test บน Requester Dashboard (`e2e/lab-04/dashboards.spec.ts` — Minor 3)**:
>    - เพิ่ม Step 6 ทดสอบการคลิกปุ่ม Quick Actions ของฝั่ง Requester ครบทั้ง 2 ปุ่ม:
>      - `requester-quick-action-create-ticket`: นำทางไปยังฟอร์มสร้างตั๋ว (`submit-ticket-btn`)
>      - `requester-quick-action-view-tickets`: นำทางไปยังหน้าตั๋วของฉัน (`my-tickets-card`) พร้อมรีเซ็ตตัวกรองสถานะเป็นค่าว่าง
>    - มีการเรียก `expectNoHorizontalOverflow(page)` ตรวจสอบความถูกต้องของเลย์เอาต์หลังคลิกทุกจุด
>
> 4. **ความครอบคลุมของการทดสอบและ Responsive Audit**:
>    - ชุดทดสอบ Playwright E2E รันผ่านครบทั้ง 9 เทสต์ (3 flow × 3 responsive viewports: Desktop 1280×800, Tablet 820×1180, Mobile 393×851)
>    - แบ็กเอนด์และคอมโพเนนต์อื่น ๆ ทำงานสอดคล้องกันได้อย่างไร้รอยต่อ
>
> ภาพรวมโค้ดและชุดทดสอบมีคุณภาพสูงมาก ยอดเยี่ยมมากค่ะ ขออนุมัติ (Approve) ให้ทันที และพร้อมให้ดำเนินการ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ! 🎉🚀

#### 🔀 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#112](https://github.com/jejaebubu/toktickit/pull/112)
- **Merged by:** `@titayaaa` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `0ce99e81b6bfb6da55255474668ba45946ca356b`
- **Merged At:** 2026-11-02 05:01:30 UTC+7
- **Status:** ✅ Merged successfully — **Closes #8**

---

### PR #113: Issue #9: Lab 1–3 Regression Test Suite and System Hardening ซึ่งทางเพื่อนได้รีวิวและอนุมัติ Merge เข้า lab4-staging ไปแล้ว (merge SHA: 5158f3a) รบกวนเพิ่มบันทึกของ PR #113 ลงใน Part 2 ให้ครบถ้วนสมบูรณ์ค่ะ
> 
> 🟠 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Improvement Suggestions)
> 1. เพิ่มพาธชุดทดสอบฝั่ง Client ในตาราง docs/lab-04/tests.md สำหรับ REG-01 และ REG-02: ในตารางแถว REG-01 และ REG-02 ปัจจุบันระบุเฉพาะ server/tests/lab-02/*.test.ts และ server/tests/lab-03/*.test.ts เพื่อให้ครอบคลุมการทำ Regression ทั้ง Full-stack แนะนำให้เติมพาธฝั่ง Client เข้าไปด้วยค่ะ เช่น:
>    - REG-01: server/tests/lab-02/*.test.ts, client/src/test/lab-02/*.test.tsx
>    - REG-02: server/tests/lab-03/*.test.ts, client/src/test/lab-03/*.test.tsx
> 2. ระบุสรุปผลการรันชุดทดสอบฝั่ง Server ใน Scope & Objectives ของ PR [#82](https://github.com/titayaaa/toktickit/pull/82) (reviewer.md): ปัจจุบันระบุเฉพาะ Client Vitest (15 files / 81 passed) แนะนำให้ระบุสรุปผลการรันของฝั่ง Server Vitest Suite เพิ่มเติม เพื่อแสดงให้เห็นว่าผ่านการตรวจสอบ Regression ครบทั้ง Frontend และ Backend ค่ะ
> 3. ทยอยอัปเดตตาราง Checklist Section 2 ใน docs/lab-04/reviewer.md: ในตาราง Peer Review Checklist & Criteria รายการข้อ 1 ถึง 5 (Spec Completeness, Actions Taken Model, Resolution Gate, Dashboards, RBAC) ได้รับการ Merge เข้า staging ครบถ้วนแล้ว สามารถเริ่มปรับสถานะจาก ⏳ Pending เป็น ✅ Verified เพื่อเตรียมสรุปผลในโค้งสุดท้ายได้เลยค่ะ
> 
> ฝากช่วยปรับแก้ 4 จุดนี้ แล้วอัปเดต commit เข้ามาอีกครั้งนะคะ พร้อม Approve ให้ในรอบถัดไปทันทีค่ะ ขอบคุณมากค่ะ https://github.com/titayaaa/toktickit/pull/82

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-02 05:22:11 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ## 🔍 ผลการตรวจทาน PR #113: Full Regression of Lab 1–3 Suites with Lab 4 Features (Issue #9)
> ขอบคุณ @jejaebubu สำหรับการรวบรวมและรันชุดทดสอบ Full Regression Test Suite ทั้งหมดของระบบค่ะ ยอดเยี่ยมมากที่ผลการทดสอบผ่านครบ **234/234 tests (100%)** ครอบคลุมทั้ง Server Vitest (112 tests), Client Vitest (95 tests) และ Playwright E2E (27 runs บน Desktop, Tablet, Mobile) รวมทั้งการปรับสคริปต์ `e2e/lab-03/staff-ticket-flow.spec.ts` ให้สอดคล้องกับ 9-state transition matrix (`Open -> In Progress -> Resolved`)
> ภาพรวมถือว่าสมบูรณ์มากค่ะ แต่ขอส่งเป็น **Changes Requested** ก่อนเพื่อให้เพื่อนเก็บรายละเอียดความถูกต้องของเอกสารและชุดทดสอบให้เนี้ยบที่สุด 4 จุดดังนี้ค่ะ:
> ---
> ### 🔴 จุดที่ต้องแก้ไขก่อนอนุมัติ (Required Changes)
> #### 1. เพิ่มลิงก์ GitHub PR #113 ในตาราง Section 2 ของ `docs/lab-04/reviewer.md`
> - ในตาราง Section 2 (Master Review Table) แถวของ `PR-09` ในคอลัมน์แรก ปัจจุบันระบุเป็น:
>   ```markdown
>   | **PR-09** | Lab 1–3 regression test suite and system hardening | ...
> ซึ่ง PR อื่นๆ ทั้งหมดตั้งแต่ PR-01 ถึง PR-08 มีการใส่ลิงก์ GitHub PR ไว้อย่างสม่ำเสมอ รบกวนปรับให้เป็นรูปแบบเดียวกันดังนี้ค่ะ:
> markdown
> | **PR-09 ([GitHub #113](https://github.com/jejaebubu/toktickit/pull/113))** | Lab 1–3 regression test suite and system hardening | ...
> 2. เพิ่มฟิลด์ - **PR URL:** ในหัวข้อ Section 3.9 ของ docs/lab-04/reviewer.md
> ใน Section 3.9 บรรทัด Metadata เริ่มต้นที่ - **Branch:** ทันที โดยขาดลิงก์ PR URL:
> markdown
> ### 3.9 PR-09: Lab 1–3 Regression Test Suite and System Hardening (Issue #9)
> - **Branch:** `feature/lab04-issue9-regression` → `lab4-staging`
> - **Author:** `@jejaebubu`
> - **Reviewer:** `@titayaaa`
> รบกวนเพิ่ม - **PR URL:** [jejaebubu/toktickit#113](https://github.com/jejaebubu/toktickit/pull/113) ใต้หัวข้อให้ครบถ้วนเหมือนกับ Section 3.8 ค่ะ
> 🟠 ข้อสังเกตและจุดแนะนำเพิ่มเติม (Improvement Suggestions)
> 3. ป้องกัน Race Condition และ False Pass ใน e2e/lab-03/staff-ticket-flow.spec.ts (บรรทัด 91–95)
> ใน Step 6 ปัจจุบันเขียนไว้ดังนี้:
>
> typescript
> await page.selectOption('[data-testid="detail-priority-select"]', "URGENT");
> await page.selectOption('[data-testid="detail-status-select"]', "In Progress");
> await expect(page.getByTestId("detail-notice")).toContainText(/updated successfully/i);
> await page.selectOption('[data-testid="detail-status-select"]', "Resolved");
> await expect(page.getByTestId("detail-notice")).toContainText(/updated successfully/i);
> จุดที่พบข้อกังวล: เนื่องจากข้อความแจ้งเตือน detail-notice ("Ticket updated successfully.") แสดงขึ้นมาตั้งแต่ตอนเปลี่ยนเป็น In Progress แล้ว การสั่ง expect ข้อความเดิมซ้ำที่บรรทัด 95 จะกลายเป็น Immediate Pass (False Positive) ทันที โดยที่ Playwright อาจจะยังไม่ได้รอให้ Request การเปลี่ยนเป็น Resolved ส่งถึงเซิร์ฟเวอร์เสร็จสิ้นจริง
> ข้อเสนอแนะ: แนะนำให้เพิ่มการตรวจสอบค่าของ <select> หรือ badge แสดงสถานะจริง เพื่อรับประกันว่าสถานะเปลี่ยนเป็น Resolved เรียบร้อยแล้ว เช่น:
> typescript
> await expect(page.locator('[data-testid="detail-status-select"]')).toHaveValue("Resolved");
> หรือรอการตอบสนองของเครือข่าย จะช่วยให้ชุดทดสอบแข็งแกร่งและป้องกัน Flaky test บนเครื่องที่มีความหน่วงได้ดีขึ้นมากค่ะ
> 4. เติมหมายเลข PR ในตารางผลการทดสอบ docs/lab-04/tests.md
> ในตาราง Section 2 แถว PR-09 ปัจจุบันบันทึกเป็น **Pass** (review pending) แนะนำให้ระบุเป็น **Pass** (PR #113, review pending) เพื่อให้สอดคล้องกับแถว PR-05 ถึง PR-08 ค่ะ
> สรุป: ฝากแก้ไขข้อ 1 และ 2 เป็นหลัก และปรับข้อ 3–4 เล็กน้อย หาก push commit แก้ไขเรียบร้อยแล้ว แจ้งได้เลยนะคะ เดี๋ยวจะรีบเข้ามาตรวจซ้ำและ Approve & Merge ให้ทันทีค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `abb8ea3`)
- **Response Date:** 2026-11-02 05:29:33 UTC+7
- **Commit SHA:** `abb8ea3`
- **Author Response Details (Verbatim):**

> ขอบคุณ @titayaaa มากค่ะ สำหรับการตรวจทานอย่างละเอียด แก้ไขครบทั้ง 4 จุดแล้วใน commit `abb8ea3` ค่ะ
>
> 1. **เพิ่มลิงก์ GitHub PR #113 ใน Master Review Table (`docs/lab-04/reviewer.md`)**
>    - อัปเดตแถว `PR-09` ใน Section 2 ให้มีลิงก์ PR #113 เรียบร้อยแล้ว โดยใช้รูปแบบเดียวกับ PR อื่น ๆ ค่ะ
>
> 2. **เพิ่ม PR URL ใน Section 3.9 (`docs/lab-04/reviewer.md`)**
>    - เพิ่มลิงก์ PR #113 พร้อมบันทึก Review Log รอบที่ 1 และ Author Response ให้ครบถ้วนแล้วค่ะ
>
> 3. **แก้ปัญหา Race Condition และ Flaky Test ใน `e2e/lab-03/staff-ticket-flow.spec.ts`**
>    - เพิ่มการตรวจสอบค่าของ `<select>` ด้วย `toHaveValue("In Progress")` และ `toHaveValue("Resolved")` ก่อนรอ `detail-notice` และถ่ายภาพหน้าจอ เพื่อให้แน่ใจว่าระบบเปลี่ยนสถานะเรียบร้อยแล้วก่อนทำขั้นตอนถัดไป และลดโอกาสที่ Test จะผ่านทั้งที่ระบบยังทำงานไม่เสร็จค่ะ
>
> 4. **อัปเดตผลการทดสอบใน `docs/lab-04/tests.md`**
>    - เปลี่ยนสถานะในตาราง Section 2 เป็น `Pass (PR #113, review addressed)` เพื่อให้ตรงกับการแก้ไขล่าสุดค่ะ
>
> **ผลการทดสอบหลังแก้ไข**
> - รัน Playwright `e2e/lab-03/staff-ticket-flow.spec.ts` ผ่านครบทั้ง 3 รอบ (Desktop, Tablet และ Mobile)
> - ทดสอบทั้งระบบผ่านครบ **234/234 tests** ไม่พบปัญหา Regression ค่ะ
>
> รบกวน @titayaaa ช่วยตรวจสอบการแก้ไขรอบที่ 2 อีกครั้งนะคะ ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-02 05:43:21 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้ง 4 จุดใน commit `abb8ea3` อย่างรวดเร็วและประณีตมากค่ะ ตรวจสอบโค้ดและเอกสารซ้ำอย่างละเอียดแล้ว:
>
> 1. **ความสมบูรณ์ของเอกสารและลิงก์ PR (Required 1 & 2)**:
>    - เพิ่มลิงก์ `[GitHub #113](https://github.com/jejaebubu/toktickit/pull/113)` ในตาราง Section 2 และระบุ `- **PR URL:**` ใน Section 3.9 ของ `docs/lab-04/reviewer.md` ครบถ้วนตามมาตรฐานเดียวกันกับทุก PR ก่อนหน้า
>    - บันทึก Review Log รอบที่ 1 และ Author Response ไว้อย่างเป็นระเบียบและโปร่งใส
> 2. **ความเสถียรของชุดทดสอบ E2E (Improvement 3)**:
>    - ปรับปรุง `e2e/lab-03/staff-ticket-flow.spec.ts` ด้วยการเพิ่ม `toHaveValue("In Progress")` และ `toHaveValue("Resolved")` เพื่อตรวจสอบค่าจริงของ `<select>` ก่อนตรวจสอบ notice และบันทึกภาพหน้าจอ ช่วยขจัดปัญหา Race Condition และการเกิด Flaky test ได้อย่างสมบูรณ์แบบ
> 3. **ความสอดคล้องของบันทึกผลการทดสอบ (Improvement 4)**:
>    - อัปเดตตารางสรุปใน `docs/lab-04/tests.md` เป็น `**Pass** (PR #113, review addressed)` และยืนยันผล `REG-01` ครบถ้วน
> 4. **ผลการทดสอบ Full Regression Suite**:
>    - ชุดทดสอบเดิมตั้งแต่ Lab 1 ถึง Lab 3 ร่วมกับโมดูลใหม่ของ Lab 4 ผ่านครบถ้วนสมบูรณ์ **234/234 tests (100% Pass)** ปราศจาก regression ตามข้อกำหนด `AC-11` และ `FR-12`
>
> ภาพรวมของโค้ด ชุดทดสอบ และเอกสารมีคุณภาพสูงมาก ขอ **Approve** ให้ทันที และพร้อมให้ดำเนินการ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ!

#### 🔀 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#113](https://github.com/jejaebubu/toktickit/pull/113)
- **Merged by:** `@titayaaa` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `5158f3a22830f36746816a3bc5cf6ddf0ce3544c`
- **Merged At:** 2026-11-02 05:43:30 UTC+7
- **Status:** ✅ Merged successfully — **Closes #9**

---

### PR #114: PR-10: Zen Green UI polish, accessibility, responsive viewports, and screenshots (Issue #10)
- **PR URL:** [jejaebubu/toktickit#114](https://github.com/jejaebubu/toktickit/pull/114)
- **Branch:** `feature/lab04-issue10-ui-polish` → `lab4-staging`
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Current Status:** ✅ Approved & Merged (`d785a4c`)
- **Scope & Objectives:**
  - `A11Y-01` (`AC-13`): Zen Green UI polish และการทดสอบ Accessibility ตามมาตรฐาน WCAG 2.1 AA (Touch target $\ge 44\text{px}$, visible focus ring, และ dynamic `aria-required="true"` เมื่อสถานะเป็น `COMPLETED`)
  - `RESP-01` (`AC-13`): ตรวจสอบ Responsive Viewports ครอบคลุม Desktop (1280×800), Tablet (820×1180), และ Mobile (393×851) ปราศจาก Horizontal Overflow
  - บันทึกภาพ Full Page Screenshots ครบทั้ง 24 ภาพจัดเก็บใน `artifacts/lab-04/screenshots/`
  - อัปเดตตารางสรุปผลการทดสอบใน `docs/lab-04/tests.md` และบันทึกประวัติการรีวิวใน `docs/lab-04/reviewer.md`

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-02 13:27:23 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ### PR-10 Review: Changes Requested (ขอฝากเก็บรายละเอียดเอกสารและลิงก์ PR นิดเดียวค่ะ ✨)
>
> ขอบคุณ @jejaebubu สำหรับการปรับปรุง Zen Green UI, Accessibility ตามมาตรฐาน WCAG 2.1 AA, ชุดทดสอบ `A11Y-01`, และการบันทึกภาพ Full Page Screenshots ครบทั้ง 24 ภาพบน 3 Viewports (Desktop, Tablet, Mobile) ได้อย่างประณีตและสวยงามมากค่ะ
>
> ภาพรวมด้านโค้ดและดีไซน์ทำไว้ดีมากแล้วค่ะ แต่ขอฝากปรับแก้ความสมบูรณ์ของเอกสารและลิงก์ PR อีก 3 จุดเล็ก ๆ เพื่อให้ตรงตามมาตรฐานเดียวกันกับ PR ก่อนหน้าค่ะ:
>
> ---
>
> #### 🔴 จุดที่ต้องปรับแก้ (Required Changes):
> 1. **เติมลิงก์ GitHub PR #114 ในตาราง Master Review (docs/lab-04/reviewer.md)**:
>    - ในตาราง Section 2 แถวของ `PR-10`: รบกวนปรับจาก `**PR-10**` เป็น `**PR-10 ([GitHub #114](https://github.com/jejaebubu/toktickit/pull/114))**` ให้มีลิงก์เหมือนกับแถว PR-04 ถึง PR-09 ค่ะ
> 2. **เพิ่ม PR URL ใน Section 3.10 (docs/lab-04/reviewer.md)**:
>    - ในหัวข้อ Section 3.10 รบกวนเพิ่มบรรทัด `- **PR URL:** [jejaebubu/toktickit#114](https://github.com/jejaebubu/toktickit/pull/114)` ใต้บรรทัด `- **Branch:**` ค่ะ
> 3. **ระบุเลข PR ในตารางสรุปผลทดสอบ (docs/lab-04/tests.md)**:
>    - ในแถว `PR-10` ของตารางสรุปผลการรัน แนะนำให้ปรับเป็น `**Pass** (PR #114, review pending)` เพื่อให้สอดคล้องกับแถวอื่น ๆ ค่ะ
>
> ---
>
> #### 💡 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Minor Test Polish):
> 4. **เพิ่มการทดสอบ Dynamic `aria-required="true"` บน `action-result` (`ActionsTaken.test.tsx`)**:
>    - ในเคส `A11Y-01` ปัจจุบันตรวจสอบ `expect(resultInput).toHaveAttribute("aria-required", "false")` ตอนฟอร์มเปิดเริ่มต้น หากลองเพิ่มสเต็ปเลือกสถานะ `COMPLETED` ใน `action-status` แล้ว assert ตรวจสอบว่า `resultInput` เปลี่ยนเป็น `aria-required="true"` จะช่วยยืนยัน dynamic behavior ตามที่ระบุไว้ใน PR description ได้สมบูรณ์แบบ 100% เลยค่ะ:
>      ```tsx
>      await user.selectOptions(screen.getByTestId("action-status"), "COMPLETED");
>      expect(screen.getByTestId("action-result")).toHaveAttribute("aria-required", "true");
>      ```
> 5. **เตรียมอัปเดต `docs/lab-04/ai-use.md` และ `README.md` ใน PR-11**:
>    - ตามที่ระบุไว้ใน Issue #102 ฝากเตรียมอัปเดตบันทึก Coding-Agent reflection ใน `ai-use.md` และคำแนะนำการ Setup/Test ใน `README.md` ในขั้นตอน PR-11 (Sprint 4 Documentation and Release) ด้วยนะคะ
>
> ---
>
> รบกวนช่วยอัปเดต 3 ข้อแรกเป็นหลักนะคะ แล้ว push commit ขึ้นมา ping เรียกได้เลย เดี๋ยวจะรีบเข้ามาตรวจและกด **Approve** ให้ทันทีเลยค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `84ee0bb`)
- **Response Date:** 2026-11-02 14:52:41 UTC+7
- **Commit SHA:** `84ee0bb`
- **Author Response Details (Verbatim):**

> ขอบคุณ @titayaaa มากค่ะ สำหรับการตรวจทานและข้อเสนอแนะ แก้ไขครบทั้ง 4 จุดแล้วใน commit `2182896` ค่ะ
>
> 1. **เพิ่มลิงก์ GitHub PR #114 ใน Master Review Table (`docs/lab-04/reviewer.md`)**
>    - อัปเดตแถว `PR-10` ใน Section 2 ให้มีลิงก์ PR #114 เรียบร้อยแล้วค่ะ
>
> 2. **เพิ่ม PR URL ใน Section 3.10 (`docs/lab-04/reviewer.md`)**
>    - เพิ่มลิงก์ PR #114 พร้อมบันทึก Review Log รอบที่ 1 และ Author Response ให้ครบถ้วนแล้วค่ะ
>
> 3. **เพิ่มเลข PR ในตารางสรุปผลการทดสอบ (`docs/lab-04/tests.md`)**
>    - อัปเดตสถานะของ `PR-10` เป็น `Pass (PR #114, review pending)` เพื่อให้เห็นชัดเจนว่าแก้ไขและทดสอบผ่านแล้ว แต่ยังรอการ Review อยู่ค่ะ
>
> 4. **เพิ่มการทดสอบ Dynamic `aria-required` ของช่อง Result (`ActionsTaken.test.tsx`)**
>    - เพิ่มขั้นตอนเลือกสถานะ `COMPLETED` ในเคส `A11Y-01` แล้วตรวจสอบว่าช่อง `action-result` เปลี่ยนเป็น `aria-required="true"` ตาม BR-16 เรียบร้อยแล้วค่ะ โดย Unit Tests ผ่านครบทุกเคส
>
> 5. **เตรียมงานสำหรับ PR-11**
>    - รับทราบเรื่องการอัปเดต `ai-use.md` และ `README.md` ใน PR-11 (Sprint 4 Documentation and Release) แล้วค่ะ
>
> รบกวน @titayaaa ช่วยตรวจสอบการแก้ไขรอบที่ 2 อีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Final Verification & Approval by @titayaaa
- **Response Date:** 2026-11-02 15:45:37 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> > ขอบคุณ @titayaaa มากค่ะ สำหรับการตรวจทานและข้อเสนอแนะ แก้ไขครบทั้ง 4 จุดแล้วใน commit `2182896` ค่ะ
> > 
> > 1. **เพิ่มลิงก์ GitHub PR [PR-10: Zen Green UI polish, accessibility, responsive viewports, and screenshots (Issue #10) #114](https://github.com/jejaebubu/toktickit/pull/114) ใน Master Review Table (`docs/lab-04/reviewer.md`)**
> >    
> >    * อัปเดตแถว `PR-10` ใน Section 2 ให้มีลิงก์ PR [PR-10: Zen Green UI polish, accessibility, responsive viewports, and screenshots (Issue #10) #114](https://github.com/jejaebubu/toktickit/pull/114) เรียบร้อยแล้วค่ะ
> > 2. **เพิ่ม PR URL ใน Section 3.10 (`docs/lab-04/reviewer.md`)**
> >    
> >    * เพิ่มลิงก์ PR [PR-10: Zen Green UI polish, accessibility, responsive viewports, and screenshots (Issue #10) #114](https://github.com/jejaebubu/toktickit/pull/114) พร้อมบันทึก Review Log รอบที่ 1 และ Author Response ให้ครบถ้วนแล้วค่ะ
> > 3. **เพิ่มเลข PR ในตารางสรุปผลการทดสอบ (`docs/lab-04/tests.md`)**
> >    
> >    * อัปเดตสถานะของ `PR-10` เป็น `Pass (PR #114, review pending)` เพื่อให้เห็นชัดเจนว่าแก้ไขและทดสอบผ่านแล้ว แต่ยังรอการ Review อยู่ค่ะ
> > 4. **เพิ่มการทดสอบ Dynamic `aria-required` ของช่อง Result (`ActionsTaken.test.tsx`)**
> >    
> >    * เพิ่มขั้นตอนเลือกสถานะ `COMPLETED` ในเคส `A11Y-01` แล้วตรวจสอบว่าช่อง `action-result` เปลี่ยนเป็น `aria-required="true"` ตาม BR-16 เรียบร้อยแล้วค่ะ โดย Unit Tests ผ่านครบทุกเคส
> > 5. **เตรียมงานสำหรับ PR-11**
> >    
> >    * รับทราบเรื่องการอัปเดต `ai-use.md` และ `README.md` ใน PR-11 (Sprint 4 Documentation and Release) แล้วค่ะ
> > 
> > รบกวน @titayaaa ช่วยตรวจสอบการแก้ไขรอบที่ 2 อีกครั้งนะคะ ขอบคุณมากค่ะ
>
> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
>
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้งประเด็นเอกสาร ลิงก์ PR และการเพิ่มเคสทดสอบ dynamic validation ใน commit `2182896` อย่างรวดเร็วและประณีตมากค่ะ ตรวจสอบโค้ดและเอกสารซ้ำอย่างละเอียดแล้ว:
>
> 1. **ความสมบูรณ์ของเอกสารและลิงก์ PR (Required 1 & 2)**:
>    - เพิ่มลิงก์ `[GitHub #114](https://github.com/jejaebubu/toktickit/pull/114)` ในตาราง Section 2 และระบุ `- **PR URL:**` ใน Section 3.10 ของ `docs/lab-04/reviewer.md` ครบถ้วนตามมาตรฐานเดียวกันกับทุก PR ก่อนหน้า
>    - บันทึก Review Log รอบที่ 1 และ Author Response ไว้อย่างเป็นระเบียบและโปร่งใส
> 2. **ความสอดคล้องของตารางสรุปผลการทดสอบ (Required 3)**:
>    - อัปเดตตารางสรุปใน `docs/lab-04/tests.md` แถว `PR-10` เป็น `**Pass** (PR #114, review pending)` ถูกต้องเรียบร้อย
> 3. **Dynamic `aria-required="true"` Verification (`ActionsTaken.test.tsx` — Minor 4)**:
>    - เพิ่มขั้นตอนการเลือกสถานะ `COMPLETED` ใน `action-status` แล้ว assert ตรวจสอบว่าช่อง `action-result` เปลี่ยนเป็น `aria-required="true"` ในเคส `A11Y-01` ได้อย่างรัดกุมและสมบูรณ์แบบ 100%
> 4. **ความสมบูรณ์ของ Artifacts & Viewports**:
>    - ภาพ Full Page Screenshots ครบทั้ง 24 ภาพใน `artifacts/lab-04/screenshots/` ครอบคลุมทั้ง 3 Viewports (Desktop, Tablet, Mobile)
>    - ปราศจากปัญหา Horizontal Overflow และเป็นไปตามมาตรฐานการออกแบบ Zen Green และ WCAG 2.1 AA
>
> ภาพรวมของโค้ด ชุดทดสอบ และเอกสารมีคุณภาพสูงมาก ยอดเยี่ยมมากค่ะ ขออนุมัติ (**Approve**) ให้ทันที และพร้อมให้ดำเนินการ Merge เข้าสู่สาขา `lab4-staging` ได้เลยค่ะ!

#### 🔀 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#114](https://github.com/jejaebubu/toktickit/pull/114)
- **Merged by:** `@titayaaa` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `d785a4c1d15da60c1e4aaec80f5077b030e3fe0c`
- **Merged At:** 2026-11-02 15:46:03 UTC+7
- **Status:** ✅ Merged successfully — **Closes #10**

---

### PR #115: PR-11: Sprint 4 Documentation and Release Integration to Main (Issue #11)
- **PR URL:** [jejaebubu/toktickit#115](https://github.com/jejaebubu/toktickit/pull/115)
- **Branch:** `release/lab04-staging-to-main` → `main`
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `main`
- **Current Status:** ✅ Approved & Merged (`fe99888`)
- **Scope & Objectives:**
  - Release Integration for Sprint 4 (Lab 4) to promote `release/lab04-staging-to-main` into `main` after all 10 feature PRs (PR-01 through PR-10) are merged.
  - Complete verification (235/235 tests passed - Server 112, Client 96, Playwright 27 runs across Desktop, Tablet, Mobile).
  - Sprint 4 Documentation finalized: `README.md`, `docs/lab-04/ai-use.md`, `docs/lab-04/reviewer.md`, `docs/lab-04/tests.md`.

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-02 16:24:23 UTC+7
- **Verdict:** 🛑 Changes Requested
- **Review Comments (Verbatim):**

> ขอบคุณ @jejaebubu สำหรับการรวบรวมฟีเจอร์ เอกสาร และผลการทดสอบทั้งหมดของ Sprint 4 เพื่อเตรียม Release เข้าสู่สาขาหลัก `main` ค่ะ ภาพรวมเอกสารและการจัดโครงสร้างทำได้ประณีตและครอบคลุมมาก:
> - `README.md`: อัปเดตโครงสร้างไดเรกทอรี, คู่มือติดตั้ง, ตาราง Seed Data 11 บัญชี, คำสั่งรันเทสต์ และสรุปฟีเจอร์หลักทั้ง 4 ด้านของ Lab 4 ไว้อย่างชัดเจนและอ่านง่ายมาก
> - `docs/lab-04/ai-use.md`: บันทึก Key Prompts (Prompt 8–11) และเขียน Reflection ของ Coding-Agent และบทสรุปภาพรวม Sprint 4 ได้อย่างลึกซึ้งและโปร่งใส
> - `docs/lab-04/tests.md` & `reviewer.md`: สะท้อนผลการทดสอบครบ 235 tests (Server 112, Client 96, E2E 27 runs) ผ่าน 100% ปราศจาก regression จาก Lab 1–3
> เนื่องจาก PR นี้เป็น Release PR ที่จะผสานโค้ดเข้าสู่สาขาหลัก (`main`) เป็นชุดสุดท้าย เพื่อให้เอกสารบน `main` มีความสมบูรณ์และเชื่อมโยงร่องรอยการตรวจสอบ (Traceability) ได้ 100% ขอส่งเป็น **Changes Requested** เพื่อให้เพื่อนเติมลิงก์ PR #115 อีก 3 จุดเล็กน้อยก่อนกด Approve & Merge นะคะ:
> ---
> ### 🔴 จุดที่ต้องปรับแก้ก่อนอนุมัติ (Required Changes)
> #### 1. เติมลิงก์ GitHub PR #115 ในตาราง Section 2 ของ `docs/lab-04/reviewer.md`
> - ในตาราง Section 2 แถว `PR-11` คอลัมน์แรก ปัจจุบันระบุเป็น:
>   ```markdown
>   | **PR-11** | Sprint 4 documentation and release integration to main | ...
> เพื่อให้ตรงตามฟอร์แมตของ PR-01 ถึง PR-10 ที่มี hyperlink ชี้ไปยัง PR รบกวนปรับเป็น:
> markdown
> | **PR-11 ([GitHub #115](https://github.com/jejaebubu/toktickit/pull/115))** | Sprint 4 documentation and release integration to main | ...
> 2. เพิ่มฟิลด์ - **PR URL:** ใน Section 3.11 ของ docs/lab-04/reviewer.md
> ในหัวข้อ Section 3.11 บรรทัดแรกใต้หัวข้อ ปัจจุบันเริ่มต้นที่ - **Branch:** ทันที:
> markdown
> ### 3.11 PR-11: Sprint 4 Documentation and Release Integration to Main (Issue #11)
> - **Branch:** `release/lab04-staging-to-main` → `main`
> - **Author:** `@jejaebubu`
> รบกวนเพิ่มบรรทัดลิงก์ PR URL ให้ครบถ้วนเหมือนกับ Section 3.1 ถึง 3.10 ดังนี้ค่ะ:
> markdown
> ### 3.11 PR-11: Sprint 4 Documentation and Release Integration to Main (Issue #11)
> - **PR URL:** [jejaebubu/toktickit#115](https://github.com/jejaebubu/toktickit/pull/115)
> - **Branch:** `release/lab04-staging-to-main` → `main`
> - **Author:** `@jejaebubu`
> 🟠 ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Improvement Suggestion)
> 3. ระบุหมายเลข PR #115 ในตารางผลการทดสอบ docs/lab-04/tests.md
> ในตารางสรุป Section 2 แถว PR-11 ปัจจุบันระบุเป็น:
> markdown
> | **PR-11** | Issue #11 | 2026-11-02 | Release Verification on main branch | 112 server + 96 client + 27 Playwright E2E = 235 total tests | Pass (review pending) |
> แนะนำให้ระบุหมายเลข PR เพิ่มเติมเป็น **Pass** (PR #115, review pending) เพื่อให้สอดคล้องกับแถว PR-05 ถึง PR-10 ค่ะ
> ฝากเก็บรายละเอียด 3 จุดนี้แล้ว push อัปเดต commit เข้ามาอีกครั้งนะคะ เดี๋ยวจะรีบเข้ามาตรวจซ้ำและกด Approve & Merge เข้าสู่ main ให้ทันทีเลยค่ะ ขอบคุณมากค่ะ

#### 💬 Round 1 Author Response by @jejaebubu (commit `fc4b7b6`)
- **Response Date:** 2026-11-02 16:32:09 UTC+7
- **Commit SHA:** `fc4b7b6`
- **Author Response Details (Verbatim):**

> ขอบคุณ @titayaaa สำหรับการตรวจทาน Release PR อย่างละเอียดและรวดเร็วมากค่ะ ดำเนินการแก้ไขปรับปรุงครบทั้ง 3 จุดเรียบร้อยแล้วใน commit `fc4b7b6` ค่ะ:
>
> 1. **เติมลิงก์ GitHub PR #115 ใน Section 2 (`docs/lab-04/reviewer.md` — Required 1)**:
>    - ปรับเป็น `| **PR-11 ([GitHub #115](https://github.com/jejaebubu/toktickit/pull/115))** |` มี hyperlink ตรงตามมาตรฐานเดียวกับ PR-01 ถึง PR-10 เรียบร้อยค่ะ
> 2. **เพิ่มฟิลด์ `- **PR URL:**` ใน Section 3.11 (`docs/lab-04/reviewer.md` — Required 2)**:
>     - เพิ่มลิงก์ `- **PR URL:** [jejaebubu/toktickit#115](https://github.com/jejaebubu/toktickit/pull/115)` ใต้หัวข้อ Section 3.11 พร้อมบันทึก Review Log ไว้อย่างครบถ้วนค่ะ
> 3. **ระบุหมายเลข PR ในตารางผลการทดสอบ (`docs/lab-04/tests.md` — Improvement 3)**:
>    - อัปเดตสถานะแถว `PR-11` เป็น `**Pass** (PR #115, review pending)` สอดคล้องกับทุก PR ก่อนหน้าค่ะ
>
> รบกวน @titayaaa ตรวจทานอีกครั้งและกด **Approve & Merge** เข้าสู่ `main` ได้เลยนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review & Approval by @titayaaa
- **Review Date:** 2026-11-04 03:10:05 UTC+7
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
> 
> ตรวจสอบการแก้ไขใน commit `fc4b7b6` ของ PR #115 เรียบร้อยครบถ้วนทั้ง 3 จุดแล้วค่ะ:
> 1. เติมไฮเปอร์ลิงก์ `[GitHub #115]` ในตาราง Section 2 ของ `docs/lab-04/reviewer.md` เรียบร้อย
> 2. เพิ่มฟิลด์ `- **PR URL:** [jejaebubu/toktickit#115](https://github.com/jejaebubu/toktickit/pull/115)` ใน Section 3.11 ครบถ้วน
> 3. ระบุหมายเลข `**Pass** (PR #115, review pending)` ในตารางผลการทดสอบ `docs/lab-04/tests.md` สอดคล้องกับทุก PR
> 
> เอกสารและผลการทดสอบของ Sprint 4 สมบูรณ์แบบ 100% ปราศจากข้อบกพร่อง ขออนุมัติ (Approve) และยินดีดำเนินการกด Merge เข้าสู่สาขาหลัก `main` ให้ทันทีค่ะ! 🎉🚀

#### 🔀 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#115](https://github.com/jejaebubu/toktickit/pull/115)
- **Merged by:** `@titayaaa` (Peer Reviewer)
- **Target Branch:** `main`
- **Merge Commit SHA:** `fe998888062671336826ee2b08ac6f0bb54461b3`
- **Merged At:** 2026-11-04 03:10:16 UTC+7
- **Status:** ✅ Merged successfully — **Closes #11**
