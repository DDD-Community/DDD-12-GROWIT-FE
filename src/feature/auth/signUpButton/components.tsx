'use client';

import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import Link from 'next/link';

export const SignUpButton = () => {
  const { trackButtonClick } = useGTMActions();

  const handleClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.LOGIN_CLICK,
      buttonName: GTM_BUTTON_NAME.SIGN_UP,
    });
  };

  return (
    <Link href="/signup" className="text-white font-medium underline" onClick={handleClick}>
      회원가입 바로가기
    </Link>
  );
};
