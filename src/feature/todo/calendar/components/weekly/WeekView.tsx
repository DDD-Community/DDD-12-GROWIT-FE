import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { motion, useMotionValue } from 'motion/react';
import { WeekViewProps } from '../../types';
import { DateHeader } from './DateHeader';
import { WeekdayHeader } from '../common/WeekdayHeader';
import { DateCell } from '../common/DateCell';
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

/** 주 이동 swipe 임계치 (px) */
const SWIPE_THRESHOLD = 60;

/**
 * 주간 뷰 컴포넌트
 *
 * 주 이동 버튼 대신 좌/우 swipe gesture로 이동:
 *  - 좌측으로 swipe → 다음 주
 *  - 우측으로 swipe → 이전 주
 */
export const WeekView: React.FC<WeekViewProps> = ({
  selectedDate,
  currentDate,
  indicators = {},
  holidays = {},
  onDateSelect,
  onWeekChange,
  selectedView,
  onViewChange,
  onTodayClick,
}) => {
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);
  const [weekStart, weekEnd] = useMemo(() => getWeekRange(currentDate), [currentDate]);

  const fromDateString = useMemo(() => format(weekStart, 'yyyy-MM-dd'), [weekStart]);
  const toDateString = useMemo(() => format(weekEnd, 'yyyy-MM-dd'), [weekEnd]);
  const { data: todoCountData = [] } = useTodoCountByDate({
    from: fromDateString,
    to: toDateString,
  });

  const mergedIndicators = useMemo(() => {
    const todoIndicators = convertTodoCountToIndicators(todoCountData);
    return mergeIndicators(indicators, todoIndicators);
  }, [indicators, todoCountData]);

  const selectedDateKey = toDateKey(selectedDate);
  const selectedHolidayLabel = holidays[selectedDateKey];

  const x = useMotionValue(0);

  return (
    <div className="flex flex-col gap-4">
      <DateHeader
        date={selectedDate}
        holidayLabel={selectedHolidayLabel}
        selectedView={selectedView}
        onViewChange={onViewChange}
        onTodayClick={onTodayClick}
      />

      <div className="flex flex-col">
        <WeekdayHeader />

        {/* Figma 196:1581 outer container — drag to change week */}
        <motion.div
          className="flex flex-col items-start py-1 w-full"
          style={{ x, touchAction: 'pan-y' }}
          drag={onWeekChange ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (!onWeekChange) return;
            if (info.offset.x <= -SWIPE_THRESHOLD) {
              onWeekChange('next');
            } else if (info.offset.x >= SWIPE_THRESHOLD) {
              onWeekChange('prev');
            }
            x.set(0);
          }}
        >
          <div className="flex items-center justify-center w-full">
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
                  isCurrentMonth={true}
                  indicatorColors={indicatorColors}
                  holidayLabel={holidayLabel}
                  onClick={onDateSelect}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
