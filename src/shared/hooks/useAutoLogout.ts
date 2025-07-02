'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';

export function useAutoLogout() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (!accessToken || !refreshToken) {
      router.push('/login');
      return;
    }
  }, [router]);
}
