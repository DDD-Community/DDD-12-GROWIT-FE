'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { AdviceMutation, AdviceQuery } from '@/model/advice/queries';
import { AdviceHeader } from '@/feature/advice/components/AdviceHeader';
import { GoalQuery } from '@/model/goal/queries';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { useState } from 'react';
import { Goal } from '@/shared/type/goal';
import { AdviceChat, AdviceStyle } from '@/model/advice/types';
import { AdviceCountBadge } from '@/feature/advice/components/AdviceCountBadge';
import { AdviceInputSection } from '@/feature/advice/components/AdviceInputSection';
import { AdviceStyleSheetTrigger } from '@/feature/advice/components/AdviceStyleSheetTrigger';
import { AdviceStyleSelectSheet } from '@/feature/advice/components/AdviceStyleSelectSheet';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { useToast } from '@/shared/components/feedBack/toast';
import { AdviceQueryKeys } from '@/model/advice/queryKeys';
import { AdviceChatHistory } from '@/feature/advice/components/AdviceChatHistory';
import { HasNoProgressGoalPage } from '@/app/(home)/advice/HasNoProgressGoalPage';
import { AdviceArrivalPopupProvider } from '@/feature/advice/hooks/useSubscribeAdviceArrival';
import { Z_INDEX } from '@/shared/lib/z-index';

export default function AdviceChatClient() {
  const msUntilEndOfDay = getMsUntilEndOfDay();
  const { data: progressGoals = [] } = useSuspenseQuery(
    GoalQuery.getProgressGoals({
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );
  const { data: adviceChat } = useSuspenseQuery(
    AdviceQuery.getAdviceChat({
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );

  if (!progressGoals || !progressGoals.length) return <HasNoProgressGoalPage />;

  return (
    <AdviceArrivalPopupProvider adviceChat={adviceChat}>
      <AdviceChatClientContent progressGoals={progressGoals} adviceChat={adviceChat} />
    </AdviceArrivalPopupProvider>
  );
}

type AdviceChatClientContentProps = {
  progressGoals: Goal[];
  adviceChat: AdviceChat;
};

function AdviceChatClientContent({ progressGoals, adviceChat }: AdviceChatClientContentProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(progressGoals[0] ?? null);
  const [selectedAdviceStyle, setSelectedAdviceStyle] = useState<AdviceStyle>('BASIC');

  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  const { mutateAsync: requestAdvice, isPending: isSendingRequest } = useMutation(
    AdviceMutation.requestAdvice({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: AdviceQueryKeys.chat() });
      },
      onError: () => {
        showToast('조언 요청에 실패했습니다.', 'error');
      },
    })
  );

  const handleRequestAdvice = (userMessage: string) => {
    if (!selectedGoal) return;
    const adviceChatRequest = {
      week: 1,
      userMessage,
      goalId: selectedGoal.id,
      adviceStyle: selectedAdviceStyle,
    };
    requestAdvice(adviceChatRequest);
  };

  return (
    <div className="flex flex-col flex-1 bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center">
      <AdviceHeader progressGoals={progressGoals} selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />
      <main className="flex flex-1 flex-col relative text-sm tracking-wide">
        <AdviceChatHistory adviceChat={adviceChat} isSendingRequest={isSendingRequest} />
      </main>
      <div
        className={`bg-elevated-normal flex flex-col gap-y-2 rounded-t-2xl px-5 w-full sticky bottom-0 ${Z_INDEX.SHEET}`}
      >
        <nav className="w-full flex justify-between items-center pt-5">
          <AdviceStyleSheetTrigger selectedAdviceStyle={selectedAdviceStyle} onClick={showSheet} />
          <AdviceCountBadge adviceCount={adviceChat.remainingCount} />
        </nav>
        <AdviceInputSection
          remainingCount={adviceChat.remainingCount}
          isSendingRequest={isSendingRequest}
          onSubmit={handleRequestAdvice}
        />

        <AdviceStyleSelectSheet
          isOpen={isOpen}
          showSheet={showSheet}
          closeSheet={closeSheet}
          selectedAdviceStyle={selectedAdviceStyle}
          setSelectedAdviceStyle={setSelectedAdviceStyle}
        />
      </div>
    </div>
  );
}
