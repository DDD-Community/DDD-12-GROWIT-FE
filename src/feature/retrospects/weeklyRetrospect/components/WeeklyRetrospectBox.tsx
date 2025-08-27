import Image from 'next/image';
import FlexBox from '@/shared/components/foundation/FlexBox';
import Badge from '@/shared/components/display/Badge';
import { TextArea } from '@/shared/components/input/TextArea';
import Button from '@/shared/components/input/Button';
import { useMemo, useState } from 'react';
import { Plan, Retrospect } from '@/composite/retrospect/type';
import { MissedWeeklyRetrospectBox } from './MissedWeeklyRetrospectBox';
import { LockedWeeklyRetrospectBox } from './LockedWeeklyRetrospectBox';
import { postAddRetrospect } from '../../addRetroSpect/api';

interface WeeklyRetrospectBoxProps {
  goalId?: string | undefined;
  retrospect: Retrospect | null;
  plan: Plan;
  isCurrentWeek: boolean;
  isPassedWeek: boolean; // 새로 추가된 prop
  updateWeeklyRetrospect: (weeklyRetrospectId: string, newRetrospect: string) => Promise<void>;
}

export const WeeklyRetrospectBox = ({
  goalId,
  retrospect,
  plan,
  isCurrentWeek,
  isPassedWeek,
  updateWeeklyRetrospect,
}: WeeklyRetrospectBoxProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [weeklyRetrospect, setWeeklyRetrospect] = useState(retrospect ? retrospect.content : '');

  const isWeeklyRetrospectCompleted = useMemo(() => {
    return retrospect !== null && retrospect.content.length;
  }, [retrospect]);

  // 상태 분기 로직
  const retrospectiveState = useMemo(() => {
    // 1. 회고가 작성된 경우
    if (isWeeklyRetrospectCompleted) {
      return 'WRITTEN';
    }
    // 2. 현재 주차인 경우 (미작성)
    if (isCurrentWeek) {
      return 'CURRENT_PENDING';
    }
    // 3. 지나간 주차인 경우 (미작성)
    if (isPassedWeek) {
      return 'MISSED';
    }
    // 4. 미래 주차인 경우
    return 'FUTURE';
  }, [isWeeklyRetrospectCompleted, isCurrentWeek, isPassedWeek]);

  // 각 상태별 컴포넌트 렌더링
  switch (retrospectiveState) {
    case 'MISSED':
      return <MissedWeeklyRetrospectBox goalId={goalId} plan={plan} />;
    case 'FUTURE':
      return <LockedWeeklyRetrospectBox week={plan.weekOfMonth} weeklyGoal={plan.content} />;
    case 'WRITTEN':
    case 'CURRENT_PENDING':
    default:
      break;
  }

  const handleUpdateRetrospect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 이미 작성된 경우에는 수정 (회고 데이터가 존재)
    if (retrospect) {
      await updateWeeklyRetrospect(retrospect.id, weeklyRetrospect);
    }
    // 처음 작성하는 경우에는 새로운 회고 생성 (회고 데이터가 존재하지 않음)
    else if (goalId) {
      await postAddRetrospect({ goalId: goalId, planId: plan.id, content: weeklyRetrospect });
    }
    setIsEditable(false);
  };

  return (
    <div
      className={`relative flex gap-3 flex-1 w-full bg-elevated-normal py-5 px-6 rounded-lg mt-4 shadow-xs ${plan.isCurrentWeek ? 'border border-white/50' : ''}`}
    >
      {/* 왼쪽 아이콘 + 선 */}
      <div className="flex flex-col items-center gap-4">
        {isWeeklyRetrospectCompleted ? (
          <Image src="/checked.svg" alt="checked" width={32} height={32} />
        ) : (
          <div className="heading-2-bold border border-label-normal text-label-normal py-1 px-3 rounded-full">
            {plan.weekOfMonth}
          </div>
        )}

        <div className={`bg-line-normal w-0.5`}></div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col flex-1 gap-4 pt-1">
        <FlexBox className="gap-2">
          <p className="headline-1-bold text-label-normal">{plan.weekOfMonth}주차</p>
          <Badge
            type="default"
            size="sm"
            textColor={isWeeklyRetrospectCompleted ? 'text-label-neutral' : 'text-brand-neon'}
            color={isWeeklyRetrospectCompleted ? 'bg-fill-normal' : 'bg-green-500/20'}
            label={isWeeklyRetrospectCompleted ? '작성완료' : '진행 중'}
          />
        </FlexBox>
        <FlexBox className="w-full rounded-lg gap-4 body-1-bold">
          <span className="text-label-alternative">주차 목표</span>
          <span className="text-label-neutral body-1-normal">"{plan.content}"</span>
        </FlexBox>
        {retrospect && !isEditable ? (
          <p className="body-1-normal text-label-neutral">{retrospect.content}</p>
        ) : (
          <form className="flex flex-col gap-2 w-full" onSubmit={handleUpdateRetrospect}>
            <TextArea
              placeholder="회고 내용을 작성해주세요."
              className="min-h-[100px]"
              value={weeklyRetrospect}
              onChange={e => setWeeklyRetrospect(e.target.value)}
              onClick={e => e.preventDefault()}
            />
            <FlexBox className="ml-auto w-[72px]">
              <Button size="sm" text="완료" variant="tertiary" />
            </FlexBox>
          </form>
        )}

        {isWeeklyRetrospectCompleted && !isEditable && (
          <button
            onClick={() => setIsEditable(true)}
            className="absolute bottom-4 right-4 p-2 rounded-2xl w-[36px] bg-label-button-neutral hover:bg-gray-600 border border-line-normal cursor-pointer"
          >
            <Image src="/pen.svg" alt="correct" width={20} height={20} />
          </button>
        )}
      </div>
    </div>
  );
};
