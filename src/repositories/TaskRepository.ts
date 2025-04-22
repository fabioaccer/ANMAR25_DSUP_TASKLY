import prisma from '../config/database';
import { Task } from '../models/Task';
import { TaskCreateDto, TaskUpdateDto, TaskStatusType } from '../dtos/TaskDto';
import AppError from '../errors/AppError';
import { ErrorCode } from '../errors/ErrorCodes';
import { Prisma } from '@prisma/client';

export default class TaskRepository {
    async create(data: TaskCreateDto): Promise<Task> {
        try {
            return await prisma.task.create({
                data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError(
                    'Erro ao criar tarefa no banco de dados',
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
                tasks,
                total,
                page,
                pages,
            };
        } catch (error) {
            throw new AppError(
                'Erro ao buscar tarefas',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async findById(id: string): Promise<Task | null> {
        try {
            return await prisma.task.findUnique({
                where: { id },
            });
        } catch (error) {
            throw new AppError(
                'Erro ao buscar tarefa',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async findByStatus(
        status: TaskStatusType,
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
                tasks,
                total,
                page,
                pages,
            };
        } catch (error) {
            throw new AppError(
                `Erro ao buscar tarefas com status ${status}`,
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async update(id: string, data: TaskUpdateDto): Promise<Task> {
        try {
            return await prisma.task.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError(
                        'Tarefa não encontrada',
                        404,
                        ErrorCode.TASK_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Erro ao atualizar tarefa',
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
                        'Tarefa não encontrada',
                        404,
                        ErrorCode.TASK_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Erro ao deletar tarefa',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }
}