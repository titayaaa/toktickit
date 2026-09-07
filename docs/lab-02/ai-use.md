# AI Use and Reflection (Lab 2)

I used the Antigravity coding agent with Gemini 3.7 Flash (High thinking level) through Google Cloud Platform to design, implement, test, and integrate the Requester Ticket Management MVP (Lab 2).

## Selected Key Prompts

| Prompt Name | Actual Prompt Text | Reflection |
| --- | --- | --- |
| **Sprint Specification & Test Planning** | ช่วยศึกษาโจทย์ Lab 2 ของ TokTickIT และสร้างเอกสาร `specification.md`, `api-spec.md`, `ui-spec.md`, และ `tests.md` โดยกำหนด Functional Requirements (FR-01 ถึง FR-07), Business Rules (BR-01 ถึง BR-11), Acceptance Criteria (AC-01 ถึง AC-06) และผูก Test Traceability Matrix ให้ครบถ้วน | AI ช่วยวางโครงสร้างและมาตรฐานทางวิศวกรรมซอฟต์แวร์ได้อย่างละเอียด รอบคอบ ครอบคลุมทั้งกติกาทางธุรกิจ และเคสข้อผิดพลาด |
| **Requester Context & Reference Data** | ช่วยสร้าง Prisma models และ Migration สำหรับ Ticket, Attachment, Category, RelatedSystem, RequesterUser พร้อม seed data และเขียน React RequesterContext และหน้า DevelopmentRequesterSelection สำหรับจำลองผู้ใช้งานใน Lab 2 | AI สร้าง Data Models และ React Context ได้อย่างถูกต้อง ทำให้ระบบจำลองบริบทผู้ใช้ทำงานได้ลื่นไหลโดยไม่ต้องพึ่งระบบ Auth จริงใน Lab 2 |
| **Create Ticket API & UI Form** | ช่วยพัฒนา Endpoint `POST /api/tickets` พร้อมระบบสร้าง Ticket Number อัตโนมัติ (`TKT-YYYYMMDD-XXXX`) และสร้างหน้า `CreateTicketForm.tsx` ตามธีม Zen Green พร้อมการดักจับข้อผิดพลาด ฟิลด์ validation แบบเรียลไทม์ และป้องกันการกดส่งซ้ำ (Duplicate Submission) | AI ออกแบบฟอร์มที่มี UX/UI ดีเยี่ยม มีสถานะ Loading ชัดเจน และป้องกันข้อมูลผู้ใช้สูญหายเมื่อ API ขัดข้อง |
| **Attachment Management** | ช่วยพัฒนาระบบไฟล์แนบด้วย Multer (จำกัดขนาด 5MB, สูงสุด 5 ไฟล์, เฉพาะ JPG, PNG, WEBP, PDF) พร้อม Endpoint `POST /api/tickets/:id/attachments` และ `DELETE /api/tickets/:id/attachments/:attachmentId` แบบ Soft Removal พร้อมบันทึกเหตุผล และเชื่อมต่อเข้ากับหน้า UI | AI จัดการ Storage, Validation และ Soft-removal logic ได้อย่างปลอดภัยตามหลักสเปก |
| **My Tickets List (API & UI)** | ช่วยพัฒนา Endpoint `GET /api/tickets` รองรับ Search (summary & ticket number), Filter (category, status, priority), Sort (created date, priority severity) และ Pagination พร้อมหน้า `MyTickets.tsx` ที่แยก Empty State ออกจาก No-results State | AI จัดการ Query Building และ Pagination metadata ฝั่ง Server ได้อย่างมีประสิทธิภาพ และ UI ตอบสนองต่อการค้นหาได้อย่างแม่นยำ |
| **Ticket Detail & Ownership Security** | ช่วยสร้าง Endpoint `GET /api/tickets/:id` ที่ตรวจสอบสิทธิ์ Requester Ownership (คืน 403 Forbidden หากไม่ใช่เจ้าของ) และหน้า `TicketDetail.tsx` แบบ Read-only พร้อมปุ่มดาวน์โหลดและ Soft-remove ไฟล์แนบ | AI บังคับใช้ Ownership Protection ได้อย่างรัดกุม ป้องกันการเข้าถึงข้อมูลข้ามผู้ใช้ (AC-03) |
| **Playwright E2E & Visual Testing** | ช่วยเขียนชุดการทดสอบ Playwright E2E (`requester-ticket-flow.spec.ts`) และ Visual Snapshot Comparison (`visual-regression.spec.ts`) ครอบคลุมทั้ง Flow และตรวจสอบ Visual Regression บนทุก Viewport (Desktop, Tablet, Mobile) โดยไม่มี horizontal scroll overflow | AI ออกแบบ E2E test ได้ครอบคลุมทั้ง User Journey และตรวจสอบ Visual Snapshot Comparison ได้อย่างแม่นยำ |

## My Reflection

การใช้ AI Coding Agent ใน Lab 2 ช่วยเพิ่มประสิทธิภาพในการพัฒนา Full-stack application ได้อย่างรวดเร็ว โดยเฉพาะการแปลง Stakeholder Requirements ให้กลายเป็นข้อกำหนดทางวิศวกรรม (Spec-Driven Development) และการสร้าง Test Cases ครอบคลุมทุกเลเยอร์ (Test-Driven Development) สิ่งสำคัญคือการมี Human-in-the-loop เพื่อคอยตรวจสอบ Business Logic, สถาปัตยกรรมความปลอดภัย และการทำ Peer Review อย่างเคร่งครัดตามกระบวนการของวิชา
