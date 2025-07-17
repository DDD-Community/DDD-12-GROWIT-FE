import { useRef, useState, useEffect } from 'react';
import FlexBox from '../layout/FlexBox';
import { createPortal } from 'react-dom';

interface SelectProps {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
  placeholder: string;
  disabled?: boolean;
  isError?: boolean;
  className?: string;
}

export const Select = ({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
  isError = false,
  className = '',
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  // 드롭다운 바깥쪽 클릭 시 닫히도록 했습니다
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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
    <div className="relative w-full" ref={selectRef}>
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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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

export const SelectWithPortal = ({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
  isError = false,
  className = '',
}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // 드롭다운 바깥쪽 클릭 시 닫히도록 했습니다
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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
    <div className="relative w-full" ref={selectRef}>
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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="white"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <ul
            onMouseDown={e => e.stopPropagation()}
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="fixed z-50 mt-1 w-full bg-[#2C2C2E] rounded-lg shadow-lg border border-line-alternative"
          >
            {options.map((option, idx) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 hover:bg-[#3a3a3d] ${focusedIdx === idx ? 'bg-[#3a3a3d]' : ''} cursor-pointer text-label-normal transition-all transform active:scale-[0.96]`}
              >
                {selected === option ? (
                  <FlexBox className="gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {option}
                  </FlexBox>
                ) : (
                  <>{option}</>
                )}
              </li>
            ))}
          </ul>,
          document.querySelector('#modal-portal-layer')!
        )}
    </div>
  );
};

interface SelectFieldProps extends SelectProps {
  label?: string;
  errorMessage?: string;
}

const SelectField = ({ label, isError, errorMessage, ...rest }: SelectFieldProps) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium label-1-regular text-label-normal">{label}</label>}
      <Select isError={isError} {...rest} />
      {isError && errorMessage && <p className="label-1-regular text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
