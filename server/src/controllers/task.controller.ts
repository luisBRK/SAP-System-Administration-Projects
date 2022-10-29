import { Response } from 'express';
import { userI } from '../interfaces/project';
import { customReq } from '../interfaces/system';
import { taskService } from '../services';
import { sendResponse } from '../utils/send-response.util';

export const newTask = async (req: customReq, res: Response) => {
  try {
    const response = await taskService.newTask(req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTask = async (req: customReq, res: Response) => {
  try {
    const response = await taskService.getOneTask(req.params.taskId, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req: customReq, res: Response) => {
  try {
    const response = await taskService.updateTask(req.params.taskId, req.body, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req: customReq, res: Response) => {
  try {
    const response = await taskService.deleteTask(req.params.taskId, req.user as userI);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};
