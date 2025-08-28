import { useState } from 'react';
import { postCompletedGoalRetrospect } from './api';
import { useToast } from '@/shared/components/feedBack/toast';

export const useRetrospectAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();

  const postAISummary = async (goalId: string) => {
    setIsLoading(true);
    /** 아직 회고 정보가 존재하지 않는다고 뜸 */
    try {
      const result = await postCompletedGoalRetrospect(goalId);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    }
    setIsLoading(false);
  };

  return { isLoading, isSuccess, postAISummary };
};
