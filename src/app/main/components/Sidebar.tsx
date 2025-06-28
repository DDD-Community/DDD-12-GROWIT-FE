'use client';

import { useRouter } from 'next/navigation';
import Button from '../../../shared/components/Button';

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <aside className="h-screen w-56 bg-[#18181A] flex flex-col items-center py-8 shadow-lg">
      <button
        className="mb-8 text-white text-2xl font-bold hover:text-primary-normal transition-colors"
        onClick={() => router.push('/main')}
      >
        목표생성기
      </button>
      <div className="flex-1 w-full flex flex-col items-center">{children}</div>
    </aside>
  );
};
