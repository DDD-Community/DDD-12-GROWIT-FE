import Section from '@/shared/components/layout/Section';
import Image from 'next/image';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const ManageTodoFeatureSection = () => {
  return (
    <Section className="w-full bg-bg-default">
      <div
        className={`flex flex-col md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.left}
          className="flex flex-col items-start gap-y-8 mb-12 md:mb-0 w-full"
        >
          <p className="font-bold text-brand-neon text-xl lg:text-2xl">투두 관리</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-tertiary leading-[140%]">
            목표 관리에 <br />
            최적화된 <br />
            <span className="text-text-strong">편리한 투두를 경험하세요</span>
          </h2>
          <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
            목표는 체계적으로, 투두는 간편하게!
          </p>
        </MotionWrapper>

        <MotionWrapper
          {...LandingPageCommonStyle.fadeIn.right}
          className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden"
        >
          <Image
            src="/landing/section-6.png"
            width={350}
            height={650}
            sizes="(max-width: 768px) 200px, 350px"
            className="w-50 md:w-87.5 h-auto shrink-0"
            alt="sixth-section-image"
          />
        </MotionWrapper>
      </div>
    </Section>
  );
};
