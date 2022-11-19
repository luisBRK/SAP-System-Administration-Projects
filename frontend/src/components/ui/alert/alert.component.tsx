import { FC } from 'react';

import './alert.styles.scss';

interface Props {
  children: string;
}

export const Alert: FC<Props> = ({ children }) => {
  return <p className='alert'>{children}</p>;
};
