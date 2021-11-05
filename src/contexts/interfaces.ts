export interface IAgreementResponse {
  agreement: string;
}

export type AgreementsResponseType = IAgreementResponse[];

interface IDocTypeResponse {
  value: string;
  label: string;
}

export type DocTypeResponseType = IDocTypeResponse[];
