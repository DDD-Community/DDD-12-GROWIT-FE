'use client';

import { cn } from '@/shared/lib/utils';

interface OptionCellProps<T extends string> {
  /** 옵션 값 */
  value: T;
  /** 표시할 라벨 */
  label: string;
  /** 선택 여부 */
  isSelected: boolean;
  /** 클릭 핸들러 */
  onClick: (value: T) => void;
  /** 추가 className */
  className?: string;
}

/**
 * 선택 가능한 옵션 셀 컴포넌트
 * - 선택 시 체크 아이콘 + Bold 텍스트 (흰색)
 * - 미선택 시 Regular 텍스트 (회색)
 */
export function OptionCell<T extends string>({ value, label, isSelected, onClick, className }: OptionCellProps<T>) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        'w-full flex items-center justify-center gap-2',
        'px-5 py-3 rounded-lg',
        'transition-colors',
        className
      )}
    >
      {isSelected && <CheckIcon />}
      <span className={cn('body-1-normal', isSelected ? 'body-1-normal-bold text-white' : 'text-text-primary')}>
        {label}
      </span>
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
