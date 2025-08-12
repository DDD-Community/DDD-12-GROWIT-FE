import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Badge from '@/shared/components/display/Badge';
import FlexBox from '@/shared/components/foundation/FlexBox';
import { useCallback } from 'react';

interface Duration {
  startDate: string;
  endDate: string;
}
interface CompletedTaskBoxProps {
  isCompleted: boolean;
  content: string;
  duration: Duration;
  id?: string; // id prop 추가
}
export const CompletedTaskBox = ({ isCompleted, content, duration, id }: CompletedTaskBoxProps) => {
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

  const week = getWeeksBetween(duration.startDate, duration.endDate) - 1; // 시작 주는 제외

  const handleCardClick = () => {
    if (id) {
      router.push(`/retrospect/${id}`);
    }
  };

  return (
    <div
      className="md:w-[700px] bg-[url('/interaction.png')] bg-no-repeat bg-cover bg-center flex justify-between rounded-lg hover:outline-2 outline-gray-500 px-6 py-4 bg-gray-900 shadow-xs cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={handleCardClick}
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
        <p className="heading-1-bold text-white">{content}</p>
        <p className="label-1-normal text-label-neutral">
          {duration.startDate} ~ {duration.endDate}
        </p>
      </div>
      <Image src="/chevron-right.svg" alt="right-arrow" width={24} height={24} className="cursor-pointer" />
    </div>
  );
};
