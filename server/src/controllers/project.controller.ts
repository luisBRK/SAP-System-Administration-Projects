import { Response } from 'express';
import { customReq } from '../interfaces/system';
import { userI } from '../interfaces/project';
import { projectService } from '../services';
import { sendResponse } from '../utils';

export const newProject = async (req: customReq, res: Response) => {
  try {
    const response = await projectService.newProject(req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjects = async (req: customReq, res: Response) => {
  try {
    const response = await projectService.getAllProjects(req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const getOneProject = async (req: customReq, res: Response) => {
  try {
    const response = await projectService.getOneProject(req.params.projectId, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const editProject = async (req: customReq, res: Response) => {
  try {
    const response = await projectService.editProject(req.params.projectId, req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req: customReq, res: Response) => {
  try {
    const response = await projectService.deleteProject(req.params.projectId, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};
