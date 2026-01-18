import Section from '@/shared/components/layout/Section';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import LandingPageCommonStyle from '../constants';
import { EarlyBirdEvent } from './components/EarlyBirdEvent';

export const IntroSection = () => {
  return (
    <Section className="relative w-full flex items-center justify-center overflow-hidden">
      {/** 배경색 gradient */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video
          src="/landing/landing-opening.mp4"
          autoPlay
          muted
          loop
          preload="auto"
          className="w-full h-full object-cover"
        >
          <track kind="captions" />
        </video>
      </div>
      {/* 오버레이 (그라디언트) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.60)_100%)]" />
      <div className={`relative z-20 flex flex-col items-center ${LandingPageCommonStyle.innerContainer} ${LandingPageCommonStyle.padding}`}>
        <MotionWrapper {...LandingPageCommonStyle.fadeIn.default}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-center text-text-strong animate-fade-in bg-clip-text leading-tight mb-6">
            <span className="bg-linear-to-brand">그로잇</span>으로 너의 인생이 바뀔거야
          </h1>
        </MotionWrapper>
        <EarlyBirdEvent />
      </div>
    </Section>
  );
};
