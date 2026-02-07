'use client';

import { useFetchUserName } from '@/shared/hooks';

export function DisplayUserName() {
  const { userName } = useFetchUserName();
  return <h2 className="heading-2-bold text-text-strong">{userName}</h2>;
}
