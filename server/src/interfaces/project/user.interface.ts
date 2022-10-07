import { ObjectId } from 'mongoose';

export interface userI {
  _id: ObjectId;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: number;
  token: string;
  confirmed: boolean;
  direction: string;
}

export interface userMethodsI {
  checkPassword(formPassword: string): Promise<boolean>;
}
