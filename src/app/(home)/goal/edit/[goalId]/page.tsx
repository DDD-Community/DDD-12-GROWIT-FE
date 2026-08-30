import GoalEditRouteClient from './route-client';

export function generateStaticParams() {
  return [{ goalId: '_' }];
}

export default function GoalEditPage() {
  return <GoalEditRouteClient />;
}
