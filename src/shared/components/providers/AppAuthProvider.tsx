'use client';

import { useEffect, useState, ReactNode } from 'react';
import { authService } from '@/shared/lib/auth';
import { appBridge } from '@/shared/lib/appBridge';
import { debugError } from '@/shared/lib/debug';

interface AppAuthProviderProps {
  children: ReactNode;
  /** 토큰 대기 중 표시할 UI */
  loadingFallback?: ReactNode;
  /** 에러 발생 시 표시할 UI */
  errorFallback?: ReactNode;
  /** 토큰 대기 타임아웃 (ms) */
  tokenTimeout?: number;
}

export function AppAuthProvider({
  children,
  loadingFallback,
  errorFallback,
  tokenTimeout = 5000,
}: AppAuthProviderProps) {
  const [state, setState] = useState<{
    isInitialized: boolean;
    error: Error | null;
  }>({
    isInitialized: false,
    error: null,
  });

  useEffect(() => {
    const initialize = async () => {
      // 웹 환경: 즉시 초기화 완료
      if (!appBridge.isInApp()) {
        setState({ isInitialized: true, error: null });
        return;
      }

      // 앱 환경: 토큰 수신 대기
      try {
        const tokens = await appBridge.waitForAppToken(tokenTimeout);

        // authService.login() 호출 → LOGIN 이벤트 발행
        authService.login(tokens);

        setState({ isInitialized: true, error: null });
      } catch (error) {
        debugError('[AppAuthProvider] Token wait failed:', error);
        setState({
          isInitialized: true,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    initialize();
  }, [tokenTimeout]);

  // 초기화 중 (토큰 대기 중)
  if (!state.isInitialized) {
    return (
      <>
        {loadingFallback ?? (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
      </>
    );
  }

  // 에러 발생 (타임아웃 등)
  if (state.error) {
    return (
      <>
        {errorFallback ?? (
          <div className="flex h-screen w-full flex-col items-center justify-center">
            <p className="text-lg mb-4">인증 초기화 실패</p>
            <p className="text-sm text-gray-500">{state.error.message}</p>
          </div>
        )}
      </>
    );
  }

  // 정상 렌더링
  return <>{children}</>;
}
