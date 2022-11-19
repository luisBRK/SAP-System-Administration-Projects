import { FC, MouseEventHandler } from 'react';

import { BaseButton, GoogleButton } from './button.styles';

interface Props {
  children: React.ReactNode;
  buttonType?: 'base' | 'google';
  buttonOptions: {
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
}

interface buttons {
  base: string;
  google: string;
}

const BUTTON_TYPES_CLASSES: buttons = {
  base: 'base',
  google: 'google',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => {
  return {
    [BUTTON_TYPES_CLASSES.base]: BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleButton,
  }[buttonType];
};

export const Button: FC<Props> = ({ children, buttonType, buttonOptions }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...buttonOptions}>{children}</CustomButton>;
};
