import Section from '@/shared/components/layout/Section';
import Image from 'next/image';

export const SeventhSection = () => {
  return (
    <Section className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-between p-5 md:p-28 bg-bg-default">
      <div className="flex flex-col items-start gap-y-8 mb-12 md:mb-0 w-full animate-fade-in-left">
        <p className="font-bold text-brand-neon text-xl lg:text-2xl">목표 조언</p>
        <h2 className="text-3xl md:text-5xl font-bold text-text-tertiary leading-[140%]">
          목표에 대한 <br />
          고민이 있나요? <br />
          <span className="text-text-strong">맞춤 AI 조언을 받아요</span>
        </h2>
        <p className="max-w-3xl text-base font-medium md:text-lg lg:text-xl text-text-secondary">
          나의 상황과 감정에 알맞게 맞춤 조언을 해줘요
        </p>
      </div>

      <article className="border-4 border-[rgba(26,26,26,0.7)] rounded-xl overflow-hidden animate-fade-in-right">
        <Image
          src="/landing/section-7.png"
          width={350}
          height={650}
          className="hidden lg:block shrink-0"
          alt="seventh-section-image"
        />
        <Image
          src="/landing/section-7.png"
          width={200}
          height={417}
          className="block lg:hidden"
          alt="seventh-section-image"
        />
      </article>
    </Section>
  );
};
