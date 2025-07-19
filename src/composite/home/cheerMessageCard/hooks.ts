import { useState, useEffect } from 'react';
import { apiClient } from '@/shared/lib/apiClient';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: { id: string; name: string };
  careerYear: string;
}

export const useFetchUserName = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get<{ data: UserProfile }>('/users/myprofile');
        const name = res.data.data.name;
        // 성을 제외하고 이름만 추출 (첫 번째 글자 제외)
        const firstName = name
          .split('')
          .filter((_, id) => id !== 0)
          .join('');
        setUserName(firstName);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setUserName('사용자');
      }
    };

    fetchUserProfile();
  }, []);

  return { userName };
};
