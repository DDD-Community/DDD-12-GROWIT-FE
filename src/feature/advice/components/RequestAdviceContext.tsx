import { createContext, useContext } from 'react';
import { useMutation, useQueryClient, type UseMutateAsyncFunction } from '@tanstack/react-query';
import type { AdviceChat, AdviceChatRequest } from '@/model/advice/types';
import { useToast } from '@/shared/components/feedBack/toast';
import { AdviceMutation } from '@/model/advice/queries';
import { AdviceQueryKeys } from '@/model/advice/queryKeys';

type RequestAdviceContextType = {
  requestAdvice: UseMutateAsyncFunction<AdviceChat, Error, AdviceChatRequest, unknown>;
  isSendingRequest: boolean;
  isError: boolean;
};

const RequestAdviceContext = createContext<RequestAdviceContextType | null>(null);

export const RequestAdviceProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    mutateAsync: requestAdvice,
    isPending: isSendingRequest,
    isError,
  } = useMutation(
    AdviceMutation.requestAdvice({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AdviceQueryKeys.chat() });
      },
      onError: () => {
        showToast('조언 요청에 실패했습니다.', 'error');
      },
    })
  );

  return (
    <RequestAdviceContext.Provider value={{ requestAdvice, isSendingRequest, isError }}>
      {children}
    </RequestAdviceContext.Provider>
  );
};

export const useRequestAdvice = () => {
  const context = useContext(RequestAdviceContext);
  if (!context) {
    throw new Error('useRequestAdvice must be used within a RequestAdviceProvider');
  }
  return context;
};
