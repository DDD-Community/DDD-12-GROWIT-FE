import { apiClient } from '@/shared/lib/apiClient';
import { CommonResponse } from '@/shared/type/response';
import type { UserType } from '@/shared/type/user';

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

  getMyProfile: async () => {
    const { data } = await apiClient.get<CommonResponse<UserType>>('/users/myprofile');
    return data.data;
  },
};
