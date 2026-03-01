'use client';

import { useEffect, useRef } from 'react';
import { MotionWrapper } from '@/shared/components/layout/MotionWrapper';
import { AdviceChatMessage } from './AdviceChatMessage';
import { useAdviceChatMessages } from '../hooks/useAdviceChatMessages';
import { useRequestAdvice } from './RequestAdviceContext';
import { useFetchAdviceChat } from '../hooks/useFetchAdviceChat';

export const AdviceChatHistory = () => {
  const { adviceChat } = useFetchAdviceChat();

  const { isSendingRequest } = useRequestAdvice();
  const { displayMessages, backgroundType, shouldShowOnboarding } = useAdviceChatMessages(adviceChat, isSendingRequest);

  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [displayMessages]);

  // Early return: NoGoal 케이스
  if (!adviceChat) {
    return <AdviceChatMessage.NoGoal />;
  }

  // Early return: 온보딩 케이스
  if (shouldShowOnboarding) {
    return <AdviceChatMessage.Onboarding backgroundType={backgroundType} />;
  }

  // 일반 채팅 히스토리 렌더링
  return (
    <>
      <section ref={scrollRef} className="px-5 pb-34.5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        {displayMessages.map((message, index) => {
          // 오늘 대화 횟수 소진 안내메시지
          if (message.isSystemMessage) {
            return (
              <EnterNewMessageMotionWrapper key={`system-${index}`}>
                <AdviceChatMessage.Limit />
              </EnterNewMessageMotionWrapper>
            );
          }

          if (message.userMessage === '아침 조언 요청') {
            return (
              <EnterNewMessageMotionWrapper key={`daily-advice-${index}`} className="flex flex-col gap-y-4">
                <AdviceChatMessage.DailyAdvice content={message.grorongResponse} timestamp={message.timestamp || ''} />
              </EnterNewMessageMotionWrapper>
            );
          }

          // 로딩 메시지
          if (message.isLoading !== undefined && message.isLoading) {
            return (
              <EnterNewMessageMotionWrapper key={`loading-${index}`}>
                <AdviceChatMessage.Loading />
              </EnterNewMessageMotionWrapper>
            );
          }

          // 일반 대화 메시지
          return (
            <EnterNewMessageMotionWrapper key={message.timestamp || `msg-${index}`} className="flex flex-col gap-y-4">
              {message.userMessage && <AdviceChatMessage direction="right" content={message.userMessage} />}
              {message.grorongResponse && <AdviceChatMessage direction="left" content={message.grorongResponse} />}
            </EnterNewMessageMotionWrapper>
          );
        })}
      </section>
    </>
  );
};

function EnterNewMessageMotionWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <MotionWrapper
      initial={{ scale: 0, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
}
