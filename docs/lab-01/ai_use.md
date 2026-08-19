# AI Use and Reflection

I used the Antigravity coding agent through my Google Cloud Platform account. I mainly used Gemini 3.5 Flash as the LLM with a thinking level of Medium.

## Selected Key Prompts

| Prompt Name | Actual Prompt Text | Reflection |
| --- | --- | --- |
| Plan Lab 1 Implementation | Read the enclosed TokTickIT Lab 1 requirements. Summarize the four GitHub Issues, their dependencies, required outputs, and required automated tests. Propose an implementation order, but do not write code yet. | AI สามารถสรุปความต้องการของระบบและวางแผนลำดับการทำงานได้อย่างถูกต้องและรวดเร็วในคำสั่งแรก |
| Set Up Full-Stack Project | Setup the TokTickIT project tech stack as given in Lab 1 using React, TypeScript, Vite, and Bootstrap for the frontend, and Node.js, Express, and TypeScript for the backend. Configure PostgreSQL and Prisma. Use the required folder structure. Do not add functionality beyond the Lab 1 scope. | โครงสร้างโฟลเดอร์ของทั้งฝั่ง Client และ Server ถูกสร้างขึ้นอย่างถูกต้อง รวมถึงการตั้งค่า Dependencies ต่างๆ ทำได้อย่างสมบูรณ์ |
| Implement Health Check | Add GET /api/health to the existing Express backend. It must return HTTP 200 with JSON { status: "ok", service: "TokTickIT API" }. Create Supertest test API-01. | AI สร้าง Endpoint และ Test ได้ตรงตาม Requirement และผลการรัน Supertest ผ่านทั้งหมด |
| Implement Category Model & Seed | Create the Prisma Category model with id, unique name, and createdAt. Create migration and idempotent seed inserting Account and Access, Hardware, Software, and Network. | การสร้าง Prisma schema และ Seed script ทำได้ถูกต้อง และไม่มีปัญหาข้อมูลซ้ำซ้อนเมื่อรันคำสั่ง Seed หลายครั้ง |
| Implement Category List API | Add GET /api/categories endpoint retrieving categories from PostgreSQL through Prisma in predictable order (ID asc). Create Supertest test API-02. | API ส่งข้อมูลกลับมาในรูปแบบที่ถูกต้อง และผ่านการตรวจสอบด้วย Supertest ตามที่โจทย์กำหนด |
| Build and Test Check System UI | Create a Bootstrap-based React page with [Check System] button. When clicked, show loading state, call backend health and categories APIs, and render system status & 4 categories (or error message when offline). Write Vitest tests UI-01, UI-02, UI-03. | UI สามารถจัดการสถานะ (Loading, Success, Error) ได้อย่างราบรื่น และชุดการทดสอบ Vitest ทำงานได้ถูกต้องทั้งหมด |
