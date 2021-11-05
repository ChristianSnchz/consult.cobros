import React, { FC } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@santander/obp-ui/lib/theme';
import PopUpDetail from '../src/components/PubDebt/PopUpDetail/PopUpDetail';
import GeneralDetail from '../src/components/ShippingPub/PopUpDetail/GeneralDetail';
import {QueryClient, QueryClientProvider} from "react-query";

const debtDetail = {
  id: 'pepe',
  client: {
    clientNumber: '00000000000001',
    clientCuit: '20347398811',
    businessName: 'FUTBOLISTAS AGREMIADOS'
  },
  debt: {
    agreement: {
      companyName: '',
      cuit: '30700005573',
      product: 1,
      instance: 1
    },
    description: 0,
    errorDebin: 0,
    documentType: 'AP',
    documentNumber: '000000001565454',
    documentDescription: 'DEUDA PRUEBA',
    paymentNumber: '0000',
    expirationDate: '2021-12-31',
    documentAmount: 10000,
    prontoPagoDate: '2021-05-31',
    prontoPagoAmount: 9000,
    interestRatePunishment: 0,
    punishmentAmount: 0,
    IVARate: 0,
    additionalIVARate: 0,
    amount: 10000
  }
};

const shippingDetail = {
    "agreement": "30502438537/001/01/INTERKYT",
    "channel": 7,
    "sendingNumber": "0000011079",
    "totalRegsInf": "0000000004",
    "totalAmountExp1": "000000718350586",
    "totalAmountExp2": "000000000000000",
    "codeStatus": "0000000096",
    "status": "Autorizada",
    "dischargeDate": "13/05/2021",
    "numberBaseRioserv": "2106020002",
    "numberLastRendition": "0000000000",
    "movementsProcesed": "0000000000",
    "movementsAccepted": "0000000000",
    "movementsRejected": "0000000000",
    "registersValidated": "0000000000",
    "codeResultValidation": "0    ",
    "descriptionValidation": "                    ",
    "idRequest": "00083575",
    "typeFormat": "F",
    "logQuantity": "0000000002",
    "logStatus": [
        {
            "date": "02/06/2021 18:20:18",
            "description": "Transmitida"
        },
        {
            "date": "02/06/2021 18:24:12",
            "description": "Validada"
        },
        {
            "date": "02/06/2021 19:24:12",
            "description": "Pendiente de procesamiento manual"
        },
        {
            "date": "02/06/2021 19:24:12",
            "description": "Rechazada"
        }
    ],
    "signers": {
        "authorizationrequestid": "79103",
        "result": [
            {
                "signerIdentifier": "11885424",
                "signerDate": "14/12/2021 18:16:00hs",
                "signerName": "BARABINI GECHUVIND BARU INGRID"
            },
            {
                "signerIdentifier": "11885424",
                "signerDate": "15/08/2021 18:16:00hs",
                "signerName": "Fort, Ricardo"
            }
        ]
    }
};

interface Iblob {
  document: any;
  children: any;
}

const blob: FC<Iblob> = ({ document, children }) => {
  return (
    <>
      {React.createElement(children, { url: 'cualquiera' })}
      {document}
    </>
  );
};
jest.mock('@react-pdf/renderer', () => ({
  // @ts-ignore
  ...jest.requireActual('@react-pdf/renderer'),
  usePDF: jest.fn(() => [
    {
      loading: false,
      error: false,
      blob: {
        lastModifiedDate: new Date(),
        name: ''
      }
    },
    jest.fn()
  ]),
  BlobProvider: blob
}));

jest.mock('../src/utils/fileUtils/downloadFiles');

const renderInputFile = () =>
  render(
    <ThemeProvider theme={theme}>
      <PopUpDetail row={debtDetail} />
    </ThemeProvider>
  );

test('should render detail popUp', async () => {
  renderInputFile();
  const pepe = screen.queryByTestId('clien-test-pdf');
  const pepa = screen.queryByTestId('clien-test');
  expect(pepe).toBeInTheDocument();
  expect(pepa).toBeInTheDocument();
});

jest.mock('../src/services/shippingPubService', () => ({
    getShippingById: () =>  Promise.resolve(shippingDetail)
}));

test('should shipping general detail', async () => {
  render(
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
            <GeneralDetail id={'433'} />
        </QueryClientProvider>
    </ThemeProvider>
  );
    const pepa = screen.queryByTestId('btn-download');
    waitFor(() => expect(pepa).toBeInTheDocument());
});
