'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import FlexBox from './flexBox';

interface DropdownProps {
  options: string[];
  isError?: boolean;
  className?: string;
}

export const Dropdown = ({ options, isError = false, className = '' }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // 드롭다운 바깥쪽 클릭 시 닫히도록 했습니다
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left rounded-lg bg-[#2C2C2E] border focus:ring-1 ${isError ? 'border-status-negative' : 'focus:ring-white border-line-normal'} pr-10 body-1-regular ${className}`}
      >
        {selected ? (
          <span className="text-label-normal">{selected}</span>
        ) : (
          <span className="text-label-alternative">경력 선택</span>
        )}
        <Image
          src="/chevron-down.svg"
          alt="chevron-down"
          width={20}
          height={20}
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[#2C2C2E] rounded-lg shadow-lg border border-line-alternative">
          {options.map(option => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-[#3a3a3d] cursor-pointer text-label-normal"
            >
              {selected === option ? (
                <FlexBox className="gap-2">
                  <Image src={'/check.svg'} alt="checked-option" width={24} height={24} />
                  {option}
                </FlexBox>
              ) : (
                <>{option}</>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface DropdownFieldProps extends DropdownProps {
  label?: string;
  errorMessage?: string;
}

export const DropdownField = ({ label, isError, errorMessage, ...rest }: DropdownFieldProps) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium label-1-regular text-label-normal">{label}</label>}
      <Dropdown isError={isError} {...rest} />
      {isError && errorMessage && <p className="label-1-regular text-red-500">{errorMessage}</p>}
    </div>
  );
};
