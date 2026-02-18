import { useQuery } from '@tanstack/react-query';
import type { UserType } from '../type/user';
import { userApi, UserQueryKeys } from '@/model/user';

export const useUser = () => {
  const { data: userInfo, isLoading: isLoadingUserInfo } = useQuery<UserType>({
    queryKey: UserQueryKeys.userInfo(),
    queryFn: async () => userApi.getMyProfile(),
    // 유저 정보는 자주 변경되지 않으므로 캐시 무효화 이전까지 무한으로 설정
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    userInfo,
    isLoadingUserInfo,
  };
};
