import styled, { keyframes } from 'styled-components';

const offset = 187;
const duration = '1.4s';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const rotate = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(270deg); 
  }
`;
const dash = keyframes`
  0% { stroke-dashoffset: ${offset}; }
  50% {
    stroke-dashoffset: ${offset / 4};
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${offset};
    transform: rotate(450deg);
  }
`;
export const StyledSpinner = styled.svg<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${rotate} ${duration} linear infinite;
`;
export const SpinnerCircle = styled.circle<{ color: string }>`
  stroke-dasharray: ${offset};
  stroke-dashoffset: 0;
  fill: none;
  stroke-linecap: round;
  cx: 33;
  cy: 33;
  r: 30;
  stroke-width: 4;
  stroke: ${props => props.color};
  transform-origin: center;
  animation: ${dash} ${duration} ease-in-out infinite;
`;
export const SpinnerContainer = styled.div<{ zIndex: number }>`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${props => props.zIndex};
  background-color: rgba(255, 255, 255, 0.6);
  animation: ${fadeIn} ${duration} forward;
`;
export const SpinnerText = styled.div`
  font-size: 1rem;
  font-family: SantanderMicroText;
  color: rgb(30, 31, 33);
  margin-top: 1rem;
`;
