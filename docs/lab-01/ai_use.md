# AI Use and Reflection

I used the Antigravity coding agent through my Google Cloud Platform account. I mainly used Gemini 3.5 Flash as the LLM with a thinking level of Medium.

## Selected Key Prompts

| Prompt Name | Actual Prompt Text | Reflection |
| --- | --- | --- |
| Plan Lab 1 Implementation | ช่วยอ่านเอกสารโจทย์ TokTickIT Lab 1 ที่แนบมานี้ แล้วสรุป GitHub Issues ทั้ง 4 ข้อ พร้อมอธิบาย Dependencies, สิ่งที่ต้องส่ง (Outputs) และการรันเทสต์ที่จำเป็น จากนั้นช่วยเสนอแผนลำดับการทำงานให้หน่อย แต่ยังไม่ต้องเขียนโค้ดนะ | AI สามารถสรุปความต้องการของระบบและวางแผนลำดับการทำงานได้อย่างถูกต้องและรวดเร็วในคำสั่งแรก |
| Set Up Full-Stack Project | ช่วยเซ็ตอัปโปรเจกต์ TokTickIT ตามโจทย์ Lab 1 โดยใช้ React, TypeScript, Vite และ Bootstrap สำหรับ Frontend ส่วน Backend ให้ใช้ Node.js, Express และ TypeScript พร้อมกับตั้งค่า PostgreSQL และ Prisma ให้ใช้โครงสร้างโฟลเดอร์ตามที่กำหนดเป๊ะๆ ไม่ต้องเพิ่มฟังก์ชันอื่นที่เกินขอบเขต | โครงสร้างโฟลเดอร์ของทั้งฝั่ง Client และ Server ถูกสร้างขึ้นอย่างถูกต้อง รวมถึงการตั้งค่า Dependencies ต่างๆ ทำได้อย่างสมบูรณ์ |
| Implement Health Check | ช่วยเพิ่ม Endpoint GET /api/health ให้กับ Express Backend โดยต้องตอบกลับเป็น HTTP 200 พร้อมข้อมูล JSON { status: "ok", service: "TokTickIT API" } และช่วยเขียนเทสต์ Supertest (API-01) ให้ด้วย | AI สร้าง Endpoint และ Test ได้ตรงตาม Requirement และผลการรัน Supertest ผ่านทั้งหมด |
| Implement Category Model & Seed | ช่วยสร้าง Prisma Model ชื่อ Category ที่มีฟิลด์ id, name (แบบ unique) และ createdAt จากนั้นช่วยสร้างไฟล์ Migration และโค้ด Seed เพื่อเพิ่มข้อมูล Account and Access, Hardware, Software และ Network แบบรันซ้ำได้โดยข้อมูลไม่เบิ้ล (idempotent) | การสร้าง Prisma schema และ Seed script ทำได้ถูกต้อง และไม่มีปัญหาข้อมูลซ้ำซ้อนเมื่อรันคำสั่ง Seed หลายครั้ง |
| Implement Category List API | ช่วยเพิ่ม Endpoint GET /api/categories ที่ดึงข้อมูลหมวดหมู่จาก PostgreSQL ผ่าน Prisma โดยเรียงลำดับข้อมูลตาม ID จากน้อยไปมาก และช่วยเขียนเทสต์ Supertest (API-02) ให้ด้วย | API ส่งข้อมูลกลับมาในรูปแบบที่ถูกต้อง และผ่านการตรวจสอบด้วย Supertest ตามที่โจทย์กำหนด |
| Build and Test Check System UI | ช่วยสร้างหน้า React โดยใช้ Bootstrap ที่มีปุ่ม [Check System] เมื่อกดแล้วให้แสดงสถานะ Loading แล้วไปเรียก API health และ categories จาก Backend เพื่อนำมาแสดงสถานะระบบและ 4 หมวดหมู่ (ถ้าเซิร์ฟเวอร์ดาวน์ให้โชว์ Error) และเขียนเทสต์ Vitest (UI-01, 02, 03) | UI สามารถจัดการสถานะ (Loading, Success, Error) ได้อย่างราบรื่น และชุดการทดสอบ Vitest ทำงานได้ถูกต้องทั้งหมด |
