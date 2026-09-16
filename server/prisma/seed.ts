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
