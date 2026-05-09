'use client';

interface TodoItemCheckboxProps {
  checked: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 디자인 시스템 Checkbox (growit-ds 2487:7315) 사양 + 196:1554 변경:
 * - fill 삭제, stroke 추가 → unchecked 시 배경 없음, border-#525252 1px
 * - checked: bg-#BBF451 (lime-300) + 검은 체크 아이콘
 */
export const TodoItemCheckbox = ({ checked, onClick, className = '' }: TodoItemCheckboxProps) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={e => {
      e.stopPropagation();
      onClick?.();
    }}
    className={`relative w-4 h-4 rounded-md transition-colors ${
      checked
        ? 'bg-[#BBF451] shadow-[0px_2px_4px_rgba(0,0,0,0.04),0px_1px_2px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.06)]'
        : 'border border-[#525252]'
    } ${className}`}
  >
    {checked && (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <path
          d="M1.5 5.25L3.75 7.5L8.5 2.5"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);
