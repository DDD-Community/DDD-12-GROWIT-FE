import type { Meta, StoryObj } from '@storybook/react';
import { SpeechBubble } from '@/shared/components/display/SpeechBubble';

const meta = {
  title: 'Display/SpeechBubble',
  component: SpeechBubble,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpeechBubble>;

export default meta;
type Story = StoryObj<typeof SpeechBubble>;

export const Playground: Story = {
  globals: {
    backgrounds: 'light',
  },
  args: {
    direction: 'left',
  },
  render: args => {
    return (
      <SpeechBubble direction={args.direction}>
        <p>
          안녕 경서, <br /> 나는 경서의 목표 행성까지의 여정을 함께할 <span className="font-bold">동행자 그로냥</span>
          이다냥 <br />
          우리의 4주간 여정의 목표 행성을 정해야한다냥 <br /> <br />
          <span className="font-bold text-accent-violet">‘목표 추가 버튼’</span>을 눌러 최종 목적지를 정해주라냥
        </p>
      </SpeechBubble>
    );
  },
};
