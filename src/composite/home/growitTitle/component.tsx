'use client';

import Image from 'next/image';

export const GrowitTitle = () => {
  return (
    <div className="sm:hidden w-full px-[20px] mt-[24px]">
      <div className="flex items-center gap-2">
        <Image src="/logo-text.svg" alt="Growit" height={16} width={120} />
      </div>
    </div>
  );
};
