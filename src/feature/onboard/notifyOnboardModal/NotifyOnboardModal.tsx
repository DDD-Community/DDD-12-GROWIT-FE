import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@/shared/components/feedBack/Modal';
import Button from '@/shared/components/input/Button';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useOnboardStatus } from './hooks';
import Image from 'next/image';
import { useFetchUserName } from '@/shared/hooks';
import { ROUTES } from '@/shared/constants/routes';

export const NotifyOnboardModal = () => {
  const router = useRouter();
  const { fullUserName } = useFetchUserName();
  const { hasOnboarded, updateOnboardStatus } = useOnboardStatus();

  const handleOnboardingClick = async () => {
    await updateOnboardStatus();
    router.push(ROUTES.ONBOARDING);
  };

  if (hasOnboarded) {
    return null;
  }

  return (
    <Modal
      open={hasOnboarded === false}
      onClose={() => {}}
      renderContent={() => (
        <FlexBox direction="col" className="gap-6 text-center sm:w-[432px] max-sm:w-[287px]">
          <Image src="/image/grorong-welcome-m.png" alt="onboard" width={120} height={120} />
          <FlexBox direction="col" className="gap-3">
            <p className="text-white text-[16px] whitespace-pre-line">
              {`${fullUserName}, 반가워 👋\n나는 네 목표 여정을 함께할 그로롱이야.\n이제 우리만의 특별한 목표를 시작해볼까?`}
            </p>
          </FlexBox>
        </FlexBox>
      )}
      renderFooter={() => (
        <FlexBox className="gap-2 w-full">
          <Button
            variant="primary"
            size="lg"
            text="온보딩 시작하기"
            onClick={handleOnboardingClick}
            className="flex-1"
          />
        </FlexBox>
      )}
    />
  );
};
