import { Request, Response } from 'express';
import TaskService from '../services/TaskService';
import { TaskCreateDto, TaskUpdateDto } from '../dtos/TaskDto';

export default class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as TaskCreateDto;
        const task = await this.taskService.create(data);
        return response.status(201).json(task);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { page = 1, limit = 10, search, category, priority } = request.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const priorityNumber = priority ? Number(priority) : undefined;

        const result = await this.taskService.findAll(
            pageNumber,
            limitNumber,
            search as string | undefined,
            category as string | undefined,
            priorityNumber,
        );

        return response.json(result);
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const task = await this.taskService.findById(id);
        return response.json(task);
    }

    async findByStatus(request: Request, response: Response): Promise<Response> {
        const { status } = request.params;
        const { page = 1, limit = 10 } = request.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const result = await this.taskService.findByStatus(
            status as 'TODO' | 'IN_PROGRESS' | 'DONE',
            pageNumber,
            limitNumber,
        );

        return response.json(result);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const data = request.body as TaskUpdateDto;
        const task = await this.taskService.update(id, data);
        return response.json(task);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        await this.taskService.delete(id);
        return response.status(204).send();
    }
}