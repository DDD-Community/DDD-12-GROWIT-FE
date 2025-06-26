import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

interface DatePanelProps {
  selectedDate?: Date;
  focusedDate: Date;
  onDateSelect: (date: Date) => void;
  onFocusedDateChange: (date: Date) => void;
  onClose: () => void;
}

const DatePanel = React.forwardRef<HTMLDivElement, DatePanelProps>(
  ({ selectedDate, focusedDate, onDateSelect, onFocusedDateChange, onClose }, ref) => {
    const [currentMonth, setCurrentMonth] = useState(focusedDate);
    const gridRef = useRef<HTMLDivElement>(null);

    // 패널이 열릴 때 포커스를 그리드로 이동
    useEffect(() => {
      if (gridRef.current) {
        gridRef.current.focus();
      }
    }, []);

    // 날짜 유틸리티 함수들
    const getMonthStart = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const getMonthEnd = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    };

    const getCalendarDays = () => {
      const monthStart = getMonthStart(currentMonth);
      const monthEnd = getMonthEnd(currentMonth);
      const startDate = new Date(monthStart);
      const endDate = new Date(monthEnd);

      // 시작 요일 계산 (일요일: 0, 월요일: 1, ...)
      const startDay = monthStart.getDay();
      startDate.setDate(startDate.getDate() - startDay);

      // 끝 요일 계산
      const endDay = monthEnd.getDay();
      endDate.setDate(endDate.getDate() + (6 - endDay));

      const days = [];
      const current = new Date(startDate);

      while (current <= endDate) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return days;
    };

    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const isCurrentMonth = (date: Date) => {
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const newDate = new Date(focusedDate);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          newDate.setDate(newDate.getDate() - 1);
          onFocusedDateChange(newDate);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newDate.setDate(newDate.getDate() + 1);
          onFocusedDateChange(newDate);
          break;
        case 'ArrowUp':
          e.preventDefault();
          newDate.setDate(newDate.getDate() - 7);
          onFocusedDateChange(newDate);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newDate.setDate(newDate.getDate() + 7);
          onFocusedDateChange(newDate);
          break;
        case 'Home':
          e.preventDefault();
          newDate.setDate(1);
          onFocusedDateChange(newDate);
          break;
        case 'End':
          e.preventDefault();
          const lastDay = getMonthEnd(newDate);
          newDate.setDate(lastDay.getDate());
          onFocusedDateChange(newDate);
          break;
        case 'PageUp':
          e.preventDefault();
          if (e.shiftKey) {
            newDate.setFullYear(newDate.getFullYear() - 1);
          } else {
            newDate.setMonth(newDate.getMonth() - 1);
          }
          onFocusedDateChange(newDate);
          setCurrentMonth(newDate);
          break;
        case 'PageDown':
          e.preventDefault();
          if (e.shiftKey) {
            newDate.setFullYear(newDate.getFullYear() + 1);
          } else {
            newDate.setMonth(newDate.getMonth() + 1);
          }
          onFocusedDateChange(newDate);
          setCurrentMonth(newDate);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onDateSelect(focusedDate);
          break;
      }

      // 포커스된 날짜가 현재 월을 벗어나면 월 변경
      if (newDate.getMonth() !== currentMonth.getMonth() || newDate.getFullYear() !== currentMonth.getFullYear()) {
        setCurrentMonth(newDate);
      }
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      const newMonth = new Date(currentMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCurrentMonth(newMonth);
    };

    const days = getCalendarDays();
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div
        ref={ref}
        className="absolute top-full left-0 right-0 mt-2 bg-label-button-neutral text-white border border-label-assistive rounded-lg shadow-lg z-50"
        role="dialog"
        aria-label="날짜 선택"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between pt-4 px-2 pb-2 border-label-assistive">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:accent-violet"
            aria-label="이전 달"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#DCDCDC"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h2 className="text-lg font-semibold">
            {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
          </h2>

          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:accent-violet"
            aria-label="다음 달"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#DCDCDC"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 p-2 pb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center label-1-regular text-label-alternative p-2">
              <abbr title={`${day}요일`} className="no-underline">
                {day}
              </abbr>
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div
          ref={gridRef}
          className="grid grid-cols-7 gap-1 px-2 py-3 pt-0"
          role="grid"
          aria-label="날짜 그리드"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {days.map((day, index) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isFocused = isSameDay(day, focusedDate);
            const isInCurrentMonth = isCurrentMonth(day);
            const isToday = isSameDay(day, new Date());

            return (
              <button
                key={index}
                onClick={() => {
                  onDateSelect(day);
                  onFocusedDateChange(day);
                }}
                className={`
                relative p-2 label-1-regular rounded-full transition-colors
                ${isSelected ? 'bg-accent-violet text-white' : ''}
                ${isFocused && !isSelected ? 'bg-gray-700 text-white' : ''}
                ${!isInCurrentMonth ? 'text-gray-500' : ''}
                ${isToday && !isSelected ? 'bg-gray-600' : ''}
                hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:accent-violet
              `}
                role="gridcell"
                aria-label={`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일${isSelected ? ', 선택됨' : ''}${isToday ? ', 오늘' : ''}`}
                aria-selected={isSelected}
                tabIndex={-1}
              >
                {day.getDate()}
                {isToday && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-violet rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

DatePanel.displayName = 'DatePanel';

export default DatePanel;
