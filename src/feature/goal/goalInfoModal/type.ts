import { Goal } from '@/shared/type/goal';

export interface GoalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal;
  status?: 'progress' | 'completed' | 'pending';
}

export interface GoalInfoModalActions {
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
}
