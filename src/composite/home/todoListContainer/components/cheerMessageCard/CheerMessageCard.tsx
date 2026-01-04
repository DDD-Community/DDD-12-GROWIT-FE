'use client';

import { GrorongCard } from '@/feature/home/GrorongCard';
import { AIMentorCard } from '@/feature/home/AIMentorCard';
import { useAIMentorAdvice } from '@/model/aiMentor/context';
import { useGrorongAdvice } from './hooks';
import { AttendanceStreakPopup } from '@/feature/todo/weeklyTodoList/components/AttendanceStreakPopup';

export const CheerMessageCard = ({ type }: { type: 'grorong' | 'aiMentor' }) => {
  const { advice } = useGrorongAdvice();
  const { aiMentorAdvice } = useAIMentorAdvice();

  const renderCard = () => {
    if (type === 'grorong' && advice) {
      return <GrorongCard mood={advice?.mood} message={advice?.message} saying={advice?.saying} />;
    }
    if (type === 'aiMentor' && aiMentorAdvice) {
      return <AIMentorCard aiMentor="TIM_COOK" aiMentorAdvice={aiMentorAdvice} />;
    }
    return null;
  };

  return (
    <div className="relative">
      {renderCard()}
      {type === 'grorong' && advice?.mood && <AttendanceStreakPopup mood={advice.mood} />}
    </div>
  );
};
