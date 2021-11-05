import React, { createContext, useState } from 'react';
import constant from 'lodash/constant';
import { useLocation } from 'react-router';
import { isEqual } from 'lodash';
import { useAnalytics } from '@santander/analytics-empresas';
import { FilterContextProps, IFilterField, IFilterObject } from './interfaces';

export const initialProps: FilterContextProps = {
  filters: null,
  handleFilters: constant,
  appliedFilters: {},
  setFilters: constant
};
const FilterContext = createContext(initialProps);
const FilterProvider = ({ children, filtersObject }) => {
  const [appliedFilters, setAppliedFilters] = useState(initialProps.appliedFilters);
  const { pathname } = useLocation();
  const [filters, setFilters] = useState(filtersObject);
  const { triggerEvent } = useAnalytics({ url: pathname });

  const handleFilters = (newFilters: IFilterObject) => {
    triggerEvent(`usa-filtros: ${JSON.stringify(Object.keys(newFilters)?.join(','))}`, 'click');
    setFilters(newFilters);

    const newAppliedFilters = {};
    Object.entries(newFilters).forEach(obj => {
      const filterField: IFilterField = obj[1];
      if (filterField.value && !filterField.disabled) {
        newAppliedFilters[obj[0]] = filterField.value;
      }
    });
    if (!isEqual(appliedFilters, newAppliedFilters)) setAppliedFilters(newAppliedFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        handleFilters,
        setFilters,
        appliedFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export { FilterContext };
export default FilterProvider;
