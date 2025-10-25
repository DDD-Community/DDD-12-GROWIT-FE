'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { GrorongCard } from '@/feature/home/GrorongCard';
import { AIMentorCard } from '@/feature/home/AIMentorCard';
import { useGoalSelector } from '@/model/goal/context';
import { useAIMentorAdvice } from '@/model/aiMentor/context';
import { useGrorongAdvice } from './hooks';

export const CheerMessageCard = ({ type }: { type: 'grorong' | 'aiMentor' }) => {
  const { currentGoal } = useGoalSelector();
  const { advice } = useGrorongAdvice();
  const { aiMentorAdvice } = useAIMentorAdvice();

  const renderCard = () => {
    if (type === 'grorong' && advice) {
      return <GrorongCard mood={advice?.mood} message={advice?.message} saying={advice?.saying} />;
    }
    if (type === 'aiMentor' && currentGoal?.mentor && aiMentorAdvice) {
      return <AIMentorCard aiMentor={currentGoal?.mentor} aiMentorAdvice={aiMentorAdvice} />;
    }
    return null;
  };

  return <div className="relative">{renderCard()}</div>;
};
