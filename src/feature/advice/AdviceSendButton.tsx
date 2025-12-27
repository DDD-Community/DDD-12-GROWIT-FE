import { ButtonHTMLAttributes } from 'react';

type AdviceSendButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const AdviceSendButton = ({ ...props }: AdviceSendButtonProps) => {
  const buttonClasses = `${props.disabled ? 'bg-fill-normal cursor-not-allowed' : 'bg-white cursor-pointer'}`;
  return (
    <button
      {...props}
      className={`shadow-xs rounded-full w-9 h-9 body-1-bold flex items-center justify-center ${buttonClasses}`}
    >
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.5 1.75L16.625 18.375L10.5 14.875L4.375 18.375L10.5 1.75Z"
          stroke="#0F0F10"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
