import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Idempotent seed script safe to run repeatedly
async function main() {
  console.log('Seeding categories and related systems...');
  const categories = [
    { name: 'Account and Access', isActive: true },
    { name: 'Hardware', isActive: true },
    { name: 'Software', isActive: true },
    { name: 'Network', isActive: true },
    { name: 'Legacy Hardware', isActive: false },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: { isActive: category.isActive },
      create: category,
    });
  }

  const relatedSystems = [
    { name: 'Email', isActive: true },
    { name: 'Campus Wi-Fi', isActive: true },
    { name: 'VPN', isActive: true },
    { name: 'LEB2 App', isActive: true },
    { name: 'Grade Submission App', isActive: true },
    { name: 'Printer', isActive: true },
    { name: 'Corporate Laptop', isActive: true },
    { name: 'Old Intranet', isActive: false },
  ];

  for (const system of relatedSystems) {
    await prisma.relatedSystem.upsert({
      where: { name: system.name },
      update: { isActive: system.isActive },
      create: system,
    });
  }

  console.log('Seeding users for Lab 3 (Requesters, IT Staff, Administrator)...');
  const defaultPasswordHash = await bcrypt.hash('Password123', 10);

  const users = [
    // 5 Active Requesters + 1 Inactive Requester
    {
      email: 'jennifer.anderson@example.com',
      fullName: 'Jennifer Anderson',
      role: Role.REQUESTER,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'michael.brown@example.com',
      fullName: 'Michael Brown',
      role: Role.REQUESTER,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'sarah.johnson@example.com',
      fullName: 'Sarah Johnson',
      role: Role.REQUESTER,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'david.lee@example.com',
      fullName: 'David Lee',
      role: Role.REQUESTER,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'alex.thompson@example.com',
      fullName: 'Alex Thompson',
      role: Role.REQUESTER,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'inactive.user@example.com',
      fullName: 'Inactive Requester',
      role: Role.REQUESTER,
      isActive: false,
      mustChangePassword: false,
    },

    // 3 Active IT Staff + 1 Inactive IT Staff
    {
      email: 'staff.alice@toktickit.com',
      fullName: 'Alice IT Support',
      role: Role.IT_STAFF,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'staff.bob@toktickit.com',
      fullName: 'Bob Network Tech',
      role: Role.IT_STAFF,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'staff.charlie@toktickit.com',
      fullName: 'Charlie Systems Eng',
      role: Role.IT_STAFF,
      isActive: true,
      mustChangePassword: false,
    },
    {
      email: 'staff.inactive@toktickit.com',
      fullName: 'Inactive Staff Member',
      role: Role.IT_STAFF,
      isActive: false,
      mustChangePassword: false,
    },

    // 1 Active Administrator
    {
      email: 'admin.john@toktickit.com',
      fullName: 'John Administrator',
      role: Role.ADMINISTRATOR,
      isActive: true,
      mustChangePassword: false,
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        fullName: u.fullName,
        role: u.role,
        isActive: u.isActive,
        mustChangePassword: u.mustChangePassword,
      },
      create: {
        ...u,
        passwordHash: defaultPasswordHash,
      },
    });

    // Also keep RequesterUser synced for backward compatibility with Lab 2
    if (u.role === Role.REQUESTER) {
      await prisma.requesterUser.upsert({
        where: { email: u.email },
        update: { isActive: u.isActive, name: u.fullName },
        create: { email: u.email, name: u.fullName, isActive: u.isActive },
      });
    }
  }

  // 1. Backfill existing Lab 2 tickets: connect userId to user.id and initialize itPriority
  console.log('Backfilling existing Lab 2 tickets with userId and itPriority...');
  const allRequesterUsers = await prisma.requesterUser.findMany();
  const allUsers = await prisma.user.findMany({ where: { role: Role.REQUESTER } });
  const emailToUserId = new Map(allUsers.map((u) => [u.email, u.id]));

  for (const reqUser of allRequesterUsers) {
    const targetUserId = emailToUserId.get(reqUser.email);
    if (targetUserId) {
      await prisma.ticket.updateMany({
        where: { requesterId: reqUser.id, userId: null },
        data: { userId: targetUserId },
      });
    }
  }

  // Set default itPriority = requestedPriority for tickets where itPriority is null
  const ticketsMissingPriority = await prisma.ticket.findMany({
    where: { itPriority: null },
    select: { id: true, requestedPriority: true },
  });
  for (const t of ticketsMissingPriority) {
    await prisma.ticket.update({
      where: { id: t.id },
      data: { itPriority: t.requestedPriority },
    });
  }

  // 2. Seed realistic Lab 3 operational sample tickets across statuses and roles
  console.log('Seeding realistic Lab 3 operational tickets, comments, and internal notes...');
  const catNetwork = await prisma.category.findFirst({ where: { name: 'Network' } });
  const catHardware = await prisma.category.findFirst({ where: { name: 'Hardware' } });
  const catSoftware = await prisma.category.findFirst({ where: { name: 'Software' } });
  const sysVpn = await prisma.relatedSystem.findFirst({ where: { name: 'VPN' } });
  const sysLaptop = await prisma.relatedSystem.findFirst({ where: { name: 'Corporate Laptop' } });
  const sysWifi = await prisma.relatedSystem.findFirst({ where: { name: 'Campus Wi-Fi' } });

  const jennifer = await prisma.user.findUnique({ where: { email: 'jennifer.anderson@example.com' } });
  const michael = await prisma.user.findUnique({ where: { email: 'michael.brown@example.com' } });
  const staffAlice = await prisma.user.findUnique({ where: { email: 'staff.alice@toktickit.com' } });
  const staffBob = await prisma.user.findUnique({ where: { email: 'staff.bob@toktickit.com' } });

  if (jennifer && staffAlice && catNetwork && sysVpn) {
    const ticket1 = await prisma.ticket.upsert({
      where: { ticketNumber: 'TKT-2026-000101' },
      update: {},
      create: {
        ticketNumber: 'TKT-2026-000101',
        requesterId: 1,
        userId: jennifer.id,
        categoryId: catNetwork.id,
        relatedSystemId: sysVpn.id,
        summary: 'VPN split tunneling issue during video calls',
        description: 'Connection drops when initiating video conferencing.',
        requestedPriority: TicketPriority.HIGH,
        itPriority: TicketPriority.HIGH,
        currentStatus: TicketStatus.IN_PROGRESS,
        ownerId: staffAlice.id,
      },
    });

    // Public Comments
    await prisma.publicComment.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        ticketId: ticket1.id,
        userId: staffAlice.id,
        content: 'We have identified an MTU size mismatch on the VPN gateway. Please test now.',
      },
    });

    await prisma.publicComment.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        ticketId: ticket1.id,
        userId: jennifer.id,
        content: 'Thank you! The connection is stable now.',
      },
    });

    // Internal Notes (Confidential to IT Staff / Admin)
    await prisma.internalNote.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        ticketId: ticket1.id,
        userId: staffAlice.id,
        content: 'Internal: Gateway firmware v4.8 patch applied. Monitor latency metrics on node-02.',
      },
    });
  }

  if (michael && staffBob && catHardware && sysLaptop) {
    await prisma.ticket.upsert({
      where: { ticketNumber: 'TKT-2026-000102' },
      update: {},
      create: {
        ticketNumber: 'TKT-2026-000102',
        requesterId: 2,
        userId: michael.id,
        categoryId: catHardware.id,
        relatedSystemId: sysLaptop.id,
        summary: 'Corporate laptop battery drainage issue',
        description: 'Battery drains from 100% to 20% in under one hour.',
        requestedPriority: TicketPriority.MEDIUM,
        itPriority: TicketPriority.HIGH,
        currentStatus: TicketStatus.RESOLVED,
        resolutionSummary: 'Replaced defective 4-cell battery pack under warranty and validated charge cycles.',
        ownerId: staffBob.id,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
