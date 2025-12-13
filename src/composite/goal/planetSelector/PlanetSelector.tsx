'use client';

import Image from 'next/image';
import { CreateGoalButton } from '@/feature/goal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { GoalProvider, useGoalSelector } from '@/model/goal/context';
import 'swiper/css';
import 'swiper/css/pagination';
import { PlanetItem } from '@/feature/goal/planetItem';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { createAllGoalsQuery, createProgressGoalsQuery } from '@/model/goal/hooks';
import { Suspense, useEffect, useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { getToday } from '@/feature/goal/createGoalFormElement/utils';
import { BottomSheet, useBottomSheet } from '@/shared/components/feedBack/BottomSheet';
import CreateNewGoal from './components/CreateNewGoal';
import Button from '@/shared/components/input/Button';
import GoalProgressSheet from '../goalProgressSheet';
import { Swiper as SwiperType } from 'swiper/types';

export default function PlanetSelectorContainer() {
  return (
    <GoalProvider goalListOption={{ year: 2025 }}>
      <Suspense
        fallback={
          <div className="w-full h-full pt-36 bg-[#1C1C1E] items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
              <p className="text-gray-100 text-sm font-medium">진행중인 목표를 불러오는 중입니다...</p>
            </div>
          </div>
        }
      >
        <PlanetSelector />
        <section className="pb-16">
          <GoalProgressSheet />
        </section>
      </Suspense>
    </GoalProvider>
  );
}

export function PlanetSelector() {
  const [{ data: progressGoals }, { data: allGoals }] = useSuspenseQueries({
    queries: [createProgressGoalsQuery(), createAllGoalsQuery()],
  });
  const { setCurrentGoal } = useGoalSelector();
  const { isOpen, showSheet, closeSheet } = useBottomSheet();

  const renderGoals: (Goal | 'add-goal-section')[] = useMemo(() => {
    return [...progressGoals, 'add-goal-section'];
  }, [progressGoals]);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const activeGoal = progressGoals[activeIndex];
    setCurrentGoal(activeGoal);
  };

  useEffect(() => {
    const endedGoals = allGoals.filter(goal => goal.updateStatus === 'ENDED');
    const todayCompletedGoals = endedGoals.filter(goal => goal.duration.endDate === getToday());
    // 오늘 종료된 목표가 한개 이상 있을 경우 바텀시트가 나타남
    if (todayCompletedGoals.length > 0) {
      showSheet();
    }
  }, []);

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
          {renderGoals.map(goal => {
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
