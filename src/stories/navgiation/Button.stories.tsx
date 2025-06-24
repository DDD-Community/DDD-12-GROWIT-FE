import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/shared/components/Button';

const options = [
  '신입(1년차 미만)',
  '주니어(1년~3년)',
  '미드레벨(3년~6년)',
  '시니어(6~10년)',
  '리드/매니저(10년 이상)',
];

const meta = {
  title: 'Navigation/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  args: {
    size: 'lg',
    text: 'Button CTA',
    disabled: false,
    isPending: false,
  },
  decorators: [
    Story => (
      <div style={{ width: 386, padding: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['sm', 'ml', 'lg', 'xl', 'full'],
    },
    text: {
      control: 'text',
    },
    disabled: {
      type: 'boolean',
    },
    isPending: {
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
};
