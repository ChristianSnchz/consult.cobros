import React, { FC, useContext } from 'react';
import { AppContext } from '../../../../contexts/AppContext';
import { IShippingDetail } from '../../../../contexts/ShippingPubContext/interfaces';
import {
  DivisionOne,
  GeneralDataLabel,
  GeneralDataWrapper,
  InfoLabel,
  InfoValue,
  Row,
  RowLabel,
  RowValue,
  Table,
  MainDataLabel,
  MainDataValue,
  WrapperBody,
  SubDataContainer,
  SubData
} from '../../../commons/modalStyles';

const validationProcessRows = shippingDetail => [
  { label: 'Último registro validado', value: shippingDetail.registersValidated },
  { label: 'Resultado validación', value: shippingDetail.validationResult }
];

const generalRows = shippingDetail => [
  { label: 'Número de envío', value: shippingDetail.sendingNumber },
  { label: 'Cantidad de registros informados', value: shippingDetail.totalRegsInf },
  { label: 'Importe 1er vencimiento', value: shippingDetail.totalAmountExp1 }
];

const publicationProcessRows = shippingDetail => [
  { label: 'Procesados', value: shippingDetail.movementsProcesed },
  { label: 'Aceptados', value: shippingDetail.movementsAccepted },
  { label: 'Rechazados', value: shippingDetail.movementsRejected }
];

interface IPDFProps {
  shippingDetail: IShippingDetail;
}

const PDFView: FC<IPDFProps> = ({ shippingDetail }) => {
  const { isMobile } = useContext(AppContext);
  return (
    <WrapperBody isMobile={isMobile}>
      <MainDataLabel isMobile={isMobile}>Estado de la operación</MainDataLabel>
      <MainDataValue data-testid="publication-test-id" isMobile={isMobile}>
        {shippingDetail.status}
      </MainDataValue>
      <SubDataContainer isMobile={isMobile}>
        <SubData isMobile={isMobile}>
          <InfoLabel>Fecha de alta:</InfoLabel>
          <InfoValue>{shippingDetail.dischargeDate}</InfoValue>
        </SubData>
        <SubData isMobile={isMobile}>
          <InfoLabel>Acuerdo:</InfoLabel>
          <InfoValue>{shippingDetail.agreement}</InfoValue>
        </SubData>
      </SubDataContainer>
      <DivisionOne isMobile={isMobile} />
      <GeneralDataWrapper>
        <GeneralDataLabel>Datos Generales</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {generalRows(shippingDetail).map(({ label, value }, i) => (
            <Row isMobile={isMobile} key={`${i}-${value}`} pair={i % 2 === 0}>
              <RowLabel>{label}</RowLabel>
              <RowValue>{value}</RowValue>
            </Row>
          ))}
        </Table>
        <GeneralDataLabel>Estado de la publicación</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {publicationProcessRows(shippingDetail).map(({ label, value }, i) => (
            <Row isMobile={isMobile} key={`${i}-${value}`} pair={i % 2 === 0}>
              <RowLabel>{label}</RowLabel>
              <RowValue>{value}</RowValue>
            </Row>
          ))}
        </Table>
        <GeneralDataLabel>Historico</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {shippingDetail.logStatus?.map(({ date, description }, i) => (
            <Row isMobile={isMobile} key={`${i}-${date}`} pair={i % 2 === 0}>
              <RowLabel>{description}</RowLabel>
              <RowValue>{date}</RowValue>
            </Row>
          ))}
        </Table>
        {shippingDetail.signers && (
          <>
            <GeneralDataLabel>Firmantes</GeneralDataLabel>
            <Table isMobile={isMobile}>
              {isMobile ? (
                <>
                  {shippingDetail.signers.result.map(({ signerIdentifier, signerName, signerDate }, i) => (
                    <Row isMobile={isMobile} key={`${i}-${document}`} pair={i % 2 !== 0} marginB={'1.5rem'}>
                      <RowValue>{signerName}</RowValue>
                      <RowLabel>{signerIdentifier}</RowLabel>
                      <RowLabel>{signerDate}</RowLabel>
                    </Row>
                  ))}
                </>
              ) : (
                <>
                  {shippingDetail.signers.result.map(({ signerIdentifier, signerName, signerDate }, i) => (
                    <Row isMobile={isMobile} key={`${i}-${document}`} pair={i % 2 !== 0}>
                      <RowLabel width={'50%'}>{signerName}</RowLabel>
                      <RowLabel direction="center" width={'15%'}>
                        {signerIdentifier}
                      </RowLabel>
                      <RowValue direction="flex-end" width={'35%'}>
                        {signerDate}
                      </RowValue>
                    </Row>
                  ))}
                </>
              )}
            </Table>
          </>
        )}
      </GeneralDataWrapper>
    </WrapperBody>
  );
};

export default PDFView;
