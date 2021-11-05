import React from 'react';
import format from 'date-fns/format';
import { useMonth } from './hooks';
import SantanderIcon from './SantanderIcon';
import Day from './Day';
import {
  ButtonsWrapper,
  DaysMatrixWrapper,
  MonthLabel,
  MonthWrapper,
  StyledWeeklyDay,
  Weekly,
  WrapperSantanderIcon
} from './MonthStyled';

declare type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface MonthProps {
  year: number;
  month: number;
  goToNextMonths: () => void;
  goToPreviousMonths: () => void;
  firstDayOfWeek: FirstDayOfWeek;
  locale: Locale;
}
interface MonthResultProps {
  days: (number | { dayLabel: string; date: Date })[];
  weekdayLabels: string[];
  monthLabel: string;
}

function Month({ year, month, firstDayOfWeek, goToNextMonths, goToPreviousMonths, locale }: MonthProps) {
  const { days, weekdayLabels, monthLabel }: MonthResultProps = useMonth({
    year,
    month,
    firstDayOfWeek,
    weekdayLabelFormat: (date: Date) => format(date, 'eee', { locale }),
    monthLabelFormat: (d: Date) => `${format(d, 'MMMM', { locale })} ${format(d, 'yyyy', { locale })}`
  });
  return (
    <MonthWrapper>
      <ButtonsWrapper>
        <WrapperSantanderIcon>
          <SantanderIcon onClick={goToPreviousMonths} size="1.35em" icon={'SYS017'} color="white" />
        </WrapperSantanderIcon>
        <MonthLabel>
          <span>{monthLabel}</span>
        </MonthLabel>
        <WrapperSantanderIcon>
          <SantanderIcon onClick={goToNextMonths} size="1.35em" icon={'SYS016'} color="white" />
        </WrapperSantanderIcon>
      </ButtonsWrapper>
      <Weekly>
        {weekdayLabels.map((dayLabel, index) => (
          <StyledWeeklyDay index={index} key={`weekly-${index}`} style={{}}>
            {dayLabel}
          </StyledWeeklyDay>
        ))}
        {days.map((day, index) => (
          <DaysMatrixWrapper key={`day-${index}`} index={index + weekdayLabels.length}>
            {typeof day === 'object' && <Day date={day.date} key={day.date?.toString()} day={day.dayLabel} />}
          </DaysMatrixWrapper>
        ))}
      </Weekly>
    </MonthWrapper>
  );
}
export default Month;
