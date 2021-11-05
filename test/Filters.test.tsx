import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';

import Filters, { IFilterObject } from '../src/components/commons/FiltersBox';
import { PubDebtContext } from '../src/contexts/PubDebContext/index';
import { PubDebtProps } from '../src/contexts/PubDebContext/interfaces';
import { FilterContext } from '../src/contexts/FilterContext';
import { FilterContextProps } from '../src/contexts/FilterContext/interfaces';
import filtersObject from '../src/views/PubDebt/filters.json';

const initialPropsMock: PubDebtProps = {
  isInitial: true,
  hasError: false,
  data: { list: [], mobileList: [], total: '0' },
  showDownloadAll: false,
  setShowDownloadAll: jest.fn(),
  params: {}
};

let initialFilterPropsMock: FilterContextProps = {
  filters: filtersObject,
  handleFilters: jest.fn(),
  appliedFilters: {},
  setFilters: jest.fn()
};

const renderInputFile = (isMobile, filterMobile, setfilterMobile) =>
  render(
    <ThemeProvider theme={theme}>
      <FilterContext.Provider value={initialFilterPropsMock}>
        <PubDebtContext.Provider value={initialPropsMock}>
          <Filters
            isMobile={isMobile}
            filtersObject={initialFilterPropsMock.filters as unknown as IFilterObject}
            onApplyFilters={initialFilterPropsMock.handleFilters}
            filterMobile={filterMobile}
            setfilterMobile={setfilterMobile}
          />
        </PubDebtContext.Provider>
      </FilterContext.Provider>
    </ThemeProvider>
  );

test('should handle aplicar btn', () => {
  initialFilterPropsMock = {
    ...initialFilterPropsMock,
    filters: {
      ...initialFilterPropsMock.filters,
      agreement: { ...initialFilterPropsMock.filters.agreement, value: 'agreement123' },
      clientNumber: { ...initialFilterPropsMock.filters.clientNumber, value: '000000000002845' }
    }
  };

  renderInputFile(false, false, null);
  const Btnaplicar = screen.queryByTestId('btn-aplicar');
  userEvent.click(Btnaplicar);
  expect(initialFilterPropsMock.handleFilters).toBeCalledTimes(1);
});
