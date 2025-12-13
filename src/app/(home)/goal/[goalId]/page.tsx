import GoalEditFormContainer from '@/composite/goal/goalEditForm/GoalEditForm';
import { notFound } from 'next/navigation';

type GoalEditPageProps = {
  params: Promise<{ goalId: string }>;
};

export default async function GoalEditPage({ params }: GoalEditPageProps) {
  const resolvedParams = await params;
  const goalId = resolvedParams.goalId;

  if (!goalId || goalId === 'null' || goalId === undefined) notFound();

  return <GoalEditFormContainer goalId={goalId} />;
}
