import Image from 'next/image';
import Badge from '@/shared/components/display/Badge';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CompletedGoal } from '../type';

interface CompletedTaskBoxProps {
  completedGoal: CompletedGoal;
  isCompleted: boolean;
}
export const CompletedTaskBox = ({ completedGoal, isCompleted }: CompletedTaskBoxProps) => {
  const router = useRouter();
  const getWeeksBetween = useCallback((startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // 밀리초 차이 계산
    const diffMs = end.getTime() - start.getTime();
    // 1주일 = 7일 * 24시간 * 60분 * 60초 * 1000밀리초
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    // 올림 처리 → 중간에 걸친 주도 포함
    return Math.ceil(diffMs / weekMs);
  }, []);

  const week = getWeeksBetween(completedGoal.goal.duration.startDate, completedGoal.goal.duration.endDate);

  return (
    <div
      className={`w-full bg-[url('/interaction.png')] bg-no-repeat bg-cover bg-center flex justify-between rounded-lg ${completedGoal.goal.id && 'hover:outline-2'} outline-gray-500 px-6 py-4 bg-gray-900 shadow-xs`}
    >
      <div className="flex flex-col gap-4">
        <FlexBox className="gap-2">
          <Badge
            type={'default'}
            size={'md'}
            color={week === 4 ? 'bg-brand-neon' : week === 8 ? 'bg-accent-orange' : 'bg-accent-blue'}
            textColor="text-black"
            className="font-bold"
            label={`${week}주`}
          />
          <Badge
            type={'default'}
            color="bg-fill-normal"
            size={'md'}
            label={isCompleted ? '회고 완료' : '회고 미완료'}
          />
          <div className="py-1 px-4 bg-purple-500/20 rounded-2xl">
            <label className="label-1-normal text-sm bg-gradient-to-r from-blue-500 to-accent-pink bg-clip-text text-transparent">
              AI 분석중
            </label>
          </div>
        </FlexBox>
        <p className="heading-1-bold text-white">{completedGoal.goal.name}</p>
        <p className="label-1-normal text-label-neutral">
          {completedGoal.goal.duration.startDate} ~ {completedGoal.goal.duration.endDate}
        </p>
      </div>
      {completedGoal && (
        <Image
          src="/chevron-right.svg"
          alt="right-arrow"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => {
            const params = new URLSearchParams({
              itemData: JSON.stringify(completedGoal),
            });
            router.push(`/retrospect/completed/${completedGoal.goal.id}?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
};
