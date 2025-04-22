import { Router } from 'express';
import taskRoutes from './task.routes';
import noteRoutes from './note.routes';

const routes = Router();

routes.use(taskRoutes);
routes.use(noteRoutes);

export default routes;