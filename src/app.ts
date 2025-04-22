import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { container } from 'tsyringe';
import taskRoutes from './routes/task.routes';
import noteRoutes from './routes/note.routes';
import errorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

// Importando o container de injeção de dependência
import './config/container';

// Rotas
app.use('/tasks', taskRoutes);
app.use('/notes', noteRoutes);

app.use(errorMiddleware);

export default app;