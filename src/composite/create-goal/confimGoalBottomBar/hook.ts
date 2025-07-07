'use client';

import { useMemo, useState } from 'react';
import { GoalFormData } from '@/shared/type/form';
import { useToast } from '@/shared/components/feedBack/toast';
import { postCreateGoal } from './api';

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

export function useProgressPercentage(formWatch: () => GoalFormData) {
  return useMemo(() => {
    let filled = 0;
    const formValues = formWatch();

    if (formValues.duration.startDate && formValues.duration.endDate) filled++;
    if (formValues.name) filled++;
    if (formValues.beforeAfter.asIs) filled++;
    if (formValues.beforeAfter.toBe) filled++;
    formValues.plans.forEach((p: { content: string }) => {
      if (p?.content) filled++;
    });
    return Math.round((filled / 8) * 100);
  }, [formWatch()]);
}
