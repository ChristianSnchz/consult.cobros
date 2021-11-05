import styled from 'styled-components';

export const WrapperCard = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 0px 8px 12px -4px rgb(218, 218, 218);
  border-radius: 8px;
  width: 100%;
  margin-bottom: 1rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 1rem;
  position: relative;
`;

export const CardInformationContainer = styled.div<{ width: string }>`
  max-width: 100%;
  width: ${({ width }) => width || '90%'};
`;
export const CardMoreInformation = styled.div<{ justifyContent: string }>`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
`;

export const TextCard = styled.p<{ size: string; bold: boolean; color: string; marginBottom: string }>`
  font-size: ${props => (props.size ? props.size : '1')}rem;
  padding: 0px;
  margin: 0px;
  margin-bottom: ${props => props.marginBottom}rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.color || 'rgb(34, 34, 34)'};
  overflow: hidden;
  font-family: ${props => (!props.bold ? 'SantanderMicroText' : 'SantanderHeadline-Bold')};
`;
