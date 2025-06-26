import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '@/shared/components/input/DatePicker';
import { useState } from 'react';

const meta = {
  title: 'Input/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div style={{ width: 310, paddingLeft: 30, paddingTop: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isStartDate: {
      control: { type: 'boolean' },
      description: '목표 시작 날짜를 정하는 DatePicker인지 여부',
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: true,
    placeholder: 'YYYY-MM-DD',
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};
