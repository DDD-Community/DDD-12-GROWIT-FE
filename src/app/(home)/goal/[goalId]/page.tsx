'use client';

import { useParams } from 'next/navigation';
import Header from '@/shared/components/layout/Header';
import { GoalEditForm } from '@/composite/goal/goalEditForm';
import { GoalProvider } from '@/model/goal/context';

export default function GoalEditPage() {
  const params = useParams();
  const goalId = params.goalId as string;

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-[#1B1C1E]">
      {/* Header */}
      <Header mode="title" title="목표 설정" />

      {/* Content */}
      <div className="flex flex-1 px-6 py-5 pt-20">
        <GoalProvider goalItemOption={{ goalId }}>
          <GoalEditForm />
        </GoalProvider>
      </div>
    </div>
  );
}
