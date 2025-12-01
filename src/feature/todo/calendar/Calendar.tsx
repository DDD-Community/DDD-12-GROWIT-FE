'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { CalendarProps, CalendarView } from './types';
import { WeekView } from './components/weekly';
import { MonthView } from './components/monthly';
import { getWeekRange, getMonthRange, getPreviousWeek, getNextWeek, getPreviousMonth, getNextMonth } from './utils';

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
  showViewSwitcher = true,
  showNavigation = true,
  showTodayButton = false,
  indicators,
  holidays,
  className = '',
  styles = {},
}) => {
  // Controlled vs Uncontrolled 뷰 관리
  const isControlled = controlledView !== undefined;
  const [internalView, setInternalView] = useState<CalendarView>(defaultView);
  const [internalCurrentDate, setInternalCurrentDate] = useState(currentDate);

  const activeView = isControlled ? controlledView : internalView;
  const activeCurrentDate = internalCurrentDate;

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

  // 주/월 변경 핸들러
  const handleWeekChange = useCallback((direction: 'prev' | 'next') => {
    setInternalCurrentDate(prev => (direction === 'prev' ? getPreviousWeek(prev) : getNextWeek(prev)));
  }, []);

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
    <div className={`calendar-container flex flex-col ${className} ${styles.container || ''}`}>
      {/* 캘린더 뷰 */}
      {activeView === 'weekly' ? (
        <WeekView
          selectedDate={selectedDate}
          currentDate={activeCurrentDate}
          indicators={indicators}
          holidays={holidays}
          onDateSelect={onDateSelect}
          onWeekChange={handleWeekChange}
          showNavigation={showNavigation}
          selectedView={activeView}
          onViewChange={handleViewChange}
          className={styles.weekView}
        />
      ) : (
        <MonthView
          selectedDate={selectedDate}
          currentDate={activeCurrentDate}
          indicators={indicators}
          holidays={holidays}
          onDateSelect={onDateSelect}
          onMonthChange={handleMonthChange}
          showNavigation={showNavigation}
          selectedView={activeView}
          onViewChange={handleViewChange}
          className={styles.monthView}
        />
      )}
    </div>
  );
};
