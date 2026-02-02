'use client';

import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import Link from 'next/link';

export function NavEditProfileButton() {
  const { trackButtonClick } = useGTMActions();

  return (
    <Link
      href="/mypage/edit-profile"
      className="border border-border-primary p-1 px-2.5 text-sm text-text-primary rounded-2xl"
      onClick={() =>
        trackButtonClick({
          eventName: GTM_EVENTS.MYPAGE_CLICK,
          buttonName: GTM_BUTTON_NAME.PROFILE_EDIT,
        })
      }
    >
      프로필 수정
    </Link>
  );
}
