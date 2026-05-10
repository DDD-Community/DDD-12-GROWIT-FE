import { InputHTMLAttributes, useState } from 'react';

/**
 * Figma 196:1631 _CheckboxControl (DS 2487:7315 + 변경: fill 삭제, stroke 추가)
 *
 * - 16x16 정사각형, rounded-md (6px)
 * - unchecked: border 1px #525252 (color/neutral/600)
 * - checked: bg #BBF451 (lime-300) + 검은 체크 8x8
 * - disabled: opacity 50%
 *
 * `appearance-none`을 명시해 브라우저 native checkbox(둥근 모서리)
 * 렌더링을 막고, border-radius를 직접 6px로 지정한다.
 */
const Checkbox: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
  const isControlled = props.checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(props.defaultChecked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    props.onChange?.(e);
  };

  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        disabled={props.disabled}
        checked={isControlled ? props.checked : internalChecked}
        onChange={handleChange}
        className="peer w-4 h-4 border border-[#525252] checked:bg-[#BBF451] checked:border-[#BBF451] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        style={{
          borderRadius: '6px',
          appearance: 'none',
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        }}
        {...props}
      />
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M1.3 4.2L3.1 6L6.7 2"
          stroke={props.disabled ? '#A1A1A1' : '#000000'}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
};

export default Checkbox;
