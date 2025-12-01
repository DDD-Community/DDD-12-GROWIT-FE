import React from 'react';
import { DateHeaderProps } from '../../types';
import { formatDateHeader } from '../../utils';
import { ViewSwitcher } from '../common/ViewSwitcher';

/**
 * 날짜 헤더 컴포넌트 ("01.01 일요일")
 */
export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  holidayLabel,
  selectedView,
  onViewChange,
  className = '',
}) => {
  const formattedDate = formatDateHeader(date);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-medium leading-[24px] tracking-[0.0057em] text-[#C2C4C8]">
          {formattedDate}
        </span>
        {holidayLabel && (
          <span className="text-[14px] font-medium leading-[20px] tracking-[0.0145em] text-[#FF6363] px-2 py-0.5 rounded">
            {holidayLabel}
          </span>
        )}
      </div>
      <ViewSwitcher selectedView={selectedView} onViewChange={onViewChange} />
    </div>
  );
};
