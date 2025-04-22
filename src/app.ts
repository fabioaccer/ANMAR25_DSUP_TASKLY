import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';
import errorMiddleware from './middlewares/ErrorMiddleware';

class App {
    public server: Express;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    private middlewares(): void {
        this.server.use(express.json());
        this.server.use(cors());
    }

    private routes(): void {
        this.server.use(routes);
    }

    private errorHandling(): void {
        this.server.use(errorMiddleware);
    }
}

export default new App().server;