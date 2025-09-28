import { WeeklyRetrospectPage } from '@/composite/retrospect/weeklyRetrospect/component';

interface WeeklyRetrospectPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    goalId?: string;
    planId?: string;
    weekIndex?: string;
  }>;
}

const WeeklyRetrospectPageRoute = async ({ params, searchParams }: WeeklyRetrospectPageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isNewRetrospect = resolvedParams.id === 'new-retrospect';

  if (isNewRetrospect) {
    return (
      <WeeklyRetrospectPage
        retrospectId="new"
        goalId={resolvedSearchParams.goalId}
        planId={resolvedSearchParams.planId}
        weekIndex={resolvedSearchParams.weekIndex}
      />
    );
  }

  return <WeeklyRetrospectPage retrospectId={resolvedParams.id} weekIndex={resolvedSearchParams.weekIndex} />;
};

export default WeeklyRetrospectPageRoute;
