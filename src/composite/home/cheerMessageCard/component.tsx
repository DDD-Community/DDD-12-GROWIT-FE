'use client';

import Image from 'next/image';
import { useFetchUserName } from '@/shared/hooks';

export const CheerMessageCard = () => {
  const { userName } = useFetchUserName();

  return (
    <div className="flex gap-[16px] sm:gap-[16px]">
      <Image
        src={'/growit-cat.png'}
        alt={'growit-cat'}
        width={100}
        height={100}
        className="border-[2px] max-sm:w-[50px] max-sm:h-[50px] sm:min-[100px] sm:h-[100px] border-[#70737C52] rounded-[200px]"
      />
      <div className="bg-[#23242A] rounded-xl px-3 py-3 sm:px-5 sm:py-4 w-fit min-w-[240px] sm:min-w-[320px] shadow flex flex-col gap-1">
        <div className="text-xs text-[#AEB0B6]">To. {userName}</div>
        <div className="text-[13px] sm:text-[15px] text-white font-normal leading-snug break-keep">
          최고의 아이디어는 종종 테이블 위의 커피 잔 옆에서 나온다냥!
        </div>
        <div className="text-xs text-[#AEB0B6] text-right mt-2">From. 그로냥</div>
      </div>
    </div>
  );
};
