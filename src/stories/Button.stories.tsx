import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/stories/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  name: 'Primary',
};
