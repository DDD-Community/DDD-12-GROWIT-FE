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
      <div style={{ width: 308, paddingLeft: 30, paddingTop: 50 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  globals: {
    backgrounds: 'dark',
  },
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    return <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />;
  },
};
