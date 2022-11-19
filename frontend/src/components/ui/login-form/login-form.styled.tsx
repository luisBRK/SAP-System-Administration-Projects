import styled from 'styled-components';
import { Form } from 'formik';

// export const FormikContainer = styled(Formik)`
//   display: flex;
// `;
export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const OrOption = styled.p`
  width: 90%;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 45%;
    height: 1px;
    background-color: #a3a3a3;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    // transform: translate();
    left: 0;
  }
  &::after {
    right: 0;
  }
`;
