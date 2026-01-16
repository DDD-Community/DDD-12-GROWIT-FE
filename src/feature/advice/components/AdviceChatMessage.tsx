import Button from '@/shared/components/input/Button';
import Image from 'next/image';
import { ROUTES } from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';

type AdviceChatMessageType = 'onboarding' | 'loading' | 'text';

type AdviceChatMessageProps = {
  type?: AdviceChatMessageType;
  direction: 'left' | 'right';
  content: string | React.ReactNode;
  className?: string;
};

type BackgroundType = 'default' | 'writing' | 'sleeping' | 'noGoal';

export const AdviceChatMessage = ({ type = 'text', direction, content, className }: AdviceChatMessageProps) => {
  const paddingByDirection = direction === 'left' ? 'pr-5' : 'pl-5 flex justify-end';
  const bgClassName = direction === 'left' ? 'bg-fill-normal' : 'bg-white';
  const textClassName = direction === 'left' ? 'text-text-strong' : 'text-text-inverse';
  return (
    <div className={`${paddingByDirection}`}>
      <article
        className={`inline-block w-fit max-w-full py-3 px-4 rounded-[20px] border-[0.5px] border-line-alternative text-pretty ${bgClassName} ${className} shadow-sm`}
      >
        <p className={`${textClassName} font-medium`}>{content}</p>
      </article>
    </div>
  );
};

// 네임스페이스: Onboarding
AdviceChatMessage.Onboarding = function OnboardingMessage({
  backgroundType,
}: {
  backgroundType: Extract<BackgroundType, 'default' | 'writing' | 'sleeping'>;
}) {
  return (
    <>
      <section className="px-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        <div className="flex flex-col gap-y-4">
          <AdviceChatMessage
            direction="left"
            content="안녕! 나는 너의 목표 달성을 함께할 그로롱이야
앞으로 매일 아침 7시에, 너의 목표 현황을 요약하고 달성을 위한 조언해줄거야 :)"
          />
          <AdviceChatMessage direction="left" content="한 가지 궁금한 게 있어, 이번 목표를 시작하게 된 계기는 뭐야?" />
          <span className="caption-1-regular text-text-primary bg-fill-normal py-1 px-2 rounded-2xl shadow-sm inline text-center">
            그로롱에게 목표에 대한 고민을 털어놓아보세요
          </span>
        </div>
      </section>
    </>
  );
};

// 네임스페이스: NoGoal
AdviceChatMessage.NoGoal = function NoGoalMessage() {
  const router = useRouter();
  return (
    <>
      <section className="px-5 absolute inset-0 overflow-y-auto z-10 space-y-4">
        <div className="flex flex-col gap-y-4">
          <AdviceChatMessage direction="left" content="음..아직 목표가 없네?" />
          <div className="pr-5">
            <article
              className={`inline-block w-fit max-w-full py-3 px-4 rounded-[20px] border-[0.5px] border-line-alternative text-pretty bg-fill-normal shadow-sm`}
            >
              <p className="font-medium text-text-strong">새로운 목표와 투두를 만들면 너에게 딱 맞는 조언을 해줄게!</p>
              <Button
                size="ml"
                text="목표 추가하기"
                layout="icon-left"
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
                      stroke="currentColor"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                onClick={() => router.push(ROUTES.CREATE_GOAL)}
                className="mt-2"
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

type DailyAdviceMessageProps = {
  content: string;
  timestamp: string;
};
AdviceChatMessage.DailyAdvice = function DailyAdviceMessage({ content, timestamp }: DailyAdviceMessageProps) {
  const convertToKSTDate = (timestamp: string) => {
    return new Date(new Date(timestamp).getTime() + 9 * 60 * 60 * 1000).toISOString().split('T')[0];
  };
  return (
    <div className="pr-5">
      <article className="inline-block w-fit max-w-full py-3 px-4 space-y-3 rounded-[20px] border-[0.5px] border-line-alternative text-pretty bg-fill-normal shadow-sm">
        <span className="label-2-medium text-text-secondary">{convertToKSTDate(timestamp)}</span>
        <h2 className="body-1-bold text-text-strong">오늘의 조언</h2>
        <p className="text-text-strong font-medium">{content}</p>
      </article>
    </div>
  );
};

AdviceChatMessage.Limit = function LimitMessage() {
  return (
    <>
      <AdviceChatMessage
        direction="left"
        content={
          <Image
            src="/advice/emoji-advice-sleeping.gif"
            alt="sleeping-grorong"
            width={150}
            height={150}
            className="object-contain"
          />
        }
      />
      <AdviceChatMessage
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
    </>
  );
};

AdviceChatMessage.Loading = function LoadingMessage() {
  return (
    <>
      <AdviceChatMessage
        direction="left"
        content={
          <Image
            src="/advice/emoji-advice-writing.gif"
            alt="writting-grorong"
            width={150}
            height={150}
            className="object-contain"
          />
        }
      />
      <AdviceChatMessage
        direction="left"
        content={<span>열심히 고민중이야 좀만 기다려줘</span>}
      />
    </>
  );
};
