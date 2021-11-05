import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import StyledInput, { InputContainer } from './styles';
import FieldMessage, { IFieldMessage, textType } from '../FieldMessage';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  message?: IFieldMessage;
  'data-testid'?: string;
}
const Input: FC<InputProps> = props => {
  const [hasValue, setHasValue] = useState(false);
  useEffect(() => {
    setHasValue(!!props?.value);
  }, [props.value]);
  return (
    <InputContainer
      data-testid="input-container"
      hasValue={hasValue}
      width={props.width}
      disabled={props.disabled}
      placeholder={props.placeholder}
    >
      <StyledInput
        {...props}
        hasError={props.message?.type === textType.ERROR}
        onChange={ev => {
          props.onChange(ev);
          setHasValue(!!ev.target.value);
        }}
        hasValue={hasValue}
        placeholder={hasValue ? props.placeholder : ''}
      />
      {props.message && !props.disabled && <FieldMessage {...props.message} />}
    </InputContainer>
  );
};

export default Input;
