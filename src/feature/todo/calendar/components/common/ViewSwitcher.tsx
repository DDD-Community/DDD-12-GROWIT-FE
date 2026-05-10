import React from 'react';
import { ViewSwitcherProps, CalendarView } from '../../types';

/**
 * Figma 196:1931 — Tabs (DS 변경: selected color = lime-300 underline)
 *
 * 컨테이너: border-b 1px #28282C
 * 활성 탭: border-b 2px #BBF451 + text #FCFCFC
 * 비활성 탭: text #A1A1AA (foreground/muted)
 * 각 탭: pb-[6px] pt-[4px] px-[12px], 14px Medium / 1.43 leading
 */
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  selectedView,
  onViewChange,
  className = '',
}) => {
  const handleViewChange = (view: CalendarView) => {
    onViewChange(view);
  };

  return (
    <div className={`inline-flex items-center border-b border-[#28282C] ${className}`}>
      {(['weekly', 'monthly'] as const).map(view => {
        const active = selectedView === view;
        return (
          <button
            key={view}
            type="button"
            onClick={() => handleViewChange(view)}
            className={`flex items-center justify-center gap-[6px] pt-[4px] pb-[6px] px-[12px] text-[14px] font-medium leading-[1.43] transition-colors ${
              active
                ? 'border-b-2 border-[#BBF451] text-[#FCFCFC]'
                : 'text-[#A1A1AA]'
            }`}
            aria-pressed={active}
          >
            {view === 'weekly' ? '주' : '월'}
          </button>
        );
      })}
    </div>
  );
};
