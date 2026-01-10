import Link from 'next/link';
import Section from '@/shared/components/layout/Section';

/*  video를 배경으로 깔고,  */
export const FirstSection = () => {
  return (
    <Section className="relative w-full flex items-center justify-center overflow-hidden px-5 md:px-0">
      {/** 배경색 gradient */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <video src="/landing/landing-opening.mp4" autoPlay muted loop className="w-full h-full object-cover">
          <track kind="captions" />
        </video>
      </div>
      {/* 오버레이 (그라디언트) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.60)_100%)]" />
      <div className="relative z-20 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-text-strong animate-fade-in bg-clip-text leading-tight mb-6">
          <span className="bg-linear-to-brand">그로잇</span>으로 너의 인생이 바꿜거야
        </h1>
        <Button />
      </div>
    </Section>
  );
};

const Button = () => {
  return (
    <Link
      className="text-text-strong text-base font-bold border border-[#393939] bg-white/15 hover:bg-white/30 transition-colors duration-300 rounded-lg py-2.5 px-4.5 flex items-center justify-center gap-1 hover:bg-[rgba(57, 57, 57, 1)]"
      href="#"
    >
      APP 얼리버드 신청
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 6.83333H12.6667M12.6667 6.83333L6.83333 1M12.6667 6.83333L6.83333 12.6667"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};
