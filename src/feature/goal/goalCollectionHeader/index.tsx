'use client';

import Button from '@/shared/components/input/Button';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export const GoalCollectionHeader = () => {
  return <PageHeader title="행성 수집함" rightSection={<EditGoalButton />} />;
};

const EditGoalButton = () => {
  return <Button size="sm" text="편집" variant="tertiary" className="text-text-primary" />;
};
