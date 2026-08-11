# TokTickIT - IT Service Desk Application (Lab 1)

TokTickIT is an IT service desk web application built with React, TypeScript, Express, Prisma ORM, and PostgreSQL.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Bootstrap
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Testing**: Supertest (API testing) & Vitest (UI testing)

## Repository Structure

```text
toktickit/
├── client/          # React + Vite + Bootstrap frontend
├── server/          # Express + Prisma backend
│   ├── prisma/      # Schema and seed script
│   ├── src/         # Express API logic
│   └── tests/
│       └── lab-01/  # Supertest API tests
├── docs/
│   └── lab-01/      # Documentation (AI Use, Reviewer, Tests)
├── .gitignore
└── README.md
```

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is running. Configure database URL in `server/.env`:
```env
DATABASE_URL="postgresql://root:root@localhost:15432/toktickit?schema=public"
PORT=5000
```

Run database migrations and seed:
```bash
cd server
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

### 2. Backend Setup & Run

```bash
cd server
npm install
npm run dev
```
Backend API will run at `http://localhost:5000`.

Run Supertest tests:
```bash
cd server
npm test
```

### 3. Frontend Setup & Run

```bash
cd client
npm install
npm run dev
```
Frontend app will run at `http://localhost:5173`.

Run Vitest tests:
```bash
cd client
npm test
```