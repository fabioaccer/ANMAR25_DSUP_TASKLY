import { Router } from 'express';
import prisma from '../config/database';

const router = Router();

router.get('/', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        
        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                database: 'connected',
                server: 'running'
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            services: {
                database: 'disconnected',
                server: 'running'
            },
            error: 'Database connection failed'
        });
    }
});

export default router; 