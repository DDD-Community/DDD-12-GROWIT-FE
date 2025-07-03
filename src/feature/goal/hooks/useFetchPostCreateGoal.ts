import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { postCreateGoal } from '../api/api';
import { GoalFormData } from '@/app/home/create-goal/page';
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
  const router = useRouter();
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
      showToast('목표가 성공적으로 생성되었습니다!', 'success');

      // 성공 토스트 메시지가 보인 후 home 페이지로 이동
      setTimeout(() => {
        router.push('/home');
      }, 500);
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
