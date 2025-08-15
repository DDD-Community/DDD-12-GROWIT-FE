'use client';

import { ConfirmGoalBottomBar, CreateGoalFormFunnel } from '@/composite/create-goal';
export default function CreateGoalPage() {
  return (
    <main className="flex flex-1 flex-col">
      <CreateGoalFormFunnel confirmFooter={<ConfirmGoalBottomBar />} />
    </main>
  );
}
