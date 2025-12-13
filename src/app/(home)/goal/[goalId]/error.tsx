'use client';

import { useRouter } from 'next/navigation';
import Button from '@/shared/components/input/Button';
import { ROUTES } from '@/shared/constants/routes';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1B1C1E] px-6">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        <h2 className="headline-1-bold text-text-strong text-center">목표를 찾을 수 없습니다</h2>
        <p className="body-1-normal text-label-neutral text-center">{error.message || '유효하지 않은 접근입니다.'}</p>
        <div className="flex flex-col gap-3 w-full">
          <Button size="xl" text="목표 목록으로 돌아가기" onClick={() => router.push(ROUTES.GOAL)} />
        </div>
      </div>
    </div>
  );
}
