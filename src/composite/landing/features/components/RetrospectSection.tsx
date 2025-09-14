'use client';

import Image from 'next/image';

const RetrospectSection = () => {
  return (
    <section tabIndex={0} className="relative py-24 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#01FF00]">회고</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                AI와 함께하는
                <br />
                주간&전체 회고
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-bold text-[#DCDCDC]">AI가 남긴 피드백으로, 더 깊은 회고를 완성하세요.</p>
              <p className="text-lg text-white/65 leading-relaxed">
                주차별 회고와 목표 종료 후 전체 회고까지,
                <br />
                끝난 목표에서도 성장은 계속됩니다.
              </p>
            </div>
          </div>

          {/* Right Content - AI Chat Interface */}
          <div className="relative flex justify-center items-center sm:h-[600px] max-sm:h-[400px]">
            <div className="absolute right-0">
              <Image src="/landing/landing-feature-3.png" alt="Main Home Mobile App" width={480} height={480} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { RetrospectSection };
