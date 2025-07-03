'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAutoLogout } from '@/shared/hooks';
import Button from '@/shared/components/navigation/Button';
import { ChevronLeft } from 'lucide-react';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();
  return (
    <div className="flex w-screen h-screen max-sm:flex-col">
      {/* 데스크톱에서만 보이는 Sidebar */}
      <Sidebar />
      <MobileHeader />
      <div className="flex flex-1 max-sm:overflow-auto">{children}</div>
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
    <div className="sm:hidden flex items-center justify-between px-2 pb-3 pt-12 bg-[#1C1C1E] border-b border-gray-700">
      <div className="flex items-center gap-3">{shouldShowBackButton && <BackButton />}</div>
      <div className="flex items-center gap-2">
        {pathname === '/home' && <Button size="sm" text="목표추가" onClick={() => router.push('/home/create-goal')} />}
      </div>
    </div>
  );
};

const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center justify-center w-10 h-10 rounded-lg  hover:bg-gray-700 transition-colors`}
      aria-label="뒤로가기"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};
