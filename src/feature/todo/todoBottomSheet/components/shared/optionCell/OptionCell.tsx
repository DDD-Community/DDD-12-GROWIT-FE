'use client';

import { cn } from '@/shared/lib/utils';

interface OptionCellProps<T extends string> {
  /** 옵션 값 */
  value: T;
  /** 표시할 라벨 */
  label: string;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 클릭 핸들러 */
  onClick: (value: T) => void;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 추가 className */
  className?: string;
}

/**
 * 선택 가능한 옵션 셀 컴포넌트
 * - 선택 시 체크 아이콘 (오른쪽) + Bold 텍스트 (흰색)
 * - 미선택 시 Regular 텍스트 (회색)
 * - leftIcon: 왼쪽에 아이콘 표시 가능
 */
export function OptionCell<T extends string>({
  value,
  label,
  isSelected = false,
  onClick,
  leftIcon,
  className,
}: OptionCellProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        'w-full flex items-center',
        isSelected ? 'justify-between' : 'justify-start',
        'px-[14px] py-[8px] rounded-[8px]',
        'transition-colors',
        className
      )}
    >
      <span className="flex items-center gap-2">
        {leftIcon}
        <span
          className={cn(
            'text-[16px] leading-[1.5] tracking-[0.0912px]',
            isSelected ? 'font-bold text-white' : 'font-normal text-[#c2c4c8]'
          )}
        >
          {label}
        </span>
      </span>
      {isSelected && <CheckIcon />}
    </button>
  );
}

/** 체크 아이콘 */
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.16667 10L8.33333 14.1667L15.8333 6.66667"
      stroke="#3AEE49"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default OptionCell;
