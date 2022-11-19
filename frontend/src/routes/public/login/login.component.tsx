import { FC } from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from '../../../components/ui';

import { LoginBox, LinksContainer } from './login.styles';

export const Login: FC = () => {
  return (
    <LoginBox>
      <h2>Login, and manage your projects</h2>

      <LoginForm />

      <LinksContainer>
        <Link to={'forgot-password'}>Forgot your password?</Link>

        <span>
          Dont have an account? {''}
          <Link to={'forgot-password'}>Create one</Link>
        </span>
      </LinksContainer>
    </LoginBox>
  );
};
