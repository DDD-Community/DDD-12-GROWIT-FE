type AdviceChatBoxType = 'onboarding' | 'loading' | 'text';

type AdviceChatBoxProps = {
  type?: AdviceChatBoxType;
  direction: 'left' | 'right';
  content: string;
};

export const AdviceChatBox = ({ type = 'text', direction, content }: AdviceChatBoxProps) => {
  const paddingByDirection = direction === 'left' ? 'pr-5' : 'pl-5 flex justify-end';
  const bgClassName = direction === 'left' ? 'bg-fill-normal' : 'bg-white';
  const textClassName = direction === 'left' ? 'text-text-strong' : 'text-text-inverse';
  return (
    <div className={`${paddingByDirection}`}>
      <article
        className={`inline-block w-fit max-w-full py-3 px-4 rounded-[20px] border-[0.5px] border-line-alternative text-pretty ${bgClassName} shadow-sm`}
      >
        <p className={`${textClassName} font-medium`}>{content}</p>
      </article>
    </div>
  );
};
