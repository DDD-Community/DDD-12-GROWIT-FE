import { useState, useCallback, useEffect } from 'react';
import { postAddRetrospect, getRetrospects, putRetrospect, GetRetroSpectDto } from './api';

interface UseAddRetrospectOptions {
  onSuccess?: (data: { id: string }) => void;
  onError?: (error: unknown) => void;
}

export function useFetchAddRetrospect(options?: UseAddRetrospectOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const addRetrospect = async (params: { goalId: string; planId: string; content: string }) => {
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

interface UseEditRetrospectOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface EditRetrospectParams {
  retrospectId: string;
  planId: string;
  content: string;
}

export function useFetchEditRetrospect(options?: UseEditRetrospectOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const editRetrospect = useCallback(
    async ({ retrospectId, planId, content }: EditRetrospectParams) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        await putRetrospect({ retrospectId, planId, content });
        options?.onSuccess?.();
      } catch (err) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, options]
  );

  return {
    editRetrospect,
    isLoading,
    error,
  };
}

interface UseFetchRetrospectsOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
}

export function useFetchRetrospects(req: { goalId: string; planId: string }, options?: UseFetchRetrospectsOptions) {
  const [retrospect, setData] = useState<GetRetroSpectDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchRetrospects = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const { goalId, planId } = req;
      const result = await getRetrospects({ goalId, planId });
      setData(result[0]);
      options?.onSuccess?.(result[0]);
      return result;
    } catch (err) {
      setError(err);
      options?.onError?.(err);
      // 404 에러는 정상적인 상황이므로 에러를 던지지 않음
      if (err && typeof err === 'object' && 'status' in err && err.status === 404) {
        setData(null); // 데이터가 없음을 명시
        return null;
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [req.goalId, req.planId]);

  useEffect(() => {
    fetchRetrospects();
  }, [req.goalId, req.planId, fetchRetrospects]);

  return {
    retrospect,
    isLoading,
    error,
    fetchRetrospects,
  };
}
