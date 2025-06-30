import type { Meta, StoryObj } from '@storybook/react';
import Badge from '@/shared/components/display/Badge';

const icons = {
  x: (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1L1 7M1 1L7 7" stroke="#F7F7F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  ),
  arrowRight: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 5H8.5M8.5 5L5 1.5M8.5 5L5 8.5"
        stroke="#F7F7F8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  arrowLeft: (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-180"
    >
      <path
        d="M1.5 5H8.5M8.5 5L5 1.5M8.5 5L5 8.5"
        stroke="#F7F7F8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};
const meta = {
  title: 'Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    icon: { control: { type: 'radio' }, options: ['x', 'arrowRight', 'arrowLeft'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: 'label',
    size: 'md',
    type: 'default',
    icon: icons['x'],
  },
  render: args => {
    const icon = icons[args.icon as keyof typeof icons];
    return <Badge icon={icon} label={args.label} type={args.type} size={args.size}></Badge>;
  },
};
