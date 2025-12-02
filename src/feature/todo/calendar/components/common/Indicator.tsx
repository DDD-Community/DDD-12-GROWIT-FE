import React from 'react';
import { IndicatorProps } from '../../types';

const DEFAULT_COLOR = '#35D942';

/**
 * 투두 인디케이터 컴포넌트
 * 색상 배열을 받아 최대 3개의 점을 표시
 */
export const Indicator: React.FC<IndicatorProps> = ({ colors, maxDisplay = 3, className = '' }) => {
  if (!colors || colors.length === 0) return null;

  const displayColors = colors.slice(0, maxDisplay);

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {displayColors.map((color, index) => (
        <div
          key={index}
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: color && color.trim() ? color : DEFAULT_COLOR }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
