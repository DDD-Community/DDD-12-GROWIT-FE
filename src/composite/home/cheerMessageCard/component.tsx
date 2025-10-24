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
import { useEffect, useState } from 'react';

export const CheerMessageCard = () => {
  const { currentGoal } = useGoalSelector();
  const { advice } = useGrorongAdvice();
  const { aiMentorAdvice } = useAIMentorAdvice();
  const [slideOrder, setSlideOrder] = useState<number[]>([]);

  useEffect(() => {
    const order = [0, 1].sort(() => Math.random() - 0.5);
    setSlideOrder(order);
  }, []);

  const slides = [
    {
      id: 'grorong',
      component: advice && <GrorongCard mood={advice.mood} message={advice.message} saying={advice.saying} />,
    },
    {
      id: 'aiMentor',
      component: currentGoal && aiMentorAdvice && (
        <AIMentorCard aiMentor={currentGoal.mentor} aiMentorAdvice={aiMentorAdvice} />
      ),
    },
  ];

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
        {slideOrder.map(index => (
          <SwiperSlide key={index}>{slides[index].component}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
