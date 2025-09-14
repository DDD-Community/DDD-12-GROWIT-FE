import { useState } from 'react';
import { postEarlyBirdEvent, EarlyBirdEventRequest } from '../api/api';

interface UseEarlyBirdEventOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseEarlyBirdEventReturn {
  isLoading: boolean;
  submitEarlyBirdEvent: (request: EarlyBirdEventRequest) => Promise<void>;
}

export const useFetchInvestingInfo = (options?: UseEarlyBirdEventOptions): UseEarlyBirdEventReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const submitEarlyBirdEvent = async (request: EarlyBirdEventRequest) => {
    setIsLoading(true);

    try {
      await postEarlyBirdEvent(request);
      options?.onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to submit early bird event');
      console.error('Failed to submit early bird event:', error);
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    submitEarlyBirdEvent,
  };
};
