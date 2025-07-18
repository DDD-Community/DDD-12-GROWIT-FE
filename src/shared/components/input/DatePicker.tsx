'use client';

import { ButtonHTMLAttributes, useState, useRef, useEffect } from 'react';
import DatePanel from './DatePanel';
import { createPortal } from 'react-dom';

interface DatePickerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onKeyDown'> {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  placeholder?: string;
  isStartDate?: boolean;
  allowedDaysOfWeek?: number[]; // 0: 일요일, 1: 월요일, ..., 6: 토요일
  minDate?: Date; // 최소 선택 가능 날짜
  maxDate?: Date; // 최대 선택 가능 날짜
}

const DatePicker = ({
  selectedDate,
  onDateSelect,
  placeholder = 'YY - MM - DD',
  isStartDate = false,
  allowedDaysOfWeek,
  minDate,
  maxDate,
  ...props
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(selectedDate);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    // const year = String(date.getFullYear()).slice(2);
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // return `${year}-${month}-${day}`;
    return date
      .toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .slice(0, 10);
  };

  // 패널 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ESC 키로 패널 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect?.(date);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        {...props}
        className="w-full h-full flex items-center gap-2 md:gap-4 px-4 py-3 rounded-lg bg-label-button-neutral text-white body-1-normal border border-label-assistive shadow-xs focus:ring-2 focus:outline-none"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={selectedDate ? `선택된 날짜: ${formatDate(selectedDate)}` : placeholder}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15.8332 3.33341H14.1665V2.50008C14.1665 2.27907 14.0787 2.06711 13.9224 1.91083C13.7661 1.75455 13.5542 1.66675 13.3332 1.66675C13.1122 1.66675 12.9002 1.75455 12.7439 1.91083C12.5876 2.06711 12.4998 2.27907 12.4998 2.50008V3.33341H7.49984V2.50008C7.49984 2.27907 7.41204 2.06711 7.25576 1.91083C7.09948 1.75455 6.88752 1.66675 6.6665 1.66675C6.44549 1.66675 6.23353 1.75455 6.07725 1.91083C5.92097 2.06711 5.83317 2.27907 5.83317 2.50008V3.33341H4.1665C3.50346 3.33341 2.86758 3.59681 2.39874 4.06565C1.9299 4.53449 1.6665 5.17037 1.6665 5.83341V15.8334C1.6665 16.4965 1.9299 17.1323 2.39874 17.6012C2.86758 18.07 3.50346 18.3334 4.1665 18.3334H15.8332C16.4962 18.3334 17.1321 18.07 17.6009 17.6012C18.0698 17.1323 18.3332 16.4965 18.3332 15.8334V5.83341C18.3332 5.17037 18.0698 4.53449 17.6009 4.06565C17.1321 3.59681 16.4962 3.33341 15.8332 3.33341ZM16.6665 15.8334C16.6665 16.0544 16.5787 16.2664 16.4224 16.4227C16.2661 16.579 16.0542 16.6667 15.8332 16.6667H4.1665C3.94549 16.6667 3.73353 16.579 3.57725 16.4227C3.42097 16.2664 3.33317 16.0544 3.33317 15.8334V10.0001H16.6665V15.8334ZM16.6665 8.33341H3.33317V5.83341C3.33317 5.6124 3.42097 5.40044 3.57725 5.24416C3.73353 5.08788 3.94549 5.00008 4.1665 5.00008H5.83317V5.83341C5.83317 6.05443 5.92097 6.26639 6.07725 6.42267C6.23353 6.57895 6.44549 6.66675 6.6665 6.66675C6.88752 6.66675 7.09948 6.57895 7.25576 6.42267C7.41204 6.26639 7.49984 6.05443 7.49984 5.83341V5.00008H12.4998V5.83341C12.4998 6.05443 12.5876 6.26639 12.7439 6.42267C12.9002 6.57895 13.1122 6.66675 13.3332 6.66675C13.5542 6.66675 13.7661 6.57895 13.9224 6.42267C14.0787 6.26639 14.1665 6.05443 14.1665 5.83341V5.00008H15.8332C16.0542 5.00008 16.2661 5.08788 16.4224 5.24416C16.5787 5.40044 16.6665 5.6124 16.6665 5.83341V8.33341Z"
            fill="#AEB0B6"
            fillOpacity="0.61"
          />
        </svg>
        <span className="flex-1 text-left body-2-regular">{selectedDate ? formatDate(selectedDate) : placeholder}</span>
      </button>

      {isOpen && (
        <DatePanel
          ref={panelRef}
          selectedDate={selectedDate}
          focusedDate={focusedDate || new Date()}
          isStartDate={isStartDate}
          allowedDaysOfWeek={allowedDaysOfWeek}
          minDate={minDate}
          maxDate={maxDate}
          onDateSelect={handleDateSelect}
          onFocusedDateChange={setFocusedDate}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DatePicker;
