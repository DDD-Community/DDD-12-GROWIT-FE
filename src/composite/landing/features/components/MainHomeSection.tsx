'use client';

import Image from 'next/image';
import Section from '@/shared/components/layout/Section';

const MainHomeSection = () => {
  return (
    <Section className="block relative px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Mobile Mockup */}
          <div className="relative flex justify-center items-center sm:h-[600px] max-sm:h-[400px] order-2 lg:order-1">
            <div className="absolute left-0">
              <Image src="/landing/landing-feature-2.png" alt="Main Home Mobile App" width={500} height={600} />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#01FF00]">메인 홈</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                선택과 집중으로
                <br />
                목표 달성
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-bold text-[#DCDCDC]">한 가지 목표에 집중해보세요!</p>
              <p className="text-lg text-white/65 leading-relaxed">
                작은 성취가 쌓일수록
                <br />
                목표에 한 걸음씩 다가갑니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { MainHomeSection };
