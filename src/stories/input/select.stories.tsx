import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownField } from '@/shared/components/dropDown';

const options = [
  '신입(1년차 미만)',
  '주니어(1년~3년)',
  '미드레벨(3년~6년)',
  '시니어(6~10년)',
  '리드/매니저(10년 이상)',
];

const meta = {
  title: 'Input/Dropdown',
  component: DropdownField,
  tags: ['autodocs'],
  parameters: {
    layout: 'full-screen',
    actions: { disable: true },
  },
  args: {
    label: '연차',
    options: options,
    isError: false,
    errorMessage: '',
  },
  decorators: [
    Story => (
      <div style={{ width: 386, padding: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the dropdown',
    },
    options: {
      description: 'Dropdown options',
    },
    isError: {
      control: 'boolean',
      description: 'Show error styles',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown below the dropdown',
    },
  },
} satisfies Meta<typeof DropdownField>;

export default meta;
type Story = StoryObj<typeof DropdownField>;

export const Playground: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isError: true,
    errorMessage: '이 필드는 필수입니다.',
  },
};
