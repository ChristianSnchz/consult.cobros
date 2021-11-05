import React, { Dispatch } from 'react';

export interface IDebts {
  client: {
    clientNumber: string;
    clientCuit: string;
    businessName: string;
  };
  debt: {
    agreement: {
      cuit: string;
      product: number;
      instance: number;
      companyName: string;
    };
    description: number;
    errorDebin: number;
    documentType: string;
    amount: number;
    documentNumber: string;
    documentDescription: string;
    paymentNumber: string;
    expirationDate: string;
    documentAmount: number;
    prontoPagoDate: string;
    prontoPagoAmount: number;
    interestRatePunishment: number;
    punishmentAmount: number;
    IVARate: number;
    debinId?: string;
    additionalIVARate: number;
  };
}

export interface IDebtsResponse {
  debts: IDebts[];
  total: string;
}

export interface IPubDebtParams {
  agreement?: string;
  clientNumber?: string;
  documentNumber?: string;
  documentType?: string;
  offset: string;
  limit: string;
  download?: boolean;
}

export interface PubDebtProps {
  isInitial: boolean;
  hasError: boolean;
  data: { list: IDebts[]; total: string };
  showDownloadAll?: string;
  setShowDownloadAll: Dispatch<React.SetStateAction<string>>;
  params: any;
}
