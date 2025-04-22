import prisma from '../config/database';
import { Task } from '../models/Task';
import { TaskCreateDto, TaskUpdateDto } from '../dtos/TaskDto';
import { TaskStatus } from '../enums/TaskStatus';
import AppError from '../errors/AppError';
import { ErrorCode } from '../errors/ErrorCodes';
import { Prisma } from '@prisma/client';

const toTask = (prismaTask: any): Task => ({
    ...prismaTask,
    status: prismaTask.status as TaskStatus
});

export default class TaskRepository {
    async create(data: TaskCreateDto): Promise<Task> {
        try {
            const task = await prisma.task.create({ data });
            return toTask(task);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError(
                    'Error creating task in database',
                    400,
                    ErrorCode.DATABASE_ERROR
                );
            }
            throw error;
        }
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        search?: string,
        category?: string,
        priority?: number,
    ): Promise<{ tasks: Task[]; total: number; page: number; pages: number }> {
        try {
            const skip = (page - 1) * limit;

            const where: any = {};

            if (search) {
                where.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ];
            }

            if (category) {
                where.category = category;
            }

            if (priority) {
                where.priority = priority;
            }

            const [tasks, total] = await Promise.all([
                prisma.task.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: {
                        created_at: 'desc',
                    },
                }),
                prisma.task.count({ where }),
            ]);

            const pages = Math.ceil(total / limit);

            return {
                tasks: tasks.map(toTask),
                total,
                page,
                pages,
            };
        } catch (error) {
            throw new AppError(
                'Error fetching tasks',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async findById(id: string): Promise<Task | null> {
        try {
            const task = await prisma.task.findUnique({
                where: { id },
            });
            return task ? toTask(task) : null;
        } catch (error) {
            throw new AppError(
                'Error fetching task',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async findByStatus(
        status: TaskStatus,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ tasks: Task[]; total: number; page: number; pages: number }> {
        try {
            const skip = (page - 1) * limit;

            const [tasks, total] = await Promise.all([
                prisma.task.findMany({
                    where: { status },
                    skip,
                    take: limit,
                    orderBy: {
                        created_at: 'desc',
                    },
                }),
                prisma.task.count({ where: { status } }),
            ]);

            const pages = Math.ceil(total / limit);

            return {
                tasks: tasks.map(toTask),
                total,
                page,
                pages,
            };
        } catch (error) {
            throw new AppError(
                `Error fetching tasks with status ${status}`,
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async update(id: string, data: TaskUpdateDto): Promise<Task> {
        try {
            const task = await prisma.task.update({
                where: { id },
                data,
            });
            return toTask(task);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError(
                        'Task not found',
                        404,
                        ErrorCode.TASK_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Error updating task',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.task.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError(
                        'Task not found',
                        404,
                        ErrorCode.TASK_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Error deleting task',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }
}