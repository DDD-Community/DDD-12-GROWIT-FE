'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/shared/lib/utils';
import { ChevronLeftIcon } from '../icons';
import { getCalendarDays, isSameDay, isInMonth, DAY_NAMES, MONTH_NAMES } from './utils';

/** 날짜 셀 렌더링을 위한 정보 */
export interface DateCellInfo {
  date: Date;
  isInCurrentMonth: boolean;
  isToday: boolean;
}

/** 활성 탭 타입 */
export type ActiveDateTab = 'startDate' | 'endDate';

interface BottomSheetCalendarProps {
  /** 현재 표시 월 */
  currentMonth: Date;
  /** 월 변경 핸들러 */
  onMonthChange: (month: Date) => void;
  /** 날짜 선택 핸들러 */
  onDateSelect?: (date: Date) => void;
  /** 선택된 시작일 */
  selectedStartDate?: Date;
  /** 선택된 종료일 */
  selectedEndDate?: Date;
  /** 활성 탭 (시작일/종료일) - 기본 렌더러에서 스타일 구분용 */
  activeTab?: ActiveDateTab;
  /** 날짜 셀 렌더링 함수 (기본 렌더러 제공) */
  renderDateCell?: (info: DateCellInfo) => React.ReactNode;
  /** 키보드 네비게이션 활성화 */
  enableKeyboardNav?: boolean;
  /** 초기 포커스 날짜 */
  initialFocusDate?: Date;
}

/** 오른쪽 화살표 아이콘 */
const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BottomSheetCalendar = ({
  currentMonth,
  onMonthChange,
  onDateSelect,
  selectedStartDate,
  selectedEndDate,
  activeTab = 'startDate',
  renderDateCell,
  enableKeyboardNav = true,
  initialFocusDate,
}: BottomSheetCalendarProps) => {
  /** 기본 날짜 셀 렌더러 */
  const defaultRenderDateCell = useCallback(
    ({ date, isInCurrentMonth, isToday }: DateCellInfo) => {
      const isStartDate = isSameDay(date, selectedStartDate);
      const isEndDate = isSameDay(date, selectedEndDate);
      const isSelected = isStartDate || isEndDate;

      // 현재 탭과 일치하는 선택된 날짜 (채워진 배경)
      const isActiveSelected = (activeTab === 'startDate' && isStartDate) || (activeTab === 'endDate' && isEndDate);
      // 현재 탭과 불일치하는 선택된 날짜 (연한 배경)
      const isInactiveSelected = (activeTab === 'startDate' && isEndDate) || (activeTab === 'endDate' && isStartDate);

      // 종료일 선택 시, 시작일 이전 날짜는 선택 불가
      const isDisabled = activeTab === 'endDate' && selectedStartDate && date < selectedStartDate && !isStartDate;

      return (
        <>
          {/* 오늘 표시 점 */}
          <div className={cn('w-1 h-1 rounded-full mb-0.5', isToday ? 'bg-brand-neon' : 'invisible')} />
          <button
            type="button"
            onClick={() => !isDisabled && onDateSelect?.(date)}
            disabled={isDisabled}
            className={cn(
              'relative w-[29px] h-[29px] flex items-center justify-center label-1-regular rounded-full transition-colors',
              isDisabled && 'pointer-events-none opacity-30',
              // 현재 탭과 일치하는 선택된 날짜: 채워진 초록 배경
              isActiveSelected && 'bg-brand-neon text-inverse-label label-1-medium',
              // 현재 탭과 불일치하는 선택된 날짜: 연한 초록 배경
              isInactiveSelected && 'bg-brand-neon/[0.12] text-text-primary label-1-medium',
              !isSelected && isInCurrentMonth && 'text-text-primary',
              !isSelected && !isInCurrentMonth && 'text-label-assistive',
              !isDisabled && !isSelected && 'hover:bg-fill-primary'
            )}
            aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${isStartDate ? ', 시작일' : ''}${isEndDate ? ', 종료일' : ''}${isToday ? ', 오늘' : ''}`}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            tabIndex={-1}
          >
            {date.getDate()}
          </button>
        </>
      );
    },
    [onDateSelect, selectedStartDate, selectedEndDate, activeTab]
  );

  const dateCellRenderer = renderDateCell ?? defaultRenderDateCell;
  const gridRef = useRef<HTMLDivElement>(null);
  const [focusedDate, setFocusedDate] = useState<Date>(() => initialFocusDate || new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    onMonthChange(newMonth);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!enableKeyboardNav) return;

    const newDate = new Date(focusedDate);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onDateSelect?.(focusedDate);
        return;
      default:
        return;
    }

    setFocusedDate(newDate);
    if (newDate.getMonth() !== currentMonth.getMonth() || newDate.getFullYear() !== currentMonth.getFullYear()) {
      onMonthChange(newDate);
    }
  };

  // 마운트 시 그리드에 포커스
  useEffect(() => {
    if (enableKeyboardNav) {
      gridRef.current?.focus();
    }
  }, [enableKeyboardNav]);

  const days = getCalendarDays(currentMonth);
  const today = new Date();

  return (
    <div>
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between py-3">
        <button
          type="button"
          onClick={() => navigateMonth('prev')}
          className="p-2 bg-fill-primary rounded-full hover:bg-fill-secondary transition-colors"
          aria-label="이전 달"
        >
          <ChevronLeftIcon />
        </button>

        <h3 className="body-1-normal-bold text-label-normal">
          {currentMonth.getFullYear()}년 {MONTH_NAMES[currentMonth.getMonth()]}
        </h3>

        <button
          type="button"
          onClick={() => navigateMonth('next')}
          className="p-2 bg-fill-primary rounded-full hover:bg-fill-secondary transition-colors"
          aria-label="다음 달"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 py-2">
        {DAY_NAMES.map(day => (
          <div key={day} className="text-center caption-1-medium text-label-alternative py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div
        ref={gridRef}
        className="grid grid-cols-7 gap-y-2"
        role="grid"
        aria-label="날짜 그리드"
        tabIndex={enableKeyboardNav ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        {days.map((day, index) => {
          const isInCurrentMonth = isInMonth(day, currentMonth);
          const isToday = isSameDay(day, today);

          return (
            <div key={index} className="flex flex-col items-center justify-center">
              {dateCellRenderer({ date: day, isInCurrentMonth, isToday })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomSheetCalendar;
