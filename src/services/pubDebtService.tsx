import fetchCore from '../api/core';
import downloadFiles from '../utils/fileUtils/downloadFiles';
import { IDebtsResponse, IPubDebtParams } from '../contexts/PubDebContext/interfaces';
import blobToFile from '../utils/fileUtils/blobToFile';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const searchPubDebt = (params: IPubDebtParams) =>
  fetchCore<IDebtsResponse>({
    url: `${BFF_URL}/debts/`,
    params,
    method: 'GET'
  });

const downloadPubDebts = async (params: IPubDebtParams, csvYesterday = false): Promise<void> => {
  const data = await fetchCore<Blob>({
    url: `${BFF_URL}/debts/`,
    method: 'GET',
    params,
    blob: true
  });
  if (!csvYesterday) {
    downloadFiles(blobToFile(data, 'DeudaPublicada.csv'));
  } else {
    downloadFiles(blobToFile(data, 'DeudaPublicadaAcuerdo.csv'));
  }
};
export { searchPubDebt, downloadPubDebts };
