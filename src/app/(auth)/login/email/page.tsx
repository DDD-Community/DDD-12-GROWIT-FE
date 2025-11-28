import { LoginForm } from '@/composite/login/loginForm';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function EmailLoginPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      <PageHeader title="이메일로 로그인" />
      <div className="pt-10 px-5">
        <LoginForm />
      </div>
    </div>
  );
}
