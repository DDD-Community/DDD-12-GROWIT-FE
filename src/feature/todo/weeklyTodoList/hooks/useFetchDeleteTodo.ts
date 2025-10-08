'use client';

import { useState, useCallback } from 'react';
import { deleteTodo } from '../api/api';
import { AxiosError } from 'axios';
import { CommonError } from '@/shared/type/response';

interface UseFetchDeleteTodoProps {
  onSuccess?: (todoId: string) => void;
  onError?: (error: AxiosError<CommonError>) => void;
}

export function useFetchDeleteTodo({ onSuccess, onError }: UseFetchDeleteTodoProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<CommonError> | null>(null);

  const deleteTodoItem = useCallback(
    async (todoId: string) => {
      setLoading(true);
      setError(null);
      try {
        await deleteTodo(todoId);
        onSuccess?.(todoId);
      } catch (err) {
        const error = err as AxiosError<CommonError>;
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return { deleteTodoItem, loading, error };
}
