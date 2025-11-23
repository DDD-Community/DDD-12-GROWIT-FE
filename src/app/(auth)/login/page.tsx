import Image from 'next/image';
import { KakaoLoginButton } from './KakaoLoginButton';
import { SignUpButton } from '@/feature/auth';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-24 w-full px-4 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image src="/logo-text.svg" alt="Growit" height={24} width={120} />
        <p className="text-text-primary text-center">
          <span className="font-bold">목표</span>는 쉽게, <span className="font-bold">성장</span>은 확실하게
          <br />
          GROWIT과 함께 <span className="font-bold">매일 성장하세요.</span>
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-4 text-center text-sm text-text-primary">
        <KakaoLoginButton />
        <Link
          href="/login/email"
          className="w-full text-center py-2.5 px-[18px] text-inverse shadow-xs bg-fill-inverse rounded-lg text-base text-text-inverse font-bold hover:opacity-80"
        >
          이메일로 로그인
        </Link>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span>계정이 없으신가요? </span>
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}
