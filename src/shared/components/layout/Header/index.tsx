'use client';

import { HeaderDesktop, HeaderMode } from './Header.Desktop';
import { HeaderMobile } from './Header.Mobile';
import { HeaderBackButton } from './Header.Mobile';
import { useEffect, useState } from 'react';

interface HeaderProps {
  mode?: HeaderMode;
  title?: string;
  rightSection?: React.ReactNode;
  banner?: React.ReactNode;
  isLanding?: boolean;
}

const Header = ({ mode = 'page', title, rightSection, banner, isLanding = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50); // 50px 스크롤 시 배경색 변경
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  const headerClasses = isLanding
    ? `fixed z-100 left-0 w-full transition-all duration-300 border-b-[1px] border-line-normal ${
        isScrolled ? 'bg-[#1B1C1E]' : 'bg-transparent border-b-0'
      }`
    : 'fixed z-100 left-0 w-full border-b-[1px] border-line-normal bg-[#1B1C1E]';

  return (
    <header className={headerClasses}>
      {banner && <div className="w-full">{banner}</div>}
      <HeaderDesktop mode={mode} title={title} rightSection={rightSection} />
      <HeaderMobile mode={mode} title={title} rightSection={rightSection} />
    </header>
  );
};

export { HeaderBackButton };

export default Header;
