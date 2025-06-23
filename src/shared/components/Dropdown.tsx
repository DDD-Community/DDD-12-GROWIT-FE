import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import FlexBox from './FlexBox';

interface DropdownProps {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
  placeholder: string;
  disabled?: boolean;
  isError?: boolean;
  className?: string;
}

export const Dropdown = ({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
  isError = false,
  className = '',
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  // 드롭다운 바깥쪽 클릭 시 닫히도록 했습니다
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIdx(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyBoardEvents = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIdx(0);
        } else if (focusedIdx >= 0) {
          handleSelect(options[focusedIdx]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (isOpen) {
          setFocusedIdx(prev => (prev < options.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIdx(prev => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIdx(-1);
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          setFocusedIdx(-1);
        }
        break;
    }
  };

  const handleSelect = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
    setFocusedIdx(-1);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onKeyDown={handleKeyBoardEvents}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={selected ? `선택됨: ${selected}` : placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 text-left rounded-lg bg-[#2C2C2E] border focus:ring-1 ${isError ? 'border-status-negative' : 'focus:ring-white border-line-normal'} pr-10 body-1-regular ${className}`}
      >
        {selected ? (
          <span className="text-label-normal">{selected}</span>
        ) : (
          <span className="text-label-alternative">{placeholder}</span>
        )}
        <Image
          src="/chevron-down.svg"
          alt="chevron-down"
          width={20}
          height={20}
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-[#2C2C2E] rounded-lg shadow-lg border border-line-alternative">
          {options.map((option, idx) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-3 hover:bg-[#3a3a3d] ${focusedIdx === idx ? 'bg-[#3a3a3d]' : ''} cursor-pointer text-label-normal transition-all transform active:scale-[0.96]`}
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
