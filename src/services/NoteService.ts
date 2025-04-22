import { Note } from '../models/Note';
import { NoteCreateDto, NoteUpdateDto } from '../dtos/NoteDto';
import NoteRepository from '../repositories/NoteRepository';
import AppError from '../errors/AppError';

export default class NoteService {
    private noteRepository: NoteRepository;

    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async create(taskId: string, data: { content: string }): Promise<Note> {
        const noteData: NoteCreateDto = {
            content: data.content,
            task_id: taskId,
        };

        return this.noteRepository.create(noteData);
    }

    async findByTaskId(
        taskId: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ notes: Note[]; total: number; page: number; pages: number }> {
        return this.noteRepository.findByTaskId(taskId, page, limit);
    }

    async findById(id: string): Promise<Note> {
        const note = await this.noteRepository.findById(id);

        if (!note) {
            throw new AppError('Note not found', 404);
        }

        return note;
    }

    async update(id: string, data: NoteUpdateDto): Promise<Note> {
        return this.noteRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.noteRepository.delete(id);
    }
}