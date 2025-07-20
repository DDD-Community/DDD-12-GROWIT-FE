'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useAutoLogout } from '@/shared/hooks';
import { LogoutButton } from '@/feature/auth';
import Button from '@/shared/components/layout/Button';
import { SideBar } from '@/shared/components/layout/SideBar';
//import { CreateGoalButton } from '@/feature/goal';

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomePageLayout({ children }: HomeLayoutProps) {
  useAutoLogout();
  const router = useRouter();
  return (
    <div className="flex w-screen h-screen max-sm:flex-col">
      <SideBar>
        <Button
          variant="tertiary"
          layout="icon-only"
          onClick={() => router.push('/home')}
          icon={
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 21V11H13V21M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
                stroke="#DCDCDC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          size={'lg'}
        />
        <Button
          variant="tertiary"
          layout="icon-only"
          onClick={() => router.push('/mypage')}
          icon={
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          size={'lg'}
        />
      </SideBar>
      {/* 데스크톱에서만 보이는 Sidebar */}
      <MobileHeader /> {/* 모바일에서만 보이는 Header */}
      <div className="flex flex-1 max-sm:overflow-auto">{children}</div>
    </div>
  );
}

const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <aside className="max-sm:hidden flex h-screen min-w=[88px] gap-[24px] bg-fill-normal flex-col items-center py-8 shadow-lg">
      <button onClick={() => router.push('/home')}>
        <Image src="/logo-favicon.svg" alt="icon of growit" width={32} height={32} />
      </button>
      <LogoutButton />
      <div className="flex-1 w-full flex flex-col items-center">{children}</div>
    </aside>
  );
};

const MobileHeader = () => {
  const pathname = usePathname();

  // 홈 페이지에서는 뒤로가기 버튼 숨기기
  const shouldShowBackButton = pathname !== '/home';

  return (
    <div className="sm:hidden flex items-center justify-between px-2 pb-3 pt-12 bg-[#1C1C1E] border-b border-gray-700">
      <div className="flex items-center gap-3">{shouldShowBackButton && <BackButton />}</div>
      <div className="flex items-center gap-2">{pathname === '/home' && <LogoutButton />}</div>
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
