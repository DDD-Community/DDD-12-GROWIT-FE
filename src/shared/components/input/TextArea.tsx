'use client';

import { TextareaHTMLAttributes, useState } from 'react';
import FlexBox from '../foundation/FlexBox';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isError?: boolean;
  errorMessage?: string | null;
  description?: string;
}

export function TextArea({ label, isError, errorMessage, description, className = '', ...props }: TextAreaProps) {
  const [wordCount, setWordCount] = useState(0);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto'; // 줄이기 가능하게 초기화
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // 실제 내용 높이만큼 확장
    setWordCount(e.currentTarget.value.length);
  };

  return (
    <div className={`space-y-0 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-300">{label}</label>}
      <div className="relative mt-2">
        <textarea
          maxLength={props.maxLength}
          onInput={handleInput}
          {...props}
          className={`w-full min-h-[88px] px-4 py-3 rounded-lg bg-[#2C2C2E] text-white placeholder-gray-500 border border-label-assistive focus:ring-2 ${
            isError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-[#8C7FF7]'
          }`}
        />
        {isError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm1 4a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {isError ? (
        <FlexBox className="w-full justify-between">
          {isError && <p className="text-xs text-red-500">{errorMessage}</p>}
          <div className="label-1-regular text-label-neutral">
            {props.maxLength && `${wordCount}/${props.maxLength}`}
          </div>
        </FlexBox>
      ) : (
        <div className="flex justify-end label-1-regular text-label-neutral">
          {props.maxLength && `${wordCount}/${props.maxLength}`}
        </div>
      )}
    </div>
  );
}
