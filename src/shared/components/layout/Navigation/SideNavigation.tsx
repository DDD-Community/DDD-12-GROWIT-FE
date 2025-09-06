'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../../input/Button';
import { NAVIGATION_ROUTES, ROUTES } from '@/shared/constants/routes';
import { MyProfileIcon } from './MyProfileIcon';

export const SideNaviagation = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.RETROSPECT) return pathname.startsWith(path);
    return pathname === path;
  };

  return (
    <aside className="max-sm:hidden flex min-h-screen min-w-[88px] gap-[24px] bg-fill-normal flex-col items-center py-8 shadow-lg">
      <Link href={'/home'}>
        <Image src="/logo-favicon.svg" alt="icon of growit" width={32} height={32} />
      </Link>

      <div className="flex-1 w-full flex flex-col items-center gap-4">
        {NAVIGATION_ROUTES.map(item => {
          const active = isActive(item.path);
          return (
            <Button
              key={item.path}
              variant="tertiary"
              layout="icon-only"
              className={active ? 'bg-surface-assistive' : ''}
              onClick={() => router.push(item.path)}
              icon={
                <div className={active ? 'brightness-0 invert' : ''}>
                  <Image src={item.icon} alt={item.alt} width={24} height={24} />
                </div>
              }
              size={'lg'}
            />
          );
        })}
        {children}
      </div>
    </aside>
  );
};
