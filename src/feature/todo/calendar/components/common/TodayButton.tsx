import React from 'react';

interface TodayButtonProps {
  /** 오늘 버튼 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 className */
  className?: string;
}

/**
 * 오늘 날짜로 이동하는 버튼 컴포넌트
 */
export const TodayButton: React.FC<TodayButtonProps> = ({ onClick, className = '' }) => {
  if (!onClick) return null;

  return (
    <div
      className={`border border-[#46474C] border-solid flex items-center relative rounded-[16px] shrink-0 ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex h-[26px] items-center px-[10px] py-[2px] relative rounded-[16px] shrink-0"
      >
        <span className="text-[13px] font-medium leading-[18px] tracking-[0.2522px] text-label-normal text-center">
          오늘
        </span>
      </button>
    </div>
  );
};

export default TodayButton;
