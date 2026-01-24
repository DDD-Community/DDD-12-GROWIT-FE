import { useState } from 'react';
import { InputField } from '@/shared/components/input/InputField';
import { AdviceSendButton } from './AdviceSendButton';

interface AdviceInputSectionProps {
  remainingCount: number;
  isSendingRequest: boolean;
  onSubmit: (message: string) => void;
}

export const AdviceInputSection = ({ remainingCount, isSendingRequest, onSubmit }: AdviceInputSectionProps) => {
  const [userMessage, setUserMessage] = useState('');

  const isDisabled = remainingCount === 0 || isSendingRequest;
  const canSubmit = userMessage.length > 0 && !isDisabled;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(userMessage);
    setUserMessage('');
  };

  return (
    <section className="pb-5 w-full flex items-center gap-x-2">
      <div className="flex-1">
        <InputField
          version="underline"
          name="advice-message"
          value={userMessage}
          onChange={e => setUserMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && canSubmit) {
              handleSubmit();
            }
          }}
          disabled={isDisabled}
          placeholder={remainingCount === 0 ? '오늘의 조언 횟수를 모두 사용했어요' : '지금 목표에서 뭐부터 하면 좋을까?'}
        />
      </div>
      <AdviceSendButton type="button" onClick={handleSubmit} disabled={!canSubmit} />
    </section>
  );
};
