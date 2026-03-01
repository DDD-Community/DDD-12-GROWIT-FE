'use client';

import Image from 'next/image';
import { useGoalSelector } from '@/model/goal/context';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import Button from '@/shared/components/input/Button';
import { useShowEndedGoalsSheet } from './hooks';
import { PlanetSwiperSection } from '@/feature/goal/components/PlanetSwiperSection';
import { CreateGoalButton } from '@/feature/goal/components/CreateGoalButton';

export function GoalPlanetSection() {
  const { progressGoals, isLoadingGoals } = useGoalSelector();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  useShowEndedGoalsSheet(showSheet);

  if (isLoadingGoals) {
    return (
      <div className="w-full h-screen flex flex-col bg-normal items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
        <p className="text-gray-100 text-sm font-medium">진행중인 목표를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (progressGoals && progressGoals.length === 0) {
    return <CreateNewGoalItem />;
  }

  return (
    <>
      <PlanetSwiperSection />
      <GoalEndedSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet} />
    </>
  );
}

type GoalEndedSheetProps = {
  isOpen: boolean;
  showSheet: () => void;
  closeSheet: () => void;
};
function GoalEndedSheet({ isOpen, showSheet, closeSheet }: GoalEndedSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} showSheet={showSheet} closeSheet={closeSheet}>
      <BottomSheet.Title>
        <div className="flex flex-col items-center justify-center text-center space-y-2 p-5">
          <h2 className="text-brand-neon body-1-normal">목표 종료</h2>
          <p className="headline-1-bold text-text-strong">행성 꾸미기가 완료됐어요!</p>
        </div>
      </BottomSheet.Title>
      <BottomSheet.Content>
        <section className="flex flex-col items-center justify-center gap-4">
          <Image src="/goal/goal-completed.png" alt="Goal Completed" width={160} height={160} priority />
          <Button size="xl" text="행성 확인하기" onClick={closeSheet} />
        </section>
      </BottomSheet.Content>
    </BottomSheet>
  );
}

function CreateNewGoalItem() {
  return (
    <div className="relative flex flex-col items-center justify-center px-5">
      <div className="w-40 h-40">
        <Image
          src="/goal/goal-empty.svg"
          alt="Goal Empty"
          width={160}
          height={160}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-label-neutral text-center">
          진행중인 목표가 없습니다. <br /> 목표를 추가해주세요.
        </p>
        <div className="w-36">
          <CreateGoalButton />
        </div>
      </div>
    </div>
  );
}
