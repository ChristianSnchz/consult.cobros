/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import styled, { keyframes } from 'styled-components';
import { IOption } from './interfaces';

const getBorderColor = (disabled, hasError, isOpen) =>
  (isOpen && 'rgba(37,127,164,1)') ||
  (disabled && 'rgb(118, 118, 118') ||
  (hasError && 'rgb(236, 0, 0)') ||
  'rgb(181, 181, 181)';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const Dropdown = styled.div<{ disabled: boolean; isOpen: boolean; width: number; hasError: boolean }>`
  background-color: ${({ disabled }) => (disabled ? 'rgb(218, 218, 218)' : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
  border: 1px solid ${({ disabled, isOpen, hasError }) => getBorderColor(disabled, hasError, isOpen)};
  max-width: 100%;
  width: ${({ width }) => width || ''}px;
  min-width: 165px;
  justify-content: space-between;
  height: 46px;
  border-radius: 4px 4px 0px 0px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  &::before {
    position: absolute;
    content: ' ';
    height: 2px;
    width: 100%;
    background: rgba(37, 127, 164, 1);
    bottom: -1px;
    left: 0;
    transition: transform 150ms ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? 'scaleX(1)' : 'scaleX(0)')};
    background-position: center;
  }
  input {
    background-color: ${({ disabled }) => (disabled ? 'rgb(218, 218, 218)' : '')};
  }
`;
export const InputContainer = styled.div<{ placeholder: string; hasValue: boolean }>`
  width: calc(100% - 60px);
  cursor: text;
  &::after {
    content: '${({ placeholder }) => placeholder}';
    position: absolute;
    left: 17px;
    top: 12px;
    font-family: SantanderMicroText;
    color: rgb(143, 143, 143);
    font-size: 1rem;
    letter-spacing: 0px;
    transition: transform 150ms ease-in-out;
    transform: ${({ hasValue }) => (hasValue ? 'translate(-13%,-12px) scale(0.75)' : '')};
  }

  input {
    padding: ${({ hasValue }) => (hasValue ? '1.1875rem 1rem 0.4375rem 1rem' : '0.8125rem 1rem')};
  }
`;
export const DropdownInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 0.8125rem 1rem;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;
  font-size: 1rem;
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  color: rgb(143, 143, 143);
  outline: none;
  border: none;
  letter-spacing: 0px;
  pointer-events: none;
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const IconsContainer = styled.div`
  cursor: pointer;
  height: 100%;
  align-items: center;
  width: 60px;
  display: flex;
  justify-content: center;
  padding: 0.8125rem 0;
`;
export const ArrowDown = styled.div<{ isOpen: boolean }>`
  width: 8px;
  height: 8px;
  margin-top: ${({ isOpen }) => (isOpen ? '5px' : '-5px')};
  border-left: 2px solid ${({ isOpen }) => (isOpen ? 'rgba(37,127,164,1)' : '#656565')};
  border-bottom: 2px solid ${({ isOpen }) => (isOpen ? 'rgba(37,127,164,1)' : '#656565')};
  transform: ${({ isOpen }) => (!isOpen ? 'rotate(-45deg)' : 'rotate(135deg)')};
  transition: all 250ms ease;
  cursor: pointer;
`;
export const OptionsMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'initial' : 'none')};
  width: calc(100% + 4px);
  animation: ${fadeIn} 500ms forwards;
  position: absolute;
  z-index: 5;
  background-color: #ffffff;
  top: 3.1rem;
  left: -1px;
  max-height: 192px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: 0.1rem solid rgb(243 243 243);

  box-shadow: 0px 16px 24px -8px rgb(232 230 230 / 86%);
`;
export const List = styled.ul`
  margin: 0;
  padding: 0;
`;
export const Item = styled.li<{ selected: IOption }>`
  cursor: pointer;
  padding: 0.625rem;
  margin: 0.2rem;
  list-style: none;
  border-radius: 4px;
  color: ${({ selected }) => (selected ? '#ffffff' : 'rgb(34, 34, 34)')};
  font-family: SantanderMicroText;
  font-size: 1rem;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${({ selected }) => (selected ? 'rgba(37,127,164,0.5)' : '')};
  &:hover {
    background-color: rgba(37, 127, 164, 1);
    color: #ffffff;
  }
`;
export const CloseCross = styled.div`
  height: 100%;
  width: 25px;
  display: flex;
  align-items: center;
  &::before,
  &::after {
    top: 23.5px;
    box-sizing: border-box;
    position: absolute;
    content: ' ';
    display: block;
    border-top: 2px solid #656565;
  }
  &::before {
    width: 14.4px;
    transform: rotate(-45deg);
  }
  &::after {
    width: 14px;
    transform: rotate(45deg);
  }
`;
export const ArrowContainer = styled.div<{ hasValue: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: ${({ hasValue }) => (hasValue ? 'flex-start' : 'center')};
  width: ${({ hasValue }) => (hasValue ? '25px' : '100%')};
`;
