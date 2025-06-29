import type { Meta, StoryObj } from '@storybook/react';
import { InputField, InputWithCount } from '@/shared/components/input/InputField';
import { useState } from 'react';

const meta = {
  title: 'Input/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div style={{ width: 386 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type을 설정합니다.',
      defaultValue: 'text',
    },
    label: {
      control: 'text',
      description: '입력 필드 상단의 라벨',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드의 placeholder',
    },
    isError: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지 텍스트',
    },
    maxLength: {
      control: 'number',
      description: '인풋 최대 길이',
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    type: 'email',
    isError: false,
    errorMessage: '올바른 이메일 형식이 아닙니다',
  },
};

export const WithCount: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '목표 이름',
    placeholder: '목표 이름을 입력하세요',
    type: 'text',
    maxLength: 30,
  },
  render: args => {
    const [value, setValue] = useState('');
    return <InputWithCount value={value} onChange={e => setValue(e.target.value)} {...args} />;
  },
};
