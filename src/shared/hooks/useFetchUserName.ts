import { useState, useEffect } from 'react';
import { apiClient } from '@/shared/lib/apiClient';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: { id: string; name: string };
  careerYear: string;
}

interface UserName {
  userName: string;
  fullUserName: string;
}

export const useFetchUserName = () => {
  const [userNameState, setUserNameState] = useState<UserName>({
    userName: '',
    fullUserName: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get<{ data: UserProfile }>('/users/myprofile');
        const fullName = res.data.data.name;
        // 성을 제외하고 이름만 추출 (첫 번째 글자 제외)
        const firstName = fullName
          .split('')
          .filter((_, id) => id !== 0)
          .join('');

        setUserNameState({
          userName: firstName,
          fullUserName: fullName,
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setUserNameState({
          userName: '사용자',
          fullUserName: '사용자',
        });
      }
    };

    fetchUserProfile();
  }, []);

  return userNameState;
};
