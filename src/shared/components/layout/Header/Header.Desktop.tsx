'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

export type HeaderMode = 'logo' | 'title' | 'page' | 'landing';

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
      case 'landing':
        return 'Growit';
      default:
        return 'Growit';
    }
  };

  const renderLeftSection = () => {
    switch (mode) {
      case 'logo':
        return (
          <div className="flex items-center gap-4 h-8">
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
      case 'landing':
        return <h1 className="landing-title">{getPageTitle()}</h1>;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`hidden sm:flex w-full items-center justify-between p-5 ${mode === 'landing' ? '' : 'shadow-sm'}`}
      >
        {renderLeftSection()}
        <div className="flex items-center gap-4">{rightSection || <React.Fragment />}</div>
      </div>
    </>
  );
};
