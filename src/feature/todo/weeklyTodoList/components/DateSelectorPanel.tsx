'use client';

import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

interface DateSelectorPanelProps {
  selectedDate?: Date;
  focusedDate: Date;
  isStartDate: boolean;
  allowedDaysOfWeek?: number[]; // 0: 일요일, 1: 월요일, ..., 6: 토요일
  minDate?: Date; // 최소 선택 가능 날짜
  maxDate?: Date; // 최대 선택 가능 날짜
  onDateSelect: (date: Date) => void;
  onFocusedDateChange: (date: Date) => void;
  onClose: () => void;
}

const DateSelectorPanel = React.forwardRef<HTMLDivElement, DateSelectorPanelProps>(
  (
    {
      selectedDate,
      focusedDate,
      isStartDate,
      allowedDaysOfWeek,
      minDate,
      maxDate,
      onDateSelect,
      onFocusedDateChange,
      onClose,
    },
    ref
  ) => {
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

    // 특정 요일만 선택 가능한지 확인하는 함수
    const isDateSelectable = (date: Date) => {
      // 최소 날짜 체크 (minDate 포함)
      if (minDate) {
        const minDateOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (dateOnly < minDateOnly) {
          return false;
        }
      }

      // 최대 날짜 체크 (maxDate 포함)
      if (maxDate) {
        const maxDateOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (dateOnly > maxDateOnly) {
          return false;
        }
      }

      if (!allowedDaysOfWeek || allowedDaysOfWeek.length === 0) {
        return true; // 제한이 없으면 모든 날짜 선택 가능
      }
      return allowedDaysOfWeek.includes(date.getDay());
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
          if (isDateSelectable(focusedDate)) {
            onDateSelect(focusedDate);
          }
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
      <div ref={ref} className="w-full text-white" role="dialog" aria-label="날짜 선택">
        {/* 헤더 */}
        <div className="flex items-center justify-between pt-4 px-2 pb-2">
          <button
            type="button"
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-neon)]"
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
            type="button"
            onClick={() => navigateMonth('next')}
            className="p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-neon)]"
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
          {dayNames.map((day, index) => (
            <div key={`day-header-${index}-${day}`} className="text-center label-1-regular text-label-alternative p-2">
              <abbr title={`${day}요일`} className="no-underline">
                {day}
              </abbr>
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div
          ref={gridRef}
          className="grid grid-cols-7 gap-1 px-2 pb-4 items-center"
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
            const isSelectable = isDateSelectable(day);

            // 날짜를 기반으로 한 유일한 키 생성
            const dayKey = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

            return (
              <div key={dayKey} className="flex w-full items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (isSelectable) {
                      onDateSelect(day);
                      onFocusedDateChange(day);
                    }
                  }}
                  className={`
                relative w-10 h-10 flex items-center justify-center label-1-regular rounded-full transition-colors
                ${!isSelectable ? 'pointer-events-none text-label-assistive opacity-50' : ''}
                ${isStartDate && day.getDay() !== 0 && 'pointer-events-none text-label-assistive'} 
                ${isSelected ? 'bg-[var(--color-brand-neon)] text-black' : ''}
                ${isFocused && !isSelected ? 'bg-gray-700 text-primary-normal' : ''}
                ${!isInCurrentMonth ? 'text-gray-500' : ''}
                ${isToday && !isSelected ? 'bg-gray-600' : ''}
                ${isSelectable ? 'hover:bg-gray-700' : ''}
              `}
                  role="gridcell"
                  aria-label={`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일${isSelected ? ', 선택됨' : ''}${isToday ? ', 오늘' : ''}${!isSelectable ? ', 선택 불가' : ''}`}
                  aria-selected={isSelected}
                  aria-disabled={!isSelectable}
                  tabIndex={-1}
                >
                  {day.getDate()}
                  {isToday && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--color-brand-neon)] rounded-full"></span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

DateSelectorPanel.displayName = 'DateSelectorPanel';

export default DateSelectorPanel;
