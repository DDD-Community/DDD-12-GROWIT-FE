'use client';

import Image from 'next/image';

const ProblemSection = () => {
  return (
    <section
      tabIndex={0}
      className="relative sm:py-18 pt-16 px-4 bg-gradient-to-b from-[#0A0B0D] via-[#0F1011] to-[#000000] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              매번 <span className="text-[#35D942]">"작심삼일"</span>로<br />
              끝나는 목표,
              <br />왜 나는 매번 그대로일까...?
            </h2>
            <p className="text-gray-400 text-lg">
              다이어트 계획, 공부 계획, 자격증 준비..
              <br />
              마음을 다잡지만 결국 흐지부지
            </p>
          </div>

          <div className="relative h-[400px] sm:h-[480px]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#35D942]/10 to-[#6BE016]/5 rounded-full blur-xl" />
            <Image
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src="/landing/landing-problem-1.png"
              alt="Problem Section"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProblemSection };
