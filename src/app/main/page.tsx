'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    // 토큰 확인
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // TODO: 토큰 유효성 검사
    // 예시: 토큰 만료 시간 확인
    const checkTokenExpiration = () => {
      // 임시로 1시간 후 만료
      setTimeout(() => {
        localStorage.removeItem('token');
        router.push('/login');
      }, 3600000); // 1시간
    };

    checkTokenExpiration();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pretendard 폰트 테스트</h1>
      <p className="text-lg mb-2">안녕하세요! 이것은 Pretendard 폰트입니다.</p>
      <p className="font-medium">Medium 굵기 텍스트</p>
      <p className="font-semibold">SemiBold 굵기 텍스트</p>
      <p className="font-bold">Bold 굵기 텍스트</p>
      <p className="font-extrabold">ExtraBold 굵기 텍스트</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
