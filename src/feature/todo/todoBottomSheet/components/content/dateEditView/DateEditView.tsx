'use client';

import { useState, useMemo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon, RepeatIcon, StartDateIcon, EndDateIcon } from '../../shared/icons';
import { SelectCell } from '../../shared/selectCell';
import { BottomSheetCalendar, DateCellInfo, formatDateToString, parseDateString } from '../../shared/calendar';
import { RoutineDateCell } from './RoutineDateCell';
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

/** 반복 패턴에 따라 선택된 날짜들을 계산 */
const getSelectedDates = (repeatType: FormRepeatType, startDate?: Date, endDate?: Date): Set<string> => {
  const selectedDates = new Set<string>();

  if (!startDate || !endDate || repeatType === 'none') {
    return selectedDates;
  }

  const current = new Date(startDate);
  const dayOfWeek = startDate.getDay();

  while (current <= endDate) {
    switch (repeatType) {
      case 'DAILY':
        selectedDates.add(formatDateToString(current));
        current.setDate(current.getDate() + 1);
        break;
      case 'WEEKLY':
        if (current.getDay() === dayOfWeek) {
          selectedDates.add(formatDateToString(current));
        }
        current.setDate(current.getDate() + 1);
        break;
      case 'BIWEEKLY': {
        const weeksDiff = Math.floor((current.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
        if (current.getDay() === dayOfWeek && weeksDiff % 2 === 0) {
          selectedDates.add(formatDateToString(current));
        }
        current.setDate(current.getDate() + 1);
        break;
      }
      case 'MONTHLY':
        if (current.getDate() === startDate.getDate()) {
          selectedDates.add(formatDateToString(current));
        }
        current.setDate(current.getDate() + 1);
        break;
      default:
        current.setDate(current.getDate() + 1);
    }
  }

  return selectedDates;
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
  const { watch } = useFormContext<TodoFormData>();
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');

  const startDate = parseDateString(routineDuration?.startDate);
  const endDate = parseDateString(routineDuration?.endDate);

  // 캘린더 상태
  const [currentMonth, setCurrentMonth] = useState(() => startDate || new Date());

  // 선택된 날짜들 계산
  const selectedDates = useMemo(
    () => getSelectedDates(repeatType, startDate, endDate),
    [repeatType, startDate, endDate]
  );

  // 반복 요약
  const repeatSummary = useMemo(() => getRepeatSummary(repeatType, startDate), [repeatType, startDate]);

  // 반복 설정 여부
  const hasRepeat = repeatType !== 'none';

  // 날짜 셀 렌더러 (루틴 날짜 하이라이트)
  const renderDateCell = useCallback(
    ({ date, isInCurrentMonth, isToday }: DateCellInfo) => {
      const dateString = formatDateToString(date);
      const isHighlighted = selectedDates.has(dateString);

      return (
        <RoutineDateCell
          date={date}
          isInCurrentMonth={isInCurrentMonth}
          isToday={isToday}
          isHighlighted={isHighlighted}
        />
      );
    },
    [selectedDates]
  );

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

      <BottomSheet.Content>
        {/* 캘린더 - 루틴 날짜 하이라이트 */}
        <BottomSheetCalendar
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          renderDateCell={renderDateCell}
          enableKeyboardNav={false}
          initialFocusDate={startDate}
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
