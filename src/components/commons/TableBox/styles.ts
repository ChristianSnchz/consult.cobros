import styled from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';
import Spinner from '../Spinner';

export const TableContainer = styled.div``;
export const TableWrapper = styled.div`
  .rdt_TableHeader {
    min-height: 8px;
  }
  .rdt_Pagination {
    justify-content: center;
    div > select {
      margin-right: 176px;
    }
    div > svg {
      margin-right: 176px;
    }
  }
  .rdt_TableRow {
    border-top: none;
    border-bottom: none;
  }
  .rdt_TableRow:nth-of-type(even) {
    background-color: rgba(246, 246, 246, 1);
    border-top: none;
    border-bottom: none;
  }
  .rdt_TableHead {
    border-top: none;
    border-bottom: none;
  }
  .rdt_TableHeadRow {
    border-top: none;
    border-bottom: none;
    color: rgb(68, 68, 68);
    font-size: 0.875rem;
    font-weight: bd;
  }

  .rdt_TableCol:not(:last-of-type),
  .rdt_TableCell:not(:last-of-type) {
    &::after {
      border-left: 1px solid rgb(223, 223, 223);
      width: 1px;
      content: ' ';
      right: -2px;
      display: block;
      height: 20px;
      position: absolute;
    }
  }
`;

export const WrapperTopTableMobile = styled.div`
  width: 100%;
  margin-bottom: 0.3rem;
  height: 2rem;
  vertical-align: middle;
  margin-top: 0.75rem;
`;

export const FilterLink = styled.p`
  font-size: 0.85rem;
  align-self: center;
  font-family: ${theme.obpUI.fontSantanderMicroText};
  color: rgb(37, 127, 164);
  display: flex;
  margin: auto;
  cursor: pointer;
  &:hover {
    color: rgb(37, 127, 164);
  }
`;

export const ArrowDown = styled.div<{ isOpen: boolean }>`
  width: 1rem;
  height: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #656565;
  border-bottom: 4px solid #656565;
  transform: rotate(-45deg);
  margin-bottom: 2rem;
  align-self: center;
`;

export const AllDebtsMessage = styled.p<{ Title: boolean }>`
  color: rgb(34, 34, 34);
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  ${props =>
    props.Title &&
    `
    font-weight: bold;
    font-size: 0.875rem;
   `};
`;
export const CardTableContainer = styled.div<{ isLoading: boolean }>`
  display: block;
  max-height: calc(100vh - 168px);
  overflow-y: auto;
  border-radius: 8px;
`;
export const SpinnerContainer = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
`;
export const TableSpinner = styled(Spinner)`
  background-color: #f6f6f6;
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
`;
