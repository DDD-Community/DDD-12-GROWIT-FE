import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { getOnboardStatus } from './api';
import { ROUTES } from '@/shared/constants/routes';

export function useOnboardStatus() {
  const pathname = usePathname();
  const isHomeBootstrapRoute = pathname === ROUTES.HOME;
  const [hasOnboarded, setIsOnboarded] = useState<boolean | null>(() => (isHomeBootstrapRoute ? true : null));

  const fetchOnboardStatus = useCallback(async () => {
    if (isHomeBootstrapRoute) {
      setIsOnboarded(true);
      return;
    }

    try {
      setIsOnboarded(null);
      const status = await getOnboardStatus();
      setIsOnboarded(status);
    } catch (err) {
      console.error('Failed to fetch onboard status:', err);
    }
  }, [isHomeBootstrapRoute]);

  useEffect(() => {
    fetchOnboardStatus();
  }, [fetchOnboardStatus]);

  return {
    hasOnboarded,
    refetch: fetchOnboardStatus,
  };
}
