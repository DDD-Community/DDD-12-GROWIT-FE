'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { AdviceMutation, AdviceQuery } from '@/model/advice/queries';
import { AdviceHeader } from '@/feature/advice/components/AdviceHeader';
import { GoalQuery } from '@/model/goal/queries';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { Goal } from '@/shared/type/goal';
import { AdviceChat } from '@/model/advice/types';
import { AdviceCountBadge } from '@/feature/advice/components/AdviceCountBadge';
import { AdviceChatHistory } from '@/feature/advice/components/AdviceChatHistory';
import { HasNoProgressGoalPage } from '@/app/(home)/advice/HasNoProgressGoalPage';
import { AdviceArrivalPopupProvider } from '@/feature/advice/hooks/useSubscribeAdviceArrival';
import { AdviceSubmitForm } from '@/feature/advice/components/AdviceSubmitFormElements';
import { useToast } from '@/shared/components/feedBack/toast';
import { AdviceQueryKeys } from '@/model/advice/queryKeys';

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

function AdviceChatClientContent({ progressGoals = [], adviceChat }: AdviceChatClientContentProps) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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

  return (
    <div className="flex flex-col flex-1 bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center">
      <AdviceHeader progressGoals={progressGoals} selectedGoal={progressGoals[0]} setSelectedGoal={() => {}} />
      <main className="flex flex-1 flex-col relative text-sm tracking-wide">
        <AdviceChatHistory adviceChat={adviceChat} isSendingRequest={isSendingRequest} />
      </main>
      <AdviceSubmitForm.Root
        goalId={progressGoals[0]?.id}
        requestAdvice={requestAdvice}
        isSendingRequest={isSendingRequest}
      >
        <AdviceSubmitForm.StyleSelectTrigger>
          <AdviceCountBadge adviceCount={adviceChat.remainingCount} />
        </AdviceSubmitForm.StyleSelectTrigger>
        <section className="pb-5 w-full flex items-center gap-x-2">
          <div className="flex-1">
            <AdviceSubmitForm.Input />
          </div>
          <AdviceSubmitForm.Button />
        </section>

        <AdviceSubmitForm.StyleSelectSheet />
      </AdviceSubmitForm.Root>
    </div>
  );
}
