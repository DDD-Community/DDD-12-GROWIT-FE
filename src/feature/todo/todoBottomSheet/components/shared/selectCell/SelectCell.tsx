'use client';

import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';
import { ChevronRightIcon } from '../icons';

interface SelectCellProps {
  /** 왼쪽 아이콘 */
  icon: ReactNode;
  /** 라벨 텍스트 */
  label: string;
  /** 선택된 값 (없으면 placeholder 표시) */
  value?: string;
  /** 값이 없을 때 표시할 텍스트 */
  placeholder?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 className */
  className?: string;
}

export const SelectCell = ({ icon, label, value, placeholder = '선택', onClick, className }: SelectCellProps) => {
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between gap-4',
        'bg-fill-primary rounded-lg',
        'px-5 py-4',
        className
      )}
    >
      {/* Leading Contents */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="shrink-0 text-white">{icon}</div>
        <span className="label-1-medium text-label-alternative">{label}</span>
      </div>

      {/* Trailing Contents */}
      <div className="flex items-center gap-1 shrink-0">
        <span className={cn('label-1-medium', isPlaceholder ? 'text-label-assistive' : 'text-label-alternative')}>
          {displayValue}
        </span>
        <ChevronRightIcon />
      </div>
    </button>
  );
};

export default SelectCell;
