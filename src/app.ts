import 'reflect-metadata';
import './config/container';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorMiddleware);

export default app;