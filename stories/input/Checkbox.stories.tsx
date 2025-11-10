import { Meta, StoryObj } from '@storybook/react';
import Checkbox from '@/shared/components/input/Checkbox';

const meta = {
  title: 'Input/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  argTypes: {
    disabled: { type: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    disabled: false,
  },
};
