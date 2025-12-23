import Image from 'next/image';
import { CreateGoalButton } from '@/feature/goal';

export default function CreateNewGoal() {
  return (
    <div className="relative flex flex-col items-center justify-center px-5">
      <div className="w-40 h-40">
        <Image
          src="/goal/goal-empty.svg"
          alt="Goal Empty"
          width={160}
          height={160}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-label-neutral text-center">
          진행중인 목표가 없습니다. <br /> 목표를 추가해주세요.
        </p>
        <div className="w-36">
          <CreateGoalButton />
        </div>
      </div>
    </div>
  );
}
