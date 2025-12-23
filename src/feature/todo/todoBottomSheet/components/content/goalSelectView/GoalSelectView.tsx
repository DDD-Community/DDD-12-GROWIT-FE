'use client';

import { useFormContext } from 'react-hook-form';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ChevronLeftIcon, CheckIcon, PlusIcon } from '../../shared/icons';
import type { TodoFormData, Goal } from '../../../types';

interface GoalSelectViewProps {
  /** 뒤로가기 클릭 핸들러 */
  onBack: () => void;
  /** 목표 목록 */
  goals: Goal[];
  /** 목표 추가 클릭 핸들러 */
  onAddGoal?: () => void;
}

/** 기본 투두 옵션 (목표 미선택) */
const DEFAULT_TODO_OPTION = {
  id: null,
  name: '기본 투두',
};

export const GoalSelectView = ({ onBack, goals, onAddGoal }: GoalSelectViewProps) => {
  const { watch, setValue } = useFormContext<TodoFormData>();
  const currentGoalId = watch('goalId');

  // 목표 선택
  const handleSelect = (goalId: string | null) => {
    setValue('goalId', goalId);
  };

  // 완료 버튼 클릭
  const handleComplete = () => {
    onBack();
  };

  // 기본 투두를 맨 위로, 나머지 목표 목록
  const allOptions = [DEFAULT_TODO_OPTION, ...goals];

  return (
    <>
      <BottomSheet.Title>
        <div className="w-full flex items-center justify-between px-5 pt-2 pb-4">
          <button type="button" onClick={onBack} className="p-1 -ml-1">
            <ChevronLeftIcon />
          </button>
          <h2 className="body-1-normal-bold text-label-normal">목표 이동</h2>
          <button type="button" onClick={handleComplete} className="label-1-bold text-label-normal">
            완료
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <div className="flex flex-col gap-2 items-center">
          {allOptions.map(option => {
            const isSelected = currentGoalId === option.id;
            return (
              <button
                key={option.id ?? 'default'}
                type="button"
                onClick={() => handleSelect(option.id)}
                className="flex items-center justify-center gap-2 px-[14px] py-2 rounded-lg"
              >
                {isSelected && <CheckIcon className="text-brand-neon" />}
                <span className={isSelected ? 'body-1-bold text-label-normal' : 'body-1-normal text-label-normal'}>
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 목표 추가 버튼 */}
        {onAddGoal && (
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={onAddGoal}
              className="flex items-center justify-center gap-2 h-[44px] px-[18px] py-[10px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
            >
              <PlusIcon className="text-label-alternative" />
              <span className="body-1-bold text-label-alternative">목표 추가</span>
            </button>
          </div>
        )}
      </BottomSheet.Content>
    </>
  );
};

export default GoalSelectView;
