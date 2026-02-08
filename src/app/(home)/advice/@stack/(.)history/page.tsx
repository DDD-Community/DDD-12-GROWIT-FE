import { AdviceHistoryClient } from '@/composite/advice/history';
import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function AdviceHistoryPage() {
  return (
    <div className="w-full h-[calc(100svh-64px)] flex flex-col bg-normal relative">
      <PageHeader title="히스토리" />
      <main className="flex-1 min-h-0 overflow-y-auto gap-y-5 w-full">
        <AdviceHistoryClient />
      </main>
    </div>
  );
}
