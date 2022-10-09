import { Request, Response } from 'express';
import { authService } from '../services';
import { sendResponse } from '../utils';

export const signup = async (req: Request, res: Response) => {
  try {
    const response = await authService.signup(req.body);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const response = await authService.login(req.body.email, req.body.password);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  try {
    const response = await authService.confirmUser(req.params.token);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const response = await authService.recoverPassword(req.body.email);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = async (req: Request, res: Response) => {
  try {
    const response = await authService.checkToken(req.params.token);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export const newPassword = async (req: Request, res: Response) => {
  try {
    const response = await authService.newPassword(req.params.token, req.body.password);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};
