'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import { useFetchGetGoal } from '@/app/main/useFetchGetGoal';
import { LogoutButton } from '@/app/main/components/LogoutButton';
import { Sidebar } from '@/app/main/components/Sidebar';
import Button from '@/shared/components/navigation/Button';

export default function MainPage() {
  useAutoLogout();
  const { goal } = useFetchGetGoal();
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col h-screen bg-[#1C1C1E] overflow-hidden p-8">
        <div className="flex justify-end mb-8">
          <Button size="ml" text="목표추가하기" onClick={() => router.push('/main/create-goal')} />
          <LogoutButton />
        </div>
        {goal && (
          <div className="flex flex-col">
            <p className="text-white">{`목표이름 : ${goal.name}`}</p>
            <p className="text-white">{`현재 : ${goal.beforeAfter.asIs}`}</p>
            <p className="text-white">{`미래 : ${goal.beforeAfter.toBe}`}</p>
          </div>
        )}
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
