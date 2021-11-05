import React, { FC } from 'react';
import '@testing-library/jest-dom';
import theme from '@santander/obp-ui/lib/theme';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import TableBox, { ITableBoxProps, ITableContextProps } from '../src/components/commons/TableBox';

import { AppContext, IAppContext } from '../src/contexts/AppContext';

const ContextProps: ITableContextProps = {
  dataList: [
    {
      id: 'pepe',
      client: {
        clientNumber: '00000000000001',
        clientCuit: '20347398811',
        businessName: 'FUTBOLISTAS AGREMIADOS'
      },
      debt: {
        agreement: {
          cuit: '30700005573',
          product: 1,
          instance: 1,
          companyName: 'INTERKYT'
        },
        description: 0,
        errorDebin: 0,
        documentType: 'AP',
        documentNumber: '000000001565454',
        documentDescription: 'DEUDA PRUEBA',
        paymentNumber: '0000',
        expirationDate: '2021-12-31',
        documentAmount: 10000,
        prontoPagoDate: '2021-05-31',
        prontoPagoAmount: 9000,
        interestRatePunishment: 0,
        punishmentAmount: 0,
        IVARate: 0,
        additionalIVARate: 0,
        amount: 10000
      }
    }
  ],
  handleChangePage: jest.fn(),
  handleRowsPerPage: jest.fn(),
  handleSort: jest.fn(),
  isInitial: false,
  params: { limit: '10', offset: '0' },
  accumulatedList: [
    {
      client: {
        clientNumber: '000030502438537',
        clientCuit: '30502438537',
        businessName: 'MC PAPER ARG                  '
      },
      debt: {
        agreement: {
          cuit: '305024385370',
          product: 1,
          instance: 1,
          companyName: 'INTERKYT                      '
        },
        description: 0,
        errorDebin: 0,
        documentType: 'AP',
        documentNumber: 'char especial #',
        documentDescription: 'Anticipo',
        paymentNumber: '0000',
        expirationDate: '01/01/9999',
        documentAmount: 9.99,
        prontoPagoDate: '00000000',
        prontoPagoAmount: 0,
        interestRatePunishment: 0,
        punishmentAmount: 0,
        IVARate: 0,
        additionalIVARate: 0,
        amount: 9.99,
        observation1: '',
        observation2: '',
        observation3: '',
        observation4: '',
        observation5: '',
        debinId: '1'
      }
    }
  ],
  totalRows: '',
  hasError: false
  // clear: false,
  // filters: filtersObject,
  // handleFilters: jest.fn(),
  // agreements: [],
};

let initialProps: IAppContext = {
  isMobile: null,
  width: 1000,
  title: '',
  hasErrors: false,
  isLoading: false,
  setHasErrors: jest.fn(),
  setIsLoading: jest.fn(),
  setTitle: jest.fn()
};

const pepe: FC = () => <div>CardMobile</div>;

const TableBoxProps: ITableBoxProps = {
  filterMobile: false,
  columns: [],
  setfilterMobile: jest.fn(),
  contextProps: ContextProps,
  cardMobile: pepe
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={initialProps}>
        <MemoryRouter>
          <TableBox {...TableBoxProps} />
        </MemoryRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );

test('should render component ', () => {
  renderInputFile();
  const pepito = screen.queryByTestId('Table-test');
  expect(pepito).toBeInTheDocument();
});

test('should scrooll ', () => {
  initialProps = {
    ...initialProps,
    isMobile: true
  };
  renderInputFile();
  const pepa = screen.queryByTestId('card-test');
  fireEvent.scroll(pepa);
  expect(ContextProps.handleChangePage).toHaveBeenCalled();
});
