import { z } from 'zod';

export const NoteCreateSchema = z.object({
  params: z.object({
    taskId: z.string()
      .uuid({ message: 'ID da tarefa inválido. Deve ser um UUID válido' }),
  }),
  body: z.object({
    content: z.string()
      .min(1, { message: 'O conteúdo da observação não pode estar vazio' })
      .max(1000, { message: 'O conteúdo deve ter no máximo 1000 caracteres' }),
  }),
});

export const NoteUpdateSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid({ message: 'ID inválido. Deve ser um UUID válido' }),
  }),
  body: z.object({
    content: z.string()
      .min(1, { message: 'O conteúdo da observação não pode estar vazio' })
      .max(1000, { message: 'O conteúdo deve ter no máximo 1000 caracteres' }),
  }),
});

export const NoteParamSchema = z.object({
  params: z.object({
    id: z.string()
      .uuid({ message: 'ID inválido. Deve ser um UUID válido' }),
  }),
});

export const TaskNotesParamSchema = z.object({
  params: z.object({
    taskId: z.string()
      .uuid({ message: 'ID da tarefa inválido. Deve ser um UUID válido' }),
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

export interface NoteCreateDto {
  content: string;
  task_id: string;
}

export interface NoteUpdateDto {
  content: string;
}