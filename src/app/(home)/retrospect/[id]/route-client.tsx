'use client';

import { WeeklyRetrospectPage } from '@/composite/retrospect/weeklyRetrospect/component';
import { useParams, useSearchParams } from 'next/navigation';

export default function RetrospectRouteClient() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const weekIndex = searchParams.get('weekIndex') ?? undefined;

  if (id === 'new-retrospect') {
    return (
      <WeeklyRetrospectPage
        retrospectId="new"
        goalId={searchParams.get('goalId') ?? undefined}
        planId={searchParams.get('planId') ?? undefined}
        weekIndex={weekIndex}
      />
    );
  }

  return <WeeklyRetrospectPage retrospectId={id} weekIndex={weekIndex} />;
}
