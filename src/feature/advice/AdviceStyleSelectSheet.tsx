'use client';

import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import { ADVICE_STYLE_SELECT_ITEMS } from '@/composite/advice/constants';
import { AdviceStyle } from '@/model/advice/types';

type AdviceStyleSelectSheetProps = {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
  selectedAdviceStyle: AdviceStyle;
  setSelectedAdviceStyle: (adviceStyle: AdviceStyle) => void;
};

export const AdviceStyleSelectSheet = ({
  isOpen,
  showSheet,
  closeSheet,
  selectedAdviceStyle,
  setSelectedAdviceStyle,
}: AdviceStyleSelectSheetProps) => {
  const adviceStyleValues = Object.values(ADVICE_STYLE_SELECT_ITEMS);
  const adviceStyleKeys = Object.keys(ADVICE_STYLE_SELECT_ITEMS) as AdviceStyle[];
  return (
    <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
      <BottomSheet.Title>
        <div className="w-full justify-start items-center p-5">
          <button onClick={closeSheet} className="text-text-strong">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <ul className="w-full flex flex-col gap-y-2 items-center">
          {adviceStyleValues.map((item, index) => {
            const currentKey = adviceStyleKeys[index];
            return (
              <AdviceStyleSelectItem
                key={item.title}
                title={item.title}
                description={item.description}
                isSelected={selectedAdviceStyle === currentKey}
                onSelect={() => setSelectedAdviceStyle(currentKey)}
              />
            );
          })}
        </ul>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

type AdviceStyleSelectItemProps = {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
};
function AdviceStyleSelectItem({ title, description, isSelected, onSelect }: AdviceStyleSelectItemProps) {
  return (
    <li onClick={onSelect} className="w-full flex items-center justify-between py-2 px-[14px] cursor-pointer">
      <div className="flex flex-col gap-y-1">
        <p className="body-1-bold text-text-strong">{title}</p>
        <span className="text-text-secondary label-1-normal">{description}</span>
      </div>

      {isSelected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0774 4.41107C16.4028 4.08563 16.9304 4.08563 17.2558 4.41107C17.5812 4.73651 17.5812 5.26402 17.2558 5.58946L8.08913 14.7561C7.76369 15.0816 7.23618 15.0816 6.91074 14.7561L2.74408 10.5895C2.41864 10.264 2.41864 9.73651 2.74408 9.41107C3.06951 9.08563 3.59703 9.08563 3.92246 9.41107L7.49994 12.9885L16.0774 4.41107Z"
            fill="#3AEE49"
          />
        </svg>
      )}
    </li>
  );
}
