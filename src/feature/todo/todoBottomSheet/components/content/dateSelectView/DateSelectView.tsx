'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon } from '../../shared/icons';
import { BottomSheetCalendar, formatDateToString, parseDateString } from '../../shared/calendar';
import type { TodoFormData, DateSelectTab } from '../../../types';

interface DateSelectViewProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
  /** 완료 클릭 핸들러 */
  onComplete: () => void;
  /** 초기 선택 탭 */
  initialTab?: DateSelectTab;
  /** 기본 선택 날짜 (startDate 기본값으로 사용) */
  defaultDate?: Date;
}

export const DateSelectView = ({ onBack, onComplete, initialTab = 'endDate', defaultDate }: DateSelectViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const routineDuration = watch('routineDuration');
  const repeatType = watch('repeatType');

  // 현재 선택된 탭 (시작일/종료일)
  const [activeTab, setActiveTab] = useState<DateSelectTab>(initialTab);

  // 선택된 날짜들
  const startDate = parseDateString(routineDuration?.startDate);
  const endDate = parseDateString(routineDuration?.endDate);

  // 반복이 설정되어 있고, startDate가 없으면 defaultDate를 기본값으로 설정
  useEffect(() => {
    if (repeatType !== 'none' && !startDate && defaultDate) {
      const dateString = formatDateToString(defaultDate);
      setValue('routineDuration', {
        ...routineDuration,
        startDate: dateString,
      } as TodoFormData['routineDuration']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 캘린더 상태
  const [currentMonth, setCurrentMonth] = useState(() => startDate || defaultDate || new Date());

  const handleDateSelect = (date: Date) => {
    const dateString = formatDateToString(date);
    const newDuration = { ...routineDuration } as { startDate?: string; endDate?: string };

    if (activeTab === 'startDate') {
      newDuration.startDate = dateString;
      setValue('routineDuration', newDuration as TodoFormData['routineDuration']);
      // 시작일이 종료일보다 이후면 종료일 초기화
      if (newDuration.endDate && dateString > newDuration.endDate) {
        newDuration.endDate = undefined;
        setValue('routineDuration', newDuration as TodoFormData['routineDuration']);
      }
      // 시작일 선택 후 자동으로 종료일 탭으로 전환
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

  // 완료 버튼 활성화 조건: 시작일과 종료일 모두 선택됨
  const isCompleteEnabled = !!routineDuration?.startDate && !!routineDuration?.endDate;

  const handleComplete = () => {
    if (isCompleteEnabled) {
      onComplete();
    }
  };

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

      <BottomSheet.Content className="overflow-y-hidden">
        <BottomSheetCalendar
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onDateSelect={handleDateSelect}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          activeTab={activeTab}
          repeatType={repeatType}
          initialFocusDate={startDate}
        />
      </BottomSheet.Content>
    </>
  );
};

export default DateSelectView;
