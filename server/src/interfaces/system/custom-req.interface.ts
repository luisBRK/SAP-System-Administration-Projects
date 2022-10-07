import { userI } from '../project';
import { Request } from 'express';

export interface customReq extends Request {
  user?: userI;
}
