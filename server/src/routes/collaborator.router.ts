import express from 'express';

import { checkAuthLogged } from '../services';
import { collaboratorController } from '../controllers';

// set router
const collaboratorRouter = express.Router();

// routes
collaboratorRouter.route('/').post(checkAuthLogged, collaboratorController.searchCollaborator);
collaboratorRouter.route('/:projectId').post(checkAuthLogged, collaboratorController.addCollaborator);
collaboratorRouter.route('/delete/:projectId').post(checkAuthLogged, collaboratorController.deleteCollaborator);

export default collaboratorRouter;
