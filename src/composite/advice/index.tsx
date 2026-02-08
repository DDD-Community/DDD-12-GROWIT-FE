'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdviceMutation, AdviceQuery } from '@/model/advice/queries';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { AdviceChat } from '@/model/advice/types';
import { AdviceHeader } from '@/feature/advice/components/AdviceHeader';
import { AdviceCountBadge } from '@/feature/advice/components/AdviceCountBadge';
import { AdviceChatHistory } from '@/feature/advice/components/AdviceChatHistory';
import { AdviceArrivalPopupWrapper } from '@/feature/advice/hooks/useSubscribeAdviceArrival';
import { AdviceSubmitForm } from '@/feature/advice/components/AdviceSubmitFormElements';
import { useToast } from '@/shared/components/feedBack/toast';
import { AdviceQueryKeys } from '@/model/advice/queryKeys';
import { AdviceFormContext, AdviceStyleSelectContext } from '@/feature/advice/components/AdviceFormContext';
import { useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import AdvicePageLoader from '@/app/(home)/advice/loading';
import { GoalProvider, useGoalSelector } from '@/model/goal/context';
import { AdviceChatMessage } from '@/feature/advice/components/AdviceChatMessage';

export default function AdviceChatClient() {
  const msUntilEndOfDay = getMsUntilEndOfDay();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();

  const { data: adviceChat, isLoading: isLoadingChat } = useQuery(
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

  if (isLoadingChat) return <AdvicePageLoader />;
  if (!adviceChat) throw new Error('Advice chat data is undefined');

  return (
    <GoalProvider>
      <AdviceArrivalPopupWrapper adviceChat={adviceChat}>
        {/** 조언 폼 제출에 필요한 상태 관리, 남은 횟수, isPending */}
        <AdviceFormContext.Provider
          value={{
            remainingCount: adviceChat.remainingCount || 0,
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
            <AdviceChatSection adviceChat={adviceChat} />
          </AdviceStyleSelectContext.Provider>
        </AdviceFormContext.Provider>
      </AdviceArrivalPopupWrapper>
    </GoalProvider>
  );
}

function AdviceChatSection({ adviceChat }: { adviceChat: AdviceChat }) {
  const { progressGoals = [] } = useGoalSelector();

  if (!progressGoals || progressGoals.length === 0) {
    return <HasNoProgressGoalPage />;
  }

  return (
    <div className="flex flex-col flex-1 bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center">
      <AdviceHeader />
      {/** 채팅 히스토리 내역 섹션 */}
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

const HasNoProgressGoalPage = () => {
  return (
    <div className="bg-[url('/advice/advice-chat-bg.png')] bg-cover bg-center min-h-[calc(100vh-56px)]">
      <header className="w-full flex justify-between items-center px-5 py-4 body-1-normal text-text-strong">
        <button className="gap-x-2 flex items-center py-2">
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
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          </svg>
          <span>목표 추가</span>

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
        <button>
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
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
          </svg>
        </button>
      </header>
      <main className="flex flex-col h-[calc(100vh-142px)] justify-between relative">
        <AdviceChatMessage.NoGoal />
      </main>
    </div>
  );
};
