import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';

interface OnboardStatusResponse extends CommonResponse<boolean> {}
interface ChangeOnboardStatusResponse extends CommonResponse<string> {}

export const userApi = {
  getOnboardStatus: async () => {
    const { data } = await apiClient.get<OnboardStatusResponse>('/users/myprofile/onboarding');
    return data.data;
  },

  putOnboardStatus: async () => {
    const { data } = await apiClient.put<ChangeOnboardStatusResponse>('/users/myprofile/onboarding');
    return data.data;
  },
};
