'use client';

import { useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '@/shared/lib/auth';
import { appBridge } from '@/shared/lib/appBridge';


interface AppBridgeContextValue {
  isApp: boolean;
}

const AppBridgeContext = createContext<AppBridgeContextValue>({
  isApp: false,
});

export const useAppBridge = () => useContext(AppBridgeContext);

interface AppBridgeProviderProps {
  children: ReactNode;
}

export function AppBridgeProvider({ children }: AppBridgeProviderProps) {
  const isApp = appBridge.isInApp();

  // Auth 이벤트 구독 → 앱에 알림
  useEffect(() => {
    if (!isApp) return;

    // 로그아웃 이벤트 → 앱에 LOGOUT 전송
    const unsubLogout = authService.onLogout(() => {
      appBridge.sendToApp('LOGOUT');
    });

    // 토큰 갱신 이벤트 → 앱에 TOKEN_REFRESHED 전송
    const unsubRefresh = authService.onTokenRefresh((tokens) => {
      appBridge.sendToApp('TOKEN_REFRESHED', tokens);
    });

    return () => {
      unsubLogout();
      unsubRefresh();
    };
  }, [isApp]);

  return (
    <AppBridgeContext.Provider value={{ isApp }}>
      {children}
    </AppBridgeContext.Provider>
  );
}
