import React from 'react';
import '@testing-library/jest-dom';
import theme from '@santander/obp-ui/lib/theme';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import ShippingPub from '../src/views/ShippingPub/index';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <ShippingPub />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should render componente ', () => {
  renderInputFile();
});
