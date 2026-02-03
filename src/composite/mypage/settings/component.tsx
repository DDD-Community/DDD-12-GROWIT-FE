'use client';

import { RightArrowIcon } from '@/shared/components/foundation/Icons';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { tokenController } from '@/shared/lib/token';
import { useRouter } from 'next/navigation';
import { useCallback, useState, Suspense, lazy } from 'react';

const WithdrawModal = lazy(() => import('@/feature/mypage/WithdrawModal'));

export function SettingsContent() {
  const router = useRouter();
  const { trackButtonClick } = useGTMActions();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    trackButtonClick({
      eventName: GTM_EVENTS.MYPAGE_CLICK,
      buttonName: GTM_BUTTON_NAME.LOGOUT,
    });
    tokenController.clearTokens();
    router.push('/login');
  }, [router, trackButtonClick]);

  const handleOpenWithdrawModal = useCallback(() => {
    trackButtonClick({
      eventName: GTM_EVENTS.MYPAGE_CLICK,
      buttonName: GTM_BUTTON_NAME.PROFILE_DELETE,
    });
    setIsModalOpen(true);
  }, [trackButtonClick]);

  return (
    <ul className="py-4 px-6 space-y-3">
      <SettingsItem leftContent="가입 정보" rightContent="1209lks@naver.com" />
      <SettingsItem leftContent="문의하기" rightContent="starofleee@gmail.com" />
      <SettingsItem leftContent="로그아웃" onClick={handleLogout} rightContent={<RightArrowIcon />} />
      <SettingsItem leftContent="회원탈퇴" onClick={handleOpenWithdrawModal} rightContent={<RightArrowIcon />} />

      {/** 회원탈퇴 모달 */}
      <Suspense fallback={null}>
        <WithdrawModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </ul>
  );
}

type SettingsItemProps = {
  leftContent: string;
  rightContent?: string | React.ReactNode;
  onClick?: () => void;
};

function SettingsItem({ leftContent, rightContent, onClick }: SettingsItemProps) {
  return (
    <li
      className={`flex items-center w-full justify-between py-2 text-text-primary body-1-medium ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span>{leftContent}</span>
      <span>{rightContent}</span>
    </li>
  );
}
