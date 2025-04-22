import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const task1 = await prisma.task.upsert({
        where: { id: '550e8400-e29b-41d4-a716-446655440000' },
        update: {},
        create: {
            id: '550e8400-e29b-41d4-a716-446655440000',
            title: 'Implementar autenticação',
            description: 'Adicionar autenticação JWT ao sistema',
            status: 'TODO',
            priority: 5,
            category: 'BACKEND',
            notes: {
                create: [
                    {
                        content: 'Utilizar biblioteca jsonwebtoken'
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
            title: 'Desenvolver interface do usuário',
            description: 'Criar componentes React para dashboard',
            status: 'IN_PROGRESS',
            priority: 4,
            category: 'FRONTEND',
            notes: {
                create: [
                    {
                        content: 'Usar tailwind para estilização'
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