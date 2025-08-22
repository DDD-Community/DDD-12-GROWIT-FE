'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES, ROUTES } from '@/shared/constants/routes';

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const shouldShowNavigation = pathSegments.length <= 1;
  const iconConfig = {
    size: 22,
    activeColor: '#FFFFFF',
    inactiveColor: '#DCDCDC',
    strokeWidth: 2,
  };

  const isActive = (path: string) => {
    // RETROSPECT는 하위 경로도 포함
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    // 나머지는 정확히 일치
    return pathname === path;
  };

  if (!shouldShowNavigation) {
    return null;
  }

  return (
    <nav className="fixed z-100 bottom-0 bg-elevated-assistive w-full md:hidden p-2 flex items-center justify-around">
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
              <div className={active ? 'brightness-0 invert' : ''}>
                <Image src={item.icon} alt={item.alt} width={iconConfig.size} height={iconConfig.size} />
              </div>
            }
            onClick={() => router.push(item.path)}
          />
        );
      })}
    </nav>
  );
};
