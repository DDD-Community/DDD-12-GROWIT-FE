import React from 'react';
import { DateHeaderProps } from '../../types';
import { formatDateHeader } from '../../utils';
import { ViewSwitcher } from '../common/ViewSwitcher';
import { TodayButton } from '../common/TodayButton';

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  holidayLabel,
  selectedView,
  onViewChange,
  onTodayClick,
  className = '',
}) => {
  const formattedDate = formatDateHeader(date);

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-[16px] font-medium leading-[24px] tracking-[0.0057em] text-[#C2C4C8]">
          {formattedDate}
        </span>
        {holidayLabel && (
          <span className="text-[13px] font-medium leading-[18px] tracking-[0.0145em] text-[#FF6363] py-[2px] rounded-full whitespace-nowrap">
            {holidayLabel}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <TodayButton onClick={onTodayClick} />
        <ViewSwitcher selectedView={selectedView} onViewChange={onViewChange} />
      </div>
    </div>
  );
};
