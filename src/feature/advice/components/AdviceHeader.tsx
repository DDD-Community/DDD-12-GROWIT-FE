'use client';

import { useRouter } from 'next/navigation';

export const AdviceHeader = () => {
  const router = useRouter();
  return (
    <header className="w-full flex justify-end items-center px-5 py-4 body-1-normal text-text-strong bg-transparent">
      <button onClick={() => router.push('/advice/history')} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      </button>
    </header>
  );
};
