import { Goal } from '@/shared/type/goal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useGoOnboarding(isLoading: boolean, goal: Goal | null) {
  const router = useRouter();
  // goal이 없고 로딩이 끝났으며, 온보딩 기록이 없으면 온보딩 페이지로 이동
  useEffect(() => {
    if (!isLoading && !goal) {
      const onboardingVisited = typeof window !== 'undefined' && localStorage.getItem('onboarding_visited_at');
      if (!onboardingVisited) {
        router.replace('/onboarding');
      }
    }
  }, [isLoading, goal, router]);
}
