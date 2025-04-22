import { IsString, IsInt, IsOptional, Min, Max, Length, IsEnum } from 'class-validator';
import { TaskCategory } from '../enums/TaskCategory';
import { TaskStatus } from '../enums/TaskStatus';
import { z } from 'zod';

export class TaskCreateDto {
    @IsString()
    @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
    title: string;

    @IsString()
    @Length(0, 500, { message: 'Description must have a maximum of 500 characters' })
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsInt()
    @Min(1, { message: 'Priority must be at least 1' })
    @Max(5, { message: 'Priority must be at most 5' })
    priority: number;

    @IsEnum(TaskCategory)
    category: TaskCategory;
}

export class TaskUpdateDto {
    @IsOptional()
    @IsString()
    @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
    title?: string;

    @IsOptional()
    @IsString()
    @Length(0, 500, { message: 'Description must have a maximum of 500 characters' })
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsInt()
    @Min(1, { message: 'Priority must be at least 1' })
    @Max(5, { message: 'Priority must be at most 5' })
    priority?: number;

    @IsOptional()
    @IsEnum(TaskCategory)
    category?: TaskCategory;
}

export const TaskParamSchema = z.object({
    params: z.object({
        id: z.string().uuid({ message: 'Invalid ID. Must be a valid UUID' }),
    }),
});

export const TaskStatusParamSchema = z.object({
    params: z.object({
        status: z.nativeEnum(TaskStatus, { message: 'Invalid status' }),
    }),
});

export const TaskQuerySchema = z.object({
    query: z.object({
        page: z.string()
            .optional()
            .transform(val => val ? Number(val) : 1)
            .refine(val => val > 0, { message: 'Page must be greater than 0' }),
        limit: z.string()
            .optional()
            .transform(val => val ? Number(val) : 10)
            .refine(val => val > 0 && val <= 100, { message: 'Limit must be between 1 and 100' }),
        search: z.string().optional(),
        category: z.nativeEnum(TaskCategory).optional(),
        priority: z.string()
            .optional()
            .transform(val => val ? Number(val) : undefined)
            .refine(val => !val || (val >= 1 && val <= 5), { message: 'Priority must be between 1 and 5' }),
    }),
});