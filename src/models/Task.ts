export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: number;
    category: string;
    created_at: Date;
    updated_at: Date;
}