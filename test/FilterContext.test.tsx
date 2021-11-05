/* eslint-disable spaced-comment */
import React, { FC, useContext } from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from 'react-query';
import userEvent from '@testing-library/user-event';
import FilterProvider, { FilterContext } from '../src/contexts/FilterContext';

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

const filter: any = {
  agreement: {
    value: null,
    name: 'agreement',
    dataTestId: 'agreement',
    placeholder: 'Elegí un acuerdo *',
    validations: [{ type: 'required', text: '*Este campo es requerido' }],
    type: 'dropdown',
    optionsList: [],
    defaultHidden: false
  },
  clientNumber: {
    value: null,
    name: 'clientNumber',
    dataTestId: 'nro-cliente',
    placeholder: 'Número de cliente *',
    validations: [{ type: 'required', text: '*Este campo es requerido' }],
    type: 'input',
    defaultHidden: false
  },
  documentType: {
    value: '',
    name: 'documentType',
    dataTestId: 'tipo-comprobante',
    optionsList: [],
    placeholder: 'Tipo de comprobante',
    type: 'dropdown',
    defaultHidden: true
  }
};

const newfilter: any = {
  agreement: {
    value: 'Pepe',
    name: 'agreement',
    dataTestId: 'agreement',
    placeholder: 'Elegí un acuerdo *',
    validations: [{ type: 'required', text: '*Este campo es requerido' }],
    type: 'dropdown',
    optionsList: [],
    defaultHidden: false
  },
  clientNumber: {
    value: 'el Piti',
    name: 'clientNumber',
    dataTestId: 'nro-cliente',
    placeholder: 'Número de cliente *',
    validations: [{ type: 'required', text: '*Este campo es requerido' }],
    type: 'input',
    defaultHidden: false
  },
  documentType: {
    value: '',
    name: 'documentType',
    dataTestId: 'tipo-comprobante',
    optionsList: [],
    placeholder: 'Tipo de comprobante',
    type: 'dropdown',
    defaultHidden: true
  }
};

const TestComponent: FC = () => {
  const { handleFilters, appliedFilters } = useContext(FilterContext);

  return (
    <>
      {Object.values(appliedFilters).length === 0 ? (
        <p data-testid="filters">No hay filtros</p>
      ) : (
        <p data-testid="filters">{JSON.stringify(appliedFilters)}</p>
      )}
      <button data-testid="button-filters" onClick={() => handleFilters(newfilter)}></button>
    </>
  );
};

test('should handleFilters ', async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={new QueryClient()}>
        <FilterProvider filtersObject={filter}>
          <TestComponent />
        </FilterProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
  const buttonfilter = screen.getByTestId('button-filters');
  const filterdmmy = screen.getByTestId('filters');
  act(() => {
    userEvent.click(buttonfilter);
  });

  const filterExpected = { agreement: 'Pepe', clientNumber: 'el Piti' };

  expect(filterdmmy.textContent).toBe(JSON.stringify(filterExpected));
});
