import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import theme from '@santander/obp-ui/lib/theme';
import { ThemeProvider } from 'styled-components';

import { ShippingPubContext } from '../../contexts/ShippingPubContext';
import { ShippingPubProps } from '../../contexts/ShippingPubContext/interfaces';

import RemoveModal from './RemoveModal';

let initialShippingPubProps: ShippingPubProps = {
  isInitial: false,
  hasError: false,
  data: { list: [], total: '0', agreement: null },
  params: {}
};

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

const renderInputFile = func =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ShippingPubContext.Provider value={initialShippingPubProps}>
          <RemoveModal onPrimary={func} onSecondary={jest.fn()} />
        </ShippingPubContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );

test('should render remove modal', async () => {
  renderInputFile(() => global.fetch('/'));
  const btn = screen.queryByTestId('btn-remove');
  act(() => {
    userEvent.click(btn);
  });
  await screen.findByText('Eliminando...');
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('should cancel operation ', async () => {
  initialShippingPubProps = {
    ...initialShippingPubProps
  };
  renderInputFile(() => global.fetch('/'));
  const btn = screen.queryByTestId('btn-cancel');
  act(() => {
    userEvent.click(btn);
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});
