import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { TaskCreateDto, TaskUpdateDto } from '../dtos/TaskDto';

export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    async create(request: Request, response: Response): Promise<Response> {
        const task = await this.taskService.create(request.body as TaskCreateDto);
        return response.status(201).json(task);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { page = 1, limit = 10, search, category, priority } = request.query;
        const result = await this.taskService.findAll(
            Number(page),
            Number(limit),
            search as string | undefined,
            category as string | undefined,
            priority ? Number(priority) : undefined
        );
        return response.json(result);
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const task = await this.taskService.findById(request.params.id);
        return response.json(task);
    }

    async findByStatus(request: Request, response: Response): Promise<Response> {
        const { status } = request.params;
        const { page = 1, limit = 10 } = request.query;
        const result = await this.taskService.findByStatus(
            status,
            Number(page),
            Number(limit)
        );
        return response.json(result);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const task = await this.taskService.update(
            request.params.id,
            request.body as TaskUpdateDto
        );
        return response.json(task);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        await this.taskService.delete(request.params.id);
        return response.status(204).send();
    }
}