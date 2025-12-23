import React from 'react';
import { MonthHeaderProps } from '../../types';
import { formatMonthYear } from '../../utils';
import { ViewSwitcher } from '../common/ViewSwitcher';
import { TodayButton } from '../common/TodayButton';

/**
 * 월 헤더 컴포넌트 ("◀ 1월 ▶")
 */
export const MonthHeader: React.FC<MonthHeaderProps> = ({
  currentMonth,
  onPrevious,
  onNext,
  selectedView,
  onViewChange,
  onTodayClick,
  className = '',
}) => {
  const monthLabel = formatMonthYear(currentMonth);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-1">
        {/* 이전 달 버튼 */}
        <button onClick={onPrevious} className="w-5 h-5 flex items-center justify-center" aria-label="이전 달">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15.8334L6.66667 10L12.5 4.16669"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 월 표시 */}
        <span className="text-[20px] font-bold leading-[28px] tracking-[-0.012em] text-white">{monthLabel}</span>

        {/* 다음 달 버튼 */}
        <button onClick={onNext} className="w-5 h-5 flex items-center justify-center" aria-label="다음 달">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 4.16669L13.3333 10L7.5 15.8334"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <TodayButton onClick={onTodayClick} />
        <ViewSwitcher selectedView={selectedView} onViewChange={onViewChange} />
      </div>
    </div>
  );
};
