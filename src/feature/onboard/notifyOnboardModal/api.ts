import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface OnboardStatusResponse extends CommonResponse<boolean> {}

interface ChangeOnboardStatusResponse extends CommonResponse<string> {}

export async function getOnboardStatus() {
  const { data } = await apiClient.get<OnboardStatusResponse>('/users/myprofile/onboarding');
  return data.data;
}

export async function putOnboardStatus() {
  const { data } = await apiClient.put<ChangeOnboardStatusResponse>('/users/myprofile/onboarding');
  return data.data;
}
