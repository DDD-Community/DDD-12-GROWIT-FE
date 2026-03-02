'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/shared/lib/auth';
import { appBridge } from '@/shared/lib/appBridge';
import { useMockEnvironment } from './useMockEnvironment';

export function useAutoLogout() {
  const router = useRouter();
  const isMockEnvironment = useMockEnvironment();

  useEffect(() => {
    // Mock 환경: 비활성화
    if (isMockEnvironment) {
      return;
    }

    // 앱 환경: AppAuthProvider가 토큰 관리하므로 스킵
    if (appBridge.isInApp()) {
      return;
    }

    // 웹 환경: 토큰 없으면 로그인 페이지로
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router, isMockEnvironment]);
}
