import { Suspense } from 'react';
import GoalEditRouteClient from './route-client';

function GoalEditRouteFallback() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-bg-default">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
    </div>
  );
}

export default function GoalEditPage() {
  return (
    <Suspense fallback={<GoalEditRouteFallback />}>
      <GoalEditRouteClient />
    </Suspense>
  );
}
