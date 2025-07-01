import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '@/shared/components/input/ProgressBar';

const meta = {
  title: 'Input/ConfirmGoalBottomBar',
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
    percentage: { control: { type: 'number' } },
    totalTask: { control: { type: 'number' }, description: '총 작업 갯수' },
    showPercentage: { control: { type: 'boolean' } },
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
    percentage: 0,
    showPercentage: false,
  },
  render(args) {
    return (
      <ProgressBar
        label={args.label}
        percentage={args.percentage}
        totalTask={args.totalTask}
        showPercentage={args.showPercentage}
      />
    );
  },
};
