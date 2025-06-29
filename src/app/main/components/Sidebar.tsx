'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  return (
    <aside className="h-screen w-[88px] bg-fill-normal flex flex-col items-center py-8 shadow-lg">
      <button onClick={() => router.push('/main')}>
        <Image src="/Logomark.svg" alt="icon of growit" width={32} height={32} />
      </button>
      <div className="flex-1 w-full flex flex-col items-center">{children}</div>
    </aside>
  );
};
