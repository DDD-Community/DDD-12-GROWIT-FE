'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { Z_INDEX } from '@/shared/lib/z-index';
import { NavHomeFilledIcon, NavGoalIcon, NavProfileIcon } from './NavIcons';
import { NavTabButton } from './NavTabButton';

const NAV_ITEMS = [
  { path: ROUTES.HOME, icon: NavHomeFilledIcon, title: '홈' },
  { path: ROUTES.GOAL, icon: NavGoalIcon, title: '목표' },
  { path: ROUTES.MYPAGE, icon: NavProfileIcon, title: '마이' },
] as const;

/**
 * Figma 196:1709 Tabs container
 * - bg #171717 (color/neutral/900), rounded-[28px]
 * - gap-[2px], px-2 py-1
 */
export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  return (
    <nav
      className={`relative w-full shrink-0 bg-transparent px-[25px] pb-[calc(25px+env(safe-area-inset-bottom,0px))] pt-4 flex items-center justify-between ${Z_INDEX.BOTTOM_NAVIGATION}`}
    >
      <div className="grid w-[236px] max-w-full grid-cols-3 items-center gap-[2px] rounded-[28px] bg-category-panel px-2 py-1 backdrop-blur-[0px]">
        {NAV_ITEMS.map(item => (
          <NavTabButton
            key={item.path}
            Icon={item.icon}
            label={item.title}
            active={isActive(item.path)}
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>
    </nav>
  );
};
