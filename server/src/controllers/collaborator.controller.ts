import { Response } from 'express';
import { customReq } from '../interfaces/system';
import { sendResponse } from '../utils';

import { collaboratorService } from '../services';
import { userI } from '../interfaces/project';

export const searchCollaborator = async (req: customReq, res: Response) => {
  try {
    const response = await collaboratorService.searchCollaborator(req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const addCollaborator = async (req: customReq, res: Response) => {
  try {
    const response = await collaboratorService.addCollaborator(req.params.projectId, req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCollaborator = async (req: customReq, res: Response) => {
  const response = await collaboratorService.deleteCollaborator(req.params.projectId, req.body, req.user as userI);
  sendResponse({ res, response });
};
