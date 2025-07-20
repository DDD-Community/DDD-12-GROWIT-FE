'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export const HeaderMobile = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 홈 페이지에서는 헤더를 표시하지 않음
  if (pathname === '/home') {
    return null;
  }

  // 홈 페이지에서는 뒤로가기 버튼 숨기기
  const shouldShowBackButton = pathname !== '/home';

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
    <>
      <header className="sm:hidden fixed left-0 w-full flex items-center justify-between px-4 py-3 bg-[#1C1C1E] border-b border-gray-700">
        {/* 왼쪽: 뒤로가기 버튼 */}
        <div className="flex items-center gap-3 w-[40px] h-[40px]">{shouldShowBackButton && <BackButton />}</div>

        {/* 중앙: 페이지 제목 */}
        <div className="flex-1 text-center">
          <h1 className="text-base font-semibold text-white">{getPageTitle()}</h1>
        </div>

        {/* 오른쪽: 로그아웃 버튼 */}
        <div className="flex items-center gap-3 w-[40px] h-[40px]"></div>
      </header>
      <div className="h-[40px]" />
    </>
  );
};

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-700 transition-colors"
      aria-label="뒤로가기"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};
