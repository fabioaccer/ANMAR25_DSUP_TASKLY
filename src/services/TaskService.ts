import { Task } from '../models/Task';
import { TaskCreateDto, TaskUpdateDto } from '../dtos/TaskDto';
import TaskRepository from '../repositories/TaskRepository';
import AppError from '../errors/AppError';

export default class TaskService {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async create(data: TaskCreateDto): Promise<Task> {
        return this.taskRepository.create(data);
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        search?: string,
        category?: string,
        priority?: number,
    ): Promise<{ tasks: Task[]; total: number; page: number; pages: number }> {
        return this.taskRepository.findAll(page, limit, search, category, priority);
    }

    async findById(id: string): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        return task;
    }

    async findByStatus(
        status: 'TODO' | 'IN_PROGRESS' | 'DONE',
        page: number = 1,
        limit: number = 10,
    ): Promise<{ tasks: Task[]; total: number; page: number; pages: number }> {
        return this.taskRepository.findByStatus(status, page, limit);
    }

    async update(id: string, data: TaskUpdateDto): Promise<Task> {
        return this.taskRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }
}