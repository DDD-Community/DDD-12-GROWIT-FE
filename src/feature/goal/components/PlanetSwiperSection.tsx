import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import { useGoalSelector } from '@/model/goal/context';
import { useMemo } from 'react';
import { Goal } from '@/shared/type/goal';
import { CreateGoalButton } from './CreateGoalButton';
import { PlanetSwiperItem } from './PlanetSwiperItem';

export const PlanetSwiperSection = () => {
  const { progressGoals, setCurrentGoal } = useGoalSelector();

  // 목표 리스트에 '목표 추가' 섹션을 포함한 배열 생성
  const goalsWithAddGoalSlot: (Goal | 'add-goal-section')[] = useMemo(() => {
    return [...progressGoals, 'add-goal-section'];
  }, [progressGoals]);

  const handleSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;
    const activeGoal = progressGoals[activeIndex];
    setCurrentGoal(activeGoal);
  };

  return (
    <section className="space-y-4">
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
              <PlanetSwiperItem goal={goal} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="custom-pagination flex justify-center gap-x-2" />
    </section>
  );
};
