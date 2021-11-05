import React, { FC, useEffect, useRef, useState } from 'react';
import { useKeyPress } from '../DatePicker/hooks';
import { IDropdown, IOption } from './interfaces';
import {
  IconsContainer,
  ArrowContainer,
  ArrowDown,
  CloseCross,
  Dropdown,
  DropdownInput,
  InputContainer,
  Item,
  List,
  OptionsMenu
} from './styles';
import FieldMessage, { textType } from '../FieldMessage';

const selectWithArrow = (direction, setValue, list, setOpen) => {
  if (direction === 'u') setValue(prev => list[list.findIndex(e => e === prev) - 1]);
  if (direction === 'd') setValue(prev => list[list.findIndex(e => e === prev) + 1]);
  setOpen(true);
};
const CustomSelect: FC<IDropdown> = ({
  selectedOption,
  placeholder,
  optionsList,
  onChange,
  disabled,
  width,
  message,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<IOption>(selectedOption);
  const inputRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [writedValue, setWritedValue] = useState('');

  useKeyPress('ArrowDown', () => selectWithArrow('d', setValue, optionsList, setOpen), !open);
  useKeyPress('ArrowUp', () => selectWithArrow('u', setValue, optionsList, setOpen), !open);
  useKeyPress('Tab', () => setOpen(prev => !prev), !open);
  useKeyPress('Enter', () => setOpen(prev => !prev), !open);

  const handleChange = newVal => {
    setValue(newVal);
    setOpen(false);
    onChange(newVal);
    setWritedValue('');
  };

  const handleInputWrite = newVal => {
    setWritedValue(newVal?.target?.value || '');
    if (!open) setOpen(true);
  };

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <Dropdown
      {...rest}
      hasError={message?.type === textType.ERROR}
      width={width}
      isOpen={open}
      ref={wrapperRef}
      disabled={disabled}
    >
      <InputContainer
        hasValue={!!value || !!writedValue}
        placeholder={placeholder}
        onClick={() => {
          setOpen(prev => !prev);
          inputRef.current.focus();
        }}
      >
        <DropdownInput ref={inputRef} onChange={handleInputWrite} value={value?.label || writedValue} width="100%" />
      </InputContainer>
      <IconsContainer>
        {!!value && <CloseCross hasValue={!!value} onClick={() => handleChange(null)} />}
        <ArrowContainer hasValue={!!value} onClick={() => setOpen(prev => !prev)}>
          <ArrowDown isOpen={open} />
        </ArrowContainer>
      </IconsContainer>
      <OptionsMenu isOpen={open}>
        <List>
          {optionsList
            .filter(el => el?.label?.includes(writedValue))
            .map(opt => (
              <Item
                key={opt.value}
                title={opt.label}
                onClick={() => handleChange(opt)}
                selected={value?.value === opt.value}
              >
                {opt.label}
              </Item>
            ))}
        </List>
      </OptionsMenu>
      {message && <FieldMessage {...message} />}
    </Dropdown>
  );
};

export default CustomSelect;
