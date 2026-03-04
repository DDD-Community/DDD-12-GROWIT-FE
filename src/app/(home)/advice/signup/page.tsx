import { AdviceSignupForm } from '@/composite/advice/signup';
import Image from 'next/image';

export default function AdviceSignupPage() {
  return (
    <div className="p-5 h-full flex flex-col overflow-y-auto gap-y-10">
      <header className="space-y-6 text-balance text-white">
        <Image src="/advice/letter.png" alt="편지 이미지" width={70} height={70} />
        <p className="heading-1-bold text-text-strong">
          나의 사주에 기반한 <br />
          운세 목표 조언을 받아보세요!
        </p>
        <span className="label-1-medium text-text-primary">정확한 운세 분석을 위해 생년월일시 정보가 필요해요.</span>
      </header>
      <AdviceSignupForm />
    </div>
  );
}
