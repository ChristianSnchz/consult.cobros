/* eslint-disable import/prefer-default-export */
import fetchCore from '../api/core';
import { DocTypeResponseType } from '../contexts/interfaces';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getAllPublicationType = async () => {
  try {
    return await fetchCore<DocTypeResponseType>({
      url: `${BFF_URL}/publicationTypes`,
      method: 'GET'
    });
  } catch (e) {
    console.error('Error when getting publicationTypes', e);
    throw e;
  }
};

export { getAllPublicationType };
