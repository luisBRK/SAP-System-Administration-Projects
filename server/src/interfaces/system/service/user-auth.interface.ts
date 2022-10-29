import { userI } from '../../project';

export interface signupUserI {
  email: string;
  message: string;
}

export interface loginUserI {
  dataUser: Partial<userI>;
}
