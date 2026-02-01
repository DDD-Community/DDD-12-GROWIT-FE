import React from 'react';
import { ViewSwitcherProps, CalendarView } from '../../types';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

/**
 * 뷰 전환 버튼 (Segmented Control)
 */
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ selectedView, onViewChange, className = '' }) => {
  const { trackButtonClick } = useGTMActions();

  const handleViewChange = (view: CalendarView) => {
    const VIEW_GTM_BUTTON_NAME: Record<CalendarView, GTM_BUTTON_NAME> = {
      weekly: GTM_BUTTON_NAME.WEEK,
      monthly: GTM_BUTTON_NAME.MONTH,
    };

    trackButtonClick({
      eventName: GTM_EVENTS.HOME,
      buttonName: VIEW_GTM_BUTTON_NAME[view],
    });
    onViewChange(view);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="inline-flex items-center bg-[#292A2D] rounded-2xl">
        {/* 주간 버튼 */}
        <button
          onClick={() => handleViewChange('weekly')}
          className={`
            px-[10px] py-[2px] h-[26px] rounded-2xl
            text-[13px] font-medium leading-[18px] tracking-[0.0194em] text-center
            transition-colors
            ${selectedView === 'weekly' ? 'bg-white text-[#0F0F10]' : 'bg-transparent text-[#878A93]'}
          `}
          aria-pressed={selectedView === 'weekly'}
        >
          주
        </button>

        {/* 월간 버튼 */}
        <button
          onClick={() => handleViewChange('monthly')}
          className={`
            px-[10px] py-[2px] h-[26px] rounded-2xl
            text-[13px] font-medium leading-[18px] tracking-[0.0194em] text-center
            transition-colors
            ${selectedView === 'monthly' ? 'bg-white text-[#0F0F10]' : 'bg-transparent text-[#878A93]'}
          `}
          aria-pressed={selectedView === 'monthly'}
        >
          월
        </button>
      </div>
    </div>
  );
};
