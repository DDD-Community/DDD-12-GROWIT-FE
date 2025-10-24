'use client';

import { useRouter } from 'next/navigation';
import { tokenController } from '@/shared/lib/token';
import Button from '@/shared/components/input/Button';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    tokenController.clearTokens();
    router.push('/login');
  };

  return <Button size={'ml'} text={'로그아웃'} onClick={handleLogout} />;
};

export const LogoutDarkButton = () => {
  const router = useRouter();
  const { trackButtonClick } = useGTMActions();

  const handleLogout = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.MYPAGE_CLICK,
      buttonName: GTM_BUTTON_NAME.LOGOUT,
    });
    tokenController.clearTokens();
    router.push('/login');
  };

  return (
    <div className="max-w-40 px-5">
      <Button variant="secondary" size={'lg'} text={'로그아웃'} onClick={handleLogout} />
    </div>
  );
};
