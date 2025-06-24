import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@/shared/components/Skeleton';

const meta = {
  title: 'Foundation/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      control: 'radio',
    },
    direction: {
      control: 'radio',
    },
    count: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  globals: {
    backgrounds: 'dark',
  },
};
