'use client';

import { HeaderDesktop, HeaderMode } from './Header.Desktop';
import { HeaderMobile } from './Header.Mobile';
import { HeaderBackButton } from './Header.Mobile';
import { useEffect, useState } from 'react';

interface HeaderProps {
  // 이미 mode 타입에 따라 header 스타일이 정해지므로, isLanding 대신에 mode로 통합하는것도 좋다고 생각했습니다
  mode?: HeaderMode;
  title?: string;
  rightSection?: React.ReactNode;
  banner?: React.ReactNode;
}

const Header = ({ mode = 'page', title, rightSection, banner }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (mode !== 'landing') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50); // 50px 스크롤 시 배경색 변경
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  const headerClasses =
    mode === 'landing'
      ? `fixed z-100 left-0 w-full transition-all duration-300 ${
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
