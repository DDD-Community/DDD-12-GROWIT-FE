import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface UseRedirectToOnboardingProps {
  goalListLength: number;
  isLoading: boolean;
}

export function useRedirectToOnboarding({ goalListLength, isLoading }: UseRedirectToOnboardingProps) {
  const router = useRouter();
  const saveOnboardingVisit = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_visited_at', new Date().toISOString());
    }
  }, []);

  const navigateToOnboarding = useCallback(() => {
    saveOnboardingVisit();
    router.push('/onboarding');
  }, [router, saveOnboardingVisit]);

  useEffect(() => {
    /** 로딩이 완료되고, 목표가 없고, 온보딩을 방문한 기록이 없을 때만 온보딩으로 이동
     */
    if (!isLoading && goalListLength === 0) {
      const onboardingVisited = typeof window !== 'undefined' && localStorage.getItem('onboarding_visited_at');

      if (!onboardingVisited) {
        navigateToOnboarding();
      }
    }
  }, [isLoading, goalListLength, navigateToOnboarding]);

  return {
    navigateToOnboarding,
    saveOnboardingVisit,
  };
}
