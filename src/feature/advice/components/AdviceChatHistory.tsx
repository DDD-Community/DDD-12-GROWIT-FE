import { useEffect, useRef } from 'react';
import { AdviceChat } from '@/model/advice/types';
import { AdviceChatMessage } from './AdviceChatMessage';
import { useAdviceChatMessages } from '../hooks/useAdviceChatMessages';
import { useAdviceFormContext } from '../hooks/useAdviceFormContext';

export const AdviceChatHistory = ({ adviceChat = null }: { adviceChat: AdviceChat | null }) => {
  const { isSendingRequest } = useAdviceFormContext();
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
            return <AdviceChatMessage.Limit key={`system-${index}`} />;
          }

          if (message.userMessage === '아침 조언 요청') {
            return (
              <div className="flex flex-col gap-y-4" key={`daily-advice-${index}`}>
                <AdviceChatMessage.DailyAdvice content={message.grorongResponse} timestamp={message.timestamp || ''} />
              </div>
            );
          }

          // 로딩 메시지
          if (message.isLoading !== undefined && message.isLoading) {
            return <AdviceChatMessage.Loading key={`loading-${index}`} />;
          }

          // 일반 대화 메시지
          return (
            <div key={message.timestamp || `msg-${index}`} className="flex flex-col gap-y-4">
              {message.userMessage && <AdviceChatMessage direction="right" content={message.userMessage} />}
              {message.grorongResponse && <AdviceChatMessage direction="left" content={message.grorongResponse} />}
            </div>
          );
        })}
      </section>
    </>
  );
};
