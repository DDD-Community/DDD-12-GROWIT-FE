'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useGoalSelector } from '@/model/goal/context';
import 'swiper/css';
import 'swiper/css/pagination';
import { PlanetItem } from '../../../feature/goal/components/PlanetItem';
import { useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import Button from '@/shared/components/input/Button';
import { Swiper as SwiperType } from 'swiper/types';
import { useShowEndedGoalsSheet } from './hooks';
import { StackNavButton } from '@/shared/components/feedBack/StackNavButton';
import { ROUTES } from '@/shared/constants/routes';
import { ButtonSizeMap, ButtonVariantMap } from '@/shared/components/input/Button/utils/button';
import { cn } from '@/shared/lib/utils';

export function PlanetSelector() {
  const { progressGoals, setCurrentGoal, isLoadingGoals } = useGoalSelector();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  useShowEndedGoalsSheet(showSheet);

  // 목표 리스트에 '목표 추가' 섹션을 포함한 배열 생성
  const goalsWithAddGoalSlot: (Goal | 'add-goal-section')[] = useMemo(() => {
    return [...progressGoals, 'add-goal-section'];
  }, [progressGoals]);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const activeGoal = progressGoals[activeIndex];
    setCurrentGoal(activeGoal);
  };

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
      <div className="relative">
        <Swiper
          initialSlide={0}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            el: '.custom-pagination',
          }}
          modules={[Navigation, Pagination]}
          onSlideChange={handleSlideChange}
        >
          {goalsWithAddGoalSlot.map(goal => {
            if (goal === 'add-goal-section') {
              return (
                <SwiperSlide key="add-goal-section">
                  <div className="gap-5 w-full h-80 flex flex-col justify-center">
                    <div className="flex flex-col items-center justify-center gap-6 px-5">
                      <h2 className="body-2-normal text-label-neutral text-center">
                        새로운 목표를 정해
                        <br />
                        행성을 추가해 보세요!
                      </h2>
                      <div className="w-36">
                        <CreateGoalButton />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
            return (
              <SwiperSlide key={goal.id}>
                <PlanetItem goal={goal} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="custom-pagination flex justify-center py-4" />
      </div>

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
    </>
  );
}

export function CreateNewGoalItem() {
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

function CreateGoalButton() {
  return (
    <StackNavButton
      href={ROUTES.CREATE_GOAL}
      className={cn(
        'flex items-center gap-x-2 label-1-bold',
        ButtonVariantMap['primary'].enabled,
        ButtonSizeMap['ml'].textPad
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      목표 추가하기
    </StackNavButton>
  );
}
