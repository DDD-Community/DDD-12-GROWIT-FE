'use client';

import Image from 'next/image';

const GoalSettingSection = () => {
  return (
    <section tabIndex={0} className="relative py-24 px-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#01FF00]">목표 설정</h3>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                그로롱과 함께,
                <br />
                쉬운 목표 추가
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-xl font-bold text-[#DCDCDC]">처음부터 복잡할 필요 없어요!</p>
              <p className="text-lg text-white/65 leading-relaxed">
                간단한 온보딩 질문만 입력하면,
                <br />
                최종 목표를 AI가 자동 추천해 드립니다.
              </p>
            </div>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="relative flex justify-center items-center sm:h-[600px] max-sm:h-[400px]">
            <div className="absolute right-0">
              <Image src="/landing/landing-feature-1.png" alt="Goal Setting Mobile App" width={700} height={600} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GoalSettingSection };
