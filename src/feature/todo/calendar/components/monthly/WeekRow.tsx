import React from 'react';
import { WeekRowProps } from '../../types';
import { DateCell } from '../common/DateCell';
import { isToday, isSameDay, isCurrentMonth, toDateKey, getDateNumber } from '../../utils';

/**
 * 주 행 컴포넌트 (7개 날짜 셀)
 */
export const WeekRow: React.FC<WeekRowProps> = ({
  dates,
  selectedDate,
  currentMonth,
  indicators = {},
  holidays = {},
  onDateSelect,
  className = '',
}) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {dates.map(date => {
        const dateKey = toDateKey(date);
        const indicatorCount = indicators[dateKey] || 0;
        const holidayLabel = holidays[dateKey];
        const isInCurrentMonth = isCurrentMonth(date, currentMonth);

        return (
          <DateCell
            key={dateKey}
            date={date}
            displayNumber={getDateNumber(date)}
            isSelected={isSameDay(date, selectedDate)}
            isToday={isToday(date)}
            isCurrentMonth={isInCurrentMonth}
            indicatorCount={indicatorCount}
            holidayLabel={holidayLabel}
            onClick={onDateSelect}
          />
        );
      })}
    </div>
  );
};
