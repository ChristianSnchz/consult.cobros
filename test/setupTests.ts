import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';

// We mock the google analytics library
declare global {
  interface Window {
    ga(): void;
  }
}

jest.mock('@santander/st-analytics', () => ({
  initialize: jest.fn(),
  event: jest.fn(),
  page: jest.fn()
}));
window.ga = jest.fn();

// We bring the fetch library to the node environment
global.fetch = require('node-fetch');

// We mock the implementation of browser's matchMedia
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

// We configure sane timeouts to avoid errors within jest and rtl
configure({ asyncUtilTimeout: 20000 });
jest.setTimeout(200000);

global.console = {
  ...global.console,
  // log: console.log, // console.log are ignored in tests

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: jest.fn(),
  warn: console.warn,
  info: console.info,
  debug: console.debug
};
