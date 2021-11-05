/* eslint-disable import/prefer-default-export */
import fetchCore from '../api/core';
import { DocTypeResponseType } from '../contexts/interfaces';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getAllDocumentTypes = async () => {
  try {
    return await fetchCore<DocTypeResponseType>({
      url: `${BFF_URL}/comprobants/types`,
      method: 'GET'
    });
  } catch (e) {
    console.error('Error when getting document types', e);
    throw e;
  }
};

export { getAllDocumentTypes };
