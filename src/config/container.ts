import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { TaskService } from '../services/TaskService';
import { TaskController } from '../controllers/TaskController';
import { NoteService } from '../services/NoteService';
import { NoteController } from '../controllers/NoteController';

// Registrando as dependências
container.register<PrismaClient>('PrismaClient', {
    useValue: new PrismaClient(),
});

container.register<TaskService>('TaskService', {
    useClass: TaskService,
});

container.register<TaskController>('TaskController', {
    useClass: TaskController,
});

container.register<NoteService>('NoteService', {
    useClass: NoteService,
});

container.register<NoteController>('NoteController', {
    useClass: NoteController,
}); 