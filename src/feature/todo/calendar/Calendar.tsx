'use client';

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CalendarProps, CalendarView } from './types';
import { WeekView } from './components/weekly';
import {
  getWeekDates,
  getWeekRange,
  getMonthRange,
  getPreviousWeek,
  getNextWeek,
  getPreviousMonth,
  getNextMonth,
} from './utils';
import { startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';
import { WEEKDAY } from './utils/constants';

const MonthView = dynamic(() => import('./components/monthly').then(module => module.MonthView), { ssr: false });

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
  const [loadedHolidays, setLoadedHolidays] = useState<Record<string, string>>({});

  const activeView = isControlled ? controlledView : internalView;
  const activeCurrentDate = internalCurrentDate;

  // 전 세계 공휴일 데이터가 초기 홈 번들을 막지 않도록 첫 화면이 그려진 뒤 불러온다.
  useEffect(() => {
    if (holidays) return;

    let cancelled = false;
    setLoadedHolidays({});
    const [rangeStart, rangeEnd] = getMonthRange(activeCurrentDate);

    void import('./utils/holidays').then(({ getKoreanHolidaysInRange }) => {
      if (!cancelled) {
        setLoadedHolidays(getKoreanHolidaysInRange(rangeStart, rangeEnd));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [holidays, activeCurrentDate]);

  const resolvedHolidays = holidays ?? loadedHolidays;

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
      let dateToSelect: Date | null = null;
      setInternalCurrentDate(prev => {
        const nextDate = direction === 'prev' ? getPreviousWeek(prev) : getNextWeek(prev);
        const nextWeekDates = getWeekDates(nextDate);
        dateToSelect = nextWeekDates[0];
        return nextDate;
      });
      // 부모 상태 업데이트를 다음 마이크로태스크로 지연
      queueMicrotask(() => {
        if (dateToSelect) onDateSelect(dateToSelect);
      });
    },
    [onDateSelect]
  );

  const handleMonthChange = useCallback((direction: 'prev' | 'next') => {
    setInternalCurrentDate(prev => (direction === 'prev' ? getPreviousMonth(prev) : getNextMonth(prev)));
  }, []);

  // 오늘 버튼 클릭 핸들러
  const handleTodayClick = useCallback(() => {
    const today = new Date();

    if (activeView === 'weekly') {
      // 주간 뷰: 오늘 날짜가 포함된 주의 일요일로 이동
      const weekStart = startOfWeek(today, { weekStartsOn: WEEKDAY.SUNDAY });
      setInternalCurrentDate(weekStart);
      onDateSelect(today);
    } else {
      // 월간 뷰: 오늘 날짜가 포함된 달의 첫날로 이동
      const monthStart = startOfMonth(today);
      setInternalCurrentDate(monthStart);
      onDateSelect(today);
    }
  }, [activeView, onDateSelect]);

  // selectedDate가 외부(매트릭스 swipe 등)에서 변경되어 현재 표시 중인
  // 주/월 범위 밖으로 벗어나면 internalCurrentDate도 그 주/월로 따라 이동.
  // 함수형 업데이트로 prev와 selectedDate만 비교하므로 월 화살표/주 swipe로
  // currentDate를 직접 바꾸는 흐름과는 충돌하지 않는다.
  useEffect(() => {
    setInternalCurrentDate(prev => {
      if (activeView === 'weekly') {
        const [start, end] = getWeekRange(prev);
        if (isWithinInterval(selectedDate, { start, end })) return prev;
        return startOfWeek(selectedDate, { weekStartsOn: WEEKDAY.SUNDAY });
      }
      const [start, end] = getMonthRange(prev);
      if (isWithinInterval(selectedDate, { start, end })) return prev;
      return startOfMonth(selectedDate);
    });
  }, [selectedDate, activeView]);

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
          onTodayClick={handleTodayClick}
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
          onTodayClick={handleTodayClick}
        />
      )}
    </div>
  );
};
