import { queryOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import { getProgressGoals } from './api';

export const createProgressGoalsQuery = () => {
  return queryOptions({
    queryKey: GoalQueryKeys.progress(),
    queryFn: getProgressGoals,
  });
};
