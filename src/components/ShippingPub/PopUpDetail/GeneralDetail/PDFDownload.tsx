import React, { FC } from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { IShippingDetail } from '../../../../contexts/ShippingPubContext/interfaces';
import { styles } from '../../../commons/modalStyles';

interface IPDFDowndloadProps {
  shippingDetail: IShippingDetail;
}

const generalRows = shippingDetail => [
  { label: 'Número de envío', value: shippingDetail.sendingNumber },
  { label: 'Cantidad de registros informados', value: shippingDetail.totalRegsInf },
  { label: 'Importe 1er vencimiento', value: shippingDetail.totalAmountExp1 }
];
const validationProcessRows = shippingDetail => [
  { label: 'Último registro validado', value: shippingDetail.registersValidated },
  { label: 'Resultado validación', value: shippingDetail.validationResult }
];
const publicationProcessRows = shippingDetail => [
  { label: 'Procesados', value: shippingDetail.movementsProcesed },
  { label: 'Aceptados', value: shippingDetail.movementsAccepted },
  { label: 'Rechazados', value: shippingDetail.movementsRejected }
];

const PDFDownload: FC<IPDFDowndloadProps> = ({ shippingDetail }) => (
  <Document>
    <Page style={styles.page} size="A4">
      <Text style={styles.docDetailTitle}>Detalle del documento</Text>
      <Text data-testid="publication-test-pdf" style={styles.mainDataLabel}>
        Estado de la operación
      </Text>
      <Text style={styles.mainDataValue}>{shippingDetail.status}</Text>
      <View style={styles.subDataContainer}>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>Fecha de alta:</Text>
          <Text style={styles.infoValue}>{shippingDetail.dischargeDate}</Text>
        </View>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>Acuerdo:</Text>
          <Text style={styles.infoValue}>{shippingDetail.agreement}</Text>
        </View>
      </View>

      <View style={styles.divisionOne} />

      <View style={styles.generalDataWrapper}>
        <Text style={styles.generalDataLabel}>Datos Generales</Text>
        <View style={styles.table}>
          {generalRows(shippingDetail).map(({ label, value }, i) => (
            <View style={i % 2 !== 0 ? styles.rowPair : styles.row} key={`${i}-${value}`}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.generalDataLabel}>Estado de la publicación</Text>
        <View style={styles.table}>
          {publicationProcessRows(shippingDetail).map(({ label, value }, i) => (
            <View style={i % 2 !== 0 ? styles.rowPair : styles.row} key={`${i}-${value}`}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.generalDataLabel}>Historico</Text>
        <View style={styles.table}>
          {shippingDetail.logStatus?.map(({ date, description }, i) => (
            <View style={i % 2 !== 0 ? styles.rowPair : styles.row} key={`${i}-${date}`}>
              <Text style={styles.rowLabel}>{date}</Text>
              <Text style={styles.rowValue}>{description}</Text>
            </View>
          ))}
        </View>
        {shippingDetail.signers && (
          <>
            <Text style={styles.generalDataLabel}>Firmantes</Text>
            <View style={styles.table}>
              {shippingDetail.signers.result.map(({ signerIdentifier, signerName, signerDate }, i) => (
                <View style={i % 2 === 0 ? styles.rowPair : styles.row} key={`${i}-${document}`}>
                  <Text style={{ ...styles.rowLabel, width: '50%' }}>{signerName}</Text>
                  <Text style={{ ...styles.rowLabel, width: '15%', textAlign: 'center' }}>{signerIdentifier}</Text>
                  <Text style={{ ...styles.rowValue, width: '35%', textAlign: 'right' }}>{signerDate}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFDownload;
