import React from 'react';
import { DateCellProps } from '../../types';
import { Indicator } from './Indicator';

/**
 * 날짜 셀 컴포넌트 (Figma 196:1604/1610)
 *
 * selected/today는 50x50 cell 전체를 둘러싸는 원이며,
 * indicator는 cell 하단(bottom 8px)에 절대 배치되어 원 안에 포함된다.
 */
export const DateCell: React.FC<DateCellProps> = ({
  date,
  displayNumber,
  isSelected,
  isToday,
  isCurrentMonth,
  indicatorColors,
  holidayLabel,
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    onClick(date);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(date);
    }
  };

  const textColor = isCurrentMonth ? '#FAFAFA' : 'rgba(157, 158, 173, 0.3)';
  const fontWeight = isSelected || isToday ? 500 : 400;

  // 선택일 > 오늘 우선순위 (Figma 196:1604 selected white / 196:1610 today stroke)
  const cellState =
    isSelected ? 'selected'
    : isToday ? 'today'
    : 'default';

  // Figma 196:1584/1604/1610 — default rounded-3xl(24px), selected/today rounded-full
  const circleClass =
    cellState === 'selected'
      ? 'bg-[#FFFFFF] rounded-full'
      : cellState === 'today'
      ? 'border border-[#27272A] rounded-full'
      : 'rounded-[24px]';

  const numberColor =
    cellState === 'selected' ? '#000000' : textColor;

  return (
    <div
      className={`relative flex flex-1 items-start justify-center min-w-0 cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${displayNumber}일${holidayLabel ? ` ${holidayLabel}` : ''}`}
      aria-selected={isSelected}
      aria-current={isToday ? 'date' : undefined}
    >
      {/* Figma 196:1584 calendar-day: 50x50 size-fixed container */}
      <div
        className={`flex flex-col items-center justify-center py-[2px] size-[50px] shrink-0 ${circleClass}`}
      >
        <span
          className="text-[14px] leading-[1.42] text-center"
          style={{ color: numberColor, fontWeight }}
        >
          {displayNumber}
        </span>
      </div>
      {/* Figma 196:1605 Indicators — Calendar Cell 기준 absolute bottom-8 */}
      {indicatorColors && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[8px] h-[4px] flex items-center justify-center pointer-events-none">
          <Indicator colors={indicatorColors} />
        </div>
      )}
    </div>
  );
};
