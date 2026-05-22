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
  compact = false,
}) => {
  return (
    <div className={`flex justify-between ${compact ? 'h-[40px]' : ''}`}>
      {dates.map(date => {
        const dateKey = toDateKey(date);
        const indicatorColors = indicators?.[dateKey];
        const holidayLabel = holidays?.[dateKey];
        const isInCurrentMonth = isCurrentMonth(date, currentMonth);

        return (
          <DateCell
            key={dateKey}
            date={date}
            displayNumber={getDateNumber(date)}
            isSelected={isSameDay(date, selectedDate)}
            isToday={isToday(date)}
            isCurrentMonth={isInCurrentMonth}
            indicatorColors={indicatorColors}
            holidayLabel={holidayLabel}
            onClick={onDateSelect}
            compact={compact}
          />
        );
      })}
    </div>
  );
};
