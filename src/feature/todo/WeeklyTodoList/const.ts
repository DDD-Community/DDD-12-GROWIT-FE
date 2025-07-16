import { DAY_OF_THE_WEEK } from '@/shared/type/Todo';

export const DAYS = [
  { key: 'SUNDAY', label: '일' },
  { key: 'MONDAY', label: '월' },
  { key: 'TUESDAY', label: '화' },
  { key: 'WEDNESDAY', label: '수' },
  { key: 'THURSDAY', label: '목' },
  { key: 'FRIDAY', label: '금' },
  { key: 'SATURDAY', label: '토' },
] as const;

export const WEEKENDS = [
  { key: 'SATURDAY', label: '토' },
  { key: 'SUNDAY', label: '일' },
];

export const DAY_LABELS: Record<DAY_OF_THE_WEEK, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

export const WEEKDAYS: DAY_OF_THE_WEEK[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

type DayKey = (typeof DAYS)[number]['key'];
