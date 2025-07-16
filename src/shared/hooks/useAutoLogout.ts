'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import { useMockEnvironment } from './useMockEnvironment';

export function useAutoLogout() {
  const router = useRouter();
  const isMockEnvironment = useMockEnvironment();

  useEffect(() => {
    // Mock 환경에서는 자동 로그아웃을 비활성화
    if (isMockEnvironment) {
      console.log('Mock 환경이 감지되어 자동 로그아웃이 비활성화되었습니다.');
      return;
    }

    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (!accessToken || !refreshToken) {
      router.push('/login');
      return;
    }
  }, [router, isMockEnvironment]);
}
