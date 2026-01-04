'use client';

import { CreateGoalForm } from '@/composite/goal/create';

export default function CreateGoalPage() {
  return (
    <main className="flex flex-1 flex-col inset-y-auto overflow-y-auto">
      <CreateGoalForm />
    </main>
  );
}
