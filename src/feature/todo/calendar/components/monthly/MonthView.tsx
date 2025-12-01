import React, { useMemo, useCallback } from 'react';
import { MonthViewProps } from '../../types';
import { MonthHeader } from './MonthHeader';
import { WeekdayHeader } from '../common/WeekdayHeader';
import { WeekRow } from './WeekRow';
import { getMonthDates, getPreviousMonth, getNextMonth, CALENDAR } from '../../utils';

/**
 * 월간 뷰 컴포넌트
 */
export const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  currentDate,
  indicators = {},
  holidays = {},
  onDateSelect,
  onMonthChange,
  showNavigation,
  selectedView,
  onViewChange,
  className = '',
}) => {
  // 월간 날짜 배열 계산 (42개)
  const monthDates = useMemo(() => getMonthDates(currentDate), [currentDate]);

  // 6주로 분할
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < CALENDAR.WEEKS_IN_MONTH; i++) {
      const start = i * CALENDAR.DAYS_IN_WEEK;
      result.push(monthDates.slice(start, start + CALENDAR.DAYS_IN_WEEK));
    }
    return result;
  }, [monthDates]);

  // 이전 달 이동
  const handlePrevious = useCallback(() => {
    onMonthChange?.('prev');
  }, [onMonthChange]);

  // 다음 달 이동
  const handleNext = useCallback(() => {
    onMonthChange?.('next');
  }, [onMonthChange]);

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* 월 헤더 */}
      {showNavigation && (
        <MonthHeader
          currentMonth={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          selectedView={selectedView}
          onViewChange={onViewChange}
        />
      )}

      {/* 캘린더 */}
      <div className="flex flex-col gap-2 pb-5">
        {/* 요일 헤더 */}
        <WeekdayHeader />

        {/* 주 행들 */}
        <div className="flex flex-col">
          {weeks.map((weekDates, index) => (
            <WeekRow
              key={index}
              dates={weekDates}
              selectedDate={selectedDate}
              currentMonth={currentDate}
              indicators={indicators}
              holidays={holidays}
              onDateSelect={onDateSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
