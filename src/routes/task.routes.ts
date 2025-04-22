import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import { validate } from '../middlewares/ValidationMiddleware';
import {
    TaskCreateSchema,
    TaskUpdateSchema,
    TaskParamSchema,
    TaskStatusParamSchema,
    TaskQuerySchema,
} from '../dtos/TaskDto';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/', validate(TaskCreateSchema), taskController.create.bind(taskController));
taskRoutes.get('/', validate(TaskQuerySchema), taskController.findAll.bind(taskController));
taskRoutes.get('/:id', validate(TaskParamSchema), taskController.findById.bind(taskController));
taskRoutes.get('/status/:status', validate(TaskStatusParamSchema), taskController.findByStatus.bind(taskController));
taskRoutes.put('/:id', validate(TaskUpdateSchema), taskController.update.bind(taskController));
taskRoutes.delete('/:id', validate(TaskParamSchema), taskController.delete.bind(taskController));

export default taskRoutes;