'use client';

import Badge from '@/shared/components/display/Badge';
import { GoalInfoModal, useGoalInfoModal } from '@/feature/goal';
import { Goal } from '@/shared/type/goal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useGoalSelector } from '@/model/goal/context';
import 'swiper/css';
import 'swiper/css/pagination';

export function PlanetSelector() {
  const { goalList, deleteGoal } = useGoalSelector();
  const { isOpen, selectedGoal, openModal, closeModal } = useGoalInfoModal();

  const handlePlanetClick = (goal: Goal) => {
    openModal(goal);
  };

  return (
    <>
      <div className="relative mt-20">
        <Swiper
          dir="rtl"
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            el: '.custom-pagination',
          }}
          modules={[Navigation, Pagination]}
        >
          {goalList.map(goal => (
            <SwiperSlide key={goal.id}>
              <div className="h-full w-full">
                <div className="gap-5 w-full">
                  {/* Header */}
                  <div className="px-2.5 py-2.5 w-full space-y-3">
                    <div className="flex w-full justify-center">
                      <Badge
                        type="default"
                        size="md"
                        label="진행중"
                        color="bg-[rgba(53,217,66,0.4)]"
                        textColor="text-[#3AEE49]"
                      />
                    </div>

                    <h2 className="heading-2-bold text-label-normal text-center">{goal.name}</h2>
                  </div>

                  {/* Planet Image */}
                  <div className="flex w-full justify-center">
                    <div
                      className="relative cursor-pointer hover:scale-105 transition-transform w-full max-w-[294px] aspect-square"
                      onClick={() => handlePlanetClick(goal)}
                    >
                      <div
                        className="rounded-full bg-cover bg-center w-full h-full"
                        style={{
                          backgroundImage: 'url(/planet/planet-green.png)',
                        }}
                      />
                    </div>
                  </div>

                  {/* duration date */}
                  <div className="flex w-full justify-center gap-2.5 px-4 py-2.5">
                    <span className="body-1-medium text-label-neutral">
                      {goal.duration.startDate}~{goal.duration.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination flex justify-center py-4" style={{ flexDirection: 'row-reverse' }} />
      </div>

      <GoalInfoModal isOpen={isOpen} onClose={closeModal} onDelete={deleteGoal} goal={selectedGoal} status="progress" />
    </>
  );
}
