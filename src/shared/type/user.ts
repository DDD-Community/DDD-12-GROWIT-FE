export const EarthlyBranchHour = {
  ['JA']: {
    label: '자시',
    time: '23:00-01:30',
  },
  ['CHUK']: {
    label: '축시',
    time: '01:30-03:30',
  },
  ['IN']: {
    label: '인시',
    time: '03:30-05:30',
  },
  ['MYO']: {
    label: '묘시',
    time: '05:30-07:30',
  },
  ['JIN']: {
    label: '진시',
    time: '07:30-09:30',
  },
  ['SA']: {
    label: '사시',
    time: '09:30-11:30',
  },
  ['O']: {
    label: '오시',
    time: '11:30-13:30',
  },
  ['MI']: {
    label: '미시',
    time: '13:30-15:30',
  },
  ['SIN']: {
    label: '신시',
    time: '15:30-17:30',
  },
  ['YU']: {
    label: '유시',
    time: '17:30-19:30',
  },
  ['SUL']: {
    label: '술시',
    time: '19:30-21:30',
  },
  ['HAE']: {
    label: '해시',
    time: '21:30-23:00',
  },
} as const;

export type EarthlyBranchHourType = keyof typeof EarthlyBranchHour;

export type UserType = {
  id: string;
  email: string;
  name: string;
  lastName: string | null;
  jobRole: {
    id: string;
    name: string;
  };
  careerYear: string;
  saju: {
    gender: 'MALE' | 'FEMALE';
    birth: string;
    birthHour: EarthlyBranchHourType;
  } | null;
};
