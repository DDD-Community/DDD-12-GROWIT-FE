import { queryOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import { getProgressGoals, getAllGoals } from './api';

export const createProgressGoalsQuery = () => {
  return queryOptions({
    queryKey: GoalQueryKeys.progress(),
    queryFn: getProgressGoals,
  });
};

export const createAllGoalsQuery = () => {
  return queryOptions({
    queryKey: GoalQueryKeys.all(),
    queryFn: getAllGoals,
  });
};
