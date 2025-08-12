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
  id?: string;
  onNavigation?: () => void;
}

export const CompletedTaskBox = ({ isCompleted, content, duration, id, onNavigation }: CompletedTaskBoxProps) => {
  const router = useRouter();

  const getWeeksBetween = useCallback((startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    return Math.ceil(diffMs / weekMs);
  }, []);

  const getAnimationStyles = useCallback(() => {
    if (onNavigation) {
      return {
        container: 'cursor-pointer transition-transform hover:scale-[1.02] hover:outline-2',
        arrow: 'block',
      };
    }
    return {
      container: 'cursor-default',
      arrow: 'hidden',
    };
  }, [onNavigation]);

  const week = getWeeksBetween(duration.startDate, duration.endDate) - 1;

  const handleCardClick = () => {
    if (onNavigation) {
      onNavigation();
    } else if (id) {
      router.push(`/retrospect/${id}`);
    }
  };

  const animationStyles = getAnimationStyles();

  return (
    <div
      className={`w-full bg-[url('/interaction.png')] bg-no-repeat bg-cover bg-center flex justify-between rounded-lg outline-gray-500 px-6 py-4 bg-gray-900 shadow-xs ${animationStyles.container}`}
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
      <Image src="/chevron-right.svg" alt="right-arrow" width={24} height={24} className={`${animationStyles.arrow}`} />
    </div>
  );
};
