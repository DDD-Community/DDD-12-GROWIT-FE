'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import { useFetchGetGoal } from '@/app/main/useFetchGetGoal';
import { LogoutButton } from '@/app/main/components/LogoutButton';
import { CreateGoalForm } from '@/app/main/components/CreateGoalForm';

export default function MainPage() {
  useAutoLogout();
  const { isLoading, goal, fetchGoal } = useFetchGetGoal();

  return (
    <div className="flex h-screen bg-[#1C1C1E] overflow-hidden">
      <div className="p-8">
        <CreateGoalForm />
        <LogoutButton />
      </div>
    </div>
  );
}

function useAutoLogout() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (!accessToken || !refreshToken) {
      router.push('/login');
      return;
    }
  }, [router]);
}
