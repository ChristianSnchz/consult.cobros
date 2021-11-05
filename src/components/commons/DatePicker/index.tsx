/* eslint-disable indent */
import React, { useState, useEffect, FC, useRef } from 'react';
import Icon from '@santander/everest-ui/lib/Icon';
import localeEs from 'date-fns/locale/es';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import subDays from 'date-fns/subDays';
import isValid from 'date-fns/isValid';
import isEqual from 'date-fns/isEqual';
import InputMask from 'react-input-mask';
import differenceInDays from 'date-fns/differenceInDays';

import {
  useDatepicker,
  START_DATE,
  END_DATE,
  FocusedInput,
  OnDatesChangeProps,
  useClickOutside,
  useToggle,
  useEscape,
  useKeyPress
} from './hooks';
import Month from './Month';
import DatepickerContext from './datepickerContext';
import { Label } from './Input';

import {
  WrapperIcon,
  StyledCalendarWrapper,
  InputCustom,
  WrapperInputDropdown,
  WrapperInputRange,
  RangeDivision,
  WrapperRange,
  WrapperRelative
} from './DatepickerStyles';
import FieldMessage, { IFieldMessage, textType } from '../FieldMessage';

export interface DatePickerProps {
  disabled?: boolean;
  tabIndex?: number;
  isRange?: boolean;
  handleDateBlocked?: (date: Date) => boolean;
  onChange?: (E: IOnChange) => void;
  onInputChange?: (e: string) => void;
  value?: IOnChange;
  message?: IFieldMessage;
  label?: string;
  rangeLabel?: string;
  defaultValue?: IOnChange;
  automationId?: string;
  locale?: Locale;
  isMobile?: boolean;
}
type TfocusedInput = 'startDate' | 'endDate';

interface IOnChange {
  start?: string;
  end?: string;
}
const dateFormat = 'dd/MM/yyyy';
const selectWithArrow =
  (state: { startDate: Date; endDate: Date; focusedInput: TfocusedInput }, actions, setState, isDateBlocked) =>
  (position: 'u' | 'd' | 'l' | 'r') => {
    let newDate: Date | null = null;
    if (position === 'r') {
      newDate = addDays(state.focusedInput !== END_DATE ? state.startDate : state.endDate, 1);
    } else if (position === 'd') {
      newDate = addDays(state.focusedInput !== END_DATE ? state.startDate : state.endDate, 7);
    } else if (position === 'u') {
      newDate = subDays(state.focusedInput !== END_DATE ? state.startDate : state.endDate, 7);
    } else if (position === 'l') {
      newDate = subDays(state.focusedInput !== END_DATE ? state.startDate : state.endDate, 1);
    }

    const newRange = {
      startDate: state.focusedInput !== END_DATE ? newDate : state.startDate,
      endDate: state.focusedInput === END_DATE ? newDate : state.endDate
    };
    if (differenceInDays(newRange.endDate, newRange.startDate) > 0 && !isDateBlocked(newDate)) {
      if (state.startDate?.getMonth() !== newDate?.getMonth()) actions.goToDate(newDate);
      setState(prev => ({
        ...prev,
        startDate: state.focusedInput !== END_DATE ? newDate : state.startDate,
        endDate: state.focusedInput === END_DATE ? newDate : state.endDate
      }));
    }
  };

const Datepicker: FC<DatePickerProps> = ({
  disabled = false,
  locale = localeEs,
  tabIndex,
  onChange,
  label,
  rangeLabel,
  isRange,
  handleDateBlocked = () => false,
  value: { start, end },
  automationId,
  isMobile,
  message
}) => {
  const [focusedInput, setFocusedInput] = useState<typeof START_DATE | typeof END_DATE>(null);
  const [startDate, setStartDate] = useState<string>(undefined);
  const [endDate, setEndDate] = useState<string>(undefined);

  const formatedDefaultValueStart = parse(start, dateFormat, new Date());
  const formatedDefaultValueEnd = parse(end, dateFormat, new Date());
  const [state, setState] = useState<{
    focusedInput: FocusedInput;
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: start && isValid(formatedDefaultValueStart) ? formatedDefaultValueStart : null,
    endDate: end && isValid(formatedDefaultValueEnd) ? formatedDefaultValueEnd : null,
    focusedInput
  });

  const [opened, setOpened] = useToggle(false);
  const containerRef = useClickOutside(() => setOpened(false), opened);
  useEscape(() => setOpened(false), false);

  function handleDateChange(data: OnDatesChangeProps) {
    if (!data.focusedInput) {
      setState({ ...data, focusedInput: START_DATE });
    } else {
      setState(data);
    }
  }
  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
    goToDate
  } = useDatepicker({
    startDate: state.startDate,
    endDate: state.endDate,
    focusedInput: state.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths: isMobile ? 1 : 2,
    unavailableDates: [],
    isDateBlocked: handleDateBlocked
  });

  useKeyPress('ArrowDown', () => selectWithArrow(state, { goToDate }, setState, handleDateBlocked)('d'), !opened);
  useKeyPress('ArrowUp', () => selectWithArrow(state, { goToDate }, setState, handleDateBlocked)('u'), !opened);
  useKeyPress('ArrowLeft', () => selectWithArrow(state, { goToDate }, setState, handleDateBlocked)('l'), !opened);
  useKeyPress('ArrowRight', () => selectWithArrow(state, { goToDate }, setState, handleDateBlocked)('r'), !opened);
  useKeyPress('Tab', () => setOpened(false), !opened);
  useKeyPress('Enter', () => setOpened(false), !opened);

  useEffect(() => {
    if (startDate !== start) {
      setStartDate(start);
    }
  }, [start]);

  useEffect(() => {
    if (endDate !== end) {
      setEndDate(end);
    }
  }, [end]);

  useEffect(() => {
    onChange({
      start: isValid(state.startDate) ? format(state.startDate, dateFormat) : null,
      end: isValid(state.endDate) ? format(state.endDate, dateFormat) : null
    });
  }, [state.startDate, state.endDate]);

  useEffect(() => {
    if (startDate) {
      const parseStart = parse(startDate, dateFormat, new Date());
      if (isValid(parseStart) && !isEqual(parseStart, state.startDate) && parseStart.getFullYear() > 1950) {
        if (differenceInDays(parseStart, state.endDate) > 0) {
          handleDateChange({ ...state, startDate: state.endDate, focusedInput: START_DATE });
          // goToDate(parseStart);
        } else {
          handleDateChange({
            ...state,
            startDate: parseStart,
            focusedInput: START_DATE
          });
          goToDate(state.endDate ? state.endDate : parseStart);
        }
      }
    } else {
      handleDateChange({ ...state, startDate: null, focusedInput: START_DATE });
    }
  }, [startDate]);
  useEffect(() => {
    if (endDate) {
      const parseEnd = parse(endDate, dateFormat, new Date());
      if (isValid(parseEnd) && !isEqual(parseEnd, state.endDate) && parseEnd.getFullYear() > 1950) {
        if (differenceInDays(state.startDate, parseEnd) < 0) {
          handleDateChange({ ...state, endDate: parseEnd, focusedInput: END_DATE });
          goToDate(parseEnd);
        } else {
          handleDateChange({
            ...state,
            endDate: state.startDate ? state.startDate : parseEnd,
            focusedInput: START_DATE
          });
          goToDate(state.startDate ? state.startDate : parseEnd);
        }
      }
    } else {
      handleDateChange({ ...state, endDate: null, focusedInput: END_DATE });
    }
  }, [endDate]);
  useEffect(() => {
    handleDateChange({ ...state, focusedInput });
  }, [focusedInput]);
  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover
      }}
    >
      <WrapperRange automation-id={automationId} hasError={message?.type === textType.ERROR}>
        <WrapperInputRange>
          <WrapperInputDropdown>
            <InputMask
              mask="99/99/9999"
              maskChar=""
              isSince={isRange}
              value={startDate || ''}
              onChange={event => {
                if (differenceInDays(parse(event.target.value, dateFormat, new Date()), state.endDate) > 0) {
                  setStartDate(endDate);
                } else {
                  setStartDate(event.target.value);
                }
              }}
              tabIndex={tabIndex}
              autoComplete="off"
              disabled={disabled}
              onClick={() => !disabled && setOpened(!opened)}
              onFocus={() => {
                setFocusedInput(START_DATE);
                if (!disabled) setOpened(true);
              }}
              onBlur={() => {
                if (!isValid(parse(startDate, dateFormat, new Date())) || startDate.length !== dateFormat.length) {
                  setStartDate(format(state.startDate, dateFormat));
                }
                setFocusedInput(END_DATE);
              }}
            >
              {inputProps => <InputCustom {...inputProps} disableUnderline />}
            </InputMask>
            {label && (
              <Label
                disabled={disabled}
                up={focusedInput === START_DATE || (startDate && startDate !== '')}
                onClick={() => {
                  if (!disabled) setOpened(!opened);
                }}
              >
                {label}
              </Label>
            )}
          </WrapperInputDropdown>
          {isRange && <RangeDivision />}
          <WrapperInputDropdown>
            {isRange && (
              <InputMask
                mask="99/99/9999"
                maskChar=""
                isUntil={isRange}
                tabIndex={tabIndex}
                value={endDate || ''}
                onChange={event => setEndDate(event.target.value)}
                autoComplete="off"
                disabled={disabled}
                onClick={() => !disabled && setOpened(!opened)}
                onFocus={() => {
                  setFocusedInput(END_DATE);
                  if (!disabled) setOpened(true);
                }}
                onBlur={() => {
                  if (!isValid(parse(endDate, dateFormat, new Date())) || endDate.length !== dateFormat.length) {
                    setEndDate(format(state.endDate, dateFormat));
                  }
                  setFocusedInput(null);
                }}
              >
                {inputProps => <InputCustom {...inputProps} disableUnderline />}
              </InputMask>
            )}

            {rangeLabel && (
              <Label
                disabled={disabled}
                up={focusedInput === END_DATE || (endDate && endDate !== '')}
                onClick={() => {
                  if (!disabled) setOpened(!opened);
                }}
              >
                {rangeLabel}
              </Label>
            )}
          </WrapperInputDropdown>
          {message && <FieldMessage {...message} />}
          <WrapperIcon onClick={() => !disabled && setOpened(!opened)}>
            <Icon icon={'icon-DOC022'} size="20px" color="gray" />
          </WrapperIcon>
        </WrapperInputRange>

        {
          <StyledCalendarWrapper isOpen={opened}>
            <WrapperRelative ref={containerRef}>
              {activeMonths.map((month, key) => (
                <Month
                  locale={locale}
                  key={`${month.year}-${month.month}-${key}`}
                  goToPreviousMonths={goToPreviousMonths}
                  goToNextMonths={goToNextMonths}
                  year={month.year}
                  month={month.month}
                  firstDayOfWeek={firstDayOfWeek}
                />
              ))}
            </WrapperRelative>
          </StyledCalendarWrapper>
        }
      </WrapperRange>
    </DatepickerContext.Provider>
  );
};

export default Datepicker;
