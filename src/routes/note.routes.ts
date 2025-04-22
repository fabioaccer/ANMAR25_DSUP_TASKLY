import { Router } from 'express';
import NoteController from '../controllers/NoteController';
import { validate } from '../middlewares/ValidationMiddleware';
import {
    NoteCreateSchema,
    NoteUpdateSchema,
    NoteParamSchema,
    TaskNotesParamSchema,
} from '../dtos/NoteDto';

const noteRoutes = Router();
const noteController = new NoteController();

noteRoutes.post('/tasks/:taskId/notes', validate(NoteCreateSchema), noteController.create.bind(noteController));
noteRoutes.get('/tasks/:taskId/notes', validate(TaskNotesParamSchema), noteController.findByTaskId.bind(noteController));
noteRoutes.get('/notes/:id', validate(NoteParamSchema), noteController.findById.bind(noteController));
noteRoutes.put('/notes/:id', validate(NoteUpdateSchema), noteController.update.bind(noteController));
noteRoutes.delete('/notes/:id', validate(NoteParamSchema), noteController.delete.bind(noteController));

export default noteRoutes;