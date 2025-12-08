'use client';

import Image from 'next/image';
import { CreateGoalButton } from '@/feature/goal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { GoalProvider } from '@/model/goal/context';
import 'swiper/css';
import 'swiper/css/pagination';
import { PlanetItem } from '@/feature/goal/planetItem';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createProgressGoalsQuery } from '@/model/goal/hooks';
import { Suspense, useMemo } from 'react';
import { Goal } from '@/shared/type/goal';

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
      </Suspense>
    </GoalProvider>
  );
}

export function PlanetSelector() {
  const { data: progressGoals = [] } = useSuspenseQuery(createProgressGoalsQuery());

  const goals: (Goal | 'add-goal-section')[] = useMemo(() => {
    return [...progressGoals, 'add-goal-section'];
  }, [progressGoals]);

  if (progressGoals && progressGoals.length === 0) {
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
        >
          {goals.map(goal => {
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

      {/* <GoalInfoModal isOpen={isOpen} onClose={closeModal} onDelete={deleteGoal} goal={selectedGoal} /> */}
    </div>
  );
}
