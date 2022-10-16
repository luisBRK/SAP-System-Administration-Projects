import express from 'express';
import { userRouter, projectRouter } from './routes';

// set app express
const app = express();

// middleware JSON
app.use(express.json());

// routes | middlewares
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);

export default app;
