import { getToday } from '@/feature/goal/createGoalFormElement/utils';
import { Goal } from '@/shared/type/goal';
import { useEffect } from 'react';

export const useShowEndedGoalsSheet = (allGoals: Goal[], showSheet: () => void) => {
  useEffect(() => {
    const endedGoals = allGoals.filter(goal => goal.updateStatus === 'ENDED');
    const todayCompletedGoals = endedGoals.filter(goal => goal.duration.endDate === getToday());
    // 오늘 종료된 목표가 한개 이상 있을 경우 바텀시트가 나타남
    if (todayCompletedGoals.length > 0) {
      showSheet();
    }
  }, []);
};
