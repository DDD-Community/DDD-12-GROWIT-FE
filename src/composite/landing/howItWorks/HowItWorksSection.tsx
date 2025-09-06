'use client';

import { useState } from 'react';
import Image from 'next/image';

const screenshots = [
  {
    id: 1,
    title: '목표 설정',
    description: '주간 목표를 설정하고 체계적으로 관리해요',
    image: '/images/app-screen-goal.png',
  },
  {
    id: 2,
    title: '일일 투두',
    description: '매일 해야 할 일을 명확하게 정리해요',
    image: '/images/app-screen-todo.png',
  },
  {
    id: 3,
    title: '회고 작성',
    description: 'AI가 도와주는 똑똑한 회고를 작성해요',
    image: '/images/app-screen-retrospect.png',
  },
];

const HowItWorksSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="py-20 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            쉽고 간단한
            <br />
            <span className="text-[#35D942]">3단계 성장 과정</span>
          </h2>
        </div>

        {/* Desktop: 3 phones side by side */}
        <div className="hidden lg:block">
          <div className="flex justify-center items-center gap-8">
            {screenshots.map((screen, index) => (
              <div
                key={screen.id}
                className={`relative transition-all duration-500 ${
                  index === activeIndex 
                    ? 'scale-110 z-10' 
                    : 'scale-90 opacity-60'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Phone mockup */}
                <div className="relative w-[280px]">
                  <div className="bg-[#1A1A1A] rounded-[3rem] p-2 border border-gray-800">
                    <div className="bg-black rounded-[2.5rem] p-1">
                      <div className="aspect-[9/19] bg-gray-900 rounded-[2.3rem] overflow-hidden">
                        <Image
                          src={screen.image}
                          alt={screen.title}
                          width={280}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description below phone */}
                <div className={`mt-6 text-center transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-[#35D942] rounded-full text-black font-bold mb-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{screen.title}</h3>
                  <p className="text-gray-400 text-sm">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {screenshots.map((screen, index) => (
              <div key={screen.id} className="bg-[#1A1A1A] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-[#35D942] rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{screen.title}</h3>
                    <p className="text-gray-400 mb-4">{screen.description}</p>
                    
                    {/* Phone mockup */}
                    <div className="relative w-full max-w-[200px] mx-auto">
                      <div className="bg-black rounded-[2rem] p-1 border border-gray-700">
                        <div className="aspect-[9/19] bg-gray-900 rounded-[1.8rem] overflow-hidden">
                          <Image
                            src={screen.image}
                            alt={screen.title}
                            width={200}
                            height={430}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-8">
            복잡한 기능 없이 핵심에만 집중했어요
          </p>
          <div className="inline-flex items-center gap-8">
            <div>
              <div className="text-[#35D942] text-2xl font-bold">5분</div>
              <div className="text-gray-500 text-sm">일일 평균 사용시간</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div>
              <div className="text-[#35D942] text-2xl font-bold">87%</div>
              <div className="text-gray-500 text-sm">목표 달성률</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div>
              <div className="text-[#35D942] text-2xl font-bold">30일</div>
              <div className="text-gray-500 text-sm">평균 연속 사용</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;