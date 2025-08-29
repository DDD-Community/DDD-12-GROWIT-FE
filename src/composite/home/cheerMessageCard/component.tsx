'use client';

import Image from 'next/image';
import { useFetchUserName } from '@/shared/hooks';
import { useCheerMessage } from './hooks';

export const CheerMessageCard = () => {
  const { fullUserName } = useFetchUserName();
  const { cheerMessage } = useCheerMessage();

  const displayMessage = cheerMessage?.message || '최고의 아이디어는 종종 테이블 위의 커피 잔 옆에서 나온다냥!';

  return (
    <div className="flex gap-[16px] sm:gap-[16px]">
      <Image
        src={'/image/grorong-avatar-default.png'}
        alt={'growit-cat'}
        width={60}
        height={60}
        className="border-[2px] w-[60px] h-[60px] border-[#70737C52] rounded-[200px]"
      />
      <div className="flex gap-3 items-center w-fit min-w-[240px] sm:min-w-[320px] sm:text-[20px] max-sm:text-[15px]">
        <span className=" text-white h-fit break-keep">
          {fullUserName && `${fullUserName}! `}
          {displayMessage}
        </span>
      </div>
    </div>
  );
};
