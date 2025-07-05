import { JobRole, SignupFormData } from '@/app/(auth)/signup/type';
import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface SignUpRequest extends Omit<SignupFormData, 'privacyPolicy' | 'termsOfService'> {
  requiredConsent: {
    isPrivacyPolicyAgreed: boolean;
    isServiceTermsAgreed: boolean;
  };
}

interface SignUpResponse {}

interface JobRolesResponse extends CommonResponse<{ jobRoles: JobRole[] }> {}

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

export async function getJobRoles() {
  const { data } = await apiClient.get<JobRolesResponse>('/resource/jobroles');
  return data.data.jobRoles;
}
