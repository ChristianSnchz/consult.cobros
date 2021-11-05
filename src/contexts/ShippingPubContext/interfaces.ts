import { Dispatch, SetStateAction } from 'react';

export interface IShippingSigner {
  signerIdentifier: string;
  signerState: string;
  historicalDate: string;
  signerDate: string;
  signerName: string;
}
export interface IShippingSigners {
  authorizationrequestid: string;
  result: IShippingSigner[];
}

export interface IRejectedShippingParam {
  formatType: 'json';
}

interface IErrorRejection {
  errorCode: string;
  description: string;
}

export interface IRejections {
  registryId: string;
  operationType: string;
  currency: string;
  customerNumber: string;
  documentType: string;
  documentId: string;
  instance: string;
  customerCuit: string;
  errors: IErrorRejection[];
}

interface IRejectedShippingDetail {
  sendingNumber: string;
  lastSettlement: string;
  batchProcessing: string;
  refreshDebt: string;
}

export interface IRejectedShippingResponse {
  agreement: string;
  detail: IRejectedShippingDetail;
  rejections: IRejections[];
}

export interface IShippingInfo {
  id: string;
  shippingNumber: string;
  codeStatus: string;
  status: string;
  dischargeDate: string;
  totalRegsInf: string;
  numberBaseRioserv: string;
  totalAmountExp1: string;
  totalAmountExp2: string;
}

export interface IStatusShipping {
  date: string;
  description: string;
}

export interface IShippingDetail {
  agreement: string;
  channel: string;
  sendingNumber: string;
  totalRegsInf: string;
  totalAmountExp1: string;
  totalAmountExp2: string;
  codeStatus: string;
  status: string;
  dischargeDate: string;
  numberBaseRioserv: string;
  numberLastRendition: string;
  movementsProcesed: string;
  movementsAccepted: string;
  movementsRejected: string;
  registersValidated: string;
  codeResultValidation: string;
  descriptionValidation: string;
  idRequest: string;
  typeFormat: string;
  logQuantity: string;
  logStatus: IStatusShipping[];
  signers: IShippingSigners;
}

export interface IShippingPubResponse {
  agreement: string;
  offset: number;
  limit: number;
  total: number;
  channel: string;
  shippingsQuantity: number;
  shippingsInfo: IShippingInfo[];
}

export interface ShippingPubProps {
  isInitial: boolean;
  setNewRequest?: Dispatch<SetStateAction<number>>;
  hasError: boolean;
  data: { list: IShippingInfo[]; total: string; agreement: string };
  params: any;
}

export interface IShippingPubParams {
  agreement?: string;
  newRequest: number;
  shippingNumber?: string;
  offset: string;
  limit: string;
  dateFrom: string;
  dateTo: string;
}
