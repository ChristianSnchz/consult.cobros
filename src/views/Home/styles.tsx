import styled from 'styled-components';

export const CardContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  width: ${({ isMobile }) => (isMobile ? '100%' : '88%')};
  max-width: 1260px;
  margin: 0 auto;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-flow: row wrap;
  height: 100%;
  padding: 1rem;
  font-family: SantanderMicroText;
  h1 {
    padding: 0 0.625rem;
    flex-basis: 100%;
  }
  @media (max-width: 992px) {
    justify-content: space-around;
    h1 {
      width: 88%;
      text-align: center;
    }
  }
`;
export const CardTitle = styled.p`
  margin: 0;
  margin-top: 0.75rem;
  color: rgb(34, 34, 34);
  font-family: SantanderHeadline-Bold;
  font-size: 1.25rem;
  font-weight: bold;
  height: 29px;
  letter-spacing: 0px;
  text-align: center;
`;
export const CardDescription = styled.p`
  margin: 0;
  margin-top: 1rem;
  color: rgb(34, 34, 34);
  font-family: SantanderMicroText;
  font-size: 1rem;
  height: 44px;
  letter-spacing: 0px;
  text-align: center;
  width: 232px;
`;
export const MenuCard = styled.button<{ disabled: boolean; isMobile: boolean }>`
  margin: ${({ isMobile }) => (isMobile ? '0.625rem 0rem' : '0.625rem')};
  padding: 1.5rem 1rem;
  margin-right: ${({ isMobile }) => (isMobile ? '0' : '1')}rem;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${({ disabled }) => !disabled && 'rgb(255, 255, 255)'};
  border-radius: 8px;
  flex-shrink: 1;
  width: 250px;
  font-size: 1rem;
  height: 176px;
  max-height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: SantanderMicroText;
  &:focus {
    outline: none;
    transform: scale(1.05);
  }
  &:hover {
    box-shadow: 0px 8px 24px -4px rgb(218, 218, 218, 0.45);
  }
  transition: all ease-in-out 250ms;
  @media (max-width: 580px) {
    flex-basis: 100%;
  }
  pointer-events: ${({ disabled }) => disabled && 'none'};

  text-align: left;
  opacity: ${({ disabled }) => (disabled ? '0.3' : '1')};
  overflow: hidden;
  box-shadow: 0px 8px 24px -4px rgb(218, 218, 218);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  span:first-of-type {
    font-weight: 700;
  }
`;
