'use client';

import Button from '@/shared/components/input/Button';
import { ROUTES } from '@/shared/constants/routes';
import { useRouter } from 'next/navigation';

export const CreateGoalButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <div className={className}>
      <Button
        size="ml"
        text="목표 추가하기"
        layout="icon-left"
        icon={
          <div className="w-4 h-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        }
        onClick={() => router.push(ROUTES.CREATE_GOAL)}
      />
    </div>
  );
};
