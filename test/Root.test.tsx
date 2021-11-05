import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Root from '../src/containers/Root';

global.fetch = jest.fn().mockImplementation(
  (): Promise<any> =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve('text response')
    })
);

const root = {
  pathname: '/',
  hash: '777845',
  state: {
    rootPath: 'string',
    microfrontPath: 'string',
    requestedPath: 'string'
  }
};

const renderInputFile = () => render(<Root rootRouterLocation={root} />);

test('should ', () => {
  renderInputFile();
});
