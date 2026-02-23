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

export interface KakaoSignupFormData {
  name: string;
  jobRoleId: string;
  careerYear: '' | CareerYearType;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

export interface KakaoSignUpRequest extends Omit<KakaoSignupFormData, 'privacyPolicy' | 'termsOfService'> {
  registrationToken: string;
  requiredConsent: {
    isPrivacyPolicyAgreed: boolean;
    isServiceTermsAgreed: boolean;
  };
}

export interface KakaoSignUpResponse {}

// 앱 소셜 로그인 관련 타입
export type SocialLoginType = 'kakao' | 'apple';

// 앱 소셜 회원가입은 KakaoSignupFormData와 동일한 구조
export type AppSocialSignupFormData = KakaoSignupFormData;

// 앱 소셜 회원가입 응답 (토큰 포함)
export interface AppSocialSignUpResponse {
  accessToken: string;
  refreshToken: string;
}
