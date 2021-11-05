import React, { FC, useContext, useMemo } from 'react';
import { Document, Page, View, usePDF, Text, BlobProvider } from '@react-pdf/renderer';
import Button from '@santander/everest-ui/lib/Button';
import Icon from '@santander/everest-ui/lib/Icon';

import { IDebts } from '../../../contexts/PubDebContext/interfaces';
import formatBalance from '../../../utils/helpers/balanceHelper';
import downloadFiles from '../../../utils/fileUtils/downloadFiles';
import { AppContext } from '../../../contexts/AppContext';
import {
  SubData,
  SubDataContainer,
  DivisionOne,
  GeneralDataLabel,
  GeneralDataWrapper,
  MainDataValue,
  InfoLabel,
  InfoValue,
  MainDataLabel,
  Row,
  RowLabel,
  RowValue,
  Table,
  WrapperBody,
  Wrapper,
  Division,
  PrintButton,
  ButtonsWrapper,
  styles
} from '../../commons/modalStyles';
import registerFonts from '../../../utils/registerFontsToPDF';
import blobToFile from '../../../utils/fileUtils/blobToFile';

interface IPopUp {
  row: IDebts;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PDFDownload = ({
  row,
  basicRows,
  generalRows
}: {
  row: IDebts;
  basicRows: ({ label: string; value: string } | { label: string; value: number })[];
  generalRows: ({ label: string; value: string } | { label: string; value: number })[];
}) => (
  <Document>
    <Page style={styles.page} size="A4">
      <Text style={styles.docDetailTitle}>Detalle del documento</Text>
      <Text data-testid="clien-test-pdf" style={styles.mainDataLabel}>
        Número de cliente
      </Text>
      <Text style={styles.mainDataValue}>{row.client.clientNumber}</Text>
      <View style={styles.subDataContainer}>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>CUIT:</Text>
          <Text style={styles.infoValue}>{row.client.clientCuit}</Text>
        </View>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>Razón social:</Text>
          <Text style={styles.infoValue}>{row.client.businessName}</Text>
        </View>
      </View>
      <View style={styles.divisionOne} />
      <View style={styles.generalDataWrapper}>
        <Text style={styles.generalDataLabel}>Datos Generales</Text>
        <View style={styles.table}>
          {generalRows.map(({ label, value }, i) => (
            <View style={i % 2 !== 0 ? styles.rowPair : styles.row} key={`${i}-${value}`}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.generalDataLabel}>Datos de documento</Text>
        <View style={styles.table}>
          {basicRows.map(({ label, value }, i) => (
            <View style={i % 2 !== 0 ? styles.rowPair : styles.row} key={`${i}-${value}`}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const PDFView = ({
  row,
  basicRows,
  generalRows
}: {
  row: IDebts;
  basicRows: ({ label: string; value: string } | { label: string; value: number })[];
  generalRows: ({ label: string; value: string } | { label: string; value: number })[];
}) => {
  const { isMobile } = useContext(AppContext);
  return (
    <WrapperBody isMobile={isMobile}>
      <MainDataLabel isMobile={isMobile}>Número de cliente</MainDataLabel>
      <MainDataValue data-testid="clien-test" isMobile={isMobile}>
        {row.client.clientNumber}
      </MainDataValue>
      <SubDataContainer isMobile={isMobile}>
        <SubData isMobile={isMobile}>
          <InfoLabel>CUIT:</InfoLabel>
          <InfoValue>{row.client.clientCuit}</InfoValue>
        </SubData>
        <SubData isMobile={isMobile}>
          <InfoLabel>Razón social:</InfoLabel>
          <InfoValue>{row.client.businessName}</InfoValue>
        </SubData>
      </SubDataContainer>
      <DivisionOne isMobile={isMobile} />
      <GeneralDataWrapper>
        <GeneralDataLabel>Datos Generales</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {generalRows.map(({ label, value }, i) => (
            <Row isMobile={isMobile} key={`${i}-${value}`} pair={i % 2 === 0}>
              <RowLabel>{label}</RowLabel>
              <RowValue>{value}</RowValue>
            </Row>
          ))}
        </Table>
        <GeneralDataLabel>Datos de documento</GeneralDataLabel>
        <Table isMobile={isMobile}>
          {basicRows.map(({ label, value }, i) => (
            <Row isMobile={isMobile} key={`${i}-${value}`} pair={i % 2 === 0}>
              <RowLabel>{label}</RowLabel>
              <RowValue>{value}</RowValue>
            </Row>
          ))}
        </Table>
      </GeneralDataWrapper>
    </WrapperBody>
  );
};

const PopUpDetail: FC<IPopUp> = ({ row }) => {
  const Debin = { label: 'Error debin', value: row.debt.errorDebin.toString() };
  const generalRows = [
    { label: 'Nro. de acuerdo', value: row.debt.documentNumber },
    { label: 'Descripción del acuerdo', value: row.debt.documentDescription },
    { label: 'Tipo de comprobante', value: row.debt.documentType },
    { label: 'Nro. de documento', value: row.debt.documentNumber }
  ];
  if (row.debt.errorDebin) generalRows.push(Debin);
  const basicRows = [
    { label: 'Nro. de cuota', value: row.debt.paymentNumber },
    { label: 'Fecha de vencimiento', value: row.debt.expirationDate },
    { label: 'Saldo de documento', value: `$ ${formatBalance(row.debt.documentAmount)}` },
    { label: 'Fecha pronto pago', value: row.debt.prontoPagoDate },
    { label: 'Importe pronto pago', value: `$ ${formatBalance(row.debt.prontoPagoAmount)}` },
    { label: 'Tasa de interés punitorios', value: row.debt.interestRatePunishment },
    {
      label: 'Importe punitorios',
      value: `$ ${row.debt.punishmentAmount ? formatBalance(row.debt.punishmentAmount) : row.debt.punishmentAmount}`
    },
    { label: 'IVA por interés de deuda', value: row.debt.IVARate },
    { label: 'IVA adicional por interés de deuda', value: row.debt.additionalIVARate },
    { label: 'Importe a pagar', value: `$ ${formatBalance(row.debt.amount)}` }
  ];
  const document = useMemo(() => <PDFDownload row={row} basicRows={basicRows} generalRows={generalRows} />, [row]);
  usePDF({ document });

  React.useEffect(() => {
    registerFonts();
  }, []);

  return (
    <Wrapper>
      <PDFView row={row} basicRows={basicRows} generalRows={generalRows} />
      <Division />
      <BlobProvider document={document}>
        {({ loading, error, blob, url }) => {
          const pdfFile = blob && blobToFile(blob, `comprobante_${row.debt.documentNumber}.pdf`);
          return (
            <ButtonsWrapper>
              <Button
                data-testid="btn-download"
                text={(loading && 'Cargando') || (error && 'Error') || 'Descargar'}
                disabled={loading || error}
                variant="primary"
                onClick={() => downloadFiles(pdfFile)}
                icon={{
                  position: 'left',
                  icon: 'bc-070',
                  size: '24px'
                }}
              />
              <PrintButton data-testid="print-test" disabled={loading || error} href={url} target="_blank">
                <Icon icon="bd-510" size="24px" />
                <span>{(loading && 'Cargando') || (error && 'Error') || 'Imprimir'}</span>
              </PrintButton>
            </ButtonsWrapper>
          );
        }}
      </BlobProvider>
    </Wrapper>
  );
};
export default PopUpDetail;
