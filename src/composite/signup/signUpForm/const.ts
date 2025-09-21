import { CareerYearType } from './type';

export const CAREER_YEAR_OPTIONS = [
  '선택',
  '신입(1년차 미만)',
  '주니어(1~3년)',
  '미드레벨(3~6년)',
  '시니어(6~10년)',
  '리드/매니저(10년 이상)',
];

export const CAREER_YEAR_VALUES: Record<string, CareerYearType> = {
  '신입(1년차 미만)': 'NEWBIE',
  '주니어(1~3년)': 'JUNIOR',
  '미드레벨(3~6년)': 'MID',
  '시니어(6~10년)': 'SENIOR',
  '리드/매니저(10년 이상)': 'LEAD',
};
