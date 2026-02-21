'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/shared/lib/auth';
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

    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
  }, [router, isMockEnvironment]);
}
