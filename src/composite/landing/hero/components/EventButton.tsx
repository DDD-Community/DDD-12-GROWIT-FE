import Button from '@/shared/components/input/Button';

interface EventButtonProps {
  onClick: () => void;
}

const DefaultEventButton = ({ onClick }: EventButtonProps) => {
  return <Button size="xl" variant="brand" text="얼리버드 신청하기" onClick={onClick} />;
};

const AfterSubmitEventButton = ({ onClick }: EventButtonProps) => {
  return <Button size="xl" variant="primary" text="친구에게 공유하기" onClick={onClick} />;
};

const EventButton = {
  Default: DefaultEventButton,
  AfterSubmit: AfterSubmitEventButton,
};

export { EventButton };
