import { queryOptions, mutationOptions, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import { getProgressGoals, putEditGoal, getEndedGoals, deleteGoal } from './api';
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

export const createEndedGoalsQuery = (option?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
  return queryOptions({
    ...option,
    queryKey: GoalQueryKeys.ended(),
    queryFn: getEndedGoals,
  });
};

export const createDeleteGoalMutation = (option?: Omit<UseMutationOptions<string, Error, string>, 'mutationFn'>) => {
  return mutationOptions({
    ...option,
    mutationFn: (goalId: string) => {
      if (!goalId) throw new Error('Goal ID가 필요합니다');
      return deleteGoal(goalId);
    },
  });
};

export const createDeleteGoalsMutation = (
  option?: Omit<UseMutationOptions<string[], Error, Set<string>>, 'mutationFn'>
) => {
  return mutationOptions({
    ...option,
    mutationFn: (goalIds: Set<string>) => Promise.all(Array.from(goalIds).map(goalId => deleteGoal(goalId))),
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
