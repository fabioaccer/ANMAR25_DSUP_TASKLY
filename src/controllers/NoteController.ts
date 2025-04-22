import { Request, Response } from 'express';
import { NoteService } from '../services/NoteService';
import { NoteCreateDto, NoteUpdateDto } from '../dtos/NoteDto';

export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    async create(request: Request, response: Response): Promise<Response> {
        const note = await this.noteService.create(request.body as NoteCreateDto);
        return response.status(201).json(note);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { task_id } = request.query;
        const notes = await this.noteService.findAll(task_id as string);
        return response.json(notes);
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const note = await this.noteService.findById(request.params.id);
        return response.json(note);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const note = await this.noteService.update(
            request.params.id,
            request.body as NoteUpdateDto
        );
        return response.json(note);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        await this.noteService.delete(request.params.id);
        return response.status(204).send();
    }
}