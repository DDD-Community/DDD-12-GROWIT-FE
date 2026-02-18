import type { EarthlyBranchHourType } from '@/shared/type/user';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  jobRole: JobRole;
  careerYear: string;
  saju: {
    gender: 'MALE' | 'FEMALE';
    birth: string; // "YYYY-MM-DD" 형식
    birthHour: EarthlyBranchHourType;
  };
}

export interface UserProfileData {
  data: UserProfile;
}

export interface JobRole {
  id: string;
  name: string;
}

interface JobRoles {
  jobRoles: JobRole[];
}

export interface JobRolesData {
  data: JobRoles;
}
