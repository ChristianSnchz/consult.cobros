import styled, { css } from 'styled-components';

export const TextFieldWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -19px;
`;

export const DivTooltip = styled.div`
  position: absolute;
  top: 36px;
  right: 20px;
`;

export const Label = styled('label')<{ up: boolean }>`
  color: rgb(143, 143, 143);
  font-family: SantanderMicroText;
  font-size: 1rem;
  letter-spacing: 0px;
  font-weight: normal;
  order: 1;
  padding-left: 2px;
  pointer-events: none;
  text-shadow: none;
  width: 90%;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: initial;
  transform: scale(1) translate3d(0.75rem, 60%, 0);
  transition: 200ms ease all;
  text-align: start;
  margin: 0;

  ${props =>
    props.up &&
    css`
      color: rgb(118, 118, 118);
      transform: scale(0.75) translate3d(-0.5rem, 0.225rem, 0);
    `}
`;
