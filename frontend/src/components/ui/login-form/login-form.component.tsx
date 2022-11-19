import { FC, Fragment } from 'react';

import { Formik } from 'formik';

import { Alert } from '../alert';
import { Button } from '../button';
import { FormInput } from '../form-input';
import { YupLogin } from '../../../assets';
import { LoginFormInitialState } from '../../../interfaces';
import { ReactComponent as GoogleSVG } from '../../../img/google-icon.svg';

import { FormContainer, FormInputs, InputContainer, ButtonsContainer, OrOption } from './login-form.styled';

const INITIAL_VALUES: LoginFormInitialState = {
  email: '',
  password: '',
};

export const LoginForm: FC = () => {
  const handleSubmit = (values: LoginFormInitialState) => {
    console.log(values);
    console.log('enviando');
  };

  const signInGoogle = () => {
    console.log('Iniciando con google');
  };

  return (
    <Fragment>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={YupLogin}
      >
        {({ errors, touched, values }) => {
          return (
            <FormContainer>
              <FormInputs>
                <InputContainer>
                  <FormInput
                    label='email'
                    inputOptions={{
                      required: true,
                      type: 'email',
                      name: 'email',
                      value: values.email,
                    }}
                  />
                  {errors.email && touched.email ? <Alert>{errors.email}</Alert> : null}
                </InputContainer>

                <InputContainer>
                  <FormInput
                    label='password'
                    inputOptions={{
                      required: true,
                      type: 'password',
                      name: 'password',
                      value: values.password,
                    }}
                  />

                  {errors.password && touched.password ? <Alert>{errors.password}</Alert> : null}
                </InputContainer>
              </FormInputs>

              <ButtonsContainer>
                <Button
                  buttonOptions={{
                    type: 'submit',
                  }}
                >
                  Sign in with email
                </Button>

                <OrOption>Or</OrOption>

                <Button
                  buttonType='google'
                  buttonOptions={{
                    type: 'button',
                    onClick: signInGoogle,
                  }}
                >
                  <GoogleSVG />
                  Sign in with Google
                </Button>
              </ButtonsContainer>
            </FormContainer>
          );
        }}
      </Formik>
    </Fragment>
  );
};
