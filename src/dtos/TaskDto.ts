import { z } from 'zod';

export const TaskStatus = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
export type TaskStatusType = z.infer<typeof TaskStatus>;

export const TaskCreateSchema = z.object({
  body: z.object({
    title: z.string()
      .min(3, { message: 'O título deve ter pelo menos 3 caracteres' })
      .max(100, { message: 'O título deve ter no máximo 100 caracteres' }),
    description: z.string()
      .max(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
      .optional()
      .default(''),
    status: TaskStatus
      .default('TODO'),
    priority: z.number()
      .int({ message: 'A prioridade deve ser um número inteiro' })
      .min(1, { message: 'A prioridade deve ser entre 1 e 5' })
      .max(5, { message: 'A prioridade deve ser entre 1 e 5' })
      .default(3),
    category: z.string()
      .min(1, { message: 'A categoria é obrigatória' })
      .max(50, { message: 'A categoria deve ter no máximo 50 caracteres' }),
  }),
});

export const TaskUpdateSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid({ message: 'ID inválido. Deve ser um UUID válido' }),
  }),
  body: z.object({
    title: z.string()
      .min(3, { message: 'O título deve ter pelo menos 3 caracteres' })
      .max(100, { message: 'O título deve ter no máximo 100 caracteres' })
      .optional(),
    description: z.string()
      .max(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
      .optional(),
    status: TaskStatus.optional(),
    priority: z.number()
      .int({ message: 'A prioridade deve ser um número inteiro' })
      .min(1, { message: 'A prioridade deve ser entre 1 e 5' })
      .max(5, { message: 'A prioridade deve ser entre 1 e 5' })
      .optional(),
    category: z.string()
      .min(1, { message: 'A categoria não pode ser vazia' })
      .max(50, { message: 'A categoria deve ter no máximo 50 caracteres' })
      .optional(),
  }),
});

export const TaskParamSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid({ message: 'ID inválido. Deve ser um UUID válido' }),
  }),
});

export const TaskStatusParamSchema = z.object({
  params: z.object({
    status: TaskStatus,
  }),
  query: z.object({
    page: z.string()
      .optional()
      .transform(val => val ? Number(val) : 1)
      .refine(val => val > 0, { message: 'A página deve ser maior que 0' }),
    limit: z.string()
      .optional()
      .transform(val => val ? Number(val) : 10)
      .refine(val => val > 0 && val <= 100, { message: 'O limite deve estar entre 1 e 100' }),
  }),
});

export const TaskQuerySchema = z.object({
  query: z.object({
    page: z.string()
      .optional()
      .transform(val => val ? Number(val) : 1)
      .refine(val => val > 0, { message: 'A página deve ser maior que 0' }),
    limit: z.string()
      .optional()
      .transform(val => val ? Number(val) : 10)
      .refine(val => val > 0 && val <= 100, { message: 'O limite deve estar entre 1 e 100' }),
    search: z.string().optional(),
    category: z.string().optional(),
    priority: z.string()
      .optional()
      .transform(val => val ? Number(val) : undefined)
      .refine(val => !val || (val >= 1 && val <= 5), { message: 'A prioridade deve estar entre 1 e 5' })
      .optional(),
  }),
});

export interface TaskCreateDto {
  title: string;
  description: string;
  status: TaskStatusType;
  priority: number;
  category: string;
}

export interface TaskUpdateDto {
  title?: string;
  description?: string;
  status?: TaskStatusType;
  priority?: number;
  category?: string;
}