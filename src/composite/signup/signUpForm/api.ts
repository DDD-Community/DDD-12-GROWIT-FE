import { apiClient } from '@/shared/lib/apiClient';
import {
  KakaoSignupFormData,
  SignupFormData,
  KakaoSignUpRequest,
  KakaoSignUpResponse,
  SocialLoginType,
  AppSocialSignUpResponse,
} from '@/composite/signup/signUpForm/type';

interface SignUpRequest extends Omit<SignupFormData, 'privacyPolicy' | 'termsOfService'> {
  requiredConsent: {
    isPrivacyPolicyAgreed: boolean;
    isServiceTermsAgreed: boolean;
  };
}

interface SignUpResponse {}

export async function postSignUp(req: SignupFormData) {
  const { privacyPolicy, termsOfService, ...rest } = req;
  const request: SignUpRequest = {
    ...rest,
    requiredConsent: {
      isPrivacyPolicyAgreed: true,
      isServiceTermsAgreed: true,
    },
  };
  return await apiClient.post<SignUpResponse, SignUpResponse>('/auth/signup', request);
}

export async function postKakaoSignUp(req: KakaoSignupFormData, registrationToken: string) {
  const { privacyPolicy, termsOfService, ...rest } = req;
  const request: KakaoSignUpRequest = {
    registrationToken: registrationToken,
    ...rest,
    requiredConsent: {
      isPrivacyPolicyAgreed: true,
      isServiceTermsAgreed: true,
    },
  };
  return await apiClient.post<KakaoSignUpRequest, KakaoSignUpResponse>('/auth/signup/kakao', request);
}

// 앱 전용 소셜 회원가입 API
export async function postAppSocialSignUp(
  req: KakaoSignupFormData,
  registrationToken: string,
  socialType: SocialLoginType
) {
  const { privacyPolicy, termsOfService, ...rest } = req;
  const request: KakaoSignUpRequest = {
    registrationToken,
    ...rest,
    requiredConsent: {
      isPrivacyPolicyAgreed: true,
      isServiceTermsAgreed: true,
    },
  };

  // 소셜 타입별 엔드포인트 분기
  const endpoint = socialType === 'kakao' ? '/auth/signup/kakao' : '/auth/signup/apple';

  return await apiClient.post<AppSocialSignUpResponse, KakaoSignUpRequest>(endpoint, request);
}
