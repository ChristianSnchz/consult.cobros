import { render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../src/utils/errorBoundary';

test('error boundary shows correctly', () => {
  render(<ErrorBoundary error={"hola"} />);

  expect(screen.getByText("Error in @santander/debt-consult microfont")).toBeInTheDocument();
});
