'use client';

import { useQuery } from '@tanstack/react-query';
import { GrorongCard } from '@/feature/home/GrorongCard';
import { AIMentorCard } from '@/feature/home/AIMentorCard';
import { useAIMentorAdvice } from '@/model/aiMentor/context';
import { AdviceQuery } from '@/model/advice/queries';
import { AttendanceStreakPopup } from '@/feature/todo/weeklyTodoList/components/AttendanceStreakPopup';

/**
 * @deprecated HomeBanner 컴포넌트를 사용해주세요.
 * @see {@link @/composite/home/homeBanner/HomeBanner}
 */
export const CheerMessageCard = ({ type }: { type: 'grorong' | 'aiMentor' }) => {
  const { data: advice } = useQuery(AdviceQuery.getGrorongAdvice());
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
