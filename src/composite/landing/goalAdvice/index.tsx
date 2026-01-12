import Section from '@/shared/components/layout/Section';
import Image from 'next/image';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const GoalAdviceFeatureSection = () => {
  return (
    <Section className="w-full bg-bg-default">
      <div
        className={`flex flex-col md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.left}
          className="flex flex-col items-center md:items-start gap-y-6 mb-12 md:mb-0 w-full"
        >
          <p className="font-bold text-brand-neon text-xl lg:text-2xl">목표 조언</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-tertiary leading-[140%]">
            목표에 대한 <br />
            고민이 있나요? <br />
            <span className="text-text-strong">맞춤 AI 조언을 받아요</span>
          </h2>
          <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
            나의 상황과 감정에 알맞게 맞춤 조언을 해줘요
          </p>
        </MotionWrapper>

        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.right}
          className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden"
        >
          <Image
            src="/landing/section-7.png"
            width={350}
            height={650}
            sizes="(max-width: 768px) 200px, 350px"
            className="w-50 md:w-87.5 h-auto shrink-0"
            alt="seventh-section-image"
          />
        </MotionWrapper>
      </div>
    </Section>
  );
};
