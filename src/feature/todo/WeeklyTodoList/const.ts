const DAYS = [
  { key: 'SUNDAY', label: '일' },
  { key: 'MONDAY', label: '월' },
  { key: 'TUESDAY', label: '화' },
  { key: 'WEDNESDAY', label: '수' },
  { key: 'THURSDAY', label: '목' },
  { key: 'FRIDAY', label: '금' },
  { key: 'SATURDAY', label: '토' },
] as const;

export const WEEKDAYS = [
  { key: 'MONDAY', label: '월' },
  { key: 'TUESDAY', label: '화' },
  { key: 'WEDNESDAY', label: '수' },
  { key: 'THURSDAY', label: '목' },
  { key: 'FRIDAY', label: '금' },
];
export const WEEKENDS = [
  { key: 'SATURDAY', label: '토' },
  { key: 'SUNDAY', label: '일' },
];

type DayKey = (typeof DAYS)[number]['key'];
