import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface OnboardStatusResponse extends CommonResponse<boolean> {}

export async function getOnboardStatus() {
  const { data } = await apiClient.get<OnboardStatusResponse>('/users/myprofile/onboarding');
  return data.data;
}

