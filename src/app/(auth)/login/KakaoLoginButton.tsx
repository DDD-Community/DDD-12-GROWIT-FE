'use client';

import Image from 'next/image';
import { kakaoLoginAction } from './actions';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';

export const KakaoLoginButton = () => {
  const { trackButtonClick } = useGTMActions();

  const handleClick = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.LOGIN_CLICK,
      buttonName: GTM_BUTTON_NAME.KAKAO_LOGIN,
    });
  };

  return (
    <form action={kakaoLoginAction}>
      <button
        type="submit"
        className="w-full flex items-center justify-center cursor-pointer gap-3 bg-[#FEE500] hover:bg-[#FDD835] disabled:bg-gray-300 disabled:cursor-not-allowed py-3 px-4 rounded-lg text-black font-medium"
        onClick={handleClick}
      >
        <Image src="/kakao.svg" alt="kakao" width={19} height={19} />
        카카오 로그인
      </button>
    </form>
  );
};
