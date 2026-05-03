import React from 'react';
import { ViewSwitcherProps, CalendarView } from '../../types';

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ selectedView, onViewChange, className = '' }) => {
  const handleViewChange = (view: CalendarView) => {
    onViewChange(view);
  };

  return (
    <div className={`inline-flex items-center gap-0.5 bg-[#27272A] rounded-[28px] px-2 py-1 ${className}`}>
      {(['weekly', 'monthly'] as const).map(view => (
        <button
          key={view}
          onClick={() => handleViewChange(view)}
          className={`
            px-3 py-0.5 rounded-[32px] text-sm font-medium leading-[143%] text-center transition-colors
            ${selectedView === view
              ? 'bg-white text-[#18181B] shadow-[0px_2px_8px_rgba(0,0,0,0.06)]'
              : 'text-[#71717A]'}
          `}
          aria-pressed={selectedView === view}
        >
          {view === 'weekly' ? '주' : '월'}
        </button>
      ))}
    </div>
  );
};
