import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthLayoutContainer, ImageAuth, AuthContent, HeaderContent, BodyContent } from './auth.styles';

import authBackground from '../../img/auth-background-01.jpg';

interface Props {
  // children: JSX.Element | Array<JSX.Element>;
}

export const AuthLayout: FC<Props> = () => {
  return (
    <Fragment>
      <AuthLayoutContainer>
        <ImageAuth src={authBackground} alt='side auth' />

        <AuthContent>
          <HeaderContent>
            <h1>SAP</h1>
            <span>System Administration Projects</span>
          </HeaderContent>

          <BodyContent>
            <Outlet />
          </BodyContent>
        </AuthContent>
      </AuthLayoutContainer>
    </Fragment>
  );
};
