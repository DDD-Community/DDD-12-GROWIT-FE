'use client';

import { useState } from 'react';
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

  // 폼의 현재 값 (기본값 포함)
  const formStartDate =
    parseDateString(routineDuration?.startDate) || (repeatType !== 'none' ? defaultDate : undefined);
  const formEndDate = parseDateString(routineDuration?.endDate);

  // 로컬 상태로 임시 선택값 관리 (완료 버튼 클릭 시에만 form에 적용)
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(formStartDate);
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(formEndDate);

  // 캘린더 상태
  const [currentMonth, setCurrentMonth] = useState(() => tempStartDate || defaultDate || new Date());

  const handleDateSelect = (date: Date) => {
    if (activeTab === 'startDate') {
      setTempStartDate(date);
      // 시작일이 종료일보다 이후면 종료일 초기화
      if (tempEndDate && date > tempEndDate) {
        setTempEndDate(undefined);
      }
      // 시작일 선택 후 자동으로 종료일 탭으로 전환
      setActiveTab('endDate');
    } else {
      // 종료일은 시작일보다 이전일 수 없음
      if (tempStartDate && date < tempStartDate) {
        return;
      }
      setTempEndDate(date);
    }
  };

  // 완료 버튼 활성화 조건: 시작일과 종료일 모두 있음
  const isCompleteEnabled = !!tempStartDate && !!tempEndDate;

  const handleComplete = () => {
    if (!isCompleteEnabled) return;

    // 완료 버튼 클릭 시에만 form에 적용
    setValue('routineDuration', {
      startDate: formatDateToString(tempStartDate!),
      endDate: formatDateToString(tempEndDate!),
    });

    onComplete();
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
          selectedStartDate={tempStartDate}
          selectedEndDate={tempEndDate}
          activeTab={activeTab}
          repeatType={repeatType}
          enableKeyboardNav={false}
          initialFocusDate={tempStartDate}
        />
      </BottomSheet.Content>
    </>
  );
};

export default DateSelectView;
