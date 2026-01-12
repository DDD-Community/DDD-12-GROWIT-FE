import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const SuggestionSection = () => {
  return (
    <Section className="w-full bg-[#84FF90]">
      <div
        className={`flex flex-col md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.left}
          className="flex flex-col items-start gap-y-6 mb-12 md:mb-0 w-full"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-inverse leading-[140%]">
            그렇다면, <br /> 게임같이 재밌는 목표 관리 <br /> 함께 해보실래요?
          </h2>
          <p className="max-w-3xl text-base font-normal md:text-lg lg:text-xl text-[#1A331C]">
            특별한 세계관과 귀여운 캐릭터 스토리텔링이 <br /> 매력적인 목표 관리 서비스, 그로잇을 소개해요
          </p>
        </MotionWrapper>

        <MotionWrapper {...LandingPageCommonStyle.fadeIn.right}>
          <Image
            src="/landing/section-3.png"
            width={356}
            height={469}
            sizes="(max-width: 768px) 205px, 356px"
            className="w-51.25 md:w-89 h-auto shrink-0"
            alt="third-section-image"
          />
        </MotionWrapper>
      </div>
    </Section>
  );
};
