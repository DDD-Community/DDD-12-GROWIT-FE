import GoalEditFormController from '@/composite/goal/edit';
import { notFound } from 'next/navigation';

type GoalEditPageProps = {
  params: Promise<{ goalId: string }>;
};

export default async function GoalEditPage({ params }: GoalEditPageProps) {
  const resolvedParams = await params;
  const goalId = resolvedParams.goalId;

  if (!goalId || goalId === 'null' || goalId === undefined) notFound();

  return <GoalEditFormController goalId={goalId} />;
}
