'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon } from '../../shared/icons';
import type { TodoFormData, DateSelectTab } from '../../../types';

interface DateSelectViewProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
  /** 완료 클릭 핸들러 */
  onComplete: () => void;
  /** 초기 선택 탭 */
  initialTab?: DateSelectTab;
}

/** 날짜를 YYYY-MM-DD 형식으로 포맷 */
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/** YYYY-MM-DD 문자열을 Date로 파싱 */
const parseDateString = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const DateSelectView = ({ onBack, onComplete, initialTab = 'startDate' }: DateSelectViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const routineDuration = watch('routineDuration');

  // 현재 선택된 탭 (시작일/종료일)
  const [activeTab, setActiveTab] = useState<DateSelectTab>(initialTab);

  // 선택된 날짜들
  const startDate = parseDateString(routineDuration?.startDate);
  const endDate = parseDateString(routineDuration?.endDate);

  // 캘린더 상태
  const [currentMonth, setCurrentMonth] = useState(() => startDate || new Date());
  const [focusedDate, setFocusedDate] = useState<Date>(() => startDate || new Date());
  const gridRef = useRef<HTMLDivElement>(null);

  // 날짜 유틸리티 함수들
  const getMonthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const getMonthEnd = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const getCalendarDays = () => {
    const monthStart = getMonthStart(currentMonth);
    const monthEnd = getMonthEnd(currentMonth);
    const startDateCal = new Date(monthStart);
    const endDateCal = new Date(monthEnd);

    const startDay = monthStart.getDay();
    startDateCal.setDate(startDateCal.getDate() - startDay);

    const endDay = monthEnd.getDay();
    endDateCal.setDate(endDateCal.getDate() + (6 - endDay));

    const days = [];
    const current = new Date(startDateCal);

    while (current <= endDateCal) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isSameDay = (date1: Date, date2?: Date) => {
    if (!date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) =>
    date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();

  const handleDateSelect = (date: Date) => {
    const dateString = formatDateToString(date);
    const newDuration = { ...routineDuration } as { startDate?: string; endDate?: string };

    if (activeTab === 'startDate') {
      newDuration.startDate = dateString;
      // 시작일 선택 후 자동으로 종료일 탭으로 전환
      setValue('routineDuration', newDuration as TodoFormData['routineDuration']);
      // 시작일이 종료일보다 이후면 종료일 초기화
      if (newDuration.endDate && dateString > newDuration.endDate) {
        newDuration.endDate = undefined;
        setValue('routineDuration', newDuration as TodoFormData['routineDuration']);
      }
      setActiveTab('endDate');
    } else {
      // 종료일은 시작일보다 이전일 수 없음
      if (newDuration.startDate && dateString < newDuration.startDate) {
        return;
      }
      newDuration.endDate = dateString;
      setValue('routineDuration', newDuration as TodoFormData['routineDuration']);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        handleDateSelect(focusedDate);
        return;
      default:
        return;
    }

    setFocusedDate(newDate);
    if (newDate.getMonth() !== currentMonth.getMonth() || newDate.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(newDate);
    }
  };

  // 완료 버튼 활성화 조건: 시작일과 종료일 모두 선택됨
  const isCompleteEnabled = !!routineDuration?.startDate && !!routineDuration?.endDate;

  const handleComplete = () => {
    if (isCompleteEnabled) {
      onComplete();
    }
  };

  // 마운트 시 그리드에 포커스
  useEffect(() => {
    gridRef.current?.focus();
  }, []);

  const days = getCalendarDays();
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-between px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="p-1 -ml-1">
            <ChevronLeftIcon />
          </button>

          {/* 세그먼트 컨트롤 */}
          <div className="flex items-center bg-fill-secondary rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('startDate')}
              className={cn(
                'h-[26px] px-2.5 py-0.5 rounded-2xl label-2-medium transition-colors',
                activeTab === 'startDate' ? 'bg-static-white text-label-inverse' : 'text-text-secondary'
              )}
            >
              시작일
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('endDate')}
              className={cn(
                'h-[26px] px-2.5 py-0.5 rounded-2xl label-2-medium transition-colors',
                activeTab === 'endDate' ? 'bg-static-white text-label-inverse' : 'text-text-secondary'
              )}
            >
              종료일
            </button>
          </div>

          {/* 완료 버튼 */}
          <button
            type="button"
            onClick={handleComplete}
            disabled={!isCompleteEnabled}
            className={cn(
              'label-1-bold transition-colors',
              isCompleteEnabled ? 'text-label-normal' : 'text-label-assistive'
            )}
          >
            완료
          </button>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content>
        {/* 캘린더 */}
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
              {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
            </h3>

            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-2 bg-fill-primary rounded-full hover:bg-fill-secondary transition-colors"
              aria-label="다음 달"
            >
              <ChevronRightSmallIcon />
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-1 py-2">
            {dayNames.map(day => (
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
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {days.map((day, index) => {
              const isStartDate = isSameDay(day, startDate);
              const isEndDate = isSameDay(day, endDate);
              const isSelected = isStartDate || isEndDate;
              const isInCurrentMonth = isCurrentMonth(day);
              const isToday = isSameDay(day, new Date());

              // 현재 탭과 일치하는 선택된 날짜 (채워진 배경)
              const isActiveSelected =
                (activeTab === 'startDate' && isStartDate) || (activeTab === 'endDate' && isEndDate);
              // 현재 탭과 불일치하는 선택된 날짜 (연한 배경)
              const isInactiveSelected =
                (activeTab === 'startDate' && isEndDate) || (activeTab === 'endDate' && isStartDate);

              // 종료일 선택 시, 시작일 이전 날짜는 선택 불가
              const isDisabled = activeTab === 'endDate' && startDate && day < startDate && !isSameDay(day, startDate);

              return (
                <div key={index} className="flex flex-col items-center justify-center">
                  {/* 오늘 표시 점 */}
                  <div className={cn('w-1 h-1 rounded-full mb-0.5', isToday ? 'bg-brand-neon' : 'invisible')} />
                  <button
                    type="button"
                    onClick={() => !isDisabled && handleDateSelect(day)}
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
                    aria-label={`${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일${isStartDate ? ', 시작일' : ''}${isEndDate ? ', 종료일' : ''}${isToday ? ', 오늘' : ''}`}
                    aria-selected={isSelected}
                    aria-disabled={isDisabled}
                    tabIndex={-1}
                  >
                    {day.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </BottomSheet.Content>
    </>
  );
};

/** 오른쪽 화살표 아이콘 */
const ChevronRightSmallIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default DateSelectView;
