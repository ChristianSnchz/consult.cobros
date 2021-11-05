import styled from 'styled-components';

export const FileContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  min-width: 300px;
  width: 45%;
  @media (max-width: 1100px) {
    width: 30%;
  }
  ${props => props.isMobile && 'width: 60%; margin-top: 1rem;'}
`;

export const DateContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  border-radius: 4px 4px 0px 0px;
  margin: 0px 8px;

  ${props =>
    props.isMobile &&
    `
    width: 100%;   
   `}
`;

// NOT MOBILE
export const FiltersContainer = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: flex;
  margin-top: 3px;
  align-items: center;
  justify-content: ${props => (props.isMobile ? 'center' : 'space-between')};
  flex-flow: row wrap;
`;
export const FieldContainer = styled.div<{ width: string; isMobile: boolean }>`
  width: ${({ width }) => width || '250'}px;
  margin: ${({ isMobile }) => (isMobile ? '0.875rem 0rem' : '0.875rem')};
  flex-grow: 1;
  flex-shrink: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;
export const ActionsContainer = styled.div<{ isMobile }>`
  button {
    font-size: 0.875rem !important;
    height: 40px;
    min-height: 40px;
  }
  .pub-debt-btn-apply {
    width: ${props => (props.isMobile ? '100%' : '168px')};
    ${props => (props.isMobile ? 'margin-top: 2rem;' : '')};
  }
  .pub-debt-btn-no-border {
    ${prev => (prev.isMobile ? 'width: 100%;' : '')}
    border: none;
    color: rgb(37, 127, 164);
    background-color: transparent;
    padding: 0;
    &:hover {
      color: rgb(37, 127, 164);
    }
  }
  display: flex;
  justify-content: flex-end;
  width: 140px;
  margin: ${({ isMobile }) => (isMobile ? '0.8125rem 0rem' : '0.8125rem')};
  flex-grow: 1;
  flex-shrink: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;
