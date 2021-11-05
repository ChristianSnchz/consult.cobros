import styled from 'styled-components';
import Icon from '@santander/everest-ui/lib/Icon';

export const DebtSubtitle = styled.p`
  width: 579px;
  height: 19px;
  margin-top: 0.5rem;
  color: rgb(34, 34, 34);
  font-size: 0.875rem;
  font-family: SantanderMicroText;
  letter-spacing: 0px;
`;

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

export const DropdownContainer = styled.div<{ isMobile: boolean }>`
  ${props =>
    props.isMobile &&
    `
  width: 100%;   
 `}
`;

export const buttonStyle = {
  marginLeft: '8px',
  width: '168px',
  height: '32px',
  border: '1px solid rgb(236, 0, 0)',
  borderRadius: '40px'
};

export const buttonStyleMobile = {
  width: '50%',
  height: '2.5rem',
  borderRadius: '3rem',
  marginTop: '3rem',
  fontSize: '1rem'
};

export const buttonStyleMobileCancel = {
  width: '50%',
  height: '2.5rem',
  borderRadius: '3rem',
  marginTop: '1rem',
  fontSize: '1rem'
};

export const dropstyle = {
  minWidth: '265px',
  background: 'rgb(255, 255, 255)',
  border: '1px solid rgb(181, 181, 181)',
  borderRadius: '4px 4px 0px 0px',
  maxHeight: '56px'
};

export const dateStyle = {
  width: '150px',
  background: 'rgb(255, 255, 255)',
  color: 'rgb(143, 143, 143)',
  margin: '2px 5px 5px 5px'
};

export const Line = styled.div<{ isMobile: boolean }>`
  height: 1px;
  margin-bottom: 1rem;
  ${props =>
    props.isMobile &&
    `width:100%;
     margin-top: 2rem;
     margin-bottom: 2rem;
     border-bottom: 0.001rem dotted rgb(151,151,151);
  `}
`;

export const FileTitle = styled.p<{ isMobile: boolean; File: boolean; bold: boolean }>`
  color: rgb(118, 118, 118);
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  font-size: 1rem;
  margin: 0px;
  ${props =>
    props.isMobile && !props.File && 'font-size: 1.25rem; color: rgb(34, 34, 34); width: 100%;  margin-top: 2rem;'}
  ${props => props.bold && 'font-family: SantanderMicroText-Bold; '}
    ${props => props.File && 'font-size: 1rem; color: rgb(34, 34, 34); margin: 0px;'}
`;

export const WrapperTopTableMobile = styled.div`
  width: 100%;
  margin-bottom: 0.3rem;
  height: 2rem;
  vertical-align: middle;
  margin-top: 0.75rem;
`;

export const BackgroundCheckbox = styled.div`
  background-color: white;
  width: 1.5rem;
  border-radius: 20px;
`;
export const WrapperChecboxAll = styled.div`
  display: flex;
  justify-content: flex-start;
  align-self: center;
`;
export const LabelChecboxAll = styled.span`
  align-self: center;
  font-family: SantanderMicroText;
  font-size: 0.85rem;
  margin-left: 0.5rem;
`;
export const FilterLink = styled.p`
  font-size: 0.85rem;
  align-self: center;
  font-family: SantanderMicroText;
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

export const DownloadInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DownloadButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DownloadContainer = styled.div`
  padding-top: 2rem;
  transition: 0.5;
  position: relative;
  font-family: SantanderMicroText;
  font-size: 0.875rem;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
export const DownloadButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  border: none;
  background: inherit;
  color: rgba(37, 127, 164, 1);
  font-family: inherit;
  font-size: inherit;
  margin-left: 1rem;
  :hover {
    font-weight: bold;
    opacity: 0.7;
  }
`;

export const DownloadIcon = styled(Icon)`
  position: relative;
  top: 2px;
  margin-right: 8px;
`;

export const FilterHeaderMobile = styled.p`
  color: rgb(222, 237, 242);
  font-size: 1rem;
  font-family: SantanderHeadline-Regular;
  font-weight: normal;
  letter-spacing: 0px;
  margin-left: 2rem;
  margin-top: 0;
`;

export const ContainerCheckBoxMobile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

export const CheckContent = styled.p`
  color: rgb(34, 34, 34);
  font-size: 1rem;
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  margin-right: 1rem;
`;

export const AllDebtsMessage = styled.p<{ Title: boolean }>`
  color: rgb(34, 34, 34);
  font-size: 1.6875rem;
  font-family: SantanderMicroText;
  letter-spacing: 0px;
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  ${props =>
    props.Title &&
    `
    font-weight: bold;
    font-size: 1rem;
   `};
`;

export const ContainerMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
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
export const FieldContainer = styled.div`
  width: 250px;
  margin: 0.8125rem;
  flex-grow: 1;
  flex-shrink: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;
export const ActionsContainer = styled.div`
  button {
    font-size: 0.875rem !important;
    height: 40px;
    min-height: 40px;
  }
  .pub-debt-btn-apply {
    width: 168px;
  }
  .pub-debt-btn-no-border {
    background-color: inherit;
    border: none;
    color: rgb(37, 127, 164);
    padding: 0;
    &:hover {
      background-color: #fff;
      color: rgb(37, 127, 164);
    }
  }
  display: flex;
  justify-content: flex-end;
  width: 250px;
  margin: 0.8125rem;
  flex-grow: 1;
  flex-shrink: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;
export const DownloadLabel = styled.span`
  width: 100%;
  font-size: 0.75rem;
`;

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
