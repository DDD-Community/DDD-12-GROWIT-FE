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
      className={`px-3 py-1 border border-[#DEDEE0] rounded-2xl shrink-0 ${className}`}
    >
      <span className="text-sm font-medium leading-5 text-[#F4F4F5]">
        오늘
      </span>
    </button>
  );
};

export default TodayButton;
