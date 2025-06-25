import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@/shared/components/input/InputField';

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
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
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
