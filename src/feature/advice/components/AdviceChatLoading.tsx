type AdviceChatLoadingProps = {
  direction: 'left' | 'right';
};

export const AdviceChatLoading = ({ direction }: AdviceChatLoadingProps) => {
  const paddingByDirection = direction === 'left' ? 'pr-5' : 'pl-5 flex justify-end';
  const bgClassName = direction === 'left' ? 'bg-fill-normal' : 'bg-white';

  return (
    <div className={`${paddingByDirection}`}>
      <article
        className={`inline-block w-fit py-3 px-4 rounded-[20px] border-[0.5px] border-line-alternative ${bgClassName} shadow-sm`}
      >
        <div className="flex gap-x-1 items-center">
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" />
        </div>
      </article>
    </div>
  );
};
