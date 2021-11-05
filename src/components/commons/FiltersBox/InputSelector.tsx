import React, { useContext } from 'react';
import Dropdown from '../Dropdown';
import Datepicker from '../DatePicker';
import Input from '../Input';
import { FieldType } from '../../../contexts/FilterContext/interfaces';
import { AppContext } from '../../../contexts/AppContext';

export default (record, setFilterObject) => {
  let element = null;
  const { isMobile } = useContext(AppContext);
  switch (record.type) {
    case FieldType.INPUT:
      element = (
        <Input
          data-testid={record.dataTestId}
          name={record.name}
          message={record.message ? record.message : undefined}
          placeholder={record.placeholder}
          disabled={record.disabled}
          onChange={event => {
            event.persist();
            setFilterObject(prev => ({
              ...prev,
              [record.name]: {
                ...record,
                value: event?.target?.value
              }
            }));
          }}
          value={record.value}
        />
      );
      break;
    case FieldType.DROPDOWN:
      element = (
        <Dropdown
          data-testid={record.dataTestId}
          name={record.name}
          disabled={record.disabled}
          placeholder={record.placeholder}
          optionsList={record.optionsList}
          message={record.message ? record.message : undefined}
          onChange={option =>
            setFilterObject(prev => ({
              ...prev,
              [record.name]: {
                ...record,
                selectedOption: option,
                value: option?.value
              }
            }))
          }
          selectedOption={record.selectedOption}
        />
      );
      break;
    case FieldType.DATE:
      element = (
        <Datepicker
          label="Desde"
          rangeLabel="Hasta"
          isRange
          isMobile={isMobile}
          message={record.message ? record.message : undefined}
          onChange={value =>
            setFilterObject(prev => ({
              ...prev,
              [record.name]: {
                ...record,
                value
              }
            }))
          }
          value={record.value}
        />
      );
      break;
    case FieldType.AMOUNT_RANGE:
      break;
    default:
      break;
  }
  return element;
};
