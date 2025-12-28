'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardStatus } from './hooks';
import { ROUTES } from '@/shared/constants/routes';

export const GoalOnboardRedirect = () => {
  const router = useRouter();
  const { hasOnboarded } = useOnboardStatus();

  useEffect(() => {
    if (hasOnboarded === false) {
      router.push(ROUTES.CREATE_GOAL_ONBOARD);
    }
  }, [hasOnboarded, router]);

  return null;
};
