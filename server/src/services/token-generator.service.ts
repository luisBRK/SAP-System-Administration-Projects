import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const tokenGenerator = () => {
  const random = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);

  return random + date;
};

export const jWTGenerator = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};
