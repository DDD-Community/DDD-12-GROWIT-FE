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
import { AdviceSendButton } from '@/feature/advice/components/AdviceSendButton';
import { InputField } from '@/shared/components/input/InputField';
import { AdviceStyleSelectSheet } from '@/feature/advice/components/AdviceStyleSelectSheet';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { useToast } from '@/shared/components/feedBack/toast';
import { ADVICE_STYLE_SELECT_ITEMS } from './constants';
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
  const [userMessage, setUserMessage] = useState('');

  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  const { mutateAsync: requestAdvice, isPending: isSendingRequest } = useMutation(
    AdviceMutation.requestAdvice({
      onSuccess: () => {
        setUserMessage('');
        queryClient.invalidateQueries({ queryKey: AdviceQueryKeys.chat() });
      },
      onError: () => {
        showToast('조언 요청에 실패했습니다.', 'error');
      },
    })
  );

  const handleRequestAdvice = () => {
    if (!selectedGoal) return;
    const adviceChatRequest = {
      week: 1,
      goalId: selectedGoal.id,
      userMessage: userMessage,
      adviceStyle: selectedAdviceStyle,
    };
    requestAdvice(adviceChatRequest);
  };

  return (
    <>
      <AdviceHeader progressGoals={progressGoals} selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />
      <main className="flex flex-col h-[calc(100vh-142px)] justify-between relative text-sm tracking-wide">
        <AdviceChatHistory adviceChat={adviceChat} isSendingRequest={isSendingRequest} />

        <div
          className={`bg-elevated-normal flex flex-col gap-y-2 rounded-t-2xl px-5 w-full sticky bottom-0 ${Z_INDEX.SHEET}`}
        >
          <nav className="w-full flex justify-between items-center pt-5">
            <button onClick={showSheet} className="flex items-center gap-x-2 body-1-normal text-text-strong">
              {ADVICE_STYLE_SELECT_ITEMS[selectedAdviceStyle].title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <AdviceCountBadge adviceCount={adviceChat.remainingCount} />
          </nav>
          <section className="pb-5 w-full flex items-center gap-x-2">
            <div className="flex-1">
              <InputField
                version="underline"
                name="advice-message"
                value={userMessage}
                onChange={e => setUserMessage(e.target.value)}
                placeholder="지금 목표에서 뭐부터 하면 좋을까?"
              />
            </div>
            <AdviceSendButton
              type="button"
              onKeyDown={e => e.key === 'Enter' && handleRequestAdvice()}
              onClick={handleRequestAdvice}
              disabled={userMessage.length === 0 || adviceChat.remainingCount === 0 || !adviceChat}
            />
          </section>

          <AdviceStyleSelectSheet
            isOpen={isOpen}
            showSheet={showSheet}
            closeSheet={closeSheet}
            selectedAdviceStyle={selectedAdviceStyle}
            setSelectedAdviceStyle={setSelectedAdviceStyle}
          />
        </div>
      </main>
    </>
  );
}
