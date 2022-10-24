import express from 'express';

import { taskController } from '../controllers';
import { checkAuthLogged } from '../services';

// set router
const taskRouter = express.Router();

// routes
taskRouter.post('/', checkAuthLogged, taskController.newTask);

taskRouter
  .route('/:taskId')
  .get(checkAuthLogged, taskController.getTask)
  .post(checkAuthLogged, taskController.updateTask)
  .delete(checkAuthLogged, taskController.delete);

taskRouter.post('/state/:taskId', taskController.changeTaskState);

export default taskRouter;
