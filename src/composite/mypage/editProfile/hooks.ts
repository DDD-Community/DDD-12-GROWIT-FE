import { useState, useEffect } from 'react';
import { apiClient } from '@/shared/lib/apiClient';
import type { UserProfileData, JobRolesData } from './types';

const careerMap = {
  '신입(1년차 미만)': 'NEWBIE',
  '주니어(1년~3년)': 'JUNIOR',
  '미드레벨(3년~6년)': 'MID',
  '시니어(6년~10년)': 'SENIOR',
  '리드/매니저(10년 이상)': 'LEAD',
} as const;

const careerMapDisplay: Record<string, string> = {
  NEWBIE: '신입(1년차 미만)',
  JUNIOR: '주니어(1년~3년)',
  MID: '미드레벨(3년~6년)',
  SENIOR: '시니어(6년~10년)',
  LEAD: '리드/매니저(10년 이상)',
} as const;

type CareerLevel = keyof typeof careerMap;

export const useEditProfile = () => {
  const [userName, setUserName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [email, setEmail] = useState('');
  const [careerYear, setCareerYear] = useState('');
  const [jobRoleIds, setJobRoleIds] = useState<Map<string, string>>(new Map());

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

  const fetchJobList = async () => {
    try {
      const res = await apiClient.get<JobRolesData>('/resource/jobroles');
      const data = res.data.data;
      const jobMap = new Map<string, string>();
      data.jobRoles.forEach(job => jobMap.set(job.name, job.id));
      setJobRoleIds(jobMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchUserProfile(), fetchJobList()]);
  }, []);

  const putUserProfile = async (userName: string, jobRole: string, selectedCareerYear: string) => {
    try {
      const res = await apiClient.put('/users/myprofile', {
        name: userName,
        jobRoleId: jobRoleIds.get(jobRole),
        careerYear: careerMap[selectedCareerYear as CareerLevel],
      });
      await fetchUserProfile();
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const jobList = Array.from(jobRoleIds.keys());
  const careerLevels = Object.keys(careerMap);

  const profile = {
    userName,
    jobRole,
    email,
    careerYear,
    jobList,
    careerLevels,
    careerMapDisplay,
  };

  return {
    profile,
    putUserProfile,
  };
};

export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};

export const useEditProfileForm = (jobRole: string, careerYear: string, isModalOpen: boolean) => {
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [selectedCareerYear, setSelectedCareerYear] = useState('');

  // Modal이 열릴 때 기존 프로필 정보로 초기화
  useEffect(() => {
    if (isModalOpen) {
      setSelectedJobRole(jobRole);
      setSelectedCareerYear(careerMapDisplay[careerYear] || '');
    }
  }, [isModalOpen, jobRole, careerYear]);

  return {
    selectedJobRole,
    selectedCareerYear,
    setSelectedJobRole,
    setSelectedCareerYear,
  };
};
