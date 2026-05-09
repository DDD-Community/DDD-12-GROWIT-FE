import React from 'react';
import { WeekdayHeaderProps } from '../../types';
import { WEEKDAY_NAMES } from '../../utils';

/**
 * 요일 헤더 컴포넌트 (Figma 196:1573)
 *
 * - 한글로 노출 (DS 변경 주석)
 * - 14px Medium, color/foreground/muted (#71717A)
 * - 7개 항목 flex-1 균등 분배, container py-[8px]
 */
export const WeekdayHeader: React.FC<WeekdayHeaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center w-full py-2 ${className}`}>
      {WEEKDAY_NAMES.map(weekday => (
        <div key={weekday} className="flex flex-1 items-center justify-center min-w-0">
          <span className="text-[14px] font-medium leading-[1.43] text-[#71717A] text-center">
            {weekday}
          </span>
        </div>
      ))}
    </div>
  );
};
