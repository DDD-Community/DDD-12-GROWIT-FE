'use client';

import { AdviceHeader } from '@/feature/advice/components/AdviceHeader';
import { AdviceChatHistory } from '@/feature/advice/components/AdviceChatHistory';
import { AdviceArrivalPopupWrapper } from '@/feature/advice/hooks/useSubscribeAdviceArrival';
import { AdviceSubmitForm } from '@/feature/advice/components/AdviceSubmitFormElements';
import { GoalProvider, useGoalSelector } from '@/model/goal/context';
import { AdviceChatMessage } from '@/feature/advice/components/AdviceChatMessage';
import { Suspense } from 'react';
import AdviceChatLoader from '@/app/(home)/advice/loading';
import { RequestAdviceProvider } from '@/feature/advice/components/RequestAdviceContext';
import { useUser } from '@/shared/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AdviceChatClient() {
  const { userInfo } = useUser(); // 사용자 입력 정보 상태에 따라 사주 정보 기입 폼으로 이동 여부 결정
  const router = useRouter();

  useEffect(() => {
    if (userInfo && !userInfo.saju) {
      router.replace('/advice/signup');
    }
  }, [userInfo, router]);

  if (!userInfo || !userInfo.saju) return null;

  return (
    <Suspense fallback={<AdviceChatLoader />}>
      <GoalProvider>
        <AdviceArrivalPopupWrapper>
          <RequestAdviceProvider>
            <AdviceChatSection />
          </RequestAdviceProvider>
        </AdviceArrivalPopupWrapper>
      </GoalProvider>
    </Suspense>
  );
}

function AdviceChatSection() {
  const { progressGoals = [] } = useGoalSelector();

  if (!progressGoals.length) {
    return <HasNoProgressGoalPage />;
  }

  return (
    <div className="flex flex-col flex-1 bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center">
      <AdviceHeader />
      {/** 채팅 히스토리 내역 섹션 */}
      <main className="flex flex-1 flex-col relative text-sm tracking-wide">
        <AdviceChatHistory />
      </main>
      <AdviceSubmitForm.Root goalId={progressGoals[0]?.id}>
        <section className="w-full flex justify-between items-center pt-5">
          <AdviceSubmitForm.StyleSelectTrigger />
          <AdviceSubmitForm.CountBadge />
        </section>
        <section className="pb-5 w-full flex items-center gap-x-2">
          <div className="flex-1">
            <AdviceSubmitForm.Input />
          </div>
          <AdviceSubmitForm.Button />
        </section>
      </AdviceSubmitForm.Root>
    </div>
  );
}

const HasNoProgressGoalPage = () => {
  return (
    <div className="bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center min-h-[calc(100vh-56px)] pt-10">
      <main className="flex flex-col h-[calc(100vh-142px)] justify-between relative">
        <AdviceChatMessage.NoGoal />
      </main>
    </div>
  );
};

export default AdviceChatClient;
