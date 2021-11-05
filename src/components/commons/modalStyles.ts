import styled from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';
import { StyleSheet } from '@react-pdf/renderer';

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

export const WrapperBody = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  height: 100%;
  max-height: calc(90vh - 200px);
  overflow-y: auto;
`;

export const GeneralDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainDataLabel = styled.div<{ isMobile: boolean }>`
  color: rgb(34, 34, 34);
  font-family: SantanderMicroText;
  font-size: 0.875rem;
  letter-spacing: 0px;
  align-self: ${({ isMobile }) => (isMobile ? 'start' : 'center')};
  margin-bottom: 8px;
`;

export const MainDataValue = styled.div<{ isMobile: boolean }>`
  color: rgb(34, 34, 34);
  font-size: 2.5rem;
  align-self: ${({ isMobile }) => (isMobile ? 'start' : 'center')};
  font-family: SantanderMicroText-Bold;
  font-weight: bold;
  letter-spacing: 0px;
  margin-bottom: ${prev => (prev.isMobile ? 0.5 : 1)}rem;
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

export const SubDataContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-around;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  align-items: ${prev => (prev.isMobile ? 'flex-start' : 'center')};
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '1rem')};
`;

export const SubData = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const InfoLabel = styled.span`
  color: rgb(118, 118, 118);
`;
export const InfoValue = styled.span`
  margin-left: 8px;
  color: rgb(34, 34, 34);
`;

export const DivisionOne = styled.span<{ isMobile: boolean }>`
  margin: ${prev => (prev.isMobile ? 16 : 32)}px 0px;
  width: 100%;
  height: 1px;
  border-bottom: 2px solid #b5b5b582;
`;
export const Division = styled.span`
  width: 100%;
  height: 1px;
  border-bottom: 2px solid #b5b5b582;
  margin-bottom: 32px;
`;

export const GeneralDataLabel = styled.span`
  width: 100%;
  text-align: left;
  color: rgb(34, 34, 34);
  font-size: 1.25rem;
  font-family: SantanderHeadline-Regular;
  font-weight: normal;
  letter-spacing: 0px;
`;

export const DescriptionLabel = styled.span`
  width: 100%;
  text-align: left;
  color: rgb(118, 118, 118);
  font-family: SantanderMicroText;
  font-size: 1rem;
  margin: 0.875rem 0rem;
  height: 22px;
  letter-spacing: 0px;
`;

export const Table = styled.div<{ isMobile: boolean }>`
  margin: ${prev => (prev.isMobile ? '1' : '1.25')}rem 0rem;
  display: block;
`;
export const Row = styled.div<{ pair: boolean; isMobile: boolean; marginB: string }>`
  ${prev =>
    prev.isMobile
      ? `
      div {
        padding: 0;
      }
      flex-direction: column;
    `
      : `
      flex-direction: row;
      justify-content: space-between;
    `}
  margin-bottom: ${({ marginB }) => marginB || ''};
  display: flex;
  height: 43px;
  background: ${({ pair, isMobile }) => (pair && !isMobile ? 'rgb(248, 248, 248)' : 'white')};
  border-radius: 0px;
`;
export const RowLabel = styled.div<{ width: string; direction: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  color: rgb(118, 118, 118);
  font-size: 0.875rem;
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  padding-left: 12px;
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ direction }) => direction || 'flex-start'};
`;
export const RowValue = styled.div<{ width: string; direction: string }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: rgb(34, 34, 34);
  font-size: 0.875rem;
  font-family: SantanderMicroText;
  text-align: right;
  letter-spacing: 0px;
  padding-right: 12px;
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ direction }) => direction || 'flex-start'};
`;

export const ButtonsWrapper = styled('div')<{
  withoutBorder: boolean;
  direction: 'flex-start' | 'space-around' | 'space-between';
}>`
  display: flex;
  flex-direction: row;
  ${({ withoutBorder }) => (!withoutBorder ? 'border-top: 2px solid #b5b5b5;' : '')};
  padding-top: 1rem;
  width: 100%;
  justify-content: ${({ direction }) => direction || 'flex-start'};
  button:nth-child(1) {
    margin-right: 1rem;
  }
`;
export const PrintButton = styled('a')<{ disabled: boolean }>`
  color: ${theme.color.santanderred};
  font-family: ${theme.obpUI.fontSantanderMicroText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  text-decoration: none;
  border: 1px solid ${theme.color.santanderred};
  border-radius: 1rem;
  &:hover {
    background-color: ${theme.color.santanderred};
    color: ${theme.color.white};
  }
  span:nth-child(2) {
    height: 20px;
  }
  span:first-of-type {
    margin-right: 6px;
  }
  transition: background-color 0.4s, color 0.4s, border 0.4s;
`;

export const DeleteButton = styled('button')<{ disabled: boolean }>`
  color: rgb(37, 127, 164);
  font-family: ${theme.obpUI.fontSantanderMicroText};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  text-decoration: none;
  border-radius: 1rem;
  border: none;
  background-color: #ffff;
  &:hover {
    background-color: rgb(248, 248, 248);
  }
  span:nth-child(2) {
    height: 20px;
  }
  span:first-of-type {
    margin-right: 6px;
  }
  transition: background-color 0.4s, color 0.4s, border 0.4s;
`;

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1cm'
  },
  docDetailTitle: {
    color: 'rgb(34, 34, 34)',
    fontSize: '22px',
    fontFamily: 'SantanderHeadline-Regular',
    letterSpacing: '0px',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: '24px',
    marginTop: '24px'
  },
  mainDataLabel: {
    color: 'rgb(34, 34, 34)',
    fontFamily: 'SantanderMicroText',
    fontSize: '14px',
    letterSpacing: '0px',
    alignSelf: 'center',
    marginBottom: '8px'
  },
  mainDataValue: {
    color: 'rgb(34, 34, 34)',
    fontSize: '36px',
    fontFamily: 'SantanderMicroText-Bold',
    fontWeight: 'bold',
    letterSpacing: '0px',
    alignSelf: 'center',
    marginBottom: '17px'
  },
  subDataContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  subData: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: '32px'
  },
  infoLabel: {
    marginLeft: '8px',
    color: 'rgb(118, 118, 118)',
    fontSize: '16px',
    fontFamily: 'SantanderMicroText',
    letterSpacing: '0px'
  },
  infoValue: {
    marginLeft: '8px',
    color: 'rgb(34, 34, 34)',
    fontSize: '16px',
    fontFamily: 'SantanderMicroText',
    letterSpacing: '0px'
  },
  divisionOne: {
    width: '100%',
    height: '1px',
    borderBottom: '2px solid #b5b5b5',
    marginBottom: '32px',
    alignSelf: 'center'
  },

  generalDataWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  generalDataLabel: {
    color: 'rgb(118, 118, 118)',
    fontSize: '16px',
    fontFamily: 'SantanderMicroText',
    fontWeight: 'normal',
    letterSpacing: '0px',
    alignSelf: 'flex-start',
    marginTop: '14px'
  },
  table: { marginTop: '10px', width: '100%', marginBottom: '10px' },
  row: {
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '36px',
    backgroundColor: 'rgb(248, 248, 248)',
    borderRadius: '0px',
    alignSelf: 'center'
  },
  rowPair: {
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '36px',
    backgroundColor: 'white',
    borderRadius: '0px',
    alignSelf: 'center'
  },
  rowLabel: {
    padding: '5px 10px',
    color: 'rgb(118, 118, 118)',
    fontSize: '14px',
    fontFamily: 'SantanderMicroText',
    letterSpacing: '0px'
  },
  rowValue: {
    color: 'rgb(34, 34, 34)',
    fontSize: '14px',
    fontFamily: 'SantanderMicroText',
    letterSpacing: '0px',
    padding: '5px 10px'
  }
});
