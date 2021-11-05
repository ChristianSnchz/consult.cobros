import React, {FC} from 'react';
import '@testing-library/jest-dom';
import theme from '@santander/obp-ui/lib/theme';
import {render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider, QueryClient } from 'react-query';
import RejectedDetail from '../src/components/ShippingPub/PopUpDetail/RejectedDetail';
import { ContextPropsModal, ModalContext } from '../src/contexts/ModalContext';

jest.mock('@santander/analytics-empresas', () => ({
  useAnalytics: () => ({ triggerEvent: jest.fn() })
}));

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      text: () =>
        JSON.stringify({
          agreement: '7827',
          detail: {
            sendingNumber: '72782',
            lastSettlement: '727',
            batchProcessing: '72782',
            refreshDebt: ''
          },
          rejections: [{ customerNumber: '782782', errors: [{ descriptionError: '28782' }] }]
        }),
      json: () =>
        Promise.resolve(
          JSON.stringify({
            agreement: '7827',
            detail: {
              sendingNumber: '72782',
              lastSettlement: '727',
              batchProcessing: '72782',
              refreshDebt: ''
            },
            rejections: [{ customerNumber: '782782', errors: [{ descriptionError: '28782' }] }]
          })
        )
    })
);


interface Iblob {
    document: any;
    children: any;
}

const blob: FC<Iblob> = ({ document, children }) =>
        <>
            {React.createElement(children, { url: 'cualquiera' })}
            {document}
        </>;

jest.mock('@react-pdf/renderer', () => ({
    // @ts-ignore
    ...jest.requireActual('@react-pdf/renderer'),
    usePDF: jest.fn(() => [
        {}, jest.fn()
    ]),
    BlobProvider: blob
}));

const initialProps: ContextPropsModal = {
  showModal: true,
  setShowModal: jest.fn(),
  infoModal: {},
  setInfoModal: jest.fn(),
  isLoading: false,
  setIsLoading: jest.fn()
};

const shippingInfo = {
    id: "30502438537_1_1_11062_210330",
    shippingNumber: "11062",
    codeStatus: "3",
    status: "Rechazada",
    dischargeDate: "30/03/2021",
    totalRegsInf: "4",
    numberBaseRioserv: "2103300010",
    totalAmountExp1: "$ 7.183.505,86",
    totalAmountExp2: "$ 718.350.586.000,00"
};

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <ModalContext.Provider value={initialProps}>
          <MemoryRouter>
            <RejectedDetail shippingInfo={shippingInfo} />
          </MemoryRouter>
        </ModalContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );

test('should render component ', async () => {
  renderInputFile();
  const pepe = await screen.findByTestId('rejected-view');
  waitFor(() => expect(pepe).toBeInTheDocument());
  const pepa = await screen.findByTestId('rejected-pdf');
  waitFor(() => expect(pepa).toBeInTheDocument());
});
