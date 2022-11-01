import { FC, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import './auth.styles.scss';

import authBackground from '../../img/auth-background-01.jpg';

interface Props {
  // children: JSX.Element | Array<JSX.Element>;
}

export const AuthLayout: FC<Props> = () => {
  return (
    <Fragment>
      <div className='auth-layout-container'>
        <img className='image-auth' src={authBackground} alt='side auth' />

        <div className='auth-content'>
          <div className='auth-content__header'>
            <h1>SAP</h1>
            <span>System Administration Projects</span>
          </div>

          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};
