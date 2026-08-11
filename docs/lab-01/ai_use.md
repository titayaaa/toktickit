# AI Use and Reflection

I used the Antigravity coding agent through my Google Cloud Platform account. I mainly used Gemini 3.5 Flash as the LLM with a thinking level of Medium.

## Selected Key Prompts

| Prompt Name | Actual Prompt Text | Reflection |
| --- | --- | --- |
| Plan Lab 1 Implementation | Read the enclosed TokTickIT Lab 1 requirements. Summarize the four GitHub Issues, their dependencies, required outputs, and required automated tests. Propose an implementation order, but do not write code yet. | Worked cleanly in one shot to produce the overall structured architecture and task execution plan. |
| Set Up Full-Stack Project | Setup the TokTickIT project tech stack as given in Lab 1 using React, TypeScript, Vite, and Bootstrap for the frontend, and Node.js, Express, and TypeScript for the backend. Configure PostgreSQL and Prisma. Use the required folder structure. Do not add functionality beyond the Lab 1 scope. | Successfully created client and server directory structures, dependency configurations, and scripts. |
| Implement Health Check | Add GET /api/health to the existing Express backend. It must return HTTP 200 with JSON { status: "ok", service: "TokTickIT API" }. Create Supertest test API-01. | Endpoint and test were implemented accurately with Supertest assertions passing. |
| Implement Category Model & Seed | Create the Prisma Category model with id, unique name, and createdAt. Create migration and idempotent seed inserting Account and Access, Hardware, Software, and Network. | Prisma schema and seed script using upsert were created cleanly without duplicate errors. |
| Implement Category List API | Add GET /api/categories endpoint retrieving categories from PostgreSQL through Prisma in predictable order (ID asc). Create Supertest test API-02. | Endpoint returned expected data format and Supertest verified response. |
| Build and Test Check System UI | Create a Bootstrap-based React page with [Check System] button. When clicked, show loading state, call backend health and categories APIs, and render system status & 4 categories (or error message when offline). Write Vitest tests UI-01, UI-02, UI-03. | UI component handles loading, success, and error states cleanly, and Vitest suite passes all assertions. |
