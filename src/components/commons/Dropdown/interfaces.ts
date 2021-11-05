import { IFieldMessage } from '../FieldMessage';

export interface IOption {
  value: string | number;
  label: string;
}
export interface IDropdown {
  name?: string;
  disabled?: boolean;
  width?: number;
  selectedOption: IOption;
  optionsList: Array<IOption>;
  placeholder?: string;
  helperText?: string;
  isMobile?: boolean;
  onChange: (a: IOption) => void;
  message?: IFieldMessage;
  'data-testid'?: string;
}
