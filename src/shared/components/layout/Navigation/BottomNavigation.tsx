'use client';

import { useRouter, usePathname } from 'next/navigation';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES_MOBILE, ROUTES, shouldHiddenNavigation, titleStyle } from '@/shared/constants/routes';
import FlexBox from '../../foundation/FlexBox';

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const shouldShowNavigation = pathSegments.length <= 1 || shouldHiddenNavigation(pathname);

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  if (!shouldShowNavigation) {
    return null;
  }

  return (
    <nav className="fixed z-100 bottom-0 max-w-md mx-auto w-full p-2 flex items-center justify-around bg-normal border-t-[1px] border-t-[#70737C47]">
      {NAVIGATION_ROUTES_MOBILE.map(item => {
        const active = isActive(item.path);
        const IconComponent = active ? item.activeIcon : item.inActiveIcon;
        return (
          <Button
            key={item.path}
            size={'sm'}
            variant="tertiary"
            layout="icon-only"
            className={active ? 'bg-surface-assistive' : ''}
            icon={
              <FlexBox direction="col">
                {<IconComponent />}
                <span className={active ? titleStyle.active : titleStyle.inActive}>{item.title}</span>
              </FlexBox>
            }
            onClick={() => router.push(item.path)}
          />
        );
      })}
    </nav>
  );
};
