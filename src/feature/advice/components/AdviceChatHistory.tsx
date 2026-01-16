import { AdviceChat } from '@/model/advice/types';
import { AdviceChatMessage } from './AdviceChatMessage';
import { AdviceChatLoading } from './AdviceChatLoading';
import { useAdviceChatMessages } from '../hooks/useAdviceChatMessages';

type AdviceChatRenderProps = {
  adviceChat: AdviceChat | null;
  isSendingRequest?: boolean;
};

export const AdviceChatHistory = ({ adviceChat = null, isSendingRequest = false }: AdviceChatRenderProps) => {
  const { displayMessages, backgroundType, shouldShowOnboarding } = useAdviceChatMessages(adviceChat, isSendingRequest);

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
      <section className="px-5 pb-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        {displayMessages.map((message, index) => {
          // 오늘 대화 횟수 소진 안내메시지
          if (message.isSystemMessage) {
            return (
              <AdviceChatMessage
                key={`system-${index}`}
                direction="left"
                content={
                  <span>
                    오늘의 고민 상담은 끝이야!
                    <br />
                    내일 아침에 다시 만나!
                    <br />
                    <br />
                    <span className="text-brand-neon label-1-bold">1일 3개 입력만 가능</span>
                  </span>
                }
              />
            );
          }

          if (message.userMessage === '아침 조언 요청') {
            return (
              <div className="flex flex-col gap-y-4" key={`daily-advice-${index}`}>
                <AdviceChatMessage.DailyAdvice content={message.grorongResponse} timestamp={message.timestamp || ''} />
              </div>
            );
          }

          if (message.isLoading !== undefined && message.isLoading) {
            return <AdviceChatLoading direction="left" key={`loading-${index}`} />;
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
