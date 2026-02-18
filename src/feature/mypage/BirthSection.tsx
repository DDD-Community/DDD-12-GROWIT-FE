'use client';

import { Suspense } from 'react';
import { useUser } from '@/shared/hooks/useUser';

export const BirthSection = () => {
  return (
    <Suspense fallback={<BirthSectionSkeleton />}>
      <BirthSectionContent />
    </Suspense>
  );
};
export const BirthSectionContent = () => {
  const { userInfo } = useUser();

  const birthDate = userInfo?.saju?.birth || '-';
  const birthHour = userInfo?.saju?.birthHour || '-';

  return (
    <section className="bg-fill-secondary grid grid-cols-[1fr_1fr] divide-x divide-border-primary rounded-xl w-full">
      <div className="py-4 px-5 space-y-1 label-1-medium">
        <p className="text-text-primary">생년월일</p>
        <p className="text-text-strong">{birthDate}</p>
      </div>

      <div className="py-4 px-5 space-y-1 label-1-medium">
        <p className="text-text-primary">태어난 시각</p>
        <p className="text-text-strong">{birthHour}</p>
      </div>
    </section>
  );
};

export const BirthSectionSkeleton = () => {
  return <div className="bg-fill-secondary animate-pulse min-h-16 rounded-xl w-full" />;
};
