'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { AdviceMutation, AdviceQuery } from '@/model/advice/queries';
import { GoalQuery } from '@/model/goal/queries';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { Goal } from '@/shared/type/goal';
import { AdviceChat } from '@/model/advice/types';
import { AdviceHeader } from '@/feature/advice/components/AdviceHeader';
import { AdviceCountBadge } from '@/feature/advice/components/AdviceCountBadge';
import { AdviceChatHistory } from '@/feature/advice/components/AdviceChatHistory';
import { HasNoProgressGoalPage } from '@/app/(home)/advice/HasNoProgressGoalPage';
import { AdviceArrivalPopupWrapper } from '@/feature/advice/hooks/useSubscribeAdviceArrival';
import { AdviceSubmitForm } from '@/feature/advice/components/AdviceSubmitFormElements';
import { useToast } from '@/shared/components/feedBack/toast';
import { AdviceQueryKeys } from '@/model/advice/queryKeys';
import { AdviceFormContext, AdviceStyleSelectContext } from '@/feature/advice/components/AdviceFormContext';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';

export default function AdviceChatClient() {
  const msUntilEndOfDay = getMsUntilEndOfDay();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();

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

  if (!progressGoals || !progressGoals.length) return <HasNoProgressGoalPage />;

  return (
    <AdviceArrivalPopupWrapper adviceChat={adviceChat}>
      {/** 조언 폼 제출에 필요한 상태 관리, 남은 횟수, isPending */}
      <AdviceFormContext.Provider
        value={{
          remainingCount: adviceChat?.remainingCount || 0,
          isSendingRequest: isSendingRequest,
          requestAdvice: requestAdvice,
        }}
      >
        {/** 조언 스타일 선택 시트 관련 상태 관리 */}
        <AdviceStyleSelectContext.Provider
          value={{
            isSheetOpen: isOpen,
            openSheet: showSheet,
            closeSheet: closeSheet,
          }}
        >
          <AdviceChatClientContent progressGoals={progressGoals} adviceChat={adviceChat} />
        </AdviceStyleSelectContext.Provider>
      </AdviceFormContext.Provider>
    </AdviceArrivalPopupWrapper>
  );
}

type AdviceChatClientContentProps = {
  progressGoals: Goal[];
  adviceChat: AdviceChat;
};

function AdviceChatClientContent({ progressGoals = [], adviceChat }: AdviceChatClientContentProps) {
  return (
    <div className="flex flex-col flex-1 bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center">
      <AdviceHeader />
      <main className="flex flex-1 flex-col relative text-sm tracking-wide">
        <AdviceChatHistory adviceChat={adviceChat} />
      </main>
      <AdviceSubmitForm.Root goalId={progressGoals[0]?.id}>
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
