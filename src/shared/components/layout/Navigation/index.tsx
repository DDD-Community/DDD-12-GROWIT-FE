'use client';

import { usePathname } from 'next/navigation';
import { BottomNavigation } from './BottomNavigation';
import { SideNaviagation } from './SideNavigation';
import { shouldHiddenNavigation } from '@/shared/constants/routes';

const NavigationBar = () => {
  const pathname = usePathname();
  if (shouldHiddenNavigation(pathname)) {
    return null;
  }
  return (
    <>
      <SideNaviagation />
      <BottomNavigation />
    </>
  );
};

export default NavigationBar;
