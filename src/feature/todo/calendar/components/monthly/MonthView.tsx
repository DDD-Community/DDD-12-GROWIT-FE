import React, { useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { MonthViewProps } from '../../types';
import { MonthHeader } from './MonthHeader';
import { WeekdayHeader } from '../common/WeekdayHeader';
import { WeekRow } from './WeekRow';
import { getMonthDates, CALENDAR, convertTodoCountToIndicators, mergeIndicators } from '../../utils';
import { useTodoCountByDate } from '@/model/todo/todoList/queries';

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
  onTodayClick,
}) => {
  // 월간 날짜 배열 계산 (42개) — 전/다음 달 overflow 포함
  const monthDates = useMemo(() => getMonthDates(currentDate), [currentDate]);

  // 인디케이터는 화면에 보이는 42셀 전부에 대해 조회해야 주뷰와 동일하게 표시됨
  const fromDateString = useMemo(() => format(monthDates[0], 'yyyy-MM-dd'), [monthDates]);
  const toDateString = useMemo(
    () => format(monthDates[monthDates.length - 1], 'yyyy-MM-dd'),
    [monthDates]
  );
  const { data: todoCountData = [] } = useTodoCountByDate({
    from: fromDateString,
    to: toDateString,
  });

  // 투두 개수를 indicators 형식으로 변환 및 병합
  const mergedIndicators = useMemo(() => {
    const todoIndicators = convertTodoCountToIndicators(todoCountData);
    return mergeIndicators(indicators, todoIndicators);
  }, [indicators, todoCountData]);

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
    <div className={`flex flex-col gap-5`}>
      {/* 월 헤더 */}
      {showNavigation && (
        <MonthHeader
          currentMonth={currentDate}
          selectedDate={selectedDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          selectedView={selectedView}
          onViewChange={onViewChange}
          onTodayClick={onTodayClick}
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
              indicators={mergedIndicators}
              holidays={holidays}
              onDateSelect={onDateSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
