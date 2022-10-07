import express from 'express';

import { userController } from '../controllers';

// set router
const userRouter = express.Router();

// routes
userRouter.post('/', userController.signup);

export default userRouter;
