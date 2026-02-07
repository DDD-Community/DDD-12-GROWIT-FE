import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: { id: string; name: string };
  careerYear: string;
}

interface UserInfo {
  userName: string;
  fullUserName: string;
  email: string;
}

export const useFetchUserName = () => {
  const { data: userNameState }: { data: UserInfo | undefined } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      return await apiClient.get<{ data: UserProfile }>('/users/myprofile');
    },
    select: res => {
      const fullName = res.data.data.name;
      // 성을 제외하고 이름만 추출 (첫 번째 글자 제외)
      const firstName = fullName
        .split('')
        .filter((_, id) => id !== 0)
        .join('');
      const email = res.data.data.email;

      return {
        userName: firstName,
        fullUserName: fullName,
        email: email,
      };
    },
  });

  return (
    userNameState ?? {
      userName: '',
      fullUserName: '',
      email: '',
    }
  );
};
