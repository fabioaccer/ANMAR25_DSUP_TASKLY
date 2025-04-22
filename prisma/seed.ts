import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const task1 = await prisma.task.upsert({
        where: { id: '550e8400-e29b-41d4-a716-446655440000' },
        update: {},
        create: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            title: 'Implement authentication',
            description: 'Add JWT authentication to the system',
            status: 'PENDING',
            priority: 5,
            category: 'WORK',
            notes: {
                create: [
                    {
                        content: 'Use jsonwebtoken library'
                    }
                ]
            }
        },
    });

    const task2 = await prisma.task.upsert({
        where: { id: '550e8400-e29b-41d4-a716-446655440001' },
        update: {},
        create: {
            id: '550e8400-e29b-41d4-a716-446655440001',
            title: 'Develop user interface',
            description: 'Create React components for dashboard',
            status: 'IN_PROGRESS',
            priority: 4,
            category: 'WORK',
            notes: {
                create: [
                    {
                        content: 'Use tailwind for styling'
                    }
                ]
            }
        },
    });

    console.log({ task1, task2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });