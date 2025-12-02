import React, { useMemo } from 'react';
import { WeekViewProps } from '../../types';
import { DateHeader } from './DateHeader';
import { WeekdayHeader } from '../common/WeekdayHeader';
import { DateCell } from '../common/DateCell';
import { getWeekDates, isToday, isSameDay, toDateKey, getDateNumber } from '../../utils';

/**
 * 주간 뷰 컴포넌트
 */
export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  currentDate,
  indicators = {},
  holidays = {},
  onDateSelect,
  showNavigation,
  selectedView,
  onViewChange,
  className = '',
}) => {
  // 주간 날짜 배열 계산
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  // 선택된 날짜의 공휴일 라벨
  const selectedDateKey = toDateKey(selectedDate);
  const selectedHolidayLabel = holidays[selectedDateKey];

  console.log(selectedDate, holidays);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* 날짜 헤더 */}
      <DateHeader
        date={selectedDate}
        holidayLabel={selectedHolidayLabel}
        selectedView={selectedView}
        onViewChange={onViewChange}
      />

      {/* 캘린더 */}
      <div className="flex flex-col">
        {/* 요일 헤더 */}
        <WeekdayHeader />

        {/* 날짜 셀들 */}
        <div className="flex justify-between">
          {weekDates.map(date => {
            const dateKey = toDateKey(date);
            const indicatorCount = indicators[dateKey] || 0;
            const holidayLabel = holidays[dateKey];

            return (
              <DateCell
                key={dateKey}
                date={date}
                displayNumber={getDateNumber(date)}
                isSelected={isSameDay(date, selectedDate)}
                isToday={isToday(date)}
                isCurrentMonth={true} // 주간 뷰는 항상 현재 월
                indicatorCount={indicatorCount}
                holidayLabel={holidayLabel}
                onClick={onDateSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
