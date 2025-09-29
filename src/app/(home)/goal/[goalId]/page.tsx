'use client';

import { useParams } from 'next/navigation';

export default function GoalEditPage() {
  const params = useParams();
  const goalId = params.goalId;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">목표 수정 페이지</h1>
      <p className="text-gray-600">Goal ID: {goalId}</p>
      <p className="text-sm text-gray-500 mt-2">이 페이지는 아직 구현 중입니다.</p>
    </div>
  );
}
