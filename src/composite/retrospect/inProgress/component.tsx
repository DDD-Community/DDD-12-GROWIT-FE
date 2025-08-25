'use client';

import { WeeklyRetrospect } from '@/feature/retrospects/weeklyRetrospect/component';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useWeeklyRetrospect } from '../hooks';
import { CreateGoalButton } from '@/feature/goal';
import { WeeklyGoalBanner } from '@/feature/goal/weeklyGoalBanner';
import { useGoalSelector } from '@/model/goal/context';
import { RetrospectLocked } from './components/RetrospectLocked';

export const InProgress = () => {
  const { currentGoal } = useGoalSelector();
  /** 
  /* @deprecated - 진행중인 목표 중복 조회 대신에 context기반 useGoalSelector훅을 통해 현재 진행형 목표 조회로 교체
   */
  // const [ingGoal, setIngGoal] = useState<Goal | null>(null);
  // const [goalId, setGoalId] = useState<string>('');

  // // 1. Goal과 Duration 가져오기
  // useEffect(() => {
  //   const fetchGoal = async () => {
  //     const res = await getProgressRetrospect();
  //     const currentGoal = res.data[0];
  //     if (currentGoal) {
  //       setIngGoal(currentGoal);
  //       setGoalId(currentGoal.id);
  //     }
  //   };
  //   fetchGoal();
  // }, []);

  // goalId를 useWeeklyRetrospect에 전달
  const { weeklyRetrospect, plans, updateWeeklyRetrospect } = useWeeklyRetrospect(
    currentGoal !== null ? currentGoal.id : null
  );

  return (
    <>
      {currentGoal ? (
        <>
          <WeeklyGoalBanner goal={currentGoal} />
          <RetrospectLocked />
          <WeeklyRetrospect
            weeklyRetrospect={weeklyRetrospect}
            plans={plans}
            updateWeeklyRetrospect={updateWeeklyRetrospect}
          />
        </>
      ) : (
        <FlexBox direction="col" className="justify-center space-y-4">
          <p className="text-label-neutral">진행중인 목표가 없습니다</p>
          <div className="w-[113px]">
            <CreateGoalButton />
          </div>
        </FlexBox>
      )}
    </>
  );
};
