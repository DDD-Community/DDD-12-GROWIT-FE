'use client';

import { InputHTMLAttributes, useState, useEffect, useCallback } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  version?: 'default' | 'underline';
  label?: string;
  isError?: boolean;
  errorMessage?: string | null;
  description?: string;
}

export function InputField({
  version = 'default',
  label = '',
  isError,
  errorMessage,
  description,
  ...props
}: InputFieldProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (props.value) {
      setCharCount(String(props.value).length);
    }
  }, [props.value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
    if (props.onInput) {
      props.onInput(e);
    }
  };

  // 스타일 클래스 생성 함수
  const getInputClassName = useCallback(
    (version: 'default' | 'underline', isError: boolean | undefined, errorMessage: string | null | undefined) => {
      const baseClasses = 'w-full h-full py-3 text-white';
      const errorClasses = isError || errorMessage ? 'border-status-negative' : '';
      const placeholderClasses = version === 'underline' ? 'placeholder-text-tertiary' : 'placeholder-gray-500';

      if (version === 'underline') {
        // underline 스타일: 하단 테두리만, active/focus 시 brand-neon
        return `${baseClasses} ${placeholderClasses} border-b active:border-brand-neon focus:border-brand-neon ${
          errorClasses || 'border-label-assistive'
        }`;
      }

      // default 스타일: 전체 테두리, rounded, 배경색
      return `${baseClasses} ${placeholderClasses} px-4 rounded-lg bg-[#2C2C2E] border border-label-assistive focus:ring-2 ${
        isError || errorMessage ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-primary-normal'
      }`;
    },
    []
  );

  const inputClassName = getInputClassName(version, isError, errorMessage);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative mb-1">
        <input maxLength={props.maxLength} {...props} onInput={handleInput} className={inputClassName} />
        {isError ||
          (errorMessage && (
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
          ))}
      </div>
      <div className="flex justify-between items-center">
        {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
        {description && <p className="text-xs text-white">{description}</p>}
        {props.maxLength && (
          <div className="ml-auto">
            <span className="text-xs text-[rgba(174,176,182,0.61)]">
              ({charCount}/{props.maxLength})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function InputWithCount({ maxLength, value, ...props }: InputFieldProps) {
  return (
    <div className="pb-2 relative">
      <InputField maxLength={maxLength} {...props} />
      <div className="absolute right-0 bottom-[-5] label-1-normal text-label-neutral">
        {value ? String(value).length : 0}/{maxLength}
      </div>
    </div>
  );
}
