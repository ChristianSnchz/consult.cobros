import styled, { css } from 'styled-components';

export const WrapperIcon = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0.875rem 1.125rem;
  display: flex;
  align-items: center;
  flex-grow: 2;
  background-color: white;
  justify-content: center;
  flex-shrink: 2;
`;
export const WrapperRange = styled.div<{ hasError: boolean }>`
  display: flex;
  flex-direction: column;
  width: max-content;
  max-width: 326px;
  min-width: 262px;
  width: 100%;
  border: 1px solid ${({ hasError }) => (hasError ? 'rgb(236, 0, 0)' : 'rgb(181, 181, 181)')};
  border-radius: 4px 4px 0 0;
  position: relative;
  height: 3rem;
  @media (max-width: 767px) {
    max-width: 100%;
  }
`;
export const WrapperInputDropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  flex-grow: 5;
  flex-shrink: 5;
  &::before {
    position: absolute;
    content: ' ';
    height: 2px;
    width: 100%;
    background: #222222;
    bottom: -1px;
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
`;
export const WrapperInputRange = styled.div`
  display: flex;
  flex-direction: row;
`;
export const RangeDivision = styled.div`
  border-left: 1px solid rgb(181, 181, 181);
  margin: 0.75rem 0;
  pointer-events: none;
`;
export const WrapperRelative = styled.div`
  position: relative;
  width: 100%;
  border-radius: 0.3rem;
  display: flex;
  flex-flow: row wrap;
`;

export const StyledCalendarWrapper = styled('div')<{ isOpen: boolean }>`
  position: absolute;
  min-width: 265px;
  width: max-content;
  text-align: end;
  display: inline-block;
  will-change: transform;
  top: 1.5rem;
  left: 6px;
  z-index: -1;
  opacity: 0;
  transition: all 150ms ease-in-out;
  transform: scale(1) translate3d(150px, -1px, 0);
  transform: scaleX(1.5);

  ${props =>
    props.isOpen &&
    css`
      opacity: 1;
      z-index: 5;
      transform: scale(1) translate3d(-6px, 35px, 0);
    `}
`;

export const InputCustom = styled('input')<{ isSince: boolean; isUntil: boolean }>`
  outline: none;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  text-shadow: none;
  font-size: 1rem;
  width: 100%;
  letter-spacing: 0;
  font-family: SantanderMicroText;
  padding: 20px 0 5px 10px;
  border-radius: ${({ isSince, isUntil }) =>
    (isSince && '4px 0px 0px 0px') || (isUntil && '0px 4px 0px 0px') || '4px 4px 0px 0px'};
  border: none;
  color: #444;
  flex: 1 1 auto;
  order: 2;
`;
