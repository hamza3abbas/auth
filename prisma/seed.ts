const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const statuses = ['New', 'Contacted', 'Qualified', 'Unqualified', 'Converted'];

  for (const status of statuses) {
    await prisma.leadStatus.create({
      data: { name: status },
    });
  }

  console.log('Lead statuses seeded.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
