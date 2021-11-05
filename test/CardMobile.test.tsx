import React from 'react';
import '@testing-library/jest-dom';
import theme from '@santander/obp-ui/lib/theme';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import CardMobile from '../src/views/PubDebt/CardMobile';
import { ContextPropsModal, ModalContext } from '../src/contexts/ModalContext';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const row = {
  id: 'pepe',
  client: {
    clientNumber: '00000000000001',
    clientCuit: '20347398811',
    businessName: 'FUTBOLISTAS AGREMIADOS'
  },
  debt: {
    agreement: {
      companyName: '',
      cuit: '30700005573',
      product: 1,
      instance: 1
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
};

const initialProps: ContextPropsModal = {
  showModal: false,
  setShowModal: jest.fn(),
  infoModal: {},
  setInfoModal: jest.fn()
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <ModalContext.Provider value={initialProps}>
          <MemoryRouter>
            <CardMobile item={row} />
          </MemoryRouter>
        </ModalContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should render componente ', () => {
  renderInputFile();
});
