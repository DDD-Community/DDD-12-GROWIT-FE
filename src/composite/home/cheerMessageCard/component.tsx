'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
//import { useFetchUserName } from '@/shared/hooks';
//import { useCheerMessage } from './hooks';
import { GrorongCard } from '@/feature/home/GrorongCard';
import { AIMentorCard } from '@/feature/home/AIMentorCard';
import { useGoalSelector } from '@/model/goal/context';

export const CheerMessageCard = () => {
  const { currentGoal } = useGoalSelector();
  //const { fullUserName } = useFetchUserName();
  //const { cheerMessage } = useCheerMessage();

  //const displayMessage = cheerMessage?.message || '최고의 아이디어는 종종 테이블 위의 커피 잔 옆에서 나온다냥!';

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
          <GrorongCard intimacyLevel="하" />
        </SwiperSlide>
        <SwiperSlide>
          <AIMentorCard aiMentor="kongqiu" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
