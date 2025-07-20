'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/feature/auth/logoutButton/component';

export const HeaderDesktop = () => {
  const pathname = usePathname();

  // 홈 페이지에서는 헤더를 표시하지 않음
  if (pathname === '/home') {
    return null;
  }

  const getPageTitle = () => {
    switch (pathname) {
      case '/home':
        return '홈';
      case '/mypage':
        return '마이페이지';
      case '/onboarding':
        return '온보딩';
      default:
        return 'Growit';
    }
  };

  return (
    <header className="hidden sm:flex items-center justify-between px-6 py-4 bg-[#232326] shadow-sm border-t-[1px] border-line-normal">
      {/* 왼쪽: 로고와 페이지 제목 */}
      <div className="flex items-center gap-4">
        <Image src="/logo-text.svg" alt="Growit" width={86} height={32} />
        <div className="h-6 w-px bg-gray-600" />
        <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
      </div>

      {/* 오른쪽: 사용자 정보 및 액션 */}
      <div className="flex items-center gap-4">
        {/* 사용자 프로필 (예시) */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>사용자님</span>
        </div>

        {/* 로그아웃 버튼 */}
        <LogoutButton />
      </div>
    </header>
  );
};
