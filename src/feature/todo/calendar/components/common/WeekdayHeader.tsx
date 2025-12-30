import React from 'react';
import { WeekdayHeaderProps } from '../../types';
import { WEEKDAY_NAMES } from '../../utils';

/**
 * 요일 헤더 컴포넌트 (일~토)
 */
export const WeekdayHeader: React.FC<WeekdayHeaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {WEEKDAY_NAMES.map(weekday => (
        <div key={weekday} className="w-10 h-10 flex justify-center items-center">
          <span className="text-[12px] font-medium leading-[16px] tracking-[0.0252em] text-[#878A93] text-center">
            {weekday}
          </span>
        </div>
      ))}
    </div>
  );
};
