'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { GrorongCard } from '@/feature/home/GrorongCard';
import { AIMentorCard } from '@/feature/home/AIMentorCard';
import { useGoalSelector } from '@/model/goal/context';
import { useGrorongAdvice } from './hooks';
import { useAIMentorAdvice } from '@/model/aiMentor/context';
//import { useFetchUserName } from '@/shared/hooks';

export const CheerMessageCard = () => {
  const { currentGoal } = useGoalSelector();
  const { advice } = useGrorongAdvice();
  const { aiMentorAdvice } = useAIMentorAdvice();
  //const { fullUserName } = useFetchUserName();

  return (
    <div className="relative">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide>
          {advice && <GrorongCard mood={advice.mood} message={advice.message} saying={advice.saying} />}
        </SwiperSlide>
        <SwiperSlide>
          {currentGoal && aiMentorAdvice && (
            <AIMentorCard aiMentor={currentGoal.mentor} aiMentorAdvice={aiMentorAdvice} />
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
