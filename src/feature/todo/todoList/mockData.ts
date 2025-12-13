import { GoalTodo } from '@/shared/type/GoalTodo';

export const MOCK_TODOS: GoalTodo[] = [
  {
    id: '1',
    goal: {
      id: 'goal-1',
      name: 'Growit Project',
    },
    date: '2025-06-30',
    content: 'Review Figma design',
    routine: {
      duration: {
        startDate: '2025-06-23',
        endDate: '2025-07-20',
      },
      repeatType: 'DAILY',
    },
    isCompleted: false,
  },
  {
    id: '2',
    goal: {
      id: 'goal-1',
      name: 'Growit Project',
    },
    date: '2025-06-30',
    content: 'Implement TodoCard component',
    isCompleted: true,
  },
  {
    id: '3',
    goal: {
      id: 'goal-2',
      name: 'Personal Study',
    },
    date: '2025-06-30',
    content: 'Study TypeScript',
    routine: {
      duration: {
        startDate: '2025-06-01',
        endDate: '2025-12-31',
      },
      repeatType: 'WEEKLY',
    },
    isCompleted: false,
  },
];
