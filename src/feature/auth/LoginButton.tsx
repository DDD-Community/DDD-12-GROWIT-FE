'use client';

import Link from 'next/link';
import { ROUTES } from '@/shared/constants/routes';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { ToolTip } from '@/shared/components/display/ToolTip';
import type { AuthMethod } from '@/shared/type/authToken';

export const EmailLoginButton = () => {
  const [lastLoginMethod, _] = useLocalStorage<AuthMethod | null>('lastLoginMethod', null);
  return (
    <Link
      href={ROUTES.LOGIN_EMAIL}
      className="w-full relative text-center py-2.5 px-4.5 text-inverse shadow-xs bg-fill-inverse rounded-lg text-base text-text-inverse font-bold hover:opacity-80"
    >
      이메일로 로그인
      {lastLoginMethod === 'EMAIL' && (
        <ToolTip text="최근 로그인" position="bottom-left" tailPosition="bottom-center" />
      )}
    </Link>
  );
};
