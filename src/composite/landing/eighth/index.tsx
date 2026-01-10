import Section from '@/shared/components/layout/Section';
import Image from 'next/image';

export const EighthSection = () => {
  return (
    <Section className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-between p-5 md:p-28 bg-bg-default">
      <div className="flex flex-col items-start gap-y-8 mb-12 md:mb-0 w-full animate-fade-in-left">
        <p className="font-bold text-brand-neon text-xl lg:text-2xl">행성 수집</p>
        <h2 className="text-3xl md:text-5xl font-bold text-text-strong leading-[140%]">
          목표 유형별로 다양한 <br />
          행성 뱃지를 모아보세요
        </h2>
        <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
          귀여운 행성 뱃지를 수집하는 재미까지 더해졌어요.
        </p>
      </div>

      <article className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden animate-fade-in-right">
        <Image
          src="/landing/section-8.png"
          width={350}
          height={650}
          className="hidden lg:block shrink-0"
          alt="eighth-section-image"
        />
        <Image
          src="/landing/section-8.png"
          width={200}
          height={417}
          className="block lg:hidden"
          alt="eighth-section-image"
        />
      </article>
    </Section>
  );
};
