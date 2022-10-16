import express from 'express';

import { projectController } from '../controllers';
import { checkAuthLogged } from '../services';

// set router
const projectRouter = express.Router();

// routes
projectRouter
  .route('/')
  .get(checkAuthLogged, projectController.getAllProjects)
  .post(checkAuthLogged, projectController.newProject);

projectRouter
  .route('/:projectId')
  .get(checkAuthLogged, projectController.getOneProject)
  .put(checkAuthLogged, projectController.editProject)
  .delete(checkAuthLogged, projectController.deleteProject);

export default projectRouter;
