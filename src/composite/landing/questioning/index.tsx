import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import LandingPageCommonStyle from '@/composite/landing/constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const QuestioningSection = () => {
  return (
    <Section
      className={`w-full flex flex-col md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} bg-white`}
    >
      <MotionWrapper
        {...LandingPageCommonStyle.fadeIn.left}
        className="flex flex-col items-start gap-y-6 mb-12 md:mb-0 w-full"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-text-inverse leading-[140%]">
          솔직히 목표 세우는 거 <br /> 너무 재미없지 않으세요?
        </h2>
        <p className="max-w-3xl text-base font-normal md:text-lg lg:text-xl text-text-secondary">
          혼자 진행하는 목표 환경은 동기부여가 되지 않고, <br /> 쉽게 포기하게 됩니다.
        </p>
      </MotionWrapper>

      <MotionWrapper {...LandingPageCommonStyle.fadeIn.right}>
        <Image
          src="/landing/section-2.png"
          width={391}
          height={440}
          className="hidden md:block shrink-0"
          alt="second-section-image"
        />
        <Image
          src="/landing/section-2.png"
          width={230}
          height={260}
          className="block md:hidden"
          alt="second-section-image"
        />
      </MotionWrapper>
    </Section>
  );
};
