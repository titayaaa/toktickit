# Peer Review Documentation (Lab 2)

## Reviewer Details

| PR # | Feature / Description | GitHub Issue | Branch | Reviewer |
| :--- | :--- | :--- | :--- | :--- |
| **PR #22** | Issue 5 & 6: Sprint Specification and DB Schema | Issue #5, #6 | `feature/lab2-sprint-specs` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #23** | Feature: Development Requester Selection API and UI | Issue #7 | `feature/lab2-requester-context` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #25** | Feature: Reference Data APIs | Issue #8 | `feature/lab2-reference-data` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #26 / #28 / #29** | Feature: Create Ticket API (with Retry on Ticket No. & Validation) | Issue #9 | `feature/lab2-create-ticket-api-reopen` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #27** | Feature: Create Ticket UI | Issue #10 | `feature/lab2-create-ticket-ui` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #30** | Feature: Attachment Management API and UI | Issue #11 | `feature/lab2-attachments` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #31** | Feature: My Tickets API (Search, Filter, Sort, Pagination) | Issue #12 | `feature/lab2-my-tickets-api` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #32** | Feature: My Tickets UI Screen & Interactive Controls | Issue #13 | `feature/lab2-my-tickets-ui` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #33** | Feature: Ticket Detail View & Ownership Protection | Issue #14 (#19) | `feature/lab2-ticket-detail` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #38** | Feature: E2E Testing & Visual Checking with Playwright | Issue #15 (#20) | `feature/lab2-e2e-visual-tests-reopen` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |
| **PR #39** | Docs: Release Integration, README & Review Documentation | Issue #16 (#21) | `feature/lab2-release-docs-reopen` | พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: [@jejaebubu](https://github.com/jejaebubu)) |

---

## Submitted PR Review Evidence (เพื่อนตรวจเรา — @jejaebubu ตรวจ @titayaaa)

### 1. PR #22: Issue 5 & 6: Sprint Specification and DB Schema
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/22`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "โครงสร้างดีมาก และใช้ mock auth header (Authorization: Bearer dev_requester_X) เป็นไอเดียที่ดี เผื่องานหน้าจะได้ไม่ต้องแก้ API contract ทีหลัง มีจุดที่อยากให้แก้ก่อน merge: specification.md ยังขาด BR เรื่องกันส่งซ้ำ, tests.md ยังไม่มี Unit test / visual test, ui-spec.md ยังไม่มี spec ของ app shell และกฎสี badge... ช่วย link Issue #5 กับ #6 ผ่านไอคอนเฟืองด้วยนะ"
- **Author Response & Resolution**:
  > "ขอบคุณสำหรับรีวิวมาก ๆ ตอนนี้เราจัดการแก้ตามที่แนะนำในแต่ละไฟล์เรียบร้อยแล้ว แล้วก็เรื่อง Link Issue เราเข้าไปกด Link ด้วยมือผ่านตรงเมนู Development แถบขวาให้แล้วด้วย รบกวนช่วยตรวจดูอีกรอบนะ"
- **Approval Comment**:
  > "เช็กเรียบร้อยแล้วนะ แก้ครบตามที่คอมเมนต์ไว้แล้ว ทั้ง BR, test cases, UI spec และ API spec ตอนนี้โอเคแล้ว เรา Approve ให้เลย"

---

### 2. PR #23: Feature: Development Requester Selection API and UI (Issue 7)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/23`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment**:
  > "ทำได้ดีมากที่สร้าง flow หน้า Selection ครบ ทั้ง 4 states... มี 2 จุดที่คิดว่าควรแก้: 1. คำว่า 'Logged in as:' ขัดกับ BR-03 2. JSON.parse ใน RequesterContext ต้องมี try/catch และฝากยืนยันว่า inactive requester ถูก filter ที่ backend query level จริง (BR-07)"
- **Author Response & Resolution**:
  > "แก้ตามคอมเมนต์เรียบร้อยแล้วน้า เทสฝั่ง Client/Server ผ่านแล้ว แก้คำว่า Logged in as เป็น Current Requester, เพิ่ม try/catch กันแอปพัง, และเพิ่มเทส unauthenticated flow, empty state, เช็ก BR-07 กรอง Inactive user ครบถ้วน"
- **Approval Comment**:
  > "โอเค เช็คอันที่แก้มาให้หมดแล้วนะดีมากกก"

---

### 3. PR #25: Feature: Reference Data APIs (Issue 8)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/25`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment**:
  > "Endpoint และ error handling ทำได้ดี แต่ใน diff ไม่เห็นการแก้ seed.ts เลย ช่วยเช็คอีกรอบได้มั้ยว่า seed.ts มีการเพิ่ม 'Legacy Hardware' และ 'Old Intranet' (isActive: false) จริง"
- **Author Response & Resolution**:
  > "ขอบคุณมากก เพิ่งเห็นเลย พอดีตอนสร้าง PR ลืม git add ไฟล์ seed.ts เข้าไปด้วย ตอนนี้ได้แก้ไข Push ไฟล์ seed.ts ที่เพิ่ม Legacy Hardware กับ Old Intranet (isActive: false) เข้าไปเรียบร้อยแล้วนะ"
- **Approval Comment**:
  > "เช็คแล้วครบทุกจุดเลย seed.ts มี Legacy Hardware กับ Old Intranet ที่ isActive: false จริง ใช้ upsert เหมือนเดิมด้วย เดี๋ยว Approve แล้ว merge เข้า lab2-staging ให้เลยนะ"

---

### 4. PR #26 / PR #28 / PR #29: Feature: Create Ticket API (Issue 9)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/29` (Reopen หลัง revert PR #26 ใน #28)
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment**:
  > "1. เรื่อง gen ticket number ถ้ามีคนกดส่งพร้อมกันสองคนเป๊ะๆ อาจได้เลขซ้ำ ควรใส่ retry 2. category/relatedSystem เช็ค isActive 3. เพิ่ม boundary test 200/2000 ตัวอักษร และปรับ test จาก console.warn เป็น expect.fail()"
- **Author Response & Resolution**:
  > "แก้ไขเรียบร้อย: เติม Retry logic ครอบ try-catch ดัก P2002 Unique constraint, เติม isActive: true validation, เพิ่ม boundary tests และเปลี่ยนเป็น expect.fail() ตามคำแนะนำ"
- **Approval Comment**:
  > "เช็คครบทุก endpoint แล้วนะ related-systems, categories, requesters, tickets มาครบหมด retry logic กับ isActive check ก็ยังอยู่ถูกต้อง ขอบคุณที่แก้ให้เรียบร้อย โอเคหมดแล้ว"

---

### 5. PR #27: Feature: Create Ticket UI (Issue 10)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/27`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "1. summary/description ยังไม่ได้ trim ก่อนส่งจริง 2. ยังไม่มี test สำหรับกรณี API fail ทั้งที่มี error handling ใน component"
- **Author Response & Resolution**:
  > "ขอบคุณมากสำหรับคำแนะนำนะ 1. ใส่ .trim() ให้ทั้ง summary และ description เรียบร้อย 2. เพิ่มเทสเคสจำลอง API fail เช็ค alert error และข้อมูลในฟอร์มยังอยู่ครบ 3. ปรับ loading state เป็น Non-blocking"
- **Approval Comment**:
  > "เช็คครบทุกไฟล์แล้วนะ แก้มาครบเลย ละเอียดดีมาก... เดี๋ยว Approve แล้วก็ merge เข้า lab2-staging ให้เลย"

---

### 6. PR #30: Feature: Attachment Management API and UI (Issue 11)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/30`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment**:
  > "ระบบ backend เช็กข้อมูลครบถ้วน ปลอดภัย ฝาก 3 จุด: 1. เพิ่ม test เช็กเจ้าของไฟล์ใน DELETE (403) 2. test กรณี attachment ID ไม่มีจริง (404) 3. ใน afterAll ลบไฟล์จริงใน uploads/"
- **Author Response & Resolution**:
  > "เพิ่มเทสครบทั้ง 3 จุด: ตรวจ requester อื่นพยายาม DELETE ได้ 403, ตรวจ ID ไม่มีจริงได้ 404 ทั้ง GET/DELETE, และเพิ่ม cleanup ลบไฟล์จริงใน uploads/ ก่อนเคลียร์ DB ใน afterAll"
- **Approval Comment**:
  > "โอเคเรียบร้อยทั้งหมดแล้ววว"

---

### 7. PR #31: Feature: My Tickets API (Issue 12)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/31`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "whitelist ของ sortField 6 ตัวจัดการดีมาก แต่มี 1 จุด: Category filter ตอนส่งค่าผิดยังไม่ตอบ 400 เหมือน priority/status ให้ปรับ categoryId/category invalid ให้ตอบ 400 Bad Request พร้อมเพิ่ม test"
- **Author Response & Resolution**:
  > "ปรับให้ตรวจ categoryId/category ถ้าไม่ใช่ตัวเลขจะตอบ 400 Bad Request ทันที พร้อมเพิ่ม test เช็ก category invalid, multi-filter, และ search no-results (ผ่าน 33/33 tests)"
- **Approval Comment**:
  > "Category filter แก้ตามที่คอมเมนต์ไว้ครบแล้วนะ ทั้งกรณีส่งค่าผิดที่ต้องได้ 400 และเพิ่ม test ครบถ้วน เช็กแล้ว test ผ่านครบ 33/33 โดยรวมโอเคเลย เดี๋ยว Approve ให้เลยนะ"

---

### 8. PR #32: Feature: My Tickets UI Screen & Interactive Controls (Issue 13)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/32`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "Sort by Priority ยังเรียงตามตัวอักษร A-Z อยู่ ควรเรียงตามระดับความสำคัญจริง (CRITICAL > HIGH > MEDIUM > LOW) เพื่อให้ตรงกับสี severity badge"
- **Author Response & Resolution**:
  > "ปรับการ Sort by Priority ให้เรียงตามระดับ Severity จริง (CRITICAL > HIGH > MEDIUM > LOW) ทั้งฝั่ง Frontend และ Backend พร้อมปรับชื่อ Dropdown เป็น 'Priority (High to Low)' / 'Priority (Low to High)' และเพิ่ม Unit Tests ทั้ง API และ UI"
- **Approval Comment**:
  > "เรื่อง Sort by Priority แก้ตามที่คอมเมนต์ไว้ครบแล้วนะ ตอนนี้เรียงตาม Severity จริงทั้งฝั่ง Backend และ Frontend แล้ว... test ผ่านครบทั้ง Client 22/22 และ Server 33/33 Approve & Merge ได้เลย"

---

### 9. PR #33: Feature: Ticket Detail View & Ownership Protection (Issue 14)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/33`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "ownership protection ทำได้ดีมาก แต่ขอให้แก้ 1 จุด: แก้ Issue link ใน PR ให้ผูกกับ Issue #19 (Ticket Detail View) ให้ถูกต้องตรงตามงาน และแนะนำเพิ่ม test UI กรณี server error + Retry"
- **Author Response & Resolution**:
  > "แก้ไขใน PR Description ให้ link กับ Issue #19 (Closes #19) เรียบร้อย และเพิ่ม Unit Test UI-05 สำหรับ generic error + Retry ใน TicketDetail.test.tsx เรียบร้อย (ผ่าน 27/27 tests)"
- **Approval Comment**:
  > "เช็กที่แก้มาแล้วนะครบหมดทุกอย่างแล้ว เรื่อง Issue Link link กับ Issue #19 ถูกต้อง และเพิ่ม UI-05 retry ครบถ้วน ไม่มีจุดที่ต้องแก้เพิ่มแล้วเก่งมาก"

---

### 10. PR #38: Feature: E2E Testing & Visual Checking with Playwright (Issue 15)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/38`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "E2E flow ครบถ้วนดีมาก แต่ขอให้เพิ่ม Visual Regression comparison ด้วย `expect(page).toHaveScreenshot(...)` เปรียบเทียบกับ Baseline Snapshot จริงใน `visual-regression.spec.ts` และ `requester-ticket-flow.spec.ts` และเคลียร์ตารางใน tests.md ให้เหลือชุด PASS ล่าสุดชุดเดียว"
- **Author Response & Resolution**:
  > "เพิ่ม visual assertion `expect(page).toHaveScreenshot(...)` และ baseline snapshots ครบทั้ง Desktop, Tablet, Mobile (12/12 tests passed) และเคลียร์ตารางใน tests.md เรียบร้อยแล้ว"
- **Approval Comment**:
  > "เช็กที่แก้มาแล้วนะ: เพิ่ม visual-regression.spec.ts และใช้ expect(page).toHaveScreenshot(...) เทียบกับ baseline ครบทั้ง Desktop, Tablet, Mobile เคลียร์ tests.md เรียบร้อย ผลเทส API 40/40, UI 27/27, E2E 12/12 ผ่านหมด ไม่มีจุดที่ต้องแก้เพิ่มแล้ว"

---

### 11. PR #39: Docs: Release Integration, README & Review Documentation (Issue 16)
- **PR Link**: `https://github.com/titayaaa/toktickit/pull/39`
- **Reviewer**: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))
- **Review Comment (Changes Requested)**:
  > "README กับ ai-use.md ครบและอ่านเข้าใจง่ายดีเลย ขอแก้ docs/lab-02/reviewer.md ให้ mapping ของ PR number / Feature / Issue number ตรงกับ GitHub จริงทั้งหมด เพื่อให้ reviewer evidence และ traceability ถูกต้องก่อนนะ"
- **Author Response & Resolution**:
  > "ได้ทำการตรวจสอบประวัติ GitHub PRs และบันทึกรีวิวทั้งหมดใน repo `titayaaa/toktickit` และ `jejaebubu/toktickit` อย่างละเอียด และแก้ไข mapping ของทุก PR (#22 ถึง #39) พร้อม reviewer ID, comments, และ responses ให้ตรงกับ GitHub จริง 100% เรียบร้อยแล้วค่ะ"

---

## Partner PR Review Evidence (เราตรวจเพื่อน — @titayaaa ตรวจ @jejaebubu)

Repository: `https://github.com/jejaebubu/toktickit`  
Developer: พัฒนาวดี แสงเงินยอด ([@jejaebubu](https://github.com/jejaebubu))  
Reviewer: ธิตยาภรณ์ ([@titayaaa](https://github.com/titayaaa))

### 1. PR #21: feat(db): add Prisma models and migration for Lab 2 (Issue #2)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/21`
- **My Review Comment**:
  > "โค้ดรวมๆ ดูดีและครอบคลุมตารางที่จำเป็น (Requester, System, Ticket, Attachment) แต่มีข้อสังเกตเรื่อง Data Type นิดหน่อยนะ สเปคระบุให้ Priority และ Status เป็น Enum แต่ในนี้ใช้ String และชื่อฟิลด์ในตาราง Attachment ต่างจากสเปคนิดหน่อย (เช่น size vs sizeBytes) แต่โดยรวมโอเคแล้ว สามารถใช้งานต่อได้ Approved ค่า"
- **Status**: Approved & Merged

---

### 2. PR #22: feat(db): update seed script to initialize categories, requesters, and related systems (Issue #3)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/22`
- **My Review Comment (Changes Requested)**:
  > "โค้ดและการใช้ upsert ทำได้ถูกต้องและรองรับ Idempotency ดีแล้ว แต่มีจุดที่ต้องแก้นิดนึงง ในไฟล์ seed.ts และ seed.test.ts ยังระบุว่าเป็น Issue 3 อยู่ ซึ่งเราเพิ่งทำการเปลี่ยนเลข Issue ใหม่ (ข้อ Seed Data ตอนนี้คือ Issue 6) รบกวนแก้คอมเมนต์และชื่อ Test จาก Issue 3 เป็นเลขที่อัปเดตแล้วให้หน่อยนะะ แก้เสร็จแล้วเดี๋ยวกด Approve ให้ใหม่ค่า"
- **Partner Response**:
  > "ได้เช็คโค้ดทั้งหมดแล้ว จริง ๆ บน GitHub Issue เรื่อง Seed Data ตัวนี้เป็น Issue #14 ค่ะ (ตรงตาม Closes #14 ใน Description) ได้อัปเดตแก้ไขตัวเลขในไฟล์ seed.ts และ seed.test.ts ให้ตรงตามเลข GitHub Issue #14 แล้วนะคะ และ Push ขึ้น PR เรียบร้อยแล้วค่ะ"
- **My Approval Comment**:
  > "ตรวจสอบเรียบร้อย เดี๋ยว approve และ merge ให้น้า"
- **Status**: Approved & Merged

---

### 3. PR #23: feat(auth): implement Development Requester Selector API, Context, and UI (Issue #4)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/23`
- **My Review Comment (Changes Requested)**:
  > "โดยรวมทำออกมาได้ดีและเป็นระเบียบมาก โครงสร้าง RequesterContext และการเชื่อมกับ localStorage ทำได้ถูกต้องเลย แต่อยากรบกวนให้แก้จุดเล็กๆ 2 จุดตามคอมเมนต์ด้านล่างนิดนึงน้า ถ้าแก้เสร็จแล้วกริ๊งมาบอกได้เลย เดี๋ยวมากด Approve ให้"
- **Partner Response**:
  > "แก้ไขเรียบร้อยแล้วค่ะฝากเช็คให้หน่อยนะ"
- **My Approval Comment**:
  > "Good !!"
- **Status**: Approved & Merged

---

### 4. PR #24: feat(api): implement Create Ticket REST API (POST /api/tickets) with validation and ticket number generation (Issue #5)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/24`
- **My Review Comment (Changes Requested)**:
  > "โค้ดรวมๆ ทำระบบ Create Ticket และรันรหัสตั๋ว TKT ออกมาครบถ้วนเลย แต่อยากรบกวนให้แก้จุดเล็กๆ 2 จุดตามคอมเมนต์ด้านล่างให้ตรงกับเอกสาร API Spec ที่เราตกลงกันไว้หน่อยน้า ถ้าแก้เสร็จแล้ว เดี๋ยวมากด Approve ให้"
- **Partner Response**:
  > "แก้ไขให้ตรงตามที่แนะนำครบทั้ง 2 จุดแล้วนะ"
- **My Approval Comment**:
  > "Approved"
- **Status**: Approved & Merged

---

### 5. PR #25: feat(ui): implement Create Ticket UI Screen with Zen Green theme and validation (Issue #6)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/25`
- **My Review Comment & Discussion**:
  > "ลองเช็คแล้วยังเจอจุดที่ยังไม่ตรงกับสเปกหลังบ้าน 3 จุด: 1. import ผิดโฟลเดอร์ context vs contexts 2. localStorage key 'toktickit_dev_requester' vs 'toktickit_requester' 3. 'URGENT' vs 'CRITICAL'"
- **Partner Clarification**:
  > "ช่วยเช็คให้อีกรอบหน่อยค่ะ ลองหักหลักฐานจาก repo จริงแล้ว โฟลเดอร์ใช้ client/src/context/RequesterContext.tsx, key ใช้ toktickit_requester, และใน backend ใช้ VALID_PRIORITIES = ['LOW','MEDIUM','HIGH','URGENT'] ทุกเทสผ่าน 7/7 และ 13/13 ค่ะ"
- **My Approval Response**:
  > "ลองเช็คดูอีกรอบแล้ว เราดูพลาดเอง เพราะไปจำสลับกับโค้ดใน Repo ของตัวเอง ลองดูใหม่แล้วโค้ดตรงกับหลังบ้านหมดเลย สามารถทำงานได้ครบถ้วน ขอโทษที่ทำให้เกิดความสับสนนะ เดี๋ยวกด Approve ให้น้าาา"
- **Status**: Approved & Merged

---

### 6. PR #28: Issue 7: My Tickets List REST API (Search/Filter/Sort + Pagination)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/28`
- **My Review Comment (Changes Requested)**:
  > "1. Performance Issue ใน generateTicketNumber: แนะนำเปลี่ยนจาก findMany วนลูป มาใช้ findFirst({ orderBy: { ticketNumber: 'desc' } }) แทน 2. บั๊ก 500 ตอนกรอง status: เพิ่ม VALID_STATUSES มาดักค่าก่อนยัดลง where"
- **Partner Response**:
  > "จุดที่ 1 แก้แล้วเปลี่ยนเป็น findFirst({ orderBy: { ticketNumber: 'desc' } }) เพื่อดึงตั๋วล่าสุดมาบวกเลข จุดที่ 2 ใน schema เป็น String @default('New') แต่เพื่อความสมบูรณ์ตามสเปกได้เพิ่ม validation ให้เรียบร้อยค่ะ"
- **My Approval Comment**:
  > "โอเคหมดทุกจุดแล้ว Approve !!"
- **Status**: Approved & Merged

---

### 7. PR #29: Issue 8: My Tickets UI Screen & Interactive Controls
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/29`
- **My Review Comment (Changes Requested)**:
  > "ที่เหลือโอเคหมดแล้ว UI สวยแล้วว ถ้าแก้เรื่อง type error และ build แล้วเดี๋ยวรีวิวให้อีกรอบนะะ"
- **Partner Response**:
  > "ขอบคุณน้าเราแก้ตามที่แกบอกมาแล้ว ตอนนี้ client 14/14 ผ่านหมด แล้ว tsc --noEmit กับ vite build ก็ผ่านเหมือนกัน"
- **My Approval Comment**:
  > "โค้ดทำงานได้ครบถ้วนมาก Approved!"
- **Status**: Approved & Merged

---

### 8. PR #30: Issue 9: Requester Ticket Detail & Soft-Remove Attachments
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/30`
- **My Review Comment**:
  > "ตรวจสอบโค้ด Ticket Detail และการ soft-remove attachments โครงสร้างและการแสดงผลถูกต้องครบถ้วน"
- **Partner Response**:
  > "เช็กทั้งหมดแล้วนะคะ ตอนนี้ server tests 37/37, client tests 23/23 ผ่านหมด รวมถึง tsc --noEmit และ build ก็ผ่านเรียบร้อยค่ะ"
- **My Approval Comment**:
  > "Approved"
- **Status**: Approved & Merged

---

### 9. PR #31: Issue 10: E2E Test, Visual Inspection & Submission Evidence
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/31`
- **My Review Comment**:
  > "โดยรวมทำได้ดีและรอบคอบมาก Flow Playwright E2E ครอบคลุมครบทุกสเต็ป 3 Viewports และมี expectNoHorizontalOverflow ตรวจสอบ responsive... แนะนำย้ายตัวแปร project ออกจาก global scope ส่งเข้า shot() ตรงๆ เพื่อความปลอดภัยเมื่อรัน parallel"
- **Partner Response**:
  > "ขอบคุณที่รีวิวนะคะ ย้าย project ออกจาก module scope แล้ว และเปลี่ยน shot(project, ...) ปลอดภัยกับการรัน parallel รัน E2E ผ่านครบทั้ง 3 viewport ค่ะ"
- **My Approval Comment**:
  > "โดยรวมโค้ดครบถ้วนดีมาก Approved!"
- **Status**: Approved & Merged

---

### 10. PR #32: docs: prepare release notes — README + full reviewer.md (Issue 11)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/32`
- **My Review Comment**:
  > "ตรวจเช็คให้เรียบร้อยแล้วนะ ละเอียดและครบถ้วนมากเลย มีจุดเล็กๆ ตรง README.md ในหัวข้อ Backend API เขียนเป็น PATCH /api/attachments/:id ฝากแก้เป็น DELETE /api/attachments/:id ให้ตรงกับ method ใน app.ts นิดนึงน้า"
- **Partner Response**:
  > "แก้ตามคอมเมนต์เรียบร้อยแล้วค่ะ ตอนนี้ใน README.md แก้เป็น DELETE /api/attachments/:id เรียบร้อยใน commit e60811b แล้วค่ะ"
- **My Approval Comment**:
  > "good !!"
- **Status**: Approved & Merged

---

### 11. PR #33 & PR #35: Issue 11: Lab 2 Release Integration (lab2-staging → main)
- **PR Link**: `https://github.com/jejaebubu/toktickit/pull/33` และ `https://github.com/jejaebubu/toktickit/pull/35`
- **My Review Comment (Changes Requested on PR #33)**:
  > "ตรวจโค้ดดูแล้ว มีจุดที่อยากให้ช่วยแก้ 6 จุด:
  > 1. `client/src/App.tsx`: Auto-refresh รายการตั๋วหลังสร้างตั๋วสำเร็จ
  > 2. `server/src/app.ts`: ป้องกันการ soft-remove ไฟล์แนบซ้ำ (`if (attachment.isRemoved) return 400`)
  > 3. `client/src/components/AttachmentSection.tsx`: ตรวจสอบนามสกุลไฟล์ regex และเคลียร์ `e.target.value = ""`
  > 4. `README.md`: อัปเดตยอด test coverage ให้ตรงกับความเป็นจริง (Server 40 / Client 31)
  > 5. `README.md`: เพิ่มขั้นตอนการรัน migration ให้ชัดเจน (`cd server && npx prisma migrate dev`)
  > 6. `docs/lab-02/reviewer.md`: อัปเดตตารางและบันทึก PR ให้ครบถ้วน"
- **Partner Response & Implementation (PR #35)**:
  > "แก้ครบทั้ง 6 จุดใน PR #35 เรียบร้อย: เพิ่ม `ticketListRefreshKey` ให้ MyTicketsList, เพิ่ม backend guard ดักลบซ้ำตอบ 400 พร้อม test API-05f, ตรวจสอบนามสกุลไฟล์และเคลียร์ input, อัปเดต README ยอดเทสต์ 71 tests พร้อมขั้นตอน Setup และอัปเดต reviewer.md"
- **My Approval Comment (Approved on PR #35 & PR #33)**:
  > "ตรวจเช็กโค้ดที่แก้ตามคอมเมนต์ทั้ง 6 จุดเรียบร้อยแล้วน้า แก้ไขได้ถูกต้องครบถ้วนและรอบคอบมากเลย ผ่านเกณฑ์การ Release ของ Lab 2 ครบถ้วนทุกข้อแล้วว Approved พร้อม Merge ได้เลย!"
- **Status**: Approved & Merged into `lab2-staging` (PR #35) and `main` (PR #33)
