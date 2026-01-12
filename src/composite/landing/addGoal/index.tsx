import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const AddGoalFeatureSection = () => {
  return (
    <Section className="w-full bg-bg-default">
      <div
        className={`flex flex-col md:flex-row items-center justify-center md:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.left}
          className="flex flex-col items-start gap-y-8 mb-12 md:mb-0 w-full"
        >
          <p className="font-bold text-brand-neon text-xl lg:text-2xl">목표 추가</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-tertiary leading-[140%]">
            목표 세우기가 <br />
            어려우신가요? <br />
            <span className="text-text-strong">2번만 클릭하세요</span>
          </h2>
          <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
            목표명과 종료일만 설정하면 30초 안에 목표 설정 끝 !
          </p>
        </MotionWrapper>

        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.right}
          className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden"
        >
          <Image
            src="/landing/section-5.png"
            width={350}
            height={650}
            sizes="(max-width: 768px) 200px, 350px"
            className="w-50 md:w-87.5 h-auto shrink-0"
            alt="fifth-section-image"
          />
        </MotionWrapper>
      </div>
    </Section>
  );
};
