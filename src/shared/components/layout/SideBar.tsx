import { LogoutButton } from '@/feature/auth/logoutButton/component';
import Image from 'next/image';
import Link from 'next/link';

export const SideBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <aside className="max-sm:hidden flex h-screen min-w=[88px] gap-[24px] bg-fill-normal flex-col items-center py-8 shadow-lg">
      <Link href={'/home'}>
        <Image src="/Logo.svg" alt="icon of growit" width={32} height={32} />
      </Link>
      <LogoutButton />

      <div className="flex-1 w-full flex flex-col items-center gap-2">{children}</div>
    </aside>
  );
};
