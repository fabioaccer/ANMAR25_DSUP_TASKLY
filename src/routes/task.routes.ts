import { Router } from 'express';
import { container } from 'tsyringe';
import { TaskController } from '../controllers/TaskController';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';
import {
    TaskCreateDto,
    TaskUpdateDto,
    TaskParamSchema,
    TaskStatusParamSchema,
    TaskQuerySchema,
} from '../dtos/TaskDto';

const router = Router();
const taskController = container.resolve(TaskController);

router.post('/', validationMiddleware(TaskCreateDto), (req, res) => taskController.create(req, res));
router.get('/', validationMiddleware(TaskQuerySchema), (req, res) => taskController.findAll(req, res));
router.get('/:id', validationMiddleware(TaskParamSchema), (req, res) => taskController.findById(req, res));
router.get('/status/:status', validationMiddleware(TaskStatusParamSchema), (req, res) => taskController.findByStatus(req, res));
router.put('/:id', validationMiddleware(TaskUpdateDto), (req, res) => taskController.update(req, res));
router.delete('/:id', validationMiddleware(TaskParamSchema), (req, res) => taskController.delete(req, res));

export default router;