'use client';

import { useRouter } from 'next/navigation';

type PageHeaderProps = {
  title?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

export const PageHeader = ({ title = '', leftSection, rightSection }: PageHeaderProps) => {
  // 추후에 safe-area-inset-top 적용 필요 (pt-8 대체)
  return (
    <nav className="flex justify-between items-center px-6 pt-8 pb-4 w-full border-b border-line-normal">
      {leftSection ? <span>{leftSection}</span> : <PrevNavButton />}
      {title && <h1 className="heading-2-bold text-text-strong">{title}</h1>}
      {rightSection ? <span>{rightSection}</span> : <div className="w-6 invisible" aria-hidden="true" />}
    </nav>
  );
};

function PrevNavButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()} className="text-white">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
