import { useState } from 'react';
import { postCreateGoal } from '../api/api';
import { GoalFormData } from '@/app/(home)/home/create-goal/page';
import { useToast } from '@/shared/components/feedBack/toast';

interface UseFetchPostCreateGoalReturn {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  createGoal: (data: GoalFormData) => Promise<void>;
  reset: () => void;
}

export const useFetchPostCreateGoal = (): UseFetchPostCreateGoalReturn => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGoal = async (data: GoalFormData) => {
    try {
      reset();
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      setError(null);
      await postCreateGoal(data);
      setIsSuccess(true);
    } catch (err) {
      setIsError(true);
      const errorMessage = err instanceof Error ? err.message : '목표 생성에 실패했습니다.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  };

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    createGoal,
    reset,
  };
};
