'use client';

import { useState, useCallback } from 'react';
import { AddTodoResponse, postAddTodo } from '../api/api';
import { AxiosError } from 'axios';
import { CommonError } from '@/shared/type/response';

interface UseFetchAddTodoProps {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError<CommonError>) => void;
}

export function useFetchAddTodo({ onSuccess, onError }: UseFetchAddTodoProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<CommonError> | null>(null);
  const [data, setData] = useState<AddTodoResponse | null>(null);

  const addTodo = useCallback(
    async (request: Parameters<typeof postAddTodo>[0]) => {
      setLoading(true);
      setError(null);
      try {
        const result = await postAddTodo(request);
        setData(result);
        onSuccess?.(result);
        return result;
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

  return { addTodo, loading, error, data };
}
