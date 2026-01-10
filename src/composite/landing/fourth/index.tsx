import Section from '@/shared/components/layout/Section';
import { StoryVideo } from './StoryVideo';

export const FourthSection = () => {
  return (
    <Section className="w-full flex flex-col gap-y-20 items-center justify-center p-5 md:p-28 bg-transparent bg-linear-to-space">
      <div className="text-center space-y-6 mb-12 md:mb-0 w-full animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-bold text-text-strong leading-[140%]">
          목표에 몰입할 수 밖에 없는 <br />
          GROWIT의 세계관
        </h2>
        <p className="text-base font-normal md:text-lg lg:text-xl text-text-tertiary">
          그로롱과 함께 특별한 목표 여정을 떠나보세요
        </p>
      </div>

      <StoryVideo />
    </Section>
  );
};
