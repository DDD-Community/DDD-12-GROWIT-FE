'use client';

import Image from 'next/image';

const GoalManagementSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-black/50 to-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Planet Badge System */}
          <div className="relative flex justify-center items-center sm:h-[600px] max-sm:h-[400px] order-2 lg:order-1">
            <div className="absolute left-0">
              <Image src="/landing/landing-feature-4.png" alt="Main Home Mobile App" width={500} height={600} />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#01FF00]">목표 관리</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                목표 달성의 보상,
                <br />
                행성 뱃지
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-bold text-[#DCDCDC]">목표 유형별로 다양한 행성 뱃지를 모아보세요.</p>
              <p className="text-lg text-white/65 leading-relaxed">
                투두 완료율이 높을수록 행성이 점점 선명해지고,
                <br />
                수집의 즐거움이 목표 달성 동기를 높여줍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GoalManagementSection };
