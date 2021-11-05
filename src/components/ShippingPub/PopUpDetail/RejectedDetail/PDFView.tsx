import React, { FC, useContext } from 'react';
import { FunctionalTable } from '@santander/obp-ui';
import {
  DescriptionLabel,
  DivisionOne,
  GeneralDataLabel,
  GeneralDataWrapper,
  InfoLabel,
  InfoValue,
  MainDataLabel,
  MainDataValue,
  Row,
  RowLabel,
  RowValue,
  SubData,
  SubDataContainer,
  WrapperBody,
  Table
} from '../../../commons/modalStyles';
import {
  IRejectedShippingResponse,
  IRejections,
  IShippingInfo
} from '../../../../contexts/ShippingPubContext/interfaces';
import { AppContext } from '../../../../contexts/AppContext';
import { TableWrapper } from '../../../commons/TableBox/styles';

interface IRejectedData {
  customerNumber: string;
  documentId: string;
  documentType: string;
  descriptionError: string;
}

interface PDFViewProps {
  shippingInfo: IShippingInfo;
  rejectedShipping: IRejectedShippingResponse;
}

const generalRows = (shippingInfo: IShippingInfo, rejectedShipping: IRejectedShippingResponse) => [
  { label: 'Número de envío', value: shippingInfo.shippingNumber },
  { label: 'Cantidad de registros informados', value: shippingInfo.totalRegsInf },
  { label: 'Importe 1er vencimiento', value: shippingInfo.totalAmountExp1 },
  { label: 'Tipo de proceso', value: rejectedShipping.detail.batchProcessing }
];

const getColumns = () => [
  {
    name: 'Nro. de cliente',
    center: true,
    selector: 'customerNumber',
    grow: 2,
    wrap: true
  },
  {
    name: 'Nro. de comprobante',
    selector: 'documentId',
    grow: 2,
    center: true,
    wrap: true
  },
  {
    name: 'Tipo',
    cell: row => (row.documentType ? row.documentType : '-'),
    grow: 1.5,
    center: true,
    wrap: true
  },
  {
    name: 'Descripción',
    selector: 'descriptionError',
    grow: 2,
    center: true,
    wrap: true
  }
];

const getDataTable = (rejections: IRejections[]): IRejectedData[] => {
  const data: IRejectedData[] = [];
  rejections.forEach(rejection =>
    rejection.errors.forEach(error =>
      data.push({
        customerNumber: rejection.customerNumber,
        documentId: rejection.documentId,
        documentType: rejection.documentType,
        descriptionError: error.description
      })
    )
  );
  return data;
};

const PDFView: FC<PDFViewProps> = ({ shippingInfo, rejectedShipping }) => {
  const { isMobile } = useContext(AppContext);

  return (
    <WrapperBody data-testid="rejected-view">
      <MainDataLabel isMobile={isMobile}>Estado de la operación</MainDataLabel>
      <MainDataValue isMobile={isMobile} data-testid="publication-test-id">
        {shippingInfo.status}
      </MainDataValue>
      <SubDataContainer isMobile={isMobile}>
        <SubData isMobile={isMobile}>
          <InfoLabel>Fecha de alta:</InfoLabel>
          <InfoValue>{shippingInfo.dischargeDate}</InfoValue>
        </SubData>
        <SubData isMobile={isMobile}>
          <InfoLabel>Acuerdo:</InfoLabel>
          <InfoValue>{rejectedShipping.agreement}</InfoValue>
        </SubData>
      </SubDataContainer>
      <DivisionOne isMobile={isMobile} />
      <GeneralDataWrapper>
        <GeneralDataLabel>Datos Generales</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {generalRows(shippingInfo, rejectedShipping).map(({ label, value }, i) => (
            <Row isMobile={isMobile} key={`${i}-${value}`} pair={i % 2 === 0}>
              <RowLabel>{label}</RowLabel>
              <RowValue>{value}</RowValue>
            </Row>
          ))}
        </Table>
        {!isMobile && rejectedShipping.rejections.length > 0 && (
          <>
            <GeneralDataLabel>Previsualización del rechazo</GeneralDataLabel>
            <DescriptionLabel>Descargá el archivo para ver el detalle completo del rechazo</DescriptionLabel>
            <TableWrapper data-testid="Table-test">
              <FunctionalTable
                responsive
                pagination={false}
                columns={getColumns()}
                emptyText={''}
                data={getDataTable(rejectedShipping.rejections)}
                noContextMenu
              />
            </TableWrapper>
          </>
        )}
      </GeneralDataWrapper>
    </WrapperBody>
  );
};

export default PDFView;
