import Button from '@/shared/components/input/Button';

interface EventButtonProps {
  onClick: () => void;
}

const DefaultEventButton = ({ onClick }: EventButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-text-strong text-base font-bold border border-[#393939] bg-white/15 hover:bg-white/30 transition-colors duration-300 rounded-lg py-2.5 px-4.5 flex items-center justify-center gap-1 hover:bg-[rgba(57, 57, 57, 1)]"
    >
      APP 얼리버드 신청
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 6.83333H12.6667M12.6667 6.83333L6.83333 1M12.6667 6.83333L6.83333 12.6667"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const AfterSubmitEventButton = ({ onClick }: EventButtonProps) => {
  return <Button size="xl" variant="primary" text="친구에게 공유하기" onClick={onClick} />;
};

const EventButton = {
  Default: DefaultEventButton,
  AfterSubmit: AfterSubmitEventButton,
};

export { EventButton };
