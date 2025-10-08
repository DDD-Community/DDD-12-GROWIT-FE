'use client';

import { useState, useCallback } from 'react';
import { postAddTodo } from '../api/api';

export function useFetchAddTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const addTodo = useCallback(async (request: Parameters<typeof postAddTodo>[0]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postAddTodo(request);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addTodo, loading, error, data };
}
