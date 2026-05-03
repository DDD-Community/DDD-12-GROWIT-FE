import { queryOptions, UseQueryOptions } from '@tanstack/react-query';
import { AdviceQueryKeys } from './queryKeys';
import AdviceApi from './api';
import { GrorongAdvice } from './types';

export const AdviceQuery = {
  getGrorongAdvice: (options?: Omit<UseQueryOptions<GrorongAdvice, Error>, 'queryKey' | 'queryFn'>) => {
    return queryOptions({
      ...options,
      queryKey: AdviceQueryKeys.grorong(),
      queryFn: AdviceApi.getGrorongAdvice,
    });
  },
};
