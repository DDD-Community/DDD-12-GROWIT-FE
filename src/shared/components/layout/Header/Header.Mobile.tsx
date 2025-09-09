'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { HEADER_CONFIG } from './header.config';
import { HeaderMode } from './Header.Desktop';

interface HeaderMobileProps {
  mode?: HeaderMode;
  title?: string;
  rightSection?: React.ReactNode;
}

export const HeaderMobile = ({ mode = 'page', title, rightSection }: HeaderMobileProps) => {
  const pathname = usePathname();
  if (HEADER_CONFIG.hideHeaderPages.includes(pathname as any)) {
    // << 여기 타입 고칠 것
    return null;
  }

  const shouldShowBackButton = !HEADER_CONFIG.hideBackButtonPages.includes(pathname as any); // << 여기 고칠 것

  const getPageTitle = () => {
    return HEADER_CONFIG.pageTitles[pathname] || '';
  };

  return (
    <>
      <header className="sm:hidden fixed left-0 w-full bg-[#1C1C1E] border-b-[1px] border-line-normal z-100">
        {mode === 'logo' ? (
          <div className="flex items-center justify-between px-4 py-3">
            <Image src="/logo-text.svg" alt="Growit" height={32} width={100} />
            <div className="flex items-center gap-3">{rightSection}</div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-3 relative">
            <div className="flex items-center gap-3 min-w-[40px] h-[40px]">
              {shouldShowBackButton && <HeaderBackButton />}
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {mode === 'title' ? (
                <h1 className="text-lg font-semibold text-white">{title || 'Growit'}</h1>
              ) : (
                <h1 className="text-base font-semibold text-white">{getPageTitle()}</h1>
              )}
            </div>

            <div className="flex items-center gap-3 min-w-[40px] h-[40px]">{rightSection}</div>
          </div>
        )}
      </header>
      <div className="sm:hidden h-[60px]" />
    </>
  );
};

export const HeaderBackButton = () => {
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
