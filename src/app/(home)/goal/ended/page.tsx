import EndedGoalsContainer from '@/composite/goal/endedGoalsContainer';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function EndedGoalsPage() {
  return (
    <Suspense fallback={<EndedGoalsListLoader />}>
      <EndedGoalsContainer />
    </Suspense>
  );
}

function EndedGoalsListLoader() {
  return (
    <div>
      <nav className="px-2 pt-8 pb-4 w-full border-b border-line-normal flex items-center justify-center">
        <div className="h-8 bg-elevated-normal rounded w-1/3" />
      </nav>
      <div className="p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-elevated-normal rounded w-1/3" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-elevated-normal rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
