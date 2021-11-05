import React, { FC } from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { IRejectedShippingResponse, IShippingInfo } from '../../../../contexts/ShippingPubContext/interfaces';
import { styles } from '../../../commons/modalStyles';

interface IPDFDowndloadProps {
  shippingInfo: IShippingInfo;
  rejectedShipping: IRejectedShippingResponse;
}

const generalRows = (shippingInfo: IShippingInfo, rejectedShipping: IRejectedShippingResponse) => [
  { label: 'Número de envío', value: shippingInfo.shippingNumber },
  { label: 'Cantidad de registros informados', value: shippingInfo.totalRegsInf },
  { label: 'Importe 1er vencimiento', value: shippingInfo.totalAmountExp1 },
  { label: 'Tipo de proceso', value: rejectedShipping.detail.batchProcessing }
];

const PDFDownload: FC<IPDFDowndloadProps> = ({ shippingInfo, rejectedShipping }) => (
  <Document data-testid="rejected-pdf">
    <Page style={styles.page} size="A4">
      <Text style={styles.docDetailTitle}>Detalle del documento</Text>
      <Text data-testid="publication-test-pdf" style={styles.mainDataLabel}>
        Estado de la operación
      </Text>
      <Text style={styles.mainDataValue}>{shippingInfo.status}</Text>
      <View style={styles.subDataContainer}>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>Fecha de alta:</Text>
          <Text style={styles.infoValue}>{shippingInfo.dischargeDate}</Text>
        </View>
        <View style={styles.subData}>
          <Text style={styles.infoLabel}>Acuerdo:</Text>
          <Text style={styles.infoValue}>{rejectedShipping.agreement}</Text>
        </View>
      </View>

      <View style={styles.divisionOne} />

      <View style={styles.generalDataWrapper}>
        <Text style={styles.generalDataLabel}>Datos Generales</Text>
        <View style={styles.table}>
          {generalRows(shippingInfo, rejectedShipping).map(({ label, value }, i) => (
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

export default PDFDownload;
