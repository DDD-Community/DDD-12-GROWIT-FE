import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/shared/components/input/Button';
import { useState } from 'react';
import Icons from '../icons';

const meta = {
  title: 'Navigation/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    actions: { disable: true },
  },
  args: {
    size: 'lg',
    text: 'Button CTA',
    disabled: false,
  },
  decorators: [
    Story => (
      <div style={{ width: 386, padding: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'tertiary', 'accent'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'ml', 'lg', 'xl'],
    },
    text: {
      control: 'text',
    },
    disabled: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: args => {
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = async () => {
      setIsSuccess(false);
      setIsPending(true);
      setTimeout(() => {
        setIsSuccess(true);
        setIsPending(false);
      }, 1000);
    };

    return (
      <div className="max-w-xs">
        <p className="font-semibold text-base text-gray-200">💡 사용 예시</p>
        <p className="font-semibold text-base text-gray-200">POST 요청 시작 → 로딩 스피너 표시</p>
        <p className="font-semibold text-base text-gray-200">요청 성공 → 체크 아이콘 및 완료 메시지 표시</p>
        <p className="font-semibold text-base text-gray-200 pb-8">요청 실패 → 에러 상태 표시 (옵션)</p>
        <Button
          {...args}
          status={isPending ? 'loading' : isSuccess ? 'success' : 'idle'}
          icon={Icons[`${args.variant !== 'primary' ? 'whiteCircle' : 'circle'}`]}
          onClick={handleClick}
        />
      </div>
    );
  },
};
