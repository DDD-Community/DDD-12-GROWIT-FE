import { queryOptions, mutationOptions, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { GoalQueryKeys } from './queryKeys';
import GoalApi from './api';
import { Goal } from '@/shared/type/goal';
import { CreateGoalResponseData } from '@/feature/goal/confimGoal/api';
import { CreateGoalRequestType } from './dto';

export const GoalQuery = {
  getAllGoals: (options?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
    return queryOptions({
      ...options,
      queryKey: GoalQueryKeys.all(),
      queryFn: GoalApi.getAllGoals,
    });
  },

  getProgressGoals: (options?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
    return queryOptions({
      ...options,
      queryKey: GoalQueryKeys.progress(),
      queryFn: GoalApi.getProgressGoals,
    });
  },

  getEndedGoals: (options?: Omit<UseQueryOptions<Goal[], Error>, 'queryKey' | 'queryFn'>) => {
    return queryOptions({
      ...options,
      queryKey: GoalQueryKeys.ended(),
      queryFn: GoalApi.getEndedGoals,
    });
  },
};

export const GoalMutation = {
  deleteGoal: (options?: Omit<UseMutationOptions<string, Error, string>, 'mutationFn'>) => {
    return mutationOptions({
      ...options,
      mutationKey: GoalQueryKeys.all(),
      mutationFn: (goalId: string) => {
        if (!goalId) throw new Error('Goal ID가 필요합니다');
        return GoalApi.deleteGoal(goalId);
      },
    });
  },

  deleteGoals: (options?: Omit<UseMutationOptions<string[], Error, Set<string>>, 'mutationFn'>) => {
    return mutationOptions({
      ...options,
      mutationKey: GoalQueryKeys.all(),
      mutationFn: (goalIds: Set<string>) => Promise.all(Array.from(goalIds).map(goalId => GoalApi.deleteGoal(goalId))),
    });
  },

  editGoal: (options?: Omit<UseMutationOptions<string, Error, Goal>, 'mutationFn'>) => {
    return mutationOptions({
      ...options,
      mutationKey: GoalQueryKeys.all(),
      mutationFn: GoalApi.putEditGoal,
    });
  },

  createGoal: (
    options?: Omit<UseMutationOptions<CreateGoalResponseData, Error, CreateGoalRequestType>, 'mutationFn'>
  ) => {
    return mutationOptions<CreateGoalResponseData, Error, CreateGoalRequestType>({
      ...options,
      mutationKey: GoalQueryKeys.all(),
      mutationFn: GoalApi.postGoal,
    });
  },
};
