import { injectable, inject } from 'tsyringe';
import { PrismaClient, Prisma } from '@prisma/client';
import { TaskCreateDto, TaskUpdateDto } from '../dtos/TaskDto';
import { TaskStatus } from '../enums/TaskStatus';
import AppError from '../errors/AppError';

@injectable()
export class TaskService {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async create(data: TaskCreateDto) {
        return this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                category: data.category
            }
        });
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        search?: string,
        category?: string,
        priority?: number
    ) {
        const skip = (page - 1) * limit;
        const where: Prisma.TaskWhereInput = {
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
                    { description: { contains: search, mode: 'insensitive' as Prisma.QueryMode } }
                ]
            }),
            ...(category && { category }),
            ...(priority && { priority })
        };

        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' }
            }),
            this.prisma.task.count({ where })
        ]);

        return {
            tasks,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }

    async findById(id: string) {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        return task;
    }

    async findByStatus(
        status: TaskStatus,
        page: number = 1,
        limit: number = 10
    ) {
        const skip = (page - 1) * limit;
        const where: Prisma.TaskWhereInput = { status };

        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' }
            }),
            this.prisma.task.count({ where })
        ]);

        return {
            tasks,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }

    async update(id: string, data: TaskUpdateDto) {
        return this.prisma.task.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                category: data.category
            }
        });
    }

    async delete(id: string) {
        await this.prisma.task.delete({
            where: { id }
        });
    }
}