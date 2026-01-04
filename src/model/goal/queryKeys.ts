export const GoalQueryKeys = {
  all: () => ['goals'],
  progress: () => ['progressGoalList'],
  ended: () => ['endedGoalList'],
  byId: (goalId: string) => ['goal', goalId],
} as const;
