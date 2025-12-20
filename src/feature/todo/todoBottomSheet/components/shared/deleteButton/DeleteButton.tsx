'use client';

import { cn } from '@/shared/lib/utils';

interface DeleteButtonProps {
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 텍스트 */
  text?: string;
  /** 추가 className */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33334 5.83333H16.6667M8.33334 9.16667V14.1667M11.6667 9.16667V14.1667M4.16667 5.83333L5.00001 15.8333C5.00001 16.7538 5.74619 17.5 6.66667 17.5H13.3333C14.2538 17.5 15 16.7538 15 15.8333L15.8333 5.83333M7.5 5.83333V3.33333C7.5 2.8731 7.8731 2.5 8.33333 2.5H11.6667C12.1269 2.5 12.5 2.8731 12.5 3.33333V5.83333"
      stroke="#FF6363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DeleteButton = ({ onClick, text = '삭제', className, disabled = false }: DeleteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center justify-center gap-2',
        'h-[44px] px-[18px] py-[10px] rounded-[8px]',
        'shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-opacity',
        className
      )}
    >
      <TrashIcon />
      <span className="font-bold text-[16px] leading-[1.5] tracking-[0.057px] text-[#FF6363]">{text}</span>
    </button>
  );
};

export default DeleteButton;
