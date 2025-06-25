import type { Meta, StoryObj } from '@storybook/react';
import { useToast, ToastProvider } from '@/shared/components/feedBack/toast';
import Button from '@/shared/components/navigation/Button';

const meta = {
  title: 'FeedBack/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render() {
    const { showToast } = useToast();
    const handleTestSuccess = () => {
      showToast('성공 메시지입니다!', 'success');
    };

    const handleTestError = () => {
      showToast('에러 메시지입니다!', 'error');
    };

    const handleTestWarning = () => {
      showToast('경고 메시지입니다!', 'warning');
    };

    const handleTestInfo = () => {
      showToast('정보 메시지입니다!', 'info');
    };

    return (
      <div className="p-8 space-y-4 rounded-xl">
        <div className="space-y-3 w-48">
          <Button size="xl" text="성공 토스트 테스트" onClick={handleTestSuccess} />

          <Button size="xl" text="실패 토스트 테스트" onClick={handleTestError} />

          <Button size="xl" text="경고 토스트 테스트" onClick={handleTestWarning} />

          <Button size="xl" text="정보 토스트 테스트" onClick={handleTestInfo} />
        </div>
      </div>
    );
  },
};
