import { apiClient } from '@/shared/lib/apiClient';
import { KakaoSignupFormData, SignupFormData } from '@/composite/signup/signUpForm/type';
import { KakaoSignUpRequest, KakaoSignUpResponse } from '@/composite/signup/signUpForm/type';

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
