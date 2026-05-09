import React from 'react';
import { getMonth, getWeekOfMonth, isToday as dateFnsIsToday } from 'date-fns';
import { DateHeaderProps } from '../../types';
import { ViewSwitcher } from '../common/ViewSwitcher';
import { TodayButton } from '../common/TodayButton';

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  selectedView,
  onViewChange,
  onTodayClick,
  className = '',
}) => {
  const month = getMonth(date) + 1;
  const week = getWeekOfMonth(date, { weekStartsOn: 0 });
  // Figma 196:2488 dev annotation: "오늘이 아닌 날짜에 있을때만 활성화"
  const showTodayButton = !dateFnsIsToday(date);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className="text-[24px] font-bold leading-[133%] tracking-[-0.01em] text-white">
        {month}월 {week}주
      </span>
      <div className="flex items-center gap-3">
        {showTodayButton && <TodayButton onClick={onTodayClick} />}
        <ViewSwitcher selectedView={selectedView} onViewChange={onViewChange} />
      </div>
    </div>
  );
};
