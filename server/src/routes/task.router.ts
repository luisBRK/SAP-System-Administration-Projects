import express from 'express';

import { taskController } from '../controllers';
import { checkAuthLogged } from '../services';

// set router
const taskRouter = express.Router();

// routes
taskRouter.route('/').post(checkAuthLogged, taskController.newTask);

taskRouter
  .route('/:taskId')
  .get(checkAuthLogged, taskController.getOneTask)
  .put(checkAuthLogged, taskController.updateTask)
  .delete(checkAuthLogged, taskController.deleteTask);

export default taskRouter;
