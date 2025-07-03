'use client';

import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import Button from '@/shared/components/navigation/Button';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return <Button size={'ml'} text={'로그아웃'} onClick={handleLogout} />;
};
