# Lab 1 Automated Tests Summary

| Test File (`tests/lab-01/`) | Tool | Test ID | Test Description | Status |
| --- | --- | --- | --- | --- |
| `health.test.ts` | Supertest | API-01 | Health endpoint `GET /api/health` returns HTTP 200 and `{ status: "ok", service: "TokTickIT API" }` | PASS |
| `categories.test.ts` | Supertest | API-02 | Categories endpoint `GET /api/categories` returns the 4 seeded categories | PASS |
| `App.test.tsx` | Vitest | UI-01 | `TokTickIT IT Service Desk` heading renders | PASS |
| `App.test.tsx` | Vitest | UI-02 | Loading state changes to category list on successful button click | PASS |
| `App.test.tsx` | Vitest | UI-03 | API failure displays a useful error message (`Unable to connect to TokTickIT API`) | PASS |
