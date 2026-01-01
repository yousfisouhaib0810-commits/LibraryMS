import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: 'LibraryMS - Library Management System',
      description: 'A Web Application for managing library operations, including book cataloging, member management, and borrowing/returning books.',
      imageUrl: '/projects/library.jpg',
      tags: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      demoUrl: 'https://yousfi.vercel.app',
      githubUrl: 'https://github.com/yousfimh',
    },
    {
      title: 'Codilli - Freelance Platform',
      description: 'The Ultimate Developer Ecosystem Platform merges social networking, a vibrant code marketplace, and on-demand service opportunities.',
      imageUrl: '/projects/codilli.jpg',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      demoUrl: 'https://yousfi.vercel.app',
      githubUrl: 'https://github.com/yousfimh',
    },
    {
      title: 'Uber - Riding App Clone',
      description: 'A sleek and powerful React Native app that connects passengers with drivers. Users can search routes, pick a driver, and pay.',
      imageUrl: '/projects/uber.jpg',
      tags: ['React Native', 'Expo', 'Google Maps API', 'Stripe'],
      demoUrl: 'https://yousfi.vercel.app',
      githubUrl: 'https://github.com/yousfimh',
    },
  ];

  console.log('Start seeding...');

  // Clear existing projects to avoid duplicates during testing if needed
  // await prisma.project.deleteMany();

  for (const p of projects) {
    const project = await prisma.project.create({
      data: p,
    });
    console.log(`Created project with id: ${project.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
