import React from 'react';
import theme from '@santander/obp-ui/lib/theme';
import styled from 'styled-components';
import { IDebts } from '../../contexts/PubDebContext/interfaces';
import formatBalance from '../../utils/helpers/balanceHelper';
import { IColumns } from '../commons/TableBox';

export const StyledIcon = styled('b')`
  cursor: pointer;
  font-size: 0.75rem;
  text-align: center;
  font-family: ${theme.obpUI.fontSantanderMicroText};
  color: ${theme.color.santanderred};

  :hover {
    font-weight: bold;
    opacity: 0.7;
  }
`;

declare global {
  interface Window {
    ga: any;
  }
}

const documentDescription = {
  name: 'Comprobante',
  center: true,
  wrap: true,
  cell: row => row.debt.documentDescription
};

const number = {
  name: 'Número',
  selector: 'debt.documentNumber',
  center: true,
  wrap: true
};

const quota = {
  name: 'Cuota',
  selector: 'debt.paymentNumber',
  center: true
};

const expirationDate = {
  name: 'Vencimiento',
  selector: 'debt.expirationDate',
  center: true,
  wrap: true
};

const amount = {
  name: 'Importe',
  selector: 'amount',
  // eslint-disable-next-line no-shadow
  format: ({ debt: { amount } }: { debt: { amount: string } }): string =>
    `$ ${Number(amount) ? formatBalance(Number(amount)) : Number(amount)}`,
  center: true
};
const debin = (showColumn: boolean) => ({
  name: 'Debin',
  center: true,
  omit: !showColumn,
  cell: row => (row.debt.debinId ? row.debt.debinId : '-')
});

const actions = (gaEvent, viewMoreState) => {
  const { open, setOpen } = viewMoreState;
  return {
    // eslint-disable-next-line react/display-name
    cell: row => {
      return (
        <StyledIcon
          data-testid="ver-detalle-btn"
          disabled={open}
          onClick={async () => {
            gaEvent('ver-mas-detalle', 'click');
            setOpen(row);
          }}
          color={open ? '#616166' : '#ec0000'}
          size="22px"
          icon="be-280"
        >
          {'Ver detalle'}
        </StyledIcon>
      );
    },
    name: 'Acciones',
    center: true,
    selector: null
  };
};

const getColumns = (
  debtsList: IDebts[],
  gaEvent: (category: string, label: string) => void,
  viewMoreState: { open: IDebts; setOpen: (va: IDebts) => void }
): IColumns => {
  return [
    documentDescription,
    number,
    quota,
    expirationDate,
    amount,
    debin(!!debtsList.find(pubDebt => !!pubDebt.debt.debinId)),
    actions(gaEvent, viewMoreState)
  ];
};

export default getColumns;
