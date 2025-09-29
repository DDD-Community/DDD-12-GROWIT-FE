'use client';
import Button from '@/shared/components/input/Button';
import { useRouter } from 'next/navigation';

interface CreateGoalButtonProps {
  icon?: React.ReactNode;
  className?: string;
}
export const CreateGoalButton = ({ icon, className }: CreateGoalButtonProps) => {
  const router = useRouter();
  return (
    <div className={className}>
      <Button
        size="ml"
        text="목표 추가"
        onClick={() => router.push('/home/create-goal')}
        layout={`${icon ? 'icon-right' : 'normal'}`}
        icon={icon}
      />
    </div>
  );
};
