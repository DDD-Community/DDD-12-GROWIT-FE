import React from 'react';
import { DateCellProps } from '../../types';
import { Indicator } from './Indicator';

/**
 * 날짜 셀 컴포넌트
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

  // 일반 셀 텍스트 색 (Figma color/zinc/50 / current month) vs muted
  const textColor = isCurrentMonth ? '#FAFAFA' : 'rgba(157, 158, 173, 0.3)';
  const fontWeight = isSelected || isToday ? 500 : 400;

  // 선택일 > 오늘 우선순위. (Figma 196:1554: 선택 lime-300 채움 / 오늘 zinc-800 border)
  const cellState =
    isSelected ? 'selected'
    : isToday ? 'today'
    : 'default';

  // Figma 196:1610 DS 변경: selected → white, today → 원 stroke
  const cellClass =
    cellState === 'selected'
      ? 'w-9 h-9 bg-[#FFFFFF]'
      : cellState === 'today'
      ? 'w-9 h-9 border border-[#27272A]'
      : '';

  const numberColor =
    cellState === 'selected' ? '#000000' : textColor;

  return (
    <div
      className={`flex flex-col items-center justify-end w-[50px] h-[50px] pb-[3px] cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${displayNumber}일${holidayLabel ? ` ${holidayLabel}` : ''}`}
      aria-selected={isSelected}
      aria-current={isToday ? 'date' : undefined}
    >
      <div
        className={`flex justify-center items-center rounded-full ${cellClass}`}
      >
        <span
          className="text-[14px] leading-[1.42] text-center"
          style={{ color: numberColor, fontWeight }}
        >
          {displayNumber}
        </span>
      </div>
      <div className="h-[4px] mt-[3px] flex items-center justify-center">
        {indicatorColors && <Indicator colors={indicatorColors} />}
      </div>
    </div>
  );
};
