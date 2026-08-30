import { LastWeeklyPlans } from '@/composite/retrospect/detail/components/LastWeeklyPlans';

export function generateStaticParams() {
  return [{ id: '_' }];
}

export default function LastWeeklyRetrospectPage() {
  return <LastWeeklyPlans />;
}
