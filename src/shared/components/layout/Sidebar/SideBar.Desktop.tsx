import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu } from '../NavigationMenu';

export const SideBarDesktop = ({ children }: { children?: React.ReactNode }) => {
  return (
    <aside className="max-sm:hidden flex h-screen min-w-[88px] gap-[24px] bg-fill-normal flex-col items-center py-8 shadow-lg">
      <Link href={'/home'}>
        <Image src="/logo-favicon.svg" alt="icon of growit" width={32} height={32} />
      </Link>

      <div className="flex-1 w-full flex flex-col items-center gap-2">
        <NavigationMenu />
        {children}
      </div>
    </aside>
  );
};
