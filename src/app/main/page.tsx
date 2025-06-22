'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    if (!accessToken || !refreshToken) {
      router.push('/login');
      return;
    }
  }, [router]);

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Pretendard 폰트 테스트</h1>
      <p className="text-lg mb-2">안녕하세요! 이것은 Pretendard 폰트입니다.</p>
      <p className="font-medium">Medium 굵기 텍스트</p>
      <p className="font-semibold">SemiBold 굵기 텍스트</p>
      <p className="font-bold">Bold 굵기 텍스트</p>
      <p className="font-extrabold">ExtraBold 굵기 텍스트</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
