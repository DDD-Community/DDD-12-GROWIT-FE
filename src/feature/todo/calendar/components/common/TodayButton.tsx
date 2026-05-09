import React from 'react';

interface TodayButtonProps {
  onClick?: () => void;
  className?: string;
}

export const TodayButton: React.FC<TodayButtonProps> = ({ onClick, className = '' }) => {
  if (!onClick) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-[5px] min-h-8 max-h-8 px-3 py-1.5 border border-[#28282C] rounded-2xl shrink-0 overflow-hidden ${className}`}
    >
      <span className="text-[14px] font-medium leading-[20px] text-[#FCFCFC] whitespace-nowrap">
        오늘
      </span>
    </button>
  );
};

export default TodayButton;
