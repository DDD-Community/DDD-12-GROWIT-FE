'use client';

import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { DeleteButton } from '../../shared/deleteButton';
import { GoalIcon, RepeatIcon, StartDateIcon, EndDateIcon } from '../../shared/icons';
import { SelectCell } from '../../shared/selectCell';
import { MainViewHeader } from './MainViewHeader';
import { TodoInput } from './TodoInput';
import type { Goal, TodoFormData, REPEAT_TYPE_LABELS } from '../../../types';
import { GoalQueryKeys } from '@/model/goal/queryKeys';
import { getProgressGoals } from '@/model/goal/api';

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

export const MainView = ({
  selectedDate,
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
    formState: { errors },
  } = useFormContext<TodoFormData>();

  const goalId = watch('goalId');
  const repeatType = watch('repeatType');
  const routineDuration = watch('routineDuration');

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
        <MainViewHeader
          selectedDate={selectedDate}
          submitLabel={submitLabel}
          onDateEdit={onDateEdit}
          onSubmit={handleSubmitClick}
        />
      </BottomSheet.Title>

      <BottomSheet.Content className="overflow-y-hidden">
        <div className="flex flex-col gap-5">
          <TodoInput autoFocus={autoFocus} />

          <div className="flex flex-col gap-3">
            <SelectCell
              icon={<GoalIcon />}
              label="목표"
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
