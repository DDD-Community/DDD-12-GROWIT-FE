'use client';

import { PageHeader } from '@/shared/components/layout/PageHeader';

export default function AdviceHistoryPage() {
  return (
    <>
      <PageHeader title="히스토리" />
      <main className="flex flex-col h-full p-5 gap-y-5 max-w-md w-full mx-auto">
        <div className="flex flex-col gap-y-2">
          <p className="label-1-medium text-text-primary">2025년11월</p>
          <ul className="flex flex-col gap-y-2 label-1-normal text-text-primary">
            <AdviceHistoryItem />
            <AdviceHistoryItem />
            <AdviceHistoryItem />
          </ul>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="label-1-medium text-text-primary">2025년12월</p>
          <ul className="flex flex-col gap-y-2 label-1-normal text-text-primary">
            <AdviceHistoryItem />
            <AdviceHistoryItem />
          </ul>
        </div>
      </main>
    </>
  );
}

function AdviceHistoryItem() {
  return (
    <li className="bg-fill-normal rounded-lg py-4 px-5 truncate">
      좋은 아침! 작은 한 걸음이 모여 결국 포트폴리오가 돼, 오늘도 충분히 잘 가고 있어.
    </li>
  );
}
