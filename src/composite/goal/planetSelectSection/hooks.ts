import { getToday } from '@/feature/goal/form/createGoalFormElement/utils';
import { GoalQuery } from '@/model/goal/queries';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useShowEndedGoalsSheet = (showSheet: () => void) => {
  const msUntilEndOfDay = getMsUntilEndOfDay();
  const { data: endedGoals = [] } = useQuery(
    GoalQuery.getEndedGoals({
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );
  useEffect(() => {
    const todayCompletedGoals = endedGoals.filter(goal => goal.duration.endDate === getToday());
    // 오늘 종료된 목표가 한개 이상 있고, 체크된 목표가 있을 경우 바텀시트가 나타남
    const hasCheckedGoals = todayCompletedGoals.some(goal => goal.isChecked);
    if (hasCheckedGoals) {
      showSheet();
    }
  }, []);
};
