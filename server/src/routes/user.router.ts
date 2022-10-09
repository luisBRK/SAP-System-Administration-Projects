import express from 'express';

import { userController } from '../controllers';

// set router
const userRouter = express.Router();

// routes
userRouter.post('/', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/confirm/:token', userController.confirmUser);
userRouter.post('/forgot-password', userController.recoverPassword);
userRouter.route('/forgot-password/:token').get(userController.checkToken).post(userController.newPassword);

export default userRouter;
