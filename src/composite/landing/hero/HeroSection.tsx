'use client';

import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import { useRouter } from 'next/navigation';
import { EarlyBirdEvent } from './components/EarlyBirdEvent';

const HeroSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <Section className="relative flex items-center justify-center px-4 pt-8 max-sm:pt-24 pb-10 overflow-hidden">
      {/* Background with image overlay */}
      <div className="absolute inset-0">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F1011] to-[#0A0A0A]" />

        {/* Bottom accent gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#35D942]/20 via-[#6BE016]/10 to-transparent" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#35D942]/60 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#6BE016]/80 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#35D942]/40 rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-[#6BE016]/60 rounded-full animate-pulse delay-1000" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(53,217,66,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(53,217,66,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* main-content */}
      <div className="relative max-w-7xl mx-auto w-full z-20">
        {/* left-content */}
        <div className="flex flex-col items-start sm:gap-[60px] gap-[32px] relative z-30">
          <div className="flex-1 text-left">
            <h1 className="text-[22px] max-sm:text-[16px] mb-6 max-sm:mb-4 font-bold text-[#01FF00] leading-tight">
              아직도 작심삼일을 반복하고 있나요?
            </h1>
            <h2 className="text-[56px] max-sm:text-[36px] font-bold text-white leading-tight">
              4주면 인생이 바뀌는
              <br />
              AI 목표 관리 서비스
            </h2>
          </div>
          <EarlyBirdEvent />
        </div>

        {/* image-content */}
        <div className="sm:absolute sm:right-4 sm:bottom-[-120px] z-10 flex items-center justify-center">
          <div className="relative">
            <Image src="/landing/landing-hero-1.png" alt="GROWIT App Preview" width={700} height={700} priority />
          </div>
        </div>
      </div>
    </Section>
  );
};

export { HeroSection };
