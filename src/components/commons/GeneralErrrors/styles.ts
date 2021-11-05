import styled from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';

export const ErrorsContainer = styled.div`
  width: 100%;
  height: 24rem;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 2rem;
  }
  span {
    margin-bottom: 1rem;
    color: ${theme.color.santanderred};
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 1.75rem;
  font-family: ${theme.obpUI.fontSantanderHeadlineRegular};
  color: ${theme.color.darkgrey};
  margin: 0 0 0.875rem 0;
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  max-width: 576px;
  letter-spacing: 0;
  text-align: center;
  margin: 0;
  color: ${theme.color.mediumgrey};
  font-family: ${theme.obpUI.fontSantanderMicroText};
`;
