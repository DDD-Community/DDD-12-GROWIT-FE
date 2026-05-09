'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/constants/routes';
import { Z_INDEX } from '@/shared/lib/z-index';
import { cn } from '@/shared/lib/utils';
import { NavHomeFilledIcon, NavGoalIcon, NavProfileIcon } from './NavIcons';

const NAV_ITEMS = [
  { path: ROUTES.HOME, icon: NavHomeFilledIcon, title: '홈' },
  { path: ROUTES.GOAL, icon: NavGoalIcon, title: '목표' },
  { path: ROUTES.MYPAGE, icon: NavProfileIcon, title: '마이' },
] as const;

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  return (
    <nav
      className={`fixed bottom-0 max-w-md mx-auto w-full px-[25px] pb-[25px] pt-4 flex items-center justify-between ${Z_INDEX.BOTTOM_NAVIGATION}`}
    >
      {/* Tab bar container */}
      <div className="flex items-center gap-4 bg-[#27272A] rounded-3xl p-2 shadow-[0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_rgba(0,0,0,0.06),0px_2px_4px_rgba(0,0,0,0.04)]">
        {NAV_ITEMS.map(item => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => router.push(item.path)}
              className={cn(
                'flex items-center gap-2 rounded-3xl transition-colors',
                active
                  ? 'bg-[#E1E1E2] px-4 py-2 text-black'
                  : 'p-2.5 text-[#71717A]'
              )}
            >
              <Icon className="w-[22px] h-[22px]" />
              {active && (
                <span className="text-sm font-medium text-[#18181B]">{item.title}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
