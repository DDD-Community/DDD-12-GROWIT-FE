import FlexBox from '@/shared/components/foundation/FlexBox';
import { CircularProgress } from '@/shared/components/display/CircluarProgress';

interface WeekCircleProps {
  dayOfWeek: string;
  progress: any;
  date: string;
}

export const WeekCircle = ({ dayOfWeek, progress, date }: WeekCircleProps) => {
  return (
    <FlexBox direction="col" className="gap-2">
      <div className="relative">
        {/* 원형 진행률 표시기 */}
        <CircularProgress progress={progress} dayOfWeek={dayOfWeek} />
      </div>

      {/* 날짜 라벨 */}
      <label className="text-sm font-bold text-gray-600">{date}</label>
    </FlexBox>
  );
};
