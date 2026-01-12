import Section from '@/shared/components/layout/Section';
import { StoryVideo } from './StoryVideo';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const StoryVideoSection = () => {
  return (
    <Section className="w-full bg-transparent bg-linear-to-space">
      <div
        className={`flex flex-col gap-y-20 items-center justify-center ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <MotionWrapper {...LandingPageCommonStyle.fadeIn.up} className="text-center space-y-6 mb-12 md:mb-0 w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-text-strong leading-[140%]">
            목표에 몰입할 수 밖에 없는 <br />
            GROWIT의 세계관
          </h2>
          <p className="text-base font-normal md:text-lg lg:text-xl text-text-tertiary">
            그로롱과 함께 특별한 목표 여정을 떠나보세요
          </p>
        </MotionWrapper>

        <StoryVideo />
      </div>
    </Section>
  );
};
