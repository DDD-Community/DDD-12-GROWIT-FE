'use client';

import { useState, useCallback } from 'react';
import { putUpdatePlan } from './api';
import { useToast } from '@/shared/components/feedBack/toast';
import { AxiosError } from 'axios';

interface UseFetchEditPlanOptions {
  onSuccess?: (result: string) => void;
  onError?: (error: Error) => void;
}

export function useFetchEditPlan(options?: UseFetchEditPlanOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const updatePlan = useCallback(
    async (goalId: string, planId: string, content: string) => {
      setLoading(true);
      setError(null);

      try {
        const message = await putUpdatePlan({ goalId, planId, content });
        showToast(message, 'success');
        options?.onSuccess?.(message);
        return message;
      } catch (err: unknown) {
        const error = err as Error;
        if (err instanceof AxiosError) {
          const errorMessage = err.response?.data?.message || '주간 목표 수정에 실패했습니다.';
          showToast(errorMessage, 'error');
        } else {
          showToast('주간 목표 수정에 실패했습니다.', 'error');
        }
        setError(error);
        options?.onError?.(error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [showToast, options]
  );

  return { updatePlan, loading, error };
}
