import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import theme from '@santander/obp-ui/lib/theme';
import { ThemeProvider } from 'styled-components';

import AppProvider, { AppContext } from './AppContext';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderInputFile = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <AppContext.Consumer>
            {({ setHasErrors, hasErrors }) => (
              <>
                <div data-testid="setHasErrors" onClick={() => setHasErrors(true)}>
                  setHasErrors
                </div>
                {hasErrors ? 'haveerrors' : ''}
              </>
            )}
          </AppContext.Consumer>
        </AppProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

test('should render child text', async () => {
  renderInputFile();
  const btn = screen.queryByTestId('setHasErrors');

  act(() => {
    userEvent.click(btn);
  });
  await screen.findByText('haveerrors');
});
