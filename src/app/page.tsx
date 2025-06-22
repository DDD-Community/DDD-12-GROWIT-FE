'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 토큰 확인
    const accessToken = tokenController.getAccessToken();
    const refreshToken = tokenController.getRefreshToken();

    // 토큰이 있으면 main 페이지로, 없으면 login 페이지로 리다이렉션
    if (accessToken && refreshToken) {
      router.push('/main');
    } else {
      router.push('/login');
    }
  }, [router]);

  // 리다이렉션 중에는 로딩 화면 표시
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1C1C1E]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">GROWIT</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        <p className="text-gray-400 mt-4">페이지를 불러오는 중...</p>
      </div>
    </div>
  );
}
