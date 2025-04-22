import { Router } from 'express';
import { container } from 'tsyringe';
import { NoteController } from '../controllers/NoteController';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';
import {
    NoteCreateDto,
    NoteUpdateDto,
    NoteParamSchema,
    TaskNotesParamSchema,
} from '../dtos/NoteDto';

const router = Router();
const noteController = container.resolve(NoteController);

router.post('/', validationMiddleware(NoteCreateDto), (req, res) => noteController.create(req, res));
router.get('/', validationMiddleware(TaskNotesParamSchema), (req, res) => noteController.findAll(req, res));
router.get('/:id', validationMiddleware(NoteParamSchema), (req, res) => noteController.findById(req, res));
router.put('/:id', validationMiddleware(NoteUpdateDto), (req, res) => noteController.update(req, res));
router.delete('/:id', validationMiddleware(NoteParamSchema), (req, res) => noteController.delete(req, res));

export default router;