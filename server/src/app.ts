import express from 'express';
import { connectDB } from './config';
import { userRouter } from './routes';
// import path from 'path';

// set app express
const app = express();

// middleware JSON
app.use(express.json());

// database connection
connectDB();

// routes | middlewares
app.use('/api/users', userRouter);

export default app;
