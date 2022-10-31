import express from 'express';
import { userRouter, projectRouter, taskRouter, collaboratorRouter } from './routes';

// set app express
const app = express();

// middleware JSON
app.use(express.json());

// routes | middlewares
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/collaborators', collaboratorRouter);

export default app;
