'use client';

import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon, RepeatIcon, StartDateIcon, EndDateIcon } from '../../shared/icons';
import { SelectCell } from '../../shared/selectCell';
import { BottomSheetCalendar, parseDateString } from '../../shared/calendar';
import type { TodoFormData, FormRepeatType, REPEAT_TYPE_LABELS } from '../../../types';

interface DateEditViewProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
  /** 반복 선택 클릭 핸들러 */
  onRepeatSelect?: () => void;
  /** 시작일 선택 클릭 핸들러 */
  onStartDateSelect?: () => void;
  /** 종료일 선택 클릭 핸들러 */
  onEndDateSelect?: () => void;
  /** 반복 타입 라벨 */
  repeatLabels?: typeof REPEAT_TYPE_LABELS;
}

/** 날짜를 YY.MM.DD 형식으로 포맷 */
const formatDateDisplay = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/** 반복 요약 텍스트 생성 */
const getRepeatSummary = (repeatType: FormRepeatType, startDate?: Date): string => {
  if (!startDate || repeatType === 'none') return '없음';

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[startDate.getDay()];

  switch (repeatType) {
    case 'DAILY':
      return '매일';
    case 'WEEKLY':
      return `매주 ${dayName}요일`;
    case 'BIWEEKLY':
      return `격주 ${dayName}요일`;
    case 'MONTHLY':
      return `매월 ${startDate.getDate()}일`;
    default:
      return '없음';
  }
};

export const DateEditView = ({
  onBack,
  onRepeatSelect,
  onStartDateSelect,
  onEndDateSelect,
  repeatLabels = { none: '없음', DAILY: '매일', WEEKLY: '매주', BIWEEKLY: '격주', MONTHLY: '매월' },
}: DateEditViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');
  const todoDate = watch('date');

  const startDate = parseDateString(routineDuration?.startDate);
  const endDate = parseDateString(routineDuration?.endDate);
  const selectedTodoDate = parseDateString(todoDate);

  // 캘린더 상태
  const [currentMonth, setCurrentMonth] = useState(() => selectedTodoDate || startDate || new Date());

  // 반복 요약
  const repeatSummary = useMemo(() => getRepeatSummary(repeatType, startDate), [repeatType, startDate]);

  // 반복 설정 여부
  const hasRepeat = repeatType !== 'none';

  // 날짜 선택 핸들러 - form의 date 필드 업데이트
  const handleDateSelect = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    setValue('date', dateString);
  };

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-between px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="p-1 -ml-1">
            <ChevronLeftIcon />
          </button>
          <h2 className="body-1-normal-bold text-label-normal">날짜 수정</h2>
          <button type="button" onClick={onBack} className="label-1-bold text-label-normal">
            완료
          </button>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content className="overflow-y-hidden">
        {/* 캘린더 - 날짜 선택 및 루틴 날짜 하이라이트 */}
        <BottomSheetCalendar
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onDateSelect={handleDateSelect}
          selectedDate={selectedTodoDate}
          selectedStartDate={hasRepeat ? startDate : undefined}
          selectedEndDate={hasRepeat ? endDate : undefined}
          repeatType={repeatType}
          enableKeyboardNav={false}
          initialFocusDate={selectedTodoDate || startDate}
        />

        {/* 하단 정보 셀 */}
        <div className="flex flex-col gap-3 mt-6">
          {/* 반복 선택 - 항상 표시 */}
          <SelectCell icon={<RepeatIcon />} label="반복" value={repeatSummary} onClick={onRepeatSelect} />

          {/* 반복이 설정된 경우에만 시작일/종료일 표시 */}
          {hasRepeat && (
            <>
              {/* 시작일 선택 */}
              <SelectCell
                icon={<StartDateIcon />}
                label="반복-시작일"
                value={formatDateDisplay(routineDuration?.startDate)}
                placeholder="선택"
                onClick={onStartDateSelect}
              />

              {/* 종료일 선택 */}
              <SelectCell
                icon={<EndDateIcon />}
                label="반복-종료일"
                value={formatDateDisplay(routineDuration?.endDate)}
                placeholder="선택"
                onClick={onEndDateSelect}
              />
            </>
          )}
        </div>
      </BottomSheet.Content>
    </>
  );
};

export default DateEditView;
