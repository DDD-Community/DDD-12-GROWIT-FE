import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import Button from '@/shared/components/input/Button';
import { TextArea } from '@/shared/components/input/TextArea';
import DatePicker from '@/shared/components/input/DatePicker';
import { Folder, X } from 'lucide-react';
import { useState } from 'react';

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
    const { isOpen, showSheet, closeSheet } = useBottomSheet();
    const [date, setDate] = useState<Date>(new Date());

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="바텀시트 열기" onClick={showSheet} />
        </div>
        <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
          <BottomSheet.Title>
            <div className="flex items-center justify-between w-full p-5">
              <button onClick={close}>
                <X size={24} className="text-primary-normal" />
              </button>
              <div className="flex items-center gap-2 text-primary-normal">
                <Folder size={24} />
                제목
              </div>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#3AEE49"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </BottomSheet.Title>
          <BottomSheet.Content>
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
          </BottomSheet.Content>
        </BottomSheet>
      </>
    );
  },
};

export const WithLongContent: Story = {
  name: '긴 컨텐츠',
  render: () => {
    const { isOpen, showSheet, closeSheet } = useBottomSheet();

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="긴 컨텐츠 바텀시트 열기" onClick={showSheet} />
        </div>
        <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
          <BottomSheet.Title>
            <div className="p-5">
              <button onClick={close} className="text-primary-normal">
                닫기
              </button>
            </div>
          </BottomSheet.Title>
          <BottomSheet.Content>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-label-normal">아이템 {i + 1}</p>
                  <p className="text-xs text-muted-foreground mt-1">이것은 긴 컨텐츠를 테스트하기 위한 예제입니다.</p>
                </div>
              ))}
            </div>
          </BottomSheet.Content>
        </BottomSheet>
      </>
    );
  },
};

export const SimpleContent: Story = {
  name: '간단한 컨텐츠',
  render: () => {
    const { isOpen, showSheet, closeSheet } = useBottomSheet();

    return (
      <>
        <div className="flex justify-center items-center">
          <Button size="xl" text="간단한 바텀시트 열기" onClick={showSheet} />
        </div>
        <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
          <BottomSheet.Title>
            <div className="p-5">
              <h2 className="text-lg font-semibold">간단한 예제</h2>
            </div>
          </BottomSheet.Title>
          <BottomSheet.Content>
            <div className="flex flex-col gap-4">
              <p className="text-label-normal">이것은 간단한 바텀시트 예제입니다.</p>
              <Button size="lg" text="확인" onClick={close} />
            </div>
          </BottomSheet.Content>
        </BottomSheet>
      </>
    );
  },
};
