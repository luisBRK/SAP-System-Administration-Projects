import { User } from '../models';

import { userI } from '../interfaces/project';
import { serviceInterface, signupUserI } from '../interfaces/system';

import { tokenGenerator } from './token-generator.service';

export async function signup(userData: userI): Promise<serviceInterface<signupUserI>> {
  try {
    const { email } = userData;
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return { error: 'EMAIL_TAKEN', status: 400 };
    }

    // save user
    const newUser = new User(userData);

    newUser.token = await tokenGenerator();
    const savedUser = await newUser.save();

    if (savedUser) {
      const msg = 'Registered complete, check your email to confirm your account';
      return { status: 201, result: { email: savedUser.email, message: msg } };
    } else {
      return { status: 400, error: 'REGISTRATION_ERROR' };
    }
  } catch (error) {
    throw error;
  }
}
