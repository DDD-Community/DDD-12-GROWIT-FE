'use client';

interface TodoItemCheckboxProps {
  checked: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Figma 196:1631 _CheckboxControl (DS 2487:7315 + 변경: fill 삭제, stroke 추가)
 *
 * - 16x16, rounded-md (6px)
 * - unchecked: border 1px #525252 (color/neutral/600), 배경 없음
 * - checked: bg #BBF451 (lime-300), 검은 체크 아이콘 6x6
 *
 * Figma의 inner check union은 8x8 viewBox 안에서 inset
 * [23.44% 16.23% 25.19% 15.94%] 비율로 그려진다 — 동일한 형상의
 * stroke path로 표현.
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
    className={`relative w-4 h-4 transition-colors ${
      checked ? 'bg-[#BBF451]' : 'border border-[#525252]'
    } ${className}`}
    style={{ borderRadius: '6px', appearance: 'none', WebkitAppearance: 'none' }}
  >
    {checked && (
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <path
          d="M1.3 4.2L3.1 6L6.7 2"
          stroke="#000000"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);
