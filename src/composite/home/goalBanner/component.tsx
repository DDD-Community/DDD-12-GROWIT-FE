import { WeeklyGoalBanner } from '@/feature/goal/weeklyGoalBanner';
import { useGoalSelector } from '@/model/goal/context';

export const GoalBanner = () => {
  const { selectedGoal } = useGoalSelector();
  if (!selectedGoal) return null;
  return <WeeklyGoalBanner goal={selectedGoal} />;
};
