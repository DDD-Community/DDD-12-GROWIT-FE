'use client';

import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
  errorMessage?: string | null;
  description?: string;
}

export function InputField({ label, isError, errorMessage, description, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <input
          maxLength={props.maxLength}
          {...props}
          className={`w-full h-full px-4 py-3 rounded-lg bg-[#2C2C2E] text-white border border-label-assistive placeholder-gray-500 focus:ring-2 ${
            isError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-primary-normal'
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
      {isError && <p className="text-xs text-red-500">{errorMessage}</p>}{' '}
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
