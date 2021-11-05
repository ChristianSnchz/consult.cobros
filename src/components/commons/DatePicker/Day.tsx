import React, { useRef, useContext, ReactText, FC } from 'react';
import styled, { withTheme, Theme } from 'styled-components';
import { number } from 'prop-types';
import { useDay } from './hooks';
import DatepickerContext from './datepickerContext';

const LabelDay = styled('span')<{ disabled: boolean }>`
  font-family: 'SantanderMicrotext';
  padding-bottom: 1px;
  vertical-align: middle;
`;
const WrapperDay = styled('div')`
  width: 36px;
  height: 36px;
  margin: 4px 2px;
  display: flex;
  outline: none;
  align-items: center;
  justify-content: center;
`;
const StyledDay = styled('div')<{ isSelected: boolean; disabled: boolean; color: string; backgroundColor: string }>`
  background-color: white;
  font-family: 'SantanderMicrotext';
  border-radius: 4px;
  box-shadow: ${({ isSelected }) => (isSelected ? 'rgb(218 218 218) 0px 3px 6px -2px' : 'none')};
  font: inherit;
  font-size: 0.875rem;
  background-color: ${({ backgroundColor, isSelected, disabled }) =>
    isSelected && disabled ? '#ffa9a9' : backgroundColor};
  color: ${({ color }) => color};
  white-space: nowrap;
  width: 30px;
  height: 30px;
  user-select: none;
  outline: none;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ theme }) => theme.color.accesiblesky};
    color: white;
  }
`;

interface DayProps {
  day: ReactText | string | Date;
  date: Date;
  theme: Theme;
  order: number;
}

function getColor(isSelected, isSelectedStartOrEnd, isWithinHoverRange, isDisabled) {
  return ({ selectedFirstOrLastColor, normalColor, selectedColor, rangeHoverColor, disabledColor }) =>
    (isSelectedStartOrEnd && selectedFirstOrLastColor) ||
    (isSelected && selectedColor) ||
    (isWithinHoverRange && rangeHoverColor) ||
    (isDisabled && disabledColor) ||
    normalColor;
}

const Day: FC<DayProps> = ({ day, date, theme, order }) => {
  const dayRef = useRef(null);
  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover
  } = useContext(DatepickerContext);
  const { isSelected, isSelectedStartOrEnd, onClick, onMouseEnter, tabIndex, disabledDate, isWithinHoverRange } =
    useDay({
      date,
      focusedDate,
      isDateFocused,
      isDateSelected,
      isDateHovered,
      isDateBlocked,
      isFirstOrLastSelectedDate,
      onDateFocus,
      onDateSelect,
      onDateHover,
      dayRef
    });
  const colorfn = getColor(isSelected, isSelectedStartOrEnd, isWithinHoverRange, disabledDate);
  if (!day) return <div />;

  return theme ? (
    <WrapperDay
      onClick={onClick}
      onMouseOver={onMouseEnter}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      ref={dayRef}
    >
      <StyledDay
        color={colorfn({
          selectedFirstOrLastColor: theme.color.white,
          normalColor: 'rgb(30,31,33)',
          selectedColor: theme.color.white,
          rangeHoverColor: theme.color.white,
          disabledColor: theme.color.white
        })}
        backgroundColor={colorfn({
          selectedFirstOrLastColor: theme.color.accesiblesky,
          normalColor: theme.color.white,
          selectedColor: theme.color.darksky,
          rangeHoverColor: theme.color.darksky,
          disabledColor: theme.color.graphite
        })}
        isSelected={isSelected || isSelectedStartOrEnd}
        disabled={disabledDate}
      >
        <LabelDay disabled={disabledDate}>{day}</LabelDay>
      </StyledDay>
    </WrapperDay>
  ) : null;
};
export default withTheme(Day);
