import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from '@/shared/components/feedBack/CheckBox';

const meta = {
  title: 'feedBack/CheckBox',
  component: CheckBox,
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
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Playground: Story = {
  name: 'Default',
  globals: {
    backgrounds: 'dark',
  },
  render: () => <CheckBox id="체크박스" label="체크박스" />,
};
