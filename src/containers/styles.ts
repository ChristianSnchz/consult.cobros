import styled from 'styled-components';

export const StyledPageHeader = styled.div<{ isHome: boolean }>`
  background: linear-gradient(-225deg, rgb(29, 37, 45) 0%, rgba(29, 37, 45, 1) 100%);
  box-sizing: border-box;
  color: rgba(255, 255, 255, 1);
  font-family: SantanderMicroText, Open Sans, sans-serif;
  // min-height: 10rem;
  height: ${props => (!props.isHome ? '74px' : '0')};
  // padding-top: 1.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  width: 100%;
  h1 {
    max-width: 1260px;
    margin: 0 auto;
    font-family: SantanderHeadline-Regular, Open Sans, sans-serif;
    font-size: 2rem;
    font-weight: normal;
    width: calc(88% + 5rem);
    line-height: 1.125;
    margin-bottom: 1rem;
    margin-top: 0;
    color: #ffffff;
  }
`;
export const PageContainer = styled.div<{ isMobile: boolean }>`
  background: ${props => (props.isMobile ? '#f6f6f6' : '#ffffff')};
  border-radius: 0.5rem;
  height: ${props => (props.isMobile ? 'calc(100vh - 34px)' : 'auto')};
  box-shadow: 0 1rem 2rem -0.75rem rgb(0 0 0 / 16%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${props => (!props.isMobile ? '-2.5rem auto 2.5rem auto' : '-2.5rem auto 0 auto')};
  min-height: 32rem;
  padding: 40px;
  position: relative;
  transition: margin 100ms;
  width: 88%;
  max-width: 1260px;
  @media (max-width: 576px) {
    width: 100%;
    padding: 0.8rem 1rem;
  }
`;
export const DefaultLayout = styled.div<{ isMobile }>`
  min-height: ${props => (props.isMobile ? 'calc(100vh-174px)' : 'calc(100vh - 138px)')};
  width: 100%;
  background-color: #f6f6f6;
`;
