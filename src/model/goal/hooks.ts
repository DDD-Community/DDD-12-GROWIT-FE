import { queryOptions, mutationOptions, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import { getProgressGoals, getAllGoals, putEditGoal } from './api';
import { Goal } from '@/shared/type/goal';
import { GoalFormData } from '@/shared/type/form';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';
import { postCreateGoal } from '@/feature/goal/confimGoal/api';

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

export const createCreateGoalMutation = (
  option?: Omit<UseMutationOptions<CreateGoalResponseData, Error, GoalFormData>, 'mutationFn'>
) => {
  return mutationOptions({
    ...option,
    mutationFn: postCreateGoal,
  });
};
