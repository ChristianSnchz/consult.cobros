import styled from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';

export const Title = styled.h1<{ isMobile: boolean }>`
  font-size: ${props => (!props.isMobile ? '1.5rem' : '1.25rem')};
  margin-bottom: 0.875rem;
  height: 34px;
  letter-spacing: 0;
  color: ${theme.color.darkgrey};
  font-family: ${theme.obpUI.fontSantanderHeadlineRegular};
`;
export const ContainerTitle = styled.h3<{ isMobile: boolean }>`
  font-family: ${theme.obpUI.fontSantanderHeadlineRegular};
  color: ${theme.color.darkgrey};
  font-size: 1.5rem;
  margin: ${({ isMobile }) => (isMobile ? '0' : '0 0.8125')}rem;
  text-align: left;
  letter-spacing: 0;
  line-height: 1.33;
  margin-bottom: ${props => (props.isMobile ? '1.125rem' : '1rem')};
  margin-top: ${props => (props.isMobile ? '2rem' : '0')};
`;
export const MobileContainerTitle = styled.h4`
  font-family: ${theme.obpUI.fontSantanderHeadlineRegular};
  color: ${theme.color.darkgrey};
  font-size: 1.25rem;
  height: 29px;
  letter-spacing: 0px;
  width: 100%;
  margin: 0.75rem 0;
  text-align: left;
`;
export const ContainerP = styled.h5<{ isMobile: boolean }>`
  font-family: ${theme.obpUI.fontSantanderMicroText};
  text-align: left;
  color: ${theme.color.darkgrey};
  font-size: ${({ isMobile }) => (isMobile ? '1' : '0.875')}rem;
  height: 19px;
  letter-spacing: 0;
  margin: ${({ isMobile }) => (isMobile ? '0' : '0 0.8125')}rem;
  line-height: 1.33;
  margin-top: 0px;
  margin-bottom: ${props => (props.isMobile ? '2rem' : '0.5rem')};
`;
