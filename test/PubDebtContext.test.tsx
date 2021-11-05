/* eslint-disable spaced-comment */
import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import userEvent from '@testing-library/user-event';
import PubDebtProvider, { PubDebtContext } from '../src/contexts/PubDebContext/index';
import { TableContext, TableContextProps } from '../src/contexts/TableContext';
import { FilterContext } from '../src/contexts/FilterContext';
import { FilterContextProps } from '../src/contexts/FilterContext/interfaces';
import { AppContext, IAppContext } from '../src/contexts/AppContext';
import filtersObject from '../src/views/PubDebt/filters.json';

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      text: jest.fn(),
      json: () =>
        Promise.resolve(
          JSON.stringify([
            {
              id: '1',
              date: '25/11/2021',
              agreement: '307000555557545444444PRUEBAAAAAAAAAAAAAAAA',
              formatType: 'txt',
              fileName: 'test_17'
            },
            {
              id: '2',
              date: '22/11/2021',
              agreement: '3454896565444444PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
              formatType: 'txt',
              fileName: 'test_17'
            }
          ])
        )
    })
);

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const initialPropsAppMock: IAppContext = {
  isMobile: true,
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

const initialFilterPropsMock: FilterContextProps = {
  filters: filtersObject,
  handleFilters: jest.fn(),
  setFilters: jest.fn(),
  appliedFilters: {}
};

const TestComponent: FC = () => {
  const { isInitial, hasError, data, showDownloadAll, setShowDownloadAll, params } =
    useContext(PubDebtContext);

  return (
    <>
      {Object.values(params).length === 0 ? (
        <p data-testid="filters">No hay filtros</p>
      ) : (
        <p data-testid="filters">{JSON.stringify(params)}</p>
      )}
    </>
  );
};

test('should setFilters ', async () => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={initialPropsAppMock}>
        <FilterContext.Provider value={initialFilterPropsMock}>
          <TableContext.Provider value={initialTablePropsMock}>
            <QueryClientProvider client={new QueryClient()}>
              <PubDebtProvider>
                <TestComponent />
              </PubDebtProvider>
            </QueryClientProvider>
          </TableContext.Provider>
        </FilterContext.Provider>
      </AppContext.Provider>
    </MemoryRouter>
  );

  // const buttonfilter = screen.getByTestId('button-filters');
  // const filterdmmy = screen.getByTestId('filters');
  // act(() => {
  //   userEvent.click(buttonfilter);
  // });
  // expect(filterdmmy.textContent).toBe(JSON.stringify(filter));
});
