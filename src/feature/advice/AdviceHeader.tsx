'use client';

import { Goal } from '@/shared/type/goal';
import { DropdownMenu, DropdownMenuItem } from '@/shared/components/dropdown-menu';
import { DropdownMenuTrigger } from '@/shared/components/dropdown-menu';
import { DropdownMenuContent } from '@/shared/components/dropdown-menu';

type AdviceHeaderProps = {
  progressGoals: Goal[];
  selectedGoal: Goal | null;
  setSelectedGoal: (goal: Goal | null) => void;
};

export const AdviceHeader = ({ progressGoals, selectedGoal, setSelectedGoal }: AdviceHeaderProps) => {
  return (
    <header className="w-full flex justify-between items-center px-5 py-4 body-1-normal text-text-strong">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="gap-x-2 flex items-center py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
            <span>{selectedGoal?.name ?? '목표 선택'}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="p-2 rounded-xl space-y-1">
          {progressGoals.map(goal => (
            <DropdownMenuItem key={goal.id} onClick={() => setSelectedGoal(goal)}>
              <GoalDropdownItem goal={goal} selectedGoal={selectedGoal} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 7v5l4 2" />
        </svg>
      </button>
    </header>
  );
};

function GoalDropdownItem({ goal, selectedGoal }: { goal: Goal; selectedGoal: Goal | null }) {
  const isSelected = selectedGoal?.id === goal.id;
  return (
    <div className="flex items-center justify-between gap-x-2 py-2 px-3 cursor-pointer">
      <p className={`${isSelected ? 'body-1-bold text-text-strong' : 'body-1-medium text-text-primary'}`}>
        {goal.name}
      </p>
      {isSelected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.0774 4.41107C16.4028 4.08563 16.9304 4.08563 17.2558 4.41107C17.5812 4.73651 17.5812 5.26402 17.2558 5.58946L8.08913 14.7561C7.76369 15.0816 7.23618 15.0816 6.91074 14.7561L2.74408 10.5895C2.41864 10.264 2.41864 9.73651 2.74408 9.41107C3.06951 9.08563 3.59703 9.08563 3.92246 9.41107L7.49994 12.9885L16.0774 4.41107Z"
            fill="#3AEE49"
          />
        </svg>
      )}
    </div>
  );
}
