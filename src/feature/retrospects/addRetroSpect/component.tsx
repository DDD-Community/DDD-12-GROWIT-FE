'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/input/Button';
import { ToolTip } from '@/shared/components/display/ToolTip';
import { GTM_BUTTON_NAME, GTM_EVENTS } from '@/shared/constants/gtm-events';
import { useGTMActions } from '@/shared/hooks/useGTM';
import { Goal } from '@/shared/type/goal';
import { useFetchRetrospects } from './hooks';

interface AddRetroSpectButtonProps {
  goal: Goal;
  selectedPlanId: string;
  currentWeekIndex: number;
}

export const AddRetroSpectButton = ({ goal, selectedPlanId, currentWeekIndex }: AddRetroSpectButtonProps) => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isInitLoad, setIsInitLoad] = useState(true);
  const { trackButtonClick } = useGTMActions();
  const { retrospect, isLoading: isLoadingRetrospects } = useFetchRetrospects(
    { goalId: goal.id, planId: selectedPlanId },
    {
      onError: err => {
        console.error('회고 목록 조회 실패:', err);
      },
    }
  );

  const handleNavigateToRetrospect = () => {
    trackButtonClick({
      eventName: GTM_EVENTS.HOME_TODO_CLICK,
      buttonName: GTM_BUTTON_NAME.REVIEW,
    });
    if (retrospect?.retrospect?.id) {
      // 기존 회고가 있는 경우 해당 회고 페이지로 이동
      router.push(`/retrospect/${retrospect.retrospect.id}?weekIndex=${currentWeekIndex}`);
    } else {
      // 회고가 없는 경우 새 회고 생성 페이지로 이동
      router.push(
        `/retrospect/new-retrospect?goalId=${goal.id}&planId=${selectedPlanId}&weekIndex=${currentWeekIndex}`
      );
    }
  };

  useEffect(() => {
    if (!isLoadingRetrospects && !isInitLoad) {
      const showTooltipKey = `hasShownTooltip-${goal.id}-${selectedPlanId}`;
      const hasShownTooltip = sessionStorage.getItem(showTooltipKey);
      if (!retrospect?.retrospect?.id && !hasShownTooltip) {
        sessionStorage.setItem(showTooltipKey, 'true');
        setShowTooltip(true);
      }
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    setIsInitLoad(false);
  }, [isLoadingRetrospects, retrospect]);

  return (
    <div className="relative min-w-[44px]">
      <Button
        variant="tertiary"
        text="주간 회고"
        size="sm"
        layout="icon-left"
        onClick={handleNavigateToRetrospect}
        icon={<ButtonIcon needCreate={!retrospect} />}
      />
      {showTooltip && (
        <>
          <ToolTip text="회고를 입력하세요" position="top-center" className="hidden sm:block" autoHide={true} />
          <ToolTip text="회고를 입력하세요" position="bottom-right" className="block sm:hidden" autoHide={true} />
        </>
      )}
      {!retrospect && (
        <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-[6px] bg-accent-fg-lime" />
      )}
    </div>
  );
};

interface ButtonIconProps {
  needCreate: boolean;
}

const ButtonIcon = ({ needCreate }: ButtonIconProps) => {
  if (needCreate) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.99935 4.16663V15.8333M4.16602 9.99996H15.8327"
          stroke="white"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return <Image src="/icon/check-green.svg" alt="check-creaeIcon" width={20} height={20} />;
};
