'use client';

import GoalEditFormContent from '@/composite/goal/edit';
import { useParams } from 'next/navigation';

export default function GoalEditRouteClient() {
  const { goalId } = useParams<{ goalId: string }>();
  return <GoalEditFormContent goalId={goalId} />;
}
