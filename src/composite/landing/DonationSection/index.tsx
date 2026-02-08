import Section from '@/shared/components/layout/Section';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import { CopyAccountButton } from './CopyAccountButton';
import { CopyAccountContextProvider } from './CopyAccountContext';
import { DonationImage } from './DonationImage';

export default function DonationSection() {
  return (
    <Section className="w-full bg-gray-300">
      <div
        className={`flex flex-col md:flex-row items-center justify-center gap-16 md:gap-0 lg:justify-between ${LandingPageCommonStyle.padding} ${LandingPageCommonStyle.innerContainer}`}
      >
        <CopyAccountContextProvider>
          <MotionWrapper
            {...LandingPageCommonStyle.fadeIn.left}
            className="flex flex-col items-center md:items-start gap-y-6 mb-12 md:mb-0 w-full"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-inverse leading-[140%]">
              팀 그로잇을 <br />
              후원해주세요! <br />
            </h2>
            <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
              작은 후원금도 큰 힘이 됩니다 :) <br />더 좋은 서비스로 보답하겠습니다.
            </p>
            <span className="w-64 md:w-96">
              <CopyAccountButton />
            </span>
          </MotionWrapper>

          <MotionWrapper {...LandingPageCommonStyle.fadeIn.right}>
            <DonationImage />
          </MotionWrapper>
        </CopyAccountContextProvider>
      </div>
    </Section>
  );
}
