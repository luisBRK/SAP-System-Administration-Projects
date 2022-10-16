import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import { customReq, jwtDecodeI } from '../interfaces/system';
import { userI } from '../interfaces/project';

import dotenv from 'dotenv';
dotenv.config();

export const checkAuthLogged = async (req: customReq, res: Response, next: NextFunction) => {
  let jsonWebToken;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      jsonWebToken = req.headers.authorization.split(' ')[1];

      const decoded: jwtDecodeI = jwt.verify(jsonWebToken, process.env.JWT_SECRET as string) as jwtDecodeI;

      const userData = (await User.findById(decoded.id).select(
        '-password -confirmed -token -createdAt -updatedAt -__v'
      )) as userI;

      req.user = userData;
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized, unauthenticated user' });
    }
  }

  if (!jsonWebToken) {
    const error = new Error('Invalid Token');
    res.status(400).json({ message: error.message });
  }

  return next();
};
