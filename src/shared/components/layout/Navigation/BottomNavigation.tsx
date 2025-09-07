'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES, ROUTES, shouldHiddenNavigation, titleStyle } from '@/shared/constants/routes';
import FlexBox from '../../foundation/FlexBox';

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const shouldShowNavigation = pathSegments.length <= 1 || shouldHiddenNavigation(pathname);
  const iconConfig = {
    size: 22,
    activeColor: '#FFFFFF',
    inactiveColor: '#DCDCDC',
    strokeWidth: 2,
  };

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  if (!shouldShowNavigation) {
    return null;
  }

  return (
    <nav className="fixed z-100 bottom-0 w-full md:hidden p-2 flex items-center justify-around bg-normal border-t-[1px] border-t-[#70737C47]">
      {NAVIGATION_ROUTES.map(item => {
        const active = isActive(item.path);
        return (
          <Button
            key={item.path}
            size={'sm'}
            variant="tertiary"
            layout="icon-only"
            className={active ? 'bg-surface-assistive' : ''}
            icon={
              item.path === '/mypage' ? (
                <FlexBox direction="col" className="gap-1 text-xs font-semibold">
                  {active ? (
                    <Image
                      src="/icon/navigation-myprofile-active.svg"
                      alt={item.alt}
                      width={iconConfig.size}
                      height={iconConfig.size}
                    />
                  ) : (
                    <Image
                      src="/icon/navigation-myprofile-inactive.svg"
                      alt={item.alt}
                      width={iconConfig.size}
                      height={iconConfig.size}
                    />
                  )}

                  <span className={active ? 'text-primary-normal' : 'text-[#70737C]'}>마이</span>
                </FlexBox>
              ) : (
                <FlexBox direction="col" className={active ? 'gap-1 brightness-0 invert' : 'gap-1'}>
                  <Image src={item.icon} alt={item.alt} width={iconConfig.size} height={iconConfig.size} />
                  <span className={active ? titleStyle.active : titleStyle.inActive}>{item.title}</span>
                </FlexBox>
              )
            }
            onClick={() => router.push(item.path)}
          />
        );
      })}
    </nav>
  );
};
