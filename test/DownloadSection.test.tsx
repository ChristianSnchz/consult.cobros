import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { PubDebtContext } from '../src/contexts/PubDebContext';
import { PubDebtProps } from '../src/contexts/PubDebContext/interfaces';
import fs from './__mocks__/fileMock';

import DownloadSection from '../src/components/PubDebt/DownloadSection';

global.URL.createObjectURL = jest.fn(() => 'details');

let initialPropsMock: PubDebtProps = {
  isInitial: true,
  hasError: false,
  data: { list: [], mobileList: [], total: '0' },
  showDownloadAll: 'JKDJDJDJDJD',
  setShowDownloadAll: jest.fn(),
  params: {}
};

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fs),
      text: () => Promise.resolve('text response'),
      blob: () => Promise.resolve(new File([], 'file.pdf'))
    })
);

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const renderInputFile = hasData =>
  render(
    <MemoryRouter>
      <PubDebtContext.Provider value={initialPropsMock}>
        <DownloadSection hasData={hasData} />
      </PubDebtContext.Provider>
    </MemoryRouter>
  );

test('should download with hasData Table ', async () => {
  renderInputFile(true);
  const btn = screen.queryByTestId('btn-download-table');
  userEvent.click(btn);
  screen.queryByText('Descargar datos de tabla');
  expect(fetch).toHaveBeenCalled();
});

test('should download with agreement ', async () => {
  renderInputFile(false);
  const btn = screen.queryByTestId('btn-download-agreement');
  act(() => {
    userEvent.click(btn);
  });
  // screen.queryByText('Descargar tabla');
  expect(fetch).toHaveBeenCalled();
});
