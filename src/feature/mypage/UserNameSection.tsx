'use client';

import { useUser } from '@/shared/hooks/useUser';
import { Suspense } from 'react';

export function UserNameSection() {
  return (
    <Suspense fallback={<UserNameSkeleton />}>
      <UserName />
    </Suspense>
  );
}

function UserName() {
  const { userInfo } = useUser();
  return <h2 className="heading-2-bold text-text-strong">{userInfo?.name}</h2>;
}

function UserNameSkeleton() {
  return <div className="w-32 h-7 bg-fill-secondary animate-pulse rounded" />;
}
