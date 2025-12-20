'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { DeleteButton } from '../../shared/deleteButton';
import { FlagIcon, GoalIcon, RepeatIcon, StartDateIcon, EndDateIcon } from '../../shared/icons';
import { SelectCell } from '../../shared/selectCell';
import type { Goal, TodoFormData, REPEAT_TYPE_LABELS } from '../../../types';

const MAX_LENGTH = 34;

interface MainViewProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 목표 목록 */
  goals: Goal[];
  /** 제출 핸들러 */
  onSubmit: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
  /** 삭제 핸들러 */
  onDelete?: () => void;
  /** 삭제 버튼 표시 여부 */
  showDeleteButton?: boolean;
  /** 입력 자동 포커스 */
  autoFocus?: boolean;
  /** 목표 선택 클릭 핸들러 */
  onGoalSelect?: () => void;
  /** 반복 선택 클릭 핸들러 */
  onRepeatSelect: () => void;
  /** 시작일 선택 클릭 핸들러 */
  onStartDateSelect: () => void;
  /** 종료일 선택 클릭 핸들러 */
  onEndDateSelect: () => void;
  /** 반복 타입 라벨 */
  repeatLabels?: typeof REPEAT_TYPE_LABELS;
}

/** 헤더 날짜 포맷 (M월 D일 요일) */
const formatHeaderDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
};

/** 날짜를 YY.MM.DD 형식으로 포맷 */
const formatDateDisplay = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const MainView = ({
  selectedDate,
  goals,
  onSubmit,
  submitLabel,
  onDelete,
  showDeleteButton = false,
  autoFocus = false,
  onGoalSelect,
  onRepeatSelect,
  onStartDateSelect,
  onEndDateSelect,
  repeatLabels = { none: '없음', DAILY: '매일', WEEKLY: '매주', BIWEEKLY: '격주', MONTHLY: '매월' },
}: MainViewProps) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<TodoFormData>();
  const inputRef = useRef<HTMLInputElement>(null);

  const content = watch('content');
  const isImportant = watch('isImportant');
  const goalId = watch('goalId');
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');

  const hasContentError = !!errors.content;
  const hasRoutineDurationError = !!errors.routineDuration;
  const selectedGoalName = goals.find(g => g.id === goalId)?.name;
  const repeatLabel = repeatLabels[repeatType] || '없음';
  const hasRepeat = repeatType !== 'none';

  // 제출 버튼 비활성화 조건
  const isContentValid = content?.trim() && content.trim().length <= 34;
  const isRoutineDurationValid =
    repeatType === 'none' ||
    (routineDuration?.startDate &&
      routineDuration?.endDate &&
      new Date(routineDuration.startDate) <= new Date(routineDuration.endDate));
  const isSubmitDisabled = !isContentValid || !isRoutineDurationValid;

  // 마운트 시 입력 필드에 포커스
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center px-5 pt-2 pb-4">
          {/* 중요 표시 버튼 - 왼쪽 영역 */}
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              onClick={() => setValue('isImportant', !isImportant)}
              className="w-6 h-6 flex items-center justify-center"
              aria-label={isImportant ? '중요 표시 해제' : '중요 표시'}
            >
              <FlagIcon filled={isImportant} />
            </button>
          </div>

          {/* 날짜 제목 - 중앙 */}
          <h2 className="body-1-bold text-white underline">{formatHeaderDate(selectedDate)}</h2>

          {/* 완료 버튼 - 오른쪽 영역 */}
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              className={cn(
                'label-1-bold px-[14px] py-2 rounded-lg',
                !isSubmitDisabled ? 'text-label-normal' : 'text-label-assistive'
              )}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </BottomSheet.Title>

      <BottomSheet.Content>
        <div className="flex flex-col gap-5">
          {/* 텍스트 입력 */}
          <div>
            <div
              className={cn(
                'border-b-2 pb-2 transition-colors',
                hasContentError ? 'border-status-negative' : 'border-white focus-within:border-brand-neon'
              )}
            >
              <input
                {...register('content')}
                ref={inputRef}
                type="text"
                value={content ?? ''}
                onChange={e => setValue('content', e.target.value.slice(0, MAX_LENGTH))}
                placeholder="할 일을 입력해주세요"
                className={cn(
                  'w-full bg-transparent',
                  'body-1-normal text-label-normal',
                  'placeholder:text-label-assistive',
                  'focus:outline-none'
                )}
                maxLength={MAX_LENGTH}
              />
            </div>
            <div className="flex justify-between mt-1">
              {hasContentError ? (
                <span className="label-2-medium text-status-negative">{errors.content?.message}</span>
              ) : (
                <span />
              )}
              <span className="label-2-medium text-label-alternative">
                ({content?.length ?? 0}/{MAX_LENGTH})
              </span>
            </div>
          </div>

          {/* 선택 셀 목록 */}
          <div className="flex flex-col gap-3">
            {/* 목표 선택 */}
            <SelectCell
              icon={<GoalIcon />}
              label="목표"
              value={selectedGoalName}
              placeholder="선택"
              onClick={onGoalSelect}
            />

            {/* 반복 선택 */}
            <SelectCell icon={<RepeatIcon />} label="반복" value={repeatLabel} onClick={onRepeatSelect} />

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
                  hasError={!routineDuration?.startDate}
                />

                {/* 종료일 선택 */}
                <SelectCell
                  icon={<EndDateIcon />}
                  label="반복-종료일"
                  value={formatDateDisplay(routineDuration?.endDate)}
                  placeholder="선택"
                  onClick={onEndDateSelect}
                  hasError={!routineDuration?.endDate}
                />

                {/* 반복 기간 에러 메시지 */}
                {hasRoutineDurationError && (
                  <span className="label-2-medium text-status-negative px-1">{errors.routineDuration?.message}</span>
                )}
              </>
            )}
          </div>

          {/* 삭제 버튼 */}
          {showDeleteButton && onDelete && <DeleteButton onClick={onDelete} />}
        </div>
      </BottomSheet.Content>
    </>
  );
};

export default MainView;
