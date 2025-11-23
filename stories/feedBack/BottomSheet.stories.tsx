import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { useState } from 'react';
import Button from '@/shared/components/input/Button';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';

const meta = {
  title: 'FeedBack/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    actions: { disable: true },
  },
  decorators: [
    Story => (
      <div className="w-[400px] mx-auto min-h-screen bg-background p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Playground: Story = {
  name: 'Default',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="바텀시트 열기" onClick={() => setIsOpen(true)} />
        </div>
        <BottomSheet open={isOpen} onOpenChange={setIsOpen} title="바텀시트 제목">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <DatePicker selectedDate={date} onDateSelect={setDate} />
            </div>
            <TextArea placeholder="텍스트를 입력하세요" className="w-full" />
            <div className="space-y-2">
              <p className="text-sm text-label-normal">바텀시트 컨텐츠 영역입니다.</p>
              <p className="text-sm text-label-normal">헤더를 드래그하여 높이를 조절할 수 있습니다.</p>
            </div>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const WithLongContent: Story = {
  name: '긴 컨텐츠',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="긴 컨텐츠 바텀시트 열기" onClick={() => setIsOpen(true)} />
        </div>
        <BottomSheet open={isOpen} onOpenChange={setIsOpen} title="긴 컨텐츠 예제">
          <div className="flex flex-col gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-label-normal">아이템 {i + 1}</p>
                <p className="text-xs text-muted-foreground mt-1">이것은 긴 컨텐츠를 테스트하기 위한 예제입니다.</p>
              </div>
            ))}
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const SimpleContent: Story = {
  name: '간단한 컨텐츠',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="간단한 바텀시트 열기" onClick={() => setIsOpen(true)} />
        </div>
        <BottomSheet open={isOpen} onOpenChange={setIsOpen} title="간단한 예제">
          <div className="flex flex-col gap-4">
            <p className="text-label-normal">이것은 간단한 바텀시트 예제입니다.</p>
            <Button size="lg" text="확인" onClick={() => setIsOpen(false)} />
          </div>
        </BottomSheet>
      </>
    );
  },
};
