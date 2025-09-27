import Link from 'next/link';
import Image from 'next/image';
import { LoginForm } from '@/composite/login/loginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-1 bg-[#1C1C1E]">
      {/* 왼쪽 로그인 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2 p-10 md:p-[20px]">
        <div className="mb-10 md:mb-20">
          <Image src="/logo-text.svg" alt="Growit" height={24} width={120} />
        </div>

        <div className="flex flex-col flex-grow justify-center max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-2 text-white">로그인</h2>
          <p className="text-gray-400 mb-8">
            목표는 쉽게, 성장은 확실하게
            <br />
            GROWIT과 함께 매일 성장하세요.
          </p>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-400">
            <span>계정이 없으신가요? </span>
            <Link href="/signup" className="text-white font-medium underline">
              회원가입 바로가기
            </Link>
          </div>
        </div>
      </div>

      {/* 오른쪽 이미지 섹션 - lg 크기 이상에서만 표시 */}
      <div className="hidden lg:flex w-1/2 m-4 p-4 items-center justify-center">
        <div className="relative w-full h-full rounded-[16px]">
          <Image src="/landing.png" alt="Dashboard Preview" fill priority className="object-contain" />
        </div>
      </div>
    </div>
  );
}
