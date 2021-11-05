/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, FC, useEffect, useContext, Dispatch } from 'react';
import { useQuery } from 'react-query';
import constant from 'lodash/constant';
import { isEmpty } from 'lodash';
import { searchPubDebt } from '../../services/pubDebtService';
import { AppContext } from '../AppContext';
import { FilterContext } from '../FilterContext';
import { TableContext } from '../TableContext';
import { IPubDebtParams, PubDebtProps } from './interfaces';
import { onSuccessResponse, onErrorResponse } from './handleResponse';

export const initialProps: PubDebtProps = {
  isInitial: true,
  hasError: false,
  data: { list: [], total: '0' },
  showDownloadAll: null,
  setShowDownloadAll: constant,
  params: {}
};

const PubDebtContext = createContext(initialProps);

const PubDebtProvider = ({ children }) => {
  const { isMobile, setIsLoading } = useContext(AppContext);
  const { setFilters, appliedFilters } = useContext(FilterContext);
  const { filterTable } = useContext(TableContext);
  const [pubDebState, setPubDebState] = useState(initialProps);
  const [showDownloadAll, setShowDownloadAll] = useState<string>(initialProps.showDownloadAll);
  const [params, setParams] = useState<IPubDebtParams>(filterTable);

  const { isLoading, isFetching, isError } = useQuery(['pubDebt', params], () => searchPubDebt(params), {
    keepPreviousData: true,
    enabled: !pubDebState.isInitial,
    retry: 3,
    retryDelay: 5 * 1000,
    onSuccess: newData => {
      onSuccessResponse({ newData, setPubDebState, isMobile, setFilters });
    },
    onError: error => {
      onErrorResponse({ setPubDebState });
    }
  });

  useEffect(() => {
    if (!isEmpty(appliedFilters)) {
      setParams(prev => ({ ...appliedFilters, offset: '0', limit: prev.limit }));
      setPubDebState(prev => ({ ...prev, data: { ...prev.data, list: [] }, isInitial: false }));
    }
  }, [appliedFilters]);

  useEffect(() => {
    setParams(prev => ({ ...prev, ...filterTable }));
  }, [filterTable]);

  useEffect(() => {
    if (!pubDebState.isInitial) {
      setIsLoading(isLoading || isFetching);
    }
  }, [isLoading, isFetching]);

  return (
    <PubDebtContext.Provider
      value={{
        ...pubDebState,
        hasError: isError,
        showDownloadAll,
        setShowDownloadAll,
        params
      }}
    >
      {children}
    </PubDebtContext.Provider>
  );
};
export { PubDebtContext };
export default PubDebtProvider;
