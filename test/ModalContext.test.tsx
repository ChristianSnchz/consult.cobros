import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import theme from '@santander/obp-ui/lib/theme';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import ModalProvider, { ModalContext, InfoModal } from '../src/contexts/ModalContext';

const infoModalMock: InfoModal = {
  children: <div></div>,
  title: 'pepe',
  icon: null,
  primaryText: 'pepa',
  onPrimary: jest.fn(),
  secondaryText: 'los pepes',
  onSecondary: jest.fn()
};

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
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

const TestComponent: FC = () => {
  const { showModal, setShowModal, infoModal, setInfoModal } = useContext(ModalContext);

  return (
    <>
      <p data-testid="showModal">{JSON.stringify(showModal)}</p>

      <button data-testid="setInfoModal" onClick={() => setInfoModal(infoModalMock)}></button>
      <button data-testid="setShowModal" onClick={() => setShowModal(true)}></button>
    </>
  );
};

test('should setFilters ', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  const btn = screen.getByTestId('setInfoModal');
  act(() => {
    userEvent.click(btn);
  });

  const btn2 = screen.getByTestId('setShowModal');
  act(() => {
    userEvent.click(btn2);
  });
  const modal = screen.queryByText('pepe');
  expect(modal).toBeInTheDocument();
});
