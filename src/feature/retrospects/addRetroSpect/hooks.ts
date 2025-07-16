import { useState } from 'react';
import { postAddRetrospect } from './api';

interface UseAddRetrospectOptions {
  onSuccess?: (data: { id: string }) => void;
  onError?: (error: unknown) => void;
}

export function useFetchAddRetrospect(options?: UseAddRetrospectOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const addRetrospect = async (params: { date: string; content: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postAddRetrospect(params);
      options?.onSuccess?.(data);
      return data;
    } catch (err) {
      setError(err);
      options?.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addRetrospect,
    isLoading,
    error,
  };
}
