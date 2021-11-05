import React, {useState, FC} from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';

import GeneralErrors from '../src/components/commons/GeneralErrrors';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));


let initialHasErrors = false;

const ComponentTest: FC = () => {
 const [hasErrors, setHasErrors] = useState(initialHasErrors);

 return <GeneralErrors hasErrors={hasErrors} setHasErrors={setHasErrors} onNotRetry={() => null}>
         <div data-testid="view-component">
             Sin errores
         <button data-testid="show-error" onClick={() => setHasErrors(true)}>Show Error</button>
         </div>
      </GeneralErrors>
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
         <ComponentTest/>
      </MemoryRouter>
    </ThemeProvider>
  );

test('should component without error', () => {
    renderInputFile();
    expect(screen.queryByTestId('view-component')).toBeInTheDocument();
});

test('should render error component', () => {
  initialHasErrors = true;
  renderInputFile();
  expect(screen.queryByTestId('btn-error').textContent).toBe('Reintentar');
});

test('should render error component and retry one time', () => {
  initialHasErrors = true;
  renderInputFile();
  expect(screen.queryByTestId('btn-error').textContent).toBe('Reintentar');
  userEvent.click(screen.queryByTestId('btn-error'));
  expect(screen.queryByTestId('view-component')).toBeInTheDocument();
});

test('should render error component and retry two times', () => {
    initialHasErrors = true;
    renderInputFile();
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    expect(screen.queryByTestId('btn-error').textContent).toBe('Reintentar');
    userEvent.click(screen.queryByTestId('btn-error'));
    expect(screen.queryByTestId('view-component')).toBeInTheDocument();
});

test('should render error component and retry three times', () => {
    initialHasErrors = true;
    renderInputFile();
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    expect(screen.queryByTestId('btn-error').textContent).toBe('Reintentar');
    userEvent.click(screen.queryByTestId('btn-error'));
    expect(screen.queryByTestId('view-component')).toBeInTheDocument();
});

test('should render error component and not retry', () => {
    initialHasErrors = true;
    renderInputFile();
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    userEvent.click(screen.queryByTestId('btn-error'));
    userEvent.click(screen.queryByTestId('show-error'));
    expect(screen.queryByTestId('btn-error').textContent).toBe('Entendido');
});