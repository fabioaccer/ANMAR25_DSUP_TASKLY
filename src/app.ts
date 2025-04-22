import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import errorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

import './config/container';

app.use(routes);
app.use(errorMiddleware);

export default app;