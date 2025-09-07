'use client';

import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';

const HeaderActions = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant="tertiary" size="sm" text="로그인" onClick={handleLogin} />
      <Button variant="primary" size="sm" text="시작하기" onClick={handleSignup} />
    </div>
  );
};

export default HeaderActions;
