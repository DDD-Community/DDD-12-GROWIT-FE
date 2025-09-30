'use client';

import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import Button from '@/shared/components/input/Button';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return <Button size={'ml'} text={'로그아웃'} onClick={handleLogout} />;
};

export const LogoutDarkButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return (
    <div className="max-w-40 px-5">
      <Button variant="secondary" size={'lg'} text={'로그아웃'} onClick={handleLogout} />
    </div>
  );
};
