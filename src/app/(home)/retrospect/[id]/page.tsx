import { WeeklyRetrospectPage } from '@/composite/retrospect/weeklyRetrospect/component';

interface WeeklyRetrospectPageProps {
  params: {
    id: string;
  };
  searchParams: {
    goalId?: string;
    planId?: string;
  };
}

const WeeklyRetrospectPageRoute = ({ params, searchParams }: WeeklyRetrospectPageProps) => {
  const isNewRetrospect = params.id === 'new-retrospect';

  if (isNewRetrospect) {
    return <WeeklyRetrospectPage retrospectId="new" goalId={searchParams.goalId} planId={searchParams.planId} />;
  }

  return <WeeklyRetrospectPage retrospectId={params.id} />;
};

export default WeeklyRetrospectPageRoute;
