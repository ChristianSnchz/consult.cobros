import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import ModalProvider from '../../contexts/ModalContext';
import { PageContainer } from '../../containers/styles';
import TableProvider from '../../contexts/TableContext';
import FiltersProvider from '../../contexts/FilterContext';
import PubDebProvider from '../../contexts/PubDebContext';
import filtersObject from './filters.json';

/** Context */
import PubDebtContainer from './PubDebt';
import { AppContext } from '../../contexts/AppContext';
import GeneralErrors from '../../components/commons/GeneralErrrors';

const PubDebt: FC = () => {
  const { isMobile, setHasErrors, hasErrors } = useContext(AppContext);
  const { push } = useHistory();

  return (
    <FiltersProvider filtersObject={filtersObject}>
      <TableProvider>
        <PubDebProvider>
          <ModalProvider>
            <PageContainer isMobile={isMobile}>
              <GeneralErrors hasErrors={hasErrors} setHasErrors={setHasErrors} onNotRetry={() => push('/')}>
                <PubDebtContainer />
              </GeneralErrors>
            </PageContainer>
          </ModalProvider>
        </PubDebProvider>
      </TableProvider>
    </FiltersProvider>
  );
};

export default PubDebt;
