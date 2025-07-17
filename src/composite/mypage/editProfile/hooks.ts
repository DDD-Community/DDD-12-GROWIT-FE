import { useState, useEffect } from 'react';
import { apiClient } from '@/shared/lib/apiClient';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: JobRole;
  careerYear: string;
}

interface UserProfileData {
  data: UserProfile;
}

interface JobRole {
  id: string;
  name: string;
}

export const useEditProfile = () => {
  const [userName, setUserName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [email, setEmail] = useState('');
  const [careerYear, setCareerYear] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get<UserProfileData>('/users/myprofile');
        const data = res.data.data;
        setUserName(data.name);
        setJobRole(data.jobRole.name);
        setEmail(data.email);
        setCareerYear(data.careerYear);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);

  const postUserProfile = async (userName: string, jobRole: string, selectedCareerYear: string) => {
    try {
      const res = await apiClient.post('/users/myprofile', {
        name: userName,
        jobRoleId: jobRole,
        careerYear: selectedCareerYear,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userName,
    jobRole,
    email,
    careerYear,
    postUserProfile,
  };
};
