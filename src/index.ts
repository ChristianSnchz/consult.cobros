import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import Root from './containers/Root';
import errorBoundary from './utils/errorBoundary';

const { bootstrap, mount, unmount, update } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  // @ts-ignore
  errorBoundary
});

export { bootstrap };
export { mount };
export { unmount };
export { update };
