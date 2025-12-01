import React from 'react';
import { DateCellProps } from '../../types';
import { Indicator } from './Indicator';
import { toDateKey } from '../../utils';

/**
 * 날짜 셀 컴포넌트
 */
export const DateCell: React.FC<DateCellProps> = ({
  date,
  displayNumber,
  isSelected,
  isToday,
  isCurrentMonth,
  indicatorCount = 0,
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

  // 스타일 결정
  const textColor = isCurrentMonth ? '#C2C4C8' : 'rgba(157, 158, 173, 0.3)';
  const fontWeight = isSelected ? 500 : 400;

  return (
    <div
      className={`flex justify-center items-end w-10 h-10 pb-[3px] cursor-pointer ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${displayNumber}일${holidayLabel ? ` ${holidayLabel}` : ''}`}
      aria-selected={isSelected}
      aria-current={isToday ? 'date' : undefined}
    >
      {/* 날짜 숫자 - 선택된 경우 원형 배경 */}
      <div
        className={`flex justify-center items-center rounded-full ${
          isSelected ? 'w-[30px] h-[30px] bg-[#3AEE49]' : 'w-[30px] h-[30px]'
        }`}
      >
        <span
          className="text-[14px] leading-[20px] tracking-[0.0145em] text-center"
          style={{
            color: isSelected ? '#0F0F10' : textColor,
            fontWeight: fontWeight,
          }}
        >
          {displayNumber}
        </span>
      </div>
    </div>
  );
};
