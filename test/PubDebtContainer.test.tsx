import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import theme from '@santander/obp-ui/lib/theme';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import PubDebt from '../src/views/PubDebt/PubDebt';
import { TableContext, TableContextProps } from '../src/contexts/TableContext';
import { FilterContext } from '../src/contexts/FilterContext';
import { FilterContextProps } from '../src/contexts/FilterContext/interfaces';
import { PubDebtContext } from '../src/contexts/PubDebContext/index';
import { PubDebtProps } from '../src/contexts/PubDebContext/interfaces';
import filtersObject from '../src/views/PubDebt/filters.json';
import { QueryClientProvider, QueryClient } from 'react-query';

jest.mock('../src/utils/hooks/index', () => ({
  useWindowSize: () => ({ width: 980, widthOuter: 1000 })
}));

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => jest.fn()
}));

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

let initialPubDebtPropsMock: PubDebtProps = {
  isInitial: true,
  hasError: false,
  data: { list: [], mobileList: [], total: '0' },
  showDownloadAll: false,
  setShowDownloadAll: jest.fn(),
  params: {}
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <FilterContext.Provider value={initialFilterPropsMock}>
          <TableContext.Provider value={initialTablePropsMock}>
            <PubDebtContext.Provider value={initialPubDebtPropsMock}>
                <QueryClientProvider client={new QueryClient()}>
                 <PubDebt />
                </QueryClientProvider>
            </PubDebtContext.Provider>
          </TableContext.Provider>
        </FilterContext.Provider>
      </MemoryRouter>
    </ThemeProvider>
  );

test('should render component PubDebtContainer Desktop', async () => {
  renderInputFile();

  const titleDesktop = await screen.findByTestId('title');
  expect(titleDesktop.textContent).toBe('Completá estos datos para iniciar tu consulta');
});

