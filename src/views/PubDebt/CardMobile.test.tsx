import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import theme from '@santander/obp-ui/lib/theme';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';

import CardMobile from './CardMobile';
import ModalProvider from '../../contexts/ModalContext';
import AppProvider from '../../contexts/AppContext';

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve('text response')
    })
);

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderCardMobile = ({ item }) =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                keepPreviousData: true
              }
            }
          })
        }
      >
        <MemoryRouter>
          <ModalProvider>
            <AppProvider>
              <CardMobile item={item} />
            </AppProvider>
          </ModalProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should render card mobile ', async () => {
  renderCardMobile({
    item: {
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
  });
  await screen.findByTestId('ver-detalle-btn');
});
