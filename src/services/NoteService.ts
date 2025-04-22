import { injectable, inject } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { NoteCreateDto, NoteUpdateDto } from '../dtos/NoteDto';
import AppError from '../errors/AppError';

@injectable()
export class NoteService {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient
    ) {}

    async create(data: NoteCreateDto) {
        return this.prisma.note.create({
            data: {
                content: data.content,
                task_id: data.task_id
            }
        });
    }

    async findAll(task_id?: string) {
        return this.prisma.note.findMany({
            where: task_id ? { task_id } : undefined,
            orderBy: { created_at: 'desc' }
        });
    }

    async findById(id: string) {
        const note = await this.prisma.note.findUnique({
            where: { id }
        });

        if (!note) {
            throw new AppError('Note not found', 404);
        }

        return note;
    }

    async update(id: string, data: NoteUpdateDto) {
        return this.prisma.note.update({
            where: { id },
            data: {
                content: data.content
            }
        });
    }

    async delete(id: string) {
        await this.prisma.note.delete({
            where: { id }
        });
    }
}