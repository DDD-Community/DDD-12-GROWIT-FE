'use client';

import Image from 'next/image';
import { StackNavButton } from '@/shared/components/feedBack/StackNavButton';
import { ROUTES } from '@/shared/constants/routes';

export const EndedGoalsNavButton = () => {
  return (
    <StackNavButton
      href={ROUTES.ENDED_GOALS}
      className="flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer"
    >
      <Image src="/goal/earth-icon.png" alt="Goal Collection Nav Button" width={50} height={50} />
      <span className="label-2-medium text-label-normal text-center">
        종료 목표 <br />
        수집함
      </span>
    </StackNavButton>
  );
};
