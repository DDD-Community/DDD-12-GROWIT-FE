'use client';

import Button from '@/shared/components/input/Button';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function EndedGoalsContainer() {
  return (
    <section>
      <PageHeader
        title="종료 목표 수집함"
        rightSection={<Button size="sm" text="편집" variant="tertiary" className="text-text-primary" />}
      />
    </section>
  );
}
