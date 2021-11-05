import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Input, { InputProps } from './index';
import { textType } from '../FieldMessage';

const renderInputFile = (props: InputProps) => render(<Input {...props} />);

test('should type an input  and show placeholder', async () => {
  renderInputFile({
    name: 'h',
    placeholder: 'placeholder',
    'data-testid': 'input',
    onChange: () => null,
    width: '100%',
    disabled: false
  });
  const inputContainer = screen.getByTestId('input-container');
  fireEvent.click(inputContainer);
  const input = screen.getByTestId('input');

  fireEvent.change(input, { target: { value: '23' } });
  expect(screen.getByTestId('input')).toHaveValue('23');
});

test('should re render', async () => {
  const props = {
    name: 'h',
    placeholder: 'placeholder',
    'data-testid': 'input',
    onChange: () => null,
    width: '100%',
    disabled: false
  };
  const { rerender } = renderInputFile(props);
  rerender(<Input {...props} defaultValue={15} />);
  expect(screen.getByTestId('input')).toHaveValue('15');

  rerender(<Input {...props} message={{ text: 'Error', type: textType.ERROR }} />);
  await screen.findByText('Error');
  rerender(<Input {...props} message={{ text: 'Helper', type: textType.HELP }} />);
  await screen.findByText('Helper');
});

test('should re render with width', async () => {
  const props = {
    name: 'h',
    placeholder: 'placeholder',
    'data-testid': 'input',
    onChange: () => null,
    width: '100%',
    disabled: false
  };
  const { rerender } = renderInputFile(props);
  rerender(<Input {...props} width={undefined} />);
  const inputContainer = screen.getByTestId('input-container');
  expect(inputContainer).toHaveStyle('width: 100%');
  rerender(<Input {...props} disabled />);
  const input = screen.getByTestId('input');

  expect(input).toHaveStyle('border: 1px solid rgb(118,118,118)');
});
