'use client';

import GoalEditFormContent from '@/composite/goal/edit';
import { useSearchParams } from 'next/navigation';

export default function GoalEditRouteClient() {
  const goalId = useSearchParams().get('goalId') ?? '';
  return <GoalEditFormContent goalId={goalId} />;
}
