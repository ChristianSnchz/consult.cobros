import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import theme from '@santander/obp-ui/lib/theme';
import { ThemeProvider } from 'styled-components';

import CardTable from './index';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderCard = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CardTable component={() => <>Component</>} item={{}} />
      </ThemeProvider>
    </MemoryRouter>
  );

test('should render child text', async () => {
  renderCard();
  await screen.findByText('Component');
});
