import { User } from '../models';
import { signupEmail, recoverPasswordEmail } from './smtp.service';
import { tokenGenerator, jWTGenerator } from './token-generator.service';
import { userI } from '../interfaces/project';
import { serviceInterface, signupUserI, loginUserI, getMessageI } from '../interfaces/system';

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

    if (!savedUser) {
      return { status: 400, error: 'REGISTRATION_ERROR' };
    }

    signupEmail({
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      token: newUser.token,
    } as userI);

    const msg = 'Registered complete, check your email to confirm your account';
    return { status: 201, result: { email: savedUser.email, message: msg } };
  } catch (error) {
    throw error;
  }
}

export async function login(email: string, password: string): Promise<serviceInterface<loginUserI>> {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return { status: 400, error: 'EMAIL_PASSOWRD_ERROR' };
    }

    if (!user.confirmed) {
      return { status: 400, error: 'EMAIL_NOT_CONFIRMED' };
    }

    if (!(await user.checkPassword(password))) {
      return { status: 400, error: 'EMAIL_PASSOWRD_ERROR' };
    }

    const userData = {
      _id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      jwtoken: jWTGenerator(user._id.toString()),
    };

    return { status: 200, result: { dataUser: userData } };
  } catch (error) {
    return { status: 400, error: 'SERVER_CONFLICT_ERROR' };
    throw error;
  }
}

export async function confirmUser(token: string): Promise<serviceInterface<getMessageI>> {
  try {
    const userToConfirm = await User.findOne({ token: token });

    if (!userToConfirm) {
      return { status: 400, error: 'INVALID_TOKEN' };
    }

    userToConfirm.confirmed = true;
    userToConfirm.token = '';
    await userToConfirm.save();

    const message = 'User confirmed successfully';
    return { status: 200, result: { message: message } };
  } catch (error) {
    throw error;
  }
}

export async function recoverPassword(email: string): Promise<serviceInterface<getMessageI>> {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return { status: 400, error: 'EMAIL_NOT_EXIST' };
    }
    user.token = tokenGenerator();

    await user.save();

    recoverPasswordEmail({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: user.token,
    } as userI);

    const message = 'We have sent an email with the instructions, check your inbox';
    return { status: 200, result: { message: message } };
  } catch (error) {
    throw error;
  }
}

export async function checkToken(token: string): Promise<serviceInterface<getMessageI>> {
  try {
    const validUserToken = await User.findOne({ token: token });

    if (!validUserToken) {
      return { status: 400, error: 'INVALID_TOKEN' };
    }

    const message = 'Token valid';
    return { status: 202, result: { message: message } };
  } catch (error) {
    throw error;
  }
}

export async function newPassword(token: string, password: string): Promise<serviceInterface<getMessageI>> {
  try {
    const validUserToken = await User.findOne({ token: token });

    if (!validUserToken) {
      return { status: 400, error: 'INVALID_TOKEN' };
    }

    validUserToken.token = '';
    validUserToken.password = password;

    validUserToken.save();

    const message = 'Your password has changed successfully';
    return { status: 200, result: { message: message } };
  } catch (error) {
    throw error;
  }
}
