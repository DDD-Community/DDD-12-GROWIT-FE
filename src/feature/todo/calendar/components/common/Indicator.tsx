import React from 'react';
import { IndicatorProps } from '../../types';

/**
 * 투두 인디케이터 컴포넌트
 * 날짜에 등록된 투두 개수를 녹색 원으로 표시 (최대 3개)
 */
export const Indicator: React.FC<IndicatorProps> = ({ count, maxDisplay = 3, className = '' }) => {
  if (count === 0) return null;

  const displayCount = Math.min(count, maxDisplay);

  return (
    <div className={`flex items-center justify-center gap-[2px] ${className}`}>
      {Array.from({ length: displayCount }).map((_, index) => (
        <div key={index} className="w-1 h-1 rounded-full bg-[#35D942]" aria-hidden="true" />
      ))}
    </div>
  );
};
