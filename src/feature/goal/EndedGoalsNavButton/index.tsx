'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const EndedGoalsNavButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/goal/ended')}
      className="flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
    >
      <Image src="/goal/earth-icon.png" alt="Goal Collection Nav Button" width={50} height={50} />
      <span className="label-2-medium text-label-normal">
        종료 목표 <br />
        수집함
      </span>
    </button>
  );
};
