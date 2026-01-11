import Link from 'next/link';
import Image from 'next/image';
import Section from '@/shared/components/layout/Section';
import LandingPageCommonStyle from '../constants';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';

export const FundingDiscountSection = () => {
  return (
    <Section
      className={`w-full flex flex-col gap-y-5 md:flex-row items-center justify-center lg:justify-between ${LandingPageCommonStyle.padding} bg-white`}
    >
      <MotionWrapper
        {...LandingPageCommonStyle.fadeIn.left}
        className="flex flex-col items-center md:items-start gap-y-6 mb-12 md:mb-0 w-full"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-text-inverse leading-[140%]">
          와디즈로 <br />
          그로잇 구독료 <br />
          50% 할인받기
        </h2>
        <FundingNavButton />
      </MotionWrapper>

      {/* 우측 이미지 컨테이너 */}
      <MotionWrapper {...LandingPageCommonStyle.fadeIn.right} className="relative flex items-center justify-between">
        <DarkToolTip>귀여운 키링도 준다구요!</DarkToolTip>
        <Image
          src="/landing/key-rings.png"
          width={500}
          height={400}
          sizes="(max-width: 768px) 300px 200px"
          alt="character-key-ring-image"
        />
      </MotionWrapper>
    </Section>
  );
};

function FundingNavButton() {
  return (
    <Link
      href="#"
      className="bg-fill-brand-neon body-1-bold py-2.5 px-4.5 rounded-lg bg-brand-neon hover:bg-brand-neon/90 text-text-inverse flex items-center gap-x-2"
    >
      1월 중순 오픈 예정
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 6.83333H12.6667M12.6667 6.83333L6.83333 1M12.6667 6.83333L6.83333 12.6667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-text-inverse"
        />
      </svg>
    </Link>
  );
}

function DarkToolTip({ children }: { children: React.ReactNode }) {
  return (
    <div className={`absolute z-10 -top-10 left-1/2 transform -translate-x-1/2`}>
      <div className="relative py-2 px-3 bg-bg-default rounded-xl label-2-medium whitespace-nowrap text-white shadow-sm">
        {children}
        {/* 꼬리 */}
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-8 border-t-bg-default border-x-8 border-x-transparent w-0 h-0`}
        />
      </div>
    </div>
  );
}
