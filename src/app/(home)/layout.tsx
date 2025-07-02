'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAutoLogout } from '@/shared/hooks';
import { BackButton } from '@/shared/components/navigation/BackButton';
import Button from '@/shared/components/navigation/Button';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();
  return (
    <div className="flex w-screen h-screen">
      {/* 데스크톱에서만 보이는 Sidebar */}
      <Sidebar />
      <MobileHeader />
      {children}
    </div>
  );
}

const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <aside className="max-sm:hidden flex h-screen w-[88px] bg-fill-normal flex-col items-center py-8 shadow-lg">
      <button onClick={() => router.push('/home')}>
        <Image src="/Logomark.svg" alt="icon of growit" width={32} height={32} />
      </button>
      <div className="flex-1 w-full flex flex-col items-center">{children}</div>
    </aside>
  );
};

const MobileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 홈 페이지에서는 뒤로가기 버튼 숨기기
  const shouldShowBackButton = pathname !== '/home';

  return (
    <div className="sm:hidden flex items-center justify-between p-4 bg-[#1C1C1E] border-b border-gray-800">
      <div className="flex items-center gap-3">{shouldShowBackButton && <BackButton />}</div>
      <div className="flex items-center gap-2">
        {pathname === '/home' && <Button size="sm" text="목표추가" onClick={() => router.push('/home/create-goal')} />}
      </div>
    </div>
  );
};
