import { WeeklyGoalBanner } from '@/feature/goal/weeklyGoalBanner';
import { useGoalSelector } from '@/model/goal/context';

export const GoalBanner = () => {
  const { currentGoal } = useGoalSelector();
  if (!currentGoal) return null;
  return <WeeklyGoalBanner goal={currentGoal} />;
};
