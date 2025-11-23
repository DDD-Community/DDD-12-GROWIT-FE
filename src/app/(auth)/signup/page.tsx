import { TopAppBar } from '@/shared/components/layout/TopAppBar';
import { SignUpForm } from '@/composite/signup/signUpForm';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      {/* 고정 헤더 */}
      <TopAppBar title="회원가입" />

      {/* 스크롤 가능한 폼 섹션 */}
      <div className="flex-1 overflow-y-auto px-10 md:px-[20px] pb-10 md:pb-[20px]">
        <div className="flex flex-col justify-center max-w-md mx-auto w-full min-h-full py-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
