import express from 'express';
import { userRouter } from './routes';

// set app express
const app = express();

// middleware JSON
app.use(express.json());

// routes | middlewares
app.use('/api/users', userRouter);

export default app;
