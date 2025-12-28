import { useState, useEffect, useCallback } from 'react';
import { getOnboardStatus } from './api';

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

  return {
    hasOnboarded,
    refetch: fetchOnboardStatus,
  };
}
