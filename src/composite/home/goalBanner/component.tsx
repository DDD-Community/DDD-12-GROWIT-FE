import { WeeklyGoalBanner } from '@/feature/goal';
import { useGoalSelector } from '@/model/goal/context';

export const GoalBanner = () => {
  const { currentGoal } = useGoalSelector();
  if (!currentGoal) return null;
  return <WeeklyGoalBanner goal={currentGoal} />;
};
