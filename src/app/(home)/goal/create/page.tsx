'use client';

import { CreateGoalForm } from '@/composite/create-goal/component';

export default function CreateGoalPage() {
  return (
    <main className="flex flex-1 flex-col inset-y-auto overflow-y-auto">
      <CreateGoalForm />
    </main>
  );
}
