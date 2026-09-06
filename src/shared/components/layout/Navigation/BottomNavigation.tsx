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
 * - 콘텐츠 위에 떠 있는 투명 오버레이
 * - 아이콘 영역 밖의 스크롤/터치 입력은 아래 콘텐츠로 전달
 */
export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <nav
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex w-full items-center justify-between bg-transparent px-[25px] pb-[calc(25px+env(safe-area-inset-bottom,0px))] pt-4 ${Z_INDEX.BOTTOM_NAVIGATION}`}
    >
      <div className="pointer-events-auto grid w-[236px] max-w-full grid-cols-3 items-center gap-[2px] bg-transparent px-2 py-1">
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
