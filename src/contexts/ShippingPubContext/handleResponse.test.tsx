import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { onErrorResponse, onSuccessResponse } from './handleResponse';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));
interface ITest {
  isMobile?: boolean;
}
const TestComponent: FC<ITest> = ({ isMobile }) => (
  <>
    <div data-testid="onError" onClick={() => onErrorResponse({ setShippingPubState: jest.fn() })}></div>
    <div
      data-testid="onSuccess"
      onClick={() =>
        onSuccessResponse({
          isMobile,
          newData: { list: [], mobileList: [], total: '0', agreement: null },
          setShippingPubState: jest.fn()
        })
      }
    ></div>
  </>
);

test('should setFilters ', async () => {
  render(<TestComponent />);

  const btn = await screen.findByTestId('onError');
  act(() => {
    userEvent.click(btn);
  });

  const btn2 = await screen.findByTestId('onSuccess');
  act(() => {
    userEvent.click(btn2);
  });
});

test('should setFilters mobile ', async () => {
  render(<TestComponent isMobile={true} />);

  const btn = await screen.findByTestId('onError');
  act(() => {
    userEvent.click(btn);
  });

  const btn2 = await screen.findByTestId('onSuccess');
  act(() => {
    userEvent.click(btn2);
  });
});
