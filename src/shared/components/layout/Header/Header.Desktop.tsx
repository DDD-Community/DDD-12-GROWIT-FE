'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

export type HeaderMode = 'logo' | 'title' | 'page';

interface HeaderDesktopProps {
  mode?: HeaderMode;
  title?: string;
  rightSection?: React.ReactNode;
}

export const HeaderDesktop = ({ mode = 'page', title, rightSection }: HeaderDesktopProps) => {
  const pathname = usePathname();

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

  const renderLeftSection = () => {
    switch (mode) {
      case 'logo':
        return (
          <div className="flex items-center gap-4 h-[32px]">
            <Image src="/logo-text.svg" alt="Growit" height={32} width={130} />
          </div>
        );
      case 'title':
        return (
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">{title || 'Growit'}</h1>
          </div>
        );
      case 'page':
        return (
          <div className="flex items-center gap-4">
            <h1 className="text-base font-medium text-white">{getPageTitle()}</h1>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="hidden sm:flex fixed z-100 left-0 w-full items-center justify-between px-[20px] py-[20px] shadow-sm border-t-[1px] border-line-normal bg-[#1B1C1E]">
        {renderLeftSection()}
        <div className="flex items-center gap-4">{rightSection || <React.Fragment />}</div>
      </header>
      <div className="max-sm:hidden h-[60px]" />
    </>
  );
};
