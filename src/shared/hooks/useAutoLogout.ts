'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/shared/lib/auth';
import { useMockEnvironment } from './useMockEnvironment';
import { useAppBridge } from '@/shared/components/providers/AppBridgeProvider';

export function useAutoLogout() {
  const router = useRouter();
  const isMockEnvironment = useMockEnvironment();
  const { isApp } = useAppBridge();

  useEffect(() => {
    // Mock 환경: 비활성화
    if (isMockEnvironment) {
      console.log('[useAutoLogout] Mock 환경 - 비활성화');
      return;
    }

    // 앱 환경: AppAuthProvider가 토큰 관리하므로 스킵
    if (isApp) {
      console.log('[useAutoLogout] 앱 환경 - 비활성화');
      return;
    }

    // 웹 환경: 토큰 없으면 로그인 페이지로
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router, isMockEnvironment, isApp]);
}
