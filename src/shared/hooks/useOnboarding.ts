import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const useOnboarding = () => {
  const router = useRouter();

  const saveOnboardingVisit = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_visited_at', new Date().toISOString());
    }
  }, []);

  const navigateToOnboarding = useCallback(() => {
    // 온보딩 페이지 진입 시 방문 날짜 저장
    saveOnboardingVisit();

    // 온보딩 페이지로 이동
    router.push('/onboarding');
  }, [router, saveOnboardingVisit]);

  // 컴포넌트가 마운트될 때 자동으로 방문 날짜 저장
  useEffect(() => {
    saveOnboardingVisit();
  }, [saveOnboardingVisit]);

  return {
    navigateToOnboarding,
    saveOnboardingVisit,
  };
};
