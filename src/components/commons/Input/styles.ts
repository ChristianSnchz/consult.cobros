import styled from 'styled-components';

const getBorderColor = (disabled, hasError) => {
  if (disabled) {
    return 'rgb(118, 118, 118)';
  }
  if (hasError) {
    return 'rgb(236, 0, 0)';
  }
  return 'rgb(181, 181, 181)';
};

export default styled.input`
  width: 100%;
  height: 48px;
  border-radius: 4px 4px 0px 0px;
  position: relative;
  box-sizing: border-box;
  padding: 0.8125rem 1rem;
  transition: all 250ms ease-in-out;
  outline: none;
  font-family: SantanderMicroText;
  color: rgb(143, 143, 143);
  font-size: 1rem;
  letter-spacing: 0px;
  border: ${({ disabled, hasError }) => `1px solid ${getBorderColor(disabled, hasError)}`};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  &:focus {
    border: 1px solid rgba(37, 127, 164, 1);
  }
`;

export const InputContainer = styled.div<{ disabled: boolean; placeholder: string; hasValue: boolean; width: string }>`
  background-color: ${({ disabled }) => (disabled ? '#dadada' : '#ffffff')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
  max-width: 100%;
  cursor: text;
  width: ${({ width }) => width || '100%'};
  position: relative;
  border-radius: 4px 4px 0 0;
  &::before {
    position: absolute;
    content: ' ';
    height: 2px;
    width: 100%;
    background: rgba(37, 127, 164, 1);
    bottom: 0;
    left: 0;
    transition: transform 150ms ease-in-out;
    transform: scaleX(0);
    background-position: center;
    z-index: 2;
  }
  &:focus-within::before {
    transition: transform 150ms ease-in-out;
    transform: scaleX(1);
  }
  &::after {
    content: '${({ placeholder }) => placeholder}';
    position: absolute;
    left: 17px;
    top: 13px;
    font-family: SantanderMicroText;
    color: rgb(143, 143, 143);
    font-size: 1rem;
    letter-spacing: 0px;
    transition: transform 150ms ease-in-out;
    transform: ${({ hasValue }) => (hasValue ? 'translate(-13%, -12px) scale(0.75)' : '')};
  }
  &:focus-within::after {
    transition: transform 150ms ease-in-out;
    transform: translate(-13%, -12px) scale(0.75);
  }
  &:focus-within {
    input {
      padding: 1.1875rem 1rem 0.4375rem 1rem;
    }
  }
  input {
    padding: ${({ hasValue }) => (hasValue ? '1.1875rem 1rem 0.4375rem 1rem' : '0.8125rem 1rem')};
  }
`;
