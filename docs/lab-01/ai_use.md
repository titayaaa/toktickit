# การใช้ AI และการทบทวน (AI Use and Reflection)

ผมใช้ระบบ Antigravity coding agent ผ่านบัญชี Google Cloud Platform โดยใช้โมเดล Gemini 3.5 Flash เป็นหลัก พร้อมตั้งค่าระดับการคิด (Thinking Level) ไว้ที่ Medium

## ตัวอย่าง Prompt สำคัญที่ใช้

| ชื่อ Prompt (Prompt Name) | ข้อความ Prompt ที่ใช้จริง (Actual Prompt Text) | การทบทวนและสิ่งที่ได้ (Reflection) |
| --- | --- | --- |
| วางแผนการทำ Lab 1 | อ่านข้อกำหนดของ TokTickIT Lab 1 ที่แนบมา สรุป GitHub Issues ทั้ง 4 อัน ลำดับความต่อเนื่อง ผลลัพธ์ที่ต้องการ และ Automated Tests ที่ต้องมี เสนอลำดับการพัฒนา โดยยังไม่ต้องเขียนโค้ด | สามารถทำงานได้จบในครั้งเดียว ได้แผนการทำงานและโครงสร้างสถาปัตยกรรมที่ชัดเจน |
| ตั้งค่าโปรเจกต์ Full-Stack | ตั้งค่า Tech Stack ของโปรเจกต์ตามที่ระบุใน Lab 1 โดยใช้ React, TypeScript, Vite และ Bootstrap สำหรับ Frontend และใช้ Node.js, Express และ TypeScript สำหรับ Backend กำหนดค่า PostgreSQL และ Prisma ใช้โครงสร้างโฟลเดอร์ตามที่กำหนด ห้ามเพิ่มฟังก์ชันที่นอกเหนือขอบเขต Lab 1 | สามารถสร้างโครงสร้างโฟลเดอร์ฝั่ง Client และ Server ตั้งค่า Dependencies และ Scripts ต่างๆ ได้สำเร็จ |
| ทำระบบ Health Check | เพิ่ม GET /api/health เข้าไปใน Express backend ที่มีอยู่ โดยต้องคืนค่า HTTP 200 พร้อม JSON { status: "ok", service: "TokTickIT API" } และสร้าง Supertest API-01 | สร้าง Endpoint และ Test ได้ถูกต้องแม่นยำ และสามารถรัน Supertest ผ่านได้ทั้งหมด |
| สร้างโมเดล Category และ Seed | สร้างโมเดล Prisma Category ที่มี id, name (unique), และ createdAt จากนั้นสร้างไฟล์ Migration และ Seed แบบรันซ้ำได้ (Idempotent) เพื่อเพิ่มข้อมูลหมวดหมู่: Account and Access, Hardware, Software, และ Network | สร้าง Prisma schema และ Seed script ด้วยคำสั่ง upsert ได้อย่างสมบูรณ์แบบ ทำให้รันซ้ำได้โดยไม่มีข้อมูลซ้ำซ้อน |
| ทำ API แสดงรายการ Category | เพิ่ม GET /api/categories เพื่อดึงรายการหมวดหมู่จาก PostgreSQL ผ่าน Prisma โดยเรียงลำดับตาม ID (asc) และสร้าง Supertest API-02 | Endpoint คืนค่าข้อมูลในรูปแบบที่ถูกต้อง และ Supertest สามารถตรวจสอบความถูกต้องของ Response ได้ผ่าน |
| สร้างและทดสอบ UI Check System | สร้างหน้าเว็บ React ด้วย Bootstrap ที่มีปุ่ม [Check System] เมื่อกดให้แสดงสถานะ Loading เรียก API health และ categories จาก Backend และแสดงสถานะระบบพร้อมหมวดหมู่ 4 อัน (หรือแสดงข้อความ Error เมื่อออฟไลน์) พร้อมเขียน Vitest: UI-01, UI-02, UI-03 | Component ของ UI สามารถจัดการสถานะ Loading, Success และ Error ได้อย่างสมบูรณ์ และชุดทดสอบ Vitest รันผ่านทุกเคส |
