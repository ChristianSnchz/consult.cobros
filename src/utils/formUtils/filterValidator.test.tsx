import filterValidator from './filterValidator';

const filters = {
  text: {
    value: null,
    validations: [
      {
        type: 'required',
        text: '*Este campo es requerido'
      }
    ],
    type: 'input'
  },
  date: {
    value: {
      start: null,
      end: null
    },
    type: 'date',
    validations: [
      {
        type: 'required',
        text: '*Este campo es requerido'
      }
    ]
  },
  dropdown: {
    value: null,
    validations: [
      {
        type: 'maxLength',
        text: 'El maximo es de x caracteres'
      }
    ],
    type: 'input'
  }
};

test('should show error for required input field', async () => {
  const field = filterValidator.validateField(filters.text);
  expect(field.message.text).toBe('*Este campo es requerido');
});

test('should show error for required date field', async () => {
  const field = filterValidator.validateField(filters.date);
  expect(field.message.text).toBe('*Este campo es requerido');
});

test('should dont show error for required input field', async () => {
  const field = filterValidator.validateField({ ...filters.text, value: 'Texto Prueba' });
  expect(field.message).toBe(null);
});

test('should show error for all fields', async () => {
  const fields = filterValidator.validateAllFields(filters);
  expect(fields.text.message.text).toBe('*Este campo es requerido');
  expect(fields.date.message.text).toBe('*Este campo es requerido');
});

test('validate all fields with errors', async () => {
  const fields = filterValidator.validateAllFields(filters);
  expect(filterValidator.fieldsHasErrors(fields)).toBeTruthy();
});

test('validate all fields without errors', async () => {
  const fields = filterValidator.validateAllFields({
    ...filters,
    text: { ...filters.text, value: 'Texto Prueba' },
    date: { ...filters.date, value: { start: '01/01/2021', end: '01/01/2021' } }
  });
  expect(filterValidator.fieldsHasErrors(fields)).toBeFalsy();
});
