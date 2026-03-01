'use client';

import { AdviceQuery } from '@/model/advice/queries';
import Button from '@/shared/components/input/Button';
import { getMsUntilEndOfDay } from '@/shared/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function AdviceErrorPage() {
  const msUntilEndOfDay = useMemo(() => getMsUntilEndOfDay(), []);
  const router = useRouter();
  const { refetch } = useQuery(
    AdviceQuery.getAdviceChat({
      staleTime: msUntilEndOfDay,
      gcTime: msUntilEndOfDay,
    })
  );

  const handleRetry = () => {
    refetch();
    router.replace('/advice');
  };

  return (
    <div className="relative h-full flex flex-col items-center justify-center px-5">
      <Image src="/goal/goal-empty.svg" alt="Goal Empty" width={160} height={160} className="w-40 h-40" priority />
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-label-neutral text-center">
          조언을 불러오는 중 오류가 발생했어요. <br />
        </p>
        <div className="w-36">
          <Button text="다시 시도" onClick={handleRetry} size={'sm'} />
        </div>
      </div>
    </div>
  );
}
