import React, { FC } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line no-shadow
export enum textType {
  HELP = 'help',
  ERROR = 'error'
}

export const FieldMessageWrapper = styled('div')<{ type: textType }>`
  font-family: 'SantanderMicrotext';
  font-size: 0.875rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: 100;
  line-height: 1.75;
  letter-spacing: 0.09px;
  border: 2px solid rgb(187, 186, 186);
  color: ${({ type }) => (type === textType.ERROR ? '#ec0000' : '#444')};
  background-color: inherit;
  font-weight: 200;
  border: 0;
  outline: 0;
  position: absolute;
  user-select: none;
  width: 97.5%;
  height: 25px;
  top: 105%;

  padding-left: 10px;
  order: 3;
  text-align: start;
  padding-left: 10px;
`;

export interface IFieldMessage {
  text: string;
  type?: textType;
}

const FieldMessage: FC<IFieldMessage> = ({ text, type = 'help' }) => (
  <FieldMessageWrapper type={type}>{text}</FieldMessageWrapper>
);
export default FieldMessage;
