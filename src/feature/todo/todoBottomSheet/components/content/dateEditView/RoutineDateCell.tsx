'use client';

import { cn } from '@/shared/lib/utils';
import type { DateCellInfo } from '../../shared/calendar';

interface RoutineDateCellProps extends DateCellInfo {
  /** 하이라이트 여부 (루틴 날짜인지) */
  isHighlighted: boolean;
}

/** 루틴 날짜 셀 컴포넌트 */
export const RoutineDateCell = ({ date, isInCurrentMonth, isToday, isHighlighted }: RoutineDateCellProps) => {
  return (
    <>
      {/* 오늘 표시 점 */}
      <div className={cn('w-1 h-1 rounded-full mb-0.5', isToday ? 'bg-brand-neon' : 'invisible')} />
      <div
        className={cn(
          'w-[29px] h-[29px] flex items-center justify-center label-1-regular rounded-full',
          isHighlighted && 'bg-brand-neon text-inverse-label label-1-medium',
          !isHighlighted && isInCurrentMonth && 'text-text-primary',
          !isHighlighted && !isInCurrentMonth && 'text-label-assistive'
        )}
      >
        {date.getDate()}
      </div>
    </>
  );
};

export default RoutineDateCell;
