import { render, screen } from '@testing-library/react';
import React from 'react';
import Spinner from '../src/components/commons/Spinner';

test('Spinner renders correctly', () => {
  render(
    <Spinner data-testid='test-spinner' loading={true} />
  );
  expect(screen.queryByTestId('test-spinner')).not.toBe(null);
});

test('Spinner shows the correct color', () => {
  render(
    <Spinner data-testid='test-spinner' loading={true} color={'blue'}/>
  );
  const spinnerCircle = screen.getByTestId('test-spinner').children[0].children[0];
  expect(spinnerCircle).toHaveStyle('stroke: blue');
});

test('Spinner shows the correct size', () => {
  render(
    <Spinner data-testid='test-spinner' loading={true} size={20} />
  );
  const spinner = screen.getByTestId('test-spinner').children[0];
  expect(spinner).toHaveStyle('width: 20px');
  expect(spinner).toHaveStyle('height: 20px');
});

test('Spinner shows the correct size', () => {
  render(
    <Spinner data-testid='test-spinner' loading={true} size={20} text={'Loading...'}/>
  );
  const text = screen.getByTestId('test-spinner').children[1];
  expect(text).toHaveTextContent('Loading...');
});
