import { BottomSheet } from '@/shared/components/feedBack/BottomSheet';
import Image from 'next/image';
import Button from '@/shared/components/input/Button';

type AdviceArrivalSheetProps = {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
};

export const AdviceArrivalSheet = ({ isOpen, closeSheet }: AdviceArrivalSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} showSheet={() => {}} closeSheet={closeSheet}>
      <BottomSheet.Title>
        <header className="px-5 pt-5 pb-4 space-y-2 text-center">
          <h2 className="body-1-medium text-brand-neon">그로롱의 아침 조언</h2>
          <p className="headline-1-bold text-text-strong">오늘의 조언이 도착했어요!</p>
        </header>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <div className="px-5 pb-5 flex items-center justify-center">
          <div className="relative">
            <Image
              src="/advice/advice-arrival-letter.png"
              alt="Advice Arrival"
              width={97}
              height={70}
              priority
              className=""
            />
            <Image
              src="/advice/advice-arrival-sun.png"
              alt="Advice Arrival Shadow"
              width={48}
              height={48}
              priority
              className="absolute top-0 right-0 z-[-1] -translate-y-1/3"
            />
          </div>
        </div>
        <Button size="lg" text="확인하기" onClick={closeSheet} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};
