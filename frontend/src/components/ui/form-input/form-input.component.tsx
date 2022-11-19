import { FC } from 'react';

import { FormInputLabel, Input, Group } from './form-input.styles';

interface Props {
  label: string;
  inputOptions: {
    required: boolean;
    type: string;
    name: string;
    value: string;
  };
}

export const FormInput: FC<Props> = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} className='input' />

      {label && (
        <FormInputLabel className='input-label' shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
