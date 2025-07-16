'use client';

import { Select } from '@/shared/components/input/Select';
import { ExtendedGoal } from './hooks';

interface GoalSelectorProps {
  goalList: ExtendedGoal[];
  selectedGoalId: string;
  onGoalChange: (goalId: string) => void;
  disabled?: boolean;
}

export const GoalSelector = ({ goalList, selectedGoalId, onGoalChange, disabled = false }: GoalSelectorProps) => {
  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId);

  // goal 목록을 string 배열로 변환 (Select 컴포넌트가 string[]를 받음)
  const goalOptions = goalList.map(goal => goal.name || '제목 없음');

  // 선택된 goal의 name을 찾아서 selected 값으로 사용
  const selectedGoalName = selectedGoal?.name || '';

  const handleGoalChange = (goalName: string) => {
    const selectedGoal = goalList.find(goal => goal.name === goalName);
    if (selectedGoal) {
      onGoalChange(selectedGoal.id);
    }
  };

  return (
    <Select
      options={goalOptions}
      selected={selectedGoalName}
      onChange={handleGoalChange}
      placeholder="목표를 선택하세요"
      disabled={disabled}
      className="min-w-[200px]"
    />
  );
};
