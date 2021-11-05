import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import theme from '@santander/obp-ui/lib/theme';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import PubDebt from '../src/views/PubDebt/PubDebt';
import { TableContext, TableContextProps } from '../src/contexts/TableContext';
import { FilterContext } from '../src/contexts/FilterContext';
import { FilterContextProps } from '../src/contexts/FilterContext/interfaces';
import { PubDebtContext } from '../src/contexts/PubDebContext/index';
import { PubDebtProps } from '../src/contexts/PubDebContext/interfaces';
import { AppContext, IAppContext } from '../src/contexts/AppContext';
import filtersObject from '../src/views/PubDebt/filters.json';

global.scrollTo = jest.fn().mockImplementation(() => ({
  top: 0,
  behavior: 'smooth'
}));

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve('text response')
    })
);

jest.mock('../src/utils/hooks/index', () => ({
  useWindowSize: () => ({ width: 400, widthOuter: 700 })
}));

jest.mock('../src/api/core', () => ({
  fetchCore: () => ({ name: 'txt' })
}));

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const initialPropsAppMock: IAppContext = {
  isMobile: true,
  hasErrors: false,
  setTitle: jest.fn(),
  title: '',
  width: 500,
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

let initialFilterPropsMock: FilterContextProps = {
  filters: filtersObject,
  handleFilters: jest.fn(),
  setFilters: jest.fn(),
  appliedFilters: {}
};

let initialPubDebtPropsMock: PubDebtProps = {
  isInitial: true,
  hasError: false,
  data: { list: [], mobileList: [], total: '0' },
  showDownloadAll: '',
  setShowDownloadAll: jest.fn(),
  params: {}
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <AppContext.Provider value={initialPropsAppMock}>
            <FilterContext.Provider value={initialFilterPropsMock}>
              <TableContext.Provider value={initialTablePropsMock}>
                <PubDebtContext.Provider value={initialPubDebtPropsMock}>
                  <PubDebt />
                </PubDebtContext.Provider>
              </TableContext.Provider>
            </FilterContext.Provider>
          </AppContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should load component empty ', async () => {
  // initialPubDebtPropsMock = {
  //   ...initialTablePropsMock,
  //   data:{ }
  //   debtsAccumulatedList: []
  // };
  initialFilterPropsMock = {
    ...initialFilterPropsMock,
    filters: {
      ...initialFilterPropsMock.filters,
      agreement: { ...initialFilterPropsMock.filters.agreement, value: 'agreement123' },
      clientNumber: { ...initialFilterPropsMock.filters.clientNumber, value: '000000000002845' }
    }
  };
  renderInputFile();
  await userEvent.click(screen.queryByTestId('btn-aplicar'));
  await screen.findByText('Elegí los filtros de búsqueda');
});

test('should load component with error ', async () => {
  initialPubDebtPropsMock = {
    ...initialPubDebtPropsMock,
    hasError: true,
    isInitial: false
  };
  initialFilterPropsMock = {
    ...initialFilterPropsMock,
    filters: {
      ...initialFilterPropsMock.filters,
      agreement: { ...initialFilterPropsMock.filters.agreement, value: 'agreement123' },
      clientNumber: { ...initialFilterPropsMock.filters.clientNumber, value: '000000000002845' }
    }
  };
  renderInputFile();
  await userEvent.click(screen.queryByTestId('btn-aplicar'));
  // await screen.findByText('Tuvimos un error. Por favor, intentá nuevamente.');
});
