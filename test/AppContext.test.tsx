import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import theme from '@santander/obp-ui/lib/theme';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import AppProvider, { AppContext } from '../src/contexts/AppContext';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const TestComponent: FC = () => {
  const { setHasErrors, setIsLoading, hasErrors } = useContext(AppContext);

  return (
    <>
      <button data-testid="show-loading" onClick={() => setIsLoading(true)}>
        Show loading
      </button>
      <button data-testid="set-errors-true" onClick={() => setHasErrors(true)}>
        Set Errors
      </button>
      {hasErrors && <span data-testid="errors">El sistema tiene errores </span>}
    </>
  );
};

const provider = (
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <AppProvider>
        <TestComponent />
      </AppProvider>
    </MemoryRouter>
  </ThemeProvider>
);

test('should show loading ', async () => {
  render(provider);

  const btn = screen.getByTestId('show-loading');
  act(() => {
    userEvent.click(btn);
  });

  const spinner = screen.queryByTestId('spinnner-test');
  expect(spinner).toBeInTheDocument();
});

test('should show errors ', async () => {
  render(provider);

  let errorLabel = screen.queryByTestId('errors');
  expect(errorLabel).not.toBeInTheDocument();

  const btn = screen.getByTestId('set-errors-true');
  act(() => {
    userEvent.click(btn);
  });

  errorLabel = screen.queryByTestId('errors');
  expect(errorLabel).toBeInTheDocument();
});
