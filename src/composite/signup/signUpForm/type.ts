export interface SignupFormData {
  email: string;
  password: string;
  name: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

export interface KakaoSignupFormData {
  name: string;
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
