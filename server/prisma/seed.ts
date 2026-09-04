import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This seed script is designed to be idempotent and safe to run multiple times.
async function main() {
  const categories = [
    { name: 'Account and Access' },
    { name: 'Hardware' },
    { name: 'Software' },
    { name: 'Network' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  const relatedSystems = [
    { name: 'Email' },
    { name: 'Campus Wi-Fi' },
    { name: 'VPN' },
    { name: 'LEB2 App' },
    { name: 'Grade Submission App' },
    { name: 'Printer' },
    { name: 'Corporate Laptop' },
  ];

  for (const system of relatedSystems) {
    await prisma.relatedSystem.upsert({
      where: { name: system.name },
      update: {},
      create: system,
    });
  }

  const requesters = [
    { name: 'Jennifer Anderson', email: 'jennifer.anderson@example.com', isActive: true },
    { name: 'Michael Brown', email: 'michael.brown@example.com', isActive: true },
    { name: 'Sarah Johnson', email: 'sarah.johnson@example.com', isActive: true },
    { name: 'David Lee', email: 'david.lee@example.com', isActive: true },
    { name: 'Inactive User', email: 'inactive.user@example.com', isActive: false },
  ];

  for (const req of requesters) {
    await prisma.requesterUser.upsert({
      where: { email: req.email },
      update: { isActive: req.isActive, name: req.name },
      create: req,
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
