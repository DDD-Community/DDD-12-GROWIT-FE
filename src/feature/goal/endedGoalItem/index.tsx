import { Goal } from '@/shared/type/goal';
import Image from 'next/image';
import { DAY_LABELS } from '../../../model/todo/selectedDay/const';

type EndedGoalItemProps = {
  goal: Goal;
};
export const EndedGoalItem = ({ goal }: EndedGoalItemProps) => {
  return (
    <li className="flex flex-col gap-4">
      <div className="bg-elevated-normal rounded-[10px] ">
        <Image
          id="ended-goal-image"
          src="/goal/goal-progress.png"
          width={100}
          height={100}
          alt={goal.name}
          className="object-cover"
          priority
        />
        <label htmlFor="ended-goal-image" className="caption-1-regular text-text-secondary">
          {goal.duration.startDate} ~ {goal.duration.endDate}
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="body-2-bold text-text-strong">{goal.name}</h3>
        <p className="label-1-normal text-text-tertiary">
          {goal.duration.startDate} ~ {goal.duration.endDate}
        </p>
        <p className="label-1-normal text-text-primary">
          투두 완료율: <span className="label-1-bold text-text-brand-neon">15%</span>
        </p>
      </div>
    </li>
  );
};
