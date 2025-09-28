import { WeeklyRetrospectPage } from '@/composite/retrospect/weeklyRetrospect/component';

interface WeeklyRetrospectPageProps {
  params: {
    id: string;
  };
  searchParams: {
    goalId?: string;
    planId?: string;
    weekIndex?: string;
  };
}

const WeeklyRetrospectPageRoute = ({ params, searchParams }: WeeklyRetrospectPageProps) => {
  const isNewRetrospect = params.id === 'new-retrospect';

  if (isNewRetrospect) {
    return (
      <WeeklyRetrospectPage
        retrospectId="new"
        goalId={searchParams.goalId}
        planId={searchParams.planId}
        weekIndex={searchParams.weekIndex}
      />
    );
  }

  return <WeeklyRetrospectPage retrospectId={params.id} weekIndex={searchParams.weekIndex} />;
};

export default WeeklyRetrospectPageRoute;
