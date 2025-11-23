import { LoginForm } from '@/composite/login/loginForm';
import { TopAppBar } from '@/shared/components/layout/TopAppBar';

export default function EmailLoginPage() {
  return (
    <div className="max-w-md mx-auto w-full">
      <TopAppBar title="이메일로 로그인" />
      <div className="pt-10 px-5">
        <LoginForm />
      </div>
    </div>
  );
}
