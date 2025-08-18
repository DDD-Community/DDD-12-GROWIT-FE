import { InputHTMLAttributes, useState } from 'react';

const Checkbox: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
  const isControlled = props.checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(props.defaultChecked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked); // uncontrolled 상태 업데이트
    }
    props.onChange?.(e); // controlled든 uncontrolled든 onChange 호출
  };

  const getStyles = () => {
    if (props.disabled) {
      return 'bg-interaction-disable outline-line-normal';
    } else {
      return 'outline-line-strong hover:outline-gray-400 focus:border focus:border-line-normal focus:drop-shadow-sm checked:bg-primary-normal';
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        disabled={props.disabled}
        checked={isControlled ? props.checked : internalChecked} // controlled/uncontrolled 분기
        onChange={handleChange}
        className={`peer appearance-none w-5 h-5 rounded-sm outline-1 ${getStyles()}`}
        {...props}
      />
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity`}
      >
        <path
          d="M20 6L9 17L4 12"
          stroke={props.disabled ? 'gray' : 'black'}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
};

export default Checkbox;
