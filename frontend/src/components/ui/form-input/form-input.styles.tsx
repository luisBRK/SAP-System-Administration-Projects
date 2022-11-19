import styled, { css } from 'styled-components';

import { Field } from 'formik';

type InputLabelCustom = {
  shrink?: number;
};

const subColor = '#6b7280';
const mainColor = '#000000';

const shrinkLabelStyles = css`
  top: -12px;
  font-size: 12px;
  font-weight: 500;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label<InputLabelCustom>`
  color: ${subColor};
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

export const Input = styled(Field)`
  background: none;
  /* background-color: white; */
  color: ${subColor};
  font-size: 14px;
  padding: 10px 10px 3px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  // margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles}
  }
`;

export const Group = styled.div`
  position: relative;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;
