import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';

import Routes from '../src/Routes/index';

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
  useAnalytics: () => jest.fn()
}));

const root = {
  pathname: '/',
  hash: '777845',
  state: {
    rootPath: 'string',
    microfrontPath: 'string',
    requestedPath: 'string'
  }
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <Routes rootRouterLocation={root} />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should ', () => {
  renderInputFile();
});
