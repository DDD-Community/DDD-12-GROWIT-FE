import Image from 'next/image';
import Section from '@/shared/components/layout/Section';

export const ThirdSection = () => {
  return (
    <Section className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-between p-5 md:p-28 bg-[#84FF90]">
      <div className="flex flex-col items-start gap-y-6 mb-12 md:mb-0 w-full animate-fade-in-left">
        <h2 className="text-3xl md:text-5xl font-bold text-text-inverse leading-[140%]">
          그렇다면, <br /> 게임같이 재밌는 목표 관리 <br /> 함께 해보실래요?
        </h2>
        <p className="max-w-3xl text-base font-normal md:text-lg lg:text-xl text-[#1A331C]">
          특별한 세계관과 귀여운 캐릭터 스토리텔링이 <br /> 매력적인 목표 관리 서비스, 그로잇을 소개해요
        </p>
      </div>

      <Image
        src="/landing/third-section.png"
        width={356}
        height={469}
        className="hidden md:block shrink-0 animate-fade-in-right"
        alt="third-section-image"
      />
      <Image
        src="/landing/third-section.png"
        width={205}
        height={270}
        className="block md:hidden animate-fade-in-right"
        alt="third-section-image"
      />
    </Section>
  );
};
