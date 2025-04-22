import prisma from '../config/database';
import { Note } from '../models/Note';
import { NoteCreateDto, NoteUpdateDto } from '../dtos/NoteDto';
import AppError from '../errors/AppError';
import { ErrorCode } from '../errors/ErrorCodes';
import { Prisma } from '@prisma/client';

export default class NoteRepository {
    async create(data: NoteCreateDto): Promise<Note> {
        try {
            const task = await prisma.task.findUnique({
                where: { id: data.task_id },
            });

            if (!task) {
                throw new AppError(
                    'Task not found',
                    404,
                    ErrorCode.TASK_NOT_FOUND
                );
            }

            return await prisma.note.create({
                data,
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new AppError(
                    'Error creating note in database',
                    400,
                    ErrorCode.DATABASE_ERROR
                );
            }

            throw error;
        }
    }

    async findByTaskId(
        taskId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ notes: Note[]; total: number; page: number; pages: number }> {
        try {
            const task = await prisma.task.findUnique({
                where: { id: taskId },
            });

            if (!task) {
                throw new AppError(
                    'Task not found',
                    404,
                    ErrorCode.TASK_NOT_FOUND
                );
            }

            const skip = (page - 1) * limit;

            const [notes, total] = await Promise.all([
                prisma.note.findMany({
                    where: { task_id: taskId },
                    skip,
                    take: limit,
                    orderBy: {
                        created_at: 'desc',
                    },
                }),
                prisma.note.count({ where: { task_id: taskId } }),
            ]);

            const pages = Math.ceil(total / limit);

            return {
                notes,
                total,
                page,
                pages,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                'Error fetching notes',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async findById(id: string): Promise<Note | null> {
        try {
            return await prisma.note.findUnique({
                where: { id },
            });
        } catch (error) {
            throw new AppError(
                'Error fetching note',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async update(id: string, data: NoteUpdateDto): Promise<Note> {
        try {
            return await prisma.note.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError(
                        'Note not found',
                        404,
                        ErrorCode.NOTE_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Error updating note',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.note.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new AppError(
                        'Note not found',
                        404,
                        ErrorCode.NOTE_NOT_FOUND
                    );
                }
            }
            throw new AppError(
                'Error deleting note',
                500,
                ErrorCode.DATABASE_ERROR
            );
        }
    }
}