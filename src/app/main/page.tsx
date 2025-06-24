'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import { useFetchGetGoal } from '@/app/main/useFetchGetGoal';
import { LogoutButton } from '@/app/main/LogoutButton';

export default function MainPage() {
  useAutoLogout();
  const { isLoading, goal, fetchGoal } = useFetchGetGoal();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Pretendard 폰트 테스트</h1>
      <p className="text-lg mb-2">안녕하세요! 이것은 Pretendard 폰트입니다.</p>
      <p className="font-medium">Medium 굵기 텍스트</p>
      <p className="font-semibold">SemiBold 굵기 텍스트</p>
      <p className="font-bold">Bold 굵기 텍스트</p>
      <p className="font-extrabold">ExtraBold 굵기 텍스트</p>

      <LogoutButton />
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
