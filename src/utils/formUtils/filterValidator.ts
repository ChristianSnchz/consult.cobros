import { IFilterObject } from '../../components/commons/FiltersBox';

const validateField = field => {
  let errorMessage = null;
  if (field.validations && !field.disabled) {
    field.validations.forEach(validation => {
      if (validation.type === 'required') {
        if (field.type === 'date') {
          if (!field.value.start || !field.value.end) {
            errorMessage = validation.text;
          }
        } else if (!field.value) {
          errorMessage = validation.text;
        }
      }
    });
  }
  return { ...field, message: errorMessage ? { type: 'error', text: errorMessage } : null };
};

const validateAllFields = (fields: IFilterObject): IFilterObject => {
  const newFields = { ...fields };
  Object.entries(fields).forEach(obj => {
    newFields[obj[0]] = validateField(fields[obj[0]]);
  });
  return newFields;
};

const fieldsHasErrors = (fields: IFilterObject): boolean =>
  !!Object.entries(fields).find(obj => obj[1].message?.type === 'error');

export default { validateAllFields, validateField, fieldsHasErrors };
