import { InputHTMLAttributes, useState, useEffect } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
  errorMessage?: string | null;
  description?: string;
}

export const InputUnderline = ({ label, isError, errorMessage, description, ...props }: InputFieldProps) => {
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

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative mb-1">
        <input
          maxLength={props.maxLength}
          {...props}
          onInput={handleInput}
          className={`w-full h-full px-4 py-3 text-white border-b border-label-assistive placeholder-text-tertiary active:border-brand-neon focus:border-brand-neon ${
            isError || errorMessage ? 'border-status-negative' : 'border-label-assistive'
          }`}
        />
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
};
