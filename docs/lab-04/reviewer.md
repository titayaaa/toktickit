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
| **PR-06** | Issue 32: IT Staff Dashboard API & UI | Issue #68 | `feature/32-staff-dashboard` | `lab4-staging` | `@jejaebubu` | ⏳ Under Review |
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
- **PR URL:** [titayaaa/toktickit#75](https://github.com/titayaaa/toktickit/pull/75)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Pending Re-review (Round 3 Changes Addressed)

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
**Review Date:** 2026-10-31  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> รีวิวรอบแรกนะคะ โดยรวมทำมาค่อนข้างครบและอ่านง่ายเลย โดยเฉพาะ traceability matrix กับ design tokens ทำไว้ดีแล้วค่ะ 👍
> 
> จุดที่เจอส่วนใหญ่ไม่ได้เป็นปัญหาเรื่องเนื้อหา แต่เป็นบางส่วนในเอกสารที่ยังไม่ตรงกับโค้ดจริงและ requirement ใน handout ค่ะ
> 
> ขอ Changes ก่อน merge นะคะ เพราะยังมีบางจุดที่ถ้า implement ตามเอกสารตอนนี้ อาจติดปัญหาได้
> 
> **ต้องแก้ก่อน (Blocking)**
> 1. **FK type ยังไม่ตรงกับ schema จริง**  
>    ใน specification.md ตอนนี้ ticketId, performedById, assigneeId เป็น String แต่ Ticket.id และ User.id ของจริงเป็น Int ค่ะ ทำให้ relation กันไม่ได้  
>    แก้ FK พวกนี้เป็น Int  
>    ส่วน ActionTaken.id จะใช้ cuid เหมือนเดิมก็ได้  
>    sample ID ใน api-spec.md เช่น usr_staff_01 / clt_act_... ก็ควรแก้ให้ตรงกับ type จริงด้วยค่ะ
> 2. **ชื่อ field ของ dashboard ยังไม่ตรงกับ model จริง**  
>    ในเอกสารใช้ title, priority, assignedTo / assignedToId แต่ใน model จริงใช้ summary, itPriority / requestedPriority, ownerId / owner  
>    แนะนำให้ใช้ชื่อเดียวกับของจริง หรือถ้าจะใช้ชื่ออีกแบบ ให้ระบุ mapping ไว้ให้ชัดค่ะ
> 3. **Transition matrix ยังไม่ครบ**  
>    ตอนนี้ยังขาด Cancelled และยังไม่ได้บอกว่า role ไหนเปลี่ยนจากสถานะไหนไปสถานะไหนได้บ้าง  
>    ตาม handout มีทั้งหมด 8 statuses: New, Open, In Progress, Waiting for Requester, Resolved, Closed, Reopened, Cancelled  
>    ในแอปมี Reopened กับ Cancelled อยู่แล้ว เลยควรใส่ transition และ role ให้ครบค่ะ
> 4. **Concurrency 409 ยังไม่ได้บอกว่าจะตรวจยังไง**  
>    ใน spec บอกว่าจะคืน 409 เมื่อข้อมูลถูกแก้พร้อมกัน แต่ยังไม่มีวิธี detect  
>    อาจใช้ version หรือเทียบ updatedAt / If-Match  
>    แล้วเพิ่ม payload กับ test สำหรับกรณี stale update ด้วยค่ะ
> 5. **Status code ของ Resolution Gate ยังไม่ตรงกัน**  
>    บางจุดเขียน 400/409 แต่ AC และ API test ใช้ 409  
>    แนะนำให้ใช้ 409 Conflict เหมือนกันทั้งหมด จะได้ไม่สับสนค่ะ
> 6. **Route กับ field บางตัวที่เขียนไว้ยังไม่มีในโค้ดจริง**  
>    ใน api-spec.md มี route สำหรับเปลี่ยน status แยกออกมา และมี resolutionSummary แต่ตอนนี้แอปใช้ PATCH /api/tickets/:id และใน Ticket model ยังไม่มี resolutionSummary  
>    ถ้าจะใช้ของเดิมก็แก้ spec ให้ตรงกับ route ปัจจุบัน  
>    แต่ถ้าจะเพิ่ม field ใหม่ ต้องใส่ไว้ใน migration section ด้วยค่ะ
> 7. **result required แต่ขัดกับ Action ที่เป็น PENDING**  
>    ตอนนี้กำหนดว่า result ต้องมี 2–1000 ตัวอักษร แต่ถ้า Action เพิ่งสร้างและยังเป็น PENDING ก็อาจยังไม่มี result  
>    แนะนำให้ result เป็น optional ตอน PENDING / IN_PROGRESS แล้วค่อยบังคับตอนจบ Action ค่ะ
> 8. **Spec ยังขาดบาง section ที่ handout กำหนด**  
>    ยังต้องเพิ่ม:  
>    - UI Specification Summary + link/reference ไป ui-spec.md  
>    - Assumptions and Decisions  
>    - Migration / backfill / rollback  
>    - Seed data  
>    - Idempotency สำหรับป้องกัน double-submit / retry ค่ะ
> 9. **tests.md ตอนนี้สถานะยังไม่ตรงกับของจริง**  
>    ทุก test เป็น Pass ทั้งที่ยังไม่ได้ implement  
>    ควรเปลี่ยนเป็น Planned หรือ Not run ก่อน  
>    path ฝั่ง client ควรเป็น client/tests/lab-04/  
>    และยังขาด test บางส่วน เช่น UI style, performance smoke, migration, concurrency/stale update, safe failure, accessibility, duplicate submission และ transition matrix ค่ะ
> 10. **reviewer.md มีบางส่วนที่เขียนเหมือนมีหลักฐานครบแล้ว**  
>     ตอนนี้เขียนว่าเป็น "Verbatim Records ครบถ้วน" แต่บาง Part ยังว่าง และ PR #76–84 ยังไม่มีจริง  
>     แนะนำให้เปลี่ยนเป็น template ว่า "จะอัปเดตเมื่อมี PR" ก่อน แล้วค่อยใส่หลักฐานจริงทีหลังค่ะ
> 11. **ai-use.md มีบางส่วนที่พูดถึงงานที่ยังไม่ได้ทำ**  
>     ตอนนี้มีการเขียนว่า AI ช่วย implement migration/API/UI/tests รวมถึง zero regression, 100% coverage และ visual audit แต่ PR นี้ยังเป็น docs อยู่  
>     แนะนำให้เขียนเฉพาะสิ่งที่ทำจริงในตอนนี้ก่อน แล้วค่อยอัปเดตหลัง implement ค่ะ
> 12. **Accessibility checklist ยังไม่ควรติ๊กครบ**  
>     ตอนนี้ติ๊ก [x] ไว้หมดแล้ว แต่บางสียัง contrast ไม่ถึง AA เช่น #10b981, #d97706, #f59e0b บนพื้นขาว  
>     อาจเปลี่ยนเป็นสีที่เข้มขึ้น หรือถ้าใช้เป็น badge ให้ใช้คู่กับข้อความสีเข้มที่อ่านชัดค่ะ
> 
> **จุดที่ควรปรับเพิ่ม แต่ไม่ถึงกับ block merge**
> - api-spec.md เขียนว่าใช้ session cookie หรือ Bearer แต่แอปจริงใช้ Bearer อย่างเดียว ควรแก้ให้ตรงกันค่ะ
> - มี GET .../actions-taken/:actionId ใน specification แต่ใน api-spec ยังไม่มี endpoint นี้
> - FR-07 พูดถึง "deleting" แต่ยังไม่มี DELETE endpoint ถ้าไม่อยู่ใน scope ตัดออกได้ค่ะ
> - Requester ownership ตอนนี้เอกสารใช้ 403 แต่โค้ดจริงใช้ 404 เพื่อไม่เปิดเผยว่า ticket มีอยู่ ควรเลือกให้ตรงกัน
> - GET actions ควรระบุ orderBy / pagination
> - Dashboard ควรเพิ่ม timezone/date boundary และ empty state ค่ะ

#### 💬 Round 1 Author Response & Code Fixes by @titayaaa (commit `ddd8350`)
**Response Date:** 2026-10-31  
**Commit Reference:** `ddd8350`  
**Author Response (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและช่วยดักจุดสำคัญมาก ๆ เลยนะคะ ตรวจสอบและแก้ไขปรับปรุงให้ตรงกับโค้ดจริงและโจทย์ Lab 4 ครบถ้วนทุกข้อแล้วใน commit `ddd8350` ค่ะ 
> 
> ### 1. `specification.md`
> - ปรับ Foreign Key ในโมเดล `ActionTaken` (`ticketId`, `performedById`, `assigneeId`) เป็น `Int` ให้ตรงกับ `Ticket.id` และ `User.id` เรียบร้อยค่ะ
> - ปรับชื่อ field ของ Dashboard ให้ตรงกับโมเดลจริง (`summary`, `itPriority`, `ownerId`)
> - เพิ่ม Ticket Status Transition Matrix ครบทั้ง 8 สถานะ (`New`, `Open`, `In Progress`, `Waiting for Requester`, `Resolved`, `Closed`, `Reopened`, `Cancelled`) พร้อมระบุ Role ที่มีสิทธิ์เปลี่ยนในแต่ละสถานะชัดเจน
> - ระบุกลไก Concurrency Stale Update โดยใช้ `expectedUpdatedAt` เทียบกับ `ticket.updatedAt` หากไม่ตรงจะคืน `409 Conflict`
> - รวมเป็น `409 Conflict` สำหรับกรณี Resolution Gate และ Stale Update ตรงกันทั้งหมด
> - ปรับ `result` ให้เป็น optional ตอนสถานะเป็น `PENDING` / `IN_PROGRESS` และจะบังคับกรอกเฉพาะตอนสถานะเป็น `COMPLETED`
> - เพิ่ม Section ครบตาม Handout: UI Specification Summary, Assumptions & Decisions (ระบุเหตุผลการออกแบบ DB 3 ข้อ), Migration/Backfill/Rollback, Seed data, และ Idempotency ป้องกัน double-submit
> - ตัดคำว่า "deleting" ออกจาก FR-07 เพื่อสะท้อนความเป็น Append-only audit trail ค่ะ
> 
> ### 2. `api-spec.md`
> - ปรับ Sample ID เป็นตัวเลข integer จริง (เช่น `ticketId: 101`, `performedById: 2`, `assigneeId: 3`)
> - เปลี่ยนชื่อ field ให้ตรงกับโมเดลจริง (`summary`, `itPriority`, `owner`)
> - ระบุการใช้ `Authorization: Bearer <token>` ชัดเจนเพียงรูปแบบเดียว
> - เพิ่ม Endpoint `GET /api/tickets/:id/actions-taken/:actionId` ในสเปกเรียบร้อยค่ะ
> - ปรับกรณี Requester เข้าดูตั๋วผู้อื่นให้ตอบกลับ `404 Not Found` เพื่อทำ Data Isolation
> - เพิ่ม query `orderBy: desc` และระบุ Timezone UTC ISO-8601 พร้อม Empty state ของ Dashboard ให้ครบถ้วนค่ะ
> 
> ### 3. `ui-spec.md`
> - เพิ่ม Dropdown เลือก Assignee (กรองเฉพาะ active staff), ตัวเลือกสถานะ Action Taken และแจ้งเตือน Modal Resolution Gate
> - ปรับปรุงคู่สี Badge ให้มีค่า Contrast Ratio สูง ($\ge 7.1:1$) เช่น พื้นสีอ่อนคู่กับตัวหนังสือสีเข้ม (#92400e บน #fffbeb, #166534 บน #f0fdf4) เพื่อให้ผ่านเกณฑ์ WCAG AA ชัดเจน
> - ปรับ Checklist ให้เป็น `[ ]` รอการตรวจสอบจริงในขั้นตอน UI Implementation ค่ะ
> 
> ### 4. `tests.md`
> - ปรับสถานะทุกเทสต์เป็น `Planned` ตามหลัก TDD (No Premature Data)
> - เพิ่มชุดทดสอบครอบคลุม: UI style (`STYLE-01`), Performance smoke (`PERF-01`), Migration (`MIG-01`), Concurrency 409 (`API-14`), Safe error (`SAFE-01`), Accessibility (`A11Y-01`), Double-submit (`DUP-01`) และ Transition Matrix (`WORKFLOW-01`) ค่ะ
> 
> ### 5. `reviewer.md` & `ai-use.md`
> - ปรับ `reviewer.md` เป็น Template บันทึกตามลำดับ PR ที่เกิดขึ้นจริง
> - ปรับ `ai-use.md` ให้ระบุเฉพาะบทบาท Specification Agent ที่ทำจริงในสปรินต์นี้ และเตรียมพื้นที่ไว้สำหรับ Coding Agent ในสปรินต์ถัดไปค่ะ
> 
> รบกวนช่วยตรวจดูอีกรอบนะคะ ขอบคุณมาก ๆ เลยค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Changes Requested)
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ขอบคุณที่แก้ให้นะคะ รอบนี้ดีขึ้นเยอะเลยค่ะ หลายจุดที่คุยกันรอบก่อนแก้เรียบร้อยแล้ว ทั้ง FK ที่เปลี่ยนเป็น Int, field ของ Dashboard, result ที่เป็น optional, tests ที่เปลี่ยนเป็น Planned, ai-use.md และ badge ของ Actions Taken ตรงตามที่ขอแล้วค่ะ
> 
> เหลืออีกนิดหน่อยที่อยากให้แก้ก่อน merge นะคะ เพราะตอนนี้ยังมีบางจุดที่เอกสารกับโค้ดจริงไม่ตรงกัน ถ้า implement ตามเอกสารเลยอาจทำให้ behavior หรือ test ไม่ตรงกับระบบจริงค่ะ
> 
> 1. Transition matrix ยังไม่ตรงกับโค้ดจริง
> ในโค้ดจริง server/src/routes/staff.ts มีสถานะ PENDING และ transition บางตัวต่างจากใน specification.md เช่น
> 
> OPEN ยังไป RESOLVED ตรง ๆ ไม่ได้
> IN_PROGRESS / WAITING_FOR_REQUESTER กลับไป PENDING ได้
> REOPENED ไป PENDING ได้ แต่ไป WAITING_FOR_REQUESTER ไม่ได้
> แต่ matrix ในเอกสารตอนนี้ยังไม่มี PENDING และบาง transition ไม่ตรงกับโค้ดค่ะ
> 
> แนะนำให้เอา matrix จาก VALID_TRANSITIONS ในโค้ดมาใช้ให้ตรงกันเลยค่ะ หรือถ้าจะยึด 8 statuses ตาม handout ก็ควรระบุให้ชัดว่า PENDING เป็นของเดิม (legacy) / ไม่อยู่ใน scope ของ Lab นี้ และต้องวางแผนให้โค้ดกับเอกสารตรงกันด้วยค่ะ
> 
> 2. Route และ status code ยังไม่ตรงกัน
> Route ที่โค้ดใช้จริงตอนนี้คือ
> 
> PATCH /api/staff/tickets/:id/status
> PATCH /api/staff/tickets/:id/resolve
> แต่ใน api-spec.md ยังมี route แบบ /api/tickets/:id/status หรือ PUT /api/staff/tickets/:id/status ซึ่งไม่มีในโค้ดจริงค่ะ
> 
> อีกจุดคือ /status ไม่ได้ใช้สำหรับ Resolve โดยตรง ถ้าส่ง RESOLVED จะได้ 422 และต้องไปใช้ /resolve แทน
> 
> รวมถึงกรณี transition ไม่ถูกต้องหรือไม่มี resolutionSummary โค้ดจริงก็คืน 422 แต่ในเอกสารบางจุดยังเขียนเป็น 400 อยู่ค่ะ
> 
> ตรงนี้แนะนำให้ปรับ route และ status code ในเอกสารให้ตรงกับ behavior จริงทั้งหมดค่ะ
> 
> แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนนิดนึงนะคะ — resolutionSummary มีอยู่ใน schema.prisma แล้วค่ะ ไม่ต้องเพิ่ม field หรือ migration ใหม่สำหรับตัวนี้
> 
> 3. Requester Dashboard ต้องเช็กเรื่อง ownership เพิ่มอีกนิด
> ตอนนี้ระบบมีทั้ง requesterId และ userId และ flow สร้าง ticket เดิมยังมีการใช้ requesterId อยู่ค่ะ
> 
> แต่ใน spec ตอนนี้กำหนดให้ Dashboard ดูแค่
> 
> userId == currentUser.id
> 
> อย่างเดียว ซึ่งอาจทำให้ ticket เก่าที่ผูกกับ requesterId ไม่ถูกนับใน Dashboard
> 
> ตรงนี้อยากให้ระบุให้ชัดว่าจะเช็กจาก userId, requesterId หรือใช้ทั้งสองแบบ รวมถึงจะใช้ email fallback เหมือน logic เดิมใน app.ts หรือไม่ค่ะ จะได้ไม่ทำให้ ticket เก่าหายจาก Dashboard
> 
> 4. Migration ที่เขียนไว้ในเอกสารยังใช้จริงไม่ได้
> ใน specification.md ตอนนี้เขียนเหมือน migration ถูก execute แล้ว แต่ใน repo ยังไม่มี migration file นี้ค่ะ
> 
> อีกอย่างคือ CREATE TYPE IF NOT EXISTS ใช้กับ PostgreSQL แบบนี้ไม่ได้ ถ้าต้องการให้รันซ้ำได้อย่างปลอดภัย ต้องใช้วิธีอื่น เช่น DO $$ ... เพื่อ handle กรณี type มีอยู่แล้ว
> 
> ถ้ายังไม่ได้ทำ migrationจริง แนะนำให้เปลี่ยนข้อความเป็นแผนที่จะทำใน Issue 28 ก่อน จะตรงกับสถานะปัจจุบันมากกว่าค่ะ
> 
> 5. Accessibility ของ status badge ยังต้องปรับอีกนิด
> Action badge ที่แก้มาใหม่ผ่านแล้วค่ะ แต่ status badge บางสียังมี contrast ไม่ถึง AA ถ้าเอาสีนั้นไปเป็นตัวหนังสือบนพื้นขาว เช่น #0284c7, #d97706 และ #16a34a
> 
> แนะนำให้ทำเป็นคู่ background/text เหมือน Action badge หรือเปลี่ยนสีตัวหนังสือให้เข้มขึ้น แล้วค่อยติ๊ก accessibility checklist ว่าผ่านค่ะ
> 
> จุดเล็ก ๆ ที่ควรปรับเพิ่ม
> api-spec.md เขียนว่า Bearer only แต่ server จริงรองรับทั้ง cookie และ Bearer ถ้าหมายถึงเฉพาะฝั่ง Client ให้เขียนกำกับไว้ให้ชัดค่ะ
> เอกสารบอกว่า Requester เปิด ticket ของคนอื่นจะได้ 404 แต่โค้ดปัจจุบันใน ticket detail/comments ยังคืน 403 ถ้าจะเปลี่ยนเป็น 404 ควรระบุว่าเป็นงานที่ต้องแก้โค้ดเพิ่มค่ะ
> GET actions มี orderBy แล้ว แต่ยังไม่มี pagination
> ใน ui-spec.md ใช้ owner / priority แต่ query จริงใช้ ownerId / itPriority
> DoD ยังไม่ควรติ๊ก [x] ว่า merged เพราะ PR ตอนนี้ยังอยู่ระหว่าง review ค่ะ
> tests.md ของ WORKFLOW-01 ยังเขียนว่าคาดหวัง 400 แต่โค้ดจริงคืน 422
> แล้วขอแก้ข้อมูลจากรีวิวรอบก่อนของเราเอง 4 จุดนะคะ
> 
> resolutionSummary มีอยู่แล้ว ไม่ต้องเพิ่ม migration
> path client/src/test/lab-04/ ถูกแล้ว ไม่ต้องเปลี่ยน
> Server รองรับทั้ง cookie และ Bearer ไม่ใช่ Bearer อย่างเดียว
> Requester เปิด ticket/detail/comments ที่ไม่ใช่ของตัวเอง ตอนนี้โค้ดจริงคืน 403 ไม่ใช่ 404 ค่ะ
> โดยรวมรอบนี้เหลือไม่เยอะแล้วค่ะ หลัก ๆ ฝากแก้ 5 ข้อด้านบนให้เอกสารตรงกับโค้ดจริงมากขึ้น แล้ว ping มาได้เลยนะคะ เดี๋ยวช่วยตรวจรอบสุดท้ายให้อีกทีค่ะ
> 
> ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 2 Author Response & Code Fixes by @titayaaa
**Response Date:** 2026-11-01  
**Author Response (Verbatim):**

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
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ขอบคุณที่แก้รอบนี้นะคะ เช็กที่ commit 5b20200 แล้ว รอบนี้ 4 จุดหลักที่คุยกันก่อนหน้าผ่านแล้วค่ะ ทั้ง transition matrix, route/status code, migration plan, ownership formula แล้วก็ status badge ตอนนี้ผ่าน AA แล้ว
> 
> เหลืออีก 4 จุดที่อยากให้แก้ก่อน merge นะคะ
> 
> 1. Accessibility ตอนนี้ผ่าน AA แต่ยังไม่ถึง AAA
> ใน ui-spec.md กับ ai-use.md ตอนนี้เขียนว่าเป็น WCAG AAA (>= 7:1) แต่สีบางตัวยังได้ประมาณ 5–6 กว่า ๆ ค่ะ
> 
> จริง ๆ สีที่ใช้อยู่ ผ่าน AA แล้ว แค่ยังไม่ถึง AAA
> 
> ถ้าเราตั้งใจใช้เกณฑ์ AA แนะนำให้แก้ข้อความเป็น WCAG AA >= 4.5:1 จะตรงกับค่าจริงที่สุดค่ะ
> 
> แต่ถ้าต้องการ AAA จริง ๆ ค่อยเปลี่ยนเป็นสีที่เข้มขึ้น เช่น
> 
> NEW → #0c4a6e
> IN_PROGRESS → #78350f
> PENDING → #713f12
> RESOLVED → #14532d
> ส่วนตัวคิดว่าใช้ AA ก็พอค่ะ แค่แก้ข้อความไม่ให้ claim เกินค่าจริง
> 
> 2. Default status ของ Action ยังเขียนไม่ตรงกัน
> ใน specification.md ตอนนี้เป็น
> 
> @default(COMPLETED)
> 
> แต่ใน api-spec.md เป็น
> 
> default PENDING
> 
> แนะนำให้ใช้ PENDING เหมือนกันทั้งสองที่ค่ะ เพราะตอนสร้าง Action ใหม่ควรเริ่มจาก PENDING ก่อน และ result ตอนนี้ก็เป็น optional อยู่แล้ว
> 
> 3. Index ใน model กับคำอธิบายยังไม่ตรงกัน
> ใน model ตอนนี้มี index แยกของ ticketId, assigneeId และ status
> 
> แต่ในคำอธิบายด้านล่างเขียนว่ามี composite index ของ ticketId + status ค่ะ
> 
> ตรงนี้เลือกได้ว่าจะ
> 
> เพิ่ม @@index([ticketId, status]) ให้ตรงกับคำอธิบาย
> หรือแก้คำอธิบายไม่ให้บอกว่าเป็น composite index
> เอาแบบไหนก็ได้ค่ะ ขอแค่ model กับเอกสารตรงกัน
> 
> 4. เรื่อง 403 / 404 ยังมีบางส่วนเขียนไม่ตรงกัน
> ใน Assumption 3 ตอนนี้เขียนว่า Requester เปิด ticket ของคนอื่นจะได้ 404
> 
> แต่ใน Section 8 กับ api-spec.md ระบุว่า ticket detail เดิมของระบบยังคืน 403 อยู่ค่ะ
> 
> แนะนำให้เขียนแยกให้ชัดว่า
> 
> Actions Taken endpoints → ใช้ 404
> Legacy ticket detail/comments → ตอนนี้ยังใช้ 403
> ถ้าจะเปลี่ยนของเดิมเป็น 404 ค่อยทำใน Issue 34 ค่ะ
> แบบนี้จะตรงกับ behavior ปัจจุบันและไม่ทำให้คน implement สับสนค่ะ
> 
> จุดเล็ก ๆ ที่ฝากแก้เพิ่ม
> reviewer.md ยังเขียนว่า Round 1 อยู่ ควรเปลี่ยนเป็น Round 2 ค่ะ
> ด้านบนของ reviewer.md ยังมีคำว่า "Verbatim Records ครบถ้วน" อยู่ ทั้งที่ยังอยู่ระหว่าง review แนะนำให้ปรับข้อความให้ตรงกับสถานะจริง
> tests.md ยังเขียนว่า 8-state แต่ตอนนี้ matrix มี PENDING รวมเป็น 9 statuses แล้ว
> ใน specification.md บางจุดก็ยังเขียน "all 8 statuses" อยู่ ควรแก้ให้ตรงกับ matrix ใหม่ค่ะ
> requesterId === currentUser.id อาจเทียบ ID คนละ model กัน (RequesterUser.id กับ User.id) แนะนำให้ใช้ relation/email ในการหา ownership จะปลอดภัยกว่าค่ะ
> Idempotency ตอนนี้ยังป้องกันแค่ฝั่ง frontend ถ้าต้องการให้ retry แล้วไม่สร้างข้อมูลซ้ำจริง ๆ ควรมี idempotency key ฝั่ง server ด้วย
> 409 จาก expectedUpdatedAt และ Resolution Gate ตอนนี้ยังไม่มีใน staff.ts ถ้ายังไม่ได้ implement แนะนำให้เขียนกำกับว่า Planned for Issue 31 ไว้ก่อนค่ะ
> โดยรวมรอบนี้ใกล้แล้วค่ะ หลัก ๆ ฝากแก้ 4 ข้อด้านบน แล้วก็อัปเดตสถานะใน reviewer.md ให้ตรงกับรอบปัจจุบันอีกนิด น่าจะพร้อม approve ในรอบหน้าแล้วค่ะ
> 
> ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 3 Author Response & Code Fixes by @titayaaa
**Response Date:** 2026-11-01  
**Author Response (Verbatim):**

> ขอบคุณสำหรับคำแนะนำรอบที่ 3 มาก ๆ ค่ะ ตรวจสอบและแก้ไขครบถ้วนทั้ง 4 ประเด็นหลักและจุดเล็ก ๆ ทั้งหมดแล้วค่ะ:
> 
> 1. **Accessibility Standards (WCAG 2.1 AA):** ปรับใน `ui-spec.md` และ `ai-use.md` ให้ระบุเกณฑ์มาตรฐานชัดเจนเป็น **WCAG 2.1 AA ($\ge 4.5:1$)** เพื่อให้ตรงกับค่า Contrast จริงของคู่สี Background/Text โดยไม่กล่าวอ้างเกินจริงค่ะ
> 2. **Default Status ของ Action:** ใน `specification.md` ปรับโมเดล `ActionTaken.status` เป็น `@default(PENDING)` สอดคล้องกับ `api-spec.md` และธรรมชาติของงานที่เพิ่งสร้างซึ่งยังไม่มีผลลัพธ์ค่ะ
> 3. **Composite Index ตรงกันทั้งโมเดลและคำอธิบาย:** เพิ่ม `@@index([ticketId, status])` ในโมเดล `ActionTaken` (`specification.md`) เพื่อให้ตรงกับคำอธิบาย และช่วยเพิ่มประสิทธิภาพ Query ตรวจสอบ Resolution Gate (`COUNT(*) WHERE ticketId = ? AND status IN ('PENDING', 'IN_PROGRESS')`) ได้อย่างรวดเร็วค่ะ
> 4. **แยกความแตกต่าง 403 vs 404 ชัดเจน:** ใน Assumption 3, Section 8 และ `api-spec.md` ระบุแยกชัดเจนว่า:
>    - Actions Taken Endpoints (`/api/tickets/:id/actions-taken`) ตอบกลับด้วย `404 Not Found` สำหรับ Requester ที่ไม่ได้เป็นเจ้าของตั๋ว เพื่อป้องกันการเดาข้อมูล (Data Isolation)
>    - Legacy Ticket Detail / Comments ในโค้ดปัจจุบันยังคงตอบกลับ `403 Forbidden` (โดยมีแผน Re-factor ให้เป็น 404 พร้อมกันใน Issue 34 Hardening)
> 5. **จุดเล็ก ๆ ที่ปรับปรุงเพิ่มเติม:**
>    - ปรับสถานะใน `reviewer.md` จาก Round 1 เป็น Round 2 และ Round 3 เรียบร้อยแล้ว พร้อมปรับข้อความส่วนหัวให้สะท้อนการบันทึกตามรอบจริง
>    - อัปเดตใน `tests.md` (WORKFLOW-01) และ `specification.md` เป็น **9-state Ticket Transition Matrix** (รวม legacy `PENDING`)
>    - ปรับเงื่อนไข Requester Ownership ให้เช็กผ่าน relation และ verified email: `ticket.userId === currentUser.id || ticket.requesterUser?.email === currentUser.email || ticket.requester?.email === currentUser.email` เพื่อป้องกันปัญหา ID ชนกันข้ามโมเดล (`RequesterUser.id` vs `User.id`)
>    - ระบุแผนรองรับ Idempotency Key ฝั่งเซิร์ฟเวอร์ใน BR-16 (Planned for Issue 29)
>    - ระบุว่า Concurrency Check (`expectedUpdatedAt`) และ Resolution Gate (409 Conflict) เป็นฟังก์ชันที่ **Planned for Issue 31 (PR-05)** เนื่องจากยังไม่มีใน baseline `staff.ts`
> 
> รบกวนตรวจทานรอบสุดท้ายนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 4 Final Review & Approval by @jejaebubu
**Review Date:** 2026-11-01  
**Verdict:** ✅ Approved (Ready to Merge)  
**Review Comments (Verbatim):**

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

#### 🔀 Merge Record
- **Merged By:** `@jejaebubu`
- **Merge Date:** 2026-11-01
- **Merge Commit:** `4a55567`
- **Target Branch:** `lab4-staging`
- **Final Status:** ✅ Approved & Merged

---

### PR #76: Issue 28: Database Migration, Schema Evolution & Seed Data for Actions Taken
- **PR URL:** [titayaaa/toktickit#76](https://github.com/titayaaa/toktickit/pull/76)
- **Feature Branch:** `feature/28-db-and-seed`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Pending Peer Review

#### 💬 Round 1 Peer Review by @jejaebubu (Changes Requested)
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ตรวจ schema, migration, seed, tests และ docs เทียบกับ Issue/BR แล้วนะคะ โดยรวมทำได้ดี แต่ขอ Changes Requested ก่อนค่ะ เพราะมีจุดหนึ่งที่อาจกระทบการสร้าง ActionTaken ใน Issue ถัดไป
> 
> 🔴 **Blocking: Seed กำหนด ActionTaken.id เอง ทำให้ sequence ไม่ขยับตาม**
> 
> ใน `server/prisma/seed.ts:311-449` มีการใช้ `id: 1..6` ใน `actionTaken.upsert`
> 
> ปัญหาที่พบเมื่อเริ่มจาก DB ใหม่ แล้วรัน `db push --force-reset` ตามด้วย `npm run prisma:seed` คือ
> 
> `actions_taken_id_seq.last_value = 1`  
> แต่ `MAX(actions_taken.id) = 6`  
> พอเรียก `prisma.actionTaken.create()` จะเจอ error P2002 ที่ target id เพราะ sequence สร้าง ID ซ้ำกับข้อมูลที่มีอยู่แล้ว  
> ถ้าปล่อยไว้ API ที่ใช้สร้าง ActionTaken ใน Issue ถัดไปจะไม่สามารถ insert ข้อมูลได้ค่ะ
> 
> **แนวทางแก้ที่แนะนำ**
> 
> เอา id ออกจาก seed แล้วใช้ natural key ในการ upsert เช่น `ticketId + actionDateTime + actionDescription`  
> หรือถ้าต้องการใช้ explicit ID ต่อ ให้เรียก `setval` เพื่อปรับ sequence หลัง seed ให้ตรงกับ ID สูงสุด  
> และรบกวนเพิ่ม test ที่ลองสร้าง ActionTaken ใหม่ 1 รายการหลัง seed ด้วยนะคะ เพื่อป้องกันปัญหานี้กลับมาอีก
> 
> ปัญหา sequence แบบเดียวกันมีอยู่เดิมใน `publicComment` และ `internalNote` ด้วย โดย full suite บน clean seed fail 6 tests ซึ่งเป็นปัญหาที่มีอยู่ใน base อยู่แล้ว แต่ PR นี้เพิ่มความเสี่ยงใหม่ให้ ActionTaken ค่ะ อย่างน้อยขอให้แก้ ActionTaken ก่อน และถ้าจะแก้ seed รอบนี้ แนะนำให้จัดการทั้ง 3 ตารางไปพร้อมกันเลยค่ะ
> 
> 🟠 **Should fix: requesterId hardcode**
> 
> ใน `server/prisma/seed.ts:360,459,480` มีการกำหนด `requesterId: 1/2/3` ไว้ตรง ๆ
> 
> ถ้าเอา seed ไปรันบน DB ที่มี Requester ID ไม่ตรงกับ fresh DB อาจทำให้ ticket ไปผูกกับ requester ผิดคน หรือเกิด FK error ได้ค่ะ
> 
> แนะนำให้ lookup `RequesterUser` จาก email ก่อน แล้วนำ `.id` ที่ได้มาใช้แทนการ hardcode ค่ะ
> 
> 🟡 **Minor: จุดที่แนะนำให้เก็บเพิ่ม**
> 
> - `docs/lab-04/reviewer.md:672` ระบุ `782d54e / db7e326` เป็น commit ที่เกี่ยวข้อง แต่ทั้งสองเป็น fix/docs commit ไม่ใช่ merge commit โดย merge commit ของ PR #106 คือ `23166db`
> - `server/prisma/seed.ts:350` ประกาศ `staffCharlie` ไว้แต่ไม่ได้ใช้งาน
> - เพิ่ม negative test อีก 2 กรณี:
>   - `followUpRequired=false` แล้ว `followUpNote=null`
>   - เมื่อ `status` เป็น `IN_PROGRESS` แล้ว `result=null`
> - `server/prisma/seed.ts:290` มี indentation ไม่สม่ำเสมอ เป็นแค่เรื่อง formatting ค่ะ
> 
> ✅ **ผลตรวจสอบที่ผ่านแล้ว**
> 
> - `npm run build` ผ่าน
> - Migration SQL สามารถ apply ซ้ำ 2 ครั้งได้
> - `db-seed.test.ts` ผ่าน 10/10
> - Full suite ผ่าน 128 tests และ fail 6 tests โดยทั้ง 6 ตัวเป็นปัญหาเดิมที่มีอยู่ใน base ได้แก่ attachment ไม่มีใน seed และ explicit comment/note IDs ไม่ใช่ regression ใหม่จาก PR นี้
> - `prisma migrate deploy` บน DB ใหม่ยังติดที่ base migration `20260917000000_lab3_users_and_workflow` เพราะ `TicketPriority` missing ซึ่งเป็นปัญหาเดิม ไม่ได้เกิดจาก PR นี้ค่ะ
> 
> **สรุป:** โครงสร้าง schema, migration และ tests ทำได้ดี และตรงกับ BR หลักแล้วค่ะ แต่ขอให้แก้เรื่อง ActionTaken sequence ก่อน merge และแนะนำให้แก้ requesterId ที่ hardcode ไว้ด้วย หลังแก้แล้ว ping กลับมาให้ re-review ได้เลยค่ะ

#### 💬 Round 2 Author Response & Code Fixes by @titayaaa
**Response Date:** 2026-11-01  
**Author Response (Verbatim):**

> ขอบคุณสำหรับคำแนะนำและการตรวจทานที่ละเอียดรอบคอบมาก ๆ ค่ะ แก้ไขครบถ้วนทุกจุดตามคำแนะนำทั้งระดับ Blocking, Should Fix และ Minor ดังนี้ค่ะ:
> 
> 1. **🔴 แก้ปัญหา PostgreSQL Sequence ไม่ขยับตาม Explicit ID:**
>    - ใน `server/prisma/seed.ts` เพิ่มคำสั่ง `setval` ซิงค์ sequence ของทั้ง 3 ตาราง (`actions_taken`, `public_comments`, `internal_notes`) ให้ตรงกับ `MAX(id)` ของข้อมูลที่ seed ลงไป
>    - เพิ่มเทสต์ใน `server/tests/lab-04/db-seed.test.ts` ที่ทดลองเรียก `prisma.actionTaken.create()` หลัง seed สำเร็จ เพื่อยืนยันว่า auto-increment ทำงานถูกต้องและได้ id $\ge 7$ โดยไม่เกิด error P2002 duplicate key
> 2. **🟠 แก้ RequesterId Hardcode:**
>    - ใน `server/prisma/seed.ts` ทำการ lookup `RequesterUser` จาก verified email (`jennifer.anderson@example.com`, `michael.brown@example.com`, `sarah.johnson@example.com`) ก่อนนำ `.id` มาผูกเข้ากับ `ticket` แทนการ hardcode `1/2/3` เพื่อป้องกัน FK mismatch
> 3. **🟡 เก็บตกจุดย่อย (Minor Fixes):**
>    - ใน `docs/lab-04/reviewer.md` แก้ไข Merge commit ของ PR #106 เป็น `23166db` ถูกต้อง
>    - ลบตัวแปร `staffCharlie` ที่ประกาศค้างไว้ใน `seed.ts` ออก
>    - เพิ่ม Negative Test อีก 2 กรณีใน `db-seed.test.ts` (รวมเป็น 13 เทสต์):
>      - ตรวจสอบว่า Action ที่ `isFollowUpRequired === false` จะต้องมี `followUpNote === null` (BR-07)
>      - ตรวจสอบว่า Action ที่สถานะ `IN_PROGRESS` สามารถมี `result === null` ได้จริง (BR-16)
>    - ปรับปรุง Indentation ใน `seed.ts` บรรทัดที่ 290 ให้เป็นระเบียบสวยงาม
> 
> รบกวนตรวจทานรอบที่ 2 นะคะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Review by @jejaebubu (Approved)
**Review Date:** 2026-11-01  
**Verdict:** 🟢 Approved  
**Review Comments (Verbatim):**

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

#### 💬 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#76](https://github.com/titayaaa/toktickit/pull/76)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `33922325eed3ee5deba3f7872f8b2193ef8bce8a`
- **Merged At:** 2026-11-01 18:03:13 +07:00 (11:03:13 UTC)
- **Status:** ✅ Merged successfully — **Closes #64**

---

### PR #77: Issue 29: Actions Taken Backend REST API & Authorization Middleware
- **PR URL:** [titayaaa/toktickit#77](https://github.com/titayaaa/toktickit/pull/77)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Pending Review (Round 1)
- **Scope & Objectives:**
  - `GET /api/tickets/:id/actions-taken`: คืนรายการ Action Taken เรียงตามวันเวลา พร้อมระบบ Data Isolation (ตอบ 404 สำหรับ Requester ที่เข้าดูตั๋วของผู้อื่น)
  - `POST /api/tickets/:id/actions-taken`: บันทึก Action Taken ใหม่ ผูก `performedById` จาก JWT อัตโนมัติ, ตรวจสอบ Assignee ว่าต้องเป็น IT Staff/Admin ที่ Active เท่านั้น (ตอบ 422), บังคับผลลัพธ์เมื่อ Completed (2-1000 ตัวอักษร), และบังคับโน้ตเมื่อมี Follow-up
  - `PATCH /api/tickets/:id/actions-taken/:actionId`: แก้ไขข้อมูลตาม Action Status Matrix (ห้ามย้อนจาก Completed/Cancelled), บังคับผลลัพธ์เมื่อ Completed, และล้างโน้ตเมื่อ Follow-up เป็น false
  - `GET /api/users/assignable`: ดึงเฉพาะ IT Staff และ Admin ที่ active สำหรับ dropdown
  - รวม `actionsTaken` ลงใน `GET /api/tickets/:id` รองรับหน้า Ticket Detail
  - เพิ่มชุดทดสอบ Integration API ครอบคลุม 11 เคสใน `server/tests/lab-04/actions-taken.api.test.ts`

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01
- **Verdict:** 🔴 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจโค้ด REST API, RBAC, tests และเอกสารของ PR [#77](https://github.com/titayaaa/toktickit/pull/77) (Issue 29) เทียบกับ schema.prisma, specification.md, api-spec.md และ tests.md แล้วนะคะ ภาพรวมโครงสร้าง endpoint GET/POST/PATCH /:id/actions-taken, GET /api/users/assignable, การดึง performedById จาก JWT, validateAssignee (422) และ state machine ของ Action status ทำไว้ดีเลยค่ะ
> แต่ขอ Changes Requested ก่อนนะคะ เพราะมีจุดที่ทำให้ npm run build (tsc) กับ vitest พังใน beforeAll และมีจุดเรื่อง ownership check กับ traceability matrix ที่ต้องปรับให้ตรงกันค่ะ
> 
> 🔴 **Blocking: ต้องแก้ก่อน Merge**
> 1. `server/tests/lab-04/actions-taken.api.test.ts` (บรรทัด 62–85): ขาด `relatedSystemId` และ `requestedPriority` ใน `prisma.ticket.create` + ผูก `requesterId` ข้ามตารางใน schema.prisma โมเดล Ticket กำหนดให้ `relatedSystemId` และ `requestedPriority` เป็น required fields แต่ใน `beforeAll` ตอนสร้าง `ownTicket` และ `otherTicket` ไม่ได้ส่ง 2 ฟิลด์นี้เข้าไป ทำให้:
>    - รัน npm run build (tsc) ไม่ผ่าน เพราะติด TypeScript error (Property 'relatedSystemId' is missing, Property 'requestedPriority' is missing)
>    - รัน vitest run tests/lab-04/actions-taken.api.test.ts พังตั้งแต่ beforeAll ด้วย PrismaClientValidationError
>    - นอกจากนี้ `requesterId: requester.id / otherRequester.id` เอา `User.id` ไปใส่ในฟิลด์ `Ticket.requesterId` ซึ่งอ้างอิงตาราง `RequesterUser.id` ค่ะ  
>    *แนวทางแก้:* ดึง relatedSystem จาก `prisma.relatedSystem.findFirst({ where: { isActive: true } })` และ lookup RequesterUser จาก email (`reqJennifer`, `reqMichael`) แล้วส่ง `relatedSystemId`, `requestedPriority: TicketPriority.MEDIUM` และ `requesterId: reqJennifer.id` ให้ครบทั้ง ownTicket และ otherTicket ค่ะ
> 2. `server/src/routes/tickets.ts` (บรรทัด 226–231): การเช็ก `ticket.requesterId === currentUser.id` เสี่ยงเกิด Cross-model ID collision ใน `GET /api/tickets/:id/actions-taken`  
>    *แนวทางแก้:* เอาบรรทัด `ticket.requesterId === currentUser.id` ออก แล้วเช็กเฉพาะ `ticket.userId === currentUser.id || ticket.requester?.id === currentUser.id || ticket.requester?.email === currentUser.email || ticket.requesterUser?.email === currentUser.email` ค่ะ
> 
> 🟠 **Should Fix: ความสอดคล้องของ Traceability Matrix และ API Spec**
> 1. อัปเดต `docs/lab-04/tests.md` และปรับรหัส Test ID ใน `actions-taken.api.test.ts` ให้ตรงกัน: ปรับรหัสเทสต์ใน `actions-taken.api.test.ts` กับตารางใน `docs/lab-04/tests.md` ให้ตรงกันแบบ 1-ต่อ-1 และเปลี่ยนสถานะเทสต์ที่รันผ่านใน PR นี้เป็น `Pass` (พร้อมอัปเดต `docs/lab-04/ai-use.md` สำหรับ Issue 29 ด้วยนะคะ)
> 2. ปรับ `docs/lab-04/api-spec.md` (§2.1, §2.2) กับ `server/src/routes/tickets.ts` ให้ตรงกัน:
>    - `GET /api/tickets/:id/actions-taken/:actionId`: ใน specification.md §8 และ api-spec.md §2.2 ระบุว่ามี endpoint ดึง Action รายตัว แต่ใน tickets.ts ยังไม่มี route นี้
>    - Response shape และการเรียงลำดับของ `GET /api/tickets/:id/actions-taken`: ใน api-spec.md §2.1 เขียนว่าคืน `{ data: [...], meta: {...} }` และเรียง desc แต่โค้ดจริงใน tickets.ts คืนเป็น Array `res.status(200).json(actions)` และเรียง `actionDateTime: 'asc'` แนะนำให้แก้ api-spec.md §2.1 ให้ตรงกับที่โค้ดคืนจริง เพื่อไม่ให้ตอนทำ UI ใน Issue 30 สับสนค่ะ
> 
> 🟡 **Minor: จุดที่แนะนำให้เก็บเพิ่ม**
> 1. ใน `PATCH /:id/actions-taken/:actionId` โค้ดมีการล้าง `followUpNote = null` เมื่อ `isFollowUpRequired = false` ไว้ถูกต้องแล้ว แนะนำให้เพิ่ม test case ใน `actions-taken.api.test.ts` ที่ส่ง `PATCH { isFollowUpRequired: false }` แล้วเช็กว่า `followUpNote` กลายเป็น null จริงด้วยค่ะ
> 2. ใน POST และ PATCH: ถ้าส่ง `actionDateTime` ที่ไม่ใช่วันที่ที่ถูกต้อง (`isNaN(parsed.getTime())`) แนะนำให้ตอบ 400 Bad Request แทนการ fallback เงียบ ๆ
> 3. เช็กความยาว `result.length > 1000` ทุกสถานะ (ไม่ใช่เฉพาะตอน COMPLETED) และเช็ก `attachmentNotes.length > 500` ให้ตอบ 400 แทนการ `.slice(0, 500)`
> 4. ปรับความยาวขั้นต่ำของ `followUpNote` ในโค้ด (>= 1) กับใน api-spec.md (min 2 chars) ให้ตรงกันค่ะ

#### 💬 Author Response by @titayaaa (Changes Addressed)
- **Response Date:** 2026-11-01
- **Status:** 🔄 Changes Addressed — Ready for Re-Review
- **Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและแม่นยำมาก ๆ ค่ะ @jejaebubu ได้ทำการแก้ไขปรับปรุงครบถ้วนทุกข้อทั้ง Blocking, Should Fix และ Minor ใน commit ล่าสุดเรียบร้อยแล้วค่ะ:
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
> ตรวจสอบการคอมไพล์ผ่านฉลุยทั้ง `npm run build` (tsc) ฝั่ง Server และ Client เรียบร้อยค่ะ รบกวนช่วยตรวจซ้ำอีกรอบนะคะ ขอบคุณมากค่ะ! ✨

#### 💬 Round 2 Peer Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-01 19:00 UTC+7
- **Verdict:** 🟢 Approved
- **Review Summary:**
  - ยืนยันการแก้ไขครบถ้วนทุกข้อ: `relatedSystemId`, `requestedPriority`, `RequesterUser` lookup ใน test setup
  - การป้องกัน Cross-model ID collision ใน ownership check
  - Endpoint `GET /api/tickets/:id/actions-taken/:actionId` และการปรับ array response shape ใน `api-spec.md`
  - ตาราง Traceability Matrix ใน `tests.md` และ `ai-use.md`
  - รันการทดสอบและ build ผ่าน 100%

#### 💬 Merge Event by Reviewer @jejaebubu
- **Merged PR URL:** [titayaaa/toktickit#77](https://github.com/titayaaa/toktickit/pull/77)
- **Merged by:** `@jejaebubu` (Peer Reviewer)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `b13cb435cc1816edf2939f7ae59a3e321a7c43f0`
- **Merged At:** 2026-11-01 19:00:30 +07:00 (12:00:30 UTC)
- **Status:** ✅ Merged successfully — **Closes #65**

---

### PR #78: Issue 30: Actions Taken Frontend Component on Ticket Detail
- **PR URL:** [titayaaa/toktickit#78](https://github.com/titayaaa/toktickit/pull/78)
- **Feature Branch:** `feature/30-actions-taken-ui`
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Pending Peer Review
- **Scope & Objectives:**
  - `client/src/components/ActionsTaken.tsx`: สร้างคอมโพเนนต์แสดงรายการ Action Taken ในธีม Zen Green เรียงตามวันเวลา พร้อมสถานะ Badge (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`), Assignee pill, และ Follow-up highlight
  - Modal แบบ Accessible (WCAG 2.1 AA): รองรับ Touch targets $\ge 44\text{px}$, ARIA `role="alert"` สำหรับ error feedback, `aria-hidden="true"` สำหรับ icon emoji, และปิดด้วยปุ่ม `Escape`
  - Dynamic Validation: ตรวจสอบความถูกต้องแบบ Real-time บังคับ `result` (min 2 chars) เฉพาะเมื่อสถานะเป็น `COMPLETED`, บังคับ `followUpNote` เมื่อเปิด Follow-up, และป้องกัน Double Submission ด้วย Busy state
  - State Synchronization: ส่ง callback `onActionsChange` กลับไปยัง `TicketDetail.tsx` เพื่อให้ state แม่ซิงก์แบบ Real-time รองรับ Resolution Gate ใน Issue 31
  - ชุดทดสอบ Component Vitest 7 เคสใน `client/src/test/lab-04/ActionsTaken.test.tsx` (UI-01, UI-02, UI-03, DUP-01, A11Y-01) ผ่านครบ 100%

#### 💬 Round 1 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-01
- **Verdict:** 🔴 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจโค้ดคอมโพเนนต์ Actions Taken, State sync, การตรวจสอบสิทธิ์, และชุดทดสอบ UI ของ PR #78 (Issue 30) เทียบกับ specification.md, ui-spec.md และ api-spec.md แล้วนะคะ ภาพรวมการจัดวางโครงสร้างหน้าจอในธีม Zen Green, การทำ dynamic validation เมื่อเลือกสถานะ Completed, การซ่อนปุ่มควบคุมสำหรับ Requester และการทำ accessibility ตามเกณฑ์ WCAG AA ทำออกมาได้ประณีตและน่าใช้งานมากค่ะ
> 
> แต่ขอ Changes Requested ก่อนนะคะ เนื่องจากพบจุดสำคัญที่กระทบต่อการทำงานจริงในระบบและจุดที่ต้องปรับปรุงความสมบูรณ์ของคอมโพเนนต์ดังนี้ค่ะ:
> 
> 🔴 **Blocking: ต้องแก้ก่อน Merge**
> 1. `client/src/components/ActionsTaken.tsx`: ปัญหา Auth Token Key Mismatch — คอมโพเนนต์ดึง token ด้วย `localStorage.getItem('token')` ในขณะที่ระบบ Authentication จาก Lab 3 บันทึกคีย์ว่า `'toktickit_auth_token'` ส่งผลให้เมื่อรันบนแอปจริง หน้าจอจะไม่สามารถดึงรายชื่อ Assignee จาก `GET /api/users/assignable` ได้และถูกบล็อกด้วย 401 Unauthorized แนะนำให้ทำ helper ดึง token ที่รองรับทั้ง `'toktickit_auth_token'` และ `'token'`
> 2. `server/src/app.ts`: ขาดฟิลด์ `actionsTaken` ในคำตอบของ `GET /api/tickets/:id` — แม้ว่าใน query Prisma จะมี `include: { actionsTaken: ... }` แล้ว แต่ในอ็อบเจกต์ที่ส่งคืน `res.status(200).json({ ... })` บรรทัด 595–605 ไม่ได้แนบ `actionsTaken` ออกมา ทำให้หน้า Ticket Detail ไม่ได้รับข้อมูลเริ่มต้น
> 3. `client/src/components/ActionsTaken.tsx`: การดึงข้อความแจ้งเตือน Error — ในบล็อก catch ของการสร้างและแก้ไข มีการตรวจสอบเพียง `data.message` แต่ backend API ส่ง error ในรูป `{ error: "..." }` ทำให้กรณีเกิดข้อผิดพลาดจาก validation จะแสดงข้อความ fallback ทั่วไปแทนที่จะเป็นคำอธิบายที่แท้จริง
> 
> 🟠 **Should Fix: พฤติกรรมของ UI และการเรียงลำดับ**
> 1. **การเรียงลำดับรายการ Action Taken:** เมื่อสร้าง Action สำเร็จ UI นำรายการใหม่ไปแทรกไว้หน้าสุด (`[created, ...items]`) แต่ Backend และ Database เรียงตาม `actionDateTime: asc` แนะนำให้ต่อท้าย (`[...items, created]`) เพื่อให้สอดคล้องกับ audit trail
> 2. **ความยาวและเงื่อนไข Validation:**
>    - บังคับ `followUpNote` ความยาวขั้นต่ำ 2 ตัวอักษรและจำกัด `maxLength={500}` ให้ตรงกับ API validation
>    - กำหนด `maxLength={1000}` ให้กับ `actionDescription` และ `result`
> 3. **จำกัดสถานะใน Modal แก้ไข (Action Status Transition Matrix):** ปัจจุบัน Dropdown แสดงครบ 4 สถานะเสมอ แม้ Action จะอยู่ในสถานะ Completed หรือ Cancelled แล้ว แนะนำให้ล็อกหรือกรองตัวเลือกตาม State Matrix (ห้ามย้อนจาก Completed/Cancelled)
> 
> 🟡 **Minor: จุดเก็บตกเล็กน้อย**
> 1. ปรับโทนสี Status Badge ให้สอดคล้องกับ Zen Green tokens ใน `ui-spec.md` (`PENDING`: `#FFFBEB`/`#92400E`, `IN_PROGRESS`: `#EFF6FF`/`#1E40AF`)
> 2. ปรับชื่อ Test ID ใน `client/src/test/lab-04/ActionsTaken.test.tsx` เพื่อป้องกันการซ้ำซ้อนกับ `UI-06` ของ Dashboard
> 3. ฟิลด์ `actionDateTime` (`type="datetime-local"`): เพิ่มฟิลด์ระบุวันเวลาในการปฏิบัติการในฟอร์มสร้างและแก้ไข Action Taken พร้อมตั้งค่าเริ่มต้นเป็นวันเวลาปัจจุบัน ให้สอดคล้องกับ API schema และ `ui-spec.md` §3.1
> 
> ฝากปรับแก้จุดด้านบนแล้ว ping มาตรวจซ้ำนะคะ ขอบคุณมากค่ะ!

#### 💬 Round 1 Author Response by @titayaaa
- **Response Date:** 2026-11-01
- **Status:** 🔄 Changes Addressed
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและช่วยดักจุดผิดพลาดสำคัญได้อย่างแม่นยำมากค่ะ @jejaebubu ได้ทำการแก้ไขปรับปรุงครบถ้วนทุกข้อเรียบร้อยแล้วค่ะ:
> 
> 1. **Auth Token Retrieval (`ActionsTaken.tsx`)**: เพิ่ม helper `getAuthToken()` ดึงค่าจาก `localStorage.getItem('toktickit_auth_token') || localStorage.getItem('token')` ทำให้รองรับ token ทั้งสองรูปแบบทั้งในสภาพแวดล้อมจริงและชุดทดสอบอย่างสมบูรณ์
> 2. **คืนค่า `actionsTaken` ใน `GET /api/tickets/:id` (`server/src/app.ts`)**: แนบ `actionsTaken: ticket.actionsTaken` ใน `res.status(200).json({ ... })` เรียบร้อยแล้ว ทำให้หน้า Ticket Detail ได้รับข้อมูลเริ่มต้นครบถ้วน
> 3. **Error Message Extraction (`ActionsTaken.tsx`)**: ปรับปรุงการดึงข้อความผิดพลาดเป็น `data.error || data.message || ...` ครอบคลุมทั้งกรณีที่เซิร์ฟเวอร์ส่ง `error` หรือ `message`
> 4. **Item Ordering (`ActionsTaken.tsx`)**: ปรับการอัปเดต stateหลังสร้าง Action สำเร็จเป็น `const nextItems = [...items, created];` เพื่อรักษาลำดับแบบเรียงตามเวลาจากอดีตไปปัจจุบัน (chronological order)
> 5. **Validation & Field Length Limits**:
>    - ตรวจสอบ `followUpNote.trim().length < 2` เมื่อเปิดสวิตช์ Follow-up พร้อมกำหนด `maxLength={500}` บน textarea
>    - กำหนด `maxLength={1000}` บน `action-description` และ `action-result` ป้องกันข้อความยาวเกินขนาดฟิลด์
> 6. **Action Status Transition Matrix ใน Edit Modal**:
>    - หาก Action เป็น `COMPLETED` หรือ `CANCELLED` จะล็อก Dropdown ไม่ให้เปลี่ยนสถานะย้อนกลับ
>    - หาก Action เป็น `IN_PROGRESS` จะแสดงเฉพาะตัวเลือก `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
>    - หาก Action เป็น `PENDING` จะอนุญาตให้ย้ายไปยังสถานะใดก็ได้
> 7. **Zen Green Status Badge Tokens**: ปรับคู่สีพื้นหลังและตัวอักษรของป้ายสถานะให้ตรงตาม Design System Tokens (`PENDING`: `#FFFBEB`/`#92400E`, `IN_PROGRESS`: `#EFF6FF`/`#1E40AF`)
> 8. **TypeScript & Test ID Polish**:
>    - ปรับแก้ type error ใน `ActionsTaken.tsx` สำหรับแอตทริบิวต์ `disabled={Boolean(...)}` รัน `npm run build` ผ่าน 100%
>    - ปรับรหัสเทสต์ใน `ActionsTaken.test.tsx` จาก `UI-06` เป็น `UI-02` เพื่อไม่ให้ชนกับรหัสของ Staff Dashboard
> 9. **Action Date/Time Field (`ActionsTaken.tsx`)**: เพิ่มฟิลด์ระบุวันเวลา `actionDateTime` (`type="datetime-local"`) ในฟอร์มสร้างและแก้ไข พร้อมตั้งค่าเริ่มต้นเป็นวันเวลาปัจจุบัน (`new Date().toISOString()`) ครบถ้วนตาม Handout และ `ui-spec.md` §3.1
> 
> ดำเนินการ commit ใน `5ecac1a` ผลการรันเทสต์ฝั่ง Client ผ่านครบ 12 test files / 63 tests และ build production bundle ผ่านฉลุย 100% ค่ะ รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ! ✨

#### 💬 Round 2 Review by @jejaebubu (Changes Requested)
- **Review Date:** 2026-11-02
- **Verdict:** 🔴 Changes Requested
- **Review Comments (Verbatim):**

> ตรวจ commit 5ecac1a รอบที่ 2 อย่างละเอียดแล้วนะคะ ขอบคุณที่ตามเก็บทั้ง 9 ข้อให้ค่ะ แต่จากการไล่เช็กโค้ดและไฟล์ reviewer.md พบจุดที่ต้องรบกวนช่วยปรับแก้อีก 4 จุดก่อนกด Approve & Merge นะคะ:
> 
> 1. **เวลาในช่อง actionDateTime (datetime-local) เลื่อนถอยหลัง 7 ชั่วโมงทุกครั้งที่เปิดฟอร์ม/กดบันทึก (ActionsTaken.tsx บรรทัด 120, 136–138)**
>    - **ปัญหา:** `<input type="datetime-local" />` ใช้เวลาแบบ Local Time (YYYY-MM-DDTHH:mm) แต่ใน openCreateForm และ openEditForm ใช้ `.toISOString().slice(0, 16)` ซึ่งเป็นเวลา UTC พอเปิดในโซนเวลาไทย (UTC+7) เวลาจะถอยหลังไป 7 ชั่วโมง และทุกครั้งที่กด Edit แล้วกด Save (`new Date(actionDateTime).toISOString()`) เวลาของรายการนั้นจะถูกเลื่อนถอยหลังไปเรื่อย ๆ ครั้งละ 7 ชั่วโมงค่ะ
>    - **แนวทางแก้:** สร้าง helper แปลง Date เป็น Local YYYY-MM-DDTHH:mm สำหรับใส่ใน state actionDateTime แทนการใช้ `.toISOString().slice(0, 16)` ค่ะ เช่น:
>      `const toLocalDateTimeInput = (iso?: string) => { const d = iso ? new Date(iso) : new Date(); const pad = (n: number) => String(n).padStart(2, '0'); return \`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}\`; };`
> 
> 2. **การกดปุ่มลัด Complete บนการ์ดทำให้ editingAction.status กลายเป็น COMPLETED แล้วล็อกช่อง Status (ActionsTaken.tsx บรรทัด 133, 267, 495)**
>    - **ปัญหา:** ใน handleQuickStatusChange (บรรทัด 267) เรียก `openEditForm({ ...action, status: 'COMPLETED' })` ซึ่งทำให้ `editingAction.status` ถูกทับเป็น 'COMPLETED' ส่งผลให้ `<select id="action-status">` (บรรทัด 495–501) เข้าใจผิดว่า Action นี้อยู่ในสถานะ Terminal (COMPLETED) ไปแล้วและสั่ง disabled ล็อกช่องเลือกสถานะทันที ทั้งที่สถานะจริงใน DB ยังเป็น PENDING หรือ IN_PROGRESS
>    - **แนวทางแก้:** ปรับ `openEditForm(action: ActionTakenItem, initialStatus?: string)` ให้เก็บ `setEditingAction(action)` ตามสถานะจริงใน DB เหมือนเดิม แล้วเซ็ต `setStatus(initialStatus ?? action.status)` แทนค่ะ (และตอนกดปุ่ม Complete ให้เรียก `openEditForm(action, 'COMPLETED')`)
> 
> 3. **ความถูกต้องของบันทึกใน docs/lab-04/reviewer.md (บรรทัด 623–669)**
>    - ในหัวข้อ Round 1 Review by @jejaebubu (Changes Requested) (บรรทัด 623–643) บันทึกไว้แค่ 8 ข้อ (ในหมวด Minor มีแค่ 2 ข้อ ขาดข้อ ฟิลด์ actionDateTime ซึ่งไปโผล่เป็นข้อ 9 ในฝั่ง Author Response แทน) รบกวนปรับข้อความใน Review Comments (Verbatim) ให้ครบทั้ง 9 ข้อตรงกับคอมเมนต์จริงบน GitHub ด้วยนะคะ
>    - ในหัวข้อ Round 1 Author Response by @titayaaa (บรรทัด 669) ระบุว่า ดำเนินการ commit ใน 2d6f47e แต่ commit จริงบน PR คือ 5ecac1a รบกวนอัปเดตเลข commit ให้ตรงกันด้วยค่ะ
> 
> 4. **เพิ่มเคสทดสอบใน client/src/test/lab-04/ActionsTaken.test.tsx**
>    - รบกวนเพิ่ม test ยืนยันการเปิด Edit Modal (ตรวจว่าการกรองตัวเลือก Status ตาม State Machine ทำงานถูกต้อง และใช้คีย์ toktickit_auth_token ได้จริง) อีกสัก 1 เคสนะคะ
> 
> แก้ 4 จุดนี้เสร็จแล้วทักมาได้เลยนะคะ เดี๋ยวรีบตรวจและกด Approve & Merge ให้ทันทีค่ะ ขอบคุณมากค่ะ!

#### 💬 Round 2 Author Response by @titayaaa
- **Response Date:** 2026-11-02
- **Status:** 🔄 Changes Addressed
- **Author Response Details (Verbatim):**

> ขอบคุณ @jejaebubu สำหรับการตรวจทานรอบที่ 2 อย่างละเอียดถี่ถ้วนมากค่ะ ได้ดำเนินการปรับปรุงและแก้ไขครบถ้วนทั้ง 4 จุดเรียบร้อยแล้วค่ะ:
> 
> 1. **แก้ไขปัญหา Timezone Shift ในช่อง `actionDateTime` (`ActionsTaken.tsx`)**:
>    - เพิ่ม helper `toLocalDateTimeInput(iso?: string)` สำหรับแปลงเวลาให้เป็น Local Time string ในฟอร์แมต `YYYY-MM-DDTHH:mm`
>    - ปรับปรุง `openCreateForm` และ `openEditForm` ให้เรียกใช้ helper ดังกล่าวแทนการใช้ `.toISOString().slice(0, 16)` ซึ่งเป็น UTC ทำให้เวลาไม่ถอยหลัง 7 ชั่วโมงเมื่อเปิดฟอร์มหรือบันทึกข้อมูลในเขตเวลาไทย (UTC+7)
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
> ดำเนินการ commit ใน `fca398c` ผลการรันเทสต์ฝั่ง Client ผ่านครบ 12 test files / 64 tests (100%) และรัน `npm run build` ผ่านสมบูรณ์ 0 errors รบกวนช่วยตรวจทานและ Approve & Merge ได้เลยนะคะ ขอบคุณมากค่ะ! ✨

### PR #79: Issue 31: Ticket Workflow Operations, Resolution Gate & Concurrency Protection
- **PR URL:** [titayaaa/toktickit#79](https://github.com/titayaaa/toktickit/pull/79)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Under Review by @jejaebubu
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
- **Review Date:** 2026-11-02
- **Verdict:** 🟡 Suggestions Addressed
- **Review Comments (Verbatim):**

> ตรวจโค้ด Ticket Workflow, Resolution Gate, Optimistic Concurrency และชุดทดสอบของ PR #79 (Issue 31) เทียบกับ schema.prisma, specification.md, api-spec.md และ tests.md อย่างละเอียดรอบด้านแล้วนะคะ ภาพรวมทำออกมาได้อย่างยอดเยี่ยมและรัดกุมมากค่ะ
> 
> **จุดเด่นที่ทำได้ดีมาก:**
> - **Resolution Gate Enforcement (BR-09, AC-07, AC-08):** ใน `server/src/routes/staff.ts` (`PATCH /api/staff/tickets/:id/resolve`) ตรวจจับ Actions Taken ที่ค้างสถานะ `PENDING` หรือ `IN_PROGRESS` ได้อย่างแม่นยำ ปฏิเสธด้วย `409 Conflict` (`RESOLUTION_GATE_BLOCKED`) พร้อมส่ง `unresolvedCount` และ `blockingActions` ให้ลูกค้านำไปแสดงผลได้อย่างชัดเจน
> - **Optimistic Concurrency Protection (BR-14, AC-12):** ตรวจสอบ `expectedUpdatedAt` กับ `ticket.updatedAt` ในทั้งสอง Endpoint พร้อมปัดเศษความคลาดเคลื่อนระดับ 1 วินาที (`Math.abs > 1000`) ตาม RFC 7231 ตอบกลับด้วย `409 Conflict` (`STALE_UPDATE_CONFLICT`) ป้องกันปัญหาแย่งกันแก้ไขข้อมูลได้อย่างสมบูรณ์
> - **State Machine Transition Matrix (BR-11, WORKFLOW-01):** บังคับใช้เงื่อนไขตามตาราง 9 สถานะใน `VALID_TRANSITIONS` บล็อกไม่ให้ข้ามจาก NEW/OPEN ไป RESOLVED โดยตรง และบังคับใช้ `/resolve` พร้อม `resolutionSummary` 3–500 ตัวอักษร
> - **UX & Warning Banners (UI-04):** ใน `TicketDetail.tsx` แสดงแบนเนอร์สีเหลืองเตือน Resolution Gate ทั้งบน Operational Toolbar และภายใน Resolve Modal รวมถึงการแจ้งเตือน Stale update เมื่อเกิด Conflict (409)
> - **Test Suite:** ชุดทดสอบ `ticket-workflow.api.test.ts` (API-07 ถึง API-10, API-14, WORKFLOW-01) และ `TicketWorkflow.test.tsx` (UI-04 4 เคส) ครอบคลุมครบถ้วน รันผ่าน 100%
> 
> **ข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Should Fix & Minor):**
> 1. **State Transition ใน `TicketDetail.tsx` (บรรทัด 483–485) ขาดสถานะ PENDING ในเคส REOPENED:** ใน `server/src/routes/staff.ts` และ `specification.md` Section 5.1 กำหนดให้สถานะ `REOPENED` สามารถย้ายไป `PENDING` (พักรอ Vendor) ได้ แต่ใน `TicketDetail.tsx` ฟังก์ชัน `getAllowedNextStatuses` ระบุ: `case 'REOPENED': return ['IN_PROGRESS', 'RESOLVED', 'CANCELLED'];` แนะนำให้เพิ่ม `'PENDING'` เข้าไปในอาร์เรย์เป็น `['IN_PROGRESS', 'PENDING', 'RESOLVED', 'CANCELLED']` เพื่อให้เจ้าหน้าที่สามารถเลือกสถานะนี้จาก Dropdown บนหน้าเว็บได้ค่ะ
> 2. **บันทึก AI Pairing Log ใน `docs/lab-04/ai-use.md` สำหรับ Issue 31:** แนะนำให้เพิ่ม Prompt 11 และ Section 3.5 Reflection สำหรับ Ticket Workflow, Resolution Gate และ Optimistic Concurrency ใน `docs/lab-04/ai-use.md` ให้ครบถ้วนตามเกณฑ์ส่งงานของ Lab 4 ค่ะ
> 3. **อัปเดตเอกสาร `docs/lab-04/api-spec.md` (หัวข้อ 3.1 และ 3.2):** นำคำว่า *(Planned for Issue 31)* ออก และปรับตัวอย่าง JSON response ของ Conflict (409) ให้ตรงกับโครงสร้างจริง (`code: 'RESOLUTION_GATE_BLOCKED'` / `'STALE_UPDATE_CONFLICT'`)
> 4. **การส่ง `relatedSystemId` ใน `ticket-workflow.api.test.ts`:** ในฟังก์ชันทดสอบมีการระบุ `relatedSystemId: relatedSystem?.id || null` เนื่องจากฟิลด์นี้ใน `schema.prisma` เป็น required (`Int` ไม่ nullable) แนะนำให้ใช้ `relatedSystem.id` ตรง ๆ เหมือนกับ `categoryId: category.id` ค่ะ

#### 💬 Author Response by @titayaaa (Changes Addressed)
- **Response Date:** 2026-11-02
- **Author Response Details (Verbatim):**

> ขอบคุณ @jejaebubu สำหรับการตรวจทานที่ละเอียดรอบคอบมากค่ะ ดำเนินการปรับแก้ครบถ้วนทั้ง 4 ข้อเสนอแนะเรียบร้อยแล้วค่ะ:
> 1. **เพิ่มสถานะ 'PENDING' ในเคส REOPENED ของ `TicketDetail.tsx`:** ปรับ `getAllowedNextStatuses` ในเคส `'REOPENED'` เป็น `['IN_PROGRESS', 'PENDING', 'RESOLVED', 'CANCELLED']` ให้ตรงกับ State Transition Matrix ใน Section 5.1 และ backend `VALID_TRANSITIONS`
> 2. **บันทึก AI Pairing Log ใน `docs/lab-04/ai-use.md`:** เพิ่ม Prompt 11 และ Section 3.5 Reflection สำหรับ Issue 31 (Resolution Gate, Optimistic Concurrency, Clock Skew Tolerance และ Preventive UI) ครบถ้วน
> 3. **อัปเดต `docs/lab-04/api-spec.md` (หัวข้อ 3.1 และ 3.2):** นำหมายเหตุ *(Planned for Issue 31)* ออก และปรับปรุงตัวอย่าง JSON response ของ HTTP 409 Conflict ให้มีฟิลด์ `code: "STALE_UPDATE_CONFLICT"` และ `code: "RESOLUTION_GATE_BLOCKED"` พร้อม `unresolvedCount` และ `blockingActions` ตรงกับ response จริงจาก Backend
> 4. **ปรับการส่ง `relatedSystemId` ใน `ticket-workflow.api.test.ts`:** เปลี่ยนจาก `relatedSystem?.id || null` เป็น `relatedSystem.id` ตรง ๆ ทุกจุด ให้สอดคล้องกับ schema type `Int` (Non-nullable)
> 
#### 💬 Round 2 Review by @jejaebubu (Approved)
- **Review Date:** 2026-11-02
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ตรวจสอบการแก้ไขทั้ง 4 จุดใน commit 810bdb3 ครบถ้วนสมบูรณ์แล้วค่ะ:
> 1. เพิ่มสถานะ PENDING ในเคส REOPENED ของ `TicketDetail.tsx` เรียบร้อย
> 2. บันทึก AI Pairing Log ใน `ai-use.md` เรียบร้อย
> 3. ปรับปรุง JSON response ตัวอย่างใน `api-spec.md` ตรงกับโค้ดจริง
> 4. ปรับ `relatedSystemId` ในชุดทดสอบเป็นค่า non-null เรียบร้อย
> 
> รันชุดทดสอบผ่านครบ 100% ขออนุมัติ (Approve) และดำเนินการกด Merge เข้าสู่ `lab4-staging` เรียบร้อยค่ะ 🎉

---

### PR-06: Issue 32: IT Staff Dashboard API & UI
- **PR URL:** Pending PR creation (Branch: `feature/32-staff-dashboard`)
- **Author:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Reviewer:** `@jejaebubu` (GitHub: [jejaebubu](https://github.com/jejaebubu))
- **Target Branch:** `lab4-staging`
- **Current Status:** ⏳ Under Review by @jejaebubu
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

---

# Part 2: Records of Student (@titayaaa) Reviewing Partner (@jejaebubu)

### PR #104: docs(lab04): Sprint 4 engineering contract (Issue #1)
- **PR URL:** [jejaebubu/toktickit#104](https://github.com/jejaebubu/toktickit/pull/104)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged

#### 💬 Round 1 Review by @titayaaa (Approved)
**Review Date:** 2026-10-31  
**Verdict:** ✅ Approved  
**Review Comments (Verbatim):**

> ## 🟢 Peer Review: Approved (PR #104 - Sprint 4 Engineering Contract)
> 
> **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)  
> **Target Branch:** `lab4-staging`  
> **Status:** ✅ **Approved (พร้อมให้ Merge เข้า `lab4-staging` ได้เลยครับ)**
> 
> ---
> 
> ### 🌟 ภาพรวมการประเมิน (Executive Summary)
> ตรวจทานเอกสารข้อกำหนดทางวิศวกรรม (Engineering Contract) ของ Sprint 4 ครบทั้ง 6 ไฟล์ในโฟลเดอร์ `docs/lab-04/` เรียบร้อยแล้วครับ ชื่นชมที่วางโครงสร้างเอกสารตามแนวคิด **Spec-Driven Development (Spec DD)** ได้อย่างละเอียด ชัดเจน และครอบคลุมขอบเขตของ Lab 4 (Actions Taken, Dashboards, Resolution Gate, และ Final Regression) ครบถ้วนทุกมิติครับ มีการกำหนด Business Rules และ Authorization Matrix ที่รัดกุมมาก ป้องกันปัญหา Scope Creep และ Data Leakage ได้เป็นอย่างดี
> 
> ---
> 
> ### 🔍 รายละเอียดการตรวจทานแยกตามไฟล์ (File-by-File Review)
> 
> #### 1. `docs/lab-04/specification.md` (ภาพรวมข้อกำหนด & กฎเกณฑ์ทางธุรกิจ)
> * **Parent-Child Structure (BR-01, BR-02):** ออกแบบความสัมพันธ์ระหว่าง Ticket และ Actions Taken ชัดเจน ว่าหนึ่งตั๋วสามารถมีหลายการกระทำได้ และระบุชัดเจนว่าตั๋วหนึ่งใบมี Ticket Owner คนเดียว แต่การบันทึก Actions Taken สามารถทำโดยเจ้าหน้าที่ไอทีคนอื่นได้ (Multi-Staff Collaboration) ตรงตาม Use Case จริงของ Service Desk
> * **Resolution Gate (BR-09):** ระบุชัดเจนว่าสัญญาณ "Problem Appears Resolved" จากฝั่ง Requester เป็นเพียง **Advisory Flag** เท่านั้น โดยไม่เปลี่ยนสถานะตั๋วเป็น `Resolved` โดยอัตโนมัติ ซึ่งสอดคล้องกับข้อกำหนดวิชาที่ต้องให้ IT Staff ตรวจสอบความเรียบร้อยก่อนเสมอ
> * **Authorization Matrix:** กำหนดสิทธิ์ได้รัดกุมมาก โดยเฉพาะการใช้ `404 Not Found` แทน `403 Forbidden` เมื่อ Requester พยายามเข้าถึง Actions Taken ของตั๋วผู้อื่น ช่วยป้องกันปัญหา Resource Enumeration ได้ดีเยี่ยม
> * **Data Changes Justification:** มีการอธิบายเหตุผลเบื้องหลังการออกแบบฐานข้อมูลทั้ง 3 ข้อครบถ้วน (การใช้ CUID/UUID, Soft Status Enum, และ Indexing บน foreign keys)
> 
> #### 2. `docs/lab-04/api-spec.md` (สัญญาเชื่อมต่อ REST API)
> * **Actions Taken Endpoints (`GET`, `POST`, `PATCH`):** ออกแบบ Path และ Payload ได้ตามมาตรฐาน RESTful API ครบถ้วน โดยใน `POST /api/tickets/:id/actions-taken` มีการกำหนดให้เซิร์ฟเวอร์เพิกเฉย `performedById` จาก Client แล้วผูกกับ `currentUser.id` จาก JWT Token โดยตรง ถือเป็น Best Practice ด้านความปลอดภัย
> * **Validation Rules:** ระบุเงื่อนไข Dynamic Validation ชัดเจนมาก โดยเฉพาะเคสที่ `followUpRequired == true` แล้วต้องบังคับกรอก `followUpNote` ห้ามเว้นว่าง
> * **Concurrency Protection:** มีการออกแบบ Stale Update Detection ผ่านการส่ง `expectedUpdatedAt` และตอบกลับด้วย `409 Conflict` เมื่อตรวจพบข้อมูลชนกัน ช่วยแก้ปัญหาแย่งกันแก้งานของทีมไอทีได้อย่างสมบูรณ์
> 
> #### 3. `docs/lab-04/ui-spec.md` (ข้อกำหนดส่วนต่อประสานผู้ใช้ & ดีไซน์)
> * **Zen Green Design System:** รักษาโทนสีหลัก `#006B3C` (Forest Green) และชุดสีสถานะต่อเนื่องมาจาก Lab 2 และ 3 ได้เป็นอย่างดี
> * **Dynamic Follow-Up Field:** ระบุพฤติกรรม UI ของช่องกรอก `Follow-Up Note` ได้ชัดเจน ว่าจะแสดงขึ้นมาพร้อมดอกจันสีแดงเฉพาะตอนที่เปิด `Follow-Up Required` เท่านั้น
> * **Responsive Layouts & A11Y:** กำหนด Breakpoints รองรับทั้ง Desktop ($\ge 1280\text{px}$), Tablet ($768\text{px} - 1279\text{px}$) และ Mobile ($< 768\text{px}$) โดยระบุข้อกำหนด **Zero Horizontal Overflow** และ Touch Target ไม่ต่ำกว่า $44 \times 44\text{px}$ ตามมาตรฐาน WCAG 2.1 AA ไว้อย่างชัดเจน
> 
> #### 4. `docs/lab-04/tests.md` (แผนการทดสอบ & Traceability Matrix)
> * **Traceability Matrix:** ทำตารางเชื่อมโยง Acceptance Criteria (AC), ข้อกำหนด (FR/BR) กับไฟล์ชุดทดสอบจริงครอบคลุมทั้ง API (`server/tests/lab-04/`), Component UI (`client/tests/lab-04/`), Responsive, Accessibility และ E2E Playwright
> * **สถานะเริ่มต้นถูกต้อง:** ทุกการทดสอบตั้งสถานะเริ่มต้นเป็น `Planned` ทั้งหมด ไม่มีการใส่ผลล่วงหน้าก่อนเขียนโค้ดจริง เป็นไปตามหลัก TDD ที่ถูกต้องครับ
> 
> #### 5. `docs/lab-04/reviewer.md` & `ai-use.md`
> * ตาราง PR Log ใน `reviewer.md` วางโครงสร้าง PR-01 ถึง PR-11 ไว้เป็นระเบียบ และระบุ Flow 1 PR : 1 Issue ชัดเจน
> * ใน `ai-use.md` บันทึกการใช้ AI เป็น Specification Agent พร้อม Prompt เริ่มต้นและ Reflection ได้ตรงไปตรงมา
> 
> ---
> 
> ### 💡 ข้อเสนอแนะเพิ่มเติมสำหรับสปรินต์ถัดไป (Helpful Tips for Next PRs)
> 1. **Assignee Validation ใน PR-02 / PR-03:** ตอนทำ Prisma Schema และ API สร้าง Action Taken ถ้ามีการเพิ่มฟิลด์ `assigneeId` อย่าลืมตรวจสอบฝั่ง Backend ให้มั่นใจว่า User ปลายทางที่ถูก Assign ต้องมีบทบาทเป็น `IT_STAFF` หรือ `ADMINISTRATOR` และมีสถานะ `isActive = true` ด้วยนะครับ
> 2. **Resolution Gate Guard:** ใน PR-05 (Workflow) ตรวจสอบให้ครอบคลุมว่า หากยังมี Action Taken ที่สถานะค้างเป็น `PENDING` หรือ `IN_PROGRESS` ระบบจะต้อง Block ไม่ให้เปลี่ยนสถานะตั๋วเป็น `RESOLVED` จนกว่าจะเคลียร์ครบทั้งหมดครับ
> 
> ---
> 
> ### 🏁 สรุปผลการประเมิน (Conclusion)
> เอกสารสเปกมีความสมบูรณ์ รัดกุม และพร้อมเป็นพิมพ์เขียวสำหรับเริ่มต้นพัฒนาโค้ดใน Issue ถัดไปได้ทันทีครับ **กด Approve ให้เรียบร้อย สามารถ Merge PR นี้เข้าสู่ `lab4-staging` ได้เลยครับ!** 🚀

#### 💬 Author Response by @jejaebubu
- **Response URL:** [PR #104 Review Comment](https://github.com/jejaebubu/toktickit/pull/104#pullrequestreview-5718505642)
- **Status:** `@jejaebubu` รับทราบข้อคิดเห็นและคำแนะนำทั้งหมด ดำเนินการกด Merge PR #104 เข้าสู่สาขา `lab4-staging` เรียบร้อยแล้ว

---

### PR #105: feat(db): ActionTaken model, migration, and idempotent seed (Issue #2)
- **PR URL:** [jejaebubu/toktickit#105](https://github.com/jejaebubu/toktickit/pull/105)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ## 🔍 Peer Review: feat(db): ActionTaken model, migration, and idempotent seed (PR #105)
> 
> **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)  
> **Target Branch:** `lab4-staging`  
> 
> ---
> 
> ### 🌟 ภาพรวมการประเมิน (Executive Summary)
> PR #105 ทำการขยายฐานข้อมูลของ Lab 4 (Actions Taken Model, Migration และ Idempotent Seed) ได้อย่างเป็นระเบียบและตรงตามข้อกำหนดของแลปมากค่ะ ชื่นชมที่มีการเขียน Integration Tests ครอบคลุมถึง 9 ข้อเพื่อตรวจ Data Invariants ทั้งเรื่อง Role ของ Assignee/Performer, เคส Performer $\neq$ Assignee, การกระจายตัว 0/1/หลาย Actions ตลอดจนการดักไม่ให้มี Resolved ticket ค้าง open actions ไว้อย่างรัดกุม รันเทสต์ผ่าน 92/92 เทสต์สมบูรณ์ค่ะ 👍
> 
> มีข้อสังเกตและข้อเสนอแนะสำคัญ 1 จุดเกี่ยวกับฟิลด์ `result` และจุดเก็บตกเอกสารเล็กน้อย ดังนี้ค่ะ:
> 
> ---
> 
> ### 💡 จุดที่แนะนำให้ปรับปรุง (Key Recommendations)
> 
> #### 1. ฟิลด์ `result` ใน `ActionTaken` ควรเป็น Nullable (`String?`) ในระดับ Database
> * **สิ่งที่พบในโค้ด:**
>   - ใน `schema.prisma`:
>     ```prisma
>     result String @db.Text
>     ```
>   - ใน `migration.sql`:
>     ```sql
>     "result" TEXT NOT NULL,
>     ```
> * **ผลกระทบ:**  
>   เนื่องจากฟิลด์ `result` ถูกกำหนดเป็น `NOT NULL` ในฐานข้อมูล แต่ค่าเริ่มต้นของ `status` เป็น `PENDING` ซึ่งตามธรรมชาติของการทำงาน (และตามที่เราคุยกันใน PR-01) ในจังหวะที่เจ้าหน้าที่ไอทีเพิ่งสร้าง Action หรือกำลังทำอยู่ (`PENDING` / `IN_PROGRESS`) งานยังไม่เสร็จจึงจะยังไม่มีผลลัพธ์ (Result)  
>   หาก DB บังคับ `NOT NULL` ตอนทำ PR-03 (API) และ PR-04 (UI) จะทำให้ `POST /api/tickets/:id/actions-taken` ล้มเหลวทันทีที่ไม่ได้ส่ง result มา (หรือต้องคอยส่งค่าว่าง/ข้อความหลอกมาแทน เหมือนที่ต้องใส่ใน seed ตอนนี้)
> * **ข้อเสนอแนะ:**  
>   แนะนำปรับใน `schema.prisma` ให้เป็น:
>   ```prisma
>   result String? @db.Text
>   ```
>   และใน `migration.sql` เอา `NOT NULL` ออกจากคอลัมน์ `"result"` ค่ะ แล้วค่อยไปบังคับ `required` ในระดับ Backend API Validation เฉพาะเมื่อ `status === 'COMPLETED'` เท่านั้น จะยืดหยุ่นและตรงตามสเปกที่สุดค่ะ
> 
> ---
> 
> #### 2. อัปเดตสถานะ PR-01 ใน `docs/lab-04/tests.md`
> * ในตารางสรุปผลการทดสอบ (Section 3) แถวของ `PR-01` ยังระบุสถานะเป็น `Review in progress`
> * เนื่องจาก PR #104 (Issue #1) ได้รับการอนุมัติและ Merge เข้าสู่ `lab4-staging` เรียบร้อยแล้ว แนะนำปรับสถานะเป็น `Pass` หรือ `Merged` เพื่อให้เอกสารสะท้อนสถานะจริงที่เป็นปัจจุบันค่ะ
> 
> ---
> 
> #### 3. อัปเดตบันทึกใน `docs/lab-04/reviewer.md`
> * อย่าลืมเพิ่มแถวของ **PR #105** ลงในตาราง Master Table และเพิ่มหัวข้อบันทึกประวัติการตรวจทานของ PR-02 (Issue #2) ใน Section 1 เพื่อให้เอกสารบันทึกการรีวิวเป็นไปตามลำดับจริงทีละ PR ค่ะ
> 
> ---
> 
> ### 👏 จุดเด่นที่ทำได้ดีมาก (Praise & Highlights)
> 1. **Composite Index `@@index([ticketId, status])`:** มีการสร้าง Composite Index ดักไว้ตรงจุดมาก ช่วยให้ Query ตรวจสอบ Resolution Gate ใน PR ถัดไป (`COUNT(*) WHERE ticketId = ? AND status IN ('PENDING', 'IN_PROGRESS')`) ทำงานได้รวดเร็วแบบ Index Scan โดยตรง
> 2. **Regression Fix ใน `categories.test.ts`:** มีการดัก Snapshot และ Restore ข้อมูล `actionsTaken` ในบล็อก `finally` ช่วยป้องกันปัญหา Foreign Key ขัดข้องในชุดทดสอบเดิมของ Lab 1 ได้อย่างรอบคอบมาก
> 3. **Data Invariants Test ครบถ้วน:** ชุดทดสอบ 9 ข้อใน `actions-taken-migration.test.ts` เขียนครอบคลุม Business Rules ของแลป 4 ได้ชัดเจนและตรงประเด็นมากค่ะ
> 
> ---
> 
> ### 🏁 สรุปผล
> หากปรับแก้ข้อ 1 เรื่อง `result String?` เรียบร้อยแล้ว สามารถ Push อัปเดตขึ้นมาได้เลยนะคะ เดี๋ยวจะรีบเข้ามาตรวจรอบสุดท้ายแล้วกด Approve ให้ทันทีเลยค่ะ! 🚀

#### 💬 Round 1 Author Response by @jejaebubu
**Response Date:** 2026-11-01  
**Commit:** `8750764` (Fix), `7d9f326` (Review trail)  
**Author Response (Verbatim):**

> ขอบคุณสำหรับรีวิวค่ะ แก้ไขครบทั้ง 3 จุดแล้วใน commit 8750764 (และบันทึก review trail ใน 7d9f326)
> result Nullable — เปลี่ยนเป็น result String? @db.Text และสร้าง migration ใหม่ 20261031172848_lab04_actions_taken ที่มี "result" TEXT (ไม่มี NOT NULL) แทนไฟล์เดิม เพื่อไม่ให้ checksum ค้างจาก migration ที่ apply ไปแล้วSeed: Action ที่ PENDING/IN_PROGRESS มี result = null จริง, งานที่ COMPLETED/CANCELLED มี result ครบ
> เพิ่มเทสต์ตัวที่ 10 ตรวจ is_nullable = YES, open work มี result = null, finished work ต้องมี result
> เพิ่ม BR-16 / AC-15 ใน specification.md, อัปเดต validation ใน api-spec.md (บังคับเฉพาะ COMPLETED) และ ui-spec.md (ดอกจันเฉพาะ COMPLETED), เพิ่ม API-15 เป็น Planned สำหรับ Issue #3
> tests.md — PR-01 → Merged (PR #104); PR-02 → 10 new + 83 existing = 93 พร้อมอ้างอิง PR #105
> reviewer.md — เพิ่มแถว PR #105 ใน Master Table และหัวข้อ 3.2 พร้อม Review #1 / Author Response #1
> ตรวจซ้ำ: npm run build ผ่าน, npm test ผ่าน 17 ไฟล์ / 93 เทสต์, seed รันซ้ำได้ค่าเดิม รบกวนช่วยตรวจอีกรอบนะคะ ขอบคุณค่ะ

#### 💬 Round 2 Review by @titayaaa (Approved)
**Review Date:** 2026-11-01  
**Verdict:** 🟢 Approved  
**Review Comments (Verbatim):**

> ## 🟢 Peer Review: Approved (PR #105 - ActionTaken Model, Migration & Idempotent Seed)
> 
> **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)  
> **Target Branch:** `lab4-staging`  
> **Status:** ✅ **Approved (พร้อมให้ Merge เข้าสู่ `lab4-staging` ได้เลยค่ะ)**
> 
> ---
> 
> ### 🌟 ผลการตรวจทานรอบที่ 2 (Final Verification)
> ตรวจสอบการแก้ไขตาม commit `8750764` และเอกสารใน `7d9f326` ครบถ้วนสมบูรณ์ 100% ทุกประเด็นแล้วค่ะ:
> 
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
> 
> ยอดเยี่ยมและรัดกุมมากค่ะ กด Approve ให้เรียบร้อย สามารถ Merge PR #105 เข้า `lab4-staging` แล้วเริ่ม Issue 3 ต่อได้เลยค่ะ! 🎉

---

### PR #106: feat(api): Actions Taken REST API, RBAC, and status validation (Issue #3)
- **PR URL:** [jejaebubu/toktickit#106](https://github.com/jejaebubu/toktickit/pull/106)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged

#### 💬 Round 1 Review by @titayaaa (Approved)
**Review Date:** 2026-11-01  
**Verdict:** 🟢 Approved  
**Review Comments (Verbatim):**

> ## 🟢 Peer Review: Approved (PR #106 - Actions Taken REST API, RBAC & Status Validation)
> 
> **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)  
> **Target Branch:** `lab4-staging`  
> **Status:** ✅ **Approved (พร้อมให้ Merge เข้าสู่ `lab4-staging` ได้เลยค่ะ)**
> 
> ---
> 
> ### 🌟 ภาพรวมการประเมิน (Executive Summary)
> PR #106 ดำเนินการพัฒนา REST API สำหรับโมดูล Actions Taken (Issue #3) ได้อย่างสมบูรณ์แบบ ตรงตามข้อกำหนดของ Lab 4 ทั้งในแง่ Functional Requirements, Security & RBAC, Data Isolation และ State Machine ค่ะ ชุดทดสอบใหม่ทั้ง 8 ข้อใน `server/tests/lab-04/actions-taken.api.test.ts` เขียนได้อย่างรัดกุม ครอบคลุมทั้ง Positive Flow, Validation Error (400), Role Restriction (403), Data Isolation (404), และ Assignee Guard (422) โดยรันผ่านครบ 18 test files / 101 tests ทั้งหมด 100% ค่ะ 👍
> 
> ---
> 
> ### 👏 จุดเด่นที่ทำได้ยอดเยี่ยมมาก (Key Strengths & Architectural Highlights)
> 
> 1. **Identity Enforcement & Anti-Spoofing (ความปลอดภัยสูง):**
>    - ใน `POST /api/tickets/:id/actions-taken` โค้ดมีการบังคับใช้ `performedById: req.user!.id` จาก JWT Identity เสมอ และเพิกเฉยต่อค่าที่ส่งมาใน Body ช่วยป้องกันการปลอมแปลงผู้บันทึกงานได้อย่างแน่นหนา
>    - ใน `PATCH` มีการล็อกไม่ให้แก้ไข `performedById` เพื่อรักษา Audit Trail ให้เป็นความจริงเสมอ
> 
> 2. **Data Isolation ป้องกัน Resource Enumeration:**
>    - ใน `GET /api/tickets/:id/actions-taken` มีการตรวจสอบสิทธิ์ว่าหากเป็น `REQUESTER` และตั๋วนั้นไม่ใช่ของตนเอง (`ticket.requesterId !== req.user.id`) ระบบจะตอบกลับด้วย **`404 Not Found`** (ไม่ใช่ 403) ซึ่งสอดคล้องกับ Security Best Practice ในการป้องกันไม่ให้ผู้ใช้เดาหรือสแกนหา Ticket ID ของคนอื่นได้
> 
> 3. **Strict Assignee Validation (BR-05 / AC-02):**
>    - ฟังก์ชัน `resolveActionAssignee` มีการดักจับเงื่อนไขชัดเจนว่า User ปลายทางต้อง `isActive === true` และมีบทบาทเป็น `IT_STAFF` หรือ `ADMINISTRATOR` เท่านั้น หากเป็น Requester หรือ Inactive User จะตอบกลับด้วย **`422 Unprocessable Entity`** พร้อมยกเลิกการเขียนข้อมูลลง DB
> 
> 4. **Finite State Machine ของ Action Status (BR-14):**
>    - มีการกำหนด `ACTION_STATUS_TRANSITIONS` อย่างเข้มงวด:
>      - `PENDING` $\rightarrow$ `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
>      - `IN_PROGRESS` $\rightarrow$ `COMPLETED`, `CANCELLED`
>      - `COMPLETED` / `CANCELLED` $\rightarrow$ เป็น Terminal State ห้ามเปลี่ยนสถานะต่อ (ตอบกลับ `400 Bad Request`)
> 
> 5. **Conditional Result Rule (BR-16):**
>    - อนุญาตให้ `result` เป็น `null` ได้เมื่อสถานะเป็น `PENDING` หรือ `IN_PROGRESS`
>    - บังคับว่าต้องมี `result` (ข้อความห้ามว่าง) เมื่อปรับสถานะเป็น `COMPLETED`
> 
> 6. **Follow-Up Note Validation (BR-07):**
>    - มีการตรวจเช็กว่าเมื่อ `followUpRequired === true` ต้องระบุ `followUpNote` เสมอ หากว่างจะถูกปฏิเสธด้วย `400 Bad Request`
> 
> 7. **Append-Only Principle:**
>    - ไม่มี Route สำหรับ `DELETE` ช่วยคงประวัติการปฏิบัติงานของเจ้าหน้าที่ไว้ตรวจสอบย้อนหลังได้ตลอดเวลา
> 
> ---
> 
> ### 💡 ข้อสังเกตและข้อเสนอแนะเพิ่มเติมสำหรับเอกสาร (Minor Doc Suggestions)
> จุดเหล่านี้ไม่ได้กระทบกับโค้ด แต่ฝากอัปเดตเพื่อความสมบูรณ์ของเอกสารบันทึกการรีวิวค่ะ:
> 1. **อัปเดต Master Table ใน `reviewer.md`:** แถวของ PR-02 (PR #105) ในตาราง Section 2 ยังระบุสถานะเป็น `Request Changes → Pending re-review` ทั้งที่ Merge แล้ว แนะนำปรับเป็น `Approved & Merged` ให้ตรงกับความจริงค่ะ
> 2. **เพิ่ม Section 3.2.3 และ 3.3 ใน `reviewer.md`:** เพิ่มหัวข้อบันทึกการ Approve ของ PR #105 และหัวข้อของ PR #106 เพื่อให้ Trail ใน Section 3 ครบถ้วนตามลำดับค่ะ
> 
> ---
> 
> ### 🏁 สรุปผลการประเมิน (Conclusion)
> โค้ด REST API และชุดทดสอบมีความสมบูรณ์ รัดกุม และมีคุณภาพระดับ Enterprise พร้อมสำหรับการนำไปเชื่อมต่อกับฝั่ง UI ใน Issue #4 ได้ทันทีค่ะ **กด Approve ให้เรียบร้อย สามารถ Merge PR #106 เข้าสู่ `lab4-staging` ได้เลยค่ะ!** 🚀

#### 💬 Author Response & Merge by @jejaebubu
- **Response URL:** [PR #106](https://github.com/jejaebubu/toktickit/pull/106)
- **Status:** `@jejaebubu` ดำเนินการกด Merge PR #106 เข้าสู่สาขา `lab4-staging` เรียบร้อยแล้ว (Merge commit `23166db`)

---

### PR #108: feat(ui): Actions Taken UI on Ticket Detail (Issue #4)
- **PR URL:** [jejaebubu/toktickit#108](https://github.com/jejaebubu/toktickit/pull/108)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved & Merged

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ### 🌟 ภาพรวมการประเมิน (Executive Summary)
> PR #108 พัฒนาคอมโพเนนต์ `ActionsTaken.tsx` ได้สวยงาม สะอาดตา และวางโครงสร้างได้ตรงตามข้อกำหนดของ Lab 4 เป็นอย่างดีค่ะ ชื่นชมที่มีการทำ Dynamic Follow-up Toggle, การซ่อนปุ่ม Create/Edit สำหรับ Requester, การจัดการ Loading state ระหว่างบันทึก, การทำ Quick Action Complete/Cancel ได้อย่างรวดเร็ว ตลอดจนเขียนเทสต์ครอบคลุมทั้ง Component UI (4 ข้อ) และ API เพิ่มเติม (2 ข้อ) รันเทสต์ผ่านครบถ้วน 187/187 เทสต์ค่ะ 👍
> เพื่อให้โค้ดมีความสมบูรณ์แบบระดับ Production และไม่ส่งผลกระทบต่อ Issue #5 (Resolution Gate) ขอฝากปรับปรุง 3 จุดสำคัญ และจุดเก็บตกเล็กน้อยดังนี้ค่ะ:
> 
> ---
> 
> ### 🛑 จุดที่ต้องแก้ไขก่อน Merge (Required Changes)
> #### 1. เพิ่มหัวข้อ `### 3.4 PR-04` ใน `docs/lab-04/reviewer.md` (Document Trail)
> - ใน Master PR Table (Section 2) มีการเพิ่มแถว PR #108 เรียบร้อยแล้ว แต่ใน **Section 3 (Full Review Trail) ยังขาดหัวข้อ `### 3.4 PR-04: Actions Taken UI on Ticket Detail (Issue #4)`** ทำให้ไม่มีบันทึกรายละเอียดการตรวจทานของ PR นี้ค่ะ
> - รบกวนเพิ่มหัวข้อ 3.4 พร้อมระบุ Branch, Target, วัตถุประสงค์ และเตรียมพื้นที่สำหรับบันทึกผลการรีวิวด้วยนะคะ
> 
> #### 2. ส่ง Callback `onActionsChange` ใน `StaffTicketDetail.tsx` และ `TicketDetail.tsx` (State Desynchronization)
> - ใน `ActionsTaken.tsx` มีการประกาศ prop `onActionsChange?: (actions: ActionTaken[]) => void` และเรียกใช้งานใน `updateItems` ดีแล้ว แต่ในจุดเรียกใช้งานที่ `StaffTicketDetail.tsx` (บรรทัด 429) และ `TicketDetail.tsx` (บรรทัด 178) ใส่เพียง:
>   ```tsx
>   <ActionsTaken ticketId={ticket.id} actions={ticket.actionsTaken} />
>   ```
>   การไม่ส่ง onActionsChange ทำให้เมื่อเจ้าหน้าที่กด Add, Edit หรือกด Quick Complete Action สำเร็จ ข้อมูลใน ticket.actionsTaken ของหน้าแม่จะไม่อัปเดตตาม ซึ่งจะทำให้เกิดปัญหาใน Issue #5 (Resolution Gate) ทันที เพราะหน้าแม่จะไม่ทราบว่า Action ถูกเคลียร์เสร็จแล้ว จนกว่าจะกด Refresh หน้าจอ
>   วิธีแก้: รบกวนส่ง callback อัปเดต state แม่:
>   ```tsx
>   <ActionsTaken
>     ticketId={ticket.id}
>     actions={ticket.actionsTaken}
>     onActionsChange={(updatedActions) =>
>       setTicket((prev) => (prev ? { ...prev, actionsTaken: updatedActions } : prev))
>     }
>   />
>   ```
> 
> #### 3. ปรับสี Status Badge ของ CANCELLED และ COMPLETED ให้ตรงกับ Zen Green Tokens
> ใน `docs/lab-04/ui-spec.md` §1 กำหนดว่าสถานะ `CANCELLED` ต้องใช้คู่สี soft red:
> - `--action-cancelled-bg: #fef2f2`, `--action-cancelled-text: #991b1b`
> - `--action-completed-bg: #f0fdf4`, `--action-completed-text: #166534`
> ใน `ACTION_STATUS_META` ของ `ActionsTaken.tsx` ปัจจุบันใช้สีเทา (`#E5E7EB` / `#374151`) สำหรับ Cancelled และ `#C6F6D5` / `#22543D` สำหรับ Completed ฝากปรับให้ตรงกับ Design System Tokens ของแลปด้วยนะคะ
> 
> ---
> 
> ### 💡 ข้อเสนอแนะเพิ่มเติม (Minor Suggestions)
> - **Client-side Validation & MaxLength:**
>   - ในฟังก์ชัน `validate()` แนะนำให้ตรวจ `result` เมื่อสถานะเป็น `COMPLETED` ว่าต้องมีความยาวอย่างน้อย 2 ตัวอักษร (`result.trim().length >= 2`) เพื่อให้ตรงกับ Validation ของ Backend (2–1000 ตัวอักษร) ป้องกันไม่ให้เกิด Error 400 จากเซิร์ฟเวอร์
>   - เพิ่ม attribute `maxLength={1000}` ให้กับ `action-description` และ `action-result`, และ `maxLength={500}` ให้กับ `action-followup-note` และ `action-attachment-notes`
> - **Accessibility (A11Y):**
>   - เพิ่ม `role="alert"` หรือ `aria-live="polite"` ให้กับกล่องข้อความ error ใต้ฟิลด์อินพุต เพื่อให้ Screen Reader แจ้งเตือนผู้ใช้ได้ถูกต้อง
>   - ครอบ emoji ในป้ายสถานะ (`⏳`, `🔧`, `✅`, `⛔`) ด้วย `<span aria-hidden="true">` เพื่อไม่ให้ Screen Reader อ่านออกเสียง emoji ซ้ำซ้อน
> - **Safe Error Response ใน `server/src/app.ts`:**
>   - ใน `GET /api/users/assignable` บล็อก `catch` ไม่ควรส่ง `message: err?.message` ออกไปใน 500 response ตามมาตรฐาน SAFE-01 แนะนำให้ตอบเพียง `{ error: "Failed to fetch assignable staff" }`
> - **Wording ใน Section 4.1.7 ของ `reviewer.md`:**
>   - ข้อความเดิมระบุว่า `"Reviewer อนุมัติและผู้เขียน merge PR #75 เข้า lab4-staging เรียบร้อย"` แนะนำปรับเป็น `"Reviewer (@jejaebubu) อนุมัติและเป็นผู้กด Merge PR #75"` เพื่อให้ตรงกับข้อกำหนดวิชาที่ห้าม merge PR ของตนเองค่ะ
> 
> ฝากปรับแก้ตามประเด็นด้านบนแล้ว push เข้ามาใหม่นะคะ เดี๋ยวจะรีบมาตรวจซ้ำและกด Approve ให้ทันทีเลยค่ะ ขอบคุณมาก ๆ ค่ะ

#### 💬 Round 1 Author Response by @jejaebubu
**Response Date:** 2026-11-01  
**Commit:** `ce25314` (Fix), `3f029b7` (Review trail)  
**Author Response (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและครบถ้วนมากค่ะ แก้ไขครบทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดแล้วใน commit ce25314 (และอัปเดตบันทึก SHA ใน 3f029b7) ค่ะ:
> 1. เพิ่มหัวข้อ ### 3.4 PR-04 ใน docs/lab-04/reviewer.md — เพิ่มบันทึก Branch, Target, วัตถุประสงค์, ข้อความรีวิวรอบที่ 1 และคำตอบของผู้เขียนใน Section 3.4 พร้อมอัปเดตตาราง Master PR Table ใน Section 2
> 2. ส่ง Callback onActionsChange ใน StaffTicketDetail.tsx และ TicketDetail.tsx — ผูก onActionsChange={(updatedActions) => setTicket((prev) => (prev ? { ...prev, actionsTaken: updatedActions } : prev))} ทั้งสองหน้า เพื่อให้ ticket.actionsTaken บน parent state ซิงก์ทันทีเมื่อเพิ่ม/แก้ไข/เปลี่ยนสถานะ Action เตรียมพร้อมสำหรับ Resolution Gate ใน Issue #5
> 3. ปรับสี Status Badge ใน ActionsTaken.tsx ให้ตรงกับ Zen Green Tokens (ui-spec.md §1) — ปรับ COMPLETED เป็น backgroundColor: "#f0fdf4", color: "#166534" และ CANCELLED เป็น backgroundColor: "#fef2f2", color: "#991b1b"
> 4. Client-side Validation & maxLength — ปรับ validate() ให้ตรวจ form.result.trim().length < 2 เมื่อสถานะเป็น COMPLETED และเพิ่ม maxLength={1000} บน action-description, action-result รวมถึง maxLength={500} บน action-followup-note, action-attachment-notes
> 5. Accessibility (A11Y) — เพิ่ม role="alert" ให้กับข้อความ error ใต้ฟิลด์ทุกจุด (action-date-error, action-assignee-error, action-description-error, action-result-error, action-followup-note-error) และครอบ emoji ในป้ายสถานะ (⏳, 🔧, ✅, ⛔) ด้วย <span aria-hidden="true">
> 6. Safe Error Response (SAFE-01) — ปรับบล็อก catch ของ GET /api/users/assignable ใน server/src/app.ts ให้ตอบกลับเพียง { error: "Failed to fetch assignable staff" } โดยไม่เปิดเผย err?.message
> 7. Wording ใน Section 4.1.7 ของ reviewer.md — ปรับเป็น "Reviewer (@jejaebubu) อนุมัติและเป็นผู้กด Merge PR #75 เข้า lab4-staging เรียบร้อย" ตามกติกาห้าม merge PR ของตนเอง
> 
> รันเทสต์ตรวจสอบซ้ำผ่านครบ 187/187 เทสต์ (Server 104 + Client 83) รบกวนช่วยตรวจซ้ำและกด Approve/Merge ให้ด้วยนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review by @titayaaa (Approved)
**Review Date:** 2026-11-01  
**Verdict:** 🟢 Approved  
**Review Comments (Verbatim):**

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

#### 💬 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#108](https://github.com/jejaebubu/toktickit/pull/108)
- **Merged by:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `2425b2d1fd224dcbf10e89f97dee9adf9805dd7c`
- **Merged At:** 2026-11-01 17:42:22 +07:00 (10:42:22 UTC)
- **Status:** ✅ Merged successfully

---

### PR #109: feat(workflow): Ticket Status Transition Matrix, Resolution Gate, and Concurrency Check (Issue #5)
- **PR URL:** [jejaebubu/toktickit#109](https://github.com/jejaebubu/toktickit/pull/109)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
**Review Date:** 2026-11-01  
**Verdict:** 🛑 Changes Requested  
**Review Comments (Verbatim):**

> ขอบคุณสำหรับ PR #109 ที่ครอบคลุมการทำงานของ Ticket Workflow, Resolution Gate และ Optimistic Concurrency Check สำหรับ **Issue #5 (PR-05)** ได้อย่างเป็นระบบมากค่ะ โดยเฉพาะ:
> - การวางโครงสร้าง State Transition ควบคุมทั้งปุ่มใน UI และ Guard ใน Backend
> - การทำ Resolution Gate Confirmation Modal เมื่อยังมี Action ค้าง (`PENDING`/`IN_PROGRESS`) พร้อม fallback ลอง resolve เพื่อรับ error 409
> - การดักจับ Concurrency Mismatch (`STALE_UPDATE`) ทั้งจาก Body `expectedUpdatedAt` และ Header `If-Unmodified-Since`
> - ชุดทดสอบครบทั้ง Server (108 tests) และ Client (87 tests) รวม 195/195 tests ผ่าน 100%
>
> อย่างไรก็ตาม จากการตรวจสอบอย่างละเอียดเปรียบเทียบกับข้อกำหนดใน `specification.md`, `api-spec.md` และหลักความปลอดภัยของระบบ พบจุดบกพร่องและข้อขัดแย้งกับสเปกที่จำเป็นต้องปรับปรุงแก้ไข 3 จุดสำคัญ (Required Changes) และข้อเสนอแนะเพิ่มเติมเพื่อความสมบูรณ์แบบ (Minor Suggestions) ดังนี้ค่ะ:
>
> ---
>
> ### 🛑 1. ประเด็นที่ต้องแก้ไขให้ถูกต้อง (Required Changes — Blocking)
>
> #### 1.1 State Transition Matrix: สถานะ `Open` ข้ามไป `Resolved` โดยตรงไม่ได้ และสถานะ `Pending` หายไป
> - **ไฟล์ที่พบ:** `server/src/app.ts` และ `client/src/components/StaffTicketDetail.tsx`
> - **ปัญหา:**
>   1. ตั๋วที่อยู่ในสถานะ `Open` ห้ามข้ามไป `Resolved` โดยตรง งานจะต้องถูกส่งเข้าสู่สถานะปฏิบัติงานจริงก่อน (`In Progress`, `Waiting for Requester` หรือ `Pending`) ดังนั้นในอาร์เรย์ของ `Open` จะต้องไม่มี `"Resolved"`
>   2. สถานะ **`Pending`** หายไปจาก Matrix ส่งผลให้หากมีตั๋วค้างอยู่ในสถานะ `Pending` จะถูกล็อกตายกลายเป็น Terminal state ทันที
> - **แนวทางแก้ไข:**
>   - ปรับ `Open` เป็น `["In Progress", "Waiting for Requester", "Pending", "Cancelled"]`
>   - เพิ่มคีย์ `"Pending": ["In Progress", "Waiting for Requester", "Resolved", "Cancelled"]` พร้อมอนุญาตให้ `In Progress`, `Waiting for Requester` และ `Reopened` ย้ายไป `Pending` ได้
>
> #### 1.2 Side-effect การเปลี่ยนสถานะตั๋วเมื่อ Requester แจ้งว่าปัญหาได้รับการแก้ไข
> - **ไฟล์ที่พบ:** `server/src/app.ts`
> - **ปัญหา:** การใส่เงื่อนไข `nextStatusForRequester` เปลี่ยนสถานะเป็น `"Waiting for Requester"` เป็น side-effect ที่ขัดกับข้อกำหนดที่ระบุว่าการแจ้งของ Requester เป็นเพียง advisory และต้องไม่เปลี่ยนสถานะตั๋ว
> - **แนวทางแก้ไข:** ในการอัปเดต advisory flag ของ Requester ให้ส่งเฉพาะ `data: { requesterIndicatedResolved: true }` คงสถานะเดิมของตั๋วไว้ 100%
>
> #### 1.3 ป้องกันข้อมูลภายในรั่วไหลในบล็อก 500 Catch (ตามกฎ SAFE-01)
> - **ไฟล์ที่พบ:** `server/src/app.ts`
> - **แนวทางแก้ไข:** บันทึก error ลง `console.error` ฝั่งเซิร์ฟเวอร์ และส่งคืนเฉพาะ `{ error: "Internal Server Error", message: "Failed to update ticket." }` โดยไม่ส่ง `err?.message`
>
> ### 💡 2. ข้อเสนอแนะเพิ่มเติม & จุดเก็บตก (Minor Suggestions)
> - **HTTP Status Code สำหรับ Transition ที่ไม่อนุญาต:** ตรวจสอบความสอดคล้องกับเอกสารสัญญาของโปรเจกต์ (`400 Bad Request` ตาม `specification.md` AC-07, `api-spec.md` §4.1 และ `tests.md` API-06)
> - **Precision ของ Header `If-Unmodified-Since`:** ตามมาตรฐาน RFC 7231 เวลาใน HTTP Header มีความละเอียดระดับวินาที แนะนำให้ปัดเศษเทียบระดับวินาที `Math.floor(expectedTime / 1000) !== Math.floor(actualTime / 1000)` เมื่อรับมาจาก Header
> - **การแสดงผล Advisory Banner บนตั๋วที่ Resolve/Closed ไปแล้ว:** ใน `TicketDetail.tsx` และ `StaffTicketDetail.tsx` แนะนำให้เพิ่มเงื่อนไข `!["Resolved", "Closed", "Cancelled"].includes(ticket.status)` เพื่อไม่ให้ข้อความ `"Pending Staff Review"` ค้างบนตั๋วที่จบงานไปแล้ว
> - **UX ของ Stale Update Modal:** เพิ่มปุ่ม `"Dismiss"` ใน `StaffTicketDetail.tsx` เพื่อให้เจ้าหน้าที่สามารถปิด Modal ชั่วคราวไปคัดลอกข้อความ Note/Comment ที่กำลังพิมพ์ค้างไว้ได้
> - **สีของปุ่ม `Cancelled` ใน Workflow Action Bar:** เปลี่ยนจาก `btn-outline-success` เป็น `btn-outline-danger` เพื่อความชัดเจนของ UI

#### 💬 Round 1 Author Response by @jejaebubu
**Response Date:** 2026-11-01  
**Commits:** `45b424d`, `8f8c8e6`  
**Author Response (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและรอบคอบมากค่ะ [@titayaaa](https://github.com/titayaaa) ดำเนินการแก้ไขครบทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดใน commits 45b424d และ 8f8c8e6 เรียบร้อยแล้วค่ะ:
> 
> 1. **ปรับปรุง TICKET_STATUS_TRANSITIONS (`server/src/app.ts`, `StaffTicketDetail.tsx`, `specification.md`)**: นำ "Resolved" ออกจากสถานะถัดไปของ Open (Open: ["In Progress", "Waiting for Requester", "Pending", "Cancelled"]) เพื่อบังคับให้ตั๋วต้องเข้าสู่สถานะปฏิบัติงานจริงก่อนจึงจะกด Resolve ได้ พร้อมเพิ่มเทสต์ยืนยันว่า Open -> Resolved ถูกปฏิเสธด้วย INVALID_STATUS_TRANSITION
> 2. **เพิ่มสถานะ "Pending" ใน TICKET_STATUSES และ TICKET_STATUS_TRANSITIONS**: (Pending: ["In Progress", "Waiting for Requester", "Resolved", "Cancelled"]) และอนุญาตให้ย้ายไป Pending ได้จาก Open, In Progress, Waiting for Requester, Reopened
> 3. **ตัด Side-effect การเปลี่ยนสถานะเมื่อ Requester แจ้งเจตนา (`server/src/app.ts`, `staff-ticket-detail.api.test.ts`)**: ปรับการอัปเดตเมื่อ Requester ส่ง { requesterIndicatedResolved: true } ให้ส่งเพียง data: { requesterIndicatedResolved: true } โดยคงสถานะ ticket.status เดิมไว้ 100%
> 4. **Safe Error Response ตามเกณฑ์ SAFE-01 (`server/src/app.ts`)**: ในบล็อก catch ของ handleTicketPatch บันทึก console.error("Failed to update ticket:", err) และส่งคืนเฉพาะ { error: "Internal Server Error", message: "Failed to update ticket." } โดยไม่แนบ err?.message
> 5. **Minor Suggestions ทั้งหมด**:
>    - **RFC 7231 If-Unmodified-Since Precision**: ปรับการเทียบเวลาใน server/src/app.ts ให้เทียบความละเอียดระดับวินาที (Math.floor(expectedTime / 1000) !== Math.floor(actualTime / 1000)) เมื่ออ่านจาก Header If-Unmodified-Since และเทียบระดับมิลลิวินาทีเมื่อส่งผ่าน expectedUpdatedAt ใน JSON body พร้อมเพิ่มเทสต์ toUTCString() ใน API-08
>    - **ซ่อน Advisory Banner บนตั๋วที่จบงานแล้ว**: เพิ่มเงื่อนไข !["Resolved", "Closed", "Cancelled"].includes(ticket.status) ในทั้ง StaffTicketDetail.tsx และ TicketDetail.tsx
>    - **UX ของ Stale Update Modal**: เพิ่มปุ่ม "Dismiss" (data-testid="stale-update-dismiss") ใน StaffTicketDetail.tsx เพื่อให้เจ้าหน้าที่ปิดหน้าต่างไปคัดลอกข้อความที่พิมพ์ค้างไว้ได้ก่อนกด Reload
>    - **สีปุ่ม Cancelled ใน Workflow Action Bar**: ปรับคลาสของปุ่ม Cancelled เป็น btn-outline-danger
>    - **หมายเหตุเรื่อง HTTP Status Code ของ INVALID_STATUS_TRANSITION**: ในเอกสารสัญญาของฝั่งโปรเจกต์เรา (docs/lab-04/specification.md AC-07, docs/lab-04/api-spec.md §4.1 และ docs/lab-04/tests.md API-06) กำหนดให้ Invalid Status Transition คืนค่า 400 Bad Request (ส่วน 422 Unprocessable Entity ใช้สำหรับ assigneeId ที่ไม่ถูกต้องตาม AC-12) จึงคง 400 ไว้ให้ตรงตาม Engineering Contract ของเรโค่ะ
> 
> รันชุดทดสอบผ่านครบ 195/195 เทสต์ (Server 108 + Client 87) รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review by @titayaaa (Approved)
**Review Date:** 2026-11-01  
**Verdict:** 🟢 Approved  
**Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
> 
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้ง 3 Required Changes และ Minor Suggestions ทั้งหมดใน commits `45b424d` และ `8f8c8e6` อย่างรอบคอบและรวดเร็วมากค่ะ ตรวจสอบโค้ดและชุดทดสอบซ้ำอย่างละเอียดแล้ว:
> 
> 1. **State Transition Matrix สมบูรณ์ 100%**:
>    - นำ `"Resolved"` ออกจากสถานะถัดไปของ `Open` บังคับให้งานต้องเข้าสู่สถานะดำเนินการก่อน
>    - เพิ่มสถานะ `"Pending"` เข้าสู่ `TICKET_STATUSES` และ `TICKET_STATUS_TRANSITIONS` ครบถ้วนทั้ง backend, frontend และเอกสาร `specification.md`
>    - เพิ่มเทสต์ตรวจสอบการปฏิเสธ `Open -> Resolved` ด้วย `400 INVALID_STATUS_TRANSITION` ชัดเจน
> 2. **ขจัด Side-effect ใน Requester Advisory สำเร็จ**:
>    - เมื่อ Requester กด "My problem is resolved" ระบบอัปเดตเฉพาะ `requesterIndicatedResolved: true` โดยคงสถานะเดิมของตั๋วไว้ 100%
>    - ปรับแก้เทสต์เดิมใน `staff-ticket-detail.api.test.ts` และเพิ่มการยืนยันใน `ticket-workflow.api.test.ts` (API-07) ครบถ้วน
> 3. **ความปลอดภัยตามเกณฑ์ SAFE-01**:
>    - บล็อก `catch` ของ `handleTicketPatch` บันทึก log ภายในเซิร์ฟเวอร์ และตอบกลับด้วย generic error ไม่ส่ง `err?.message` ออกสู่ภายนอก
> 4. **Minor Suggestions & UX Polish**:
>    - คำนวณ RFC 7231 `If-Unmodified-Since` ปัดเศษระดับวินาทีอย่างถูกต้อง และรองรับ `toUTCString()`
>    - ซ่อน Advisory Banner เมื่อตั๋วอยู่ในสถานะ Resolved / Closed / Cancelled บนทั้งสองมุมมอง
>    - เพิ่มปุ่ม Dismiss บน Stale Update Modal เพื่อป้องกันข้อมูลที่เจ้าหน้าที่กำลังพิมพ์สูญหาย
>    - ปรับสีปุ่ม Cancelled เป็น `btn-outline-danger` ตรงตาม Semantics
>    - คำชี้แจงเรื่อง Status Code 400 สำหรับ Invalid Status Transition สอดคล้องกับ Engineering Contract ใน `specification.md` และ `api-spec.md` เป็นอย่างดี
> 
> ผลการรันเทสต์ผ่านครบ 195/195 เทสต์ (Server 108 + Client 87) โค้ดมีคุณภาพสูงและพร้อมสำหรับการใช้งานจริง ขออนุมัติ (Approve) และยินดีดำเนินการกด Merge เข้าสู่ `lab4-staging` ให้ทันทีค่ะ 🎉

#### 💬 Merge Event by Reviewer @titayaaa
- **Merged PR URL:** [jejaebubu/toktickit#109](https://github.com/jejaebubu/toktickit/pull/109)
- **Merged by:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Merge Commit SHA:** `468a7ca`
- **Status:** ✅ Merged successfully — **Closes Issue #5**

---

### PR #110: feat(dashboard): IT Staff Dashboard API, summary metrics, and UI screen (Issue #6)
- **PR URL:** [jejaebubu/toktickit#110](https://github.com/jejaebubu/toktickit/pull/110)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved (Round 2)
- **Scope & Objectives:**
  - `GET /api/dashboard/staff`: REST API สำหรับ IT Staff และ Admin ในการดึง metrics เชิงปฏิบัติการแบบ real-time (`new`, `open`, `inProgress`, `waitingForRequester`, `myAssigned`), ปฏิเสธ Requester ด้วย `403 Forbidden`, และส่งคืน `recentTickets` 5 รายการล่าสุด
  - พารามิเตอร์ `ownerId=me` บน `GET /api/tickets`
  - คอมโพเนนต์ `StaffDashboard.tsx`: การ์ดตัวชี้วัด 5 ใบพร้อมฟังก์ชัน Drill-down เชื่อมโยงไปยัง `StaffTicketQueue` ตามตัวกรอง, ตารางและ Mobile card รายการตั๋วล่าสุด, และปุ่ม Quick Actions
  - ชุดทดสอบ API (`staff-dashboard.api.test.ts`) และ UI (`StaffDashboard.test.tsx`) ครอบคลุม 6 เคสใหม่ รวมเป็น 201 เทสต์

#### 💬 Round 1 Review by @titayaaa (Changes Requested)
- **Review Date:** 2026-11-01
- **Verdict:** 🔴 Changes Requested
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
> ฝากแก้ไขจุดที่ 1 เรื่องเมนูของ Requester และจุดที่ 2 เรื่อง wording ของหัวข้อแผงตั๋ว จากนั้น push commit ขึ้นมาใหม่นะคะ เดี๋ยวจะรีบเข้ามาตรวจซ้ำและกด Approve / Merge ให้ทันทีเลยค่ะ ขอบคุณมาก ๆ ค่ะ! 🚀

#### 💬 Round 1 Author Response by @jejaebubu
- **Response Date:** 2026-11-02
- **Commits:** `1419b97`, `512cbab`
- **Author Response Details (Verbatim):**

> ขอบคุณสำหรับรีวิวที่ละเอียดและช่วยตรวจพบจุด Regression ของเมนู Requester ค่ะ @titayaaa ดำเนินการแก้ไขครบทั้ง 3 ประเด็นใน commits 1419b97 และ 512cbab เรียบร้อยแล้วค่ะ:
> 1. นำเมนู Dashboard ออกจาก REQUESTER ใน Header.tsx (Required 1.1): ปรับ NAV_BY_ROLE.REQUESTER ให้คงเฉพาะ My Tickets และ Create Ticket (เปิด Dashboard เฉพาะ IT_STAFF และ ADMINISTRATOR ใน PR นี้) เพื่อป้องกันปัญหาหน้าว่างก่อนพัฒนา Issue #7 (Requester Dashboard)
> 2. ปรับหัวข้อแผงตั๋วล่าสุดใน StaffDashboard.tsx เป็น "Recent Queue Tickets" (Should Fix 2.1): เปลี่ยนจาก "My Recent Tickets" เป็น "Recent Queue Tickets" ให้ตรงกับขอบเขตข้อมูลจริงที่ดึงตั๋วอัปเดตล่าสุด 5 รายการของคิวบริการทั้งหมด พร้อมเพิ่ม assertion ยืนยันใน StaffDashboard.test.tsx
> 3. อัปเดตลิงก์ PR #110 และบันทึกการรีวิวใน docs/lab-04/reviewer.md (Minor Doc Polish 3.1): เพิ่มลิงก์ [GitHub #110](https://github.com/jejaebubu/toktickit/pull/110) ในตาราง Master PR Table (Section 2) และในหัวข้อ Section 3.6 PR-06 พร้อมบันทึกผลการรีวิวรอบที่ 1 และการแก้ไขครบถ้วนค่ะ
> 
> รันชุดทดสอบผ่านครบ 201/201 เทสต์ (Server 110 + Client 91) รบกวนช่วยตรวจทานซ้ำอีกครั้งนะคะ ขอบคุณมากค่ะ

#### 💬 Round 2 Review by @titayaaa (Approved)
- **Review Date:** 2026-11-02
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### ✅ การตรวจประเมินรอบที่ 2 (Round 2 Review — APPROVED)
> 
> ขอบคุณ @jejaebubu ที่ดำเนินการแก้ไขปรับปรุงครบถ้วนสมบูรณ์ทั้งประเด็น Blocking, Should Fix และ Minor Suggestions ใน commits `1419b97` และ `512cbab` อย่างรวดเร็วและประณีตมากค่ะ ตรวจสอบโค้ดและชุดทดสอบซ้ำอย่างละเอียดแล้ว:
> 
> 1. **ขจัด Regression หน้าจอว่างเปล่าของ Requester สำเร็จ (Required 1.1)**:
>    - นำ `{ id: "dashboard", label: "Dashboard" }` ออกจากเมนูของ `REQUESTER` ใน `Header.tsx` เรียบร้อย ทำให้คงเหลือเฉพาะเมนูที่รองรับจริงในปัจจุบัน (`My Tickets` และ `Create Ticket`) เมนูจะไม่นำทางไปสู่หน้าว่างเปล่าอีกต่อไป
> 2. **ความสอดคล้องของหัวข้อแผงตั๋วกับ Query ข้อมูลจริง (Should Fix 2.1)**:
>    - ปรับเปลี่ยนหัวข้อแผงใน `StaffDashboard.tsx` เป็น `"Recent Queue Tickets"` ถูกต้องตรงกับขอบเขตข้อมูลจริงที่ query ดึงตั๋ว 5 รายการล่าสุดของคิวบริการทั้งหมด
>    - อัปเดต assertion ใน `StaffDashboard.test.tsx` ตรวจสอบข้อความใหม่ได้อย่างถูกต้อง
> 3. **ความสมบูรณ์ของเอกสารบันทึกการรีวิว (Minor 3.1)**:
>    - มีการใส่ลิงก์ `[GitHub #110](https://github.com/jejaebubu/toktickit/pull/110)` ใน Master PR Table (Section 2) และใน Section 3.6 ครบถ้วน
>    - บันทึกประวัติการรีวิวรอบที่ 1 และผลการแก้ไขครบถ้วนสมบูรณ์ตามเกณฑ์ของ Lab 4
> 
> ผลการรันชุดทดสอบผ่านครบ 201/201 เทสต์ (Server 110 + Client 91) โค้ดมีคุณภาพสูงมากและพร้อมสำหรับการใช้งานจริง ขออนุมัติ (Approve) และยินดีดำเนินการกด Merge เข้าสู่ `lab4-staging` ให้ทันทีค่ะ 🎉

---

### PR #111: feat(dashboard): Requester Dashboard API, owned ticket metrics, and UI screen (Issue #7)
- **PR URL:** [jejaebubu/toktickit#111](https://github.com/jejaebubu/toktickit/pull/111)
- **Author:** `@jejaebubu`
- **Reviewer:** `@titayaaa` (ฑิตญา ผ่องสกุล)
- **Target Branch:** `lab4-staging`
- **Current Status:** ✅ Approved (Round 1)
- **Scope & Objectives:**
  - `GET /api/dashboard/requester`: API แสดงภาพรวมสำหรับ Requester พร้อมการกักกันข้อมูล (Data Isolation) ให้เห็นเฉพาะตั๋วที่ตนเองสร้างอย่างเคร่งครัด (`AC-05`, `FR-09`, `BR-11`)
  - คำนวณสรุปสถิติตัวชี้วัด 4 หมวด: `myOpen`, `inProgress`, `resolved`, `closed`
  - ส่งคืนรายการ `recentTickets` 5 รายการล่าสุดเรียงตาม `updatedAt: desc` พร้อม Quick Actions (`create-ticket`, `view-tickets`)
  - พัฒนาคอมโพเนนต์ `RequesterDashboard.tsx` ธีม Zen Green พร้อมการ์ดตัวชี้วัดที่รองรับการคลิก Drill-down ไปยัง `MyTicketsList` ตามสถานะ (`FR-10`)
  - อัปเดต `Header.tsx` นำแท็บเมนู `Dashboard` กลับมาสำหรับบทบาท `REQUESTER`
  - ชุดทดสอบ API (`requester-dashboard.api.test.ts`) และ UI (`RequesterDashboard.test.tsx`) ครอบคลุม 6 เคสใหม่ รวมเป็น 207 เทสต์ (Server 112 / Client 95)

#### 💬 Round 1 Review by @titayaaa (Approved)
- **Review Date:** 2026-11-02
- **Verdict:** 🟢 Approved
- **Review Comments (Verbatim):**

> ### PR-07 Review & Verification: APPROVED (LGTM! 🚀)
> 
> ตรวจทานความถูกต้องของ PR #111 (Issue #7: Requester Dashboard API and UI) อย่างละเอียดครบถ้วนทุกมิติแล้วค่ะ:
> 
> 1. **Strict Data Isolation & Zero Data Leakage (`AC-05`, `FR-09`, `BR-11`)**:
>    - `GET /api/dashboard/requester` ผูก `where: { requesterId: req.user.id }` ทั้งใน `prisma.ticket.count` ทั้ง 4 หมวดและ `prisma.ticket.findMany` (จำกัด 5 รายการล่าสุดตาม `updatedAt: desc`) 
>    - ทดสอบยืนยันแล้วว่าตั๋วของ Requester ท่านอื่นไม่รั่วไหลเข้ามาในผลลัพธ์อย่างเด็ดขาด
> 2. **Access Control & RBAC (`AC-06`)**:
>    - ตรวจสอบ JWT ผ่าน `authenticateToken` (คืน `401 Unauthorized` หากไม่ล็อกอิน) และจำกัดบทบาทเฉพาะ `REQUESTER` (คืน `403 Forbidden` สำหรับ Staff และ Admin)
> 3. **UI/UX & Zen Green Design System Compliance (`STYLE-01`)**:
>    - คอมโพเนนต์ `RequesterDashboard.tsx` ใช้งานชุดสี Zen Green (`#006B3C`, `#EAF6EF`) ชัดเจน สวยงาม
>    - รองรับ Responsive สมบูรณ์แบบ (Desktop Table + Mobile Card Stack)
>    - Touch Target ของปุ่มและการ์ดทุกลูกได้ขนาด `>= 44px` ตามมาตรฐาน WCAG Accessibility
>    - มี Empty State พร้อมปุ่ม CTA `"Submit a new request"` เมื่อยังไม่มีประวัติตั๋ว
> 4. **Interactive Drill-Down & Navigation Flow (`FR-10`)**:
>    - การคลิกการ์ด Metrics นำทางไปยัง `MyTicketsList` พร้อมส่งฟิลเตอร์สถานะที่เกี่ยวข้องได้อย่างแม่นยำ
>    - อัปเดต `STATUS_OPTIONS` ใน `MyTicketsList.tsx` ครอบคลุมสถานะตั๋วทั้งหมด
>    - ปลดล็อกเมนู `Dashboard` สำหรับ Requester ใน `Header.tsx` เรียบร้อย
> 5. **Test Coverage**:
>    - ชุดทดสอบ Backend `requester-dashboard.api.test.ts` (API-11, API-11b) ผ่าน 100%
>    - ชุดทดสอบ Frontend `RequesterDashboard.test.tsx` (UI-05a, UI-05b, UI-05c, UI-05d) ครอบคลุมครบถ้วน
> 
> งานเรียบร้อยสมบูรณ์แบบมากค่ะ พร้อมสำหรับ Approve และ Merge เข้าสู่ `lab4-staging` ได้เลยค่ะ! 🎉
