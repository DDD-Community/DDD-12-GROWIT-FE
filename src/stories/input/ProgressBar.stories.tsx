import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '@/shared/components/input/ProgressBar';

const meta = {
  title: 'Input/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div style={{ width: 500, paddingLeft: 30, paddingTop: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: { type: 'text' } },
    doneTask: { control: { type: 'number' }, description: '현재까지 완료한 작업 갯수' },
    totalTask: { control: { type: 'number' }, description: '총 작업 갯수' },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '작업 완료율',
    doneTask: 3,
    totalTask: 10,
  },
  render(args) {
    return <ProgressBar label={args.label} doneTask={args.doneTask} totalTask={args.totalTask} />;
  },
};
