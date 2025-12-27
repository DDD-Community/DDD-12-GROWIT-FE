import { AdviceChat } from '@/model/advice/types';
import { AdviceChatBox } from './AdviceChatBox';
import { AdviceChatBackground } from './AdviceChatBackground';

type AdviceChatRenderProps = {
  adviceChat?: AdviceChat | null;
  isSendingRequest?: boolean;
};
export const AdviceChatHistory = ({ adviceChat = null, isSendingRequest = false }: AdviceChatRenderProps) => {
  if (!adviceChat) {
    return <NoGoalMessage />;
  } else if (adviceChat.conversations.length === 0) {
    return <OnboardingMessage />;
  }

  const backgroundType = adviceChat.remainingCount === 0 ? 'sleeping' : isSendingRequest ? 'writing' : 'default';

  return (
    <>
      <section className="h-[calc(100vh-398px)] px-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        {adviceChat.conversations.map(chatMessage => (
          <div key={chatMessage.timestamp} className="flex flex-col gap-y-4">
            <AdviceChatBox direction="right" content={chatMessage.userMessage} />
            <AdviceChatBox direction="left" content={chatMessage.grorongResponse} />
          </div>
        ))}
      </section>
      <AdviceChatBackground type={backgroundType} />
    </>
  );
};

function OnboardingMessage() {
  return (
    <>
      <section className="h-[calc(100vh-398px)] px-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        <div className="flex flex-col gap-y-4">
          <AdviceChatBox
            direction="left"
            content="안녕! 나는 너의 목표 달성을 함께할 그로롱이야
앞으로 매일 아침 7시에, 너의 목표 현황을 요약하고 달성을 위한 조언해줄거야 :)"
          />
          <AdviceChatBox direction="left" content="한 가지 궁금한 게 있어, 이번 목표를 시작하게 된 계기는 뭐야?" />
          <span className="caption-1-regular text-text-primary bg-fill-normal py-1 px-2 rounded-2xl shadow-sm inline text-center">
            그로롱에게 목표에 대한 고민을 털어놓아보세요
          </span>
        </div>
      </section>
      <AdviceChatBackground type="default" />
    </>
  );
}

function NoGoalMessage() {
  return (
    <>
      <section className="h-[calc(100vh-398px)] px-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        <div className="flex flex-col gap-y-4">
          <AdviceChatBox direction="left" content="음..아직 목표가 없네?" />
          <AdviceChatBox
            direction="left"
            content="새로운 목표와 투두를 만들면
너에게 딱 맞는 조언을 해줄게!"
          />
        </div>
      </section>
      <AdviceChatBackground type="noGoal" />
    </>
  );
}
