import { userI } from '../../project';

export interface signupUserI {
  email: string;
  message: string;
}

export interface loginUserI {
  dataUser: Partial<userI>;
}

export interface confirmUserI {
  message: string;
}

export interface recoverPasswordI {
  message: string;
}

export interface checkTokenI {
  message: string;
}

export interface newPasswordI {
  message: string;
}
