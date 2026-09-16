-- CreateEnum
CREATE TYPE "Role" AS ENUM ('REQUESTER', 'IT_STAFF', 'ADMINISTRATOR');

-- AlterEnum
ALTER TYPE "TicketPriority" ADD VALUE IF NOT EXISTS 'URGENT';

-- AlterEnum
ALTER TYPE "TicketStatus" ADD VALUE IF NOT EXISTS 'WAITING_FOR_REQUESTER';
ALTER TYPE "TicketStatus" ADD VALUE IF NOT EXISTS 'REOPENED';

-- CreateTable
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'REQUESTER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AlterTable Ticket
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "resolutionSummary" TEXT;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "ownerId" INTEGER;
ALTER TABLE "Ticket" ADD COLUMN IF NOT EXISTS "userId" INTEGER;

-- CreateTable public_comments
CREATE TABLE IF NOT EXISTS "public_comments" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable internal_notes
CREATE TABLE IF NOT EXISTS "internal_notes" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "internal_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Ticket_currentStatus_idx" ON "Ticket"("currentStatus");
CREATE INDEX IF NOT EXISTS "Ticket_ownerId_idx" ON "Ticket"("ownerId");
CREATE INDEX IF NOT EXISTS "Ticket_userId_idx" ON "Ticket"("userId");
CREATE INDEX IF NOT EXISTS "Ticket_requesterId_idx" ON "Ticket"("requesterId");
CREATE INDEX IF NOT EXISTS "public_comments_ticketId_idx" ON "public_comments"("ticketId");
CREATE INDEX IF NOT EXISTS "internal_notes_ticketId_idx" ON "internal_notes"("ticketId");

-- AddForeignKey
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Ticket_userId_fkey') THEN
        ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Ticket_ownerId_fkey') THEN
        ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'public_comments_ticketId_fkey') THEN
        ALTER TABLE "public_comments" ADD CONSTRAINT "public_comments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'public_comments_userId_fkey') THEN
        ALTER TABLE "public_comments" ADD CONSTRAINT "public_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'internal_notes_ticketId_fkey') THEN
        ALTER TABLE "internal_notes" ADD CONSTRAINT "internal_notes_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'internal_notes_userId_fkey') THEN
        ALTER TABLE "internal_notes" ADD CONSTRAINT "internal_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;
