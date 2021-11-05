import React, { FC, useContext, useState } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import ModalProvider from '../../contexts/ModalContext';
import { PageContainer } from '../../containers/styles';
import TableProvider from '../../contexts/TableContext';
import FiltersProvider from '../../contexts/FilterContext';
import filtersObject from './filters.json';
import ShippingPubContainer from './ShippingPub';
/** Context */
import ShippingPubProvider from '../../contexts/ShippingPubContext';
import { AppContext } from '../../contexts/AppContext';
import GeneralErrors from '../../components/commons/GeneralErrrors';

const DebtShipping: FC = () => {
  const startDate = new Date();
  const { isMobile, hasErrors, setHasErrors } = useContext(AppContext);
  const { push } = useHistory();
  const initialDate = {
    start: format(startDate.setDate(startDate.getDate() - 5), 'dd/MM/yyyy'),
    end: format(new Date(), 'dd/MM/yyyy')
  };

  filtersObject.date.value = initialDate;

  return (
    <FiltersProvider filtersObject={filtersObject}>
      <TableProvider>
        <ShippingPubProvider>
          <ModalProvider>
            <PageContainer isMobile={isMobile}>
              <GeneralErrors hasErrors={hasErrors} setHasErrors={setHasErrors} onNotRetry={() => push('/')}>
                <ShippingPubContainer />
              </GeneralErrors>
            </PageContainer>
          </ModalProvider>
        </ShippingPubProvider>
      </TableProvider>
    </FiltersProvider>
  );
};

export default DebtShipping;
