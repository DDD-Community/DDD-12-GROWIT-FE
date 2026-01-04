'use client';

import { useRouter } from 'next/navigation';

type PageHeaderProps = {
  title?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const PageHeader = ({ title = '제목', leftSection, rightSection }: PageHeaderProps) => {
  const router = useRouter();
  // 추후에 safe-area-inset-top 적용 필요 (pt-8 대체)
  return (
    <nav className="text-center relative px-2 pt-8 pb-4 w-full border-b border-line-normal flex items-center justify-center">
      {leftSection ? (
        <div className="absolute left-4">{leftSection}</div>
      ) : (
        <button type="button" onClick={() => router.back()} className="text-white absolute left-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <h1 className="heading-2-bold text-text-strong">{title}</h1>
      {rightSection && <div className="absolute right-4">{rightSection}</div>}
    </nav>
  );
};
