import { useState, useCallback } from 'react';
import { patchTodoStatus } from '../api/api';

export function usePatchTodoStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (todoId: string, isCompleted: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      await patchTodoStatus({ todoId, isCompleted });
    } catch (err: any) {
      setError(err?.message || '체크 상태를 변경하지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate, isLoading, error };
}
