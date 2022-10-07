import { Request, Response } from 'express';
import { authService } from '../services';
import { sendResponse } from '../utils';

const signup = async (req: Request, res: Response) => {
  try {
    const response = await authService.signup(req.body);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

export { signup };
