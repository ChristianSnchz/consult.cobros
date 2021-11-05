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

jest.mock('@react-pdf/renderer', () => ({
  // @ts-ignore
  ...jest.requireActual('@react-pdf/renderer'),
  usePDF: jest.fn(() => [{}, jest.fn()])
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
      id: '2818418181',
      shippingNumber: '841287',
      codeStatus: '4',
      status: 'Rechazada',
      dischargeDate: '28/06/1995',
      totalRegsInf: '4',
      numberBaseRioserv: '58',
      totalAmountExp1: '854',
      totalAmountExp2: '84574'
    }
  });

  const btn = screen.queryByTestId('ver-detalle-btn');

  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
});
