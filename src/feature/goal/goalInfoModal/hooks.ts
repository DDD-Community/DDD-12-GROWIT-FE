import { useState, useCallback } from 'react';
import { Goal } from '@/shared/type/goal';
import { GoalInfoModalActions } from './type';

export function useGoalInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);

  const openModal = useCallback((goal: Goal) => {
    setSelectedGoal(goal);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedGoal(undefined);
  }, []);

  const handleEdit = useCallback(
    (goal: Goal) => {
      // TODO: Implement edit functionality
      console.log('Edit goal:', goal);
      closeModal();
    },
    [closeModal]
  );

  const handleDelete = useCallback(
    (goalId: string) => {
      // TODO: Implement delete functionality
      console.log('Delete goal:', goalId);
      closeModal();
    },
    [closeModal]
  );

  const actions: GoalInfoModalActions = {
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return {
    isOpen,
    selectedGoal,
    openModal,
    closeModal,
    actions,
  };
}
