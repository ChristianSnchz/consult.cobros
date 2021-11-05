import React from 'react';
import '@testing-library/jest-dom';
import theme from '@santander/obp-ui/lib/theme';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import ShippingPub from '../src/views/ShippingPub/ShippingPub';
import filtersObject from '../src/views/ShippingPub/filters.json';
import { FilterContext } from '../src/contexts/FilterContext';
import { ShippingPubContext } from '../src/contexts/ShippingPubContext/index';
import { TableContext, TableContextProps } from '../src/contexts/TableContext';
import { FilterContextProps } from '../src/contexts/FilterContext/interfaces';
import { AppContext, IAppContext } from '../src/contexts/AppContext';
import { ShippingPubProps } from '../src/contexts/ShippingPubContext/interfaces';

const initialProps: IAppContext = {
  isMobile: null,
  hasErrors: false,
  width: 1000,
  title: '',
  setTitle: jest.fn(),
  setIsLoading: jest.fn(),
  setHasErrors: jest.fn(),
  isLoading: false
};

const initialTablePropsMock: TableContextProps = {
  handleRowsPerPage: jest.fn(),
  handleSort: jest.fn(),
  handleChangePage: jest.fn(),
  filterTable: {
    limit: '10',
    offset: '0'
  }
};

const initialFilterPropsMock: FilterContextProps = {
  filters: filtersObject,
  handleFilters: jest.fn(),
  setFilters: jest.fn(),
  appliedFilters: {}
};

const initialShippingPubProps: ShippingPubProps = {
  isInitial: false,
  hasError: false,
  data: { agreement: null, list: [], mobileList: [], total: '0' },
  params: {}
};

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <AppContext.Provider value={initialProps}>
          <MemoryRouter>
            <FilterContext.Provider value={initialFilterPropsMock}>
              <TableContext.Provider value={initialTablePropsMock}>
                <ShippingPubContext.Provider value={initialShippingPubProps}>
                  <ShippingPub />
                </ShippingPubContext.Provider>
              </TableContext.Provider>
            </FilterContext.Provider>
          </MemoryRouter>
        </AppContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should ', () => {
  renderInputFile();
});
