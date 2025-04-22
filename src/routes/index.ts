import { Router } from 'express';
import taskRoutes from './task.routes';
import noteRoutes from './note.routes';
import statusRoutes from './status.routes';

const router = Router();

router.use('/status', statusRoutes);
router.use('/tasks', taskRoutes);
router.use('/notes', noteRoutes);

export default router;