import { TaskStatus } from '../enums/TaskStatus';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: number;
    category: string;
    created_at: Date;
    updated_at: Date;
}