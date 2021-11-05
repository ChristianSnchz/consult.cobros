import { IOption } from '../../components/commons/Dropdown/interfaces';

// eslint-disable-next-line no-shadow
export enum FieldType {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
  DATE = 'date',
  AMOUNT_RANGE = 'amountRange',
  NUMERIC_INPUT = 'numericInput'
}

export interface IFilterField {
  value?: string | number | any;
  name: string;
  dataTestId: string;
  placeholder: string;
  helpText?: string;
  type: string | FieldType;
  disabled?: boolean;
  optionsList?: IOption[];
  defaultHidden: boolean;
}

export interface IFilterObject {
  [key: string]: IFilterField;
}

export interface FilterContextProps {
  filters: IFilterObject;
  handleFilters: (a: any) => void;
  setFilters: (a: any) => void;
  appliedFilters: any;
}
