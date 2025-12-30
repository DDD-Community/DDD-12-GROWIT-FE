import { mutationOptions, queryOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AdviceQueryKeys } from './queryKeys';
import AdviceApi from './api';
import { AdviceChat, AdviceChatRequest } from './types';

export const AdviceQuery = {
  getAdviceChat: (options?: Omit<UseQueryOptions<AdviceChat, Error>, 'queryKey' | 'queryFn'>) => {
    return queryOptions({
      ...options,
      queryKey: AdviceQueryKeys.chat(),
      queryFn: AdviceApi.getAdviceChat,
    });
  },
};

export const AdviceMutation = {
  requestAdvice: (
    options?: Omit<UseMutationOptions<AdviceChat, Error, AdviceChatRequest>, 'mutationKey' | 'mutationFn'>
  ) => {
    return mutationOptions({
      ...options,
      mutationKey: AdviceQueryKeys.chat(),
      mutationFn: AdviceApi.requestAdvice,
    });
  },
};
