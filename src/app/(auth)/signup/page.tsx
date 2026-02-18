import { PageHeader } from '@/shared/components/layout/PageHeader';
import { SignUpForm } from '@/composite/signup/signUpForm';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      {/* 고정 헤더 */}
      <PageHeader title="회원가입" />

      {/* 스크롤 가능한 폼 섹션 */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="flex flex-col justify-center max-w-md mx-auto w-full min-h-full py-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
