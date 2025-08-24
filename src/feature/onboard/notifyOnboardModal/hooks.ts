import { useState, useEffect, useCallback } from 'react';
import { getOnboardStatus, putOnboardStatus } from './api';

export function useOnboardStatus() {
  const [hasOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  const fetchOnboardStatus = useCallback(async () => {
    try {
      const status = await getOnboardStatus();
      setIsOnboarded(status);
    } catch (err) {
      console.error('Failed to fetch onboard status:', err);
    }
  }, []);

  useEffect(() => {
    fetchOnboardStatus();
  }, [fetchOnboardStatus]);

  const updateOnboardStatus = useCallback(async () => {
    try {
      await putOnboardStatus();
      setIsOnboarded(true);
    } catch (err) {
      console.error('Failed to update onboard status:', err);
      throw err;
    }
  }, []);

  return {
    hasOnboarded,
    refetch: fetchOnboardStatus,
    updateOnboardStatus,
  };
}
