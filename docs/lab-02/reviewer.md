# Peer Review Documentation (Lab 2)

## Reviewer Details

**PR22: Issue 5 & 6: Sprint Specification and DB Schema** ลิงก์ `https://github.com/titayaaa/toktickit/pull/22`
- **Reviewer 1**: ธนากร พหุลรัตน์ (ID: 67070505217, GitHub: @il0lk3)

**PR23: Feature: Development Requester Selection API and UI (Issue 7)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/23`
- **Reviewer 1**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)

**PR25: Feature: Reference Data APIs (Issue 8)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/25`
- **Reviewer 1**: ชัญญา พูลเขตกิจ (ID: 67070501058, GitHub: @chanya06)

**PR27 & PR29: Feature: Create Ticket API & UI (Issue 9 & 10)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/27` และ `https://github.com/titayaaa/toktickit/pull/29`
- **Reviewer 1**: สุประวีณ์ สุทธิเสรีนิวัฒน์ (ID: 67070505227, GitHub: @Suprawi5227)
- **Reviewer 2**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)

**PR30: Feature: Attachment Management API and UI (Issue 11)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/30`
- **Reviewer 1**: อชิรญา อินตา (ID: 67070505229, GitHub: @Achikan)

**PR31 & PR32: Feature: My Tickets API & UI (Issue 12 & 13)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/31` และ `https://github.com/titayaaa/toktickit/pull/32`
- **Reviewer 1**: ธนากร พหุลรัตน์ (ID: 67070505217, GitHub: @il0lk3)
- **Reviewer 2**: ชัญญา พูลเขตกิจ (ID: 67070501058, GitHub: @chanya06)

**PR33: Feature: Ticket Detail View & Ownership Protection (Issue 14)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/33`
- **Reviewer 1**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)

**PR38: Feature: E2E Testing & Visual Checking (Issue 15)** ลิงก์ `https://github.com/titayaaa/toktickit/pull/38`
- **Reviewer 1**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)

---

## Submitted PR Review Evidence (เพื่อนตรวจเรา)

- **PR 22 (ธนากร @il0lk3):** "ตรวจสอบเอกสาร Sprint Specs, API Contract, UI Specs และ Prisma Schema เรียบร้อยแล้ว ครอบคลุมครบถ้วนตาม Acceptance Criteria ของ Lab 2 ครับ"
  - **My Response:** "ขอบคุณมากครับ ได้ทำการ merge เข้า lab2-staging เรียบร้อยครับ"

- **PR 23 (พัฒนาวดี @jejaebubu):** "Requester Context และหน้าเลือก Development Requester ทำงานได้ถูกต้องตามสเปก แสดงเฉพาะ active users และดักจับ 401 เมื่อยังไม่ได้เลือกได้ดีค่ะ"
  - **My Response:** "ขอบคุณมากค่ะสำหรับรีวิว"

- **PR 25 (ชัญญา @chanya06):** "Endpoint /api/categories และ /api/related-systems ส่งคืนข้อมูลตรงตามเงื่อนไข isActive: true และเรียงลำดับ ID ถูกต้องค่ะ"
  - **My Response:** "ขอบคุณสำหรับการตรวจสอบครับ"

- **PR 27 & PR 29 (สุประวีณ์ @Suprawi5227):** "ฟอร์ม Create Ticket มีการป้องกันการกดส่งซ้ำ และสร้างเลขตั๋วรูปแบบ TKT-YYYYMMDD-XXXX ได้ถูกต้อง เทสต์ผ่านครบถ้วนครับ"
  - **My Response:** "ขอบคุณครับ ได้อัปเดตและปรับปรุงข้อความแจ้งเตือน Error เพิ่มเติมให้เรียบร้อยแล้วครับ"

- **PR 30 (อชิรญา @Achikan):** "ระบบอัปโหลดไฟล์แนบและ Soft-remove ทำงานได้ถูกต้อง มีการจำกัดขนาดไฟล์ไม่เกิน 5MB และบันทึกเหตุผลการลบเรียบร้อย โค้ดอ่านง่ายมากค่ะ"
  - **My Response:** "ขอบคุณมากครับ ได้เพิ่ม test coverage สำหรับกรณีขนาดไฟล์เกิน 5MB เรียบร้อยแล้ว"

- **PR 31 & PR 32 (ธนากร @il0lk3 & ชัญญา @chanya06):** "หน้า My Tickets มีระบบ Search, Filter, Sort ตาม Severity และ Pagination ใช้งานได้ลื่นไหล มีการแยก Empty State กับ No-results ชัดเจน สวยงามตาม Zen Green Theme ครับ"
  - **My Response:** "ขอบคุณมากครับ แก้ไขการเรียงลำดับ Priority ตาม Severity (CRITICAL > HIGH > MEDIUM > LOW) ให้ถูกต้องเรียบร้อยครับ"

- **PR 33 (พัฒนาวดี @jejaebubu):** "หน้ารายละเอียดตั๋ว (Ticket Detail) ล็อกสิทธิ์เฉพาะเจ้าของตั๋วได้ถูกต้อง (403 เมื่อเข้าถึงตั๋วผู้อื่น) และแสดงไฟล์แนบพร้อมสถานะ Soft-remove ครบถ้วนค่ะ"
  - **My Response:** "ขอบคุณมากค่ะ ได้เพิ่ม test เช็คกรณี error & retry UI ให้ครบถ้วนแล้วค่ะ"

- **PR 38 (พัฒนาวดี @jejaebubu):** "E2E flow ครบถ้วนและดีมาก ขอให้เพิ่ม Visual Regression comparison ด้วย `expect(page).toHaveScreenshot(...)` เปรียบเทียบกับ Baseline Snapshot จริง และเคลียร์ตารางใน tests.md ให้เหลือชุด PASS ล่าสุดชุดเดียวค่ะ"
  - **My Response:** "ขอบคุณสำหรับคำแนะนำน้าา เราได้เพิ่ม visual assertion `expect(page).toHaveScreenshot(...)` และ baseline snapshot เข้าไปในไฟล์ `requester-ticket-flow.spec.ts` และ `visual-regression.spec.ts` ครบทุกตัว รวมถึงเคลียร์ตารางใน `tests.md` เรียบร้อยแล้วจ้าา"

---

## Partner PR Review Evidence (เราตรวจเพื่อน)

- **PR 33 & PR 35 (พัฒนาวดี @jejaebubu):** ลิงก์ `https://github.com/jejaebubu/toktickit/pull/33` และ `https://github.com/jejaebubu/toktickit/pull/35`
  - **My Review Comment:** "ตรวจเช็กโค้ด Diff และผลการทดสอบของ PR #35 และ Release PR #33 ให้เรียบร้อยแล้วจ้าา Logic Backend ป้องกันการลบซ้ำถูกต้อง UX เคลียร์ input และ Auto-refresh ทำงานได้ราบรื่น เทสต์ผ่านครบถ้วน Approved พร้อม Merge ได้เลยนะะ!"
  - **Partner Response:** "ขอบคุณสำหรับรีวิวน้าา ได้ merge เข้า staging และ main เรียบร้อยแล้วจ้า"

- **PR 22 (ธนากร @il0lk3):** ลิงก์ `https://github.com/il0lk3/TokTickIT/pull/22`
  - **My Review Comment:** "ตรวจสอบโครงสร้าง Prisma Schema และการเชื่อมโยง Foreign Key ระหว่าง Ticket, Requester และ Category ทำได้ถูกต้องและครอบคลุมดีครับ"
  - **Partner Response:** "ขอบคุณสำหรับรีวิวครับ"

- **PR 25 (ชัญญา @chanya06):** ลิงก์ `https://github.com/chanya06/toktickit/pull/25`
  - **My Review Comment:** "ระบบ Pagination และ Search ทำงานได้ถูกต้อง แนะนำตรวจสอบการเรียงลำดับ Priority ให้เรียงตามระดับความเร่งด่วนเพิ่มเติมค่ะ"
  - **Partner Response:** "ขอบคุณสำหรับคำแนะนำค่ะ ได้ปรับการเรียงตาม Severity เรียบร้อยแล้วค่ะ"
