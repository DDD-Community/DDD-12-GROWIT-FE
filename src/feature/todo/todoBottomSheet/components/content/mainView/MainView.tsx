'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { DeleteButton } from '../../shared/deleteButton';
import { GoalIcon, RepeatIcon, StartDateIcon, EndDateIcon, DateIcon, TimeIcon } from '../../shared/icons';
import { SelectCell } from '../../shared/selectCell';
import { MainViewHeader } from './MainViewHeader';
import { TodoInput } from './TodoInput';
import type { TodoFormData, REPEAT_TYPE_LABELS } from '../../../types';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { getProgressGoals } from '@/model/goal/api';
import { cn } from '@/shared/lib/utils';

const CATEGORY_OPTIONS = [
  { value: 'NOW' as const, label: '긴급', color: '#FF6467' },
  { value: 'STEADY' as const, label: '꾸준히', color: '#FF8904' },
  { value: 'SKIP' as const, label: '넘겨도', color: '#51A2FF' },
  { value: 'DELETE' as const, label: '지워도', color: '#A1A1A1' },
];

interface MainViewProps {
  /** 선택된 날짜 */
  selectedDate: Date;
  /** 제출 핸들러 */
  onSubmit: () => void;
  /** 제출 버튼 라벨 */
  submitLabel: string;
  /** 삭제 선택 화면으로 이동 핸들러 (반복 투두일 경우) */
  onDeleteSelect?: () => void;
  /** 삭제 핸들러 (반복 투두가 아닐 경우 바로 삭제) */
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
  /** 날짜 수정 클릭 핸들러 */
  onDateEdit?: () => void;
  /** 반복 타입 라벨 */
  repeatLabels?: typeof REPEAT_TYPE_LABELS;
  /** 수정 선택 화면으로 이동 핸들러 (반복 투두일 경우) */
  onEditSelect?: () => void;
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

/** 시간을 "오전/오후 h:mm" 형식으로 포맷 */
const formatTimeDisplay = (time?: string): string | undefined => {
  if (!time) return undefined;
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return time;
  const hour24 = Number(match[1]);
  const minute = match[2];
  const isAM = hour24 < 12;
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${isAM ? '오전' : '오후'} ${hour12}:${minute}`;
};

export const MainView = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedDate: _selectedDate,
  onSubmit,
  submitLabel,
  onDeleteSelect,
  onDelete,
  showDeleteButton = false,
  autoFocus = false,
  onGoalSelect,
  onRepeatSelect,
  onStartDateSelect,
  onEndDateSelect,
  onDateEdit,
  repeatLabels = { none: '없음', DAILY: '매일', WEEKLY: '매주', BIWEEKLY: '격주', MONTHLY: '매월' },
  onEditSelect,
}: MainViewProps) => {
  const { data: goals = [] } = useQuery({
    queryKey: GoalQueryKeys.progress(),
    queryFn: getProgressGoals,
  });

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TodoFormData>();

  const goalId = watch('goalId');
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');
  const todoDate = watch('date');
  const todoTime = watch('time');

  const hasRoutineDurationError = !!errors.routineDuration;
  const selectedGoalName = goals.find(g => g.id === goalId)?.name;
  const repeatLabel = repeatLabels[repeatType] || '없음';
  const hasRepeat = repeatType !== 'none';

  // 제출 핸들러: 반복 투두이고 수정 모드(showDeleteButton === true)이면 EditBottomSheet 표시
  const handleSubmitClick = () => {
    if (hasRepeat && showDeleteButton && onEditSelect) {
      onEditSelect();
    } else {
      onSubmit();
    }
  };

  return (
    <>
      <BottomSheet.Title>
        <MainViewHeader submitLabel={submitLabel} onDateEdit={onDateEdit} onSubmit={handleSubmitClick} />
      </BottomSheet.Title>

      <BottomSheet.Content className="overflow-y-hidden">
        <div className="flex flex-col gap-5">
          <TodoInput autoFocus={autoFocus} />

          {/* 카테고리 선택 */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map(opt => {
                  const isSelected = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
                        isSelected
                          ? 'border-transparent text-black'
                          : 'border-[#27272A] text-[#70737C] bg-transparent'
                      )}
                      style={isSelected ? { backgroundColor: opt.color } : undefined}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          />

          <div className="flex flex-col gap-3">
            {/* 날짜 */}
            <SelectCell
              icon={<DateIcon />}
              label="날짜"
              value={formatDateDisplay(todoDate)}
              placeholder="선택"
              onClick={onDateEdit}
            />

            {/* 시간 — native time picker (시/분 휠)를 SelectCell 위에 invisible 오버레이 */}
            <label className="relative block cursor-pointer">
              <SelectCell
                icon={<TimeIcon />}
                label="시간"
                value={formatTimeDisplay(todoTime)}
                placeholder="선택"
              />
              <input
                type="time"
                value={todoTime || ''}
                onChange={e =>
                  setValue('time', e.target.value || undefined, { shouldDirty: true })
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="시간 선택"
              />
            </label>

            {/* 태그 (목표) */}
            <SelectCell
              icon={<GoalIcon />}
              label="태그"
              value={selectedGoalName}
              placeholder="선택"
              onClick={onGoalSelect}
            />
            <SelectCell icon={<RepeatIcon />} label="반복" value={repeatLabel} onClick={onRepeatSelect} />
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

                {hasRoutineDurationError && (
                  <span className="label-2-medium text-status-negative px-1">{errors.routineDuration?.message}</span>
                )}
              </>
            )}
          </div>
          {showDeleteButton && (
            <DeleteButton
              onClick={() => {
                // 반복 투두인 경우 삭제 선택 화면으로 이동
                if (hasRepeat && onDeleteSelect) {
                  onDeleteSelect();
                } else if (onDelete) {
                  // 반복 투두가 아닌 경우 바로 삭제
                  onDelete();
                }
              }}
            />
          )}
        </div>
      </BottomSheet.Content>
    </>
  );
};

// MainView.Header로 할당 (MainView 선언 후)
MainView.Header = MainViewHeader;

// TypeScript 타입 정의
export type MainViewComponent = typeof MainView & {
  Header: typeof MainViewHeader;
};

export default MainView as MainViewComponent;
