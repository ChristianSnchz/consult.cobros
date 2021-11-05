import React from 'react';
import styled from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';
import { IShippingInfo } from '../../contexts/ShippingPubContext/interfaces';
import { IColumns } from '../commons/TableBox';
import { CANCELLED_STATUS_CODE } from '../../contexts/ShippingPubContext/shippingStatusCodes';

export const StyledIcon = styled('button')`
  cursor: pointer;
  font-size: 0.75rem;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  overflow: hidden;
  outline: none;
  padding: 2px 0;
  text-align: center;
  font-family: ${theme.obpUI.fontSantanderMicroText};
  color: ${theme.color.santanderred};

  :hover {
    font-weight: bold;
    opacity: 0.7;
  }

  :disabled {
    color: ${theme.color.darksky};
    cursor: not-allowed;
  }
`;

export const StyledWrappIcon = styled('div')`
  display: flex;
  flex-direction: column;
`;

declare global {
  interface Window {
    ga: any;
  }
}

const status = {
  name: 'Estado',
  center: true,
  selector: 'status'
};

const date = {
  name: 'Fecha de Alta',
  selector: 'dischargeDate',
  center: true
};

const shippingNumber = {
  name: 'Nro de Envío',
  selector: 'shippingNumber',
  center: true
};

const totalRegsInf = {
  name: 'Registros',
  selector: 'totalRegsInf',
  center: true
};

const amount = {
  name: 'Imp. 1er vencimiento',
  selector: 'totalAmountExp1',
  center: true
};

const actions = (gaEvent, viewMoreState) => {
  const { openDetail, setOpenDetail, openRemove, setOpenRemove } = viewMoreState;
  return {
    // eslint-disable-next-line react/display-name
    cell: (row: IShippingInfo) => {
      if (row.codeStatus !== CANCELLED_STATUS_CODE) {
        const actionsButton = [];
        const ButtonAction = ({ label, action, setOpen, open }) => (
          <StyledIcon
            data-testid={`${action}-btn`}
            disabled={open}
            onClick={async () => {
              gaEvent(action, 'click');
              setOpen(row);
            }}
            color={open ? '#616166' : '#ec0000'}
            size="22px"
            icon="be-280"
          >
            {label}
          </StyledIcon>
        );
        actionsButton.push(
          <ButtonAction
            key="ver-datalle"
            action="ver-detalle"
            label="Ver Detalle"
            open={openDetail}
            setOpen={setOpenDetail}
          />
        );
        // if (row.status === 'Pendiente de aprobación')
        //   actionsButton.push(
        //     <ButtonAction key="Eliminar" action="eliminar" label="Eliminar" open={true} setOpen={setOpenRemove} />
        //   );
        return <StyledWrappIcon>{actionsButton}</StyledWrappIcon>;
      }
      return '-';
    },
    name: 'Acciones',
    center: true,
    selector: null
  };
};

const getColumns = (
  gaEvent: (category: string, label: string) => void,
  viewMoreState: {
    openDetail: IShippingInfo;
    setOpenDetail: (va: IShippingInfo) => void;
    openRemove: IShippingInfo;
    setOpenRemove: (va: IShippingInfo) => void;
  }
): IColumns => {
  return [status, date, shippingNumber, totalRegsInf, amount, actions(gaEvent, viewMoreState)];
};

export default getColumns;
