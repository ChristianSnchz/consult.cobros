/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { constant, isEmpty } from 'lodash';

import { AppContext } from '../AppContext';
import { FilterContext } from '../FilterContext';
import { TableContext } from '../TableContext';
import { IShippingPubParams, ShippingPubProps } from './interfaces';
import { searchShippingsPub } from '../../services/shippingPubService';
import { onErrorResponse, onSuccessResponse } from './handleResponse';

export const initialProps: ShippingPubProps = {
  isInitial: true,
  hasError: false,
  setNewRequest: constant,
  data: { agreement: null, list: [], total: '0' },
  params: {}
};

const ShippingPubContext = createContext(initialProps);

const ShippingPubProvider = ({ children }) => {
  const { isMobile, setIsLoading } = useContext(AppContext);
  const { appliedFilters } = useContext(FilterContext);
  const { filterTable } = useContext(TableContext);
  const [shippingPubState, setShippingPubState] = useState(initialProps);
  const [newRequest, setNewRequest] = useState<number>(0);
  const [params, setParams] = useState<IShippingPubParams>(filterTable);
  const paramsMemoized = useMemo(() => ({ ...params, newRequest }), [params, newRequest]);
  const { isLoading, isFetching, isError } = useQuery(
    ['shippingsPub', paramsMemoized],
    () => searchShippingsPub(params),
    {
      keepPreviousData: true,
      enabled: !shippingPubState.isInitial,
      retry: 3,
      retryDelay: 5 * 1000,
      onSuccess: newData => onSuccessResponse({ newData, setShippingPubState, isMobile }),
      onError: () => onErrorResponse({ setShippingPubState })
    }
  );

  const appliedFiltersToParams = filters => {
    const newParams = { ...filters, dateFrom: filters.date?.start, dateTo: filters.date?.end };
    delete newParams.date;
    return newParams;
  };

  useEffect(() => {
    if (!shippingPubState.isInitial) {
      setIsLoading(isLoading || isFetching);
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (!isEmpty(appliedFilters)) {
      const newParams = appliedFiltersToParams(appliedFilters);
      setParams(prev => ({ ...newParams, offset: '0', limit: prev.limit }));
      setShippingPubState(prev => ({ ...prev, data: { ...prev.data, list: [] }, isInitial: false }));
    }
  }, [appliedFilters]);

  useEffect(() => {
    setParams(prev => ({ ...prev, ...filterTable }));
  }, [filterTable]);

  return (
    <ShippingPubContext.Provider
      value={{
        ...shippingPubState,
        hasError: isError,
        setNewRequest,
        params
      }}
    >
      {children}
    </ShippingPubContext.Provider>
  );
};
export { ShippingPubContext };
export default ShippingPubProvider;
