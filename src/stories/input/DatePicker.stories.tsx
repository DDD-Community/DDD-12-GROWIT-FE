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
    allowedDaysOfWeek: {
      control: { type: 'object' },
      description: '선택 가능한 요일 배열 (0: 일요일, 1: 월요일, ..., 6: 토요일)',
    },
    minDate: {
      control: { type: 'date' },
      description: '최소 선택 가능 날짜',
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

export const WeekdaysOnly: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '평일만 선택 가능',
    allowedDaysOfWeek: [1, 2, 3, 4, 5], // 월요일~금요일만 선택 가능
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        allowedDaysOfWeek={args.allowedDaysOfWeek}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};

export const WeekendOnly: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '주말만 선택 가능',
    allowedDaysOfWeek: [0, 6], // 일요일, 토요일만 선택 가능
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        allowedDaysOfWeek={args.allowedDaysOfWeek}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};

export const SpecificDays: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '월, 수, 금만 선택 가능',
    allowedDaysOfWeek: [1, 3, 5], // 월요일, 수요일, 금요일만 선택 가능
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        allowedDaysOfWeek={args.allowedDaysOfWeek}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};

export const WithMinDate: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '최소 날짜 이후만 선택 가능',
    minDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1주일 후부터
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        minDate={args.minDate}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};

export const MondayOnlyWithMinDate: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '월요일만 선택 가능 (최소 날짜 이후)',
    allowedDaysOfWeek: [1], // 월요일만 선택 가능
    minDate: (() => {
      const nextMonday = new Date();
      const currentDay = nextMonday.getDay();
      const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay;
      nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
      return nextMonday;
    })(),
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <DatePicker
        isStartDate={args.isStartDate}
        placeholder={args.placeholder}
        allowedDaysOfWeek={args.allowedDaysOfWeek}
        minDate={args.minDate}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />
    );
  },
};

export const MinDateInclusive: Story = {
  globals: {
    backgrounds: 'dark',
  },
  args: {
    isStartDate: false,
    placeholder: '최소 날짜 포함하여 선택 가능',
    minDate: new Date(), // 오늘 날짜부터 선택 가능 (오늘 포함)
  },
  render: args => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <div>
        <p className="text-white mb-4">오늘 날짜({args.minDate?.toLocaleDateString()})부터 선택 가능합니다.</p>
        <DatePicker
          isStartDate={args.isStartDate}
          placeholder={args.placeholder}
          minDate={args.minDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        {selectedDate && <p className="text-white mt-4">선택된 날짜: {selectedDate.toLocaleDateString()}</p>}
      </div>
    );
  },
};
