'use client';

import { ReactNode } from 'react';
import { AppBridgeProvider } from '@/shared/components/providers/AppBridgeProvider';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Auth 페이지 전용 레이아웃
 * - 토큰 대기 없음 (AppAuthProvider 사용 안 함)
 * - AppBridgeProvider만 적용 (로그인 성공 시 앱에 토큰 동기화 필요)
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AppBridgeProvider>{children}</AppBridgeProvider>;
}
