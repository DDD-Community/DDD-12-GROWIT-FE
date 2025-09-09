'use client';

import Button from '@/shared/components/input/Button';
import Image from 'next/image';

const TumblbugEventSection = () => {
  const handleTumblbugClick = () => {
    window.open('https://tumblbug.com/growit', '_blank');
  };

  return (
    <section className="relative py-20 px-4 sm:h-[722px] bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/landing/landing-tumblbug-1.png" alt="텀블벅 이벤트 배경" fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-7">
            {/* Text Content */}
            <div className="space-y-5">
              <Image src="/landing/landing-tumblbug-3.png" alt="텀블벅 이벤트 추가" width={100} height={100} />
              <h2 className="text-4xl font-bold text-white leading-tight">
                텀블벅으로
                <br />
                가장 빨리 만나보세요
              </h2>
              <p className="text-xl text-[#DCDCDC]">2025. 08. 26 ~ 2025. 09. 25</p>
            </div>

            {/* Button */}
            <div className="inline-flex">
              <Button
                size="xl"
                variant="brand"
                className="w-auto"
                text="텀블벅 바로가기"
                onClick={handleTumblbugClick}
              />
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end">
            <Image src="/landing/landing-tumblbug-2.png" alt="텀블벅 이벤트" width={570} height={370} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TumblbugEventSection;
