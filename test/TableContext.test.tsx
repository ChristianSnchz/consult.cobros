/* eslint-disable spaced-comment */
import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { IDataTableColumn } from 'react-data-table-component';
import userEvent from '@testing-library/user-event';
import TableProvider, { TableContext } from '../src/contexts/TableContext';
import { IAppContext, AppContext } from '../src/contexts/AppContext';

const initialPropsAppMock: IAppContext = {
  title: 'Hola',
  setTitle: jest.fn(),
  isMobile: true,
  width: 500
};

const column: IDataTableColumn = {
  id: 10,
  name: '',
  selector: 'pepe',
  sortable: true,
  sortFunction: jest.fn(),
  format: jest.fn(),
  cell: jest.fn(),
  grow: 2,
  width: 'string',
  minWidth: 'string',
  maxWidth: 'string',
  right: true,
  center: false,
  compact: false,
  ignoreRowClick: false,
  button: false,
  wrap: false,
  hide: 'sm',
  allowOverflow: false,
  omit: false
};

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

const filter: any = {
  agreement: 'UHDUHDUWHDW',
  amount: '1234',
  clientCuit: '1234',
  clientNumber: '1234',
  compNumber: '1234',
  compType: '1',
  razonSocial: '1234'
};

const TestComponent: FC = () => {
  const { filterTable, handleChangePage, handleRowsPerPage } = useContext(TableContext);

  return (
    <>
      {filterTable.offset === '0' ? (
        <p data-testid="offset">{filterTable.offset}</p>
      ) : (
        <p data-testid="offset">{filterTable.offset}</p>
      )}

      {filterTable.limit === '0' ? (
        <p data-testid="limit">{filterTable.limit}</p>
      ) : (
        <p data-testid="limit">{filterTable.limit}</p>
      )}

      <button data-testid="button-handleChangePage" onClick={() => handleChangePage(2)}></button>

      <button data-testid="button-handleRowsPerPage" onClick={() => handleRowsPerPage(100)}></button>
    </>
  );
};

// test('should setFilters ', async () => {
//   render(
//     <MemoryRouter>
//       <QueryClientProvider client={new QueryClient()}>
//         <TableProvider>
//           <TestComponent />
//         </TableProvider>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );

//   const buttonfilter = screen.getByTestId('button-filters');
//   const filterdmmy = screen.getByTestId('filters');
//   act(() => {
//     userEvent.click(buttonfilter);
//   });
//   expect(filterdmmy.textContent).toBe(JSON.stringify(filter));
// });

test('should handleChangePage ', async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        <TableProvider>
          <TestComponent />
        </TableProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const page = screen.getByTestId('offset');
  expect(page.textContent).toBe('0');
  const buttonfilter = screen.getByTestId('button-handleChangePage');
  act(() => {
    userEvent.click(buttonfilter);
  });
  expect(page.textContent).toBe('10');
});

test('should handleRowsPerPage ', async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        <TableProvider>
          <TestComponent />
        </TableProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const limit = screen.getByTestId('limit');
  expect(limit.textContent).toBe('10');
  const buttonfilter = screen.getByTestId('button-handleRowsPerPage');
  act(() => {
    userEvent.click(buttonfilter);
  });
  expect(limit.textContent).toBe('100');
});

test('should handleRowsPerPage ', async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AppContext.Provider value={initialPropsAppMock}>
          <TableProvider>
            <TestComponent />
          </TableProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const limitperpage = screen.getByTestId('limit');

  expect(limitperpage.textContent).toBe('10');
});

// test('should handleSort ', async () => {
//   render(
//     <MemoryRouter>
//       <QueryClientProvider client={new QueryClient()}>
//         <AppContext.Provider value={initialPropsAppMock}>
//           <TableProvider>
//             <TestComponent />
//           </TableProvider>
//         </AppContext.Provider>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );

//   const sort = screen.getByTestId('sort');
//   const buttonHandlerSort = screen.getByTestId('button-handleSort');
//   act(() => {
//     userEvent.click(buttonHandlerSort);
//   });
//   expect(sort.textContent).toBe('asc');
// });

// test('should change limit to 4 in mobile ', async () => {
//   render(
//     <MemoryRouter>
//       <QueryClientProvider client={new QueryClient()}>
//         <AppContext.Provider value={initialPropsAppMock}>
//           <TableProvider>
//             <TestComponent />
//           </TableProvider>
//         </AppContext.Provider>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );

//   const limit = screen.getByTestId('limit');
//   expect(limit.textContent).toBe('4');
//   const buttonfilter2 = screen.getByTestId('button-handleRowsPerPage');
//   act(() => {
//     userEvent.click(buttonfilter2);
//   });

//   const buttonfilter = screen.getByTestId('button-filters');
//   const filterdmmy = screen.getByTestId('filters');
//   act(() => {
//     userEvent.click(buttonfilter);
//   });
//   expect(filterdmmy.textContent).toBe(JSON.stringify(filter));
// });
