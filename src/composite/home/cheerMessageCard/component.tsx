import Image from 'next/image';

export const CheerMessageCard = () => {
  return (
    <div className="flex gap-[16px]">
      <Image
        src={'/growit-cat.png'}
        alt={'growit-cat'}
        width={100}
        height={100}
        className="border-[2px] min-w-[100px] h-[100px] border-[#70737C52] rounded-[200px]"
      />
      <div className="bg-[#23242A] rounded-xl px-5 py-4 w-fit min-w-[320px] shadow flex flex-col gap-1">
        <div className="text-xs text-[#AEB0B6]">To. 상윤</div>
        <div className="text-[15px] text-white font-normal leading-snug break-keep">
          최고의 아이디어는 종종 테이블 위의 커피 잔 옆에서 나온다냥!
        </div>
        <div className="text-xs text-[#AEB0B6] text-right mt-2">From. 그로냥</div>
      </div>
    </div>
  );
};
