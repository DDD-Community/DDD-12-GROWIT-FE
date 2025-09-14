'use client';

import Section from '@/shared/components/layout/Section';

export const SolutionSection = () => {
  return (
    <Section className="relative px-4 bg-gradient-to-b from-[#000000] via-[#0C242E] to-[#0B152B] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01151B] via-[#141538] to-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#0B152B]/30 to-[#000000]" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#00C31A] to-[#002375] rounded-full opacity-30 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-[#FF6DFD] to-[#2F003A] rounded-full opacity-30 blur-[132px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-2">
          <div className="inline-block px-4 py-1 bg-[#35D942]/10 border border-[#35D942]/30 rounded-full mb-6">
            <span className="text-[#35D942] text-sm font-medium">핵심 문제</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            진짜 문제는 바로
            <br />
            <span className="text-[#35D942]">"시간 단위"</span>에 있어요
          </h2>
        </div>

        {/* Main Content with Brain Icon */}
        <div className="relative flex flex-col items-center mb-20">
          {/* Vertical Divider Line - Figma Design */}
          <div className="h-20 w-2 flex justify-center z-20">
            <div className="relative w-0.5 h-full">
              {/* Base dashed line */}
              <div className="absolute inset-0 border-l-2 border-dashed border-[#01FF00]" />
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: 'linear-gradient(0, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                  maskImage: 'linear-gradient(0, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                  WebkitMaskImage: 'linear-gradient(0, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                }}
              />
              <div className="absolute bottom-[-7px] right-[calc(50%-6px)] w-[12px] h-[12px] bg-[#01FF00] rounded-full" />
            </div>
          </div>

          {/* Content Box with Glass Effect */}
          <div className="max-w-5xl w-full bg-gradient-to-br from-[#72B6FF]/10 to-transparent backdrop-blur-sm rounded-3xl border border-[#72B6FF]/20 p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
            <div className="flex justify-center mb-8 relative z-10">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 w-36 h-36 bg-gradient-to-br from-[#AAAAA3] to-transparent rounded-full blur-[34px] opacity-60" />
                {/* Main circle */}
                <div className="w-36 h-36 bg-gradient-to-br from-[#AAAAA3] to-transparent rounded-full flex items-center justify-center relative border border-white/10">
                  <span className="text-6xl z-10">🧠</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed">
                인간의 뇌는 긴장감을 부여할 수록
                <br />
                몰입이 높아집니다.
              </h3>
              <p className="text-[#C2C4C8]/88 text-sm sm:text-base leading-relaxed px-4 sm:px-0">
                인간은 벼락치기를 할 때 <span className="text-[#35D942] font-semibold">'최대 8배 이상의 집중력'</span>을
                발휘하고,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                보험사는 12월 한 달에 연간 매출의 절반의 실적을 달성합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
