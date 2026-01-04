import { useMemo } from 'react';
import { AdviceChat, AdviceChatMessage } from '@/model/advice/types';

type BackgroundType = 'default' | 'writing' | 'sleeping';

export type DisplayMessage = AdviceChatMessage & {
  isSystemMessage?: boolean;
  isLoading?: boolean;
};

export function useAdviceChatMessages(adviceChat: AdviceChat | null, isSendingRequest: boolean) {
  // 배경 타입 계산
  const backgroundType: BackgroundType = useMemo(() => {
    if (!adviceChat) return 'default';
    if (isSendingRequest) return 'writing';
    if (adviceChat.remainingCount === 0) return 'sleeping';
    return 'default';
  }, [adviceChat, isSendingRequest]);

  // 표시할 메시지 리스트 계산
  const displayMessages: DisplayMessage[] = useMemo(() => {
    if (!adviceChat) return [];

    const messages: DisplayMessage[] = [...adviceChat.conversations];

    // remainingCount가 0이면 종료 메시지 추가
    if (adviceChat.remainingCount === 0 && !isSendingRequest) {
      messages.push({
        userMessage: '',
        grorongResponse: '오늘의 고민 상담은 끝이야!\n내일 아침에 다시 만나!\n\n1일 3개 입력만 가능',
        timestamp: new Date().toISOString(),
        isSystemMessage: true,
      });
    }

    // 요청 중이면 로딩 메시지 추가
    if (isSendingRequest) {
      messages.push({
        userMessage: '',
        grorongResponse: '',
        timestamp: new Date().toISOString(),
        isLoading: true,
      });
    }

    return messages;
  }, [adviceChat, isSendingRequest]);

  // 온보딩 상태 체크
  const shouldShowOnboarding = useMemo(() => {
    if (!adviceChat) return false;
    return !adviceChat.isGoalOnboardingCompleted && adviceChat.conversations.length === 0;
  }, [adviceChat]);

  return {
    displayMessages,
    backgroundType,
    shouldShowOnboarding,
  };
}
