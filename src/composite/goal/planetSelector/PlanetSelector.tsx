'use client';

import Badge from '@/shared/components/display/Badge';
import { CreateGoalButton, GoalInfoModal, useGoalInfoModal } from '@/feature/goal';
import { Goal, GoalCategoryEnum } from '@/shared/type/goal';
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

  const getGoalStatus = (goal: Goal) => {
    const today = new Date();
    const endDate = new Date(goal.duration.endDate);
    return today > endDate ? '종료' : '진행중';
  };

  const getBadgeProps = (goal: Goal) => {
    const status = getGoalStatus(goal);

    if (status === '종료') {
      return {
        label: '종료',
        color: 'bg-[rgba(112,115,124,0.22)]',
        textColor: 'text-[rgba(194,196,200,0.88)]',
      };
    } else {
      return {
        label: '진행중',
        color: 'bg-[rgba(53,217,66,0.4)]',
        textColor: 'text-[#3AEE49]',
      };
    }
  };

  const getPlanetImage = (goal: Goal) => {
    switch (goal.category) {
      case GoalCategoryEnum.STUDY:
        return '/planet/planet-green.png';
      case GoalCategoryEnum.FINANCE:
        return '/planet/planet-orange.png';
      case GoalCategoryEnum.IT_PROJECT:
        return '/planet/planet-blue.png';
      default:
        return '/planet/planet-green.png';
    }
  };

  if (goalList && goalList.length === 0) {
    return (
      <div className="relative space-y-4 py-62 my-auto">
        <p className="text-label-neutral text-center">진행중인 목표가 없습니다.</p>
        <div className="w-[113px] mx-auto">
          <CreateGoalButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative mt-10">
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
          {goalList.map(goal => {
            const badgeProps = getBadgeProps(goal);
            const status = getGoalStatus(goal);
            return (
              <SwiperSlide key={goal.id}>
                <div className="h-full w-full">
                  <div className="gap-5 w-full">
                    {/* Header */}
                    <div className="px-2.5 py-2.5 w-full space-y-3">
                      <div className="flex w-full justify-center">
                        <Badge
                          type="default"
                          size="md"
                          label={badgeProps.label}
                          color={badgeProps.color}
                          textColor={badgeProps.textColor}
                          className={status === '종료' ? 'px-3 py-1 rounded-2xl' : ''}
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
                            backgroundImage: `url(${getPlanetImage(goal)})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* duration date */}
                    <div className="flex w-full justify-center gap-2.5 px-4 py-2.5">
                      <span className="body-1-medium text-label-neutral">
                        {(() => {
                          const startDate = goal.duration.startDate;
                          const endDate = goal.duration.endDate;
                          // TODO : Swiper 에 dir="rtl" 를 적용하며 발생한 문제를 해결
                          return `${endDate}~${startDate}`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="custom-pagination flex justify-center py-4" style={{ flexDirection: 'row-reverse' }} />
      </div>

      <GoalInfoModal isOpen={isOpen} onClose={closeModal} onDelete={deleteGoal} goal={selectedGoal} />
    </>
  );
}
