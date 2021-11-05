/* eslint-disable import/prefer-default-export */
import fetchCore from '../api/core';
import { AgreementsResponseType } from '../contexts/interfaces';

const getAllAgreements = async () => {
  try {
    return await fetchCore<AgreementsResponseType>({
      url: `${BFF_URL}/agreements`,
      method: 'GET'
    });
  } catch (e) {
    console.error('Error when getting agreements', e);
    throw e;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getAllAgreementsSelect = async () => {
  const agreements = await getAllAgreements();
  return agreements.map(a => ({ value: a.agreement, label: a.agreement }));
};

export { getAllAgreementsSelect };
