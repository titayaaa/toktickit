# Peer Review Documentation

## Reviewer Details

**PR5: Feature 1: Project Foundation** ลิงก์ `https://github.com/titayaaa/toktickit/pull/5`
- **Reviewer 1**: ธนากร พหุลรัตน์ (ID: 67070505217, GitHub: @il0lk3)

**PR6: Feature 2: Health Check** ลิงก์ `https://github.com/titayaaa/toktickit/pull/6`
- **Reviewer 1**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)

**PR7: Feature 3: Category Seed** ลิงก์ `https://github.com/titayaaa/toktickit/pull/7`
- **Reviewer 1**: ชัญญา พูลเขตกิจ (ID: 67070501058, GitHub: @chanya06)
- **Reviewer 2**: สุประวีณ์ สุทธิเสรีนิวัฒน์ (ID: 67070505227, GitHub: @Suprawi5227)

**PR8: Feature 4: Category List Display** ลิงก์ `https://github.com/titayaaa/toktickit/pull/8`
- **Reviewer 1**: พัฒนาวดี แสงเงินยอด (ID: 67070505222, GitHub: @jejaebubu)
- **Reviewer 2**: ชัญญา พูลเขตกิจ (ID: 67070501058, GitHub: @chanya06)

**PR9: Lab 1 Integration to Production** ลิงก์ `https://github.com/titayaaa/toktickit/pull/9`
- **Reviewer 1**: อชิรญา อินตา (ID: 67070505229, GitHub: @Achikan)

## Submitted PR Review Evidence (เพื่อนตรวจเรา)

- **PR 5 (ธนากร @il0lk3):** "ได้ตรวจสอบโครงสร้างโปรเจกต์ (React+Vite, Express, Prisma) และการติดตั้ง package สำหรับการเทสแล้ว มีไฟล์ .env.example และ .gitignore คิดว่าถูกต้องตามที่ Issue1 ต้องการครับ Good Girl!" 
  **My Response:** *(ไม่มีการตอบกลับ)*

- **PR 6 (พัฒนาวดี @jejaebubu):** "โดยรวมการทำงานของ API Health Check และการเขียน Test ทำได้ดีแล้ว โค้ดอ่านง่าย การทำงานของ GET /api/health และการทดสอบด้วย Supertest มีความชัดเจน และโครงสร้างโดยรวมเรียบร้อยดีค่าาาา" 
  **My Response:** *(ไม่มีการตอบกลับ)*

- **PR 7 (ชัญญา @chanya06):** "ตรวจสอบ PR Feature 3 แล้ว ตัว Category migration และ seed โดยรวมทำได้ถูกต้องตาม requirement และ Base branch เป็น lab1-staging ถูกต้องมีจุดเล็กน้อยใน docs/lab-01/reviewer.md ที่รายการ PR มีเลขซ้ำกัน เช่น PR #3 ปรากฏทั้ง /pull/3 และ /pull/7 ครับรบกวนแก้เลข PR ในเอกสารให้ตรงกับ PR จริงและไม่ซ้ำกัน หลังจากแก้แล้วส่วน implementation หลักดูโอเค" 
  **My Response:** "ได้เข้าไปอัปเดตและเช็คตัวเลข PR ทั้งหมดให้ตรงกับความเป็นจริงและไม่ให้มีเลขซ้ำกันเรียบร้อยแล้ว"

- **PR 7 (@Suprawi5227):** "มีไฟล์สำคัญหายไปจาก PR นี้จ้า: ไม่มีการแก้ไฟล์ server/prisma/schema.prisma: ไม่เห็นโค้ดที่สร้าง Model Category เลย... ไฟล์ server/prisma/seed.ts เขียนไม่เสร็จ... รบกวนกลับไปเช็คดูอีกทีน้าว่าลืมเขียน หรือเขียนแล้วแต่ลืมกด Git Add / Commit ไฟล์พวกนี้หรือเปล่า..." 
  **My Response:** "ไฟล์ schema.prisma และ seed.ts ที่ตอนแรกไม่ขึ้นในหน้า Diff เป็นเพราะเราดันเผลอเอาไปรวมไว้ตั้งแต่ตอนทำ commit แรก (Project Foundation) ไปแล้ว แต่ตอนนี้เราจัดประวัติโค้ดใหม่ และดันโค้ดที่สร้าง Model Category กับลอจิกการทำ Seed แบบ upsert ทั้ง 4 หมวดหมู่ เข้ามาใน PR นี้ให้เห็นชัดเจนแล้ว รบกวนตรวจดูให้อีกรอบน้า ถ้าเรียบร้อยแล้วฝากกด Approve และ Merge ให้หน่อยน้า"

- **PR 8 (พัฒนาวดี @jejaebubu):** "ดูให้แล้วนะโดยรวม Category List ทั้งฝั่ง API, UI และ test ทำได้โอเคแล้ว มีการแสดง categories ทั้ง 4 รายการตาม requirement คิดว่ามีจุดที่ต้องแก้เล็กน้อยใน App.tsx คือมีปุ่ม Check System อยู่ 2 ตัว โดยปุ่มแรกไม่มี onClick ทำให้กดแล้วไม่เกิดอะไรขึ้น... แนะนำว่าให้ลบปุ่มแรกที่ไม่ได้ใช้งานออก" 
  **My Response:** "เราลองกลับไปเช็คในไฟล์ App.tsx ของ PR นี้ดูแล้ว ตอนนี้มีปุ่ม Check System แค่ปุ่มเดียวนะะ และปุ่มนี้ก็มีการผูก onClick={handleCheckSystem} ไว้เรียบร้อยแล้ว รบกวนลองรีเฟรชดูโค้ดเวอร์ชันล่าสุดในแท็บ Files changed ของ PR นี้ น่าจะถูกต้องเรียบร้อยแล้วนะะ ถ้าโอเคแล้วฝาก Approve ให้หน่อยน้า ขอบคุณมาก"

- **PR 8 (ชัญญา @chanya06):** "โดยรวม implementation ของ API และ UI ทำได้ตาม requirement แต่พบจุดที่ควรแก้ใน App.tsx มีการ import React ซ้ำ 2 ครั้ง... มีปุ่ม Check System ซ้ำ 2 ปุ่ม... ลบปุ่มที่ไม่ได้ใช้งานและแก้ import ซ้ำ" 
  **My Response:** "ขอบคุณสำหรับรีวิวน้า พอดีเราลองเข้าไปเช็คในไฟล์ App.tsx ดูแล้ว ตอนนี้ในไฟล์มี import React, { useState } แค่บรรทัดเดียว และมีปุ่ม Check System แค่ปุ่มเดียวที่ผูก onClick ไว้แล้ว คาดว่าที่เห็นซ้ำกันน่าจะเป็นเพราะในหน้า Diff ของ GitHub มันแสดงบรรทัดเก่าที่โดนลบออก (สีแดง) คู่กับบรรทัดใหม่ที่เพิ่งเพิ่มเข้าไป (สีเขียว) เลยอาจจะดูเหมือนมีโค้ดซ้ำกัน ลองเช็คแบบ View full file ดูอีกทีนะะ ถ้าเรียบร้อยดีฝากกด Approve ให้หน่อยน้า"

- **PR 9 (อชิรญา @Achikan):** "ตรวจสอบโค้ด Integration PR ให้แล้วจ้า UI หน้าเว็บทำได้ตรงตามสเปคและสวยงามมาก! แต่ว่าฝั่ง Backend เจอจุดที่อาจจะทำให้โปรเจกต์ Build ไม่ผ่าน 1 จุดครับ ในไฟล์ server/src/app.ts บรรทัดที่มี (_req: Request, res: Response) รบกวนเพิ่ม import { Request, Response } from 'express'; ไว้ข้างบนสุดให้หน่อยนะจ้ะ ไม่งั้น TypeScript มันจะฟ้อง Error จ้า แก้เสร็จแล้วเดี๋ยวเค้ากด" 
  **My Response:** "ขอบคุณมากน้าที่ช่วยเช็คให้อย่างละเอียด ตอนนี้เราได้เพิ่ม import { Request, Response } from 'express'; ที่ไฟล์ server/src/app.ts ให้เรียบร้อยแล้วน้า ดันโค้ดขึ้นมาอัปเดตใน PR นี้ให้แล้ว รบกวนตรวจดูอีกรอบนะะ ถ้าโค้ดเรียบร้อย แล้วรบกวนกด Approve แล้วก็ Merge เข้า main ให้ทีน้าา ขอบคุณค้าบ"

## Partner PR Review Evidence (เราตรวจเพื่อน)

- **PR 5 (ธนากร @il0lk3):** ลิงก์ `https://github.com/il0lk3/TokTickIT/pull/5`
  **My Review Comment:** "This PR cleanly accomplishes the goal of setting up the project foundation, project structure, TypeScript compiler settings, test harnesses, and initial stubs."
  **Partner Response:** *(ไม่มีการตอบกลับ)*

- **PR 6 (@natthakamol1130):** ลิงก์ `https://github.com/natthakamol1130/toktickit/pull/6`
  **My Review Comment:** "LGTM โค้ดทำหน้าที่ตาม Requirement ได้ถูกต้อง ไม่มีปัญหาเรื่อง Logic หรือ Syntax"
  **Partner Response:** *(ไม่มีการตอบกลับ)*

- **PR 9 (ธนากร @il0lk3):** ลิงก์ `https://github.com/il0lk3/TokTickIT/pull/9`
  **My Review Comment:** "โดยรวมโอเคเลย โค้ดแยกส่วนค่อนข้างชัด แล้วก็มี test ให้ด้วย แต่คิดว่าน่าจะเพิ่ม test กรณีที่ API error แล้วก็ลองเช็ก response ให้ละเอียดขึ้นว่ามี id กับ name ครบไหม ส่วน void ที่ไม่ได้ใช้ ถ้าไม่จำเป็นก็อาจจะเอาออก จะได้ทำให้โค้ดดูสะอาดขึ้น"
  **Partner Response:** "ขอบคุณสำหรับคำแนะนำดีๆ ครับ ตอนนี้เข้าไปลบ void ที่ไม่ได้ใช้ออกให้โค้ดดูสะอาดขึ้นแล้ว และได้เพิ่ม Test สำหรับเช็คค่า id กับ name ใน Response รวมถึงเขียน Test ตรวจสอบกรณี API Error เพิ่มเติมเรียบร้อยแล้วครับบบ"
