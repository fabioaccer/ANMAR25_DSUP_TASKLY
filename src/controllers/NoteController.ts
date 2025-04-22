import { Request, Response } from 'express';
import NoteService from '../services/NoteService';
import { NoteUpdateDto } from '../dtos/NoteDto';

export default class NoteController {
    private noteService: NoteService;

    constructor() {
        this.noteService = new NoteService();
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { taskId } = request.params;
        const { content } = request.body;
        const note = await this.noteService.create(taskId, { content });
        return response.status(201).json(note);
    }

    async findByTaskId(request: Request, response: Response): Promise<Response> {
        const { taskId } = request.params;
        const { page = 1, limit = 10 } = request.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const result = await this.noteService.findByTaskId(
            taskId,
            pageNumber,
            limitNumber,
        );

        return response.json(result);
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const note = await this.noteService.findById(id);
        return response.json(note);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const data = request.body as NoteUpdateDto;
        const note = await this.noteService.update(id, data);
        return response.json(note);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        await this.noteService.delete(id);
        return response.status(204).send();
    }
}