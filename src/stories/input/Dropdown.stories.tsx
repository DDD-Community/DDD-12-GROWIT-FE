import type { Meta, StoryObj } from '@storybook/react';
import DropdownField from '@/shared/components/input/Dropdown';
import { useState } from 'react';

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
    layout: 'fullscreen',
    actions: { disable: true },
    docs: {
      description: {
        component: '접근성이 개선된 드롭다운 컴포넌트입니다. 키보드 네비게이션(↑↓, Enter, Esc, Space)을 지원합니다.',
      },
    },
  },
  args: {
    label: '연차',
    options: options,
    selected: '',
    placeholder: '경력 선택',
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
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: {
      control: 'text',
    },
    isError: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    selected: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
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
    isError: false,
    errorMessage: '이 필드는 필수입니다',
    selected: '',
  },
  render: args => {
    const [value, setValue] = useState('');
    return <DropdownField {...args} options={options} selected={value} onChange={setValue} />;
  },
};
