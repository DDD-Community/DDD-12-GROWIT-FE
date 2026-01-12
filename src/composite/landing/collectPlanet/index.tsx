import Section from '@/shared/components/layout/Section';
import Image from 'next/image';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const CollectPlanetFeatureSection = () => {
  return (
    <Section className="w-full bg-bg-default">
      <div
        className={`flex flex-col md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.left}
          className="flex flex-col items-start gap-y-8 mb-12 md:mb-0 w-full"
        >
          <p className="font-bold text-brand-neon text-xl lg:text-2xl">행성 수집</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-strong leading-[140%]">
            목표 유형별로 다양한 <br />
            행성 뱃지를 모아보세요
          </h2>
          <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
            귀여운 행성 뱃지를 수집하는 재미까지 더해졌어요.
          </p>
        </MotionWrapper>

        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.right}
          className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden"
        >
          <Image
            src="/landing/section-8.png"
            width={350}
            height={650}
            sizes="(max-width: 768px) 200px, 350px"
            className="w-50 md:w-87.5 h-auto shrink-0"
            alt="eighth-section-image"
          />
        </MotionWrapper>
      </div>
    </Section>
  );
};
