'use client';
import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';

export const CreateGoalButton = () => {
  const router = useRouter();
  return <Button size="ml" text="목표추가하기" onClick={() => router.push('/home/create-goal')} />;
};
