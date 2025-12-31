import React, { useMemo } from 'react';
import { formatDate } from '../../utils';

interface WeekNavigationProps {
  startDate: Date;
  endDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export const WeekNavigation: React.FC<WeekNavigationProps> = ({ startDate, endDate, onPrevWeek, onNextWeek }) => {
  const monthLabel = useMemo(() => {
    const startMonth = formatDate(startDate, 'yyyy년 M월');
    const endMonth = formatDate(endDate, 'yyyy년 M월');
    if (startMonth === endMonth) {
      return startMonth;
    }
    return `${startMonth}-${formatDate(endDate, 'M월')}`;
  }, [startDate, endDate]);

  return (
    <div className="flex items-center justify-between px-1 text-sm text-[#C2C4C8]">
      <button
        type="button"
        onClick={onPrevWeek}
        aria-label="이전 주"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M11.6667 5L6.66666 10L11.6667 15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex flex-col items-center">
        <span className="text-[15px] font-medium leading-[22px] tracking-[0.0096em] text-white">{monthLabel}</span>
      </div>
      <button
        type="button"
        onClick={onNextWeek}
        aria-label="다음 주"
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path
            d="M8.33337 5L13.3334 10L8.33337 15"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
