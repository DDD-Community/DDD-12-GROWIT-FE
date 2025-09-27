import Link from 'next/link';
import Image from 'next/image';
import { SignUpForm } from '@/composite/signup/signUpForm';

export default function SignupPage() {
  return (
    <div className="flex flex-1 bg-[#1C1C1E] overflow-hidden">
      {/* 왼쪽 회원가입 섹션 */}
      <div className="flex flex-col w-full lg:w-1/2 h-full">
        {/* 고정 헤더 */}
        <div className="flex flex-col items-start gap-[40px] p-10 md:p-[20px] pb-0">
          <h1 className="text-2xl font-bold text-white pl-[4px]">GROWIT</h1>
          <Link href="/login" className="text-white">
            <span className="inline-flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              뒤로
            </span>
          </Link>
        </div>

        {/* 스크롤 가능한 폼 섹션 */}
        <div className="flex-1 overflow-y-auto px-10 md:px-[20px] pb-10 md:pb-[20px]">
          <div className="flex flex-col justify-center max-w-md mx-auto w-full min-h-full py-8">
            <SignUpForm />
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
