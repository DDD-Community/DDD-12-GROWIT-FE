'use client';

import { Select } from '@/shared/components/input/Select';
import { Goal } from '@/shared/type/goal';

interface GoalSelectorProps {
  goalList: Goal[];
  selectedGoalId: string;
  onGoalChange: (goalId: string) => void;
  disabled?: boolean;
}

export const GoalSelector = ({ goalList, selectedGoalId, onGoalChange, disabled = false }: GoalSelectorProps) => {
  const selectedGoal = goalList.find(goal => goal.id === selectedGoalId);
  const goalOptions = goalList.map(goal => goal.name || '제목 없음');
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
