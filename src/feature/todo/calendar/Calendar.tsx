'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { CalendarProps, CalendarView } from './types';
import { WeekView } from './components/weekly';
import { MonthView } from './components/monthly';
import {
  getWeekDates,
  getWeekRange,
  getMonthRange,
  getPreviousWeek,
  getNextWeek,
  getPreviousMonth,
  getNextMonth,
  getKoreanHolidaysInRange,
} from './utils';

/**
 * 통합 캘린더 컴포넌트
 *
 * @example
 * ```tsx
 * <Calendar
 *   selectedDate={selectedDate}
 *   indicators={indicators}
 *   onDateSelect={setSelectedDate}
 * />
 * ```
 */
export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  currentDate = new Date(),
  defaultView = 'weekly',
  view: controlledView,
  onViewChange,
  onDateSelect,
  onDateRangeChange,
  showNavigation = true,
  indicators,
  holidays,
}) => {
  const isControlled = controlledView !== undefined;
  const [internalView, setInternalView] = useState<CalendarView>(defaultView);
  const [internalCurrentDate, setInternalCurrentDate] = useState(currentDate);

  const activeView = isControlled ? controlledView : internalView;
  const activeCurrentDate = internalCurrentDate;

  const resolvedHolidays = useMemo(() => {
    if (holidays) {
      return holidays;
    }

    const [rangeStart, rangeEnd] = getMonthRange(activeCurrentDate);
    return getKoreanHolidaysInRange(rangeStart, rangeEnd);
  }, [holidays, activeCurrentDate]);

  // 뷰 변경 핸들러
  const handleViewChange = useCallback(
    (newView: CalendarView) => {
      if (!isControlled) {
        setInternalView(newView);
      }
      onViewChange?.(newView);
    },
    [isControlled, onViewChange]
  );

  const handleWeekChange = useCallback(
    (direction: 'prev' | 'next') => {
      setInternalCurrentDate(prev => {
        const nextDate = direction === 'prev' ? getPreviousWeek(prev) : getNextWeek(prev);
        const nextWeekDates = getWeekDates(nextDate);
        const sundayOfWeek = nextWeekDates[0];
        onDateSelect(sundayOfWeek);
        return nextDate;
      });
    },
    [onDateSelect]
  );

  const handleMonthChange = useCallback((direction: 'prev' | 'next') => {
    setInternalCurrentDate(prev => (direction === 'prev' ? getPreviousMonth(prev) : getNextMonth(prev)));
  }, []);

  // 날짜 범위 변경 시 콜백 호출
  useEffect(() => {
    if (!onDateRangeChange) return;

    let range: [Date, Date];
    if (activeView === 'weekly') {
      range = getWeekRange(activeCurrentDate);
    } else {
      range = getMonthRange(activeCurrentDate);
    }

    onDateRangeChange(range[0], range[1]);
  }, [activeView, activeCurrentDate, onDateRangeChange]);

  return (
    <div className={`calendar-container flex flex-col`}>
      {/* 캘린더 뷰 */}
      {activeView === 'weekly' ? (
        <WeekView
          selectedDate={selectedDate}
          currentDate={activeCurrentDate}
          indicators={indicators}
          holidays={resolvedHolidays}
          onDateSelect={onDateSelect}
          onWeekChange={handleWeekChange}
          showNavigation={showNavigation}
          selectedView={activeView}
          onViewChange={handleViewChange}
        />
      ) : (
        <MonthView
          selectedDate={selectedDate}
          currentDate={activeCurrentDate}
          indicators={indicators}
          holidays={resolvedHolidays}
          onDateSelect={onDateSelect}
          onMonthChange={handleMonthChange}
          showNavigation={showNavigation}
          selectedView={activeView}
          onViewChange={handleViewChange}
        />
      )}
    </div>
  );
};
