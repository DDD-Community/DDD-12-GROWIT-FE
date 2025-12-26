'use client';

import Image from 'next/image';
import { CreateGoalButton } from '@/feature/goal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { GoalProvider, useGoalSelector } from '@/model/goal/context';
import 'swiper/css';
import 'swiper/css/pagination';
import { PlanetItem } from '@/feature/goal/planetItem';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createProgressGoalsQuery } from '@/model/goal/hooks';
import { useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import CreateNewGoal from './components/CreateNewGoal';
import Button from '@/shared/components/input/Button';
import GoalProgressSheet from '../goalProgressSheet';
import { Swiper as SwiperType } from 'swiper/types';
import { useShowEndedGoalsSheet } from './hooks';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';

export default function PlanetSelectorScene() {
  return (
    <GoalProvider goalListOption={{ year: 2025 }}>
      <PlanetSelector />
      <section className="pb-16">
        <GoalProgressSheet />
      </section>
    </GoalProvider>
  );
}

export function PlanetSelector() {
  const msUntilEndOfDay = getMsUntilEndOfDay();
  const { data: progressGoals } = useSuspenseQuery(
    createProgressGoalsQuery({
      // 캐시 무효화가 없다면, 현재 시간부터 하루가 끝나기전까지 유지되어도 괜찮다 판단
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );
  const { setCurrentGoal } = useGoalSelector();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();
  useShowEndedGoalsSheet(showSheet);

  const goalsWithAddGoalSlot: (Goal | 'add-goal-section')[] = useMemo(() => {
    return [...progressGoals, 'add-goal-section'];
  }, [progressGoals]);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const activeGoal = progressGoals[activeIndex];
    setCurrentGoal(activeGoal);
  };

  if (progressGoals && progressGoals.length === 0) {
    return <CreateNewGoal />;
  }

  return (
    <div className="px-5">
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
    </div>
  );
}
