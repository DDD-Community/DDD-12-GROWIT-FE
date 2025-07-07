interface SpeechBubbleProps {
  direction: 'left' | 'right';
  children: React.ReactNode;
}

export const SpeechBubble = ({ direction, children }: SpeechBubbleProps) => {
  return (
    <div className="relative">
      <div
        className={`bg-label-button-neutral rounded-tl-xl rounded-tr-xl ${direction === 'left' ? 'rounded-bl-0 rounded-br-xl' : 'rounded-bl-xl rounded-br-0'}  text-primary-strong py-5 px-6`}
      >
        {children}
      </div>

      {direction === 'left' ? (
        <div className="absolute bottom-0 -left-7.5 w-0 h-0 border-b-[30px] border-l-[30px] border-transparent border-b-label-button-neutral" />
      ) : (
        <div className="absolute bottom-0 -right-7.5 w-0 h-0 border-b-[30px] border-r-[30px] border-transparent border-b-label-button-neutral" />
      )}
    </div>
  );
};
