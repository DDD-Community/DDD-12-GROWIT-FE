import type { Meta, StoryObj } from '@storybook/react';
import { Modal, StartJourneyPopUp } from '@/shared/components/feedBack/Modal';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';
import { useState } from 'react';
import Button from '@/shared/components/navigation/Button';

const meta = {
  title: 'FeedBack/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  name: 'Default',
  globals: {
    backgrounds: 'dark',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="모달 열기" onClick={() => setIsOpen(true)} />
        </div>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="제목"
          renderContent={() => (
            <div className="w-full justify-start">
              <div className="w-[200px]">
                <DatePicker selectedDate={date} onDateSelect={setDate} />
              </div>
              <TextArea placeholder="텍스트를 입력하세요" className="w-full" />
            </div>
          )}
          renderFooter={() => <Button size="lg" text="작성 완료" />}
          className="w-[500px]"
        />
      </>
    );
  },
};

export const StartJourneyModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className="flex justify-center items-center w-72">
          <Button size="xl" text="여정 시작하기" onClick={() => setIsOpen(true)} />
        </div>
        <StartJourneyPopUp open={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
};
