import { GoalTodo } from '@/shared/type/GoalTodo';

export const MOCK_TODOS: GoalTodo[] = [
  // Goal 1: Growit Project
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
    isImportant: true,
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
    isImportant: false,
  },
  {
    id: '3',
    goal: {
      id: 'goal-1',
      name: 'Growit Project',
    },
    date: '2025-06-30',
    content: 'Write unit tests',
    isCompleted: false,
    isImportant: true,
  },
  {
    id: '4',
    goal: {
      id: 'goal-1',
      name: 'Growit Project',
    },
    date: '2025-06-30',
    content: 'Code review',
    routine: {
      duration: {
        startDate: '2025-06-01',
        endDate: '2025-08-31',
      },
      repeatType: 'WEEKLY',
    },
    isCompleted: false,
    isImportant: false,
  },
  // Goal 2: Personal Study
  {
    id: '5',
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
    isImportant: true,
  },
  {
    id: '6',
    goal: {
      id: 'goal-2',
      name: 'Personal Study',
    },
    date: '2025-06-30',
    content: 'Read React documentation',
    isCompleted: true,
    isImportant: false,
  },
  {
    id: '7',
    goal: {
      id: 'goal-2',
      name: 'Personal Study',
    },
    date: '2025-06-30',
    content: 'Practice algorithm problems',
    routine: {
      duration: {
        startDate: '2025-06-01',
        endDate: '2025-12-31',
      },
      repeatType: 'DAILY',
    },
    isCompleted: false,
    isImportant: true,
  },
  // Goal 3: Health & Fitness
  {
    id: '8',
    goal: {
      id: 'goal-3',
      name: 'Health & Fitness',
    },
    date: '2025-06-30',
    content: 'Morning workout',
    routine: {
      duration: {
        startDate: '2025-01-01',
        endDate: '2025-12-31',
      },
      repeatType: 'DAILY',
    },
    isCompleted: true,
    isImportant: true,
  },
  {
    id: '9',
    goal: {
      id: 'goal-3',
      name: 'Health & Fitness',
    },
    date: '2025-06-30',
    content: 'Drink 2L water',
    isCompleted: false,
    isImportant: false,
  },
];
