'use client';

import { CreateGoalFormFunnel } from '@/composite/create-goal';

export default function CreateGoalPage() {
  return (
    <main className="flex flex-1 flex-col inset-y-auto overflow-y-auto">
      <CreateGoalFormFunnel />
    </main>
  );
}
