import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { WeekViewProps } from '../../types';
import { DateHeader } from './DateHeader';
import { WeekdayHeader } from '../common/WeekdayHeader';
import { DateCell } from '../common/DateCell';
import { WeekNavigation } from './WeekNavigation';
import {
  getWeekDates,
  getWeekRange,
  isToday,
  isSameDay,
  toDateKey,
  getDateNumber,
  convertTodoCountToIndicators,
  mergeIndicators,
} from '../../utils';
import { useTodoCountByDate } from '@/model/todo/todoList/queries';

/**
 * 주간 뷰 컴포넌트
 */
export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  currentDate,
  indicators = {},
  holidays = {},
  onDateSelect,
  onWeekChange,
  showNavigation,
  selectedView,
  onViewChange,
  onTodayClick,
}) => {
  // 주간 날짜 배열 계산
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
  const [weekStart, weekEnd] = useMemo(() => getWeekRange(currentDate), [currentDate]);

  // 주간 날짜 범위의 투두 개수 조회
  const fromDateString = useMemo(() => format(weekStart, 'yyyy-MM-dd'), [weekStart]);
  const toDateString = useMemo(() => format(weekEnd, 'yyyy-MM-dd'), [weekEnd]);
  const { data: todoCountData = [] } = useTodoCountByDate({
    from: fromDateString,
    to: toDateString,
  });

  // 투두 개수를 indicators 형식으로 변환 및 병합
  const mergedIndicators = useMemo(() => {
    const todoIndicators = convertTodoCountToIndicators(todoCountData);
    return mergeIndicators(indicators, todoIndicators);
  }, [indicators, todoCountData]);

  // 선택된 날짜의 공휴일 라벨
  const selectedDateKey = toDateKey(selectedDate);
  const selectedHolidayLabel = holidays[selectedDateKey];

  return (
    <div className={`flex flex-col gap-4`}>
      {/* 날짜 헤더 */}
      <DateHeader
        date={selectedDate}
        holidayLabel={selectedHolidayLabel}
        selectedView={selectedView}
        onViewChange={onViewChange}
        onTodayClick={onTodayClick}
      />

      {/* 캘린더 */}
      <div className="flex flex-col">
        {/* 주간 이동 */}
        {showNavigation && onWeekChange && (
          <WeekNavigation
            startDate={weekStart}
            endDate={weekEnd}
            onPrevWeek={() => onWeekChange('prev')}
            onNextWeek={() => onWeekChange('next')}
          />
        )}

        {/* 요일 헤더 */}
        <WeekdayHeader />

        {/* 날짜 셀들 */}
        <div className="flex justify-between">
          {weekDates.map(date => {
            const dateKey = toDateKey(date);
            const indicatorColors = mergedIndicators?.[dateKey];
            const holidayLabel = holidays?.[dateKey];

            return (
              <DateCell
                key={dateKey}
                date={date}
                displayNumber={getDateNumber(date)}
                isSelected={isSameDay(date, selectedDate)}
                isToday={isToday(date)}
                isCurrentMonth={true} // 주간 뷰는 항상 현재 월
                indicatorColors={indicatorColors}
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
