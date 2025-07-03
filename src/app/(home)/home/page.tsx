'use client';

import { useRouter } from 'next/navigation';
import { useFetchGetGoal } from '@/feature/goal/hooks/useFetchGetGoal';
import { LogoutButton } from '@/feature/auth';
import Button from '@/shared/components/navigation/Button';
import { useEffect } from 'react';

export default function MainPage() {
  const { goal, isLoading } = useFetchGetGoal();
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

  return (
    <div className="w-full">
      <div className="flex justify-end mb-8">
        <Button size="ml" text="목표추가하기" onClick={() => router.push('/home/create-goal')} />
        <LogoutButton />
      </div>
      {goal && (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-white text-xl font-semibold mb-4">현재 목표</h2>
            <div className="space-y-2">
              <p className="text-white">{`목표이름 : ${goal.name}`}</p>
              <p className="text-white">{`현재 : ${goal.beforeAfter.asIs}`}</p>
              <p className="text-white">{`미래 : ${goal.beforeAfter.toBe}`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
