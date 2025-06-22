import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@/shared/components/InputField';

const meta = {
  title: 'Input',
  component: InputField,

  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  name: '기본 입력 필드',
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    type: 'email',
  },
};

export const WithError: Story = {
  name: '에러 상태',
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    isError: true,
    errorMessage: '비밀번호는 6자 이상이어야 합니다.',
  },
};
