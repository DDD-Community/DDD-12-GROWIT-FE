export type CareerYearType = 'NEWBIE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export interface SignupFormData {
  email: string;
  password: string;
  name: string;
  jobRoleId: string;
  careerYear: '' | CareerYearType;
  privacyPolicy: boolean; // 개인정보수집동의 관련해서 백엔드 저장이 필요할듯?
  termsOfService: boolean; // 개인정보수집동의 관련해서 백엔드 저장이 필요할듯?
}
