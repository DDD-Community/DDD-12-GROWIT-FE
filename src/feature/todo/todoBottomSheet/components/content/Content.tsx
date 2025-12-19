'use client';

import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { GoalIcon, RepeatIcon } from '../shared/icons';
import { SelectCell } from '../shared/selectCell';
import type { TodoFormData, Goal, REPEAT_TYPE_LABELS } from '../../types';

const MAX_LENGTH = 34;

interface ContentProps {
  /** 목표 목록 */
  goals?: Goal[];
  /** 자동 포커스 여부 */
  autoFocus?: boolean;
  /** 목표 선택 클릭 핸들러 */
  onGoalSelect?: () => void;
  /** 반복 선택 클릭 핸들러 */
  onRepeatSelect?: () => void;
  /** 반복 타입 라벨 */
  repeatLabels?: typeof REPEAT_TYPE_LABELS;
}

export const Content = ({
  goals = [],
  autoFocus = true,
  onGoalSelect,
  onRepeatSelect,
  repeatLabels = { none: '없음', daily: '매일', weekly: '매주', monthly: '매월' },
}: ContentProps) => {
  const { watch, setValue, register } = useFormContext<TodoFormData>();
  const inputRef = useRef<HTMLInputElement>(null);

  const content = watch('content');
  const goalId = watch('goalId');
  const repeatType = watch('repeatType');

  const selectedGoalName = goals.find(g => g.id === goalId)?.name;
  const repeatLabel = repeatLabels[repeatType] || '없음';

  // 마운트 시 입력 필드에 포커스
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  return (
    <div className="flex flex-col gap-5">
      {/* 텍스트 입력 */}
      <div>
        <div className="border-b-2 border-white focus-within:border-brand-neon pb-2 transition-colors">
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
        <div className="flex justify-end mt-1">
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
      </div>
    </div>
  );
};

export default Content;
