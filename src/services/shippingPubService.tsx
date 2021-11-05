/* eslint-disable import/prefer-default-export */
import fetchCore from '../api/core';
import {
  IShippingDetail,
  IShippingPubParams,
  IShippingPubResponse,
  IRejectedShippingParam,
  IRejectedShippingResponse
} from '../contexts/ShippingPubContext/interfaces';
import downloadFiles from '../utils/fileUtils/downloadFiles';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const searchShippingsPub = (oldParams: IShippingPubParams) => {
  const params = oldParams;
  delete params.newRequest;
  return fetchCore<IShippingPubResponse>({
    url: `${BFF_URL}/shippings`,
    params,
    method: 'GET'
  });
};

const deleteShippingsPub = (id: string): Promise<any> =>
  fetchCore<IShippingPubResponse>({
    url: `${BFF_URL}/shipping/${id}`,
    method: 'DELETE'
  });

const getRejectedShippingById = (id: string, params: IRejectedShippingParam): Promise<any> =>
  fetchCore<IRejectedShippingResponse>({
    url: `${BFF_URL}/shipping/${id}/rejected`,
    method: 'GET',
    params
  });

const downloadRejectedShipping = async (id: string): Promise<void> => {
  const file = await fetchCore<File>({
    url: `${BFF_URL}/shipping/${id}/rejected`,
    method: 'GET',
    blob: true
  });
  downloadFiles(file);
};

const getShippingById = (id: string): Promise<IShippingDetail> =>
  fetchCore<IShippingDetail>({
    url: `${BFF_URL}/shipping/${id}`,
    method: 'GET'
  });

export { searchShippingsPub, deleteShippingsPub, getShippingById, getRejectedShippingById, downloadRejectedShipping };
