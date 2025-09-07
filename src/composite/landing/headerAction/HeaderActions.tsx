'use client';

import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { tokenController } from '@/shared/lib/token';

const HeaderActions = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = tokenController.getAccessToken();
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleGoHome = () => {
    router.push('/home');
  };

  if (isLoggedIn) {
    return (
      <Button 
        variant="primary" 
        size="sm" 
        text="홈으로 돌아가기" 
        onClick={handleGoHome} 
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="tertiary" size="sm" text="로그인" onClick={handleLogin} />
      <Button variant="primary" size="sm" text="시작하기" onClick={handleSignup} />
    </div>
  );
};

export default HeaderActions;
