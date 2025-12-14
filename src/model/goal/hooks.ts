import { queryOptions, mutationOptions, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import { getProgressGoals, getAllGoals, putEditGoal } from './api';
import { Goal } from '@/shared/type/goal';

export const createProgressGoalsQuery = (option?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    ...option,
    queryKey: GoalQueryKeys.progress(),
    queryFn: getProgressGoals,
  });
};

export const createAllGoalsQuery = (option?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    ...option,
    queryKey: GoalQueryKeys.all(),
    queryFn: getAllGoals,
  });
};

export const createEditGoalMutation = (option?: Omit<UseMutationOptions<string, Error, Goal>, 'mutationFn'>) => {
  return mutationOptions({
    ...option,
    mutationFn: putEditGoal,
  });
};
