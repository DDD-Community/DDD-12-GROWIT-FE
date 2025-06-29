import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@/shared/components/input/TextArea';
import { useState } from 'react';

const meta = {
  title: 'Input/TextArea',
  component: TextArea,
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '1주차',
    placeholder: 'ex) 하루 30분 UX 포트폴리오 관련 리서치',
    isError: false,
    errorMessage: '에러메시지',
  },
};

export const WithCount: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    label: '2주차',
    placeholder: 'ex) 나만의 인사이트 포트폴리오에 반영하기',
    isError: false,
    errorMessage: '에러메시지',
    maxLength: 30,
  },
  render: args => {
    return <TextArea {...args} />;
  },
};
