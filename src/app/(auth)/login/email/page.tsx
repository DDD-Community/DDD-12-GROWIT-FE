'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/composite/login/loginForm';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { appBridge } from '@/shared/lib/appBridge';

export default function EmailLoginPage() {
  const router = useRouter();

  const handleBack = () => {
    if (appBridge.isInApp()) {
      appBridge.sendToApp('NAVIGATE_TO_NATIVE_LOGIN');
    } else {
      router.back();
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <PageHeader title="이메일로 로그인" onBackClick={handleBack} />
      <div className="pt-10 px-5">
        <LoginForm />
      </div>
    </div>
  );
}
